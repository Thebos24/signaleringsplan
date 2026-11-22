---
description: Sluit een werksessie aan de Signaleringsplan-app af: werk het dossier bij en commit
---
Sluit de werksessie af volgens "Einde van elke sessie" in CLAUDE.md, ook als de taak nog niet af is:

1. Draai `npm test` en `npm run lint` (zodra die bestaan). Faalt er iets? Meld dat en zet het in het sessielog.
2. Vink afgeronde taken af in `docs/TASKS.md`, met de datum van vandaag. Zet nieuw ontdekte taken in de juiste fase,
   met een `⚙`-tag. Werk de regel "Huidige fase" bovenaan bij.
3. Voeg bovenaan `docs/SESSION_LOG.md` een item toe volgens het sjabloon. Noem welk model en welke effort deze
   sessie gebruikte en of dat bij de tag paste.
4. Leg elke beslissing van deze sessie vast in `docs/DECISIONS.md`, met waarom en de afgewezen alternatieven.
5. Nieuwe risico's in `docs/RISKS.md`, nieuwe vragen in `docs/OPEN_QUESTIONS.md`, nieuwe ideeën in `docs/BACKLOG.md`.
6. Commit met een duidelijk bericht dat de taak-ID's noemt, en push naar GitHub (zodra git en de repo er zijn).
7. Geef Sander een korte samenvatting: wat er af is, wat hij kan uitproberen (precieze stappen) en wat de volgende
   taak is, inclusief de `⚙`-tag, zodat hij het juiste model kan kiezen voor de volgende sessie.

$ARGUMENTS
