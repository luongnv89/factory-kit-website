# factory-kit landing page: content and design brief

This file is the single source of truth for the landing page. Every
section issue implements one part of it. Copy in quoted blocks is final:
use it verbatim (same words, same punctuation). Do not add em dashes,
exclamation marks or emoji anywhere on the page.

## 0. Facts the page may state

- factory-kit 0.1.0 is an internal preview. It is not publicly
  installable yet, and the GitHub repository for the kit is private.
- It runs on the operator's own machine through Hermes Agent (Kanban
  profile workers) and reuses IDD skills (`issue-resolver`,
  `issue-pr-review`), GitHub checks and branch protection, GitHub Pages
  or Vercel previews and Telegram.
- Default limits: one active issue, two implementation attempts
  (initial plus one fix), 60 active worker minutes per issue, 24 wall
  hours.
- Approvals bind one head commit, one base commit and one preview, and
  expire after 60 minutes.
- Never invent users, metrics, testimonials or release dates.

## 1. Page order

1. Header (wordmark + in-page nav)
2. Hero
3. Problem
4. Cost of the status quo
5. How it works
6. What you get (solution)
7. Boundaries
8. Built on
9. Where it stands (status + dogfood proof)
10. FAQ
11. Footer

Each section is its own component in `src/components/sections/`
(`Header.astro`, `Hero.astro`, `Problem.astro`, `Cost.astro`,
`HowItWorks.astro`, `Solution.astro`, `Boundaries.astro`,
`BuiltOn.astro`, `Status.astro`, `Faq.astro`, `Footer.astro`) and is
composed in `src/pages/index.astro` in this order. Section elements
carry the ids used by the nav: `#how-it-works`, `#boundaries`,
`#status`, `#faq`.

## 2. Header

