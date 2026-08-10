/**
 * FILE: vitest.config.ts
 * PURPOSE: Configure Vitest for the test-utils package with React and jsdom support.
 * ARCHITECTURE: test-utils package test runner, jsdom environment, path aliases for workspace resolution.
 * KEY RULES: Use jsdom environment, include test files, alias @ydm-agency/test-utils to ./src.
 * DEPENDS ON: vitest, @vitejs/plugin-react, path, url
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [path.resolve(__dirname, '../../vitest.setup.ts')],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    passWithNoTests: true,
  },
  resolve: {
    alias: {
      '@ydm-agency/test-utils': path.resolve(__dirname, './src'),
    },
  },
});
