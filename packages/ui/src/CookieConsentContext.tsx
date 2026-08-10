/**
 * FILE: CookieConsentContext.tsx
 * PURPOSE: React context for managing analytics cookie consent state with persistent storage and banner display logic.
 * ARCHITECTURE: Context provider with cookie-based persistence, first-visit detection, and custom event support for re-opening settings.
 * KEY RULES: Consent state must persist across sessions; first visit must show banner; consent choice must be reversible; provide hook for safe context access.
 * DEPENDS ON: react (createContext, useContext, useEffect, useState).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

const COOKIE_NAME = 'ydm-analytics-consent';
const COOKIE_MAX_AGE = 31536000; // WHY: 31536000 seconds equals a 1-year consent cookie max-age, a common analytics consent duration.

interface ConsentContextValue {
  analyticsConsent: boolean;
  accept: () => void;
  reject: () => void;
  isOpen: boolean;
  openSettings: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

/**
 * WHAT IT DOES: Sets the consent cookie with security attributes.
 * @param {string} value - Cookie value ('accepted' or 'rejected')
 * @return {void}
 * SIDE EFFECTS: Sets document cookie with max-age and SameSite attributes.
 * ASSUMES: Runs in browser environment; document.cookie is accessible.
 */
function setCookie(value: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=${value}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
}

/**
 * WHAT IT DOES: Retrieves the consent cookie value.
 * @return {string | null} - Cookie value or null if not set
 * SIDE EFFECTS: None (read-only cookie access).
 * ASSUMES: Runs in browser environment; document.cookie is accessible.
 */
function getCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(^| )${COOKIE_NAME}=([^;]+)`));
  return match ? match[2] : null;
}

/**
 * WHAT IT DOES: Provides consent state management with cookie persistence and banner display logic.
 * @param {{ children: ReactNode }} props - Child components
 * @return {JSX.Element} - Context provider with consent state
 * SIDE EFFECTS: Reads/writes cookies, manages local state, listens for custom events.
 * ASSUMES: Runs in client context; cookie operations are synchronous.
 */
export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [analyticsConsent, setAnalyticsConsent] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // WHY: Read cookie on mount to restore consent state from previous session
  useEffect(() => {
    const consent = getCookie();
    if (consent === null) {
      // WHY: No cookie means first visit, so show the consent banner.
      setIsOpen(true);
      setAnalyticsConsent(false);
    } else {
      setAnalyticsConsent(consent === 'accepted');
      setIsOpen(false);
    }
  }, []);

  // WHY: Listen for custom event to re-open settings (allows components to trigger banner re-open)
  useEffect(() => {
    const handleOpenSettings = () => setIsOpen(true);
    window.addEventListener('ydm:open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('ydm:open-cookie-settings', handleOpenSettings);
  }, []);

  /**
   * WHAT IT DOES: Accepts analytics consent, stores cookie, and closes banner.
   * @return {void}
   * SIDE EFFECTS: Sets consent cookie, updates local state, closes banner.
   * ASSUMES: Called by user interaction (banner accept button).
   */
  const accept = () => {
    setCookie('accepted');
    setAnalyticsConsent(true);
    setIsOpen(false);
  };

  /**
   * WHAT IT DOES: Rejects analytics consent, stores cookie, and closes banner.
   * @return {void}
   * SIDE EFFECTS: Sets consent cookie, updates local state, closes banner.
   * ASSUMES: Called by user interaction (banner reject button).
   */
  const reject = () => {
    setCookie('rejected');
    setAnalyticsConsent(false);
    setIsOpen(false);
  };

  /**
   * WHAT IT DOES: Re-opens the consent banner for settings changes.
   * @return {void}
   * SIDE EFFECTS: Updates local state to show banner.
   * ASSUMES: Called by user interaction (settings button).
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
 * WHAT IT DOES: Provides safe access to consent context with error handling for missing provider.
 * @return {ConsentContextValue} - Consent context value
 * SIDE EFFECTS: None (hook).
 * ASSUMES: Used within CookieConsentProvider; throws descriptive error if not.
 */
export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within a CookieConsentProvider');
  }
  return context;
}
