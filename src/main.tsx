import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import { applyTokens } from './design/tokens'
import { PICTO_IDS } from './features/pictos/pictos'
import { preloadPictos } from './features/pictos/renderPicto'
import './design/base.css'

applyTokens()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Make the pictogram sketches right away, so the screens show them without waiting (D-039)
void preloadPictos(PICTO_IDS)
