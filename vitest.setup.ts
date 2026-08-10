/**
 * FILE: vitest.setup.ts
 * PURPOSE: Initialize the Vitest test environment with DOM matchers, a11y matchers, and Next.js API mocks.
 * ARCHITECTURE: Setup file loaded before tests; extends expect and mocks next/headers, next/navigation, and next/cache for jsdom.
 * KEY RULES: Must run before unit tests; keeps Next.js server-only APIs out of the jsdom environment.
 * DEPENDS ON: @testing-library/jest-dom, @testing-library/react, jest-axe, vitest.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';
import { afterEach, expect, vi } from 'vitest';

expect.extend(jestDomMatchers);
expect.extend(toHaveNoViolations);

afterEach(() => {
  cleanup();
});

vi.mock('next/headers', () => ({
  cookies: vi.fn(() =>
    Promise.resolve({
      get: vi.fn(),
      set: vi.fn(),
      delete: vi.fn(),
      getAll: vi.fn(() => []),
    })
  ),
  headers: vi.fn(() => Promise.resolve(new Headers())),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT: ${url}`);
  }),
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  })),
  usePathname: vi.fn(() => '/'),
  useSearchParams: vi.fn(() => new URLSearchParams()),
  useParams: vi.fn(() => ({})),
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}));
