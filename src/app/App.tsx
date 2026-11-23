import { Gallery } from '../features/gallery/Gallery'
import { ProofScreen } from '../features/proof/ProofScreen'
import { SketchCompare } from '../features/sketchCompare/SketchCompare'
import { PlanApp } from './PlanApp'

// #galerie = the basic components (T-1.2), #proef = the storage proof (T-0.4, for T-0.7 on Android).
// #schets = compare the sketch styles (T-2.5, R-013).
// All three are TEMPORARY; everything else is the real app.
export function App() {
  const hash = window.location.hash
  if (hash === '#galerie') return <Gallery />
  if (hash === '#proef') return <ProofScreen />
  if (hash === '#schets') return <SketchCompare />
  return <PlanApp />
}
