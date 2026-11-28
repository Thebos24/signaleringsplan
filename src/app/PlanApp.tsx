import { useEffect, useState } from 'react'
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
  // Changes when the client comes back to the app; the start screen then starts fresh (T-3.4)
  const [visit, setVisit] = useState(0)

  // Coming back to the app (from another app or a locked phone) always gives the start screen with
  // nothing tapped. The filling-in mode stays as it is: taking a photo also leaves the app for a moment.
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState !== 'visible') return
      setVisit((n) => n + 1)
      setScreen((now) => (now === 'fill' || now === 'preview' ? now : 'client'))
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [])

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
      key={visit}
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
