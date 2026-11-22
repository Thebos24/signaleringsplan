// Read and change the plan. Every change is saved at once (SPEC §6.4) and runs in one transaction,
// so a tile and its photo are always saved or removed together (D-023).
import {
  DEFAULT_RED_ACTION_PICTO,
  PLAN_ID,
  cleanClientName,
  canAddTile,
  cleanText,
  isAllowedTile,
  type Color,
  type ImageRef,
  type Plan,
  type Tile,
  type TileKind,
} from '../domain/plan'
import { nl } from '../text/nl'
import { db } from './db'

// The image for a new or changed tile: a picto id, or the sketched photo itself
export type NewImage = { type: 'picto'; pictoId: string } | { type: 'photo'; blob: Blob }

export interface NewTile {
  kind: TileKind
  color: Color
  text: string
  image: NewImage
}

export async function getPlan(): Promise<Plan | undefined> {
  return db.plan.get(PLAN_ID)
}

// Returns the plan, and creates it first if there is none yet.
// A new plan starts with the red action "Ik ga naar mijn begeleider" (D-008).
export async function ensurePlan(): Promise<Plan> {
  return db.transaction('rw', db.plan, db.tiles, async () => {
    const existing = await db.plan.get(PLAN_ID)
    if (existing) return existing

    const now = Date.now()
    const plan: Plan = { id: PLAN_ID, createdAt: now, updatedAt: now }
    await db.plan.add(plan)
    await db.tiles.add({
      kind: 'action',
      color: 'red',
      text: nl.defaults.redAction,
      image: { type: 'picto', pictoId: DEFAULT_RED_ACTION_PICTO },
      order: await nextOrder(),
    })
    return plan
  })
}

export async function setClientName(name: string): Promise<void> {
  await db.transaction('rw', db.plan, async () => {
    await db.plan.update(PLAN_ID, { clientName: cleanClientName(name), updatedAt: Date.now() })
  })
}

// The tiles of one list (for example the orange signals), in the chosen order
export async function getTiles(color: Color, kind: TileKind): Promise<Tile[]> {
  return db.tiles.where({ color, kind }).sortBy('order')
}

// All tiles, in the chosen order
export async function getAllTiles(): Promise<Tile[]> {
  return db.tiles.orderBy('order').toArray()
}

// The tile goes at the end of its list
export async function addTile(input: NewTile): Promise<Tile> {
  if (!isAllowedTile(input.kind, input.color)) {
    throw new Error(`A ${input.color} tile cannot be a ${input.kind}`)
  }
  return db.transaction('rw', db.plan, db.tiles, db.photos, async () => {
    const inList = await db.tiles.where({ color: input.color, kind: input.kind }).count()
    if (!canAddTile(inList)) {
      throw new Error(`The ${input.color} ${input.kind} list is full (Q-004)`)
    }
    const tile = {
      kind: input.kind,
      color: input.color,
      text: cleanText(input.text),
      image: await storeImage(input.image),
      order: await nextOrder(),
    }
    const id = await db.tiles.add(tile)
    await touchPlan()
    return { ...tile, id }
  })
}

// Change the text and/or the image. A photo that is replaced is removed.
export async function updateTile(
  id: number,
  changes: { text?: string; image?: NewImage },
): Promise<void> {
  await db.transaction('rw', db.plan, db.tiles, db.photos, async () => {
    const tile = await db.tiles.get(id)
    if (!tile) throw new Error(`Tile ${id} does not exist`)

    const update: Partial<Tile> = {}
    if (changes.text !== undefined) update.text = cleanText(changes.text)
    if (changes.image !== undefined) {
      await removeImage(tile.image)
      update.image = await storeImage(changes.image)
    }
    await db.tiles.update(id, update)
    await touchPlan()
  })
}

// Remove the tile and its photo. Asking "Weet je het zeker?" is up to the screen.
export async function deleteTile(id: number): Promise<void> {
  await db.transaction('rw', db.plan, db.tiles, db.photos, async () => {
    const tile = await db.tiles.get(id)
    if (!tile) return
    await removeImage(tile.image)
    await db.tiles.delete(id)
    await touchPlan()
  })
}

// Swap the tile with the one above or below it in the same list. At the top or bottom nothing happens.
export async function moveTile(id: number, direction: 'up' | 'down'): Promise<void> {
  await db.transaction('rw', db.plan, db.tiles, async () => {
    const tile = await db.tiles.get(id)
    if (!tile) return
    const list = await db.tiles.where({ color: tile.color, kind: tile.kind }).sortBy('order')
    const index = list.findIndex((t) => t.id === id)
    const neighbour = list[direction === 'up' ? index - 1 : index + 1]
    if (!neighbour) return

    await db.tiles.update(tile.id, { order: neighbour.order })
    await db.tiles.update(neighbour.id, { order: tile.order })
    await touchPlan()
  })
}

export async function getPhoto(photoId: number): Promise<Blob | undefined> {
  return (await db.photos.get(photoId))?.blob
}

// Helpers below only run inside the transactions above.

async function nextOrder(): Promise<number> {
  const last = await db.tiles.orderBy('order').last()
  return last ? last.order + 1 : 0
}

async function storeImage(image: NewImage): Promise<ImageRef> {
  if (image.type === 'picto') return { type: 'picto', pictoId: image.pictoId }
  const photoId = await db.photos.add({ blob: image.blob, createdAt: Date.now() })
  return { type: 'photo', photoId }
}

async function removeImage(image: ImageRef): Promise<void> {
  if (image.type === 'photo') await db.photos.delete(image.photoId)
}

async function touchPlan(): Promise<void> {
  await db.plan.update(PLAN_ID, { updatedAt: Date.now() })
}
