# Sessielog

Nieuwste item bovenaan. Elke sessie voegt één item toe (Claude Code doet dit bij `/end-session`).

**Sjabloon**

```
## JJJJ-MM-DD — korte titel
- Waar: claude.ai / Claude Code (model · effort; past bij de tag? ja/nee)
- Gedaan: wat er af is (taak-ID's)
- Beslissingen: D-0xx (nieuw of gewijzigd)
- Problemen / verrassingen:
- Volgende: de volgende taak (met ⚙-tag) en wat Sander moet doen
```

---

## 2026-11-23 — Cliëntschermen in Apple-stijl (T-2.10)
- Waar: Claude Code (Sonnet 5.5; past bij de tag Sonnet · medium: ja)
- Gedaan: T-2.10. Start en Resultaat gebruiken de nieuwe componenten: signalen als lijst met cirkels, "Het gaat goed" als groene rij, "Klaar" en
  "Terug" in de vaste balk; het resultaat heeft een zacht kleurverloop met groot symbool en kleurwoord. Foto's worden nu op wit geschetst. Oude
  `Tile` en de proefpagina's `#galerie` en `#galerie-nieuw` zijn weg. 140 tests, lint, typecontrole en Prettier slagen. In de preview (390×844)
  met testtegels bekeken (Start, aangetikt, Oranje); die zijn weer weg. Rood en groen alleen via tests; niet op de iPhone gezien.
- Beslissingen: D-041 (nieuw).
- Problemen / verrassingen: preview_start kon geen eigen server starten (grens van 5 per map); de preview staat op de server van een andere chat (poort 5173).
- Volgende: Checkpoint 2 (Sander en partner vullen samen een verzonnen testplan in op de iPhone, minstens één eigen foto per kleur). Daarna T-3.3 ⚙ Sonnet · medium (eerst Q-005 beantwoorden).

---

## 2026-11-23 — Invulkant in vier schermen (T-2.9)
- Waar: Claude Code (Sonnet 5.5; past bij de tag Sonnet · high: model ja, effort niet te zien)
- Gedaan: T-2.9. De invulmodus heeft nu de vier schermen uit SPEC §6.3 in Apple-stijl: Plan (drie kleurkaarten met aantallen, "Bekijk als
  cliënt", "Naam wijzigen", "Klaar"), Eén kleur (tegels twee per rij met "+ toevoegen"), Eén tegel (voorbeeld, tekst, plaatje, ← Eerder / Later →,
  "Klaar", "Verwijderen" met "Weet je het zeker?") en Plaatje kiezen (zoeken, raster, foto maken of kiezen). Welkomstscherm, oude editor, lijsten
  en formulier zijn weg; datamodel en opslag zijn gelijk gebleven. 143 tests, lint, typecontrole, Prettier en build slagen. In de preview
  (390×844) doorlopen: toevoegen, bewaren, openen, verwijderen. De fotoroute alleen met tests (met een nagebootst canvas); niet op de iPhone gezien.
- Beslissingen: D-040 (nieuw); D-026, D-027 en D-031 deels vervangen. SPEC §6.4 aangepast: tekst en plaatje van een tegel worden bewaard met
  "Klaar", niet meer bij elke toets. Sander bevestigde dit aan het eind van de sessie.
- Problemen / verrassingen: een test (volgorde ← →) faalde af en toe als de hele reeks draaide, doordat beide pijlen even uit staan tijdens het opslaan; test verbeterd, drie keer achter elkaar groen. Een eerste versie van `Screen` gaf een fout in de echte browser (de scroll-naar-boven gaf iets terug aan React); de
  tests zagen dat niet. Opgelost. De dev-server van een andere chat draaide al op poort 5173; daar de preview op geopend.
- Volgende: T-2.10 Cliëntschermen in de nieuwe stijl ⚙ Sonnet · medium. Daarna Checkpoint 2 (Sander + partner vullen een testplan in op de iPhone).

---

## 2026-11-23 — Pictogramwerkwijze (T-2.8)
- Waar: Claude Code (Opus 5.5; past bij de tag Opus · medium: model ja, effort lager; Sander koos door te gaan)
- Gedaan: T-2.8. De 10 pictogrammen zijn nu platte bron-tekeningen in `src/features/pictos/sources/` (6 uit de goedgekeurde proef,
  4 nieuw: water, verdrietig, moe, hoofdpijn). De app haalt ze bij het opstarten door hetzelfde schetsfilter als de foto's, iets
  donkerder (`PICTO_DARKNESS`). `public/pictos/` is weg. 132 tests, lint, typecontrole, Prettier en build slagen. Bekeken in de
  preview (390×844) op `#galerie`; niet op de iPhone.
