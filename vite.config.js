import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const runbook = fileURLToPath(new URL('./src/lib/layouts/runbook.svelte', import.meta.url));

// Builds the kb export as a static site, so the desk sees each page as rendered.
export default defineConfig({
  plugins: [
    sveltekit({
      extensions: ['.svelte', '.svx'],
      preprocess: [vitePreprocess(), mdsvex({ extensions: ['.svx'], layout: { runbook } })],
      adapter: adapter(),
      alias: { '#lib': 'src/lib' },
      paths: { base: process.env.BASE_PATH ?? '' },
      prerender: { entries: ['*'], handleHttpError: 'warn', handleMissingId: 'warn' },
    }),
  ],
});
