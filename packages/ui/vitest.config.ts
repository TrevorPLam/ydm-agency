/**
 * FILE: vitest.config.ts
 * PURPOSE: Vitest configuration for the UI package.
 * ARCHITECTURE: packages/ui / shared Vite + jsdom test runner with an alias to the utils package.
 * KEY RULES: Aliases @ydm-agency/utils to ../utils/src and loads the test setup file.
 * DEPENDS ON: vitest, @vitejs/plugin-react, Node path, and the UI test setup file.
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
