// A plan is "empty" while it has no signals yet (SPEC §6.2). Without signals the app can only
// ever show green, so the supervisor first gets the welcome screen. Needs no extra stored flag.
import type { Tile } from './plan'

export function isPlanEmpty(tiles: readonly Pick<Tile, 'kind'>[]): boolean {
  return !tiles.some((t) => t.kind === 'signal')
}
