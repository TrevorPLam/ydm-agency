import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
import { toHaveNoViolations } from 'jest-axe';
import { render as rtlRender, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createElement, Fragment, type ReactElement, type ReactNode } from 'react';
import { expect } from 'vitest';
import { toHaveZodIssue } from '../matchers';

export function setupTest(): void {
  expect.extend(jestDomMatchers);
  expect.extend(toHaveNoViolations);
  expect.extend({ toHaveZodIssue });
}

interface ProviderWrapperProps {
  children: ReactNode;
}

function ProviderWrapper({ children }: ProviderWrapperProps): ReactElement {
  return createElement(Fragment, null, children);
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): ReturnType<typeof rtlRender> {
  return rtlRender(ui, {
    ...options,
    wrapper: ProviderWrapper,
  });
}

export function createUserEvent(): ReturnType<typeof userEvent.setup> {
  return userEvent.setup();
}
