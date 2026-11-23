import { GalleryApple } from '../features/gallery/GalleryApple'
import { Gallery } from '../features/gallery/Gallery'
import { ProofScreen } from '../features/proof/ProofScreen'
import { PlanApp } from './PlanApp'

// #galerie = the basic components (T-1.2), #galerie-nieuw = the Apple-style ones (T-2.7), #proef = the storage proof (T-0.4, for T-0.7 on Android).
// Both are TEMPORARY; everything else is the real app.
export function App() {
  const hash = window.location.hash
  if (hash === '#galerie') return <Gallery />
  if (hash === '#galerie-nieuw') return <GalleryApple />
  if (hash === '#proef') return <ProofScreen />
  return <PlanApp />
}
