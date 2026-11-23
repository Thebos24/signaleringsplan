# Taken

**Huidige fase: 2 (Invulkant).** Fase 0 en Checkpoint 0 zijn af (2026-11-22). Fase 1 is af, Checkpoint 1 is gehaald (Sander, 2026-11-22). T-2.1 t/m T-2.6 zijn af; Checkpoint 2 (Sander) staat open. T-3.1 en T-3.2 zijn af, maar op 2026-11-23 besliste Sander een **herontwerp** (D-035, D-036, D-037). T-2.7, T-2.8 en T-2.9 zijn af. Eerst T-2.10, daarna Checkpoint 2, dan T-3.3.

Zo werkt het: fases lopen op volgorde. Elke fase eindigt met een **checkpoint** dat Sander op zijn telefoon
uitprobeert. We gaan pas verder als het goed voelt. Eigenaar: **S** = Sander, **C** = Claude Code.
Vink af met `[x]` en zet de datum erachter. Nieuwe taken komen in de juiste fase met het volgende vrije nummer.
`⚙` = het model en de effort voor de sessie van die taak (D-018, CLAUDE.md → "Model en effort per taak").
Taken alleen voor Sander, zonder tag, hebben geen Claude-sessie nodig.

---

## Fase 0: Voorbereiding

Doel: zeker weten dat we kunnen bouwen, publiceren en op de iPhone kunnen openen vanaf het beginscherm,
en dat gegevens daar blijven staan, voordat we functies bouwen.

- [x] T-0.1 (S+C) Idee uitwerken, vragen beantwoorden, spec en dit dossier opzetten — 2026-11-22
- [x] T-0.2 (S+C) `docs/SETUP.md` stap 1–4: Node.js controleren, GitHub-repo aanmaken, Claude Code in deze map openen — 2026-11-22 (repo door Claude aangemaakt)
- [x] T-0.3 (C) Projectopzet: Vite + React + TypeScript, ESLint, Prettier, Vitest, mappenstructuur uit CLAUDE.md,
      `git init` met `.gitignore`, een leeg "Hallo"-scherm, `.claude/launch.json` voor de preview.
      Vul "Bouwen en testen" in CLAUDE.md in met de echte commando's. ⚙ Sonnet · medium — 2026-11-22
- [x] T-0.4 (C) **PWA-proef op de iPhone**: `vite-plugin-pwa` (manifest, tijdelijk icoon, service worker),
      publiceren via GitHub Actions naar GitHub Pages (D-014). Proefscherm dat (a) een tekst en een foto opslaat
      in IndexedDB, (b) `navigator.storage.persist()` aanvraagt en het antwoord toont, (c) een foto laat maken met
      `<input capture>`. Leg de uitkomst vast in D-013 en RISKS (R-001, R-003, R-009). ⚙ Opus · medium — 2026-11-22
      (proef staat online; de uitkomst op de iPhone volgt uit T-0.5 en gaat dan naar D-013 en RISKS)
- [x] T-0.5 (S) Proef doen met de stappen die Claude geeft: app op het beginscherm zetten, iets opslaan, app
      afsluiten, vliegtuigmodus aan, opnieuw openen. Staat alles er nog?
- [x] T-0.6 (C) Uitkomst van T-0.5 vastleggen in D-013 (status) en R-001, R-003, R-009. ⚙ Haiku · low — 2026-11-22
- [ ] T-0.7 (S) Proef herhalen op de Android-telefoon zodra die er is (D-016).

**Checkpoint 0:** Sander opent de proef-app vanaf zijn beginscherm, zonder internet, en zijn opgeslagen tekst en
foto staan er na het opnieuw opstarten van de telefoon nog. ✅ Gehaald op 2026-11-22 (iPhone).

## Fase 1: Fundament

Doel: de onderdelen waar alles op rust. Nog niets moois voor de cliënt.

- [x] T-1.1 (C) Datamodel en opslaglaag (SPEC §7): Dexie-database met schemaversie 1, functies voor plan en tegels
      (toevoegen, wijzigen, verwijderen, volgorde), foto's als Blob, migratie-opzet, tests. Nieuw plan krijgt
      standaard de rode actie "Ik ga naar mijn begeleider" (D-008). ⚙ Opus · high — 2026-11-22 (D-023)
- [x] T-1.2 (C) Design tokens (DESIGN.md) als TS + CSS-variabelen, contrastcheck, en basiscomponenten: `Tile`,
      `BigButton`, `ColorBadge` (kleur + woord + symbool). ⚙ Sonnet · medium — 2026-11-22 (D-024)
- [x] T-1.3 (C) `LongPressButton`: 3 seconden ingedrukt houden met een ring die volloopt, werkt met touch en muis,
      annuleert bij loslaten of wegschuiven, toegankelijk label (D-006). Tests. ⚙ Sonnet · medium — 2026-11-22 (D-025)
