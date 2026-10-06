# AGENTS.md

This repository is the dogfood target for
[factory-kit](https://github.com/luongnv89/factory-kit): the landing
page is built by factory-kit itself. Every user-facing change arrives
as a GitHub issue labelled `factory-kit`, is implemented and
independently reviewed by Hermes workers, verified by CI, previewed,
approved by a human, then squash-merged.

## Stack

- Astro (static, zero client-side JavaScript)
- Tailwind CSS v4 via `@tailwindcss/vite`
- TypeScript strict (`astro/tsconfigs/strict`), `@astrojs/check`
- Vitest via `getViteConfig` from `astro/config`, rendering with
  Astro's Container API (`experimental_AstroContainer`)
- Prettier + prettier-plugin-astro; ESLint flat config +
  eslint-plugin-astro + typescript-eslint
- Fonts: IBM Plex Sans + IBM Plex Mono via `@fontsource` packages

## Acceptance command

```sh
npm ci && npm run format:check && npm run lint && npm run typecheck && npm test && npm run build
```

This must pass before you finish. Node 24 (see `.nvmrc`).

## Layout

- `docs/brief.md` — the single source of truth for content and design
- `src/layouts/Base.astro` — the only layout (smoke meta tag lives here)
- `src/pages/index.astro` — composes the section components
- `src/components/sections/` — one component per brief section
- `src/styles/global.css` — palette custom properties + Tailwind theme
  tokens + focus-visible styles
- `tests/` — one vitest file per section

## Conventions

- Copy comes **verbatim** from `docs/brief.md` — same words, same
  punctuation; no em dashes, exclamation marks or emoji.
- One component per section in `src/components/sections/`, composed in
  `index.astro` in the brief's order.
- Zero client-side JavaScript. No islands.
- Use the theme tokens (`bg-paper`, `text-ink`, `text-muted`,
  `border-rule`, `bg-signal`, `text-amber`, `bg-card`, `font-mono`),
  never raw hex.
- Never remove the `factory-kit-smoke` meta tag from the base layout.
- One vitest test per section in `tests/`.
- No new dependencies unless the issue you are working on requires
  them.
- Never add `.github/dependabot.yml`, `renovate.json`, `.mergify.yml`
  or `.kodiak.toml` — factory-kit treats them as competing automation.
- Build every internal URL (assets, favicon, og image, links to site
  pages) from `import.meta.env.BASE_URL`; never hardcode a leading `/`.
  Absolute social-card URLs use
  `new URL(import.meta.env.BASE_URL + 'og.png', Astro.site)`. The site
  is served at /factory-kit-website/ and previews at
  /factory-kit-website/previews/<id>/.
- Agents commit on their assigned branch and never push or open pull
  requests — the factory publishes.
