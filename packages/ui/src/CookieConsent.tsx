'use client';

import { useEffect } from 'react';
import { Button } from './Button';
import { useConsent } from './CookieConsentContext';

export function CookieConsent() {
  const { isOpen, accept, reject } = useConsent();

  // Dismiss on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        reject();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, reject]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-surface border-t border-border p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <p className="text-text-secondary text-sm max-w-2xl">
        This site uses analytics cookies to understand how visitors use the site.
      </p>
      <div className="flex gap-3">
        <Button variant="primary" size="sm" onClick={accept}>
          Accept
        </Button>
        <Button variant="secondary" size="sm" onClick={reject}>
          Reject
        </Button>
      </div>
    </div>
  );
}
