import { useState } from 'react'
import { Button } from '../../components/Button'
import { ColorSymbol } from '../../components/ColorSymbol'
import { LargeTitle } from '../../components/LargeTitle'
import { ListGroup } from '../../components/ListGroup'
import { ListRow } from '../../components/ListRow'
import { Screen } from '../../components/Screen'
import { COLORS, type Color, type Tile } from '../../domain/plan'
import { isPlanEmpty } from '../../domain/planStatus'
import { setClientName } from '../../storage/planStore'
import { nl } from '../../text/nl'
import type { PlanData } from '../plan/usePlan'

const t = nl.fill

// "2 signalen · 3 acties". Green has no signals (SPEC §5.2), so it only counts actions.
function countText(tiles: Tile[], color: Color): string {
  const count = (kind: Tile['kind']) =>
    tiles.filter((tile) => tile.color === color && tile.kind === kind).length
  const signals = count('signal')
  const actions = count('action')
  const signalText =
    signals === 1 ? t.signalCountOne : t.signalCountMany.replace('{n}', `${signals}`)
  const actionText =
    actions === 1 ? t.actionCountOne : t.actionCountMany.replace('{n}', `${actions}`)
  return color === 'green' ? actionText : `${signalText} · ${actionText}`
}

// Screen 1 of the filling-in mode: the plan with the three colours (SPEC §6.3).
// For a plan without signals it also says what the app does (SPEC §6.2).
export function PlanScreen({
  data,
  onChanged,
  onClose,
  onPreview,
  onOpenColor,
}: {
  data: PlanData
  onChanged: () => Promise<void> | void
  onClose: () => void
  onPreview: () => void
  onOpenColor: (color: Color) => void
}) {
  const [name, setName] = useState<string>()
  const editingName = name !== undefined
  const clientName = data.plan.clientName
  const title = clientName ? t.planTitle.replace('{name}', clientName) : t.planTitleNoName

  async function saveName() {
    if (name === undefined) return
    await setClientName(name)
    await onChanged()
    setName(undefined)
  }

  return (
    <Screen
      bottomBar={
        editingName ? (
          <>
            <Button onClick={() => void saveName()}>{t.nameSave}</Button>
            <Button variant="secondary" onClick={() => setName(undefined)}>
              {t.nameCancel}
            </Button>
          </>
        ) : (
          <Button onClick={onClose}>{t.done}</Button>
        )
      }
    >
      <LargeTitle caption={t.planCaption}>{title}</LargeTitle>

      {isPlanEmpty(data.tiles) && (
        <p className="fill-intro">
          {t.intro} <strong>{t.introFillTogether}</strong>
        </p>
      )}

      <ListGroup>
        {COLORS.map((color) => (
          <ListRow
            key={color}
            image={<ColorSymbol color={color} size={56} />}
            title={nl.colors[color]}
            subtitle={countText(data.tiles, color)}
            trailing="chevron"
            onClick={() => onOpenColor(color)}
          />
        ))}
      </ListGroup>

      {editingName ? (
        <label className="fill-field">
          {t.nameLabel}
          <input
            type="text"
            value={name}
            maxLength={30}
            autoComplete="off"
            autoFocus
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void saveName()
            }}
          />
        </label>
      ) : (
        <div className="fill-buttons">
          <Button variant="secondary" onClick={onPreview}>
            {t.preview}
          </Button>
          <Button variant="secondary" onClick={() => setName(clientName ?? '')}>
            {t.changeName}
          </Button>
        </div>
      )}
    </Screen>
  )
}
