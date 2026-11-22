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
  afstemmen in T-2.6 (R-004).
- Herzien als: de schetsen er bij echte foto's slecht uitzien.

### D-011 — Eigen geschetste pictogrammen, getekend als SVG
- Datum: 2026-11-22 · Status: Besloten · Besloten door: Sander
- Besluit: De app heeft een eigen set geschetste pictogrammen (SVG), getekend door Claude volgens de stijlgids in DESIGN.md.
- Waarom: Eén consistente stijl, geen licentiekosten, geen externe bestanden.
- Afgewezen: Bestaande pictogrammensets: andere stijl, en licenties moeten per set gecontroleerd worden.
- Gevolgen: Fase 4 (pictogrammen). Tot die tijd tijdelijke placeholder-pictogrammen.

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
- Waarom: Elke dependency is onderhoud en een mogelijk privacy- of beveiligingsrisico.

### D-020 — Eén plan per telefoon
- Datum: 2026-11-22 · Status: Voorstel (wacht op Sander, Q-007) · Besloten door: Claude
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
