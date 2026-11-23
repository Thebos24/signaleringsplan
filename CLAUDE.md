# CLAUDE.md — Signaleringsplan (werknaam)

Instructies voor Claude Code. Lees dit bestand helemaal aan het begin van elke sessie.

## Wat we bouwen

Een **heel simpele web-app (PWA)** voor cliënten met een licht verstandelijke beperking (LVB) of laag IQ.
Het is een digitale versie van hun papieren **signaleringsplan**, met drie stoplichtkleuren:

1. De cliënt opent de app vanaf het beginscherm van zijn telefoon.
2. De app laat de **signalen** zien die vooraf met de begeleider zijn gekozen ("Ik slaap slecht", "Ik ben boos").
   De cliënt tikt aan wat hij merkt.
3. De app bepaalt de kleur (**groen, oranje of rood**) en toont grote **tegels met een geschetst plaatje en een
   korte zin** die zeggen wat de cliënt kan doen ("Ga wandelen", "Ik ga naar mijn begeleider").

De cliënt vult het plan **samen met zijn begeleider** in, op de telefoon van de cliënt. Het invulscherm zit achter
**een knop die je lang ingedrukt houdt**. Alles blijft **op de telefoon**: geen server, geen account.

Volledige beschrijving: `docs/SPEC.md`. Uitstraling en regels voor eenvoud: `docs/DESIGN.md`.

**Belangrijkste regel: zo simpel mogelijk.** Twijfel je of iets erbij moet? Dan niet. Zet het in `docs/BACKLOG.md`.

## Samenwerken met de eigenaar

- **Eigenaar: Sander**: productowner en tester, hobbyproject. Hij **is (nog) geen programmeur**. Hij heeft eerder
  met Claude Code gebouwd: een game in TypeScript/Vite die hij op zijn iPhone testte, en de iPhone-app Polyp.
  Hij heeft een iPhone. Een Android-telefoon komt eind november 2026. GitHub: TheBos24.
