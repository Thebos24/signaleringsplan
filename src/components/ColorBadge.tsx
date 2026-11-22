import type { Color } from '../domain/plan'
import { nl } from '../text/nl'
import { ColorSymbol } from './ColorSymbol'
import './components.css'

// Colour + word + symbol together (DESIGN.md rule 6).
export function ColorBadge({ color }: { color: Color }) {
  return (
    <span className={`color-badge color-badge--${color}`}>
      <ColorSymbol color={color} />
      <span className="color-badge__word">{nl.colors[color]}</span>
    </span>
  )
}
