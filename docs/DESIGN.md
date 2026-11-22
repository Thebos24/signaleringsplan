# Design

Uitstraling, regels voor eenvoud en design tokens. Tokens staan in code in `src/design/tokens.ts`
(en als CSS-variabelen). Hier staat het **waarom**.

## Regels voor eenvoud (gelden voor elk cliëntscherm)

1. **Eén vraag of één doel per scherm.**
2. **Plaatje eerst, tekst tweede.** Elke tegel heeft een plaatje. Tekst maximaal ±5 woorden.
3. **Grote raakvlakken**: tegels minimaal 140×140 px, knoppen minimaal 64 px hoog, ruim uit elkaar (min. 16 px).
4. **Grote letters**: tegeltekst min. 22 px, kopjes min. 28 px. Systeemfont (geen download, D-002).
5. **Hooguit 2 tegels per rij** op een telefoon. Liever scrollen dan kleine tegels.
6. **Kleur nooit alleen**: elke kleur heeft ook het woord ("Oranje") en een vast symbool, voor kleurenblinden.
   Voorstel: groen = rondje met vinkje, oranje = driehoek, rood = achthoek (stopbord-vorm). Altijd met het woord erbij.
7. **Geen verrassingen**: geen pop-ups, geluid, trillen of bewegende achtergronden. Alleen korte, rustige
   overgangen (≤200 ms) en de ring bij het lang indrukken. Respecteer `prefers-reduced-motion`.
8. **Geen negatieve woorden** of rode foutmeldingen op cliëntschermen.
9. **Taal**: je-vorm, korte zinnen, gewone woorden. "Ga wandelen", niet "Maak een ontspannende wandeling".

De invulkant (begeleider) mag gewoner zijn: kleinere letters, formulieren, lijstjes. Wel duidelijk en rustig.

## Kleuren (eerste voorstel, vastleggen in T-1.2)

| Token | Waarde | Gebruik |
| --- | --- | --- |
| `paper` | `#FBF8F2` | Achtergrond: warm, papierachtig wit (past bij de schetsstijl) |
| `ink` | `#2B2B2B` | Tekst en lijnen van pictogrammen |
| `green` | `#3E9B57` | Groen. Lichte variant `#DFF1E4` voor vlakken |
| `orange` | `#E8892B` | Oranje. Lichte variant `#FCE9D4` |
| `red` | `#D2453B` | Rood. Lichte variant `#F8DCD9` |
| `muted` | `#8A857C` | Rustige knop voor de invulmodus |

Tekst op gekleurde vlakken moet een contrast van minimaal 4.5:1 halen (WCAG AA). Controleer dat in T-1.2.

## Stijl van de plaatjes: "geschetst"

- Alles lijkt met de hand getekend: zwarte potloodlijn (`ink`), iets onregelmatig, op `paper`.
- **Pictogrammen** (D-011): eigen SVG's, getekend door Claude in één vaste stijl:
  - viewBox 0 0 100 100, lijndikte 3–4, ronde uiteinden, geen vulling of hooguit één zachte vlakkleur;
  - lichte "trilling" in de lijnen, zodat het niet strak oogt;
  - één onderwerp per pictogram, herkenbaar zonder tekst, geen kleine details;
  - mensen als simpele, neutrale figuurtjes (geen leeftijd, geslacht of huidskleur vastgelegd).
  - De stijlgids met voorbeelden komt in T-4.1.
- **Foto's** (D-010): de app zet een foto om naar een schets (zwart-wit potlood-effect), zodat eigen foto's
  ("mijn begeleider", "mijn bankje") passen bij de pictogrammen. Gebeurt helemaal op de telefoon.

## Vaste schermen

- **Startscherm**: "Hoi [naam], wat merk je?" + signaaltegels + tegel "Het gaat goed" + knop "Klaar".
  Klein, rustig knopje rechtsboven voor de invulmodus (lang indrukken).
- **Resultaat**: kleur (vlak + woord + symbool) + actietegels + knop "Terug".
- **Rood**: één extra grote tegel bovenaan ("Ik ga naar mijn begeleider").

## Designbeslissingen

Grote keuzes staan ook in `DECISIONS.md`. Kleine stijlkeuzes noteer je hier, met datum.

- 2026-11-22 (Sander, na Checkpoint 1): Tegels mogen **schermbreed** zijn (één per rij), en het scherm mag
  **scrollen**. Op het resultaatscherm (T-3.2) neemt de kleur, het "stoplicht", **nagenoeg het hele scherm** in.
  Het woord en het symbool blijven erbij (regel 6). Past bij regel 5 (hooguit 2 per rij). Bij T-3.1 en T-3.2 de
  breedte per scherm kiezen; de `Tile` krijgt dan een schermbrede variant. Heeft invloed op Q-001.
- 2026-11-22 (Sander): De stijl van de pictogrammen is losse, onregelmatige potloodlijn met een beetje arcering
  (zoals zijn voorbeeld met kladdetekeningen). Niet te druk of te gedetailleerd. Uitwerken in T-4.1.
