# ForwardX CMS

De content-editor van ForwardX voor klantwebsites. Klanten en collega's passen teksten, afbeeldingen en pagina's aan in een rustige interface; elke wijziging wordt als commit opgeslagen in de GitHub-repository van de site.

ForwardX CMS is gebaseerd op [Pages CMS](https://github.com/pages-cms/pages-cms) 2.1.8 (MIT-licentie, zie `LICENSE`) en heeft dezelfde functies. De configuratie per site staat in `.pages.yml`; de [documentatie van Pages CMS](https://pagescms.org/docs) geldt daarvoor onverkort.

Wat ForwardX heeft toegevoegd:

- ForwardX-branding: naam, logo, kleuren, e-mails en commitberichten.
- Previewlinks: vanuit elke entry direct naar de bijbehorende pagina op de live site of de preview-deploy van de branch.

## Previewlinks

Zet in de `.pages.yml` van de site een `preview`-blok. De knop **Preview** verschijnt dan in de editor van elke entry.

```yaml
preview:
  # Elke branch: {branch} wordt de branchnaam in kleine letters met streepjes,
  # zoals Vercel en Netlify die in hun branch-URL's gebruiken.
  url: https://klantsite-git-{branch}-forwardx.vercel.app
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
- Het zijpaneel werkt alleen als de site in een iframe geladen mag worden. Staat Vercel Deployment Protection aan of stuurt de site een `X-Frame-Options`-header, gebruik dan `mode: tab`.

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
