// TEMPORARY (T-0.4): proof that IndexedDB via Dexie keeps text and a photo on the iPhone (D-013, R-001).
// Uses its own database name, so the real database from T-1.1 starts clean. Remove when Checkpoint 0 is done.
import Dexie, { type EntityTable } from 'dexie'

export interface ProofNote {
  id: 'note'
  text: string
  savedAt: number
}

export interface ProofPhoto {
  id: 'photo'
  blob: Blob
  width: number
  height: number
  savedAt: number
}

class ProofDatabase extends Dexie {
  notes!: EntityTable<ProofNote, 'id'>
  photos!: EntityTable<ProofPhoto, 'id'>

  constructor() {
    super('signaleringsplan-proef')
    // Versioned from the start (R-010)
    this.version(1).stores({ notes: 'id', photos: 'id' })
  }
}

const db = new ProofDatabase()

export async function loadNote(): Promise<ProofNote | undefined> {
  return db.notes.get('note')
}

export async function saveNote(text: string): Promise<void> {
  await db.notes.put({ id: 'note', text, savedAt: Date.now() })
}

export async function loadPhoto(): Promise<ProofPhoto | undefined> {
  return db.photos.get('photo')
}

export async function savePhoto(blob: Blob, width: number, height: number): Promise<void> {
  await db.photos.put({ id: 'photo', blob, width, height, savedAt: Date.now() })
}
