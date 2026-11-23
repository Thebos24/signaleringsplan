import type { ReactNode } from 'react'
import { SelectCircle } from './SelectCircle'
import './apple.css'

interface ListRowProps {
  // Picture first, text second (DESIGN.md rule 2)
  image?: ReactNode
  title: string
  // Small grey line under the title, e.g. "2 signalen · 3 acties"
  subtitle?: string
  // What is at the right: a selection circle (signal rows), an arrow (opens something) or nothing
  trailing?: 'circle' | 'chevron'
  // For rows with a circle: is it on?
  selected?: boolean
  // Soft green background (the "Het gaat goed" row)
  tint?: 'good'
  // Leave out for a row that is only to look at (the actions on the result screen)
  onClick?: () => void
}

export function ListRow({
  image,
  title,
  subtitle,
  trailing,
  selected = false,
  tint,
  onClick,
}: ListRowProps) {
  const classes = ['list-row', selected && 'list-row--selected', tint && `list-row--${tint}`]
    .filter(Boolean)
    .join(' ')
  const content = (
    <>
      {image && <span className="list-row__image">{image}</span>}
      <span className="list-row__text">
        <span className="list-row__title">{title}</span>
        {subtitle && <span className="list-row__subtitle">{subtitle}</span>}
      </span>
      {trailing === 'circle' && <SelectCircle checked={selected} />}
      {trailing === 'chevron' && (
        <span className="list-row__chevron" aria-hidden="true">
          ›
        </span>
      )}
    </>
  )
  if (!onClick) return <div className={classes}>{content}</div>
  return (
    <button
      type="button"
      className={classes}
      aria-pressed={trailing === 'circle' ? selected : undefined}
      onClick={onClick}
    >
      {content}
    </button>
  )
}
