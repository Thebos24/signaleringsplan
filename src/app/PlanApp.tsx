import { useState } from 'react'
import { Button } from '../components/Button'
import { FillMode } from '../features/fill/FillMode'
import { usePlan } from '../features/plan/usePlan'
import { ResultScreen } from '../features/result/ResultScreen'
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
  if (screen === 'result') {
    return <ResultScreen color={color} tiles={data.tiles} onBack={() => setScreen('client')} />
  }
  if (screen === 'preview') {
    return (
      <>
        {start}
        <div style={{ padding: 16 }}>
          <Button onClick={() => setScreen('fill')}>{nl.fill.backToFill}</Button>
        </div>
      </>
    )
  }
  return start
}
