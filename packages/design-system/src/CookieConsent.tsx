/**
 * FILE: CookieConsent.tsx
 * PURPOSE: Displays and manages the analytics cookie consent banner.
 * ARCHITECTURE: Client component relying on CookieConsentContext for state and keyboard dismissal.
 * KEY RULES: This package is an orphaned/broken fork of packages/ui and is excluded from the pnpm workspace; do not modify logic.
 * DEPENDS ON: React, ./Button, ./CookieConsentContext.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

'use client';

import { useEffect } from 'react';
import { Button } from './Button';
import { useConsent } from './CookieConsentContext';

/**
 * WHAT IT DOES: Displays the analytics cookie consent banner and handles Escape-key dismissal.
 * @param none – This component accepts no props.
 * @return {React.ReactElement | null} – The consent banner or null when closed.
 * SIDE EFFECTS: Registers and removes a window keydown listener; calls reject() on Escape.
 * ASSUMES: Rendered inside a CookieConsentProvider; window is defined (client component).
 */
export function CookieConsent() {
  const { isOpen, accept, reject } = useConsent();

  useEffect(() => {
    /**
     * WHAT IT DOES: Dismisses the banner when the user presses Escape.
     * @param {KeyboardEvent} e – The keyboard event.
     * @return {void}
     * SIDE EFFECTS: Calls reject() when Escape is pressed and the banner is open.
     * ASSUMES: isOpen and reject are in scope.
     */
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
