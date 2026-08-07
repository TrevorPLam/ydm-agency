import * as React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CookieConsent } from './CookieConsent';
import { CookieConsentProvider } from './CookieConsentContext';

expect.extend(toHaveNoViolations);

const setup = () => userEvent.setup();

function renderWithProvider(ui: React.ReactElement) {
  return render(<CookieConsentProvider>{ui}</CookieConsentProvider>);
}

describe('CookieConsent', () => {
  beforeEach(() => {
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders as a dialog when no consent cookie exists', () => {
    renderWithProvider(<CookieConsent />);

    const banner = screen.getByRole('dialog', { name: 'Cookie preferences' });
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveAttribute('aria-modal', 'true');
    expect(
      screen.getByRole('heading', { name: 'Cookie preferences' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/This site uses analytics cookies/)
    ).toBeInTheDocument();
  });

  it('Accept click stores the accepted cookie and hides the banner', async () => {
    const user = setup();
    renderWithProvider(<CookieConsent />);

    const acceptButton = screen.getByRole('button', { name: 'Accept' });
    await user.click(acceptButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
    expect(document.cookie).toContain('ydm-analytics-consent=accepted');
  });

  it('Reject click stores the rejected cookie and hides the banner', async () => {
    const user = setup();
    renderWithProvider(<CookieConsent />);

    const rejectButton = screen.getByRole('button', { name: 'Reject' });
    await user.click(rejectButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
    expect(document.cookie).toContain('ydm-analytics-consent=rejected');
  });

  it('banner is hidden when consent cookie is already set', () => {
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: 'ydm-analytics-consent=accepted',
      configurable: true,
    });

    renderWithProvider(<CookieConsent />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('dismisses the banner when Escape is pressed', async () => {
    const user = setup();
    renderWithProvider(<CookieConsent />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
    expect(document.cookie).toContain('ydm-analytics-consent=rejected');
  });

  it('announces consent status through an aria-live region', async () => {
    const user = setup();
    renderWithProvider(<CookieConsent />);

    const acceptButton = screen.getByRole('button', { name: 'Accept' });
    await user.click(acceptButton);

    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveTextContent(/accepted/i);
  });

  it('reopens the banner when the open settings event fires', async () => {
    const user = setup();
    renderWithProvider(<CookieConsent />);

    const rejectButton = screen.getByRole('button', { name: 'Reject' });
    await user.click(rejectButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    await act(() => {
      window.dispatchEvent(new CustomEvent('ydm:open-cookie-settings'));
    });

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  it('has no accessibility violations when open', async () => {
    const { container } = renderWithProvider(<CookieConsent />);
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: false },
      },
    });
    expect(results).toHaveNoViolations();
  });
});
