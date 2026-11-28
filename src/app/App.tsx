import { ProofScreen } from '../features/proof/ProofScreen'
import { PictoGallery } from '../features/gallery/PictoGallery'
import { PlanApp } from './PlanApp'

// #proef = the storage proof (T-0.4, for T-0.7 on Android), TEMPORARY.
// #pictos = the trial pictograms (T-4.1), TEMPORARY until T-4.4. Everything else is the real app.
export function App() {
  if (window.location.hash === '#proef') return <ProofScreen />
  if (window.location.hash === '#pictos') return <PictoGallery />
  return <PlanApp />
}
