// All user-facing text lives here (D-015). Simple Dutch, short sentences.
export const nl = {
  hello: 'Hallo',

  // The three colours as words (DESIGN.md rule 6: colour is never the only carrier of meaning)
  colors: {
    green: 'Groen',
    orange: 'Oranje',
    red: 'Rood',
  },

  // Screens for the client (SPEC §5). {name} is filled in by the screen.
  start: {
    title: 'Hoi {name}, wat merk je?',
    titleNoName: 'Hoi, wat merk je?',
    allGood: 'Het gaat goed',
    done: 'Klaar',
  },
  result: {
    youAreOn: 'Je bent op {color}.',
    allGood: 'Het gaat goed!',
    back: 'Terug',
  },

  // The hold-to-open button for the filling-in mode (D-006)
  longPress: {
    label: 'Invullen voor de begeleider',
    hint: 'Houd ingedrukt om te wijzigen',
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
