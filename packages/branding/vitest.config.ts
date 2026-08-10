/**
 * FILE: vitest.config.ts
 * PURPOSE: Configure Vitest for the branding package test suite.
 * ARCHITECTURE: branding package test runner, Node environment with global APIs.
 * KEY RULES: Use node environment; keep globals enabled for describe/it/expect.
 * DEPENDS ON: vitest
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
  },
});
