# factory-kit-website

The landing page for factory-kit — built by factory-kit itself. Every
section of the page is delivered through the factory-kit pipeline:
a labelled GitHub issue, a Hermes implementation worker, an independent
review session, CI on the exact head, a preview, and a human approval.

## Develop

```sh
npm install
npm run dev
```

## Verify

```sh
npm ci && npm run format:check && npm run lint && npm run typecheck && npm test && npm run build
```

Content and design live in [docs/brief.md](docs/brief.md); working
conventions for agents live in [AGENTS.md](AGENTS.md).
