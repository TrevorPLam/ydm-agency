/**
 * FILE: audit-form.spec.ts
 * PURPOSE: End-to-end Playwright tests for the free marketing audit request form.
 * ARCHITECTURE: e2e / critical user flow suite exercising the /audit page and its Server Action.
 * KEY RULES: Must run against a running local dev server; form labels and success copy must stay in sync with UI.
 * DEPENDS ON: @playwright/test, the Next.js dev server, the /audit route, and the audit Server Action.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import { test, expect } from '@playwright/test';

test.describe('audit form', () => {
  test('renders the audit request form', async ({ page }) => {
    await page.goto('/audit');

    await expect(page.getByRole('heading', { name: 'Request Your Free Audit' })).toBeVisible();
    await expect(page.getByLabel('Name *')).toBeVisible();
    await expect(page.getByLabel('Email *')).toBeVisible();
    await expect(page.getByLabel('Website URL *')).toBeVisible();
    await expect(page.getByLabel('Biggest challenge *')).toBeVisible();
    await expect(page.getByLabel('Current marketing state *')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Request Free Audit' })).toBeVisible();
  });

  test('shows validation errors when the form is submitted empty', async ({ page }) => {
    await page.goto('/audit');

    await page.getByRole('button', { name: 'Request Free Audit' }).click();

    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.getByText('Invalid email address')).toBeVisible();
    await expect(page.getByText('Website is required')).toBeVisible();
    await expect(page.getByText('Describe your biggest challenge')).toBeVisible();
  });

  test('submits the form and shows a success message', async ({ page }) => {
    await page.goto('/audit');

    // WHY: Focus the first field before filling to avoid a WebKit hydration race with react-hook-form.
    await page.getByLabel('Name *').click();
    await page.getByLabel('Name *').fill('E2E Test User');

    await page.getByLabel('Email *').fill('e2e@example.com');
    await page.getByLabel('Website URL *').fill('example.com');
    await page.getByLabel('Biggest challenge *').fill('Traffic exists but few leads convert into paying customers.');
    await page.getByLabel('Current marketing state *').selectOption('traffic-no-leads');

    await page.getByRole('button', { name: 'Request Free Audit' }).click();

    await expect(page.getByRole('heading', { name: 'Audit request received' })).toBeVisible();
    await expect(
      page.getByText('Expect a confirmation and the audit next steps within 2 hours on business days.')
    ).toBeVisible();
  });
});
