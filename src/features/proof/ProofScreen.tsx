// TEMPORARY (T-0.4): proof screen for Checkpoint 0. Remove when the real screens arrive.
import { useEffect, useState, type ChangeEvent } from 'react'
import { nl } from '../../text/nl'
import { loadNote, loadPhoto, saveNote, savePhoto } from '../../storage/proofDb'
import { isStandalone, requestPersistentStorage, type PersistResult } from '../../storage/persist'
import { resizePhoto } from './resizePhoto'
import './proof.css'

const t = nl.proof

function formatTime(ms: number): string {
  return new Date(ms).toLocaleString('nl-NL')
}

export function ProofScreen() {
  const [text, setText] = useState('')
  const [noteSavedAt, setNoteSavedAt] = useState<number>()
  const [photoUrl, setPhotoUrl] = useState<string>()
  const [photoSavedAt, setPhotoSavedAt] = useState<number>()
  const [persist, setPersist] = useState<PersistResult | 'asking'>('asking')
  const [error, setError] = useState<string>()

  useEffect(() => {
    requestPersistentStorage().then(setPersist)
    loadNote()
      .then((note) => {
        if (note) {
          setText(note.text)
          setNoteSavedAt(note.savedAt)
        }
      })
      .catch((e: unknown) => setError(String(e)))
    loadPhoto()
      .then((photo) => {
        if (photo) {
          setPhotoUrl(URL.createObjectURL(photo.blob))
          setPhotoSavedAt(photo.savedAt)
        }
      })
      .catch((e: unknown) => setError(String(e)))
  }, [])

  // Free the object URL when the photo changes or the screen closes
  useEffect(
    () => () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl)
    },
    [photoUrl],
  )

  async function handleSaveNote() {
    try {
      await saveNote(text)
      setNoteSavedAt(Date.now())
    } catch (e) {
      setError(String(e))
    }
  }

  async function handlePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    try {
      const { blob, width, height } = await resizePhoto(file)
      await savePhoto(blob, width, height)
      setPhotoUrl(URL.createObjectURL(blob))
      setPhotoSavedAt(Date.now())
    } catch (e) {
      setError(String(e))
    }
  }

  const persistText = {
    asking: t.persistAsking,
    granted: t.persistGranted,
    denied: t.persistDenied,
    unsupported: t.persistUnsupported,
  }[persist]

  return (
    <main className="proof">
      <h1>{t.title}</h1>

      <section>
        <label htmlFor="proof-note">{t.noteLabel}</label>
        <textarea id="proof-note" value={text} onChange={(e) => setText(e.target.value)} rows={3} />
        <button type="button" onClick={handleSaveNote}>
          {t.saveNote}
        </button>
        {noteSavedAt && (
          <p>
            {t.savedAt} {formatTime(noteSavedAt)}
          </p>
        )}
      </section>

      <section>
        <h2>{t.photoLabel}</h2>
        {photoUrl ? <img src={photoUrl} alt={t.photoAlt} /> : <p>{t.noPhoto}</p>}
        {photoSavedAt && (
          <p>
            {t.savedAt} {formatTime(photoSavedAt)}
          </p>
        )}
        <label className="proof-photo-button">
          {t.takePhoto}
          <input type="file" accept="image/*" capture="environment" onChange={handlePhoto} />
        </label>
      </section>

      <section>
        <h2>{t.statusTitle}</h2>
        <p>
          {t.persist}: <strong>{persistText}</strong>
        </p>
        <p>
          {t.standalone}: <strong>{isStandalone() ? t.yes : t.no}</strong>
        </p>
        {error && (
          <p role="alert">
            {t.error}: {error}
          </p>
        )}
      </section>
    </main>
  )
}
