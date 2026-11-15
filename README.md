# ForwardX CMS

De content-editor van ForwardX voor klantwebsites. Klanten en collega's passen teksten, afbeeldingen en pagina's aan in een rustige interface; elke wijziging wordt als commit opgeslagen in de GitHub-repository van de site.

ForwardX CMS is gebaseerd op [Pages CMS](https://github.com/pages-cms/pages-cms) 2.1.8 (MIT-licentie, zie `LICENSE`) en heeft dezelfde functies. De configuratie per site staat in `.pages.yml`; de [documentatie van Pages CMS](https://pagescms.org/docs) geldt daarvoor onverkort.

Wat ForwardX heeft toegevoegd:

- ForwardX-branding: naam, logo, kleuren, e-mails en commitberichten.
- Previewlinks: vanuit elke entry direct naar de bijbehorende pagina op de live site of de preview-deploy van de branch.
- Nederlandse interface voor alles wat een klant ziet: inloggen, e-mails, menu, overzichten, de editor, media en meldingen.
- Klantweergave: wie per e-mail is uitgenodigd en geen GitHub-account heeft, ziet geen branches, GitHub-links of beheerschermen.
- Na het opslaan meldt de editor dat de wijziging binnen een paar minuten online staat, met een knop naar de pagina.
- Startconfiguratie voor kapsalonsites in `templates/kapsalon.pages.yml`.

## Klanten laten werken

1. Zet een `.pages.yml` in de repository van de klantsite. Voor kapsalons: kopieer `templates/kapsalon.pages.yml` en pas de URL's aan.
2. Open de site in het CMS en nodig de klant uit onder **Gebruikers** met een e-mailadres.
3. De klant logt in met een code per e-mail. Een GitHub-account is niet nodig.

Geef velden in `.pages.yml` altijd een `label` in gewone taal en waar nodig een `description` met een voorbeeld: dat is wat de klant ziet.

## Taal

De interface is standaard Nederlands. De vertalingen staan in `lib/i18n/nl/`; teksten zonder vertaling blijven Engels. De beheerschermen voor ontwikkelaars (configuratie, cache, acties) zijn Engels gebleven. Zet `NEXT_PUBLIC_APP_LOCALE=en` voor een volledig Engelse interface.

## Previewlinks

Zet in de `.pages.yml` van de site een `preview`-blok. De knop **Preview** verschijnt dan in de editor van elke entry.

```yaml
preview:
  # Elke branch: {branch} wordt de branchnaam in kleine letters met streepjes,
  # zoals Netlify en Vercel die in hun branch-URL's gebruiken.
  # Netlify: https://{branch}--sitenaam.netlify.app
  # Vercel:  https://project-git-{branch}-team.vercel.app
  url: https://{branch}--klantsite.netlify.app
  # De standaardbranch (meestal main) gaat naar de live site.
  production: https://www.klantsite.nl
  # Optioneel: vaste URL voor een specifieke branch.
  branches:
    staging: https://staging.klantsite.nl
  # tab (standaard) opent een nieuw tabblad, panel opent een zijpaneel in het CMS.
  mode: tab

content:
  - name: blog
    label: Blog
    type: collection
    path: src/blog
    preview: /blog/{slug}/
  - name: home
    label: Homepagina
    type: file
    path: src/_data/home.json
    preview: /
```

Korte vorm als er maar één URL is: `preview: https://www.klantsite.nl`.

| Plek | Token | Betekenis |
| --- | --- | --- |
| `preview.url` e.d. | `{branch}` | Branchnaam als URL-deel (`feature/Nieuwe_Home` wordt `feature-nieuwe-home`) |
| | `{branch_raw}`, `{owner}`, `{repo}` | Ongewijzigde branchnaam, eigenaar en repository |
| `content[].preview` | `{slug}` | Bestandsnaam zonder extensie |
| | `{filename}`, `{path}` | Bestandsnaam met extensie, volledig pad in de repository |
| | `{dir}` | Submap binnen de collectie |
| | `{fields.titel}` of `{titel}` | Waarde van een veld uit de entry |

Zonder `preview` op een content-item opent de knop de homepagina van de site. Met `preview: false` verdwijnt de knop voor dat item.

Goed om te weten:

- De preview toont de laatst opgeslagen versie, zodra de site klaar is met deployen. Niet-opgeslagen wijzigingen zijn er nog niet in te zien; de editor meldt dat.
- Vercel kort lange branch-URL's in en voegt er een hash aan toe. Gebruik voor zulke branches `preview.branches`.
- Het zijpaneel werkt alleen als de site in een iframe geladen mag worden. Stuurt de site een `X-Frame-Options`-header of staat er wachtwoordbeveiliging op de preview, gebruik dan `mode: tab`.
- Netlify bouwt alleen previews voor branches als branch-deploys aanstaan in de site-instellingen.

## Lokaal draaien

Nodig: Node.js, PostgreSQL en een GitHub App.

```bash
npm install
cp .env.local.example .env.local   # vul de waarden in
npm run setup:github-app           # maakt de GitHub App aan en vult .env.local
npm run db:migrate
npm run dev
```

Zie de [installatiegids van Pages CMS](https://pagescms.org/docs/guides/installing/) voor de details van de GitHub App en alle omgevingsvariabelen. Zet in productie `BASE_URL` op het vaste adres van het CMS.
