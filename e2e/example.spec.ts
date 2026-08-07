import { test, expect } from '@playwright/test';

test.describe('firm website homepage', () => {
  test('renders the brand name in the header', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => console.log(`[${msg.type()}] ${msg.text()}`));
    page.on('pageerror', (err) => {
      errors.push(err.message);
      console.error('PAGE ERROR:', err.message);
    });

    await page.goto('/');
    await page.waitForTimeout(2000);

    if (errors.length > 0) {
      console.log('Errors:', errors);
    }

    await expect(page.getByText('YDM Agency').first()).toBeVisible();
  });
});
