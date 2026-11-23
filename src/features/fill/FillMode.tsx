import { useState } from 'react'
import type { Color, TileKind } from '../../domain/plan'
import type { PlanData } from '../plan/usePlan'
import { ColorScreen } from './ColorScreen'
import { PlanScreen } from './PlanScreen'
import { TileScreen } from './TileScreen'
import './fill.css'

// Where the supervisor is in the filling-in mode (SPEC §6.3, D-035): three levels, each with "Terug".
// The fourth screen, choosing a picture, is part of the tile screen (it keeps the draft of the tile).
type Route =
  | { name: 'plan' }
  | { name: 'color'; color: Color }
  | { name: 'tile'; color: Color; kind: TileKind; tileId?: number } // no tileId = a new tile

// The filling-in mode, opened with the hold-to-open button (D-006).
export function FillMode({
  data,
  onChanged,
  onClose,
  onPreview,
}: {
  data: PlanData
  onChanged: () => Promise<void> | void
  onClose: () => void
  onPreview: () => void
}) {
  const [route, setRoute] = useState<Route>({ name: 'plan' })

  if (route.name === 'color') {
    return (
      <ColorScreen
        key={route.color}
        color={route.color}
        tiles={data.tiles}
        onBack={() => setRoute({ name: 'plan' })}
        onOpenTile={(kind, tileId) => setRoute({ name: 'tile', color: route.color, kind, tileId })}
      />
    )
  }

  if (route.name === 'tile') {
    return (
      <TileScreen
        // A new screen for every tile, so no text of the previous tile stays behind
        key={`${route.kind}-${route.tileId ?? 'new'}`}
        color={route.color}
        kind={route.kind}
        tileId={route.tileId}
        tiles={data.tiles}
        onChanged={onChanged}
        onBack={() => setRoute({ name: 'color', color: route.color })}
      />
    )
  }

  return (
    <PlanScreen
      data={data}
      onChanged={onChanged}
      onClose={onClose}
      onPreview={onPreview}
      onOpenColor={(color) => setRoute({ name: 'color', color })}
    />
  )
}