- Beslissingen: D-039 (nieuw).
- Problemen / verrassingen: op gekleurde tegels gaf het papier van het pictogram een vierkantje; nu geschetst op wit. Foto's hebben
  dat nog een beetje (genoteerd bij T-2.10).
- Volgende: T-2.9 Invulkant omzetten naar vier schermen ⚙ Sonnet · high. Sander kiest met `/model` Sonnet en effort high.

---

## 2026-11-23 — Fundament in Apple-stijl (T-2.7)
- Waar: Claude Code (Sonnet 5.5; past bij de tag Sonnet · high: effort niet te zien, Sander gaf geen bezwaar)
- Gedaan: T-2.7. Nieuwe tokens (papier, wit, inkt, grijs, tinten, maten) en nieuwe componenten: `Screen` met vaste balk
  onderaan, `LargeTitle`, `BackButton`, `Button` (hoofd en secundair), `ListGroup` + `ListRow` (met cirkel-vinkje of pijltje),
  `GuideTile` voor de begeleider. `BigButton` is overal `Button` geworden. Contrastcontrole en 13 nieuwe tests; 127 tests, lint,
  typecontrole en build slagen. Bekeken in de preview (390×844) op de tijdelijke pagina `#galerie-nieuw`; niet op de iPhone.
- Beslissingen: D-038 (nieuw).
- Problemen / verrassingen: de inkt uit D-036 haalde op rood geen 3:1 voor de rand van het symbool; daarom een eigen token
  `outline` (iets donkerder). De bestaande schermen (Start, Resultaat, invullen) hebben nu de nieuwe kleuren en knoppen maar nog
  de oude opzet; ze worden omgebouwd in T-2.9 en T-2.10.
- Volgende: T-2.8 Pictogramwerkwijze ⚙ Opus · medium. Sander kiest met `/model` Opus en effort medium voor de nieuwe sessie.

---

## 2026-11-23 — Herontwerp vastgelegd (geen taak uit de lijst)
- Waar: Claude Code (Sonnet 5.5)
- Gedaan: Sander snapte de app niet meer door de rommelige indeling. Samen schetsen gemaakt (zonder te bouwen): schermoverzicht,
  drie stijlen, een serif-variant, en een Apple-stijl met pictogrammen die door het schetsfilter van de foto's gaan. Sander
  koos de laatste. Vastgelegd in D-035, D-036, D-037, SPEC §6.2 en §6.3, DESIGN.md, TASKS (T-2.7 t/m T-2.10) en R-015. De
  schetsen staan in `docs/ontwerp-voorstellen/` (de afgewezen stijlen blijven staan). Geen app-code veranderd.
- Beslissingen: D-035, D-036, D-037. D-011 aangevuld.
- Problemen / verrassingen: T-3.3 (rood scherm) wacht tot het herontwerp klaar is. Q-005 (regel "Gevaar? Bel 112") nog open.
- Volgende: T-2.7 Fundament en basiscomponenten ⚙ Sonnet · high. Sander kiest met `/model` Sonnet en effort high voor de nieuwe sessie.

---

## 2026-11-23 — Resultaatscherm (T-3.2)
- Waar: Claude Code (Sonnet 5.5; past bij de tag Sonnet · medium: ja)
- Gedaan: T-3.2. Na "Klaar" of "Het gaat goed" vult de kleur het hele scherm, met een groot symbool (rondje met
  vinkje, driehoek, achthoek), het woord ("Je bent op Oranje.", bij groen "Het gaat goed!" plus "Groen"), de acties
  van die kleur als tegels om naar te kijken (geen knoppen) en de knop "Terug". Het tijdelijke scherm uit T-3.1 is
  weg. 114 tests, lint, typecontrole en Prettier slagen. Oranje bekeken in de preview (390×844) met testtegels, die
  zijn weer verwijderd. Rood en groen alleen via tests; niet op de iPhone gezien.
- Beslissingen: D-034 (nieuw).
- Problemen / verrassingen: geen.
- Volgende: T-3.3 Rood scherm met extra grote bovenste tegel ⚙ Sonnet · medium. Sander moet Q-005 beantwoorden
  (komt er een regel "Gevaar? Bel 112" op rood?). Checkpoint 2 staat nog open.

---

