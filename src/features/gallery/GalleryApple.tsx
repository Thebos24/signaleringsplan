import { useState } from 'react'
import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { GuideTile, GuideTileGrid } from '../../components/GuideTile'
import { LargeTitle } from '../../components/LargeTitle'
import { ListGroup } from '../../components/ListGroup'
import { ListRow } from '../../components/ListRow'
import { Picto } from '../../components/Picto'
import { Screen } from '../../components/Screen'
import { ColorSymbol } from '../../components/ColorSymbol'

// TEMPORARY (T-2.7): the new Apple-style components (D-036). Open the app with #galerie-nieuw.
// Test text only (no real client data). Removed when the real screens use them (T-2.9, T-2.10).

export function GalleryApple() {
  const [angry, setAngry] = useState(true)
  const [sleep, setSleep] = useState(false)
  return (
    <Screen
      bottomBar={
        <>
          <Button>Klaar</Button>
          <Button variant="secondary">Bekijk als cliënt</Button>
        </>
      }
    >
      <BackButton label="Terug" onClick={() => {}} />
      <LargeTitle caption="Tik op een kleur om die in te vullen">Plan van Sam</LargeTitle>
      <ListGroup>
        <ListRow
          image={<ColorSymbol color="green" size={56} />}
          title="Groen"
          subtitle="3 acties"
          trailing="chevron"
          onClick={() => {}}
        />
        <ListRow
          image={<ColorSymbol color="orange" size={56} />}
          title="Oranje"
          subtitle="2 signalen · 3 acties"
          trailing="chevron"
          onClick={() => {}}
        />
        <ListRow
          image={<ColorSymbol color="red" size={56} />}
          title="Rood"
          subtitle="1 signaal · 2 acties"
          trailing="chevron"
          onClick={() => {}}
        />
      </ListGroup>
      <ListGroup>
        <ListRow
          image={<Picto id="sleep" />}
          title="Ik slaap slecht"
          trailing="circle"
          selected={sleep}
          onClick={() => setSleep(!sleep)}
        />
        <ListRow
          image={<Picto id="angry" />}
          title="Ik ben boos"
          trailing="circle"
          selected={angry}
          onClick={() => setAngry(!angry)}
        />
        <ListRow
          image={<Picto id="happy" />}
          title="Het gaat goed"
          tint="good"
          onClick={() => {}}
        />
      </ListGroup>
      <ListGroup>
        <ListRow image={<Picto id="walk" />} title="Ga wandelen" />
        <ListRow image={<Picto id="music" />} title="Muziek luisteren" />
      </ListGroup>
      <GuideTileGrid>
        <GuideTile image={<Picto id="walk" />} text="Ga wandelen" onClick={() => {}} />
        <GuideTile image={<Picto id="music" />} text="Muziek luisteren" onClick={() => {}} />
        <GuideTile add text="Toevoegen" onClick={() => {}} />
      </GuideTileGrid>
    </Screen>
  )
}
