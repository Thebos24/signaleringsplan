# Specificatie: Signaleringsplan-app (v1)

Bron van waarheid voor wat de app doet. Wijzigingen alleen in overleg met Sander.
Laatst bijgewerkt: 2026-11-22.

## 1. Waarom

Een signaleringsplan helpt iemand te herkennen wanneer het minder goed gaat, en zegt wat hij dan kan doen.
Het staat vaak op papier of in het cliëntdossier (bij Sanders doelgroep: Medicore). Op het moment dat het nodig is,
pakt niemand het erbij. Deze app zet het plan op de telefoon van de cliënt, zo simpel als een foto van het plan,
maar dan met plaatjes en grote knoppen.

## 2. Voor wie

- **Cliënt**: volwassene met een licht verstandelijke beperking (LVB) of laag IQ. Leest moeilijk of niet graag,
  raakt snel overprikkeld, heeft een eigen telefoon (iPhone of Android).
- **Begeleider**: vult het plan samen met de cliënt in op de telefoon van de cliënt, en past het aan als dat nodig is.

Het is een **gratis hobbyproject**, zonder licentie of account (D-017).

## 3. Principes

1. **Zo simpel mogelijk.** Elk scherm heeft één vraag of één doel. Weinig tekst, veel plaatje.
2. **Persoonlijk.** Elk plan is anders. Er zijn geen vaste tips: alles wordt samen met de begeleider gekozen (D-005).
3. **Alleen op de telefoon.** Geen server, geen account, geen internet nodig na de eerste keer (D-002).
4. **Geen oordeel.** De app zegt nooit "fout" en geeft geen punten of scores.
5. **Rustig.** Geen geluiden, meldingen of drukke animaties.

## 4. Begrippen

| Begrip | Betekenis |
| --- | --- |
| **Kleur** | Groen (het gaat goed), Oranje (het gaat minder), Rood (het gaat niet goed). Drie, niet meer (D-004). |
| **Signaal** | Iets wat de cliënt merkt of doet als het minder gaat, bij één kleur. Bijv. oranje: "Ik slaap slecht". |
| **Actie** | Wat de cliënt kan doen bij een kleur. Bijv. oranje: "Ga wandelen". Rood: "Ik ga naar mijn begeleider". |
| **Tegel** | Een groot vlak met één plaatje en één korte zin. Signalen en acties zijn tegels. |
| **Plaatje** | Een geschetst pictogram uit de app, óf een eigen foto die de app omzet naar een schets (D-010, D-011). |

## 5. Wat de cliënt doet (de gebruikskant)

### 5.1 Openen: "Hoe gaat het?"
- De cliënt opent de app vanaf het beginscherm.
- Het eerste scherm toont de **signalen** van het plan als tegels: "Wat merk je?"
- De cliënt tikt aan wat hij merkt (aanzetten en uitzetten kan). Daarna tikt hij op de grote knop **"Klaar"**.
- Er is ook een tegel **"Het gaat goed"** voor als hij niets merkt. Die gaat direct naar groen.
- Voorstel (Q-001): alle signalen van oranje en rood door elkaar op één scherm, in een vaste volgorde die de
  begeleider kiest. Is dat te veel? Dan per kleur een eigen scherm. Dit testen we bij Checkpoint 3.

### 5.2 De kleur bepalen (D-007)
- Is er minstens één rood signaal aangetikt, dan wordt het **rood**.
- Anders: minstens één oranje signaal, dan **oranje**.
- Anders: **groen**.
- Groene signalen bestaan niet als vraag. Groen beschrijft hoe het gaat als het goed gaat (zie 5.3).
- De regel is een pure functie met tests (`src/domain/`). Andere regels (bijv. "twee oranje = rood") alleen na
  een beslissing van Sander.

### 5.3 Resultaat: de tegels
- Het scherm krijgt de kleur als rustige achtergrond of rand, met het woord: **"Je bent op oranje."**
- Daaronder de **acties** voor die kleur als grote tegels (plaatje + korte zin).
  Tegels zijn alleen om te bekijken: er hoeft niets aangetikt te worden.
- **Groen**: "Het gaat goed!" met de groene tegels (wat de cliënt doet om groen te blijven, bijv. "Ik sport").
- **Rood**: één grote bovenste tegel met de belangrijkste actie, standaard **"Ik ga naar mijn begeleider"**
  (aan te passen, D-008). Eventueel nog een of twee andere acties eronder.
