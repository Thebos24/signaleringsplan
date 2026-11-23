import './apple.css'

// The selection circle at the right of a row: empty = not chosen, filled with a tick = chosen.
// Decorative: the row itself tells screen readers whether it is on (aria-pressed).
export function SelectCircle({ checked }: { checked: boolean }) {
  return (
    <span
      className={checked ? 'select-circle select-circle--checked' : 'select-circle'}
      aria-hidden="true"
    >
      {checked ? '✓' : ''}
    </span>
  )
}