- Sanders partner helpt met testen en kent de doelgroep.
- Leg in gewone taal uit wat je hebt veranderd en hoe hij het kan zien ("open de app op je telefoon, houd de
  knop rechtsboven 3 seconden ingedrukt en…"). Vermijd vakjargon of leg het in één zin uit.
- Sander neemt **productbeslissingen**: wat de app doet, hoe hij voelt en eruitziet, en wat erin zit.
  Claude neemt **technische beslissingen**, legt ze vast in `docs/DECISIONS.md` met reden en afgewezen
  alternatieven, en noemt de belangrijke in de samenvatting.
- Moet Sander iets zien of doen (testen op de telefoon, GitHub, iets installeren)? Zeg dat duidelijk en geef
  genummerde stappen, inclusief wat hij moet zien als het gelukt is.
- Eén korte samenvatting per taak, geen verslag van elke stap.

## Begin van elke sessie (in deze volgorde)

Sander start een sessie met `/start-session` en sluit af met `/end-session` (`.claude/commands/`).

1. Lees `CLAUDE.md` (dit bestand).
2. Lees `docs/TASKS.md`: zoek de huidige fase en de eerste taak die nog niet is afgevinkt.
3. Lees de laatste 2 items van `docs/SESSION_LOG.md`.
4. Kijk in `docs/OPEN_QUESTIONS.md` of iets de taak blokkeert.
5. Lees de items in `docs/DECISIONS.md` die bij de taak horen, voordat je code aanraakt.
6. Vertel Sander in 2–3 regels: waar we staan, wat je nu gaat doen en wat je van hem nodig hebt.
   Past het model of de effort van deze sessie niet bij de `⚙`-tag van de taak? Zeg dat eerst en stel voor te wisselen.

## Einde van elke sessie (altijd, ook als de taak niet af is)

1. Vink afgeronde taken af in `docs/TASKS.md`, met datum. Zet nieuw ontdekte taken in de juiste fase.
2. Voeg een item toe bovenaan `docs/SESSION_LOG.md` (sjabloon staat in dat bestand).
3. Leg elke beslissing vast in `docs/DECISIONS.md`, **met waarom en welke alternatieven zijn afgewezen (en waarom)**.
4. Nieuwe risico's → `docs/RISKS.md`. Nieuwe vragen → `docs/OPEN_QUESTIONS.md`.
   Nieuwe ideeën → `docs/BACKLOG.md` (nooit ongevraagd bouwen).
5. Commit (zie Git).
6. Noem in de samenvatting de volgende taak en zijn `⚙`-tag, zodat Sander die kan kiezen voor de volgende sessie.

## Het dossier: wat staat waar

| Bestand | Bevat |
| --- | --- |
| `docs/SPEC.md` | Wat de app doet (de bron van waarheid voor gedrag en scope) |
| `docs/DESIGN.md` | Uitstraling, regels voor eenvoud, design tokens, stijl van de pictogrammen |
| `docs/DECISIONS.md` | Elke beslissing met **waarom**, afgewezen alternatieven met **waarom niet**, en wanneer herzien |
| `docs/TASKS.md` | Takenlijst in fases met checkpoints en `⚙` model/effort per taak; huidige status |
| `docs/BACKLOG.md` | Ideeën voor later, elk met de reden waarom het later is |
| `docs/OPEN_QUESTIONS.md` | Open vragen: wie beantwoordt ze en wat blokkeren ze |
| `docs/RISKS.md` | Bekende risico's en valkuilen met maatregelen |
| `docs/SESSION_LOG.md` | Logboek van elke werksessie, nieuwste bovenaan |
| `docs/SETUP.md` | Eenmalige stappen voor Sanders Mac, GitHub en telefoons |

Regels:
- **Verwijder nooit geschiedenis.** Vervangen beslissingen blijven staan met `Vervangen door D-0xx`. Beantwoorde
  vragen gaan naar het kopje "Beantwoord", met het antwoord en de bijbehorende beslissing.
- Spreken code en `SPEC.md` elkaar tegen? Stop en vraag Sander wat klopt. Pas daarna het andere aan.
- Gebruik overal ID's: `D-0xx` beslissingen, `T-x.y` taken, `Q-0xx` vragen, `R-0xx` risico's, `B-0xx` backlog.
  Noem ze in commitberichten en waar handig in code-commentaar (`// Zie D-007`).

## Model en effort per taak (D-018)

Sander kiest het model en de effort **voordat** hij een sessie start (in Claude Code via `/model`). Elke taak in
`docs/TASKS.md` eindigt met een tag zoals `⚙ Sonnet · medium`. Gebruik deze tabel als een taak geen tag heeft,
of voor werk buiten de takenlijst.

| Tag | Gebruik voor | Voorbeelden |
| --- | --- | --- |
| `Haiku · low` | Alleen vragen of lezen, kleine aanpassingen in docs, geen app-code | "Waar staan we?", typfout in een doc |
| `Sonnet · low` | Kleine, duidelijk omschreven wijzigingen en stappenplannen | Teksten aanpassen, een simpel scherm, installatie-uitleg |
| `Sonnet · medium` | **Standaard voor gewone app-code**: schermen, tegels, formulieren, tests | Tegelscherm, design tokens, lang-indrukken-knop |
| `Sonnet · high` | Grotere schermen met veel toestanden | De editor voor signalen en acties |
| `Opus · medium` | Fundament en lastige browser-onderdelen waar een verkeerde keuze veel herwerk kost | Projectopzet + PWA, camera, schetsfilter, pictogrammen tekenen, review van eenvoud |
| `Opus · high` | Alles waarbij **het plan van een cliënt verloren of kapot kan gaan** | Datamodel en opslag, schema-migraties, updates van de app |
| `Fable · high` | Alleen als noodgreep: een bug die Opus · high in twee pogingen niet oploste | — |

Regels:
- Kies het model **aan het begin** van een sessie en houd het aan. Wisselen halverwege laat Claude het hele
  gesprek opnieuw lezen tegen de prijs van het nieuwe model. Doe `/end-session` in dezelfde sessie.
- Eén taak per sessie, of een paar kleine taken met dezelfde tag. Start een nieuwe sessie voor de volgende taak.
- Blijkt een taak zwaarder of lichter dan de tag? Zeg dat, stel de juiste tag voor en pas hem aan in `TASKS.md`.
- Gebruik `xhigh` of `max` nooit standaard: dat kost veel meer en helpt bij deze app zelden.

## Vraag de eigenaar eerst voordat je…

- Een dependency toevoegt die niet in `docs/DECISIONS.md` staat (D-019).
- Gedrag of scope verandert die in `docs/SPEC.md` staat, of iets bouwt dat niet in de huidige fase hoort.
- Iets toevoegt dat de cliënt meer keuzes, meer tekst of meer schermen geeft.
- Het datamodel verandert nadat er echte plannen op een telefoon staan (vanaf Checkpoint 3).
- Een checkpoint overslaat.

Al het andere technische (structuur, namen, refactors): beslis zelf, leg het vast als het ertoe doet en noem het
in je samenvatting.

## Technische kaders

Stack (D-012): **Vite + React + TypeScript**, PWA via `vite-plugin-pwa`, opslag in **IndexedDB via Dexie** (D-013),
tests met **Vitest** (+ Testing Library voor componenten). Hosting: **GitHub Pages** (D-014, voorlopig).

- **Geen server, geen accounts, geen analytics, geen tracking** (D-002). Na het laden doet de app **geen enkele
  netwerkaanvraag**. Dus ook geen externe fonts, CDN's of plaatjes van internet: alles zit in de build.
- De app moet **volledig offline** werken nadat hij één keer is geopend.
- Doelen: Safari op iOS (Sanders iPhone, vanaf het beginscherm) en Chrome op Android. Alleen staand (portrait).
- Foto's worden als `Blob` in IndexedDB bewaard, al verkleind (max. 1024 px) en als schets omgezet (D-010).
  Bewaar het origineel niet: dat is privacygevoelig en neemt ruimte in.
- Vraag bij de eerste start `navigator.storage.persist()` aan (R-001).
- **Versioneer het Dexie-schema vanaf de eerste versie** en schrijf een migratie bij elke wijziging (R-010).
- Alle teksten voor de gebruiker in het Nederlands, in **eenvoudige taal** (D-015), en op één plek
  (`src/text/nl.ts`), nooit verspreid door de componenten.
- Gebruik design tokens uit één plek (`src/design/tokens.ts` + CSS-variabelen). Geen losse kleuren of maten in componenten.
- Kleur is nooit de enige drager van betekenis: altijd ook het woord ("Groen") en een vorm of plaatje (DESIGN.md).
- Geen dependencies zonder vastgelegde beslissing (D-019).

## Codeafspraken

- Mappen: `src/app/` (routes/schermen), `src/features/<onderdeel>/`, `src/storage/`, `src/domain/` (pure logica,
  zoals de kleurberekening), `src/design/`, `src/components/`, `src/text/`, `src/features/pictos/sources/` (bron-SVG's van de pictogrammen, D-039).
- Code, namen en commentaar in het **Engels**; teksten voor de gebruiker in het Nederlands.
- Eén component per bestand. Pure functies in `src/domain/` krijgen altijd unit tests.
- Tests verplicht voor: kleurberekening, opslag en migraties, schetsfilter (draait zonder fout, juiste afmetingen).
- Liever simpele, leesbare code dan slimme code. Sander laat het misschien later door iemand anders bekijken.

## Bouwen en testen

Commando's (ingevuld in T-0.3):

```bash
npm install          # eenmalig
npm run dev          # lokaal starten; open http://localhost:5173/signaleringsplan/ (let op het pad erachter, D-014)
                     # ook bereikbaar op je telefoon via het netwerkadres (Network) dat Vite toont
npm test             # alle tests
npm run build        # productie-build in dist/
npm run lint         # code-controle
npm run format       # code netjes opmaken (Prettier)
```

- Test elke schermwijziging op een telefoonformaat (390×844) in de preview, en bij checkpoints op Sanders iPhone
  **vanaf het beginscherm** (niet alleen in Safari: opslag werkt daar anders, R-001).
- Vanaf de Android-telefoon er is: elk checkpoint ook op Android.

## Git

- Elke taak eindigt met een commit; het bericht noemt de taak-ID's (`T-1.2: tegelcomponent en design tokens`).
- Push naar GitHub (repo `TheBos24/signaleringsplan`, wordt aangemaakt in T-0.2). Pushen naar `main` publiceert
  via GitHub Actions naar GitHub Pages (T-0.4).
- Commit nooit geheimen, `.env`-bestanden, `node_modules/` of `dist/`.
- Gebruik nooit echte cliëntgegevens in tests, voorbeelddata of screenshots. Alleen verzonnen voorbeelden.
