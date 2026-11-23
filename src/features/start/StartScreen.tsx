import { useState } from 'react'
import { Button } from '../../components/Button'
import { LargeTitle } from '../../components/LargeTitle'
import { ListGroup } from '../../components/ListGroup'
import { ListRow } from '../../components/ListRow'
import { LongPressButton } from '../../components/LongPressButton'
import { Picto } from '../../components/Picto'
import { Screen } from '../../components/Screen'
import { TileImage } from '../fill/TileImage'
import { determineColor } from '../../domain/determineColor'
import type { Color, Tile as TileData } from '../../domain/plan'
import { nl } from '../../text/nl'
import './start.css'

// The first screen of the client (SPEC §5.1, D-041): the signals of orange and red mixed in one grouped
// list in the order of the plan (Q-001 proposal), each with a circle; a row "Het gaat goed" and the
// button "Klaar" in the fixed bar. Tapped signals are only kept in this component, so they are gone
// when the app starts again.
export function StartScreen({
  clientName,
  tiles,
  onOpenFill,
  onDone,
}: {
  clientName?: string
  tiles: TileData[]
  onOpenFill: () => void
  onDone: (color: Color) => void
}) {
  const [tapped, setTapped] = useState<ReadonlySet<number>>(new Set())
  const title = clientName ? nl.start.title.replace('{name}', clientName) : nl.start.titleNoName
  const signals = tiles
    .filter((t) => t.kind === 'signal' && t.color !== 'green')
    .sort((a, b) => a.order - b.order)

  const toggle = (id: number) =>
    setTapped((before) => {
      const after = new Set(before)
      if (!after.delete(id)) after.add(id)
      return after
    })

  // Nothing tapped and "Klaar" gives green, the same as "Het gaat goed"
  const finish = () => onDone(determineColor(signals.filter((s) => tapped.has(s.id))))

  return (
    <Screen bottomBar={<Button onClick={finish}>{nl.start.done}</Button>}>
      <div className="start__top">
        <LongPressButton onComplete={onOpenFill}>✎</LongPressButton>
      </div>
      <LargeTitle>{title}</LargeTitle>
      {signals.length > 0 && (
        <ListGroup>
          {signals.map((signal) => (
            <ListRow
              key={signal.id}
              image={<TileImage image={signal.image} />}
              title={signal.text}
              trailing="circle"
              selected={tapped.has(signal.id)}
              onClick={() => toggle(signal.id)}
            />
          ))}
        </ListGroup>
      )}
      <ListGroup>
        <ListRow
          image={<Picto id="happy" />}
          title={nl.start.allGood}
          tint="good"
          onClick={() => onDone('green')}
        />
      </ListGroup>
    </Screen>
  )
}
