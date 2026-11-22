import { LongPressButton } from '../../components/LongPressButton'
import { nl } from '../../text/nl'
import './start.css'

// TEMPORARY (T-2.1): only the heading and the hold-to-open button (SPEC §6.1).
// The signal tiles, "Het gaat goed" and "Klaar" come in T-3.1.
export function StartScreen({
  clientName,
  onOpenFill,
}: {
  clientName?: string
  onOpenFill: () => void
}) {
  const title = clientName ? nl.start.title.replace('{name}', clientName) : nl.start.titleNoName
  return (
    <main className="start">
      <div className="start__top">
        <LongPressButton onComplete={onOpenFill}>✎</LongPressButton>
      </div>
      <h1>{title}</h1>
    </main>
  )
}
