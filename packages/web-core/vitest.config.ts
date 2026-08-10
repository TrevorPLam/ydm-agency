/**
 * FILE: vitest.config.ts
 * PURPOSE: Configure Vitest for the web-core package with React JSX support.
 * ARCHITECTURE: web-core package test runner, Node environment, global APIs, @vitejs/plugin-react.
 * KEY RULES: Use node environment; enable globals for describe/it/expect.
 * DEPENDS ON: vitest, @vitejs/plugin-react
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    globals: true,
  },
});
