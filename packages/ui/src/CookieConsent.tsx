'use client';

import { useEffect, useState } from 'react';
import { Button } from './Button';
import { useConsent } from './CookieConsentContext';

export function CookieConsent() {
  const { isOpen, accept, reject } = useConsent();
  const [status, setStatus] = useState<string | null>(null);

  // Dismiss on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setStatus('Cookie preferences saved: analytics cookies rejected.');
        reject();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, reject]);

  const handleAccept = () => {
    setStatus('Cookie preferences saved: analytics cookies accepted.');
    accept();
  };

  const handleReject = () => {
    setStatus('Cookie preferences saved: analytics cookies rejected.');
    reject();
  };

  return (
    <>
      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
          className="fixed bottom-0 inset-x-0 z-50 bg-surface border-t border-border p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex flex-col gap-2">
            <h2
              id="cookie-consent-title"
              className="text-text-primary text-base font-semibold"
            >
              Cookie preferences
            </h2>
            <p
              id="cookie-consent-description"
              className="text-text-secondary text-sm max-w-2xl"
            >
              This site uses analytics cookies to understand how visitors use the site.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="primary" size="sm" onClick={handleAccept}>
              Accept
            </Button>
            <Button variant="secondary" size="sm" onClick={handleReject}>
              Reject
            </Button>
          </div>
        </div>
      ) : null}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {status}
      </div>
    </>
  );
}
