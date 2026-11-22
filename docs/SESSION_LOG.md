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

## 2026-11-22 — PWA-proef online (T-0.4)
- Waar: Claude Code (Opus 5.5; past bij de tag: ja)
- Gedaan: T-0.4. `vite-plugin-pwa` en `dexie` geïnstalleerd, manifest en tijdelijk stoplicht-icoon, service
  worker voor offline. Proefscherm: tekst en foto bewaren in IndexedDB (eigen proefdatabase), foto verkleind tot
  1024 px, antwoord van `persist()` en "vanaf beginscherm" zichtbaar. GitHub Actions publiceert naar
  https://thebos24.github.io/signaleringsplan/. In de preview gecontroleerd: tekst en foto blijven staan na herladen.
- Beslissingen: D-022 (nieuw).
- Problemen / verrassingen: `npm audit` meldt 4 "moderate" kwetsbaarheden in bouwgereedschap (R-012, niet op de telefoon).
  In de desktop-preview zegt `persist()` "nee"; dat is normaal in Chrome zonder installatie. Op de iPhone kijken.
- Daarna in dezelfde sessie: Sander deed T-0.5 op de iPhone: "beginscherm: ja", foto rechtop, alles bleef staan.
  T-0.6 vastgelegd (D-013 besloten, R-001/R-003/R-009 bijgewerkt). Checkpoint 0 gehaald. T-0.7 (Android-proef) toegevoegd.
- Volgende: T-1.1 Datamodel en opslaglaag ⚙ Opus · high. Q-007 (één plan per telefoon) moet daarvoor beantwoord zijn.

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
