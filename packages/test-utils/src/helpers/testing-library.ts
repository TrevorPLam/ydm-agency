/**
 * FILE: testing-library.ts
 * PURPOSE: Set up and expose shared React Testing Library helpers for Vitest.
 * ARCHITECTURE: test-utils helpers, registers jest-dom/axe/Zod matchers and wraps RTL render.
 * KEY RULES: Matchers must be registered before use; the provider wrapper must be a no-op Fragment.
 * DEPENDS ON: @testing-library/jest-dom/matchers, jest-axe, @testing-library/react, @testing-library/user-event, react, vitest, ../matchers
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
import { toHaveNoViolations } from 'jest-axe';
import { render as rtlRender, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createElement, Fragment, type ReactElement, type ReactNode } from 'react';
import { expect } from 'vitest';
import { toHaveZodIssue } from '../matchers';

/**
 * WHAT IT DOES: Registers jest-dom, jest-axe, and the custom Zod matcher with Vitest's expect.
 * @return {void}
 * SIDE EFFECTS: Extends the global expect matcher set.
 * ASSUMES: Called once before tests that rely on these matchers.
 */
export function setupTest(): void {
  expect.extend(jestDomMatchers);
  expect.extend(toHaveNoViolations);
  expect.extend({ toHaveZodIssue });
}

interface ProviderWrapperProps {
  children: ReactNode;
}

/**
 * WHAT IT DOES: Renders children inside a React Fragment with no additional providers.
 * @param {ProviderWrapperProps} props – wrapper props containing children
 * @return {ReactElement} – the rendered fragment
 * SIDE EFFECTS: None
 * ASSUMES: children is a valid React node.
 */
function ProviderWrapper({ children }: ProviderWrapperProps): ReactElement {
  return createElement(Fragment, null, children);
}

/**
 * WHAT IT DOES: Renders a React element through the shared provider wrapper for consistent test setup.
 * @param {ReactElement} ui – the React element to render
 * @param {Omit<RenderOptions, 'wrapper'>} [options] – optional RTL render options excluding wrapper
 * @return {ReturnType<typeof rtlRender>} – the rendered output from Testing Library
 * SIDE EFFECTS: None
 * ASSUMES: setupTest has been called if custom matchers are required.
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): ReturnType<typeof rtlRender> {
  return rtlRender(ui, {
    ...options,
    wrapper: ProviderWrapper,
  });
}

/**
 * WHAT IT DOES: Returns a configured user-event instance for simulating user interactions.
 * @return {ReturnType<typeof userEvent.setup>} – a user-event session
 * SIDE EFFECTS: None
 * ASSUMES: Should be used inside a test with the jsdom environment.
 */
export function createUserEvent(): ReturnType<typeof userEvent.setup> {
  return userEvent.setup();
}
