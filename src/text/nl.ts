// All user-facing text lives here (D-015). Simple Dutch, short sentences.
export const nl = {
  hello: 'Hallo',

  // The three colours as words (DESIGN.md rule 6: colour is never the only carrier of meaning)
  colors: {
    green: 'Groen',
    orange: 'Oranje',
    red: 'Rood',
  },

  // Tiles that a new plan starts with (D-008). Stored in the plan, so changing this later
  // only affects new plans.
  defaults: {
    redAction: 'Ik ga naar mijn begeleider',
  },

  // TEMPORARY proof screen (T-0.4). Remove after Checkpoint 0.
  proof: {
    title: 'Proef: blijft alles staan?',
    noteLabel: 'Typ iets',
    saveNote: 'Bewaar tekst',
    noteSaved: 'Opgeslagen',
    photoLabel: 'Foto',
    takePhoto: 'Maak of kies een foto',
    noPhoto: 'Nog geen foto',
    photoAlt: 'De opgeslagen foto',
    savedAt: 'Bewaard op',
    statusTitle: 'Techniek',
    persist: 'Opslag blijft bewaard',
    persistGranted: 'ja',
    persistDenied: 'nee',
    persistUnsupported: 'weet niet (niet ondersteund)',
    persistAsking: 'bezig…',
    standalone: 'Geopend vanaf beginscherm',
    yes: 'ja',
    no: 'nee',
    error: 'Er ging iets mis',
  },
}
