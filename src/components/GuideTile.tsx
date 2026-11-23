import type { ReactNode } from 'react'
import './apple.css'

interface GuideTileProps {
  image?: ReactNode
  text: string
  onClick: () => void
  // The dashed "+ Toevoegen" tile at the end of a list
  add?: boolean
}

// A tile for the supervisor's screens: picture on top, text under it. Put them in a GuideTileGrid.
export function GuideTile({ image, text, onClick, add }: GuideTileProps) {
  return (
    <button
      type="button"
      className={add ? 'guide-tile guide-tile--add' : 'guide-tile'}
      onClick={onClick}
    >
      {add ? (
        <span className="guide-tile__plus" aria-hidden="true">
          +
        </span>
      ) : (
        image && <span className="guide-tile__image">{image}</span>
      )}
      <span className="guide-tile__text">{text}</span>
    </button>
  )
}

// Two tiles per row (DESIGN.md rule 5)
export function GuideTileGrid({ children }: { children: ReactNode }) {
  return <div className="guide-tile-grid">{children}</div>
}
