import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs["flat/recommended"],
  {
    // Config files execute under Node, not the browser.
    files: ["*.config.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: { process: "readonly" },
    },
  },
  {
    ignores: ["dist/", ".astro/", "node_modules/"],
  },
];
