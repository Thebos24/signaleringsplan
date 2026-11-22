import { Gallery } from '../features/gallery/Gallery'
import { ProofScreen } from '../features/proof/ProofScreen'

// TEMPORARY: the proof screen (T-0.4) stays for T-0.7; #galerie shows the basic components (T-1.2).
export function App() {
  return window.location.hash === '#galerie' ? <Gallery /> : <ProofScreen />
}
