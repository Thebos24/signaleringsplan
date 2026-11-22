// @vitest-environment node
// Runs in Node with a fake IndexedDB (D-023): jsdom has no IndexedDB and its Blob cannot be stored.
import 'fake-indexeddb/auto'
import { DEFAULT_RED_ACTION_PICTO } from '../domain/plan'
import { nl } from '../text/nl'
import { PlanDatabase, db } from './db'
import {
  addTile,
  deleteTile,
  ensurePlan,
  getAllTiles,
  getPhoto,
  getPlan,
  getTiles,
  moveTile,
  setClientName,
  updateTile,
} from './planStore'

const picto = (pictoId: string) => ({ type: 'picto', pictoId }) as const
const photo = (content: string) =>
  ({ type: 'photo', blob: new Blob([content], { type: 'image/jpeg' }) }) as const

async function texts(color: 'green' | 'orange' | 'red', kind: 'signal' | 'action') {
  return (await getTiles(color, kind)).map((t) => t.text)
}

beforeEach(async () => {
  await db.delete()
  await db.open()
})

afterEach(() => vi.restoreAllMocks())

describe('ensurePlan', () => {
  it('creates a new plan with the default red action (D-008)', async () => {
    expect(await getPlan()).toBeUndefined()

    const plan = await ensurePlan()

    expect(plan.clientName).toBeUndefined()
    expect(await getPlan()).toEqual(plan)
    const tiles = await getAllTiles()
    expect(tiles).toHaveLength(1)
    expect(tiles[0]).toMatchObject({
      kind: 'action',
      color: 'red',
      text: nl.defaults.redAction,
      image: { type: 'picto', pictoId: DEFAULT_RED_ACTION_PICTO },
    })
  })

  it('returns the existing plan and does not add the default action again', async () => {
    const first = await ensurePlan()
    await deleteTile((await getAllTiles())[0].id) // the caregiver removed the default action

    const second = await ensurePlan()

    expect(second.createdAt).toBe(first.createdAt)
    expect(await getAllTiles()).toEqual([])
  })

  it('creates only one plan when called twice at the same time', async () => {
    await Promise.all([ensurePlan(), ensurePlan()])
    expect(await db.plan.count()).toBe(1)
    expect(await getAllTiles()).toHaveLength(1)
  })
})

describe('setClientName', () => {
  it('saves the cleaned name, and an empty name as no name', async () => {
    await ensurePlan()

    await setClientName('  Sam  ')
    expect((await getPlan())?.clientName).toBe('Sam')

    await setClientName('   ')
    expect((await getPlan())?.clientName).toBeUndefined()
  })
})

describe('addTile', () => {
  it('adds tiles at the end of their own list', async () => {
    await ensurePlan()
    await addTile({ kind: 'signal', color: 'orange', text: 'Ik slaap slecht', image: picto('a') })
    await addTile({ kind: 'action', color: 'orange', text: 'Ga wandelen', image: picto('b') })
    await addTile({ kind: 'signal', color: 'orange', text: 'Ik ben boos', image: picto('c') })
    await addTile({ kind: 'signal', color: 'red', text: 'Ik schreeuw', image: picto('d') })

    expect(await texts('orange', 'signal')).toEqual(['Ik slaap slecht', 'Ik ben boos'])
    expect(await texts('orange', 'action')).toEqual(['Ga wandelen'])
    expect(await texts('red', 'signal')).toEqual(['Ik schreeuw'])
    expect(await texts('red', 'action')).toEqual([nl.defaults.redAction])
  })

  it('returns the saved tile with cleaned text', async () => {
    const tile = await addTile({
      kind: 'action',
      color: 'green',
      text: '  Ik   sport ',
      image: picto('sport'),
    })
    expect(await db.tiles.get(tile.id)).toEqual(tile)
    expect(tile.text).toBe('Ik sport')
  })

  it('refuses a green signal and saves nothing', async () => {
    await expect(
      addTile({ kind: 'signal', color: 'green', text: 'Blij', image: photo('x') }),
    ).rejects.toThrow()
    expect(await db.tiles.count()).toBe(0)
    expect(await db.photos.count()).toBe(0)
  })

  it('saves a photo and links it to the tile', async () => {
    const tile = await addTile({
      kind: 'action',
      color: 'red',
      text: 'Mijn bankje',
      image: photo('sketch'),
    })

    expect(tile.image.type).toBe('photo')
    if (tile.image.type !== 'photo') return
    const blob = await getPhoto(tile.image.photoId)
    expect(blob?.type).toBe('image/jpeg')
    expect(await blob?.text()).toBe('sketch')
  })

  it('marks the plan as changed', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(1000)
    await ensurePlan()
    vi.spyOn(Date, 'now').mockReturnValue(2000)

    await addTile({ kind: 'action', color: 'green', text: 'Ik sport', image: picto('a') })

    expect(await getPlan()).toMatchObject({ createdAt: 1000, updatedAt: 2000 })
  })
})

