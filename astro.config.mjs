// @ts-check
import { defineConfig } from 'astro/config';
import htmx from 'astro-htmx';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), htmx()],
  output: 'server',
});