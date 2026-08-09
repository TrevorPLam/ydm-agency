import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E configuration for the firm-website Next.js app.
 *
 * Runs against a production build (`next build && next start`) to match
 * the deployed environment. Multi-browser projects cover Chromium, Firefox,
 * and WebKit. Retries and workers are tuned for CI.
 */
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
