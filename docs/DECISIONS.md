# Beslissingen

Elke beslissing, **waarom** die genomen is, welke alternatieven zijn **afgewezen en waarom**, en wanneer we hem
herzien. Nieuwe beslissingen onderaan. Verwijder nooit een item: markeer het als `Vervangen door D-0xx`.

**Status:** Besloten · Voorlopig (verwacht, wacht op een check) · Voorstel (wacht op Sander) · Vervangen · Afgewezen

**Sjabloon**

```
### D-0xx — Titel
- Datum: JJJJ-MM-DD · Status: Besloten · Besloten door: Sander / Claude / samen
- Besluit: wat we doen
- Waarom: de redenen
- Afgewezen: alternatief — waarom niet
- Gevolgen: wat dit betekent voor de bouw
- Herzien als: wanneer we dit opnieuw bekijken
```

---

### D-001 — Een web-app (PWA) in plaats van een native app
- Datum: 2026-11-22 · Status: Besloten · Besloten door: Sander
- Besluit: We bouwen een web-app die de cliënt op het beginscherm zet en die als app aanvoelt.
- Waarom: Werkt op iPhone én Android met één codebase. Geen kosten voor App Store of Google Play. Verspreiden
  kan met een linkje. Past bij een laagdrempelig hobbyproject.
- Afgewezen: Native Swift (alleen iPhone, €99 per jaar). Expo/React Native (echte app, maar meer opzet en kosten
  voor de stores, niet nodig voor wat de app doet).
- Gevolgen: Opslag moet goed geregeld zijn op iOS (R-001). Installeren op het beginscherm moet stap voor stap
  uitgelegd worden (T-5.4).
- Herzien als: iOS de opslag van web-apps onbetrouwbaar blijkt te maken, of als verspreiding via de stores nodig wordt (B-010).

### D-002 — Alles blijft op de telefoon
- Datum: 2026-11-22 · Status: Besloten · Besloten door: Sander
- Besluit: Geen server, geen account, geen analytics, geen netwerkaanvragen na het laden.
- Waarom: Het plan bevat gevoelige informatie. Zonder server is er geen datalek-risico en vrijwel geen AVG-werk.
  Ook houdt het de app simpel en gratis.
- Afgewezen: Begeleider-dashboard met meldingen: veel complexer, gezondheidsgegevens op een server, en mogelijk
  regels voor medische hulpmiddelen.
- Gevolgen: Geen externe fonts of CDN's. De begeleider kan alleen op de telefoon van de cliënt invullen.
- Herzien als: nooit voor v1.

### D-003 — Geen export of back-up in de app
- Datum: 2026-11-22 · Status: Besloten · Besloten door: Sander
- Besluit: De app heeft geen export, print of back-up.
- Waarom: Het signaleringsplan staat al in het cliëntdossier (Medicore). Bij een nieuwe telefoon vult de begeleider
  het opnieuw in.
- Afgewezen: Exportbestand of PDF: extra knoppen en een extra plek waar gevoelige gegevens terechtkomen.
- Gevolgen: Gegevensverlies is vervelend maar herstelbaar (R-001, R-002).
- Herzien als: begeleiders klagen dat opnieuw invullen te veel tijd kost.

### D-004 — Drie kleuren: groen, oranje, rood
- Datum: 2026-11-22 · Status: Besloten · Besloten door: Sander
- Besluit: Drie fases, zoals een stoplicht.
- Waarom: Simpel en direct te begrijpen. Sommige papieren plannen hebben vier fases (geel/oranje apart), maar
  voor deze doelgroep is drie duidelijker.
- Afgewezen: Vier of vijf fases: lastiger te kiezen voor de cliënt.
- Herzien als: begeleiders zeggen dat hun plannen niet in drie fases passen (B-008).

### D-005 — Het plan wordt samen met de begeleider ingevuld
- Datum: 2026-11-22 · Status: Besloten · Besloten door: Sander
- Besluit: De signalen en acties per kleur zijn persoonlijk. De cliënt vult ze samen met de begeleider in, op de
  telefoon van de cliënt. De app heeft geen vaste lijst met tips.
- Waarom: Een signaleringsplan werkt alleen als het persoonlijk is. Wat de één helpt, maakt de ander onrustig.
- Afgewezen: Een standaardlijst met tips voor iedereen.
- Gevolgen: Er is een invulmodus nodig (D-006). De pictogrammenset moet breed genoeg zijn (T-4.x).

### D-006 — Invulmodus achter een knop die je 3 seconden ingedrukt houdt
- Datum: 2026-11-22 · Status: Besloten · Besloten door: Sander
- Besluit: Een kleine knop rechtsboven. 3 seconden indrukken (met een ring die volloopt) opent de invulmodus.
- Waarom: Voorkomt dat de cliënt per ongeluk het plan wijzigt, zonder pincode die vergeten kan worden.
- Afgewezen: Pincode (kan vergeten worden, extra scherm). Geen bescherming (te makkelijk per ongeluk).
- Herzien als: cliënten de knop toch per ongeluk lang indrukken. Dan eventueel 5 seconden of een extra bevestiging.

### D-007 — De kleur volgt uit vooraf gekozen signalen
- Datum: 2026-11-22 · Status: Besloten (regel) / Voorlopig (schermindeling) · Besloten door: Sander (regel), Claude (voorstel indeling)
- Besluit: De cliënt kiest niet zelf een kleur, maar tikt signalen aan die vooraf met de begeleider zijn gekozen.
  Regel: een rood signaal → rood; anders een oranje signaal → oranje; anders groen.
- Waarom: Mensen herkennen hun eigen toestand vaak slecht. Signalen zijn concreter. Dit sluit aan bij hoe een
  signaleringsplan werkt. Het moet kort blijven.
- Afgewezen: Zelf een kleur kiezen (minder betrouwbaar). Een lange vragenlijst (te lang).
- Gevolgen: Schermindeling (één scherm of per kleur) is nog open: Q-001. Direct een kleur kiezen: Q-002.
- Herzien als: testen laten zien dat het signaalscherm te druk of te moeilijk is.

### D-008 — Rood: de actie wordt samen bepaald, met een standaardvoorstel
- Datum: 2026-11-22 · Status: Besloten · Besloten door: Sander
- Besluit: Een nieuw plan krijgt bij rood al de actie "Ik ga naar mijn begeleider". De begeleider kan dat aanpassen.
  Op het rode scherm staat de belangrijkste actie extra groot bovenaan.
- Waarom: Bij rood helpen zelfhulp-tips niet meer; dan moet de cliënt naar een mens.
- Gevolgen: Een tekst over noodsituaties (112) is nog een open vraag: Q-005.

### D-009 — Geen opvolgvraag na de tips
- Datum: 2026-11-22 · Status: Besloten · Besloten door: Sander
- Besluit: De app vraagt achteraf niet "Gaat het nu beter?".
- Waarom: Zo simpel mogelijk, zoals een foto van het papieren plan.
- Afgewezen: Opvolgvraag met escalatie: extra stap en extra logica.
- Herzien als: testers het missen (B-009).

### D-010 — Eigen foto's worden een schets, op de telefoon zelf
- Datum: 2026-11-22 · Status: Besloten (functie) / Voorlopig (techniek) · Besloten door: Sander (functie), Claude (techniek)
- Besluit: De begeleider kan een foto maken of kiezen. De app snijdt hem vierkant, verkleint hem tot max. 1024 px
  en zet hem met een canvas-filter om naar een potloodschets (grijswaarden → negatief → vervagen → "color dodge",
  eventueel met randdetectie). Alleen de schets wordt bewaard.
- Waarom: Eigen foto's zijn voor deze doelgroep heel herkenbaar. De schetsstijl houdt het rustig en consistent
  met de pictogrammen. Op de telefoon blijft het privé (D-002).
