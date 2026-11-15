# Upstream: Pages CMS

ForwardX CMS is gebaseerd op [pages-cms/pages-cms](https://github.com/pages-cms/pages-cms). Dit bestand houdt bij tot welke versie de upstream-wijzigingen zijn verwerkt. Een wekelijkse geplande taak vergelijkt deze stand met de nieuwste upstream en stelt nuttige wijzigingen voor.

| | |
| --- | --- |
| Laatst verwerkte versie | 2.1.8 |
| Laatst verwerkte commit | `6f4e860a35d934406580287e7042e5e111e207a1` |
| Bijgewerkt op | 2026-11-15 |

## Wat ForwardX afwijkend heeft

Houd deze onderdelen intact bij het overnemen van upstream-wijzigingen:

- Branding: naam "ForwardX CMS", `components/logo.tsx`, kleuren in `app/globals.css`, `app/icon.svg`, afbeeldingen in `public/images/`.
- Previewlinks: `lib/preview.ts`, `components/entry/entry-preview.tsx`, `preview` in `lib/config-schema.ts`.
- Vertaling: `lib/i18n/` en de `t()`-aanroepen in klantschermen en API-routes. Nieuwe zichtbare teksten uit upstream krijgen ook een `t()` en een Nederlandse vertaling.
- Klantweergave: afschermen van GitHub en branches voor gebruikers zonder GitHub-account.
- Uitleg: `app/uitleg/`, `components/help/`, `lib/help.ts`.
- `templates/`, `README.md` en dit bestand.

## Overgeslagen upstream-wijzigingen

Nog geen.
