import { useRef, useState } from 'react'
import { BigButton } from '../../components/BigButton'
import { Picto } from '../../components/Picto'
import { MAX_TILE_TEXT_LENGTH, cleanText, type Tile, type TileKind } from '../../domain/plan'
import type { NewImage } from '../../storage/planStore'
import { PICTO_IDS } from '../pictos/pictos'
import { PhotoCropper } from '../photo/PhotoCropper'
import { PhotoImage } from '../photo/PhotoImage'
import { searchPictos } from '../pictos/searchPictos'
import { nl } from '../../text/nl'

const t = nl.fill

// Add or change one tile: a short text and a picture (SPEC §6.3).
// The picture is a pictogram from a grid with a search field (T-2.3), or an own photo that is
// made square first (T-2.4) and turned into a sketch (T-2.5).
export function TileForm({
  kind,
  tile,
  onSave,
  onCancel,
}: {
  kind: TileKind
  tile?: Tile // given when changing a tile
  // `image` is undefined when a changed tile keeps its photo
  onSave: (text: string, image: NewImage | undefined) => Promise<void>
  onCancel: () => void
}) {
  const [text, setText] = useState(tile?.text ?? '')
  // A tile with a photo keeps it until a picto or another photo is chosen
  const [pictoId, setPictoId] = useState(tile?.image.type === 'picto' ? tile.image.pictoId : '')
  const [newPhoto, setNewPhoto] = useState<Blob>()
  // The file that is being made square right now
  const [cropping, setCropping] = useState<Blob>()
  const [search, setSearch] = useState('')
  const [failed, setFailed] = useState(false)
  const [saving, setSaving] = useState(false)
  // Set when "Bewaar" was tapped while something is missing: then we say what is missing
  const [triedToSave, setTriedToSave] = useState(false)
  const textField = useRef<HTMLInputElement>(null)

  const shown = searchPictos(PICTO_IDS, nl.pictoWords, search)

  const title = tile
    ? kind === 'signal'
      ? t.editSignal
      : t.editAction
    : kind === 'signal'
      ? t.addSignal
      : t.addAction
  // No picto and no new photo on a tile with a photo means: keep the photo
  const oldPhotoId =
    tile?.image.type === 'photo' && pictoId === '' && !newPhoto ? tile.image.photoId : undefined
  const image: NewImage | undefined = newPhoto
    ? { type: 'photo', blob: newPhoto }
    : pictoId !== ''
      ? { type: 'picto', pictoId }
      : undefined
  const hasPhoto = newPhoto !== undefined || oldPhotoId !== undefined
  const missingText = cleanText(text) === ''
  const missingPicture = image === undefined && !hasPhoto
  // "Bewaar" is never greyed out without a reason: a tap with something missing says what is
  // missing (the text field may be far up the screen after choosing a photo)
  const missing = !triedToSave
    ? undefined
    : missingText
      ? t.missingText
      : missingPicture
        ? t.missingPicture
        : undefined

  async function save() {
    if (missingText || missingPicture) {
      setTriedToSave(true)
      if (missingText) textField.current?.focus()
      return
    }
    setSaving(true)
    setFailed(false)
    try {
      await onSave(text, image)
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
        if (!saving && !cropping) void save()
      }}
    >
      <h3>{title}</h3>
      <label className="fill__field">
        {t.textLabel}
        <input
          ref={textField}
          type="text"
          value={text}
          maxLength={MAX_TILE_TEXT_LENGTH}
          autoComplete="off"
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      {cropping ? (
        <PhotoCropper
          file={cropping}
          onCancel={() => setCropping(undefined)}
          onUse={(blob) => {
            setNewPhoto(blob)
            setPictoId('')
            setCropping(undefined)
          }}
        />
      ) : (
        <>
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
                  onChange={() => {
                    setPictoId(id)
                    setNewPhoto(undefined)
                  }}
                />
                <Picto id={id} />
                <span className="fill__picto-name">{nl.pictoWords[id]?.name ?? id}</span>
              </label>
            ))}
          </fieldset>
          <div className="fill__photo">
            <p>{t.orPhoto}</p>
            {hasPhoto && (
              <div className="fill__photo-chosen">
                <PhotoImage photoId={oldPhotoId} blob={newPhoto} />
                <span>{t.photoChosen}</span>
              </div>
            )}
            {/* No `capture`: the phone then asks "camera or photo library" (D-029) */}
            <label className="big-button big-button--quiet fill__photo-button">
              {hasPhoto ? t.otherPhoto : t.takePhoto}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  e.target.value = '' // so the same photo can be chosen again
                  if (file) setCropping(file)
                }}
              />
            </label>
          </div>
        </>
      )}
      {failed && <p role="alert">{t.saveFailed}</p>}
      {missing && !cropping && <p role="alert">{missing}</p>}
      {/* While cropping, the cropper has its own buttons; two "Annuleren" would be confusing */}
      {!cropping && (
        <div className="fill__actions">
          <BigButton onClick={() => void save()} disabled={saving}>
            {t.save}
          </BigButton>
          <BigButton variant="quiet" onClick={onCancel}>
            {t.cancel}
          </BigButton>
        </div>
      )}
    </form>
  )
}
