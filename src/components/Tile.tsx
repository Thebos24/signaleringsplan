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
  // Only to look at, not to tap (the action tiles on the result screen): a plain block, not a button
  readOnly?: boolean
}

export function Tile({ image, text, color, selected, large, onClick, readOnly }: TileProps) {
  const classes = [
    'tile',
    color && `tile--${color}`,
    large && 'tile--large',
    selected && 'tile--selected',
  ]
  const content = (
    <>
      <span className="tile__image">{image}</span>
      <span className="tile__text">{text}</span>
    </>
  )
  if (readOnly) return <div className={classes.filter(Boolean).join(' ')}>{content}</div>
  return (
    <button
      type="button"
      className={classes.filter(Boolean).join(' ')}
      aria-pressed={selected === undefined ? undefined : selected}
      onClick={onClick}
    >
      {content}
    </button>
  )
}
