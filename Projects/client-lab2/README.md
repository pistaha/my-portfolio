# Pistaha Portfolio (Hugo + Blowfish)

A clean, student portfolio site built with Hugo and the Blowfish theme. The site is designed for GitHub Pages deployment at:

https://pistaha.github.io/my-portfolio/

## Tech stack
- Hugo (extended)
- Blowfish theme (git submodule)
- Markdown content

## Local development
```bash
hugo server -s Projects/client-lab2
```

## Build
```bash
hugo -s Projects/client-lab2
```

The generated static site is output to `Projects/client-lab2/public/`.

## Deployment
This repository is intended for GitHub Pages project-site hosting. The `baseURL` is set to:

```
https://pistaha.github.io/my-portfolio/
```

Deployment builds the Hugo source in `Projects/client-lab2` and publishes the generated output to the root of `gh-pages` so GitHub Pages serves it directly.

## Project structure
- `Projects/client-lab2/config/_default/` — Hugo + Blowfish configuration
- `Projects/client-lab2/content/` — Pages and portfolio entries
- `Projects/client-lab2/themes/blowfish/` — Blowfish theme submodule
- `Projects/client-lab2/static/` — Static assets (empty placeholder)

## Editing content
- Home: `Projects/client-lab2/content/_index.md`
- About: `Projects/client-lab2/content/about/index.md`
- Portfolio list: `Projects/client-lab2/content/portfolio/_index.md`
- Portfolio entries: `Projects/client-lab2/content/portfolio/*.md`
- Contact: `Projects/client-lab2/content/contact/index.md`

## Blowfish notes
Theme defaults are copied into `Projects/client-lab2/config/_default/` so the site can be configured without editing the submodule. Adjust typography, colors, and layouts in `Projects/client-lab2/config/_default/params.toml`.

## Contact/CRM-ready section
The contact page is static-safe. Replace the placeholder section with an embed from a provider like Formspree, Basin, or your CRM as needed.
