import { useState } from 'react'
import { BigButton } from '../components/BigButton'
import { FillMode } from '../features/fill/FillMode'
import { usePlan } from '../features/plan/usePlan'
import { StartScreen } from '../features/start/StartScreen'
import type { Color } from '../domain/plan'
import { nl } from '../text/nl'

type Screen = 'client' | 'fill' | 'preview' | 'result'

// The real app: the client start screen, and the filling-in mode behind the hold-to-open button.
// "preview" is the client screen seen from the filling-in mode (SPEC §6.3, T-2.6).
export function PlanApp() {
  const { data, failed, reload } = usePlan()
  const [screen, setScreen] = useState<Screen>('client')
  const [color, setColor] = useState<Color>('green')

  if (failed) return <p style={{ padding: 16 }}>{nl.loadFailed}</p>
  if (!data) return <p style={{ padding: 16 }}>{nl.loading}</p>

  if (screen === 'fill') {
    return (
      <FillMode
        data={data}
        onChanged={reload}
        onClose={() => setScreen('client')}
        onPreview={() => setScreen('preview')}
      />
    )
  }
  const start = (
    <StartScreen
      clientName={data.plan.clientName}
      tiles={data.tiles}
      onOpenFill={() => setScreen('fill')}
      onDone={(result) => {
        setColor(result)
        setScreen('result')
      }}
    />
  )
  // TEMPORARY (T-3.1): the real result screen with the action tiles comes in T-3.2
  if (screen === 'result') {
    return (
      <main style={{ padding: 16 }}>
        <h1>{nl.result.youAreOn.replace('{color}', nl.colors[color])}</h1>
        <BigButton onClick={() => setScreen('client')}>{nl.result.back}</BigButton>
      </main>
    )
  }
  if (screen === 'preview') {
    return (
      <>
        {start}
        <div style={{ padding: 16 }}>
          <BigButton onClick={() => setScreen('fill')}>{nl.fill.backToFill}</BigButton>
        </div>
      </>
    )
  }
  return start
}
