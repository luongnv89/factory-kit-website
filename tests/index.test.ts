import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";

import Index from "../src/pages/index.astro";

describe("index page", () => {
  it("renders the factory-kit smoke meta tag", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Index);
    expect(html).toContain('<meta name="factory-kit-smoke" content="landing"');
  });

  it("renders exactly one h1", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Index);
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
  });

  it("renders the hero copy and calls to action from the brief", async () => {
    const container = await AstroContainer.create();
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
    const container = await AstroContainer.create();
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
});
