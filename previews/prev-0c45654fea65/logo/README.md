# factory-kit brand assets

Approved direction: a geometric F / gated-workflow mark, existing cream/ink/green palette, lowercase `factory-kit`, IBM Plex Mono Medium 500. This package is a scratch-only design deliverable. It does not change the website, controller, GitHub, release status or installation availability. The research brief predates approval; the user's subsequent approval is the generation authority.

## Rationale

A stable spine and two horizontal rails provide an immediately legible F. The detached bottom stage evokes inspectable work. The green top-right approval gate is separated by a six-unit gap from the upper rail: workflow progress does not silently grant merge authority. The separation survives monochrome reproduction. This is a brand abstraction, not a state-machine diagram or assurance of security certification.

Cream, near-black and restrained green preserve the existing engineering-led editorial identity. No neon, gradients, raster images or ornamental automation motifs are introduced.

## Exact palette

| Role | Hex |
|---|---|
| Paper / primary background | `#f6f4ef` |
| Ink / mark and wordmark | `#14171a` |
| Signal / approval gate | `#0f7b4f` |
| Muted / secondary copy | `#5b6168` |
| Rule / borders | `#dad6cc` |
| White / inverse and card surface | `#ffffff` |

## Canonical geometry (unchanged)

The original `logo-mark.svg` is never written by the generator. SHA-256: `2ffb94aff1f92b3fe5954aa993ae6d2ac232eb4ff3c6832ac49494aa5b02a262`.

```svg
<path id="workflow" d="M8 8H42V20H20V30H36V42H20V56H8Z" fill="#14171a" />
<path id="stage" d="M28 50H40V56H28Z" fill="#14171a" />
<path id="approval-gate" d="M48 8H60V20H48Z" fill="#0f7b4f" />
```

All full-size marks have `g#mark` with exactly these three direct child paths and unchanged IDs/d strings. Full/white/black use `translate(4 4)` and identical wordmark geometry and layout. Only paint values differ in the monochrome files, which have transparent backgrounds and no opacity changes. White is entirely `#ffffff`; black is entirely `#14171a`.

The square icon uses cream with corner radius 80 and `translate(52 64) scale(6)`. The occupied source bounds, x=8..60 / y=8..56, become x=100..412 / y=112..400, centered at (256,256). This centers the actual asymmetric artwork rather than its nominal 64-unit canvas.

The favicon retains only workflow and approval-gate inside `scale(.25)`, keeping the original d strings. At 16px, the approval square is 3px and the gap is 1.5px. The tiny detached bottom stage is deliberately removed. Its workflow paint becomes cream under `prefers-color-scheme: dark`; the gate stays green. Embed as an external favicon or image to retain its isolated IDs and media query. Avoid placing the canonical ink mark directly on ink.

## Typography and provenance

- Literal name: `factory-kit` (lowercase; hyphen retained).
- Actual font: **IBM Plex Mono Medium**, normal, weight **500**.
- Source: `@fontsource/ibm-plex-mono` **5.3.0**, existing self-hosted website dependency.
- Source file: `/Users/montimage/buildspace/luongnv89/factory-kit-website/node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2`
- WOFF2 SHA-256: `01d285447409c8a588692162439a038b8cbd7871309ee20267b0d2d91c6e8e22`.
- SVG outlines generated from the actual glyphs using fontTools `SVGPathPen` and `TransformPen`, not traced from a raster or substituted system font.
- Uniform 32-unit nominal font size, tracking **−0.04em** (−1.28 units between glyph advances). No letter distortion or synthetic weight. Glyph curves rounded to at most two decimals.
- Full lockup wordmark transform: `translate(86 44.78)`. Actual outlined bounds at baseline zero: `[2.176, -23.968, 196.096, 6.4]`. The vertical center of the lettering is aligned with the mark center at y=36.
- Wordmark-only reuses exactly the same outline path with `translate(10.69 27.03) scale(0.8)`. It is scaled uniformly, not re-typeset.
- Standalone SVGs include accessible title/description and font provenance metadata; there is no live SVG text or runtime font dependency. Canonical title/description remain untouched.
- HTML embeds the unmodified Mono 500 Latin WOFF2 and IBM Plex Sans Regular 400 Latin WOFF2 from existing website dependencies. No font CDN, JavaScript, analytics or raster embeds.

Font software copyright: **IBM Plex Mono: Copyright 2017 IBM Corp.; IBM Plex Sans: Copyright 2019 IBM Corp. All rights reserved.** Licensed under the **SIL Open Font License, Version 1.1**. Full original notices and license texts: `OFL-ibm-plex-mono.txt` and `OFL-ibm-plex-sans.txt`. Outlined logo documents are not font software; embedded font software remains under OFL. This is an attribution, not IBM endorsement.

## Inventory and use

| File | viewBox | Recommended surface |
|---|---|---|
| `logo-mark.svg` | `0 0 64 64` | Paper / white |
| `logo-full.svg` | `0 0 320 72` | Paper / white |
| `logo-wordmark.svg` | `0 0 180 40` | Paper / white |
| `logo-icon.svg` | `0 0 512 512` | Self-contained cream tile |
| `favicon.svg` | `0 0 16 16` | Light and dark system themes |
| `logo-white.svg` | `0 0 320 72` | Ink / dark |
| `logo-black.svg` | `0 0 320 72` | Paper / white |

`brand-showcase.html` is an offline, responsive, no-JavaScript reference with relative SVG images and embedded fonts. Open it directly in a browser. It includes the concept, all seven variants, palette, typography, Tailwind v4 `@theme` CSS tokens and an inventory. Keep it beside the SVG files. The website integration is deliberately deferred.

## Reproduce and verify

From package root:

```sh
python3 -m unittest discover -s tests -v
uv run --with fonttools --with brotli --with pillow python scripts/generate.py
python3 scripts/verify-assets.py
node scripts/verify-showcase.cjs
```

`rsvg-convert` must already be installed. The generator renders all seven SVGs plus native light/dark favicons, a dark full lockup, and a 1600×1160 PNG contact sheet in `renders/`. It verifies that canonical bytes are unchanged. The librsvg dark-theme render uses an explicit `#workflow` stylesheet override because its CLI does not expose a preferred color-scheme switch; this accurately previews the dark CSS paint but is not a browser media-query test.

Review `renders/contact-sheet.png`, including both the actual 16px favicon and its nearest-neighbor enlargement. Original tests are kept intact. The Playwright Chromium check opens the actual offline HTML with JavaScript disabled at 375, 768 and 1280px, checks all images and embedded fonts, no horizontal overflow, visible keyboard focus, and real favicon media-query paint in light and dark themes. Browser screenshots are saved alongside the librsvg outputs. This local verifier uses the already-installed Playwright module from the Hermes runtime, not a website dependency. Additional reports at package root: `verification.json`, `asset-verification.json`, `browser-verification.json`.
