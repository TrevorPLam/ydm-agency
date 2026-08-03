'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

const COOKIE_NAME = 'ydm-analytics-consent';
const COOKIE_MAX_AGE = 31536000; // 1 year

interface ConsentContextValue {
  analyticsConsent: boolean;
  accept: () => void;
  reject: () => void;
  isOpen: boolean;
  openSettings: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

function setCookie(value: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=${value}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
}

function getCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(^| )${COOKIE_NAME}=([^;]+)`));
  return match ? match[2] : null;
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [analyticsConsent, setAnalyticsConsent] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Read cookie on mount
  useEffect(() => {
    const consent = getCookie();
    if (consent === null) {
      // No cookie = first visit, show banner
      setIsOpen(true);
      setAnalyticsConsent(false);
    } else {
      setAnalyticsConsent(consent === 'accepted');
      setIsOpen(false);
    }
  }, []);

  // Listen for custom event to re-open settings
  useEffect(() => {
    const handleOpenSettings = () => setIsOpen(true);
    window.addEventListener('ydm:open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('ydm:open-cookie-settings', handleOpenSettings);
  }, []);

  const accept = () => {
    setCookie('accepted');
    setAnalyticsConsent(true);
    setIsOpen(false);
  };

  const reject = () => {
    setCookie('rejected');
    setAnalyticsConsent(false);
    setIsOpen(false);
  };

  const openSettings = () => {
    setIsOpen(true);
  };

  return (
    <ConsentContext.Provider value={{ analyticsConsent, accept, reject, isOpen, openSettings }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within a CookieConsentProvider');
  }
  return context;
}
