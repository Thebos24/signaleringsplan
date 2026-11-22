// The built-in pictograms (D-011). TEMPORARY placeholders (T-1.5); the real set comes in phase 4.
// An id is the file name in public/pictos/ and is stored in the plan (ImageRef), so keep ids stable.
export const PICTO_IDS = [
  'caregiver', // the default red action (D-008, D-023)
  'walk',
  'music',
  'water',
  'sleep',
  'angry',
  'sad',
  'tired',
  'headache',
  'happy',
] as const

export type PictoId = (typeof PICTO_IDS)[number]
export const CAREGIVER_PICTO_ID: PictoId = 'caregiver'
