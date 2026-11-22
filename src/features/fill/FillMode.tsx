import { useState } from 'react'
import type { PlanData } from '../plan/usePlan'
import { isPlanEmpty } from '../../domain/planStatus'
import { setClientName } from '../../storage/planStore'
import { Editor } from './Editor'
import { WelcomeScreen } from './WelcomeScreen'
import './fill.css'

// The filling-in mode, opened with the hold-to-open button (D-006).
// First the welcome screen (empty plan only), then the editor (T-2.2).
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

  return <Editor data={data} onChanged={onChanged} onClose={onClose} />
}
