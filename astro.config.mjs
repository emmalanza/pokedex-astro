// @ts-check
import { defineConfig } from 'astro/config';
import htmx from 'astro-htmx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), htmx(), react()],
  output: 'server',
});