## 2026-11-23 — Startscherm voor de cliënt (T-3.1)
- Waar: Claude Code (Sonnet 5.5; past bij de tag Sonnet · medium: ja)
- Gedaan: T-3.1. Het startscherm toont nu de signalen (oranje en rood door elkaar, in de volgorde van het plan) als
  schermbrede tegels die je aan en uit kunt tikken (dikke rand + vinkje), de groene tegel "Het gaat goed" en de knop
  "Klaar". Daarna volgt een tijdelijk scherm "Je bent op Oranje." met "Terug"; het echte resultaatscherm is T-3.2.
  Aangetikte signalen zijn weg als je terugkomt. 114 tests, lint en typecontrole slagen. In de preview (390×844) met
  twee testsignalen bekeken; die zijn weer verwijderd. Niet op de iPhone gezien.
- Beslissingen: D-033 (nieuw).
- Problemen / verrassingen: geen. Checkpoint 2 is nog niet gedaan; Sander koos ervoor eerst door te bouwen.
- Volgende: T-3.2 Resultaatscherm per kleur ⚙ Sonnet · medium. Checkpoint 2 staat nog open.

---

## 2026-11-23 — Bekijk als cliënt en Klaar (T-2.6)
- Waar: Claude Code (Sonnet 5.5; past bij de tag Sonnet · low: ja)
- Gedaan: T-2.6. In de invulmodus staat onderaan nu "Bekijk als cliënt" boven "Klaar". "Bekijk als cliënt" toont
  het startscherm van de cliënt met een knop "Terug naar invullen". "Klaar" sloot de invulmodus al. 112 tests, lint
  en typecontrole slagen. Niet in de preview of op de iPhone bekeken.
- Beslissingen: geen nieuwe (kleine keuze: de preview is het echte startscherm; zodra Fase 3 de flow bouwt, laat
  de preview die vanzelf zien).
- Problemen / verrassingen: geen.
- Volgende: Checkpoint 2 (Sander en partner vullen samen een testplan in op de iPhone). Daarna T-3.1 ⚙ Sonnet · medium.

---

## 2026-11-23 — Schetsfilter (T-2.5)
- Waar: Claude Code (Opus 5.5; past bij de tag Opus · medium: ja)
- Gedaan: T-2.5. Na het bijsnijden wordt een foto een potloodschets (in `ink` op `paper`), getoond met "Gebruik" /
  "Opnieuw". Eerst drie stijlen gebouwd en via een tijdelijke pagina `#schets` vergeleken; Sander koos **potlood**.
  Op zijn wens loopt de schets aan de randen zacht over in wit papier, zodat het plaatje in het midden staat. De
  andere stijlen en `#schets` zijn weer weg. Contrast wordt automatisch gerekt, zodat donkere foto's even duidelijk
  worden (R-004). 111 tests en lint slagen. Getest in de preview, op een nagebootste iPhone (iOS-simulator, Safari)
  en door Sander op zijn iPhone (vanaf het beginscherm): werkt.
- Beslissingen: D-030 (schetsfilter, potlood gekozen), D-031 ("Bewaar" is nooit grijs zonder uitleg), D-032 (zachte
  witte rand).
- Problemen / verrassingen: Sander meldde "ik kies een foto en er gebeurt niks". Oorzaak: na de foto stond het
  tekstvak buiten beeld en bleef "Bewaar" grijs zonder uitleg; nu zegt de app wat er mist (D-031). Daarnaast laat de
  app op het beginscherm na een update eerst de oude versie zien (R-014, nieuw). Een egaal zwart vlak werd helemaal
  zwart in de schets; opgelost met een test.
- Volgende: T-2.6 "Bekijk als cliënt" en "Klaar" ⚙ Sonnet · low. Sander kiest met `/model` Sonnet voor de nieuwe sessie.

## 2026-11-23 — Foto maken of kiezen en bijsnijden (T-2.4)
- Waar: Claude Code (Opus 5.5; Sander wisselde naar medium; past bij de tag: ja)
- Gedaan: T-2.4. In het tegelformulier staat onder de plaatjes "Of gebruik een eigen foto". De telefoon vraagt
  camera of fotobibliotheek. Daarna een vierkant kader: schuiven met één vinger, zoomen met twee vingers of de
  schuifbalk, dan "Gebruik deze foto". De foto komt rechtop, max. 1024 px, en het origineel wordt niet bewaard. In de
  lijst staat nu het fotootje in plaats van 📷. 97 tests, lint en build slagen. In de preview (390×844) een verzonnen
  testfoto bijgesneden, bewaard (750×750, 10 KB) en na herladen teruggezien; daarna weer verwijderd.
