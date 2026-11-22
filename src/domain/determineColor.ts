// The colour rule (SPEC §5.2, D-007): any red signal -> red; otherwise any orange signal -> orange;
// otherwise green. Other rules (e.g. "two orange = red") only after a decision by Sander.
import type { Color, Tile } from './plan'

export function determineColor(tappedSignals: readonly Pick<Tile, 'kind' | 'color'>[]): Color {
  // Only signals count; actions are never "tapped" in the sense of this rule
  const colors = tappedSignals.filter((t) => t.kind === 'signal').map((t) => t.color)
  if (colors.includes('red')) return 'red'
  if (colors.includes('orange')) return 'orange'
  return 'green'
}
