/**
 * FILE: cookie-consent.spec.ts
 * PURPOSE: End-to-end Playwright tests for the cookie consent banner behavior.
 * ARCHITECTURE: e2e / consent state, banner interactions, navigation persistence, and footer reopening.
 * KEY RULES: Uses localhost cookies with Lax sameSite; banner resets only when the consent cookie is missing.
 * DEPENDS ON: @playwright/test, the Next.js dev server, and the CookieConsent component.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import { test, expect } from '@playwright/test';

const CONSENT_COOKIE = 'ydm-analytics-consent';

test.describe('cookie consent', () => {
  test('displays the cookie consent banner on first visit', async ({ page }) => {
    await page.goto('/');

    const banner = page.getByRole('dialog', { name: 'Cookie preferences' });
    await expect(banner).toBeVisible();
    await expect(
      page.getByText('This site uses analytics cookies to understand how visitors use the site.')
    ).toBeVisible();
    await expect(banner.getByRole('button', { name: 'Accept' })).toBeVisible();
    await expect(banner.getByRole('button', { name: 'Reject' })).toBeVisible();
  });

  test('hides the banner and stores accepted cookie on Accept', async ({ page }) => {
    await page.goto('/');

    const banner = page.getByRole('dialog', { name: 'Cookie preferences' });
    await expect(banner).toBeVisible();

    await banner.getByRole('button', { name: 'Accept' }).click();

    await expect(banner).not.toBeVisible();
    await expect(page.getByRole('status')).toHaveText(/analytics cookies accepted/i);

    const cookies = await page.context().cookies();
    const consentCookie = cookies.find((cookie) => cookie.name === CONSENT_COOKIE);
    expect(consentCookie?.value).toBe('accepted');
  });

  test('hides the banner and stores rejected cookie on Reject', async ({ page }) => {
    await page.goto('/');

    const banner = page.getByRole('dialog', { name: 'Cookie preferences' });
    await expect(banner).toBeVisible();

    await banner.getByRole('button', { name: 'Reject' }).click();

    await expect(banner).not.toBeVisible();
    await expect(page.getByRole('status')).toHaveText(/analytics cookies rejected/i);

    const cookies = await page.context().cookies();
    const consentCookie = cookies.find((cookie) => cookie.name === CONSENT_COOKIE);
    expect(consentCookie?.value).toBe('rejected');
  });

  test('keeps the banner hidden when a consent cookie already exists', async ({ context, page }) => {
    await context.addCookies([
      {
        name: CONSENT_COOKIE,
        value: 'rejected',
        domain: 'localhost',
        path: '/',
        sameSite: 'Lax',
      },
    ]);

    await page.goto('/');

    await expect(page.getByRole('dialog', { name: 'Cookie preferences' })).not.toBeVisible();
  });

  test('persists the consent choice across page navigation', async ({ page }) => {
    await page.goto('/');

    const banner = page.getByRole('dialog', { name: 'Cookie preferences' });
    await banner.getByRole('button', { name: 'Accept' }).click();
    await expect(banner).not.toBeVisible();

    await page.goto('/services');

    await expect(page.getByRole('dialog', { name: 'Cookie preferences' })).not.toBeVisible();

    const cookies = await page.context().cookies();
    const consentCookie = cookies.find((cookie) => cookie.name === CONSENT_COOKIE);
    expect(consentCookie?.value).toBe('accepted');
  });

  test('reopens the banner from the Cookie Settings footer button', async ({ page }) => {
    await page.goto('/');

    const banner = page.getByRole('dialog', { name: 'Cookie preferences' });
    await banner.getByRole('button', { name: 'Reject' }).click();
    await expect(banner).not.toBeVisible();

    await page.getByRole('button', { name: 'Cookie Settings' }).click();

    await expect(banner).toBeVisible();
    await expect(banner.getByRole('button', { name: 'Accept' })).toBeVisible();
  });

  test('dismisses the banner and rejects analytics when Escape is pressed', async ({ page }) => {
    await page.goto('/');

    const banner = page.getByRole('dialog', { name: 'Cookie preferences' });
    await expect(banner).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(banner).not.toBeVisible();
    await expect(page.getByRole('status')).toHaveText(/analytics cookies rejected/i);

    const cookies = await page.context().cookies();
    const consentCookie = cookies.find((cookie) => cookie.name === CONSENT_COOKIE);
    expect(consentCookie?.value).toBe('rejected');
  });
});
