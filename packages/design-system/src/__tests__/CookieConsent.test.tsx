/**
 * FILE: CookieConsent.test.tsx
 * PURPOSE: Unit tests for the CookieConsent banner state and interactions.
 * ARCHITECTURE: Vitest + Testing Library tests wrapping the component with CookieConsentProvider.
 * KEY RULES: This package is an orphaned/broken fork of packages/ui and is excluded from the pnpm workspace; do not modify logic.
 * DEPENDS ON: vitest, @testing-library/react, @testing-library/jest-dom, ../CookieConsent, ../CookieConsentContext.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { CookieConsent } from '../CookieConsent';
import { CookieConsentProvider } from '../CookieConsentContext';

expect.extend(matchers);

describe('CookieConsent', () => {
  beforeEach(() => {
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
    });
  });

  it('banner renders when no consent cookie exists', () => {
    render(
      <CookieConsentProvider>
        <CookieConsent />
      </CookieConsentProvider>
    );
    const banner = screen.getByText(/This site uses analytics cookies/);
    expect(banner).toBeInTheDocument();
  });

  it('Accept click calls accept()', async () => {
    render(
      <CookieConsentProvider>
        <CookieConsent />
      </CookieConsentProvider>
    );
    const acceptButton = screen.getByRole('button', { name: 'Accept' });
    acceptButton.click();
    await waitFor(() => {
      const banner = screen.queryByText(/This site uses analytics cookies/);
      expect(banner).not.toBeInTheDocument();
    });
  });

  it('Reject click calls reject()', async () => {
    render(
      <CookieConsentProvider>
        <CookieConsent />
      </CookieConsentProvider>
    );
    const rejectButton = screen.getByRole('button', { name: 'Reject' });
    rejectButton.click();
    await waitFor(() => {
      const banner = screen.queryByText(/This site uses analytics cookies/);
      expect(banner).not.toBeInTheDocument();
    });
  });

  it('banner hidden when cookie is set', () => {
    document.cookie = 'ydm-analytics-consent=accepted; path=/';
    
    render(
      <CookieConsentProvider>
        <CookieConsent />
      </CookieConsentProvider>
    );
    const banner = screen.queryByText(/This site uses analytics cookies/);
    expect(banner).not.toBeInTheDocument();
  });
});
