/**
 * FILE: CookieConsent.tsx
 * PURPOSE: Cookie consent banner UI component with accessibility features, keyboard support, and screen reader announcements.
 * ARCHITECTURE: Client component that consumes consent context, displays banner when open, handles user interactions, and provides ARIA live regions for screen readers.
 * KEY RULES: Must be accessible (ARIA attributes, keyboard navigation, screen reader support); must provide clear consent options; must announce status changes to screen readers.
 * DEPENDS ON: react, ./Button, ./CookieConsentContext (useConsent).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import { useConsent } from './CookieConsentContext';

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * WHAT IT DOES: Renders a cookie consent banner with accept/reject actions, keyboard support, and screen reader announcements.
 * @return {JSX.Element} - Consent banner or null when closed
 * SIDE EFFECTS: Manages local status state for screen reader announcements, sets up keyboard event listeners.
 * ASSUMES: Used within CookieConsentProvider; consent context provides accept/reject functions.
 */
export function CookieConsent() {
  const { isOpen, accept, reject } = useConsent();
  const [status, setStatus] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // WHY: Dismiss on Escape key for accessibility and keyboard navigation
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

  /**
   * WHAT IT DOES: Handles accept button click with screen reader status announcement.
   * @return {void}
   * SIDE EFFECTS: Updates status state for screen readers, calls context accept function.
   * ASSUMES: Called by user interaction with accept button.
   */
  const handleAccept = () => {
    setStatus('Cookie preferences saved: analytics cookies accepted.');
    accept();
  };

  /**
   * WHAT IT DOES: Handles reject button click with screen reader status announcement.
   * @return {void}
   * SIDE EFFECTS: Updates status state for screen readers, calls context reject function.
   * ASSUMES: Called by user interaction with reject button.
   */
  const handleReject = () => {
    setStatus('Cookie preferences saved: analytics cookies rejected.');
    reject();
  };

  // WHY: Trap focus inside the banner while open and restore focus to the previously focused element on dismiss
  useEffect(() => {
    if (!isOpen) return;

    const active = document.activeElement;
    previousActiveElement.current =
      active instanceof HTMLElement ? active : null;

    const dialog = dialogRef.current;
    if (dialog) {
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleTab, true);
    return () => {
      document.removeEventListener('keydown', handleTab, true);
      const previous = previousActiveElement.current;
      if (previous && document.body.contains(previous)) {
        previous.focus();
      }
    };
  }, [isOpen]);

  return (
    <>
      {isOpen ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Cookie preferences"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
          className="CookieConsent no-print fixed bottom-0 inset-x-0 z-50 bg-surface border-t border-border p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
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
      {/* WHY: ARIA live region for screen reader announcements of consent status changes */}
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
