import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import svelte from '@astrojs/svelte';

export default defineConfig({
  integrations: [svelte()],
  adapter: node({
    mode: 'standalone',
  }),
  output: 'server',
  vite: {
    ssr: {
      external: ['better-sqlite3', 'playwright'],
    },
  },
});
