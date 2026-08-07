import { test, expect } from '@playwright/test';

test.describe('contact form', () => {
  test('navigates to the contact page from the header', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Main navigation').getByRole('link', { name: 'Contact' }).click();
    await expect(page.getByRole('heading', { name: "Let's Talk About Your Project" })).toBeVisible();
    await expect(page.getByLabel('Full Name *')).toBeVisible();
  });

  test('shows validation errors when the form is submitted empty', async ({ page }) => {
    await page.goto('/contact');

    await page.getByRole('button', { name: 'Get Your Free Project Outline' }).click();

    await expect(page.getByText('Name required')).toBeVisible();
    await expect(page.getByText('Invalid email')).toBeVisible();
    await expect(page.getByText('Message must be at least 20 characters')).toBeVisible();
  });

  test('submits the form and shows a success message', async ({ page }) => {
    await page.goto('/contact');

    // Focus the first field before filling to avoid a WebKit hydration race with react-hook-form.
    await page.getByLabel('Full Name *').click();
    await page.getByLabel('Full Name *').fill('E2E Test User');

    await page.getByLabel('Email Address *').fill('e2e@example.com');

    await page
      .getByLabel('What do you need help with? *')
      .fill('This is an end-to-end test message describing a website and marketing project need.');

    await page.getByLabel('Project Type (optional)').selectOption('website');

    await page.getByRole('button', { name: 'Get Your Free Project Outline' }).click();

    await expect(page.getByRole('heading', { name: 'Thanks — your message has been received' })).toBeVisible();
    await expect(
      page.getByText('Check your inbox for a confirmation email. A personal reply will follow within 2 hours.')
    ).toBeVisible();
  });
});
