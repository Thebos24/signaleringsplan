# Risico's

Bekende risico's en valkuilen, met wat we eraan doen. Nieuwe risico's onderaan.

| ID | Risico | Kans / impact | Maatregel | Status |
| --- | --- | --- | --- | --- |
| R-001 | iOS Safari wist gegevens van websites die je een tijd niet gebruikt. Voor web-apps op het beginscherm geldt dat niet, maar wel als de cliënt de app alleen in Safari opent | Middel / hoog | App alleen gebruiken vanaf het beginscherm (uitleg T-5.4); `navigator.storage.persist()`; op het startscherm in Safari een melding "Zet me op je beginscherm"; proefscherm toont het antwoord van `persist()` en of de app vanaf het beginscherm draait (T-0.4); uitkomst op de iPhone in T-0.5 | Open |
| R-002 | Cliënt verwijdert de app, wist Safari-gegevens of krijgt een nieuwe telefoon: plan weg | Middel / middel | Geaccepteerd: plan staat in Medicore (D-003) | Geaccepteerd |
| R-003 | Camera werkt anders in een web-app op het beginscherm (iOS) | Laag / middel | `<input type="file" accept="image/*" capture>` in plaats van een eigen camerascherm; zit in de proef (T-0.4); uitkomst op de iPhone in T-0.5 | Open |
| R-004 | Schetsfilter ziet er slecht uit bij donkere of drukke foto's | Middel / middel | Afstemmen met veel testfoto's in T-2.5; voorbeeld met "Opnieuw"; contrast automatisch rekken | Open |
| R-005 | Cliënt komt per ongeluk in de invulmodus en wijzigt het plan | Laag / middel | 3 seconden indrukken (D-006); verwijderen altijd met bevestiging | Open |
| R-006 | Gevoelige gegevens lekken via een externe aanvraag (font, CDN, analytics) | Laag / hoog | Geen enkele netwerkaanvraag na laden (D-002); check in T-5.1 met de netwerkweergave van de browser | Open |
| R-007 | Iemand vertrouwt bij rood te veel op de app | Laag / hoog | Rode actie is standaard "naar je begeleider" (D-008); eventueel 112-regel (Q-005); uitlegpagina noemt dat de app een hulpmiddel is | Open |
| R-008 | Na een update blijft een oude versie hangen, of de update wist iets | Middel / hoog | Updatebeleid van de service worker en migratietest in T-5.5 | Open |
| R-009 | Foto's van de iPhone (HEIC) of een verkeerde orientatie | Middel / laag | Via canvas omzetten met `createImageBitmap` (zet de foto rechtop; zit al in de proef van T-0.4); orientatie testen in T-0.5 en T-2.4 | Open |
| R-010 | Datamodel moet veranderen terwijl er al echte plannen zijn | Middel / hoog | Geversioneerd Dexie-schema vanaf dag één; migraties met tests; overleg vanaf Checkpoint 3 | Open |
| R-011 | Opslagruimte vol door veel foto's | Laag / laag | Max. 1024 px schets, ±100 KB per foto; max. aantal tegels (Q-004) | Open |
| R-012 | Kwetsbaarheden in bouwgereedschap (nu: `glob`/`minimatch` via `workbox-build`, "moderate") | Laag / laag | Draait alleen bij het bouwen, niet op de telefoon. Bij elke fase `npm audit` bekijken en bijwerken zodra `vite-plugin-pwa` een versie zonder deze meldingen heeft (D-022) | Open |