Brand identity: use the approved geometric factory-kit workflow mark
from `public/logo/logo-mark.svg` next to the live lowercase `factory-kit`
text set in IBM Plex Mono Medium 500. The text remains the accessible
home-link name; the decorative mark has empty alternative text. Nav links (anchors):
"How it works" (#how-it-works), "Boundaries" (#boundaries), "Status"
(#status), "FAQ" (#faq). On screens narrower than 640px the nav links
wrap below the wordmark; no hamburger menu, no JavaScript.

## 3. Hero

Status badge (small pill above the headline):

> Internal preview · v0.1.0 · not yet installable

Headline (the page's only `h1`):

> Agents implement the issue. You approve the verified revision.

Subheadline:

> factory-kit runs opted-in GitHub issues through your local Hermes agents, an independent review, your CI and a live preview. Then it asks you to approve one exact commit, and it merges only that commit.

Primary CTA button: "Follow the build on GitHub" linking to
`https://github.com/luongnv89`.

Secondary CTA (text link style): "See how this site was built" linking to
`https://github.com/luongnv89/factory-kit-website/pulls?q=is%3Apr+is%3Amerged`.

Hero visual: a static "approval card" mock built in HTML/CSS, styled like
a terminal/Telegram card, to the right of the copy on wide screens and
below it on narrow screens. Fields, in this order:

| Label | Value |
|---|---|
| Repository | `luongnv89/factory-kit-website` |
| Pull request | `#3 · Add the how-it-works pipeline` |
| Head | `9f2c4e1` |
| Base | `main @ 41d07aa` |
| Review | `approved · independent session` |
| Checks | `Code Quality & Build ✓` and `Security Scan ✓` |
| Preview | `smoke 200 · 2 min ago` |
| Merge | `squash · expected head 9f2c4e1` |
| Expires | `in 58 min` |

Below the fields: two non-interactive buttons rendered as `<span>`
elements (not links, not buttons): "Approve" and "Reject". Add a small
caption under the card: "Illustrative approval request". The card must
be `aria-hidden="false"` with a visually hidden heading "Example
approval request" so screen readers understand it.

## 4. Problem

Section heading:

> You still check every agent PR by hand

Lead paragraph:

> Coding agents can draft a fix in minutes. Then you spend the rest of the hour working out what actually ran.

Three scenario cards:

1. > The agent says the tests pass. You can't tell which commit it tested, or whether CI agrees.
2. > A session dies halfway. You restart it and find a duplicate branch and a second PR.
3. > You approved a change this morning. Someone pushed after that, and your approval still looks valid.

## 5. Cost of the status quo

Section heading:

> The cleanup lands on you

Three consequence rows (title in bold, sentence after):

1. **Repeated checks.** > You re-run CI you already paid for, because the evidence never names a revision.
2. **A noisy review queue.** > PRs arrive claiming success, and each one needs a full manual audit.
3. **Risky merge rights.** > Give an agent the merge button and one bad run becomes a revert on main.

## 6. How it works

Section heading:

> Four stages, one commit, your decision

Render as a horizontal pipeline on wide screens (four connected steps)
and a vertical list on narrow screens. Each step: number, title,
description. Use a simple inline SVG icon per step (outline style, drawn
in the component; no icon fonts, no external images).

1. **Opt in.** > Label a GitHub issue `factory-kit`. It needs acceptance criteria, and nothing written in the issue can widen what the agents may do.
2. **Implement and review.** > A Hermes worker implements the issue in an isolated git worktree. A separate reviewer session checks the diff against the criteria. One fix round is allowed.
3. **Verify and preview.** > factory-kit opens a PR for the reviewed commit, waits for your required checks on that exact head, publishes a preview of it and smoke-tests the URL.
4. **Approve and merge.** > You approve that commit. factory-kit rechecks head, base, checks and preview, squash-merges with an expected-head guard, and reports the merge SHA that GitHub recorded.

CTA after the steps: "Follow the build on GitHub" (same URL as the hero
primary CTA).

## 7. What you get (solution)

Section heading:

> Evidence first, then your approval

Lead paragraph:

> factory-kit is a thin layer over tools you already run. Hermes Kanban schedules the work, IDD skills do the engineering and GitHub stays the source of truth. factory-kit adds the checks between them.

Four feature cards (title in bold, sentence after):

1. **Reviews tied to one SHA.** > A separate reviewer session records its verdict against the exact commit, and your CI has to pass on that same head.
2. **Previews of the reviewed revision.** > factory-kit publishes that exact commit as a preview on GitHub Pages or Vercel and smoke-tests the URL before it asks you anything.
3. **Approvals that expire.** > Your approval covers one head, one base and one preview for 60 minutes. A new push cancels it.
4. **Recovery without duplicates.** > Durable state and GitHub reconciliation resume work after a crash without opening a second PR.

Closing line under the cards:

> The request you approve names its head commit, the reviewer's verdict, the check runs and the preview URL. If any of them change, factory-kit asks you again.

## 8. Boundaries

Section heading (id `boundaries`):

> Boundaries you can read in the manifest

Five rows, each a short title and one sentence:

1. **Setup is a reviewed plan.** > `factory-setup plan` only reads your repository. `apply` writes the exact bytes you accepted, and nothing else.
2. **Readiness names its blockers.** > An old Hermes, a signed-out model or an unprotected main branch each stop dispatch with a named code.
3. **Merges stay human.** > Autonomous merge, production deploys and package publishing are off, and the manifest has no key that turns them on.
4. **Limits are explicit.** > One active issue, two implementation attempts and 60 worker minutes per issue, unless you change them within fixed bounds.
5. **Removal keeps your work.** > Uninstall deletes only the files factory-kit created and still owns. Your edits stay where they are.

## 9. Built on

Section heading:

> Built on tools you already trust

A row of five labelled items (text labels; no third-party logos):
"Hermes Agent" (Kanban workers), "IDD skills" (issue-resolver,
issue-pr-review), "GitHub" (checks, branch protection, Pages
previews), "Vercel" (alternative preview host), "Telegram" (status and
control). Render the parenthetical as
a muted second line.

## 10. Where it stands

Section heading (id `status`):

> Where it stands

Paragraph 1:

> factory-kit 0.1.0 is an internal preview. Its v1.0 evidence gate is still open: a few live checks must pass before a release, and there is no public install yet.

Paragraph 2:

> This page is the first real project it shipped. Each section started as a GitHub issue and went through the full pipeline: implementation, independent review, CI, a preview and a human approval.

Link: "Browse the merged pull requests" to
`https://github.com/luongnv89/factory-kit-website/pulls?q=is%3Apr+is%3Amerged`.

## 11. FAQ

Section heading (id `faq`):

> Questions

Use native `<details>`/`<summary>` elements (no JavaScript). Six items:

1. **Can I install it?** > Not yet. factory-kit is an internal preview while its v1.0 gate closes. Follow the build on GitHub to hear when that changes.
2. **Which agents does it run?** > Hermes Kanban profile workers, with the model you pin for each role. The tested setup uses openai-codex/gpt-6-luna for both implementation and review.
3. **Does it replace my CI?** > No. Your required checks and branch protection decide. factory-kit reads them and refuses to dispatch when the main branch is unprotected.
4. **Can it merge on its own?** > No. Each merge needs a human approval for one specific commit, and approvals expire after 60 minutes.
5. **What if my machine restarts mid-task?** > State lives in SQLite. On restart, factory-kit resumes, parks or quarantines each task, and checks GitHub before it repeats any remote action.
6. **Where do approvals happen?** > In Telegram from an allowlisted account, or from the local operator CLI. The merges for this site were approved from the CLI.

## 12. Footer

Left: "factory-kit · built by Luong Nguyen". Right: links "GitHub"
(`https://github.com/luongnv89`) and "Site source"
(`https://github.com/luongnv89/factory-kit-website`). Below, muted:
"© 2026 Luong Nguyen. Site code under the MIT License."

## 13. SEO and metadata

- `<title>`: "factory-kit: agents implement, you approve the verified revision"
- meta description: "factory-kit runs opted-in GitHub issues through local Hermes agents, independent review, CI and a live preview, then merges only the commit you approve. Internal preview."
- Open Graph + Twitter card tags (title, description, type `website`,
  image `og.png` 1200x630 generated as a static asset from an SVG source
  committed in `public/`). The image URL must be absolute:
  `new URL(import.meta.env.BASE_URL + "og.png", Astro.site)`.
- `public/favicon.svg` uses the approved simplified factory-kit mark,
  with a system dark-mode variant; `public/apple-touch-icon.png` is
  derived from the approved icon. Keep the full approved logo suite,
  brand showcase and OFL notices under `public/logo/`.
- The static 1200x630 social card includes the approved geometric mark
  and preserves its existing headline and status copy. `public/robots.txt`
  allows all crawlers.
- The site is served from a sub-path (`/factory-kit-website/` in
  production, `/factory-kit-website/previews/<id>/` for previews). Build
  every internal asset or page URL from `import.meta.env.BASE_URL`; never
  hardcode a leading `/`.
- `<html lang="en">`, viewport meta, theme-color meta.
- Keep `<meta name="factory-kit-smoke" content="landing">` in the base
  layout. The factory's preview smoke check looks for it; removing it
  fails every preview.

## 14. Design direction

- Mood: an engineering ledger. Calm, exact, high contrast, generous
  whitespace. Hairline rules between sections. No gradients behind
  text, no glassmorphism, no stock illustrations.
- Palette (CSS custom properties in the global stylesheet, exposed to
  Tailwind as theme tokens):
  - `--paper` #F6F4EF (page background)
  - `--ink` #14171A (text)
  - `--muted` #5B6168 (secondary text, AA on paper)
  - `--rule` #DAD6CC (borders, hairlines)
  - `--signal` #0F7B4F (verified/pass accents, primary button)
  - `--amber` #9A5B00 (pending accents)
  - `--card` #FFFFFF (cards)
- Type: IBM Plex Sans for text and IBM Plex Mono for code, SHAs, labels
  and the wordmark, self-hosted through `@fontsource` packages (no font
  CDN). Headline sizes use `clamp()` so the h1 is about 2.25rem on phones
  and 3.5rem on desktop.
- Layout: content max width 72rem, 1.5rem side padding on phones.
  Sections stack vertically; two-column layouts only from the `lg`
  breakpoint up.
- Motion: none required. If any transition is added it must respect
  `prefers-reduced-motion`.
- Accessibility: semantic landmarks (`header`, `nav`, `main`, `footer`),
  logical heading order (one h1, then h2 per section, h3 inside), visible
  `:focus-visible` outlines, WCAG AA contrast, link text that makes sense
  out of context.
- Performance: zero client-side JavaScript on the page. Astro islands
  are not needed.
