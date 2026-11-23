import { useState } from 'react'
import { Button } from '../../components/Button'
import { LongPressButton } from '../../components/LongPressButton'
import { Picto } from '../../components/Picto'
import { Tile } from '../../components/Tile'
import { PhotoImage } from '../photo/PhotoImage'
import { determineColor } from '../../domain/determineColor'
import type { Color, Tile as TileData } from '../../domain/plan'
import { nl } from '../../text/nl'
import './start.css'

// The first screen of the client (SPEC §5.1, T-3.1): the signals of orange and red mixed on one
// screen in the order of the plan (Q-001 proposal), a tile "Het gaat goed" and the button "Klaar".
// Tapped signals are only kept in this component, so they are gone when the app starts again.
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
    <main className="start">
      <div className="start__top">
        <LongPressButton onComplete={onOpenFill}>✎</LongPressButton>
      </div>
      <h1>{title}</h1>
      <div className="start__tiles">
        {signals.map((signal) => (
          <Tile
            key={signal.id}
            image={
              signal.image.type === 'picto' ? (
                <Picto id={signal.image.pictoId} />
              ) : (
                <PhotoImage photoId={signal.image.photoId} />
              )
            }
            text={signal.text}
            selected={tapped.has(signal.id)}
            onClick={() => toggle(signal.id)}
          />
        ))}
        <Tile
          image={<Picto id="happy" />}
          text={nl.start.allGood}
          color="green"
          onClick={() => onDone('green')}
        />
      </div>
      <div className="start__done">
        <Button onClick={finish}>{nl.start.done}</Button>
      </div>
    </main>
  )
}
