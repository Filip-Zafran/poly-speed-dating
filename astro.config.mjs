import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

export default defineConfig({
  integrations: [svelte()],
  vite: {
    ssr: {
      external: ['better-sqlite3']
    },
    optimizeDeps: {
      exclude: ['better-sqlite3']
    }
  }
});
