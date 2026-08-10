/**
 * FILE: vitest.config.ts
 * PURPOSE: Vitest configuration for the SEO package.
 * ARCHITECTURE: packages/seo / shared Vite + jsdom test runner config with an internal package alias.
 * KEY RULES: Defines jsdom environment, global APIs, and an alias resolving @ydm-agency/seo to ./src.
 * DEPENDS ON: vitest, @vitejs/plugin-react, Node path and url modules.
 * LAST UPDATED: 2026-08-09 Add package Vitest config.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [],
  },
  resolve: {
    alias: {
      '@ydm-agency/seo': path.resolve(__dirname, './src'),
    },
  },
});
