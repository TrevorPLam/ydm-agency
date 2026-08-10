/**
 * FILE: vitest.config.ts
 * PURPOSE: Vitest configuration for the forms package.
 * ARCHITECTURE: packages/forms / shared Vite + jsdom test runner with package alias and setup file.
 * KEY RULES: Points setupFiles to ./src/__tests__/setup.ts and aliases @ydm-agency/forms to ./src.
 * DEPENDS ON: vitest, @vitejs/plugin-react, and Node path.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
  },
  resolve: {
    alias: {
      '@ydm-agency/forms': path.resolve(__dirname, './src'),
    },
  },
});
