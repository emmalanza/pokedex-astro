// @ts-check
import { defineConfig } from 'astro/config';
import htmx from 'astro-htmx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), htmx(), react()],
  output: "server", // 🔥 Necesario para usar SSR
  adapter: netlify({}),
});