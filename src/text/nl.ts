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
    youAreOn: 'Je bent op',
    allGood: 'Het gaat goed!',
    back: 'Terug',
  },

  loading: 'Even wachten…',
  loadFailed: 'Er ging iets mis met het openen van je plan.',

  // Filling-in mode for the supervisor (SPEC §6, D-035). Ordinary language is fine here (DESIGN.md).
  fill: {
    back: 'Terug',
    done: 'Klaar',
    // Screen 1: the plan
    planTitle: 'Plan van {name}',
    planTitleNoName: 'Plan',
    planCaption: 'Tik op een kleur om die in te vullen.',
    intro:
      'Met deze app ziet de cliënt wat hij merkt en wat hij dan kan doen: groen, oranje of rood. Alles blijft op deze telefoon.',
    introFillTogether: 'Vul dit plan samen in.',
    signalCountOne: '1 signaal',
    signalCountMany: '{n} signalen',
    actionCountOne: '1 actie',
    actionCountMany: '{n} acties',
    preview: 'Bekijk als cliënt',
    backToFill: 'Terug naar invullen',
    changeName: 'Naam wijzigen',
    nameLabel: 'Voornaam van de cliënt (mag leeg)',
    nameSave: 'Bewaar',
    nameCancel: 'Annuleren',
    // Screen 2: one colour
    signalsTitle: 'Signalen',
    signalsQuestion: 'Wat merk je dan?',
    actionsTitle: 'Acties',
    actionsQuestion: 'Wat kun je dan doen?',
    addSignalTile: 'Signaal toevoegen',
    addActionTile: 'Actie toevoegen',
    full: 'De lijst is vol: er passen er {max}.',
    // Screen 3: one tile
    addSignal: 'Nieuw signaal',
    addAction: 'Nieuwe actie',
    editSignal: 'Signaal wijzigen',
    editAction: 'Actie wijzigen',
    previewLabel: 'Zo ziet de cliënt het',
    previewEmpty: 'Hier komt de tekst',
    textLabel: 'Wat staat erop?',
    pickPicture: 'Kies een plaatje of foto',
    otherPicture: 'Ander plaatje of foto',
    earlier: '← Eerder',
    later: 'Later →',
    remove: 'Verwijderen',
    sure: 'Weet je het zeker?',
    sureYes: 'Ja, verwijderen',
    sureNo: 'Nee',
    saveFailed: 'Het opslaan lukte niet. Probeer het nog eens.',
    missingText: 'Schrijf eerst wat er op de tegel staat.',
    missingPicture: 'Kies eerst een plaatje of een foto.',
    // Screen 4: choose a picture
    pictureTitle: 'Plaatje kiezen',
    pictoSearchLabel: 'Zoek een plaatje',
    pictoSearchHint: 'Typ bijvoorbeeld: boos',
    pictoNone: 'Niets gevonden. Probeer een ander woord.',
    orPhoto: 'Of een eigen foto',
    takePhoto: 'Foto maken of kiezen',
    cropTitle: 'Foto',
    cancel: 'Annuleren',
  },

  // Making a photo square (T-2.4)
  photo: {
    loading: 'De foto wordt geladen…',
    hint: 'Schuif de foto met je vinger. Maak hem groter of kleiner met twee vingers of met de schuif.',
    frameLabel: 'De foto. Schuif om een ander stuk te kiezen.',
    zoomLabel: 'Groter of kleiner',
    use: 'Gebruik deze foto',
    failed: 'Deze foto lukt niet. Kies een andere foto.',
    // The photo as a sketch (T-2.5)
    sketching: 'De tekening wordt gemaakt…',
    sketchHint: 'Zo komt de foto op de tegel.',
    sketchAlt: 'De foto als tekening',
    sketchUse: 'Gebruik',
    sketchAgain: 'Opnieuw',
  },

  // Name and search words per pictogram (T-2.3). The name is what a screen reader says; the search
  // words are what the supervisor can type in the search field. Phase 4 adds the rest of the set.
  pictoWords: {
    caregiver: { name: 'Begeleider', keywords: ['hulp', 'persoon', 'mijn begeleider', 'iemand'] },
    walk: { name: 'Wandelen', keywords: ['lopen', 'buiten', 'wandeling', 'frisse lucht'] },
    music: { name: 'Muziek', keywords: ['luisteren', 'liedje', 'zingen', 'koptelefoon'] },
    water: { name: 'Water', keywords: ['drinken', 'dorst', 'glas'] },
    sleep: { name: 'Slapen', keywords: ['bed', 'slaap', 'nacht', 'rusten'] },
    breathe: {
      name: 'Rustig ademhalen',
      keywords: ['ademen', 'adem', 'rust', 'ontspannen', 'kalm'],
    },
    shower: { name: 'Douchen', keywords: ['douche', 'wassen', 'water', 'fris'] },
    talk: {
      name: 'Praten',
      keywords: ['praten met iemand', 'vertellen', 'gesprek', 'vriend', 'samen'],
    },
    phone: { name: 'Bellen', keywords: ['telefoon', 'bellen', 'iemand bellen', 'hulp'] },
    'quiet-place': {
      name: 'Rustige plek',
      keywords: ['stoel', 'zitten', 'alleen', 'rust', 'kamer'],
    },
    draw: { name: 'Tekenen', keywords: ['tekening', 'potlood', 'kleuren', 'maken'] },
    sport: { name: 'Sporten', keywords: ['sport', 'fitness', 'bewegen', 'gewichten', 'trainen'] },
    eat: { name: 'Eten', keywords: ['bord', 'maaltijd', 'honger', 'eten maken'] },
    tv: { name: 'Tv kijken', keywords: ['televisie', 'film', 'serie', 'kijken'] },
    pet: { name: 'Dier', keywords: ['knuffel', 'kat', 'hond', 'huisdier', 'aaien'] },
    tidy: { name: 'Opruimen', keywords: ['vegen', 'schoonmaken', 'bezem', 'kamer'] },
    'sit-outside': { name: 'Buiten zitten', keywords: ['bankje', 'zon', 'buiten', 'park'] },
    game: { name: 'Spelletje', keywords: ['spel', 'dobbelsteen', 'bordspel', 'gamen'] },
    headphones: { name: 'Koptelefoon op', keywords: ['koptelefoon', 'muziek', 'stil', 'geluid'] },
    read: { name: 'Lezen', keywords: ['boek', 'verhaal', 'tijdschrift'] },
    angry: { name: 'Boos', keywords: ['kwaad', 'woedend', 'ruzie'] },
    sad: { name: 'Verdrietig', keywords: ['triest', 'somber', 'alleen'] },
    tired: { name: 'Moe', keywords: ['vermoeid', 'slaperig', 'uitgeput', 'geen energie'] },
    headache: { name: 'Hoofdpijn', keywords: ['pijn', 'hoofd', 'ziek'] },
    cry: { name: 'Huilen', keywords: ['tranen', 'verdrietig', 'janken'] },
    irritated: {
      name: 'Snel geïrriteerd',
      keywords: ['geïrriteerd', 'geirriteerd', 'prikkelbaar', 'chagrijnig', 'kort lontje'],
    },
    shout: { name: 'Schreeuwen', keywords: ['roepen', 'gillen', 'boos', 'hard praten'] },
    worry: { name: 'Piekeren', keywords: ['zorgen', 'nadenken', 'malen', 'bang'] },
    'busy-head': {
      name: 'Druk in mijn hoofd',
      keywords: ['druk', 'hoofd', 'chaos', 'onrustig', 'te veel'],
    },
    'bad-sleep': {
      name: 'Slecht slapen',
      keywords: ['wakker', 'niet slapen', 'nacht', 'slapeloos'],
    },
    stomachache: { name: 'Buikpijn', keywords: ['buik', 'pijn', 'misselijk', 'ziek'] },
    'no-appetite': {
      name: 'Niet eten',
      keywords: ['geen honger', 'geen trek', 'overslaan', 'eten'],
    },
    overeat: { name: 'Veel eten', keywords: ['te veel eten', 'snoepen', 'vreten', 'eten'] },
    alone: {
      name: 'Alleen willen zijn',
      keywords: ['alleen', 'met rust laten', 'stop', 'afstand'],
    },
    'stay-inside': {
      name: 'Niet naar buiten',
      keywords: ['binnen blijven', 'thuis', 'huis', 'niet weg'],
    },
    'phone-checking': {
      name: 'Steeds telefoon pakken',
      keywords: ['telefoon', 'mobiel', 'scrollen', 'steeds'],
    },
    calm: { name: 'Rustig', keywords: ['kalm', 'ontspannen', 'goed', 'rust'] },
    energy: { name: 'Energie', keywords: ['vrolijk', 'zin', 'actief', 'fit', 'springen'] },
    happy: { name: 'Blij', keywords: ['goed', 'vrolijk', 'lachen', 'fijn', 'het gaat goed'] },
  } as Record<string, { name: string; keywords: string[] }>,

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

  // TEMPORARY trial page for the pictograms (T-4.1, #pictos). Remove in T-4.4.
  gallery: {
    title: 'Proef: pictogrammen',
    intro: 'Zo zien de plaatjes eruit. Herken je ze zonder de tekst?',
    inRows: 'Zo staan ze in de lijst:',
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
