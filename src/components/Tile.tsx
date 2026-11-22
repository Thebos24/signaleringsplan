import type { ReactNode } from 'react'
import type { Color } from '../domain/plan'
import './components.css'

interface TileProps {
  // Picture first, text second (DESIGN.md rule 2). Pictograms come in T-1.5; any node works.
  image: ReactNode
  text: string
  // Light background in this colour; leave out for a neutral tile
  color?: Color
  // For signal tiles that can be switched on and off
  selected?: boolean
  // Extra big tile (the top tile of the red screen)
  large?: boolean
  onClick?: () => void
}

export function Tile({ image, text, color, selected, large, onClick }: TileProps) {
  const classes = [
    'tile',
    color && `tile--${color}`,
    large && 'tile--large',
    selected && 'tile--selected',
  ]
  return (
    <button
      type="button"
      className={classes.filter(Boolean).join(' ')}
      aria-pressed={selected === undefined ? undefined : selected}
      onClick={onClick}
    >
      <span className="tile__image">{image}</span>
      <span className="tile__text">{text}</span>
    </button>
  )
}