- [x] T-1.4 (C) Kleurberekening als pure functie in `src/domain/` (D-007) met tests voor alle gevallen. ⚙ Sonnet · low — 2026-11-22
- [x] T-1.5 (C) Teksten op één plek (`src/text/nl.ts`) en tijdelijke placeholder-pictogrammen (10 simpele SVG's)
      zodat fase 2 en 3 kunnen bouwen. Eén pictogram heet `caregiver` (de standaard rode actie, D-023). ⚙ Sonnet · low — 2026-11-22

**Checkpoint 1:** Sander ziet in de preview de tegels, knoppen en kleurlabels en probeert de lang-indrukken-knop op zijn iPhone. ✅ Gehaald op 2026-11-22 (iPhone).

## Fase 2: Invulkant (begeleider)

Doel: een begeleider kan samen met de cliënt een compleet plan invullen.

- [x] T-2.1 (C) Invulmodus openen via de lang-indrukken-knop, welkomstscherm bij een leeg plan, voornaam cliënt (SPEC §6.1–6.2). ⚙ Sonnet · medium — 2026-11-22 (D-026)
- [x] T-2.2 (C) Editor per kleur: signalen (oranje, rood) en acties (alle kleuren) toevoegen, bewerken,
      verwijderen met bevestiging, volgorde wijzigen, maximaal aantal (Q-004). ⚙ Sonnet · high — 2026-11-22 (D-027; plaatje kiezen is nog een tijdelijk rijtje, T-2.3)
- [x] T-2.3 (C) Pictogramkiezer: raster met zoekveld (zoekt op Nederlandse trefwoorden per pictogram). ⚙ Sonnet · medium — 2026-11-22 (D-028)
- [x] T-2.4 (C) Foto maken of kiezen: vierkant bijsnijden (simpel: verschuiven + zoomen), verkleinen tot 1024 px,
      orientatie goed zetten, opslaan als Blob. ⚙ Opus · medium — 2026-11-23 (D-029; werkt op de iPhone, foto's rechtop)
- [x] T-2.5 (C) Schetsfilter (D-010): canvas-filter van foto naar potloodschets, voorbeeld met "Gebruik" / "Opnieuw".
      Testen met verschillende foto's (licht, donker, binnen, buiten, gezicht). Tests voor afmetingen en foutloos draaien. ⚙ Opus · medium
      — 2026-11-23 (D-030 potlood, D-031 Bewaar zegt wat er mist, D-032 zachte witte rand)
- [x] T-2.6 (C) "Bekijk als cliënt" en "Klaar". ⚙ Sonnet · low — 2026-11-23 (preview = het startscherm met een knop terug; de echte flow komt in Fase 3)

### Herontwerp (2026-11-23, D-035, D-036, D-037)

Sander vond de schermen een bende. Het schermoverzicht, de Apple-stijl en de pictogramwerkwijze zijn goedgekeurd in
schetsen (`docs/ontwerp-voorstellen/`). In deze volgorde bouwen; elke taak is een eigen sessie.

- [x] T-2.7 (C) Fundament: nieuwe design tokens (kleuren, lettergroottes, afstanden) en basiscomponenten in Apple-stijl:
      groot kopje, gegroepeerde lijst, rij met plaatje en cirkel-vinkje, hoofdknop op vaste balk, secundaire knop,
      tegel voor de begeleider, terugknop. Oude `Tile`, `BigButton` vervangen of aanpassen; contrastcheck; tests; DESIGN.md. ⚙ Sonnet · high — 2026-11-23 (D-038; `BigButton` is nu `Button`, oude `Tile` blijft tot T-2.10)
- [x] T-2.8 (C) Pictogramwerkwijze: bronmap met platte SVG-tekeningen, omzetting via `sketch()` (bij het bouwen of bij eerste gebruik,
      de keuze vastleggen), eventueel instelling in het filter voor donkerdere lijnen (met tests), de 10 bestaande
      pictogrammen opnieuw tekenen als bron. Werkt offline. ⚙ Opus · medium — 2026-11-23 (D-039: in de app bij het eerste tonen, in het geheugen; `PICTO_DARKNESS`)
- [x] T-2.9 (C) Invulkant omzetten naar de vier schermen uit SPEC §6.3: Plan, Eén kleur, Eén tegel, Plaatje kiezen. Welkomstscherm
      weg, naam wijzigen, volgorde met ← →. Opslag en datamodel blijven; bestaande tests omzetten. ⚙ Sonnet · high — 2026-11-23 (D-040; in de preview bekeken, nog niet op de iPhone)
- [ ] T-2.10 (C) Cliëntschermen (Start en Resultaat) in de nieuwe stijl met de nieuwe componenten en pictogrammen. Let op: foto's zijn
      geschetst op `paper`; op een witte rij geeft dat een licht vierkantje. Zo nodig foto's ook op wit schetsen (D-039). ⚙ Sonnet · medium

**Checkpoint 2** (na het herontwerp, T-2.7 t/m T-2.10): Sander en zijn partner vullen samen een verzonnen testplan in op de iPhone, met minstens één eigen
foto per kleur. Is het invullen duidelijk? Lukt het binnen ±15 minuten?

## Fase 3: Gebruikskant (cliënt)

Doel: de hele flow voor de cliënt, zo simpel mogelijk.

- [x] T-3.1 (C) Startscherm "Hoi [naam], wat merk je?" met signaaltegels (aan/uit), tegel "Het gaat goed" en knop
      "Klaar" (SPEC §5.1). Indeling volgens het voorstel in Q-001. ⚙ Sonnet · medium — 2026-11-23 (D-033)
- [x] T-3.2 (C) Resultaatscherm per kleur: kleurvlak + woord + symbool, actietegels, knop "Terug" (SPEC §5.3). ⚙ Sonnet · medium — 2026-11-23 (D-034)
- [ ] T-3.3 (C) Rood scherm met de extra grote bovenste tegel; eventuele tekst over noodsituaties (Q-005). ⚙ Sonnet · medium
- [ ] T-3.4 (C) Kleine dingen: na terugkomen in de app altijd het startscherm, aangetikte signalen gewist,
      geen dubbel tikken nodig, werkt zonder internet. ⚙ Sonnet · low

**Checkpoint 3:** Sander doorloopt de hele flow op de iPhone (en op Android als die er is), bij alle drie kleuren.
Beslissen over Q-001 (één scherm of per kleur) en Q-002 (direct een kleur kiezen).
**Vanaf hier geldt: wijzigingen aan het datamodel alleen met een migratie en overleg (CLAUDE.md).**

## Fase 4: Pictogrammen

Doel: een eigen set geschetste pictogrammen in één stijl (D-011).

- [ ] T-4.1 (C) Stijlgids uitwerken in DESIGN.md + 6 proefpictogrammen (wandelen, muziek, begeleider, slapen,
      boos, het gaat goed). Sander keurt de stijl goed. ⚙ Opus · medium
- [ ] T-4.2 (C) Set acties, ±20: wandelen, muziek luisteren, water drinken, rustig ademhalen, douchen, slapen,
      praten met iemand, bellen, naar begeleider, rustige plek, tekenen, sporten, eten, tv kijken, knuffel/dier,
      opruimen, buiten zitten, spelletje, koptelefoon op, lezen. ⚙ Opus · medium
- [ ] T-4.3 (C) Set signalen, ±20: boos, verdrietig, moe, slecht slapen, niet eten, veel eten, hoofdpijn, buikpijn,
      alleen willen zijn, schreeuwen, piekeren, druk in mijn hoofd, huilen, snel geïrriteerd, niet naar buiten gaan,
      telefoon steeds pakken, blij, rustig, energie. ⚙ Opus · medium
- [ ] T-4.4 (C) Placeholders vervangen, trefwoorden per pictogram voor het zoekveld. ⚙ Sonnet · low

**Checkpoint 4:** Sander en zijn partner herkennen elk pictogram zonder de tekst te lezen.

## Fase 5: Afwerken

- [ ] T-5.1 (C) Review op eenvoud en toegankelijkheid tegen DESIGN.md: raakvlakken, contrast, kleurenblindheid,
      VoiceOver/TalkBack-labels, `prefers-reduced-motion`, tekstgrootte. Lijst met verbeteringen. ⚙ Opus · medium
- [ ] T-5.2 (C) Verbeteringen uit T-5.1 doorvoeren. ⚙ Sonnet · medium
- [ ] T-5.3 (C) Alle teksten nalopen op eenvoudige taal. ⚙ Sonnet · low
- [ ] T-5.4 (C) App-icoon (geschetst stoplicht), naam en een uitlegpagina voor begeleiders: "Zet de app op het
      beginscherm" met stappen voor iPhone en Android. ⚙ Sonnet · medium
- [ ] T-5.5 (C) Updates zonder verrassingen: nieuwe versie wordt bij de volgende start gebruikt, zonder dat het
      plan verdwijnt. Testen met een schemamigratie. ⚙ Opus · high
- [ ] T-5.6 (S) Volledige test op Android en iPhone. Problemen doorgeven.
- [ ] T-5.7 (C) Android- en iPhone-problemen oplossen. ⚙ Sonnet · medium

**Checkpoint 5:** Sander zou de link met een gerust hart aan een begeleider geven.

## Fase 6: Testen met mensen

- [ ] T-6.1 (S) Test met Sanders partner en, als dat kan, een begeleider en een cliënt. Noteer wat opvalt.
- [ ] T-6.2 (C) Feedback ordenen: wat nu, wat naar de backlog. ⚙ Sonnet · low
- [ ] T-6.3 (C) Verbeteringen uit T-6.2 doorvoeren (taken worden hier toegevoegd). ⚙ Sonnet · medium