- Onderaan één knop **"Terug"** naar het begin.
- Er komt geen opvolgvraag zoals "Gaat het nu beter?" (D-009).

### 5.4 Wat er niet is voor de cliënt
- Geen menu, geen instellingen, geen geschiedenis, geen meldingen, geen account.

## 6. Wat de begeleider doet (de invulkant)

### 6.1 Naar de invulmodus (D-006)
- Rechtsboven op het startscherm staat een kleine, rustige knop (tandwiel of potlood).
- Kort tikken doet niets, of toont kort: "Houd ingedrukt om te wijzigen".
- **3 seconden ingedrukt houden** opent de invulmodus. Een ring loopt vol terwijl je drukt.

### 6.2 De eerste keer
- Een leeg plan opent op het Plan-scherm (6.3) met een korte uitleg bovenaan: wat de app doet, en "Vul dit plan samen in."
  Er is geen apart welkomstscherm meer (D-035).
- De voornaam van de cliënt (optioneel, voor "Hoi Sam, wat merk je?") stel je in met "Naam wijzigen".

### 6.3 Het plan invullen (D-035)
Vier schermen, drie niveaus, overal "‹ Terug" linksboven:
1. **Plan**: de drie kleuren als kaarten (**Groen · Oranje · Rood**) met hoeveel signalen en acties erin zitten. Onderaan
   "Bekijk als cliënt" en "Naam wijzigen"; "Klaar" sluit de invulmodus.
2. **Eén kleur**: bovenaan het kleurwoord met symbool. Daaronder twee blokken met tegels, twee per rij, zoals de cliënt ze
   ziet: **Signalen** (alleen oranje en rood): "Wat merk je dan?" en **Acties** (alle drie): "Wat kun je dan doen?". Elke lijst
   eindigt met een "+ Toevoegen"-tegel. Tik op een tegel om hem te wijzigen.
3. **Eén tegel**: voorbeeld van de tegel, daaronder de tekst ("Wat staat erop?"), "Ander plaatje of foto", de volgorde (← Eerder,
   Later →), "Klaar" en apart "Verwijderen" (met "Weet je het zeker?").
4. **Plaatje kiezen**: zoekveld en raster met pictogrammen (D-011, D-037), en "Foto maken of kiezen". Een foto wordt vierkant
   bijgesneden, verkleind en omgezet naar een schets (D-010); de begeleider ziet het resultaat en kiest "Gebruik" of "Opnieuw".
- Maximaal **6** per lijst (Q-004, D-027): 6 signalen en 6 acties per kleur. Bij 6 verdwijnt de "+ Toevoegen"-tegel en staat er
  "De lijst is vol". De standaard rode actie telt mee.
- Rood krijgt bij een nieuw plan al de actie "Ik ga naar mijn begeleider" met pictogram, aan te passen of te verwijderen.

### 6.4 Opslaan
- Alles wordt op de telefoon opgeslagen, nooit op een server. Volgorde, verwijderen en de naam worden meteen bewaard. De tekst en het plaatje van een
  tegel worden bewaard met "Klaar" op het tegelscherm; "Terug" laat het vallen (D-040).
- Geen export of back-up: het plan staat ook in het cliëntdossier (Medicore) en is daaruit opnieuw in te vullen (D-003).

## 7. Datamodel (uitgewerkt in T-1.1, D-023)

```
Plan        { id: 'plan', clientName?, createdAt, updatedAt }   // één plan per telefoon (D-020)
Tile        { id, kind: 'signal' | 'action', color: 'green' | 'orange' | 'red',
              text, image: ImageRef, order }                    // groen heeft geen signalen
ImageRef    { type: 'picto', pictoId } | { type: 'photo', photoId }
Photo       { id, blob (schets, max 1024 px, webp of jpeg), createdAt }
```

- De schemaversie staat niet in het plan zelf: de database houdt die bij (Dexie, `src/storage/db.ts`).
- `order` is uniek over alle tegels. Een lijst (bijv. de oranje signalen) is gesorteerd op `order`.
- Een tegel en zijn foto worden altijd samen opgeslagen en samen verwijderd.

## 8. Platform

- Web-app (PWA), op het beginscherm gezet, op iPhone (Safari) en Android (Chrome) (D-001, D-016).
- Werkt offline. Alleen staand.
- Nederlands, eenvoudige taal (D-015).

## 9. Niet in v1

Zie `docs/BACKLOG.md`: o.a. voorlezen, bellen vanuit de app, herinneringen, geschiedenis, meerdere cliënten,
export, App Store-versie.
