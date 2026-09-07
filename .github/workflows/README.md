# Validate here, trigger the Cloudflare build

`showcase.yml` runs `node scripts/build.mjs`, saves the `dist` artifact, and on
production pushes calls the project-scoped `CLOUDFLARE_DEPLOY_HOOK` secret.
Cloudflare fetches master, runs the same command and publishes `dist`. A missing
secret is an error. Pull requests validate only and never trigger production.

September 2026: the existing source connection could clone and build the
repository but did not receive pushes, even after repairing an empty build-watch
list. The explicit hook provides the automatic publishing path. Verify the live
deployment; successful validation or hook acceptance alone does not prove it.

Cloudflare Pages builds this repository itself: the `portfolio` project is
connected to `mhamidjamil/portfolio` on `master`. The validated workflow triggers
that build through the hook and `portfolio.innovorix.com` follows after it passes.

There used to be a "Deploy to Cloudflare Pages" workflow here. It checked for
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`, and when they were missing
it printed a warning and **exited successfully**. The tick on GitHub stayed
green while nothing was ever published, which is worse than having no workflow
at all: it looks like a deploy and is not one. It was removed on 26 August 2026,
when the project was connected to git instead.

GitHub Pages also builds this repository, at
`https://mhamidjamil.github.io/portfolio/`. That is a second copy, not the one
the custom domain serves.