- Beslissingen: D-029 (nieuw); D-010 aangevuld (geen `capture`).
- Problemen / verrassingen: Tijdens bijsnijden stonden er twee knoppen "Annuleren"; nu verbergt het formulier zijn
  eigen knoppen zolang het kader open is. Tot T-2.5 wordt de kleurenfoto bewaard, nog geen schets.
  Daarna door Sander op de iPhone (vanaf het beginscherm) getest: foto maken en kiezen werkt, foto's staan rechtop.
- Volgende: T-2.5 Schetsfilter ⚙ Opus · medium.

## 2026-11-22 — Pictogramkiezer met zoekveld (T-2.3)
- Waar: Claude Code (Sonnet 5.5; past bij de tag: ja)
- Gedaan: T-2.3. In het formulier voor een tegel staat nu een zoekveld boven het plaatjesraster. Je typt een Nederlands
  woord ("slaap", "boos", "huilen") en het raster laat alleen de passende plaatjes zien. Zonder resultaat staat er
  "Niets gevonden. Probeer een ander woord." Elk plaatje heeft een naam voor schermlezers. Zoeken negeert hoofdletters
  en accenten. 84 tests, lint en build slagen; in de preview gecontroleerd dat "slaap" alleen het slaap-plaatje toont.
- Beslissingen: D-028 (nieuw).
- Problemen / verrassingen: geen. Checkpoint 1 is door Sander gehaald op de iPhone.
- Volgende: T-2.4 Foto maken of kiezen ⚙ Opus · medium. Sander wisselt met `/model` naar Opus voor de nieuwe sessie.
  Zet een verzonnen onderwerp klaar om te fotograferen (geen echte cliëntgegevens).

## 2026-11-22 — Editor per kleur (T-2.2)
- Waar: Claude Code (Sonnet 5.5 · high; past bij de tag: ja)
- Gedaan: T-2.2. In de invulmodus staan nu drie kleurknoppen (Groen, Oranje, Rood) en per kleur de lijsten Signalen
  (niet bij groen) en Acties. Je kunt tegels toevoegen (tekst + plaatje), wijzigen, verwijderen met "Weet je het
  zeker?" en met ↑ ↓ van volgorde veranderen. Maximaal 6 per lijst. Alles wordt direct opgeslagen. 78 tests,
  lint en build slagen. In de preview (390×844) een signaal toegevoegd, de bevestiging bekeken en na herladen
  teruggezien.
- Beslissingen: D-027 (nieuw). Q-004 beantwoord door Sander: 6 per lijst.
- Problemen / verrassingen: De opslagtests voor de editor draaien in jsdom met `fake-indexeddb`; dat werkt, dus
  geen aparte mocks nodig. Het plaatje kiezen is nog een tijdelijk rijtje van de 10 placeholder-pictogrammen.
  Daarna door Sander op zijn iPhone (vanaf het beginscherm) geprobeerd: de editor werkt.
- Volgende: T-2.3 Pictogramkiezer met zoekveld ⚙ Sonnet · medium. Sander wisselt met `/model` naar medium voor de
  nieuwe sessie. Checkpoint 1 op de iPhone staat nog open.

## 2026-11-22 — Invulmodus openen en welkomstscherm (T-2.1)
- Waar: Claude Code, zelfde sessie als T-1.2 t/m T-1.5 (Sonnet 5.5 · medium; past bij de tag: ja)
- Gedaan: T-2.1. De app opent nu op het echte startscherm ("Hoi [naam], wat merk je?", nog zonder tegels) met de
  lang-indrukken-knop rechtsboven. Die opent de invulmodus: bij een plan zonder signalen eerst het welkomstscherm
  met de optionele voornaam, daarna een tijdelijk scherm "Plan invullen" met "Klaar". De naam wordt opgeslagen en
  blijft na herladen staan (gecontroleerd in de preview met de echte opslag). 67 tests en lint slagen.
- Beslissingen: D-026 (nieuw). Proef en galerij zijn bereikbaar via `#proef` en `#galerie`.
- Problemen / verrassingen: Sander vond de galerij (Checkpoint 1) lelijk en dacht dat het de app was; uitgelegd dat
  het een testpagina is. Zijn wensen (schermbrede tegels, groot stoplicht, potloodstijl) staan in DESIGN.md.
