/**
 * FILE: CookieConsentContext.tsx
 * PURPOSE: Provides cookie consent state and actions through a React Context.
 * ARCHITECTURE: Client context managing a SameSite=Lax cookie with accept/reject/reset behaviors.
 * KEY RULES: This package is an orphaned/broken fork of packages/ui and is excluded from the pnpm workspace; do not modify logic.
 * DEPENDS ON: React.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

const COOKIE_NAME = 'ydm-analytics-consent';
const COOKIE_MAX_AGE = 31536000;

interface ConsentContextValue {
  analyticsConsent: boolean;
  accept: () => void;
  reject: () => void;
  isOpen: boolean;
  openSettings: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

/**
 * WHAT IT DOES: Writes the consent value to the analytics consent cookie.
 * @param {string} value – The cookie value to write (e.g., "accepted" or "rejected").
 * @return {void}
 * SIDE EFFECTS: Sets a `document.cookie` entry with SameSite=Lax.
 * ASSUMES: Called only in browser environments; guards `document` to avoid SSR errors.
 */
function setCookie(value: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=${value}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
}

/**
 * WHAT IT DOES: Reads the current value of the analytics consent cookie.
 * @param none – This function takes no arguments.
 * @return {string | null} – The cookie value, or null if not set.
 * SIDE EFFECTS: None.
 * ASSUMES: Called only in browser environments; guards `document` to avoid SSR errors.
 */
function getCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(^| )${COOKIE_NAME}=([^;]+)`));
  return match ? match[2] : null;
}

/**
 * WHAT IT DOES: Provides cookie consent state and actions to descendant components.
 * @param {{ children: ReactNode }} props – React children to be wrapped by the context.
 * @return {React.ReactElement} – The context provider wrapping the children.
 * SIDE EFFECTS: Reads and writes the `ydm-analytics-consent` cookie; sets up a custom event listener.
 * ASSUMES: Only rendered client-side or in an environment where `document` and `window` are guarded.
 */
export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [analyticsConsent, setAnalyticsConsent] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const consent = getCookie();
    if (consent === null) {
      setIsOpen(true);
      setAnalyticsConsent(false);
    } else {
      setAnalyticsConsent(consent === 'accepted');
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    /**
     * WHAT IT DOES: Opens the cookie settings banner in response to a custom event.
     * @param none – This function takes the custom event but does not use it.
     * @return {void}
     * SIDE EFFECTS: Sets the banner open state via `setIsOpen(true)`.
     * ASSUMES: The `setIsOpen` dispatcher is in scope.
     */
    const handleOpenSettings = () => setIsOpen(true);
    window.addEventListener('ydm:open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('ydm:open-cookie-settings', handleOpenSettings);
  }, []);

  /**
   * WHAT IT DOES: Accepts analytics cookies and closes the banner.
   * @param none – This function takes no arguments.
   * @return {void}
   * SIDE EFFECTS: Sets the consent cookie to "accepted", updates state, and hides the banner.
   * ASSUMES: Called from a component inside CookieConsentProvider.
   */
  const accept = () => {
    setCookie('accepted');
    setAnalyticsConsent(true);
    setIsOpen(false);
  };

  /**
   * WHAT IT DOES: Rejects analytics cookies and closes the banner.
   * @param none – This function takes no arguments.
   * @return {void}
   * SIDE EFFECTS: Sets the consent cookie to "rejected", clears consent, and hides the banner.
   * ASSUMES: Called from a component inside CookieConsentProvider.
   */
  const reject = () => {
    setCookie('rejected');
    setAnalyticsConsent(false);
    setIsOpen(false);
  };

  /**
   * WHAT IT DOES: Reopens the cookie consent banner.
   * @param none – This function takes no arguments.
   * @return {void}
   * SIDE EFFECTS: Sets `isOpen` to true.
   * ASSUMES: Called from a component inside CookieConsentProvider.
   */
  const openSettings = () => {
    setIsOpen(true);
  };

  return (
    <ConsentContext.Provider value={{ analyticsConsent, accept, reject, isOpen, openSettings }}>
      {children}
    </ConsentContext.Provider>
  );
}

/**
 * WHAT IT DOES: Returns the current cookie consent context value.
 * @param none – This hook takes no arguments.
 * @return {ConsentContextValue} – The current consent state and action functions.
 * SIDE EFFECTS: Throws an error if called outside a CookieConsentProvider.
 * ASSUMES: Invoked within a component tree wrapped by CookieConsentProvider.
 */
export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within a CookieConsentProvider');
  }
  return context;
}
