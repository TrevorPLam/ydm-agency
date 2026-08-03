import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { CookieConsent } from '../CookieConsent';
import { CookieConsentProvider } from '../CookieConsentContext';

expect.extend(matchers);

describe('CookieConsent', () => {
  beforeEach(() => {
    // Clear cookies before each test
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
    // After accept, banner should be hidden
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
    // After reject, banner should be hidden
    await waitFor(() => {
      const banner = screen.queryByText(/This site uses analytics cookies/);
      expect(banner).not.toBeInTheDocument();
    });
  });

  it('banner hidden when cookie is set', () => {
    // Set cookie before rendering
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
