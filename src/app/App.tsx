import { Gallery } from '../features/gallery/Gallery'
import { ProofScreen } from '../features/proof/ProofScreen'
import { PlanApp } from './PlanApp'

// #galerie = the basic components (T-1.2), #proef = the storage proof (T-0.4, for T-0.7 on Android).
// Both are TEMPORARY; everything else is the real app.
export function App() {
  const hash = window.location.hash
  if (hash === '#galerie') return <Gallery />
  if (hash === '#proef') return <ProofScreen />
  return <PlanApp />
}
