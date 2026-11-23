import { useState } from 'react'
import { Button } from '../../components/Button'
import {
  canAddTile,
  MAX_TILES_PER_LIST,
  type Color,
  type Tile,
  type TileKind,
} from '../../domain/plan'
import { addTile, deleteTile, moveTile, updateTile } from '../../storage/planStore'
import { nl } from '../../text/nl'
import { TileForm } from './TileForm'
import { TileRow } from './TileRow'

const t = nl.fill

// The tiles of one list (for example the orange signals): show, add, change, remove, reorder.
// Every change is saved at once (SPEC §6.4); `onChanged` reloads the plan afterwards.
export function TileList({
  color,
  kind,
  tiles,
  onChanged,
}: {
  color: Color
  kind: TileKind
  tiles: Tile[] // only this list, in order
  onChanged: () => Promise<void> | void
}) {
  // 'new' = the add form is open; a number = the id of the tile being changed
  const [form, setForm] = useState<'new' | number>()

  const isSignal = kind === 'signal'
  const editing = typeof form === 'number' ? tiles.find((tile) => tile.id === form) : undefined

  async function run(change: () => Promise<unknown>) {
    await change()
    await onChanged()
  }

  return (
    <section className="fill__list" aria-labelledby={`list-${color}-${kind}`}>
      <h2 id={`list-${color}-${kind}`}>{isSignal ? t.signalsTitle : t.actionsTitle}</h2>
      <p>{isSignal ? t.signalsQuestion : t.actionsQuestion}</p>

      {tiles.length === 0 && <p className="fill__empty">{t.empty}</p>}
      <ul className="fill__rows">
        {tiles.map((tile, index) =>
          form === tile.id ? (
            <li key={tile.id}>
              <TileForm
                kind={kind}
                tile={editing}
                onCancel={() => setForm(undefined)}
                onSave={async (text, image) => {
                  await run(() => updateTile(tile.id, { text, image }))
                  setForm(undefined)
                }}
              />
            </li>
          ) : (
            <TileRow
              key={tile.id}
              tile={tile}
              isFirst={index === 0}
              isLast={index === tiles.length - 1}
              onEdit={() => setForm(tile.id)}
              onRemove={() => void run(() => deleteTile(tile.id))}
              onMove={(direction) => void run(() => moveTile(tile.id, direction))}
            />
          ),
        )}
      </ul>

      {form === 'new' ? (
        <TileForm
          kind={kind}
          onCancel={() => setForm(undefined)}
          onSave={async (text, image) => {
            if (!image) return // the form only allows saving a new tile with a picture
            await run(() => addTile({ kind, color, text, image }))
            setForm(undefined)
          }}
        />
      ) : canAddTile(tiles.length) ? (
        <Button onClick={() => setForm('new')}>+ {isSignal ? t.addSignal : t.addAction}</Button>
      ) : (
        <p className="fill__full">{t.full.replace('{max}', String(MAX_TILES_PER_LIST))}</p>
      )}
    </section>
  )
}
