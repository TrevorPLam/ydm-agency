/**
 * FILE: vitest.config.ts
 * PURPOSE: Configures Vitest for the design-system package.
 * ARCHITECTURE: Vite + React plugin with jsdom environment and alias for @ydm-agency/utils.
 * KEY RULES: This package is an orphaned/broken fork of packages/ui and is excluded from the pnpm workspace; do not modify the duplicated blocks.
 * DEPENDS ON: vitest, @vitejs/plugin-react, path, @ydm-agency/utils workspace alias.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
  },
  resolve: {
    alias: {
      '@ydm-agency/utils': path.resolve(__dirname, '../utils/src'),
    },
  },
});

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
  },
});