- Volgende: T-2.2 Editor per kleur ⚙ Sonnet · high. Dat is zwaarder dan deze sessie: Sander start daarvoor
  een nieuwe sessie met `/model` op Sonnet · high. Checkpoint 1 op de iPhone staat nog open.

## 2026-11-22 — Teksten en placeholder-pictogrammen (T-1.5)
- Waar: Claude Code, zelfde sessie als T-1.2 t/m T-1.4 (Sonnet 5.5 · medium; tag was low, dus iets zwaarder dan nodig)
- Gedaan: T-1.5. 10 simpele SVG-pictogrammen in `public/pictos/` (caregiver, walk, music, water, sleep, angry,
  sad, tired, headache, happy), lijst in `src/features/pictos/pictos.ts`, component `Picto`. Teksten voor
  startscherm en resultaat in `nl.ts`. De galerij (`#galerie`) toont nu de pictogrammen. Tests (59) en lint
  slagen; de build neemt de SVG's mee voor offline gebruik.
- Beslissingen: geen nieuwe. De pictogrammen zijn tijdelijk (fase 4 vervangt ze; ids blijven dezelfde als
  mogelijk, anders migratie). De test leest de SVG's met `import.meta.glob`, zodat `@types/node` niet nodig is.
- Problemen / verrassingen: geen. Fase 1 is hiermee klaar; Checkpoint 1 is aan Sander.
- Volgende: **Checkpoint 1** (Sander): galerij bekijken en lang-indrukken-knop proberen op de iPhone. Daarna
  T-2.1 Invulmodus openen ⚙ Sonnet · medium.

## 2026-11-22 — Kleurberekening (T-1.4)
- Waar: Claude Code, zelfde sessie als T-1.2 en T-1.3 (Sonnet 5.5 · medium; tag was low, dus iets zwaarder dan nodig)
- Gedaan: T-1.4. `determineColor` in `src/domain/determineColor.ts`: rood wint van oranje, anders groen. Aangetikte
  groene signalen en acties tellen niet mee. 7 tests (55 totaal) en lint slagen.
- Beslissingen: geen nieuwe (volgt D-007 en SPEC §5.2).
- Problemen / verrassingen: geen.
- Volgende: T-1.5 Teksten en 10 placeholder-pictogrammen ⚙ Sonnet · low. Sander hoeft niets te doen.

## 2026-11-22 — Lang-indrukken-knop (T-1.3)
- Waar: Claude Code, zelfde sessie als T-1.2 (Sonnet 5.5 · medium; past bij de tag: ja)
- Gedaan: T-1.3. `LongPressButton` met ring die in 3 seconden volloopt, annuleert bij loslaten of wegschuiven,
  hint bij kort tikken, toetsenbord en label. 7 tests (48 totaal) en lint slagen. In de preview met
  pointer-events gecontroleerd (ring halverwege na 1,5 s, opent na 3 s). Proefknop in de galerij (`#galerie`).
- Beslissingen: D-025 (nieuw).
- Problemen / verrassingen: niet op de iPhone geprobeerd; dat hoort bij Checkpoint 1. Let daar op: opent hij niet
  per ongeluk, en komt er geen loep of menu bij lang drukken?
- Volgende: T-1.4 Kleurberekening ⚙ Sonnet · low. Sander hoeft niets te doen.

## 2026-11-22 — Design tokens en basiscomponenten (T-1.2)
- Waar: Claude Code (Sonnet 5.5 · medium; past bij de tag: ja)
- Gedaan: T-1.2. Tokens in `src/design/tokens.ts` (+ CSS-variabelen), contrastfunctie met tests, componenten
  `Tile`, `BigButton`, `ColorBadge`, `ColorSymbol`, woorden voor de kleuren in `nl.ts`. Tijdelijke galerij op
  `#galerie`. 41 tests en lint slagen; galerij bekeken op 390×844.
- Beslissingen: D-024 (nieuw).
- Problemen / verrassingen: `muted` haalde 4,5:1 niet en is donkerder gemaakt. Zuivere kleuren zijn te licht voor
  vormen zonder rand, dus de vormen hebben een donkere rand. Nog niet op de iPhone bekeken (hoort bij Checkpoint 1).
- Volgende: T-1.3 LongPressButton ⚙ Sonnet · medium. Sander hoeft niets te doen.

