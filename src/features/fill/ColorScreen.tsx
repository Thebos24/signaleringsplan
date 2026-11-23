import { BackButton } from '../../components/BackButton'
import { ColorSymbol } from '../../components/ColorSymbol'
import { GuideTile, GuideTileGrid } from '../../components/GuideTile'
import { LargeTitle } from '../../components/LargeTitle'
import { Screen } from '../../components/Screen'
import {
  canAddTile,
  MAX_TILES_PER_LIST,
  type Color,
  type Tile,
  type TileKind,
} from '../../domain/plan'
import { nl } from '../../text/nl'
import { TileImage } from './TileImage'

const t = nl.fill

// Screen 2: one colour, with its signals (not green) and its actions as tiles, two per row (SPEC §6.3).
// Tap a tile to change it, tap the dashed tile to add one.
export function ColorScreen({
  color,
  tiles,
  onBack,
  onOpenTile,
}: {
  color: Color
  tiles: Tile[]
  onBack: () => void
  onOpenTile: (kind: TileKind, tileId?: number) => void
}) {
  return (
    <Screen>
      <BackButton label={t.back} onClick={onBack} />
      <LargeTitle>
        <span className="fill-color-title">
          <ColorSymbol color={color} size={44} />
          {nl.colors[color]}
        </span>
      </LargeTitle>

      {/* Green has no signals: it is how it goes when it goes well (SPEC §5.2) */}
      {color !== 'green' && (
        <TileSection
          kind="signal"
          tiles={tiles.filter((tile) => tile.color === color && tile.kind === 'signal')}
          onOpenTile={onOpenTile}
        />
      )}
      <TileSection
        kind="action"
        tiles={tiles.filter((tile) => tile.color === color && tile.kind === 'action')}
        onOpenTile={onOpenTile}
      />
    </Screen>
  )
}

function TileSection({
  kind,
  tiles,
  onOpenTile,
}: {
  kind: TileKind
  tiles: Tile[] // only this list, in order
  onOpenTile: (kind: TileKind, tileId?: number) => void
}) {
  const isSignal = kind === 'signal'
  const id = `section-${kind}`
  return (
    <section className="fill-section" aria-labelledby={id}>
      <h2 id={id} className="fill-section__title">
        {isSignal ? t.signalsTitle : t.actionsTitle}
      </h2>
      <p className="fill-section__question">{isSignal ? t.signalsQuestion : t.actionsQuestion}</p>
      <GuideTileGrid>
        {tiles.map((tile) => (
          <GuideTile
            key={tile.id}
            image={<TileImage image={tile.image} />}
            text={tile.text}
            onClick={() => onOpenTile(kind, tile.id)}
          />
        ))}
        {canAddTile(tiles.length) && (
          <GuideTile
            add
            text={isSignal ? t.addSignalTile : t.addActionTile}
            onClick={() => onOpenTile(kind)}
          />
        )}
      </GuideTileGrid>
      {!canAddTile(tiles.length) && (
        <p className="fill-section__full">{t.full.replace('{max}', String(MAX_TILES_PER_LIST))}</p>
      )}
    </section>
  )
}
