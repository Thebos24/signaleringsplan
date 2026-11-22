import { useState } from 'react'
import { BigButton } from '../../components/BigButton'
import { Picto } from '../../components/Picto'
import { MAX_TILE_TEXT_LENGTH, cleanText, type Tile, type TileKind } from '../../domain/plan'
import { PICTO_IDS } from '../pictos/pictos'
import { searchPictos } from '../pictos/searchPictos'
import { nl } from '../../text/nl'

const t = nl.fill

// Add or change one tile: a short text and a picture (SPEC §6.3).
// The picture is chosen from a grid with a search field (T-2.3). T-2.4 and T-2.5 add photos.
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
  const [search, setSearch] = useState('')
  const [failed, setFailed] = useState(false)
  const [saving, setSaving] = useState(false)

  const shown = searchPictos(PICTO_IDS, nl.pictoWords, search)

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
        <input
          type="search"
          className="fill__picto-search"
          aria-label={t.pictoSearchLabel}
          placeholder={t.pictoSearchHint}
          value={search}
          autoComplete="off"
          onChange={(e) => setSearch(e.target.value)}
          // Enter in the search field must not save the tile
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.preventDefault()
          }}
        />
        {shown.length === 0 && <p className="fill__picto-none">{t.pictoNone}</p>}
        {shown.map((id) => (
          <label key={id} className="fill__picto-choice">
            <input
              type="radio"
              name="picto"
              value={id}
              checked={pictoId === id}
              onChange={() => setPictoId(id)}
            />
            <Picto id={id} />
            <span className="fill__picto-name">{nl.pictoWords[id]?.name ?? id}</span>
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