describe('addTile limit (Q-004)', () => {
  it('refuses a 7th tile in a list, but other lists stay open', async () => {
    for (let i = 1; i <= 6; i++) {
      await addTile({
        kind: 'signal',
        color: 'orange',
        text: `Signaal ${i}`,
        image: picto('angry'),
      })
    }
    await expect(
      addTile({ kind: 'signal', color: 'orange', text: 'Te veel', image: picto('angry') }),
    ).rejects.toThrow(/full/)
    expect(await getTiles('orange', 'signal')).toHaveLength(6)

    await addTile({ kind: 'action', color: 'orange', text: 'Wandelen', image: picto('walk') })
    await addTile({ kind: 'signal', color: 'red', text: 'Boos', image: picto('angry') })
  })

  it('counts the default red action: red actions have room for 5 more', async () => {
    await ensurePlan()
    for (let i = 1; i <= 5; i++) {
      await addTile({ kind: 'action', color: 'red', text: `Actie ${i}`, image: picto('walk') })
    }
    await expect(
      addTile({ kind: 'action', color: 'red', text: 'Te veel', image: picto('walk') }),
    ).rejects.toThrow(/full/)
  })
})

describe('updateTile', () => {
  it('changes the text and keeps the image', async () => {
    const tile = await addTile({
      kind: 'action',
      color: 'green',
      text: 'Ik sport',
      image: picto('a'),
    })

    await updateTile(tile.id, { text: ' Ik ga zwemmen ' })

    expect(await db.tiles.get(tile.id)).toEqual({ ...tile, text: 'Ik ga zwemmen' })
  })

  it('removes the old photo when the image changes', async () => {
    const tile = await addTile({
      kind: 'action',
      color: 'green',
      text: 'Bankje',
      image: photo('one'),
    })

    await updateTile(tile.id, { image: photo('two') })
    const changed = await db.tiles.get(tile.id)
    expect(await db.photos.count()).toBe(1)
    if (changed?.image.type !== 'photo') throw new Error('expected a photo')
    expect(await (await getPhoto(changed.image.photoId))?.text()).toBe('two')

    await updateTile(tile.id, { image: picto('bench') })
    expect((await db.tiles.get(tile.id))?.image).toEqual(picto('bench'))
    expect(await db.photos.count()).toBe(0)
  })

  it('fails for a tile that does not exist', async () => {
    await expect(updateTile(999, { text: 'x' })).rejects.toThrow()
  })
})

describe('deleteTile', () => {
  it('removes the tile and its photo', async () => {
    const keep = await addTile({ kind: 'action', color: 'green', text: 'A', image: photo('a') })
    const remove = await addTile({ kind: 'action', color: 'green', text: 'B', image: photo('b') })

    await deleteTile(remove.id)

    expect(await getAllTiles()).toEqual([keep])
    expect(await db.photos.count()).toBe(1)
  })

  it('does nothing for a tile that does not exist', async () => {
    await expect(deleteTile(999)).resolves.toBeUndefined()
  })
})

describe('moveTile', () => {
  async function fillOrange() {
    const a = await addTile({ kind: 'signal', color: 'orange', text: 'A', image: picto('a') })
    await addTile({ kind: 'signal', color: 'red', text: 'Rood', image: picto('r') })
    const b = await addTile({ kind: 'signal', color: 'orange', text: 'B', image: picto('b') })
    const c = await addTile({ kind: 'signal', color: 'orange', text: 'C', image: picto('c') })
    return { a, b, c }
  }

  it('swaps with the neighbour in the same list, skipping other lists', async () => {
    const { b, c } = await fillOrange()

    await moveTile(c.id, 'up')
    expect(await texts('orange', 'signal')).toEqual(['A', 'C', 'B'])

    await moveTile(c.id, 'up')
    expect(await texts('orange', 'signal')).toEqual(['C', 'A', 'B'])

    await moveTile(b.id, 'up')
    expect(await texts('orange', 'signal')).toEqual(['C', 'B', 'A'])
    expect(await texts('red', 'signal')).toEqual(['Rood'])
  })

  it('does nothing at the top or the bottom of the list', async () => {
    const { a, c } = await fillOrange()

    await moveTile(a.id, 'up')
    await moveTile(c.id, 'down')

    expect(await texts('orange', 'signal')).toEqual(['A', 'B', 'C'])
  })

  it('keeps every order number unique', async () => {
    const { a, c } = await fillOrange()
    await moveTile(a.id, 'down')
    await moveTile(c.id, 'up')

    const orders = (await getAllTiles()).map((t) => t.order)
    expect(new Set(orders).size).toBe(orders.length)
  })
})

describe('saving on the phone', () => {
  it('keeps the plan after the app is closed and opened again', async () => {
    await ensurePlan()
    await setClientName('Sam')
    const tile = await addTile({
      kind: 'action',
      color: 'green',
      text: 'Bankje',
      image: photo('p'),
    })
    db.close()

    const reopened = new PlanDatabase()
    try {
      expect((await reopened.plan.toArray())[0].clientName).toBe('Sam')
      expect(await reopened.tiles.count()).toBe(2)
      expect(await reopened.tiles.get(tile.id)).toEqual(tile)
      if (tile.image.type !== 'photo') throw new Error('expected a photo')
      expect(await (await reopened.photos.get(tile.image.photoId))?.blob.text()).toBe('p')
    } finally {
      reopened.close()
      await db.open()
    }
  })
})
