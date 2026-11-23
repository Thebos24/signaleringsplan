import { useState } from 'react'
import { BigButton } from '../../components/BigButton'
import { ColorBadge } from '../../components/ColorBadge'
import { COLORS, type Color } from '../../domain/plan'
import type { PlanData } from '../plan/usePlan'
import { nl } from '../../text/nl'
import { TileList } from './TileList'

const t = nl.fill

// The editor (SPEC §6.3): one tab per colour; per colour a list of signals (not green) and of actions.
export function Editor({
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
  const [color, setColor] = useState<Color>('orange')
  const inList = (kind: 'signal' | 'action') =>
    data.tiles.filter((tile) => tile.color === color && tile.kind === kind)

  return (
    <main className="fill">
      <h1>{t.title}</h1>

      <div role="group" aria-label={t.colorTabs} className="fill__tabs">
        {COLORS.map((c) => (
          <button
            key={c}
            type="button"
            className={`fill__tab fill__tab--${c}`}
            aria-pressed={c === color}
            onClick={() => setColor(c)}
          >
            <ColorBadge color={c} />
          </button>
        ))}
      </div>

      {/* Green has no signals: it is how it goes when it goes well (SPEC §5.2) */}
      {color !== 'green' && (
        <TileList color={color} kind="signal" tiles={inList('signal')} onChanged={onChanged} />
      )}
      <TileList color={color} kind="action" tiles={inList('action')} onChanged={onChanged} />

      <BigButton onClick={onPreview}>{t.preview}</BigButton>
      <BigButton onClick={onClose}>{t.close}</BigButton>
    </main>
  )
}
