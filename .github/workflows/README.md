# No deploy workflow here, on purpose

Cloudflare Pages builds this repository itself: the `portfolio` project is
connected to `mhamidjamil/portfolio` on `master`, so pushing is the whole
deploy and `portfolio.innovorix.com` follows within a minute.

There used to be a "Deploy to Cloudflare Pages" workflow here. It checked for
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`, and when they were missing
it printed a warning and **exited successfully**. The tick on GitHub stayed
green while nothing was ever published, which is worse than having no workflow
at all: it looks like a deploy and is not one. It was removed on 26 August 2026,
when the project was connected to git instead.

GitHub Pages also builds this repository, at
`https://mhamidjamil.github.io/portfolio/`. That is a second copy, not the one
the custom domain serves.
