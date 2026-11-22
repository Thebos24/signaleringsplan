import { useState } from 'react'
import { BigButton } from '../../components/BigButton'
import { ColorBadge } from '../../components/ColorBadge'
import { LongPressButton } from '../../components/LongPressButton'
import { PICTO_IDS } from '../pictos/pictos'
import { Picto } from '../../components/Picto'
import { Tile } from '../../components/Tile'

// TEMPORARY (T-1.2): shows the basic components for Checkpoint 1. Open the app with #galerie.
// Test text only (no real client data). Replaced by the real screens in phase 2 and 3.

export function Gallery() {
  const [open, setOpen] = useState(false)
  return (
    <main style={{ maxWidth: 480, margin: '0 auto', padding: 16 }}>
      <h1>Galerij</h1>
      {open && <p>Invulmodus open (proef)</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        <ColorBadge color="green" />
        <ColorBadge color="orange" />
        <ColorBadge color="red" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, margin: '24px 0' }}>
        <Tile image={<Picto id="walk" />} text="Ga wandelen" color="green" />
        <Tile image={<Picto id="music" />} text="Muziek luisteren" color="orange" />
        <Tile image={<Picto id="angry" />} text="Ik ben boos" color="orange" selected />
        <Tile image={<Picto id="sleep" />} text="Ik slaap slecht" />
      </div>
      <Tile image={<Picto id="caregiver" />} text="Ik ga naar mijn begeleider" color="red" large />
      <h2>Alle pictogrammen</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {PICTO_IDS.map((id) => (
          <Picto key={id} id={id} />
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
        <BigButton>Klaar</BigButton>
        <BigButton variant="quiet">Invullen</BigButton>
        <div style={{ alignSelf: 'flex-end' }}>
          <LongPressButton onComplete={() => setOpen(true)}>✎</LongPressButton>
        </div>
      </div>
    </main>
  )
}
