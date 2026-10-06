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
});
