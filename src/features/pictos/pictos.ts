// The built-in pictograms (D-011, D-037). The source drawings are in ./sources/ (T-2.8); the full set comes in phase 4.
// An id is the file name in ./sources/ and is stored in the plan (ImageRef), so keep ids stable.
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
