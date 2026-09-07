# Portfolio maintenance

Read Hamid's shared working rules and project learnings before changes when
available at `~/.claude/knowledge/`. The Obsidian vault is at
`/home/megatron/Desktop/projects/obsidian` on his workstation.

## Single source of truth

The case studies live in `content/projects.json` in this repository. Edit that
file, not generated HTML. `node scripts/build.mjs` validates the catalogue and
builds the gallery, every `about-*` page and deployment files into `dist/`.
There are no package dependencies. The original personal page is `index.html`.

When a showcased project ships a material feature, update its entry in the same
work session: summary, features, engineering, stack and `reviewed` date as
needed. Inspect the project's current source and recorded decisions first.
Cross-link related entries by slug. Add a new entry only when evidence exists.
Do not claim that merely keeping pages in this repository updates them from
other repositories automatically. Agents must perform the content update.

## Public copy

- Innovorix is the current name of Academia; use `https://innovorix.com`.
- Spotwire is the current name of TextGate. It includes arrivals, timelines,
  linked accounts and workspaces, not just manual SMS sending.
- Google Play identifiers: `com.spotwire.app` and `com.paksehat.app`.
- Spotwire uses Hamid's shared gateway. Users need no hardware. SMS reaches
  Pakistani numbers; WhatsApp and in-app notifications serve other countries.
- The Baileys gateway is Hamid's application built on the upstream library.
  Never imply he authored the library or that it is an official Meta service.
- Do not invent customer counts, revenue, performance results or certifications.
- Do not publish private source links, operational endpoints, credentials,
  customer data or internal infrastructure from the notes.
- Keep useful text visible without images or JavaScript. No remotely rendered
  statistics cards. Use existing artwork and working links.

## Delivery

Cloudflare Pages project `portfolio` builds `master` with
`node scripts/build.mjs`, output `dist`, at `portfolio.innovorix.com`.
GitHub Actions runs the same validation and stores a build artifact; Cloudflare
performs deployment through its existing GitHub integration. No token-based
second deploy workflow. A successful validation job alone is not a deploy.
After an authorised push, check Cloudflare's deployment and the live pages.

Review at desktop and 390px widths, including search, category filtering,
keyboard navigation and project links. Bump `version.json` once per batch.
The public GitHub profile is a separate repository, `mhamidjamil/mhamidjamil`;
keep its featured-project links aligned with these canonical case-study URLs.
