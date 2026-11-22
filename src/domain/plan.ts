// The data model of the plan (SPEC §7). Pure types and rules, no storage. See D-023.

export type Color = 'green' | 'orange' | 'red'
export type TileKind = 'signal' | 'action'

export const COLORS: readonly Color[] = ['green', 'orange', 'red']

// A tile shows either a built-in pictogram (D-011) or a sketched photo (D-010)
export type ImageRef = { type: 'picto'; pictoId: string } | { type: 'photo'; photoId: number }

// One plan per phone (D-020), so the plan always has the same key
export const PLAN_ID = 'plan'

export interface Plan {
  id: typeof PLAN_ID
  clientName?: string
  createdAt: number // ms since epoch
  updatedAt: number
}

export interface Tile {
  id: number
  kind: TileKind
  color: Color
  text: string
  image: ImageRef
  // Unique over all tiles. Lists are sorted by it; lower comes first.
  order: number
}

export interface Photo {
  id: number
  blob: Blob // only the sketch, max 1024 px (D-010)
  createdAt: number
}

// Pictogram for the default red action (D-008). T-1.5 must provide a picto with this id.
export const DEFAULT_RED_ACTION_PICTO = 'caregiver'

// Green has no signals: green describes how it goes when it goes well (SPEC §5.2)
export function isAllowedTile(kind: TileKind, color: Color): boolean {
  return kind === 'action' || color !== 'green'
}

// At most this many tiles in one list (Q-004: 6 signals and 6 actions per colour). Keeps the plan
// easy to survey. The red list counts the default action "Ik ga naar mijn begeleider" too.
export const MAX_TILES_PER_LIST = 6

// A tile text is a few words (DESIGN.md rule 2), so a short limit is enough
export const MAX_TILE_TEXT_LENGTH = 40

export function canAddTile(tilesInList: number): boolean {
  return tilesInList < MAX_TILES_PER_LIST
}

// Trim and collapse whitespace, so "  Ga   wandelen " is stored as "Ga wandelen"
export function cleanText(text: string): string {
  return text.trim().replace(/\s+/g, ' ')
}

// An empty name means: no name
export function cleanClientName(name: string): string | undefined {
  const cleaned = cleanText(name)
  return cleaned === '' ? undefined : cleaned
}
