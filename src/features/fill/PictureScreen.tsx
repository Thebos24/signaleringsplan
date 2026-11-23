import { useState } from 'react'
import { BackButton } from '../../components/BackButton'
import { GuideTile, GuideTileGrid } from '../../components/GuideTile'
import { LargeTitle } from '../../components/LargeTitle'
import { Picto } from '../../components/Picto'
import { Screen } from '../../components/Screen'
import type { NewImage } from '../../storage/planStore'
import { nl } from '../../text/nl'
import { PhotoCropper } from '../photo/PhotoCropper'
import { PICTO_IDS } from '../pictos/pictos'
import { searchPictos } from '../pictos/searchPictos'

const t = nl.fill

// Screen 4: choose a picture for a tile (SPEC §6.3). A pictogram from a grid with a search field (D-028),
// or an own photo: made square (T-2.4), turned into a sketch and confirmed with "Gebruik" (T-2.5, D-010).
// `onPick` gets the choice; the tile screen keeps it until "Klaar".
export function PictureScreen({
  onPick,
  onBack,
}: {
  onPick: (image: NewImage) => void
  onBack: () => void
}) {
  const [search, setSearch] = useState('')
  // The file that is being made square right now
  const [cropping, setCropping] = useState<Blob>()

  if (cropping) {
    // The cropper has its own "Annuleren", so no "Terug" here (two ways to cancel confused people, D-029)
    return (
      <Screen key="crop">
        <LargeTitle>{t.cropTitle}</LargeTitle>
        <PhotoCropper
          file={cropping}
          onCancel={() => setCropping(undefined)}
          onUse={(blob) => onPick({ type: 'photo', blob })}
        />
      </Screen>
    )
  }

  const shown = searchPictos(PICTO_IDS, nl.pictoWords, search)

  return (
    <Screen key="pick">
      <BackButton label={t.back} onClick={onBack} />
      <LargeTitle>{t.pictureTitle}</LargeTitle>

      <input
        type="search"
        className="fill-search"
        aria-label={t.pictoSearchLabel}
        placeholder={t.pictoSearchHint}
        value={search}
        autoComplete="off"
        onChange={(e) => setSearch(e.target.value)}
      />
      {shown.length === 0 && <p className="fill-section__question">{t.pictoNone}</p>}
      <GuideTileGrid>
        {shown.map((id) => (
          <GuideTile
            key={id}
            image={<Picto id={id} />}
            text={nl.pictoWords[id]?.name ?? id}
            onClick={() => onPick({ type: 'picto', pictoId: id })}
          />
        ))}
      </GuideTileGrid>

      <section className="fill-section">
        <h2 className="fill-section__title">{t.orPhoto}</h2>
        {/* No `capture`: the phone then asks "camera or photo library" (D-029) */}
        <label className="button button--secondary fill-file-button">
          {t.takePhoto}
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
      </section>
    </Screen>
  )
}
