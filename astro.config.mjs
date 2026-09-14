// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Design-2 placeholder domain so canonicals, sitemap, and OG URLs
  // stay consistent with the fictional template content.
  site: "https://example-advisory.co.uk",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },

  devToolbar: {
    enabled: false,
  },
});
