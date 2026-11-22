import { useState } from 'react'
import { BigButton } from '../../components/BigButton'
import type { PlanData } from '../plan/usePlan'
import { isPlanEmpty } from '../../domain/planStatus'
import { setClientName } from '../../storage/planStore'
import { nl } from '../../text/nl'
import { WelcomeScreen } from './WelcomeScreen'
import './fill.css'

const t = nl.fill

// The filling-in mode, opened with the hold-to-open button (D-006).
// TEMPORARY: after the welcome screen only a placeholder shows; the editor comes in T-2.2.
export function FillMode({
  data,
  onChanged,
  onClose,
}: {
  data: PlanData
  onChanged: () => Promise<void> | void
  onClose: () => void
}) {
  // Decided once, when the mode opens: the welcome stays until "Verder", even after the name is saved
  const [showWelcome, setShowWelcome] = useState(() => isPlanEmpty(data.tiles))

  if (showWelcome) {
    return (
      <WelcomeScreen
        initialName={data.plan.clientName}
        onNext={async (name) => {
          await setClientName(name)
          await onChanged()
          setShowWelcome(false)
        }}
      />
    )
  }

  return (
    <main className="fill">
      <h1>{t.title}</h1>
      <p>{t.editorSoon}</p>
      <BigButton onClick={onClose}>{t.close}</BigButton>
    </main>
  )
}
