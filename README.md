# M Hamid Jamil - Portfolio

[Personal portfolio](https://portfolio.innovorix.com) · [Selected work](https://portfolio.innovorix.com/work)

Web platforms, mobile applications and connected hardware. The work gallery
links to 14 case studies covering context, features, engineering and related
projects. The original personal page remains at `index.html`.

## Content and local build

Edit `content/projects.json`, then run:

```sh
node scripts/build.mjs
```

Requires Node.js 22 or newer; no package installation. The builder checks
required fields, duplicate routes, related-project references and image files.
It writes the gallery, `about-*.html` pages, sitemap and deployment assets to
`dist/`. Do not edit generated output. Read [AGENTS.md](AGENTS.md) for the
project-update workflow and public-copy requirements.

Design: `assets/css/showcase.css`. Search: `assets/js/showcase.js`.
Version: `version.json`, incremented once per batch.

## Deployment

Cloudflare Pages project **portfolio** is connected directly to this repository,
branch **master**. Its build command is `node scripts/build.mjs` and output
directory is `dist`. An authorised push triggers deployment to
[portfolio.innovorix.com](https://portfolio.innovorix.com).

GitHub Actions builds and validates the artifact, then calls the project-scoped
`CLOUDFLARE_DEPLOY_HOOK` secret for production pushes. Cloudflare fetches the
repository and performs the deployment. A missing hook fails the workflow.
Check Cloudflare's actual deployment and live routes before reporting publication.

The older GitHub Pages URL is a separate surface. Links from the original
personal page point at the Cloudflare domain for generated case studies.

## Contact form

The existing `_worker.js` handles `/api/contact` and delegates other requests to
Cloudflare static assets. The build includes it without changing its behaviour.
Configure its notification and email settings in Cloudflare environment
variables, never in public case-study content.

## Attribution

The original personal page is built on the MIT-licensed
[vCard template](https://github.com/codewithsadee/vcard-personal-portfolio)
by codewithsadee. See [LICENSE](LICENSE).
