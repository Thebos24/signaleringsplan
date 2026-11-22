import { BigButton } from '../../components/BigButton'
import { ColorBadge } from '../../components/ColorBadge'
import { Tile } from '../../components/Tile'

// TEMPORARY (T-1.2): shows the basic components for Checkpoint 1. Open the app with #galerie.
// Test text only (no real client data). Replaced by the real screens in phase 2 and 3.
const placeholder = <span style={{ fontSize: 56 }}>🙂</span>

export function Gallery() {
  return (
    <main style={{ maxWidth: 480, margin: '0 auto', padding: 16 }}>
      <h1>Galerij</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        <ColorBadge color="green" />
        <ColorBadge color="orange" />
        <ColorBadge color="red" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, margin: '24px 0' }}>
        <Tile image={placeholder} text="Ga wandelen" color="green" />
        <Tile image={placeholder} text="Muziek luisteren" color="orange" />
        <Tile image={placeholder} text="Ik ben boos" color="orange" selected />
        <Tile image={placeholder} text="Ik slaap slecht" />
      </div>
      <Tile image={placeholder} text="Ik ga naar mijn begeleider" color="red" large />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
        <BigButton>Klaar</BigButton>
        <BigButton variant="quiet">Invullen</BigButton>
      </div>
    </main>
  )
}
