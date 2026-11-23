import { BigButton } from '../../components/BigButton'
import { ColorSymbol } from '../../components/ColorSymbol'
import { Picto } from '../../components/Picto'
import { Tile } from '../../components/Tile'
import { PhotoImage } from '../photo/PhotoImage'
import type { Color, Tile as TileData } from '../../domain/plan'
import { nl } from '../../text/nl'
import './result.css'

// The result for the client (SPEC §5.3, T-3.2): the colour fills the screen, with the word and the
// symbol (DESIGN.md rule 6), the actions of that colour as tiles to look at, and "Terug".
// The extra large top tile for red comes in T-3.3.
export function ResultScreen({
  color,
  tiles,
  onBack,
}: {
  color: Color
  tiles: TileData[]
  onBack: () => void
}) {
  const actions = tiles
    .filter((t) => t.kind === 'action' && t.color === color)
    .sort((a, b) => a.order - b.order)
  const sentence =
    color === 'green' ? nl.result.allGood : nl.result.youAreOn.replace('{color}', nl.colors[color])

  return (
    <main className={`result result--${color}`}>
      <div className="result__head">
        <ColorSymbol color={color} size={96} />
        <h1>{sentence}</h1>
        {color === 'green' && <p className="result__word">{nl.colors.green}</p>}
      </div>
      <div className="result__tiles">
        {actions.map((action) => (
          <Tile
            key={action.id}
            readOnly
            image={
              action.image.type === 'picto' ? (
                <Picto id={action.image.pictoId} />
              ) : (
                <PhotoImage photoId={action.image.photoId} />
              )
            }
            text={action.text}
          />
        ))}
      </div>
      <div className="result__back">
        <BigButton onClick={onBack}>{nl.result.back}</BigButton>
      </div>
    </main>
  )
}
