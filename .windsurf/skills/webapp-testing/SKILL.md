---
name: webapp-testing
description: Comprehensive E2E testing guide using Playwright for 2026 web applications, covering test philosophy, project structure, selectors, fixtures, parallelism, CI integration, and accessibility testing
---

# Web Application Testing Guide

This skill provides comprehensive guidance for end-to-end testing modern web applications using Playwright, following 2026 best practices for reliable, maintainable test suites.

## Testing Philosophy

### Core Principles

- **Test user-visible behavior**: Verify what end users see and interact with, not implementation details
- **Make tests isolated**: Each test should run independently with its own data, cookies, and storage
- **Avoid testing third-party dependencies**: Mock external APIs and services you don't control
- **Test against staging environments**: Use controlled data that doesn't change unexpectedly

### Test Pyramid (2026 Standard)

- **70% Unit Tests**: Fast, isolated, test individual functions/components
- **20% Integration Tests**: Test module interactions and API contracts
- **10% E2E Tests**: Test critical user journeys end-to-end

Avoid the inverted pyramid (200 E2E tests, 10 unit tests) which creates slow feedback loops and high maintenance costs.

## Project Structure

### Recommended Directory Layout

```
tests/
  e2e/
    auth/
      login.spec.ts
      signup.spec.ts
    payments/
      checkout.spec.ts
      refund.spec.ts
  pages/
    LoginPage.ts
    CheckoutPage.ts
    BasePage.ts
  fixtures/
    auth.fixture.ts
    data.fixture.ts
  utils/
    api-helpers.ts
    test-data-factory.ts
playwright.config.ts
```

### Key Principles

- Test specs organized by feature domain under `tests/e2e/`
- Page Objects live under `pages/`
- Custom fixtures under `fixtures/`
- Shared utilities under `utils/`

## Page Object Model

### Design Around User Intents

Create Page Objects for user workflows, not page URLs. A checkout flow might involve:
- `CartPage`
- `ShippingFormPage`
- `PaymentPage`

Even if they render within the same SPA route.

### Example Page Object

```typescript
import { type Page, type Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly shippingAddress: Locator;
  readonly paymentMethod: Locator;
  readonly placeOrderButton: Locator;
  readonly orderConfirmation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shippingAddress = page.getByLabel('Shipping address');
    this.paymentMethod = page.getByRole('combobox', { name: 'Payment method' });
    this.placeOrderButton = page.getByRole('button', { name: 'Place order' });
    this.orderConfirmation = page.getByTestId('order-confirmation');
  }

  async fillShipping(address: string) {
    await this.shippingAddress.fill(address);
  }

  async selectPayment(method: string) {
    await this.paymentMethod.selectOption(method);
  }

  async placeOrder() {
    await this.placeOrderButton.click();
    await this.orderConfirmation.waitFor({ state: 'visible' });
  }
}
```

### Best Practices

- Use semantic selectors (getByLabel, getByRole, getByTestId)
- Avoid raw CSS selectors when possible
- Define locators in constructor
- Create methods for user actions, not page interactions

## Selector Strategy

### Playwright Locator Hierarchy (2026)

1. **getByRole** - Expresses intent, anchored in accessibility tree
2. **getByLabel** - For form inputs, mirrors how users identify fields
3. **getByPlaceholder** - For inputs with placeholders
4. **getByText** - For static links, headings, unique copy
5. **getByAltText** - For images with alt text
6. **getByTitle** - For elements with title attributes
7. **getByTestId** - Fallback when nothing user-facing works
8. **CSS/XPath** - Last resort, couples to implementation

### Example Selectors

```typescript
// Best: getByRole
page.getByRole('button', { name: 'Submit' })

// Good: getByLabel
page.getByLabel('Email address')

// Fallback: getByTestId
page.getByTestId('submit-button')

// Avoid: CSS selector
page.locator('.btn-primary.submit')
```

### Why getByRole Wins

- Expresses intent ("this is a submit button")
- Anchored in accessibility tree
- Survives styling refactors
- Doubles as accessibility check

## Fixtures and Test Setup

### Custom Fixtures with test.extend

