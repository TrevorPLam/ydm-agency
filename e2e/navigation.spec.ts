/**
 * FILE: navigation.spec.ts
 * PURPOSE: End-to-end Playwright tests for site navigation and routing.
 * ARCHITECTURE: e2e / critical user flow suite exercising main navigation links and page accessibility.
 * KEY RULES: Must run against a running local dev server; navigation labels and page headings must stay in sync with UI.
 * DEPENDS ON: @playwright/test, the Next.js dev server, and the main site routes.
 * LAST UPDATED: 2026-08-10 Add navigation tests
 */

import { test, expect } from '@playwright/test';

test.describe('navigation', () => {
  test('navigates to homepage from root URL', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /YDM Agency/i })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Services' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
  });

  test('navigates to services hub from header', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Services' }).click();

    await expect(page).toHaveURL('/services');
    await expect(page.getByRole('heading', { name: 'Services' })).toBeVisible();
  });

  test('navigates to contact page from header', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Contact' }).click();

    await expect(page).toHaveURL('/contact');
    await expect(page.getByRole('heading', { name: "Let's Talk About Your Project" })).toBeVisible();
  });

  test('navigates to about page from footer', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('contentinfo').getByRole('link', { name: 'About' }).click();

    await expect(page).toHaveURL('/about');
    await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();
  });

  test('navigates to blog hub from footer', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('contentinfo').getByRole('link', { name: 'Blog' }).click();

    await expect(page).toHaveURL('/blog');
    await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible();
  });

  test('navigates to education hub from footer', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('contentinfo').getByRole('link', { name: 'Education' }).click();

    await expect(page).toHaveURL('/education');
    await expect(page.getByRole('heading', { name: 'Education' })).toBeVisible();
  });

  test('navigates to privacy policy from footer', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('contentinfo').getByRole('link', { name: 'Privacy' }).click();

    await expect(page).toHaveURL('/privacy');
    await expect(page.getByRole('heading', { name: 'Privacy Policy' })).toBeVisible();
  });

  test('navigates to audit page from homepage CTA', async ({ page }) => {
    await page.goto('/');

    const auditButton = page.getByRole('link', { name: /audit/i }).first();
    await auditButton.click();

    await expect(page).toHaveURL('/audit');
    await expect(page.getByRole('heading', { name: 'Request Your Free Audit' })).toBeVisible();
  });

  test('navigates between service pages and returns to hub', async ({ page }) => {
    await page.goto('/services');

    await page.getByRole('link', { name: 'SEO' }).click();
    await expect(page).toHaveURL('/services/seo');
    await expect(page.getByRole('heading', { name: 'SEO Services' })).toBeVisible();

    await page.getByRole('link', { name: 'Services' }).click();
    await expect(page).toHaveURL('/services');
    await expect(page.getByRole('heading', { name: 'Services' })).toBeVisible();
  });

  test('returns to homepage from logo click', async ({ page }) => {
    await page.goto('/services');

    await page.getByRole('link', { name: 'YDM Agency' }).click();

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: /YDM Agency/i })).toBeVisible();
  });

  test('handles browser back and forward navigation', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Services' }).click();
    await expect(page).toHaveURL('/services');

    await page.goBack();
    await expect(page).toHaveURL('/');

    await page.goForward();
    await expect(page).toHaveURL('/services');
  });
});
