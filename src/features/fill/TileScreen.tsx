import { useRef, useState } from 'react'
import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { LargeTitle } from '../../components/LargeTitle'
import { ListGroup } from '../../components/ListGroup'
import { ListRow } from '../../components/ListRow'
import { Picto } from '../../components/Picto'
import { Screen } from '../../components/Screen'
import {
  MAX_TILE_TEXT_LENGTH,
  cleanText,
  type Color,
  type Tile,
  type TileKind,
} from '../../domain/plan'
import { addTile, deleteTile, moveTile, updateTile, type NewImage } from '../../storage/planStore'
import { nl } from '../../text/nl'
import { PhotoImage } from '../photo/PhotoImage'
import { PictureScreen } from './PictureScreen'
import { TileImage } from './TileImage'

const t = nl.fill

// Screen 3: one tile, new or changed (SPEC §6.3): a preview, the text, the picture, the place in the list.
// "Klaar" saves text and picture and goes back; "Terug" drops what was typed. The order changes at once
// (it is not a draft). The picture is chosen on its own screen (PictureScreen); the draft stays here meanwhile.
export function TileScreen({
  color,
  kind,
  tileId,
  tiles,
  onChanged,
  onBack,
}: {
  color: Color
  kind: TileKind
  tileId?: number // no tileId = a new tile
  tiles: Tile[] // all tiles, in order
  onChanged: () => Promise<void> | void
  onBack: () => void
}) {
  const tile = tileId === undefined ? undefined : tiles.find((x) => x.id === tileId)
  const list = tiles.filter((x) => x.color === color && x.kind === kind)
  const index = tile ? list.findIndex((x) => x.id === tile.id) : -1

  const [text, setText] = useState(tile?.text ?? '')
  // Only set when a picture was chosen on this screen; a tile keeps its old picture (or photo) until then
  const [image, setImage] = useState<NewImage>()
  const [picking, setPicking] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [busy, setBusy] = useState(false)
  const [failed, setFailed] = useState(false)
  // Set when "Klaar" was tapped while something is missing: then we say what is missing (D-031)
  const [triedToSave, setTriedToSave] = useState(false)
  const textField = useRef<HTMLInputElement>(null)

  const isSignal = kind === 'signal'
  const title = tile
    ? isSignal
      ? t.editSignal
      : t.editAction
    : isSignal
      ? t.addSignal
      : t.addAction
  const missingText = cleanText(text) === ''
  const missingPicture = image === undefined && !tile
  const missing = !triedToSave
    ? undefined
    : missingText
      ? t.missingText
      : missingPicture
        ? t.missingPicture
        : undefined

  async function run(change: () => Promise<unknown>, leaveAfter: boolean) {
    setBusy(true)
    setFailed(false)
    try {
      await change()
      await onChanged()
      if (leaveAfter) onBack()
      else setBusy(false)
    } catch {
      setFailed(true)
      setBusy(false)
    }
  }

  function save() {
    if (missingText || missingPicture) {
      setTriedToSave(true)
      if (missingText) textField.current?.focus()
      return
    }
    void run(async () => {
      if (tile) await updateTile(tile.id, { text, image })
      else if (image) await addTile({ kind, color, text, image })
    }, true)
  }

  if (picking) {
    return (
      <PictureScreen
        onPick={(chosen) => {
          setImage(chosen)
          setPicking(false)
        }}
        onBack={() => setPicking(false)}
      />
    )
  }

  const hasPicture = image !== undefined || tile !== undefined
  const previewImage = image ? (
    image.type === 'picto' ? (
      <Picto id={image.pictoId} />
    ) : (
      <PhotoImage blob={image.blob} />
    )
  ) : tile ? (
    <TileImage image={tile.image} />
  ) : undefined

  return (
    <Screen
      bottomBar={
        confirming ? (
          <>
            <p className="fill-sure">{t.sure}</p>
            <Button
              disabled={busy}
              onClick={() => tile && void run(() => deleteTile(tile.id), true)}
            >
              {t.sureYes}
            </Button>
            <Button variant="secondary" onClick={() => setConfirming(false)}>
              {t.sureNo}
            </Button>
          </>
        ) : (
          <>
            <Button disabled={busy} onClick={save}>
              {t.done}
            </Button>
            {tile && (
              <Button variant="secondary" onClick={() => setConfirming(true)}>
                {t.remove}
              </Button>
            )}
          </>
        )
      }
    >
      <BackButton label={t.back} onClick={onBack} />
      <LargeTitle>{title}</LargeTitle>

      <section className="fill-section" aria-label={t.previewLabel}>
        <ListGroup>
          <ListRow image={previewImage} title={cleanText(text) || t.previewEmpty} />
        </ListGroup>
      </section>

      <label className="fill-field">
        {t.textLabel}
        <input
          ref={textField}
          type="text"
          value={text}
          maxLength={MAX_TILE_TEXT_LENGTH}
          autoComplete="off"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save()
          }}
        />
      </label>

      <Button variant="secondary" onClick={() => setPicking(true)}>
        {hasPicture ? t.otherPicture : t.pickPicture}
      </Button>

      {tile && (
        <div className="fill-buttons fill-buttons--pair">
          <Button
            variant="secondary"
            disabled={busy || index <= 0}
            onClick={() => void run(() => moveTile(tile.id, 'up'), false)}
          >
            {t.earlier}
          </Button>
          <Button
            variant="secondary"
            disabled={busy || index === list.length - 1}
            onClick={() => void run(() => moveTile(tile.id, 'down'), false)}
          >
            {t.later}
          </Button>
        </div>
      )}

      {failed && <p role="alert">{t.saveFailed}</p>}
      {missing && <p role="alert">{missing}</p>}
    </Screen>
  )
}
