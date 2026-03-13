# Pistaha Portfolio (Hugo + Blowfish)

A clean, student portfolio site built with Hugo and the Blowfish theme. The site is designed for GitHub Pages deployment at:

https://pistaha.github.io/my-portfolio/

## Tech stack
- Hugo (extended)
- Blowfish theme (git submodule)
- Markdown content

## Local development
```bash
hugo server
```

## Build
```bash
hugo
```

The generated static site is output to `public/`.

## Deployment
This repository is intended for GitHub Pages project-site hosting. The `baseURL` is set to:

```
https://pistaha.github.io/my-portfolio/
```

When deploying, ensure the output is published from the `gh-pages` branch under `Projects/client-lab2`.

## Project structure
- `config/_default/` — Hugo + Blowfish configuration
- `content/` — Pages and project entries
- `themes/blowfish/` — Blowfish theme submodule
- `static/` — Static assets (empty placeholder)

## Editing content
- Home: `content/_index.md`
- About: `content/about/index.md`
- Projects list: `content/projects/_index.md`
- Project entries: `content/projects/*.md`
- Contact: `content/contact/index.md`

## Blowfish notes
Theme defaults are copied into `config/_default/` so the site can be configured without editing the submodule. Adjust typography, colors, and layouts in `config/_default/params.toml`.

## Contact/CRM-ready section
The contact page is static-safe. Replace the placeholder section with an embed from a provider like Formspree, Basin, or your CRM as needed.
