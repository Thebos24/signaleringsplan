import { useState } from 'react'
import { BigButton } from '../../components/BigButton'
import { Picto } from '../../components/Picto'
import { MAX_TILE_TEXT_LENGTH, cleanText, type Tile, type TileKind } from '../../domain/plan'
import { PICTO_IDS } from '../pictos/pictos'
import { nl } from '../../text/nl'

const t = nl.fill

// Add or change one tile: a short text and a picture (SPEC §6.3).
// TEMPORARY picture choice: a plain row of the placeholder pictograms. T-2.3 replaces it with the
// searchable chooser, T-2.4 and T-2.5 add photos.
export function TileForm({
  kind,
  tile,
  onSave,
  onCancel,
}: {
  kind: TileKind
  tile?: Tile // given when changing a tile
  onSave: (text: string, pictoId: string) => Promise<void>
  onCancel: () => void
}) {
  const [text, setText] = useState(tile?.text ?? '')
  // A tile with a photo keeps it until a picto is chosen (photos come in T-2.4)
  const [pictoId, setPictoId] = useState(tile?.image.type === 'picto' ? tile.image.pictoId : '')
  const [failed, setFailed] = useState(false)
  const [saving, setSaving] = useState(false)

  const title = tile
    ? kind === 'signal'
      ? t.editSignal
      : t.editAction
    : kind === 'signal'
      ? t.addSignal
      : t.addAction
  // Empty picto id on a tile with a photo means: keep the photo
  const keepsPhoto = tile?.image.type === 'photo' && pictoId === ''
  const canSave = cleanText(text) !== '' && (pictoId !== '' || keepsPhoto) && !saving

  async function save() {
    setSaving(true)
    setFailed(false)
    try {
      await onSave(text, pictoId)
    } catch {
      setFailed(true)
      setSaving(false)
    }
  }

  return (
    <form
      className="fill__form"
      onSubmit={(e) => {
        e.preventDefault()
        if (canSave) void save()
      }}
    >
      <h3>{title}</h3>
      <label className="fill__field">
        {t.textLabel}
        <input
          type="text"
          value={text}
          maxLength={MAX_TILE_TEXT_LENGTH}
          autoComplete="off"
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <fieldset className="fill__pictos">
        <legend>{t.pictoLabel}</legend>
        {PICTO_IDS.map((id) => (
          <label key={id} className="fill__picto-choice">
            <input
              type="radio"
              name="picto"
              value={id}
              checked={pictoId === id}
              onChange={() => setPictoId(id)}
            />
            <Picto id={id} />
          </label>
        ))}
      </fieldset>
      {failed && <p role="alert">{t.saveFailed}</p>}
      <div className="fill__actions">
        <BigButton onClick={() => void save()} disabled={!canSave}>
          {t.save}
        </BigButton>
        <BigButton variant="quiet" onClick={onCancel}>
          {t.cancel}
        </BigButton>
      </div>
    </form>
  )
}
