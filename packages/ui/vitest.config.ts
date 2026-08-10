/**
 * FILE: vitest.config.ts
 * PURPOSE: Vitest configuration for the UI package.
 * ARCHITECTURE: packages/ui / shared Vite + jsdom test runner with workspace alias support.
 * KEY RULES: Loads the test setup file; workspace aliases are resolved by root vitest config.
 * DEPENDS ON: vitest, @vitejs/plugin-react, and the UI test setup file.
 * LAST UPDATED: 2026-08-10 Remove hardcoded relative alias, use root workspace config
 */

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
