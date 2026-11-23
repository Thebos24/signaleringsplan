import './apple.css'

// "‹ Terug" at the top left. The label comes from the screen (text lives in nl.ts).
export function BackButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" className="back-button" onClick={onClick}>
      <span className="back-button__chevron" aria-hidden="true">
        ‹
      </span>
      {label}
    </button>
  )
}
