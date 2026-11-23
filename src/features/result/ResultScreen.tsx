import { Button } from '../../components/Button'
import { ColorSymbol } from '../../components/ColorSymbol'
import { ListGroup } from '../../components/ListGroup'
import { ListRow } from '../../components/ListRow'
import { Screen } from '../../components/Screen'
import { TileImage } from '../fill/TileImage'
import type { Color, Tile as TileData } from '../../domain/plan'
import { nl } from '../../text/nl'
import './result.css'

// The result for the client (SPEC §5.3, D-041): the colour fills the screen, with a big symbol, the
// word (DESIGN.md rule 6), the actions of that colour as rows to look at, and "Terug" in the fixed bar.
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

  return (
    <div className={`result result--${color}`}>
      <Screen bottomBar={<Button onClick={onBack}>{nl.result.back}</Button>}>
        <div className="result__head">
          <ColorSymbol color={color} size={96} />
          {color === 'green' ? (
            <>
              <h1 className="result__line">{nl.result.allGood}</h1>
              <p className="result__word">{nl.colors.green}</p>
            </>
          ) : (
            <h1 className="result__line">
              {nl.result.youAreOn} <span className="result__word">{nl.colors[color]}</span>
            </h1>
          )}
        </div>
        {actions.length > 0 && (
          <ListGroup>
            {actions.map((action) => (
              <ListRow
                key={action.id}
                image={<TileImage image={action.image} />}
                title={action.text}
              />
            ))}
          </ListGroup>
        )}
      </Screen>
    </div>
  )
}