```typescript
import { test as base } from '@playwright/test';

type AuthFixtures = {
  authenticatedPage: Page;
};

const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // Sign in before each test
    await page.goto('/login');
    await page.getByLabel('Username').fill('testuser');
    await page.getByLabel('Password').fill('password');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForURL('/dashboard');
    await use(page);
  },
});

export { test };
```

### Authentication Storage State

Never re-login in tests. Use storage state:

```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    storageState: 'auth-state.json',
  },
});

// Save auth state once
await context.storageState({ path: 'auth-state.json' });
```

## Test Isolation

### beforeEach Hooks

```typescript
test.beforeEach(async ({ page }) => {
  // Runs before each test
  await page.goto('https://example.com/login');
  await page.getByLabel('Username').fill('username');
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Sign in' }).click();
});

test('first', async ({ page }) => {
  // page is signed in
});

test('second', async ({ page }) => {
  // page is signed in independently
});
```

### Avoid Test Dependencies

- Each test should be completely isolated
- No test should rely on another test
- Use before/beforeEach hooks for shared setup
- Accept some duplication for clarity

## Parallel Execution

### Workers vs Sharding

- **Workers**: Run tests in parallel on different worker processes
- **Sharding**: Split test suite across multiple machines/CI runners

### Configuration

```typescript
// playwright.config.ts
export default defineConfig({
  workers: process.env.CI ? 4 : 2,
  fullyParallel: true,
});
```

### Sharding for CI

```bash
# Split tests across 4 CI machines
npx playwright test --shard=1/4
npx playwright test --shard=2/4
npx playwright test --shard=3/4
npx playwright test --shard=4/4
```

## Handling Flaky Tests

### Retry Logic

```typescript
// playwright.config.ts
export default defineConfig({
  retries: process.env.CI ? 2 : 0,
});
```

### Trace Viewer

First move on any flaky test:

```typescript
test('example', async ({ page }) => {
  // Test code
});
```

View trace:
```bash
npx playwright show-trace trace.zip
```

### Common Flakiness Causes

- Race conditions (use waitFor instead of fixed timeouts)
- Network delays (mock network responses)
- Dynamic content (use waitForSelector)
- Timing issues (use web-first assertions)

## CI Integration

### GitHub Actions Example

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

### CI-Specific Configuration

```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: process.env.CI ? 'github' : 'html',
});
```

## Accessibility Testing

### Automated Accessibility Checks

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage accessibility', async ({ page }) => {
  await page.goto('/');
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
```

### Keyboard Navigation Test

```typescript
test('keyboard navigation', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  // Verify focus moved to expected element
  await page.keyboard.press('Enter');
  // Verify action completed
});
```

## Network Mocking

### Mock Third-Party APIs

```typescript
test('with mocked API', async ({ page }) => {
  await page.route('**/api/external', route => {
    route.fulfill({
      status: 200,
      body: JSON.stringify({ data: 'mocked' }),
    });
  });
  await page.goto('/');
});
```

### API Response Testing

```typescript
test('API response handling', async ({ page }) => {
  const response = await page.waitForResponse('**/api/data');
  const data = await response.json();
  expect(data).toHaveProperty('results');
});
```

## Visual Regression Testing

### Screenshot Comparison

```typescript
test('visual regression', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png');
});
```

### Configuration

```typescript
// playwright.config.ts
export default defineConfig({
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 100,
      threshold: 0.2,
    },
  },
});
```

## Best Practices Summary

### Do

- Use semantic selectors (getByRole, getByLabel)
- Test user-visible behavior
- Keep tests isolated
- Use Page Objects for complex interactions
- Implement proper fixture setup
- Run tests in parallel
- Mock external dependencies
- Use web-first assertions

### Don't

- Test implementation details
- Make tests depend on each other
- Use CSS selectors as first choice
- Re-login in every test
- Use fixed timeouts (use waitFor)
- Test third-party services directly
- Ignore flaky tests

## Resources

### Documentation

- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright Selectors](https://playwright.dev/docs/locators)
- [Playwright Fixtures](https://playwright.dev/docs/test-fixtures)

### Tools

- [Axe Core for Playwright](https://www.npmjs.com/package/@axe-core/playwright)
- [Playwright Trace Viewer](https://playwright.dev/docs/trace-viewer)
- [Playwright VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
