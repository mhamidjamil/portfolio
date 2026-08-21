# M Hamid Jamil - Portfolio

Live at [mhamidjamil.github.io/portfolio](https://mhamidjamil.github.io/portfolio/).

Personal portfolio of an IoT engineer and full-stack developer: school platforms,
storefronts, mobile apps, and ESP32 firmware. Twelve projects in three shelves
(web platforms, mobile apps, IoT and hardware), each linked to the live product
or its source repository.

## Deploys

Pushing to `master` publishes to Cloudflare Pages through
`.github/workflows/deploy-pages.yml`. It needs two repository secrets:
`CLOUDFLARE_API_TOKEN` (with **Cloudflare Pages: Edit**) and
`CLOUDFLARE_ACCOUNT_ID`. Set the repository variable `CLOUDFLARE_PAGES_PROJECT`
to target a differently named project. Live at
[portfolio.innovorix.com](https://portfolio.innovorix.com).

Built on the MIT-licensed [vCard template](https://github.com/codewithsadee/vcard-personal-portfolio)
by codewithsadee: plain HTML, CSS, and JavaScript, no build step.

## Demo

![vCard Desktop Demo](./website-demo-image/desktop.png "Desktop Demo")
![vCard Mobile Demo](./website-demo-image/mobile.png "Mobile Demo")

## Prerequisites

Before you begin, ensure you have met the following requirements:

* [Git](https://git-scm.com/downloads "Download Git") must be installed on your operating system.

## Installing vCard

To install **vCard**, follow these steps:

Linux and macOS:

```bash
sudo git clone https://github.com/codewithsadee/vcard-personal-portfolio.git
```

Windows:

```bash
git clone https://github.com/codewithsadee/vcard-personal-portfolio.git
```

## Contact

If you want to contact me you can reach me at [Twitter](https://www.x.com/codewithsadee_).

## License

MIT
