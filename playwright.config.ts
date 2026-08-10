/**
 * FILE: playwright.config.ts
 * PURPOSE: Configure Playwright E2E tests for the firm-website Next.js app.
 * ARCHITECTURE: Root-level test configuration that runs against a production build with multi-browser projects and CI-tuned retries/workers.
 * KEY RULES: Runs against the built app via pnpm build/start; uses a single worker and retries in CI.
 * DEPENDS ON: @playwright/test, @ydm-agency/firm-website build/start scripts.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    actionTimeout: 30000,
    navigationTimeout: 30000,
    waitUntil: 'networkidle',
  },
  expect: {
    timeout: 30000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command:
      'pnpm --filter @ydm-agency/firm-website build && pnpm --filter @ydm-agency/firm-website start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 180 * 1000,
    env: {
      RESEND_API_KEY: 'test',
    },
  },
});
