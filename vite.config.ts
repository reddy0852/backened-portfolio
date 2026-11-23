import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Served from https://reddy0852.github.io/backened-portfolio/ — keep `base` in sync with the repo name.
export default defineConfig({
  base: '/backened-portfolio/',
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
});