- Afgewezen: AI-dienst voor de omzetting (stuurt foto's naar een server, kost geld). Originele foto tonen
  (onrustig, past niet bij de stijl, privacygevoeliger).
- Gevolgen: Foto invoer via `<input type="file" accept="image/*" capture>` (werkt op iOS en Android). Filter
  afstemmen in T-2.6 (R-004). (2026-11-23: zonder `capture`, zodat ook de fotobibliotheek kan; zie D-029.)
- Herzien als: de schetsen er bij echte foto's slecht uitzien.

### D-011 — Eigen geschetste pictogrammen, getekend als SVG
- Datum: 2026-11-22 · Status: Besloten · Besloten door: Sander
- Besluit: De app heeft een eigen set geschetste pictogrammen (SVG), getekend door Claude volgens de stijlgids in DESIGN.md.
- Waarom: Eén consistente stijl, geen licentiekosten, geen externe bestanden.
- Afgewezen: Bestaande pictogrammensets: andere stijl, en licenties moeten per set gecontroleerd worden.
- Gevolgen: Fase 4 (pictogrammen). Tot die tijd tijdelijke placeholder-pictogrammen.
- Aangevuld door D-037 (2026-11-23): de pictogrammen worden getekend als platte bron en door het schetsfilter gehaald.

### D-012 — Stack: Vite + React + TypeScript + vite-plugin-pwa
- Datum: 2026-11-22 · Status: Besloten · Besloten door: Claude
- Besluit: Vite als bouwtool, React 19 met TypeScript, `vite-plugin-pwa` (Workbox) voor offline en installatie.
- Waarom: Sander kent Vite + TypeScript al. React is breed bekend, ook bij andere ontwikkelaars die het later
  zouden kunnen bekijken. `vite-plugin-pwa` regelt manifest en service worker zonder handwerk.
- Afgewezen: Vanilla TypeScript (meer zelf bouwen voor schermen en toestand). Preact (kleiner, maar dat voordeel
  doet er hier weinig toe). Flutter/React Native (zie D-001).
- Herzien als: niet nodig.

### D-013 — Opslag in IndexedDB via Dexie
- Datum: 2026-11-22 · Status: Besloten (2026-11-22, na de proef op de iPhone in T-0.5) · Besloten door: Claude
- Besluit: Het plan, de tegels en de schetsfoto's (als Blob) staan in IndexedDB, via de kleine bibliotheek Dexie
  met een geversioneerd schema. Bij de eerste start vraagt de app `navigator.storage.persist()`.
- Waarom: localStorage is te klein voor foto's en kan geen Blobs bewaren. Dexie maakt versies en migraties simpel.
- Afgewezen: localStorage (te klein). Ruwe IndexedDB-API (foutgevoelig). OPFS (minder breed getest op iOS voor dit gebruik).
- Uitkomst proef (T-0.5, 2026-11-22): op Sanders iPhone, vanaf het beginscherm, bleven tekst en foto bewaard na
  afsluiten, in vliegtuigmodus en na opnieuw opstarten. Het antwoord van `persist()` is niet doorgegeven.
- Herzien als: gegevens op iOS of Android toch verdwijnen (bijv. na weken niet gebruiken).

### D-014 — Hosting op GitHub Pages
- Datum: 2026-11-22 · Status: Voorlopig · Besloten door: Claude
- Besluit: Elke push naar `main` bouwt de app met GitHub Actions en publiceert hem op GitHub Pages
  (`https://thebos24.github.io/signaleringsplan/`).
- Waarom: Gratis, HTTPS (nodig voor een PWA), Sander heeft al GitHub.
- Afgewezen: Netlify/Cloudflare Pages (prima, maar weer een extra account).
- Gevolgen: Vite `base` moet op `/signaleringsplan/` staan. Een eigen domein kan later (Q-006).

### D-015 — Nederlands, in eenvoudige taal
- Datum: 2026-11-22 · Status: Besloten · Besloten door: samen
- Besluit: De app is alleen Nederlands. Cliëntteksten in de je-vorm, kort, gewone woorden (zie DESIGN.md).
  Alle teksten staan op één plek (`src/text/nl.ts`).
- Waarom: De doelgroep is Nederlands. Eén plek maakt nalopen en later vertalen makkelijk.

### D-016 — Testen op iPhone eerst, Android zodra die er is
- Datum: 2026-11-22 · Status: Besloten · Besloten door: Sander
- Besluit: Bouwen en testen op Sanders iPhone. Vanaf het moment dat de Android-telefoon er is (eind november 2026)
  wordt elk checkpoint ook op Android getest.
- Waarom: Sander heeft nu alleen een iPhone. Omdat het een web-app is, hoeft er niets apart gebouwd te worden.

### D-017 — Gratis hobbyproject
- Datum: 2026-11-22 · Status: Besloten · Besloten door: Sander
- Besluit: De app is gratis, zonder licentie, account of betaalmodel.
- Waarom: Laagdrempelig. Volgens Sander zijn bestaande oplossingen betaald met een licentie.

### D-018 — Model en effort per taak
- Datum: 2026-11-22 · Status: Besloten · Besloten door: Sander
- Besluit: Elke taak in TASKS.md heeft een `⚙`-tag met het model (Haiku, Sonnet, Opus) en de effort. De tabel staat in CLAUDE.md.
- Waarom: Goedkoop waar het kan, zwaar waar het moet (vooral bij opslag van het plan). Zelfde werkwijze als bij Polyp.

### D-019 — Geen dependencies zonder vastgelegde beslissing
- Datum: 2026-11-22 · Status: Besloten · Besloten door: Claude
- Besluit: Toegestaan: react, react-dom, dexie, vite, vite-plugin-pwa, typescript, vitest, @testing-library/react,
  eslint, prettier (en hun gewone hulppakketten). Al het andere eerst vragen en hier vastleggen.
  Later toegestaan: `fake-indexeddb` (alleen voor tests, D-023, Sander 2026-11-22).
- Waarom: Elke dependency is onderhoud en een mogelijk privacy- of beveiligingsrisico.

### D-020 — Eén plan per telefoon
- Datum: 2026-11-22 · Status: Besloten (Sander, 2026-11-22, Q-007) · Besloten door: Claude, bevestigd door Sander
- Besluit: De app bewaart één plan. Geen profielen of meerdere cliënten.
- Waarom: Het is de telefoon van de cliënt. Meerdere plannen maken het startscherm ingewikkelder.
- Herzien als: er gedeelde tablets in een woonvoorziening gebruikt worden (B-003).

### D-021 — Versies en opzet van het project (T-0.3)
- Datum: 2026-11-22 · Status: Besloten · Besloten door: Claude
- Besluit: Project met de nieuwste versies (React 19, Vite 8, TypeScript 6, Vitest 5, ESLint 10), met Vite `base`
  `/signaleringsplan/` (D-014). Tests draaien in jsdom met Testing Library. `dexie` en `vite-plugin-pwa` zijn
  nog niet geïnstalleerd: ze komen in T-0.4 en T-1.1, wanneer ze gebruikt worden.
- Waarom: Niets installeren wat nog niet nodig is (D-019). Handmatig opgezet in plaats van met een generator,
  zodat er alleen bestanden in staan die we nodig hebben.
- Afgewezen: `npm create vite` (genereert voorbeeldcode en extra tsconfig-bestanden die we weer moeten weggooien).
- Herzien als: een versie problemen geeft op de iPhone.

### D-022 — Opzet van de PWA-proef en het publiceren (T-0.4)
- Datum: 2026-11-22 · Status: Besloten · Besloten door: Claude
- Besluit:
  - `vite-plugin-pwa` 2 met `registerType: 'autoUpdate'`: de service worker bewaart de hele build, zodat de app
    offline werkt. Een nieuwe versie wordt vanzelf gebruikt.
  - Tijdelijk icoon: een simpel stoplicht als PNG (192, 512 en 180 voor de iPhone), gemaakt met een klein
    Node-script zonder extra pakketten. Het echte icoon komt in T-5.4.
  - De proef gebruikt een **eigen database** (`signaleringsplan-proef`) met Dexie, los van de echte database uit
    T-1.1. Zo begint het echte datamodel schoon. De proefcode is gemarkeerd als `TEMPORARY` en gaat weg na Checkpoint 0.
  - De proef verkleint de foto al tot max. 1024 px (JPEG) met `createImageBitmap` + canvas. Het origineel wordt niet bewaard.
  - Publiceren: GitHub Actions (`.github/workflows/deploy.yml`) draait lint, tests en build en zet `dist/` op
    GitHub Pages. Pages staat op "bron: GitHub Actions" (door Claude aangezet via `gh`). Node-versie in `.nvmrc` (24).
- Waarom: `autoUpdate` is het simpelst en er staan nog geen echte plannen op telefoons. `createImageBitmap` zet de
  foto volgens de EXIF-gegevens rechtop (R-009). Lint en tests in de workflow voorkomen dat een kapotte versie online komt.
- Afgewezen: `registerType: 'prompt'` (een melding "Nieuwe versie" is een extra keuze voor de cliënt; heroverwegen in
  T-5.5). Icoon tekenen met `@vite-pwa/assets-generator` (extra dependency voor een tijdelijk icoon). De proef in de
  echte database (zou T-1.1 met rommel laten beginnen). Ruwe IndexedDB in de proef (dan testen we niet wat we straks gebruiken).
- Gevolgen: `npm audit` meldt 4 "moderate" kwetsbaarheden in `glob`/`minimatch` binnen `workbox-build`. Die draaien
  alleen tijdens het bouwen op de Mac en GitHub, niet in de app op de telefoon (R-012).
- Herzien als: T-5.5 (updatebeleid) of als de proef op de iPhone iets anders laat zien.

### D-023 — Datamodel en opslaglaag (T-1.1)
- Datum: 2026-11-22 · Status: Besloten · Besloten door: Claude (testpakket: Sander)
- Besluit:
  - Eén Dexie-database `signaleringsplan` (los van de proefdatabase uit D-022) met **schemaversie 1** en drie
    tabellen: `plan` (één rij met vaste sleutel `'plan'`, D-020), `tiles` en `photos`. Het model staat in
    `src/domain/plan.ts`, de database in `src/storage/db.ts`, de functies in `src/storage/planStore.ts`.
  - Tegels en foto's krijgen een oplopend nummer als id (`++id`).
  - `order` is uniek over alle tegels. Omhoog/omlaag verwisselt een tegel met de buur in dezelfde lijst.
  - Een nieuwe of gewijzigde tegel krijgt de foto zelf mee (niet eerst los opslaan). Elke wijziging is één
    transactie: tegel en foto worden samen opgeslagen, en een vervangen of verwijderde foto gaat meteen weg.
  - `ensurePlan()` maakt het plan als het er nog niet is, met de rode actie "Ik ga naar mijn begeleider" en
    pictogram-id `caregiver` (D-008). Die id moet bestaan zodra de pictogrammen er zijn (T-1.5).
  - Een groen signaal wordt geweigerd (SPEC §5.2). Teksten worden opgeschoond (spaties). Meer regels (zoals het
    maximum per lijst, Q-004) horen bij de schermen.
  - De schemaversie staat niet in het plan: Dexie houdt die bij. In `db.ts` staat het stappenplan voor een nieuwe
    versie, en een test faalt als iemand versie 1 aanpast in plaats van een nieuwe versie toe te voegen (R-010).
  - Tests voor de opslag draaien in Node met **`fake-indexeddb`** (alleen bij het testen, niet in de app).
- Waarom: Eén transactie per wijziging voorkomt halve plannen en losse foto's die ruimte innemen. Oplopende
  nummers werken ook als de app via het netwerkadres op de telefoon draait (`crypto.randomUUID` werkt daar niet,
  want dat adres is geen https). Een unieke `order` over alle tegels werkt voor beide schermindelingen uit Q-001.
  De versie op twee plekken bewaren kan uit elkaar lopen.
- Afgewezen: `crypto.randomUUID` als id (werkt niet zonder https). `order` per lijst (lastiger als signalen van
  oranje en rood op één scherm staan, Q-001). Foto eerst los opslaan en daarna de tegel (bij een fout blijft een
  foto zonder tegel achter). `schemaVersion` in het plan (dubbel). Opslag testen in de browser met Playwright
  (veel groter pakket). Opslag alleen met de hand testen (de opslagtests zijn verplicht, CLAUDE.md).
- Gevolgen: de app gebruikt de opslag nog niet; dat komt met de schermen in fase 2 en 3. De proef (D-022) blijft
  voorlopig staan voor T-0.7 (Android) en om te zien of gegevens na weken nog staan (R-001).
- Herzien als: Q-001 of Q-004 iets vraagt wat het model niet kan, of vóór Checkpoint 3 bij een schemawijziging.

### D-024 — Design tokens in TypeScript, omgezet naar CSS-variabelen (T-1.2)
- Datum: 2026-11-22 · Status: Besloten · Besloten door: Claude
- Besluit: Kleuren en maten staan alleen in `src/design/tokens.ts`. `applyTokens()` zet ze bij het starten van de
  app om naar CSS-variabelen op de pagina (`--color-green-light`, `--size-tile-min`, …). Componenten (`Tile`,
  `BigButton`, `ColorBadge`, `ColorSymbol` in `src/components/`) gebruiken alleen die variabelen. Een zachte
  kleur als vlak, donkere tekst (`ink`), en de vormen (rondje met vinkje, driehoek, achthoek) met een donkere rand.
  Een aangetikte signaaltegel krijgt een dikkere rand én een vinkje (kleur nooit alleen, DESIGN.md regel 6).
  Contrast staat in `src/domain/contrast.ts` met tests. `muted` is donkerder gemaakt: `#8A857C` → `#6B665E`.
- Waarom: Eén bron kan niet uit elkaar lopen; een los CSS-bestand naast het TypeScript-bestand wel. De zuivere
  kleuren (vooral oranje, 2,2:1 op licht) zijn te licht voor vormen zonder rand, dus de rand is `ink`.
  `#8A857C` haalde 3,5:1 op papier, terwijl tekst 4,5:1 moet halen.
- Afgewezen: Handgeschreven `tokens.css` naast `tokens.ts` (dubbel onderhoud). Een CSS-in-JS-pakket (extra
  dependency, D-019). Witte tekst op de zuivere kleuren (3,4:1 of lager).
- Gevolgen: Tijdelijke galerij op `#galerie` (`src/features/gallery/`) voor Checkpoint 1, met smileys in plaats van
  pictogrammen (T-1.5). De galerij verdwijnt zodra de echte schermen er zijn.
- Herzien als: Checkpoint 1 laat zien dat iets niet goed leesbaar of aanraakbaar is.

### D-025 — Opbouw van de lang-indrukken-knop (T-1.3)
- Datum: 2026-11-22 · Status: Besloten · Besloten door: Claude
- Besluit: `LongPressButton` (`src/components/`) gebruikt pointer-events (touch en muis in één) en een timer van
  3 seconden (D-006). De ring is een SVG-cirkel die met een CSS-overgang volloopt. Loslaten, wegschuiven of een
  onderbroken aanraking annuleert; een te korte druk toont kort "Houd ingedrukt om te wijzigen" (SPEC §6.1).
  Bij het begin van een aanraking laten we de automatische "pointer capture" los, anders merkt de browser
  wegschuiven op een telefoon niet. Selecteren, loep en het iOS-menu bij lang indrukken staan uit. Het
  toegankelijke label is "Invullen voor de begeleider". Met het toetsenbord werkt Enter of spatie 3 seconden
  vasthouden.
- Waarom: Eén route voor touch en muis is simpeler dan twee. Het toetsenbord en schermlezers moeten de
  invulmodus ook kunnen openen. De ring toont voortgang, geen versiering, dus hij beweegt ook bij
  `prefers-reduced-motion`.
- Afgewezen: Aparte touch- en muisevents (dubbele code). Een timer die doortelt na wegschuiven (cliënt kan per
  ongeluk openen). Een pincode (D-006).
- Gevolgen: In de galerij (`#galerie`) staat een proefknop. Nog niet op de iPhone geprobeerd (Checkpoint 1).
- Herzien als: Checkpoint 1 of de test met cliënten laat zien dat de knop per ongeluk opent of niet opent.

### D-026 — De app opent op het echte startscherm; "leeg plan" betekent geen signalen (T-2.1)
- Datum: 2026-11-22 · Status: Besloten (het welkomstscherm is vervangen door D-035/D-040; de rest blijft) · Besloten door: Claude
- Besluit: De app opent nu op het echte (nog kale) startscherm, met het plan uit de opslag (`usePlan`, maakt het
  plan bij de eerste start en vraagt dan `persist()` aan, R-001). De lang-indrukken-knop (D-025) staat rechtsboven en
  opent `FillMode`. Een plan is "leeg" zolang er **geen enkel signaal** in staat (`isPlanEmpty`, `src/domain/`).
  Dan toont de invulmodus eerst het welkomstscherm (SPEC §6.2) met de optionele voornaam; "Verder" slaat de naam
  op. De proef en de galerij blijven bereikbaar via `#proef` en `#galerie`.
- Waarom: Zonder signalen kan de app alleen groen tonen, dus daar hoort de uitleg bij. Het afleiden uit de tegels
  vraagt geen extra veld en dus geen schema-migratie (R-010). De standaard rode actie bestaat altijd, dus "geen
  tegels" zou nooit waar zijn.
- Afgewezen: Een opgeslagen vlag "welkom gezien" (nieuw veld, migratie nodig). "Leeg" = geen enkele tegel (de rode
  standaardactie staat er altijd). Een router-pakket voor de drie schermen (D-019; een toestand in `PlanApp` volstaat).
- Gevolgen: Het welkomstscherm verschijnt opnieuw als iemand alle signalen verwijdert. Dat is bedoeld. Het
  startscherm en `FillMode` zijn tijdelijk kaal: de signaaltegels komen in T-3.1, de editor in T-2.2.
- Herzien als: T-2.2 of Checkpoint 2 laat zien dat het welkomstscherm op een verkeerd moment verschijnt.

### D-027 — Editor per kleur: opbouw en maximum van 6 per lijst (T-2.2)
- Datum: 2026-11-22 · Status: Besloten (de opbouw van de editor is vervangen door D-035/D-040; het maximum van 6 blijft) · Besloten door: Sander (maximum 6, Q-004), Claude (opbouw)
- Besluit:
  - **Maximaal 6 tegels per lijst** (`MAX_TILES_PER_LIST` in `src/domain/plan.ts`): 6 signalen en 6 acties per kleur.
    De rode standaardactie telt mee, dus rood heeft nog ruimte voor 5 eigen acties. Bij 6 verdwijnt "Toevoegen" en staat
    er "De lijst is vol: er passen er 6." Tekst op een tegel: maximaal 40 tekens.
  - De opslaglaag **weigert** een 7e tegel (`addTile` geeft een fout), naast het scherm dat de knop verbergt.
  - De editor (`src/features/fill/`) heeft drie knoppen bovenaan (Groen, Oranje, Rood; kleur + symbool + woord,
    de gekozen heeft een dikke rand) en per kleur de lijsten Signalen (niet bij groen) en Acties. Een tegel in de
    lijst heeft ↑ ↓ (volgorde), Wijzigen en Verwijderen. Verwijderen vraagt eerst "Weet je het zeker?" in de
    tegel zelf, zonder pop-up. Wijzigingen worden direct opgeslagen (SPEC §6.4). Enter in het tekstveld bewaart.
  - Het plaatje kiezen is **tijdelijk** een rijtje met de 10 placeholder-pictogrammen. T-2.3 vervangt dit door de
    pictogramkiezer met zoekveld, T-2.4 en T-2.5 voegen foto's toe.
  - Volgorde verwisselen gaat met pijltjes (bestaande `moveTile`), niet met slepen.
- Waarom: Een maximum in de opslaglaag voorkomt dat een fout in een scherm toch een 7e tegel maakt (D-023 liet het
  bij de schermen; dat is hier aangescherpt). Pijltjes werken met vingers, schermlezers en het toetsenbord
  zonder extra pakket. Een bevestiging in de tegel zelf is rustiger dan een pop-up (DESIGN.md regel 7) en
  verdwijnt niet achter het toetsenbord.
- Afgewezen: Slepen om de volgorde te wijzigen (lastig op een telefoon, vraagt een pakket, D-019). Alleen het
  scherm laten tellen (een fout daar zou de opslag vervuilen). Een pop-up voor "Weet je het zeker?". Eén lange lijst
  met alle kleuren door elkaar (veel scrollen; de tabbalk met drie kleuren is duidelijker).
- Gevolgen: Een plan zonder signalen toont bij het volgende openen weer het welkomstscherm (D-026). Wie alle signalen
  verwijdert, ziet dat dus; dat is bedoeld. Foto's kunnen nog niet gekozen worden (T-2.4).
- Herzien als: Checkpoint 2 laat zien dat 6 te weinig of te veel is, of dat pijltjes onhandig zijn.

### D-028 — Pictogramkiezer: zoeken op naam en trefwoorden, zonder extra pakket (T-2.3)
- Datum: 2026-11-22 · Status: Besloten · Besloten door: Claude
- Besluit: Boven het plaatjesraster staat een zoekveld. Elk pictogram heeft in `src/text/nl.ts` (`pictoWords`) een
  Nederlandse naam en trefwoorden. De pure functie `searchPictos` (`src/features/pictos/searchPictos.ts`) toont een
  plaatje als elk getypt woord het begin is van een woord in de naam of trefwoorden; hoofdletters en accenten tellen
  niet. Lege zoekopdracht = alle plaatjes. De naam staat verborgen in het plaatje zodat een schermlezer hem voorleest.
  Enter in het zoekveld bewaart de tegel niet.
- Waarom: Met 20+ plaatjes in fase 4 is scrollen te veel; zoeken op eigen woorden is voor een begeleider het snelst.
  Begin-van-woord is genoeg ("wand" vindt "wandelen") en geeft geen rare treffers. Teksten staan op één plek (CLAUDE.md).
- Afgewezen: Een zoekpakket zoals Fuse.js (D-019: geen pakket voor iets wat in 10 regels kan). Zoeken op een stuk midden
  in een woord (te veel ruis). Categorieën of tabbladen (meer keuzes en schermen).
- Gevolgen: Fase 4 (T-4.4) moet voor elk nieuw pictogram naam en trefwoorden toevoegen; een test dwingt dat af.
- Herzien als: Checkpoint 2 laat zien dat begeleiders vaak niets vinden (dan trefwoorden uitbreiden of tolerantie voor typfouten).


### D-029 — Foto maken of kiezen en vierkant bijsnijden (T-2.4)
- Datum: 2026-11-23 · Status: Besloten · Besloten door: Claude
- Besluit:
  - In het tegelformulier staat onder de pictogrammen "Of gebruik een eigen foto" met de knop "Maak of kies een foto".
    Het bestandsveld heeft `accept="image/*"` maar **geen `capture`**: de telefoon vraagt dan zelf "camera of
    fotobibliotheek" (SPEC §6.3: maken óf kiezen). Dit vervangt het `capture`-detail uit D-010.
  - De foto wordt ingelezen met `createImageBitmap(file, { imageOrientation: 'from-image' })` (zet hem rechtop, ook
    HEIC op de iPhone, R-009) en meteen verkleind tot een werkkopie van max. 2048 px. Het origineel wordt niet bewaard.
  - Bijsnijden: een vierkant kader. Eén vinger (of muis) schuift de foto, twee vingers of een schuifbalk zoomen
    (1× t/m 3×). Het vierkant kan niet buiten de foto komen. De rekenregels staan als pure functies in
    `src/domain/crop.ts` (met tests); het canvaswerk in `src/features/photo/photoCanvas.ts`.
  - Opgeslagen wordt het vierkant als JPEG (kwaliteit 0,85), max. 1024 px, en nooit groter dan het gekozen stuk
    (geen wazig vergroten). Opslaan gaat via de bestaande `addTile`/`updateTile` (D-023): tegel en foto samen.
  - Tot T-2.5 wordt het bijgesneden kleurenvierkant bewaard; T-2.5 zet er de schets tussen (D-010).
  - Tijdens het bijsnijden zijn de knoppen "Bewaar"/"Annuleren" van het formulier weg; het kader heeft zijn eigen
    "Gebruik deze foto"/"Annuleren".
- Waarom: Geen extra pakket nodig (D-019). Een werkkopie van 2048 px blijft binnen de canvasgrens van Safari en
  houdt het geheugen laag, en is groot genoeg om in te zoomen. Schuiven + zoomen is wat mensen van hun telefoon kennen.
  De rekenregels los van het canvas maken ze testbaar in jsdom (dat geen canvas heeft).
- Afgewezen: Een bijsnijpakket zoals react-easy-crop (extra dependency voor iets van ±100 regels). `capture` op het
  bestandsveld (dan alleen de camera, niet de fotobibliotheek). Het origineel bewaren (privacy, ruimte, D-010).
  Alleen een schuifbalk zonder knijpen (voelt vreemd op een telefoon). Een vast midden zonder schuiven (gezicht
  staat vaak niet in het midden).
- Gevolgen: T-2.5 plaatst het schetsfilter tussen "Gebruik deze foto" en opslaan.
- Herzien als: foto's op Android of iPhone scheef of niet laden, of het geheugen op oudere telefoons tekortschiet.

### D-030 — Schetsfilter: drie stijlen, eigen pixelcode, keuze door Sander (T-2.5)
- Datum: 2026-11-23 · Status: Besloten (2026-11-23: Sander koos **potlood**; lijnen, samen en `#schets` zijn weggehaald) · Besloten door: Claude (techniek), Sander (stijl)
- Besluit:
  - Het filter is een pure functie `sketch()` in `src/domain/sketch.ts` die op de pixels werkt (geen canvas), met
    tests. `photoCanvas.ts` leest de pixels van het bijgesneden vierkant, laat `sketch()` ze omzetten en maakt er een
    JPEG (0,85) van. Alleen de schets wordt bewaard (D-010).
  - Elke stijl begint met grijswaarden en **contrast rekken** (donkerste en lichtste 1% genegeerd), zodat donkere en
    lichte foto's even duidelijk worden (R-004). De schets wordt getekend in `ink` op `paper` (design tokens), net als
    de pictogrammen.
  - Drie stijlen: **potlood** (grijs ÷ vervaagd negatief, "color dodge", donkerder gemaakt), **lijnen** (randen met
    Sobel na licht vervagen, drempel past zich aan de foto aan maar nooit lager dan cameraruis, plus lichte schaduw),
    **samen** (potlood × lijnen). Voorlopig gebruikt de app **samen** (`DEFAULT_SKETCH_STYLE`).
  - Na "Gebruik deze foto" toont de app de schets groot met "Gebruik" en "Opnieuw". "Opnieuw" gaat terug naar het
    kader, met hetzelfde stuk gekozen; daar kan "Annuleren" om een andere foto te kiezen.
  - Tijdelijke pagina `#schets`: kies een foto en zie hem in alle drie de stijlen. Er wordt niets bewaard. Weg
    zodra Sander gekozen heeft (R-013).
- Waarom: Geen extra pakket nodig (D-019); de bewerkingen zijn ±150 regels. Pure functies zijn te testen in jsdom.
  Vervagen met drie keer een "box blur" is bijna even mooi als een echte Gaussische vervaging en veel sneller
  (1024×1024 in ±1 s op de Mac). Sander verwacht eerder een tekening dan een potloodfilter (R-013), dus hij kiest
  met echte foto's op zijn eigen telefoon.
- Afgewezen: CSS-filters (`filter: grayscale() contrast()`) (geen echte schets, en het bewaarde bestand blijft de
  kleurenfoto). Canvas `ctx.filter = 'blur()'` (werkte lange tijd niet in Safari). Een Web Worker voor het rekenen
  (meer code; pas doen als het op de telefoon te traag is). Een AI-dienst (D-010, B-012). Eén stijl zonder keuze
  (R-013 vraagt om kiezen).
- Gevolgen: Na Sanders keuze: `DEFAULT_SKETCH_STYLE` vastzetten, de andere stijlen en `#schets` weghalen.
- Herzien als: de schets op de iPhone of Android trager is dan ±3 seconden, of echte foto's onduidelijk worden.

### D-031 — "Bewaar" is nooit grijs zonder uitleg (T-2.5)
- Datum: 2026-11-23 · Status: Besloten (geldt nu voor "Klaar" op het tegelscherm, D-040) · Besloten door: Claude
- Besluit: In het tegelformulier is "Bewaar" altijd te tikken (behalve tijdens het opslaan). Ontbreekt er iets, dan
  bewaart de app niets en zegt hij wat er mist: "Schrijf eerst wat er op de tegel staat." (en zet de cursor in het
  tekstvak, dat dan in beeld schuift) of "Kies eerst een plaatje of een foto." Dit vervangt de grijze knop uit D-027.
- Waarom: Sander kreeg na het kiezen van een foto het gevoel dat "er niks gebeurt". Na het bijsnijden staat het
  tekstvak ver boven in beeld, en een grijze knop zegt niet wat er mist.
- Afgewezen: Grijze knop houden met een vaste uitlegregel eronder (altijd extra tekst, ook als alles goed is).
  Het tekstvak verplaatsen naar onder de foto (grotere verbouwing van het formulier, niet nodig).
- Herzien als: begeleiders de melding niet zien of niet snappen.

### D-032 — Zachte witte rand rond de schets (T-2.5)
- Datum: 2026-11-23 · Status: Besloten · Besloten door: Sander (wens), Claude (uitvoering)
- Besluit: De schets loopt naar de randen toe zacht over in `paper`, rond zoals een vignet: binnen 60% van de afstand
  van het midden tot de rand blijft alles zoals het is, aan de rand en in de hoeken is het helemaal papier. De overgang
  is "smoothstep" (zacht begin en eind). Het zit in `fadeEdges()` in `src/domain/sketch.ts`, met een test.
- Waarom: Sander wil dat het plaatje in het midden staat en de randen wit zijn; dan lijkt een foto meer op een
  tekening op papier en past hij beter bij de pictogrammen.
- Afgewezen: Een rechthoekige vervaging per rand (hoeken blijven dan zichtbaar donkerder). De rand met CSS maken
  (dan zit hij niet in het bewaarde plaatje en moet elke plek waar het plaatje staat hem apart krijgen).
- Herzien als: belangrijke dingen in een foto (een gezicht aan de zijkant) wegvallen; dan de rand smaller maken
  (`FADE_START` groter).

### D-033 — Startscherm van de cliënt: opbouw (T-3.1)
- Datum: 2026-11-23 · Status: Besloten · Besloten door: Claude (Q-001 en Q-002 blijven open voor Checkpoint 3)
- Besluit:
  - Alle signalen van oranje en rood staan op één scherm, schermbreed (één per rij), gesorteerd op `order`
    (Q-001 voorstel). Het scherm scrolt. Signaaltegels zijn neutraal van kleur: de kleur van een signaal verklapt
    niets aan de cliënt.
  - Wat aangetikt is, staat alleen in het geheugen van het scherm (niet in de opslag). Het is dus weg na terugkomen.
  - "Het gaat goed" gaat direct naar groen. "Klaar" zonder iets aangetikt geeft ook groen (`determineColor([])`).
  - Het resultaat is nu een tijdelijk scherm in `PlanApp`; T-3.2 vervangt het.
- Waarom: Past bij SPEC §5.1 en de wens van Sander voor schermbrede tegels. Een grijze "Klaar"-knop zonder uitleg
  zou dezelfde fout zijn als in D-031. Wie niets merkt, is groen.
- Afgewezen: "Klaar" uitzetten zolang niets is aangetikt (de cliënt snapt niet waarom). Aangetikte signalen opslaan
  (geen reden, en dan staan ze er na een nieuwe start nog). Signaaltegels in hun eigen kleur (stuurt de cliënt).
- Herzien als: Q-001 bij Checkpoint 3 een scherm per kleur wordt.

### D-034 — Resultaatscherm: opbouw (T-3.2)
- Datum: 2026-11-23 · Status: Besloten · Besloten door: Claude
- Besluit:
  - De kleur is de achtergrond van het hele scherm (wens Sander, DESIGN.md 2026-11-22). Bovenaan staat het symbool
    van de kleur en het woord. De tegels zelf hebben een lichte papierachtergrond voor goed contrast.
  - Actietegels zijn alleen om te bekijken: `Tile` heeft daarvoor `readOnly` en wordt dan een gewoon blok, geen
    knop. Een knop die niets doet is verwarrend, ook voor schermlezers.
  - Groen zegt "Het gaat goed!" met daaronder het woord "Groen" (regel 6). Oranje en rood zeggen "Je bent op {kleur}."
  - Acties staan op volgorde van het plan. De extra grote bovenste tegel bij rood komt in T-3.3.
- Waarom: Past bij SPEC §5.3 en DESIGN.md regel 6 en 7.
- Afgewezen: Actietegels als knoppen die niets doen (verwarrend). Kleurvlak alleen bovenaan (Sander wilde bijna het
  hele scherm).
- Herzien als: Checkpoint 3 laat zien dat het te druk of te weinig is.

### D-035 — Schermindeling: twee cliëntschermen, vier schermen voor de begeleider (herontwerp)
- Datum: 2026-11-23 · Status: Besloten · Besloten door: Sander (schetsen in `docs/ontwerp-voorstellen/schermen.html`)
- Besluit:
  - **Cliënt:** Start (signalen, "Het gaat goed", "Klaar") en Resultaat per kleur (met "Terug"). Zoals gebouwd in T-3.1 en T-3.2.
  - **Begeleider**, drie niveaus met overal "‹ Terug" linksboven: **Plan** (drie kleurkaarten met aantallen, "Bekijk als cliënt", naam
    wijzigen, "Klaar") → **Eén kleur** (signalen en acties als tegels, twee per rij, "+ Toevoegen") → **Eén tegel**
    (voorbeeld, tekst, ander plaatje of foto, volgorde ← →, "Klaar", "Verwijderen" apart met "Weet je het zeker?") →
    **Plaatje kiezen** (zoeken, raster, foto maken of kiezen; daarna bijsnijden, schets, "Gebruik" of "Opnieuw").
  - Het aparte welkomstscherm vervalt: de uitleg staat op het Plan-scherm als het plan leeg is. De voornaam stel je in via
    "Naam wijzigen".
  - Geen knoppen per tegel meer in lijsten, geen formulier dat in een lijst openklapt.
- Waarom: Sander kon de invulkant niet volgen. Eén lange pagina met tabs, lijsten, formulieren en vier knoppen per tegel gaf
  geen overzicht. Eén taak per scherm past ook bij regel 1 van DESIGN.md.
- Afgewezen: Alleen opruimen zonder nieuwe indeling (de structuur was het probleem). Alles op één scherm houden.
- Gevolgen: SPEC §6.2 en §6.3 zijn aangepast. T-2.2 (Editor) en T-2.3 worden omgebouwd (T-2.7). Datamodel en opslag
  blijven gelijk; geen migratie nodig. Het maximum van 6 per lijst (D-027) blijft.
- Herzien als: testers de nieuwe indeling ook onduidelijk vinden (Checkpoint 2).

### D-036 — Uitstraling: Apple-richtlijnen, warm papier, kleur alleen voor betekenis
- Datum: 2026-11-23 · Status: Besloten · Besloten door: Sander (schetsen in `docs/ontwerp-voorstellen/stijl-potlood.html`)
- Besluit:
  - Volgt de Apple Human Interface-stijl: systeemlettertype (SF, `system-ui`), groot kopje links bovenaan (34 px,
    vet), gegroepeerde lijsten met ronde hoeken en dunne scheidingslijnen, selectie met een cirkel (leeg = nog niet gekozen,
    gevuld met vinkje = gekozen), terugknop linksboven, één vaste hoofdknop onderaan op een vervaagde balk.
  - Kleuren: warm papier (`#F6F3EE` achtergrond, wit voor kaarten), donkergrijs `#3A3834` als inkt en hoofdknop. Groen, oranje
    en rood alleen voor betekenis: het resultaatscherm (zachte verloop-achtergrond), de symbolen en de kleurkaarten.
  - Het resultaatscherm blijft bijna volledig in de kleur, met groot symbool, "Je bent op" en het kleurwoord (regel 6).
  - Lettergrootte en raakvlakken blijven volgens DESIGN.md regels 3 en 4 (rij minimaal ±80 px hoog, tekst ≥ 19 px).
- Waarom: Sander vindt het eerdere ontwerp "trash" en kinderachtig. Drie stijlen (schetsboek, zacht en rond, stoplicht strak),
  een serif-variant en daarna Apple-stijl zijn vergeleken; alleen de laatste voelde modern, professioneel en warm. Apple-
  patronen kent elke iPhone-gebruiker, en dat helpt bij eenvoud.
- Afgewezen: Dikke zwarte randen met schaduwblokken (stoer, niet warm). Zachte ronde "kinder"-kaarten. Serif-kopjes (voelden
  niet als Apple). Emoji als plaatjes.
- Gevolgen: Nieuwe design tokens en nieuwe basiscomponenten (T-2.7). Op Android blijft hetzelfde ontwerp met het
  systeemlettertype van die telefoon; het wordt geen "Material"-versie.
- Herzien als: Sander of testers het op Android vreemd vinden.

### D-037 — Pictogrammen: platte tekening door het schetsfilter van de foto's
- Datum: 2026-11-23 · Status: Besloten · Besloten door: Sander (idee), Claude (opzet)
- Besluit:
  - Elk pictogram is een **bronbestand**: een platte SVG-tekening (vormen, dikke lijnen, streeppatroon voor arcering,
    een lichte onregelmatigheid). Het schetsfilter `sketch()` uit `src/domain/sketch.ts` (dezelfde code als voor foto's,
    D-030, D-032) zet de bron om naar een potloodplaatje in `ink` op `paper`. Foto's en pictogrammen hebben zo één look.
  - De omzetting draait één keer, bij het bouwen of bij het eerste gebruik, en het resultaat wordt als plaatje bewaard in de app
    (offline, geen netwerk). Welke van de twee kiest T-2.8.
  - Pictogrammen zijn grijs-op-papier, zoals foto's. Kleur zit niet in het pictogram, wel in de symbolen (groen, oranje, rood).
  - De bronnen staan in de repo; de proef met zes pictogrammen staat in `docs/ontwerp-voorstellen/stijl-potlood.html`.
- Waarom: De hand getekende lijntjes uit D-011 zagen er anders uit dan de schetsfoto's. Dezelfde code voor beide geeft
  automatisch dezelfde stijl en voorkomt twee dingen onderhouden.
- Afgewezen: Pictogrammen als losse lijntekening zonder filter (andere stijl dan foto's). Pictogrammen door een AI-dienst laten
  tekenen (D-002, B-012). Kleurpictogrammen (de foto's zijn ook zwart-wit; kleur is voor betekenis gereserveerd).
- Gevolgen: Het filter heeft misschien een instelling nodig voor pictogrammen (lijnen donkerder). Dat raakt de code van de
  foto's; dan met tests. De placeholder-SVG's in `public/pictos/` (sinds D-039 `src/features/pictos/sources/`) en Fase 4 (T-4.1 t/m T-4.4) draaien om bronnen in plaats van
  eindplaatjes. `pictoId`'s blijven gelijk, dus geen migratie.
- Herzien als: pictogrammen er na het filter te vaag uitzien om te herkennen (Checkpoint 4).

### D-038 — Basiscomponenten in Apple-stijl; `BigButton` wordt `Button`; oude tegel blijft tijdelijk (T-2.7)
- Datum: 2026-11-23 · Status: Besloten · Besloten door: Claude (technisch), uitwerking van D-036
- Besluit:
  - Nieuwe componenten in `src/components/` (alle stijl in `apple.css`, alleen tokens): `Screen` (marges, inhoud, vaste balk onderaan,
    `position: sticky` met vervaagde achtergrond), `LargeTitle`, `BackButton`, `Button` (`primary` donker, `secondary` grijs),
    `ListGroup` + `ListRow` (plaatje, titel, ondertitel, rechts een cirkel, pijltje of niets; zonder `onClick` is de rij alleen om naar
    te kijken), `SelectCircle`, `GuideTile` + `GuideTileGrid` (twee per rij, met gestippelde "+ Toevoegen"-tegel).
  - `BigButton` is vervangen door `Button`; `variant="quiet"` heet nu `secondary`. Alle schermen gebruiken al de nieuwe knop.
  - De oude `Tile` en de oude tokens (`tileMin`, `radius`, `borderWidth`, `tileText`, `heading`, `gap`) blijven bestaan, alleen zolang
    Start, Resultaat en de invulschermen ze nog gebruiken. Ze verdwijnen in T-2.9 en T-2.10.
  - Nieuw token `outline` (`#2B2B2B`) voor de rand van de kleursymbolen. De zachtere inkt uit D-036 (`#3A3834`) haalt op rood
    maar 2,6:1 (nodig: 3:1); `#2B2B2B` haalt 3,1:1. Tekst en hoofdknop gebruiken wel `#3A3834`.
  - Rijen en tegels zetten plaatjes met `mix-blend-mode: multiply` op de kaart, zodat het papier van een schetsplaatje niet als witte
    doos zichtbaar is.
  - Tijdelijke proefpagina `#galerie-nieuw` toont alle nieuwe componenten; verdwijnt in T-2.10.
- Waarom: één set componenten voor alle nieuwe schermen houdt de schermen simpel en gelijk. Eerst alles omzetten in één keer had de
  app tussentijds kapot gelaten; zo blijft hij werken terwijl we taak voor taak omzetten.
- Afgewezen: `BigButton` laten bestaan naast `Button` (twee knoppen met bijna dezelfde naam verwarren). Alle oude tokens meteen
  verwijderen (breekt de nog niet omgezette schermen). Een vaste balk met `position: fixed` (dekt inhoud af; `sticky` doet dat niet).
- Herzien als: de vaste balk op de iPhone met toetsenbord of onderrand vreemd gedraagt (testen bij Checkpoint 2).

### D-039 — Pictogrammen worden in de app zelf geschetst, bij het eerste tonen (T-2.8)
- Datum: 2026-11-23 · Status: Besloten · Besloten door: Claude (techniek), uitwerking van D-037
- Besluit:
  - De bronnen staan in `src/features/pictos/sources/<id>.svg` (platte SVG, viewBox 0 0 100 100). Ze zitten als tekst in de
    JavaScript van de app (`import.meta.glob` met `?raw`), dus ze zijn er altijd, ook offline. `public/pictos/` is weg.
  - De gedeelde onderdelen (arcering `url(#hatch)`, het lichte wiebelen `wobble`, witte achtergrond, verkleinen tot 84% zodat de
    tekening binnen de zachte rand blijft) voegt `pictoSvg()` toe. Een nieuwe bron hoeft alleen eigen vormen te hebben.
  - `renderPicto.ts` tekent de bron op een canvas van 256 × 256, haalt hem door `sketch()` en bewaart het resultaat als
    object-URL **in het geheugen** tot de app sluit. `main.tsx` maakt alle pictogrammen bij het opstarten alvast, na elkaar.
    Lukt het filter niet, dan toont de app de platte tekening (er is altijd een plaatje).
  - `sketch()` kreeg een instelling `darkness` (de macht in het potloodeffect): foto's 3 (zoals in D-030), pictogrammen 4,5, omdat
    platte tekeningen anders iets te licht worden (R-015). Met tests.
  - Pictogrammen worden geschetst op wit (`surface`) in plaats van `paper`. Met `mix-blend-mode: multiply` neemt wit de kleur van de
    tegel eronder aan; papierkleur gaf een zichtbaar vierkantje op gekleurde tegels.
- Waarom: Omzetten bij het bouwen vraagt in Node een extra pakket om SVG naar pixels te zetten (bijv. `@resvg/resvg-js`), dus een nieuwe
  dependency (D-019) en een extra stap. In de browser gebruikt het precies dezelfde code als bij de foto's, zonder pakket. 10 plaatjes
  van 256 px kosten samen een fractie van een seconde.
- Afgewezen: Omzetten bij het bouwen (extra pakket, zie boven). De schetsen bewaren in IndexedDB (raakt de opslag en het schema, R-010,
  voor iets wat de app zelf snel opnieuw maakt). Eindplaatjes (PNG) in de repo zetten (dan moet bij elke wijziging aan het filter of
  een bron iemand ze opnieuw maken; ze lopen dan uit de pas).
- Herzien als: het opstarten met de volledige set (±45 pictogrammen, Fase 4) op de iPhone of Android merkbaar traag wordt; dan in
  de Cache Storage bewaren of alleen de zichtbare maken. Of als Safari de SVG-arcering of het wiebelen anders tekent dan Chrome.

### D-040 — Invulkant: vier schermen, opslaan met "Klaar", plaatje kiezen als deel van het tegelscherm (T-2.9)
- Datum: 2026-11-23 · Status: Besloten (Sander bevestigde 2026-11-23: bewaren met "Klaar") · Besloten door: Claude (technisch), uitwerking van D-035
- Besluit:
  - `FillMode` (`src/features/fill/`) houdt bij waar de begeleider is (Plan → Eén kleur → Eén tegel) en toont `PlanScreen`, `ColorScreen`
    of `TileScreen`. Plaatje kiezen (`PictureScreen`) is geen eigen route maar een toestand van `TileScreen`: zo blijft wat er al getypt is
    staan terwijl je een plaatje kiest. Elk scherm gebruikt de componenten uit T-2.7.
  - Een tegel wordt bewaard met **"Klaar"** (tekst en plaatje samen, `addTile` of `updateTile`). **"Terug"** laat wat je typte vallen.
    Ontbreekt er iets, dan zegt de app wat (D-031, nu bij "Klaar"). De **volgorde** (← Eerder, Later →) en **Verwijderen** gebeuren wel
    meteen, want ze raken niet wat je aan het typen bent. Verwijderen vraagt "Weet je het zeker?" in de vaste balk onderaan.
  - Het Plan-scherm heeft geen "Terug": het is het beginpunt en "Klaar" sluit de invulmodus. "Naam wijzigen" klapt een tekstveld open op het
    Plan-scherm (de balk onderaan toont dan "Bewaar" en "Annuleren"), geen vijfde scherm.
  - Bij een plan zonder signalen staat de uitleg ("Vul dit plan samen in.") boven de kleurkaarten (SPEC §6.2). `WelcomeScreen`, de oude
    `Editor`, `TileList`, `TileRow` en `TileForm` zijn weg.
  - Tijdens bijsnijden van een foto staat er geen "‹ Terug" maar alleen de eigen "Annuleren" van het bijsnijdscherm (D-029: twee manieren om te
    annuleren verwarren).
  - `Screen` scrolt bij het openen naar boven (anders opent een nieuw scherm halverwege als het vorige gescrold was).
- Waarom: "Klaar" bij een tegel past bij de schetsen en bij wat Sander wil: één duidelijke afsluiting per scherm. Direct bewaren bij elke toets
  zou halve tegels in het plan zetten. Plaatje kiezen binnen het tegelscherm voorkomt dat de tekst kwijtraakt of dat de draft in `FillMode`
  moet leven.
- Afgewezen: Alles direct bewaren zoals bij SPEC §6.4 oorspronkelijk (halve tegels, geen duidelijk "klaar"). Een router-pakket (D-019; een
  toestand volstaat). "Terug" die ongevraagd bewaart (verrassend; onvolledige tegels). Een apart scherm voor de naam (SPEC zegt vier schermen).
- Gevolgen: SPEC §6.4 ("Alles wordt direct opgeslagen") geldt nu voor wijzigingen aan de volgorde, verwijderen en de naam; voor tekst en plaatje
  van een tegel is het "Klaar". Nog niet gedaan: de oude `Tile` en tokens (T-2.10), `#galerie-nieuw` (T-2.10). De knop "Foto maken of kiezen"
  staat onder het plaatjesraster (zoals de schets); bij ±45 pictogrammen (Fase 4) ligt hij ver naar beneden en is mogelijk beter boven het raster.
- Herzien als: testers bij Checkpoint 2 "Terug" laten vallen wat ze typten (dan een waarschuwing), of de foto-knop niet vinden.

### D-041 — Cliëntschermen in Apple-stijl; foto's op wit; oude tegel en proefpagina's weg (T-2.10)
- Datum: 2026-11-23 · Status: Besloten · Besloten door: Claude (technisch), uitwerking van D-035 en D-036
- Besluit:
  - **Start:** groot kopje, de signalen als één gegroepeerde lijst met een cirkel per rij (leeg of gevuld met vinkje), daaronder een eigen
    groep met de rij "Het gaat goed" (`tint="good"`), en "Klaar" in de vaste balk. De lang-indrukken-knop staat rechtsboven, boven het kopje.
  - **Resultaat:** de kleur is een zacht verloop over het hele scherm (kleur bovenin, papier onderin), met het symbool, "Je bent op" en het
    kleurwoord groot; bij groen "Het gaat goed!" groot met "Groen" eronder. De acties staan als rijen om te bekijken (zonder cirkel of pijltje), "Terug" in de vaste balk.
  - Foto's worden nu geschetst op wit (`surface`), net als de pictogrammen (D-039), zodat ze op een witte rij geen vierkantje geven. Foto's die
    al op papier zijn bewaard houden een heel licht vierkantje; dat is alleen de kleur, geen datamodelwijziging.
  - Weg: `Tile`, `Gallery`, `GalleryApple` (`#galerie`, `#galerie-nieuw`), de bijbehorende CSS en tests. `#proef` blijft voor T-0.7.
  - De kop op het resultaat is nu "Je bent op Oranje" zonder punt.
- Waarom: één set componenten voor alle schermen (D-038); de cliënt ziet dezelfde rijen als de begeleider, alleen zonder knoppen.
- Afgewezen: Oude foto's opnieuw schetsen (er is geen origineel, D-010). Een eigen "ActionRow" voor het resultaat (`ListRow` zonder `onClick` doet het al).
- Herzien als: Sander of testers de lijst met veel signalen te lang vinden (Q-001, Checkpoint 3) of het verloop op de iPhone te zacht lijkt.

### D-042 — Rood scherm: extra grote bovenste tegel, geen noodtekst (T-3.3, Q-005)
- Datum: 2026-11-28 · Status: Besloten · Besloten door: Sander (geen tekst), Claude (uitwerking)
- Besluit:
  - Op rood staat de **eerste actie** van het plan als één extra grote tegel bovenaan (wit vlak, plaatje van 160 px, tekst groot en vet).
    De overige rode acties staan daaronder als rijen, zoals bij oranje. Bij oranje en groen verandert niets.
  - Er komt **geen** vaste regel over noodsituaties ("Gevaar? Bel 112") en geen belknop op het rode scherm.
  - Welke actie "de eerste" is, bepaalt de begeleider met de volgorde (← →). Standaard is dat "Ik ga naar mijn begeleider" (D-008).
- Waarom: Sander wil geen extra tekst of keuzes voor de cliënt (zo simpel mogelijk). De volgorde bestond al, dus geen nieuw datamodel of instelling.
- Afgewezen: Klein "Bel 112" onderaan met belknop (mijn voorstel; Sander koos nee). Een aparte instelling "grote tegel" per actie (extra keuze voor de begeleider, meer schermen).
- Gevolgen: R-007 blijft bestaan; de maatregel "112-regel" vervalt. De uitlegpagina voor begeleiders (T-5.4) moet zeggen dat de app een hulpmiddel is en geen noodhulp.
- Herzien als: testers of begeleiders de 112-regel missen.

### D-043 — Terugkomen in de app geeft altijd het startscherm (T-3.4)
- Datum: 2026-11-28 · Status: Besloten · Besloten door: Claude (technisch), uitwerking van SPEC §5.1 en T-3.4
- Besluit:
  - Zodra de app weer zichtbaar wordt (andere app weg, scherm weer aan, `visibilitychange`), gaan het startscherm en het resultaatscherm terug naar
    het startscherm en zijn aangetikte signalen gewist (de `StartScreen` krijgt een nieuwe `key`).
  - De invulmodus en "Bekijk als cliënt" blijven zoals ze waren: een foto nemen verlaat de app even, en dan mag de begeleider niets kwijtraken.
  - Dubbel tikken: de app heeft geen hover-stijlen; `touch-action: manipulation` op `html` haalt het wachten op een dubbeltik-zoom weg.
  - Zonder internet: gecontroleerd dat de code geen netwerkaanvragen doet (geen `fetch`, geen externe adressen). Offline werken is op de iPhone getest (T-0.5).
- Waarom: een cliënt die terugkomt moet niet halverwege een oude keuze of een oud resultaat zien (SPEC §5.1).
- Afgewezen: Alleen terug na een bepaalde tijd weg (extra regel, moeilijk uit te leggen). Ook de invulmodus sluiten (verliest werk bij een foto).
- Herzien als: testers het vervelend vinden dat een korte onderbreking het resultaat wist.
