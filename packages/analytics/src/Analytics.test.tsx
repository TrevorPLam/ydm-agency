/**
 * FILE: Analytics.test.tsx
 * PURPOSE: Unit and integration tests for AnalyticsProvider consent timing and gtag integration.
 * ARCHITECTURE: Vitest + jsdom + Testing Library; mocks next/script to control script onLoad and inspect the inline gtag init snippet.
 * KEY RULES: Reset the script registry and window.gtag before each test; never rely on real network script loading.
 * DEPENDS ON: @testing-library/react, @testing-library/user-event, vitest, next/script, @ydm-agency/ui
 * LAST UPDATED: 2026-08-09 Add consent timing tests
 */
import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { CookieConsentProvider, useConsent } from '@ydm-agency/ui';
import { AnalyticsProvider } from './Analytics';
import type { Gtag } from './types';

const scriptRegistry = vi.hoisted(() => ({
  onLoadTriggers: new Map<string, (() => void) | undefined>(),
  scriptProps: new Map<string, unknown>(),
}));

/**
 * WHAT IT DOES: Mock next/script so tests can trigger onLoad and inspect inline script content.
 * @return {null}
 * SIDE EFFECTS: Records rendered Script props in scriptRegistry keyed by src or id.
 * ASSUMES: Only the src- and id-based keys used by AnalyticsProvider are needed.
 */
vi.mock('next/script', () => ({
  default: function Script(props: {
    id?: string;
    src?: string;
    onLoad?: () => void;
    dangerouslySetInnerHTML?: { __html: string };
  }) {
    const key = props.src ?? props.id;
    if (key) {
      scriptRegistry.scriptProps.set(key, props);
      scriptRegistry.onLoadTriggers.set(key, props.onLoad);
    }
    return null;
  },
}));

const GA_SRC = 'https://www.googletagmanager.com/gtag/js?id=GA-123';

/**
 * WHAT IT DOES: Provides buttons that directly invoke the consent context accept/reject functions.
 * @return {JSX.Element}
 * SIDE EFFECTS: Renders two buttons that change CookieConsentContext state.
 * ASSUMES: Rendered inside CookieConsentProvider.
 */
function ConsentControl() {
  const { accept, reject } = useConsent();
  return (
    <>
      <button onClick={accept}>Accept</button>
      <button onClick={reject}>Reject</button>
    </>
  );
}

/**
 * WHAT IT DOES: Renders the provider tree for consent timing tests.
 * @return {ReturnType<typeof render>}
 * SIDE EFFECTS: Mounts AnalyticsProvider and ConsentControl inside CookieConsentProvider.
 */
function renderWithConsent() {
  return render(
    <CookieConsentProvider>
      <AnalyticsProvider gaId="GA-123" />
      <ConsentControl />
    </CookieConsentProvider>
  );
}

describe('AnalyticsProvider', () => {
  beforeEach(() => {
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
      configurable: true,
    });
    scriptRegistry.onLoadTriggers.clear();
    scriptRegistry.scriptProps.clear();
    window.gtag = undefined;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    window.gtag = undefined;
  });

  it('sends granted consent update once the GA4 script loads after the user accepts', async () => {
    const gtag = vi.fn<Gtag>();
    renderWithConsent();

    const acceptButton = screen.getByRole('button', { name: /accept/i });
    await userEvent.click(acceptButton);

    // WHY: gtag is not defined at click time, so the consent update is deferred until the GA script onLoad fires.
    expect(gtag).not.toHaveBeenCalled();

    window.gtag = gtag;
    scriptRegistry.onLoadTriggers.get(GA_SRC)?.();

    await waitFor(() => {
      expect(gtag).toHaveBeenCalledWith('consent', 'update', { analytics_storage: 'granted' });
    });
    expect(gtag).toHaveBeenCalledTimes(1);
  });

  it('sends granted once gtag loads when the cookie is already accepted', async () => {
    const gtag = vi.fn<Gtag>();
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: 'ydm-analytics-consent=accepted',
      configurable: true,
    });
    renderWithConsent();

    // WHY: gtag is not defined on mount, so no call should happen until the GA script onLoad fires.
    expect(gtag).not.toHaveBeenCalled();

    window.gtag = gtag;
    scriptRegistry.onLoadTriggers.get(GA_SRC)?.();

    await waitFor(() => {
      expect(gtag).toHaveBeenCalledWith('consent', 'update', { analytics_storage: 'granted' });
    });
    expect(gtag).toHaveBeenCalledTimes(1);
  });

  it('updates from granted to denied when the user rejects after accepting', async () => {
    const gtag = vi.fn<Gtag>();
    window.gtag = gtag;
    renderWithConsent();

    const acceptButton = screen.getByRole('button', { name: /accept/i });
    await userEvent.click(acceptButton);

    await waitFor(() => {
      expect(gtag).toHaveBeenCalledWith('consent', 'update', { analytics_storage: 'granted' });
    });

    const rejectButton = screen.getByRole('button', { name: /reject/i });
    await userEvent.click(rejectButton);

    await waitFor(() => {
      expect(gtag).toHaveBeenLastCalledWith('consent', 'update', { analytics_storage: 'denied' });
    });
    expect(gtag).toHaveBeenCalledTimes(2);
  });

  it('queues a default denied consent call before gtag config in the inline init script', async () => {
    const gtag = vi.fn<Gtag>();
    window.gtag = gtag;
    renderWithConsent();

    const acceptButton = screen.getByRole('button', { name: /accept/i });
    await userEvent.click(acceptButton);

    const gaInit = scriptRegistry.scriptProps.get('ga-init') as
      | { dangerouslySetInnerHTML: { __html: string } }
      | undefined;
    expect(gaInit).toBeDefined();
    const html = gaInit!.dangerouslySetInnerHTML.__html;
    expect(html).toContain("gtag('consent', 'default', { analytics_storage: 'denied' })");
    expect(html.indexOf("gtag('consent', 'default'")).toBeLessThan(html.indexOf("gtag('config'"));
  });
});
