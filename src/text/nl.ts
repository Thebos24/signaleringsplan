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

  loading: 'Even wachten…',
  loadFailed: 'Er ging iets mis met het openen van je plan.',

  // Filling-in mode for the supervisor (SPEC §6). Ordinary language is fine here (DESIGN.md).
  fill: {
    welcomeTitle: 'Welkom',
    welcomeText:
      'Met deze app ziet de cliënt wat hij merkt en wat hij dan kan doen: groen, oranje of rood. Alles blijft op deze telefoon.',
    welcomeFillTogether: 'Vul dit plan samen in.',
    nameLabel: 'Voornaam van de cliënt (mag leeg)',
    next: 'Verder',
    title: 'Plan invullen',
    close: 'Klaar',
    colorTabs: 'Kies een kleur',
    signalsTitle: 'Signalen',
    signalsQuestion: 'Wat merk je dan?',
    actionsTitle: 'Acties',
    actionsQuestion: 'Wat kun je dan doen?',
    empty: 'Nog niets.',
    add: 'Toevoegen',
    full: 'De lijst is vol: er passen er {max}.',
    edit: 'Wijzigen',
    remove: 'Verwijderen',
    moveUp: 'Omhoog',
    moveDown: 'Omlaag',
    // {text} is the text of the tile, so a screen reader knows which tile a button is for
    editLabel: 'Wijzig: {text}',
    removeLabel: 'Verwijder: {text}',
    moveUpLabel: 'Omhoog: {text}',
    moveDownLabel: 'Omlaag: {text}',
    sure: 'Weet je het zeker?',
    sureYes: 'Ja, verwijderen',
    sureNo: 'Nee',
    addSignal: 'Nieuw signaal',
    addAction: 'Nieuwe actie',
    editSignal: 'Signaal wijzigen',
    editAction: 'Actie wijzigen',
    textLabel: 'Wat staat er op de tegel?',
    // TEMPORARY until the picture chooser (T-2.3)
    pictoLabel: 'Kies een plaatje',
    save: 'Bewaar',
    cancel: 'Annuleren',
    saveFailed: 'Het opslaan lukte niet. Probeer het nog eens.',
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
