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
// On red the first action is an extra large tile on top, the rest are rows below (SPEC §5.3, D-042).
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
  const main = color === 'red' ? actions[0] : undefined
  const others = main ? actions.slice(1) : actions

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
        {main && (
          <div className="result__main" data-testid="main-action">
            <span className="result__main-image">
              <TileImage image={main.image} />
            </span>
            <p className="result__main-text">{main.text}</p>
          </div>
        )}
        {others.length > 0 && (
          <ListGroup>
            {others.map((action) => (
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
