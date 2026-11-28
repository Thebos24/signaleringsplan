// The built-in pictograms (D-011, D-037, style guide D-045). Actions first, then signals. The source drawings are in ./sources/ (T-2.8); the full set comes in phase 4.
// An id is the file name in ./sources/ and is stored in the plan (ImageRef), so keep ids stable.
export const PICTO_IDS = [
  'caregiver', // the default red action (D-008, D-023)
  'walk',
  'music',
  'water',
  'sleep',
  'breathe',
  'shower',
  'talk',
  'phone',
  'quiet-place',
  'draw',
  'sport',
  'eat',
  'tv',
  'pet',
  'tidy',
  'sit-outside',
  'game',
  'headphones',
  'read',
  'angry',
  'sad',
  'tired',
  'headache',
  'happy',
] as const

export type PictoId = (typeof PICTO_IDS)[number]
export const CAREGIVER_PICTO_ID: PictoId = 'caregiver'
