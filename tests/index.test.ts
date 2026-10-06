import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";

import Index from "../src/pages/index.astro";

const createContainer = () =>
  AstroContainer.create({
    astroConfig: { site: "https://luongnv.com", base: "/factory-kit-website/" },
  });

describe("index page", () => {
  it("renders the factory-kit smoke meta tag", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Index);
    expect(html).toContain('<meta name="factory-kit-smoke" content="landing"');
  });

  it("renders the SEO metadata and absolute social image URL", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Index);

    expect(html).toContain(
      "factory-kit: agents implement, you approve the verified revision",
    );
    expect(html).toContain(
      'name="description" content="factory-kit runs opted-in GitHub issues through local Hermes agents, independent review, CI and a live preview, then merges only the commit you approve. Internal preview."',
    );
    expect(html).toContain('property="og:type" content="website"');
    expect(html).toMatch(
      /property="og:image" content="https:\/\/luongnv\.com\/(?:factory-kit-website\/)?og\.png"/,
    );
  });

  it("ships a 1200 by 630 PNG social card", () => {
    const image = readFileSync(resolve(process.cwd(), "public/og.png"));

    expect(image.subarray(0, 8)).toEqual(
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    );
    expect(image.readUInt32BE(16)).toBe(1200);
    expect(image.readUInt32BE(20)).toBe(630);
  });

  it("renders exactly one h1", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Index);
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
  });

  it("renders the hero copy and calls to action from the brief", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Index);

    expect(html).toContain("Internal preview · v0.1.0 · not yet installable");
    expect(html).toContain(
      "Agents implement the issue. You approve the verified revision.",
    );
    expect(html).toContain('href="https://github.com/luongnv89"');
    expect(html).toContain("Follow the build on GitHub");
    expect(html).toContain(
      'href="https://github.com/luongnv89/factory-kit-website/pulls?q=is%3Apr+is%3Amerged"',
    );
    expect(html).toContain("See how this site was built");
  });

  it("renders all approval request fields in brief order", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Index);
    const labels = [
      "Repository",
      "Pull request",
      "Head",
      "Base",
      "Review",
      "Checks",
      "Preview",
      "Merge",
      "Expires",
    ];
    const renderedLabels = [...html.matchAll(/<dt[^>]*>(.*?)<\/dt>/g)].map(
      (match) => match[1],
    );

    expect(renderedLabels).toEqual(labels);
    expect(html).toContain("Example approval request");
    expect(html).toContain("Illustrative approval request");
    expect(html).toContain("Approve");
    expect(html).toContain("Reject");
  });

  it("renders the Problem and Cost sections with the brief copy", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Index);

    expect(html).toContain("You still check every agent PR by hand");
    expect(html).toContain(
      "Coding agents can draft a fix in minutes. Then you spend the rest of the hour working out what actually ran.",
    );
    expect(html).toContain(
      "The agent says the tests pass. You can't tell which commit it tested, or whether CI agrees.",
    );
    expect(html).toContain(
      "A session dies halfway. You restart it and find a duplicate branch and a second PR.",
    );
    expect(html).toContain(
      "You approved a change this morning. Someone pushed after that, and your approval still looks valid.",
    );
    expect(html).toContain("The cleanup lands on you");
    expect(html).toContain("Repeated checks.");
    expect(html).toContain(
      "You re-run CI you already paid for, because the evidence never names a revision.",
    );
    expect(html).toContain("A noisy review queue.");
    expect(html).toContain(
      "PRs arrive claiming success, and each one needs a full manual audit.",
    );
    expect(html).toContain("Risky merge rights.");
    expect(html).toContain(
      "Give an agent the merge button and one bad run becomes a revert on main.",
    );
  });

  it("renders the How it works pipeline in order with its GitHub CTA", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Index);
    const titles = [
      "Opt in.",
      "Implement and review.",
      "Verify and preview.",
      "Approve and merge.",
    ];
    const section = html.match(
      /<section[^>]*id="how-it-works"[\s\S]*?<\/section>/,
    )?.[0];

    expect(section).toBeDefined();
    expect(section).toContain("Four stages, one commit, your decision");
    expect(
      [...section!.matchAll(/<h3[^>]*>(.*?)<\/h3>/g)].map((match) => match[1]),
    ).toEqual(titles);
    expect(section).toContain('href="https://github.com/luongnv89"');
    expect(section).toContain("Follow the build on GitHub");
  });

  it("renders the What you get section with the brief copy", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Index);
    const section = html.match(
      /<section[^>]*class="solution"[\s\S]*?<\/section>/,
    )?.[0];
    const titles = [
      "Reviews tied to one SHA.",
      "Previews of the reviewed revision.",
      "Approvals that expire.",
      "Recovery without duplicates.",
    ];

    expect(section).toBeDefined();
    expect(section).toContain("Evidence first, then your approval");
    expect(
      [...section!.matchAll(/<h3[^>]*>(.*?)<\/h3>/g)].map((match) => match[1]),
    ).toEqual(titles);
    expect(section).toContain(
      "The request you approve names its head commit, the reviewer's verdict, the check runs and the preview URL. If any of them change, factory-kit asks you again.",
    );
  });

  it("renders the Boundaries section with its five rows", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Index);
    const section = html.match(
      /<section[^>]*id="boundaries"[\s\S]*?<\/section>/,
    )?.[0];
    const titles = [
      "Setup is a reviewed plan.",
      "Readiness names its blockers.",
      "Merges stay human.",
      "Limits are explicit.",
      "Removal keeps your work.",
    ];

    expect(section).toBeDefined();
    expect(section).toContain("Boundaries you can read in the manifest");
    expect(
      [...section!.matchAll(/<h3[^>]*>(.*?)<\/h3>/g)].map((match) => match[1]),
    ).toEqual(titles);
    expect(section).toMatch(/<code[^>]*>factory-setup plan<\/code>/);
    expect(section).toMatch(/<code[^>]*>apply<\/code>/);
  });

  it("renders the Built on section with its five labelled items", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Index);
    const section = html.match(
      /<section[^>]*class="built-on"[\s\S]*?<\/section>/,
    )?.[0];
    const labels = [
      "Hermes Agent",
      "IDD skills",
      "GitHub",
      "Vercel",
      "Telegram",
    ];

    expect(section).toBeDefined();
    expect(section).toContain("Built on tools you already trust");
    expect(
      [...section!.matchAll(/<h3[^>]*>(.*?)<\/h3>/g)].map((match) => match[1]),
    ).toEqual(labels);
    expect(section).toContain("Kanban workers");
    expect(section).toContain("issue-resolver, issue-pr-review");
    expect(section).toContain("checks, branch protection, Pages previews");
    expect(section).toContain("alternative preview host");
    expect(section).toContain("status and control");
    expect(html).toMatch(/<a href="#boundaries"[^>]*>Boundaries<\/a>/);
  });

  it("renders the Status section with its merged pull request link", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Index);
    const section = html.match(
      /<section[^>]*id="status"[\s\S]*?<\/section>/,
    )?.[0];

    expect(section).toBeDefined();
    expect(section).toContain("Where it stands");
    expect(section).toContain(
      "factory-kit 0.1.0 is an internal preview. Its v1.0 evidence gate is still open: a few live checks must pass before a release, and there is no public install yet.",
    );
    expect(section).toContain(
      "This page is the first real project it shipped. Each section started as a GitHub issue and went through the full pipeline: implementation, independent review, CI, a preview and a human approval.",
    );
    expect(section).toMatch(
      /<a href="https:\/\/github\.com\/luongnv89\/factory-kit-website\/pulls\?q=is%3Apr\+is%3Amerged"[^>]*>\s*Browse the merged pull requests\s*<\/a>/,
    );
  });

  it("renders all six FAQ items as native details and summary elements", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Index);
    const section = html.match(/<section[^>]*id="faq"[\s\S]*?<\/section>/)?.[0];
    const questions = [
      "Can I install it?",
      "Which agents does it run?",
      "Does it replace my CI?",
      "Can it merge on its own?",
      "What if my machine restarts mid-task?",
      "Where do approvals happen?",
    ];

    expect(section).toBeDefined();
    expect(section!.match(/<details\b/g)).toHaveLength(6);
    expect(
      [...section!.matchAll(/<summary[^>]*>(.*?)<\/summary>/g)].map(
        (match) => match[1],
      ),
    ).toEqual(questions);
    expect(section).toContain(
      "Not yet. factory-kit is an internal preview while its v1.0 gate closes.",
    );
    expect(section).toContain(
      "The tested setup uses openai-codex/gpt-6-luna for both implementation and review.",
    );
    expect(section).toContain(
      "factory-kit reads them and refuses to dispatch when the main branch is unprotected.",
    );
    expect(section).toContain("approvals expire after 60 minutes.");
    expect(section).toContain(
      "checks GitHub before it repeats any remote action.",
    );
    expect(section).toContain(
      "The merges for this site were approved from the CLI.",
    );
    expect(html).toMatch(/<a href="#status"[^>]*>Status<\/a>/);
    expect(html).toMatch(/<a href="#faq"[^>]*>FAQ<\/a>/);
  });

  it("renders the footer attribution, links and copyright", async () => {
    const container = await createContainer();
    const html = await container.renderToString(Index);
    const footer = html.match(/<footer[^>]*>[\s\S]*?<\/footer>/)?.[0];

    expect(footer).toBeDefined();
    expect(footer).toContain("factory-kit · built by Luong Nguyen");
    expect(footer).toMatch(
      /<a href="https:\/\/github\.com\/luongnv89"[^>]*>GitHub<\/a>/,
    );
    expect(footer).toMatch(
      /<a href="https:\/\/github\.com\/luongnv89\/factory-kit-website"[^>]*>Site source<\/a>/,
    );
    expect(footer).toContain(
      "© 2026 Luong Nguyen. Site code under the MIT License.",
    );
  });
});
