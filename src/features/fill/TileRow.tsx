import { useState } from 'react'
import { BigButton } from '../../components/BigButton'
import { Picto } from '../../components/Picto'
import { PhotoImage } from '../photo/PhotoImage'
import type { Tile } from '../../domain/plan'
import { nl } from '../../text/nl'

const t = nl.fill
const label = (template: string, text: string) => template.replace('{text}', text)

// One tile in a list, with the buttons to change, remove and move it.
// Removing asks "Weet je het zeker?" first (SPEC §6.3).
export function TileRow({
  tile,
  isFirst,
  isLast,
  onEdit,
  onRemove,
  onMove,
}: {
  tile: Tile
  isFirst: boolean
  isLast: boolean
  onEdit: () => void
  onRemove: () => void
  onMove: (direction: 'up' | 'down') => void
}) {
  const [confirming, setConfirming] = useState(false)

  return (
    <li className="fill__row">
      <div className="fill__row-main">
        {tile.image.type === 'picto' ? (
          <Picto id={tile.image.pictoId} />
        ) : (
          <PhotoImage photoId={tile.image.photoId} />
        )}
        <span className="fill__row-text">{tile.text}</span>
      </div>
      {confirming ? (
        <div className="fill__actions" role="group" aria-label={t.sure}>
          <strong>{t.sure}</strong>
          <BigButton onClick={onRemove}>{t.sureYes}</BigButton>
          <BigButton variant="quiet" onClick={() => setConfirming(false)}>
            {t.sureNo}
          </BigButton>
        </div>
      ) : (
        <>
          <div className="fill__actions">
            <BigButton
              variant="quiet"
              disabled={isFirst}
              onClick={() => onMove('up')}
              aria-label={label(t.moveUpLabel, tile.text)}
            >
              ↑
            </BigButton>
            <BigButton
              variant="quiet"
              disabled={isLast}
              onClick={() => onMove('down')}
              aria-label={label(t.moveDownLabel, tile.text)}
            >
              ↓
            </BigButton>
          </div>
          <div className="fill__actions">
            <BigButton variant="quiet" onClick={onEdit} aria-label={label(t.editLabel, tile.text)}>
              {t.edit}
            </BigButton>
            <BigButton
              variant="quiet"
              onClick={() => setConfirming(true)}
              aria-label={label(t.removeLabel, tile.text)}
            >
              {t.remove}
            </BigButton>
          </div>
        </>
      )}
    </li>
  )
}
