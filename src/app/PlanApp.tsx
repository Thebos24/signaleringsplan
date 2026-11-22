import { useState } from 'react'
import { FillMode } from '../features/fill/FillMode'
import { usePlan } from '../features/plan/usePlan'
import { StartScreen } from '../features/start/StartScreen'
import { nl } from '../text/nl'

// The real app: the client start screen, and the filling-in mode behind the hold-to-open button.
export function PlanApp() {
  const { data, failed, reload } = usePlan()
  const [filling, setFilling] = useState(false)

  if (failed) return <p style={{ padding: 16 }}>{nl.loadFailed}</p>
  if (!data) return <p style={{ padding: 16 }}>{nl.loading}</p>

  if (filling) {
    return <FillMode data={data} onChanged={reload} onClose={() => setFilling(false)} />
  }
  return <StartScreen clientName={data.plan.clientName} onOpenFill={() => setFilling(true)} />
}
