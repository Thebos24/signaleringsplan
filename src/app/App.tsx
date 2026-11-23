import { ProofScreen } from '../features/proof/ProofScreen'
import { PlanApp } from './PlanApp'

// #proef = the storage proof (T-0.4, for T-0.7 on Android), TEMPORARY. Everything else is the real app.
export function App() {
  if (window.location.hash === '#proef') return <ProofScreen />
  return <PlanApp />
}