## 2026-11-22 — Datamodel en opslaglaag (T-1.1)
- Waar: Claude Code (Opus 5.5 · high; past bij de tag: ja)
- Gedaan: T-1.1. Datamodel in `src/domain/plan.ts`, Dexie-database `signaleringsplan` met schemaversie 1 in
  `src/storage/db.ts`, functies voor plan, tegels (toevoegen, wijzigen, verwijderen, volgorde) en foto's in
  `src/storage/planStore.ts`. Nieuw plan krijgt de rode actie "Ik ga naar mijn begeleider". SPEC §7 bijgewerkt.
  29 tests en lint slagen, build en publicatie naar GitHub Pages gelukt.
- Beslissingen: D-023 (nieuw). D-019 aangevuld: `fake-indexeddb` alleen voor tests, goedgekeurd door Sander.
- Problemen / verrassingen: jsdom heeft geen IndexedDB, dus de opslagtests draaien in Node met `fake-indexeddb`.
  `crypto.randomUUID` werkt niet via het netwerkadres (geen https), daarom gewone volgnummers als id.
  De app gebruikt de opslag nog niet; het proefscherm blijft staan voor T-0.7 en R-001.
- Volgende: T-1.2 Design tokens en basiscomponenten ⚙ Sonnet · medium. Sander kiest Sonnet · medium voor de nieuwe sessie.

## 2026-11-22 — PWA-proef online, Checkpoint 0 gehaald (T-0.4, T-0.5, T-0.6)
- Waar: Claude Code (Opus 5.5; past bij de tag van T-0.4: ja. T-0.6 had Haiku · low, maar was zo klein dat het hier meeging)
- Gedaan: T-0.4. `vite-plugin-pwa` en `dexie` geïnstalleerd, manifest en tijdelijk stoplicht-icoon, service
  worker voor offline. Proefscherm: tekst en foto bewaren in IndexedDB (eigen proefdatabase), foto verkleind tot
  1024 px, antwoord van `persist()` en "vanaf beginscherm" zichtbaar. GitHub Actions publiceert naar
  https://thebos24.github.io/signaleringsplan/. In de preview gecontroleerd: tekst en foto blijven staan na herladen.
- Beslissingen: D-022 (nieuw), D-013 en D-020 besloten.
- Problemen / verrassingen: `npm audit` meldt 4 "moderate" kwetsbaarheden in bouwgereedschap (R-012, niet op de telefoon).
  In de desktop-preview zegt `persist()` "nee"; dat is normaal in Chrome zonder installatie. Op de iPhone kijken.
- Daarna in dezelfde sessie: Sander deed T-0.5 op de iPhone: "beginscherm: ja", foto rechtop, alles bleef staan.
  T-0.6 vastgelegd (D-013 besloten, R-001/R-003/R-009 bijgewerkt). Checkpoint 0 gehaald. T-0.7 (Android-proef) toegevoegd.
- Volgende: T-1.1 Datamodel en opslaglaag ⚙ Opus · high. Q-007 is beantwoord: één plan per telefoon (D-020 besloten).
  Afsluiting: tests (5) en lint slagen.

## 2026-11-22 — Projectopzet en GitHub-repo (T-0.2, T-0.3)
- Waar: Claude Code (start op Opus, daarna gewisseld naar Sonnet 5.5 · medium; past bij de tag: ja)
- Gedaan: T-0.3 projectopzet (Vite, React, TypeScript, Vitest, ESLint, Prettier, mappen, Hallo-scherm,
  `.claude/launch.json`, commando's in CLAUDE.md). T-0.2: GitHub-repo `Thebos24/signaleringsplan` door Claude
  aangemaakt en gepusht. Lint, test en build slagen.
- Beslissingen: D-021 (versies en opzet).
- Problemen / verrassingen: De repo staat onder `Thebos24` (kleine b), niet `TheBos24`; GitHub maakt geen verschil.
  De dev-server werkt alleen op `/signaleringsplan/` (door de Vite `base`).
- Volgende: T-0.4 PWA-proef op de iPhone ⚙ Opus · medium. Sander wisselt eerst met `/model`.

## 2026-11-22 — Idee uitgewerkt en dossier opgezet (T-0.1)
- Waar: claude.ai
- Gedaan: T-0.1. Idee besproken en kritische vragen beantwoord. Spec, design, beslissingen, takenlijst, backlog,
  open vragen, risico's, setup en de commando's `/start-session` en `/end-session` opgezet.
- Beslissingen: D-001 t/m D-020 (D-020 is nog een voorstel).
- Problemen / verrassingen: geen.
- Volgende: T-0.2 (Sander, SETUP.md stap 1–4), daarna T-0.3 projectopzet ⚙ Sonnet · medium.
