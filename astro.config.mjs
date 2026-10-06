import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://luongnv.com",
  base: process.env.SITE_BASE ?? "/factory-kit-website/",
  vite: {
    plugins: [tailwindcss()],
  },
});
