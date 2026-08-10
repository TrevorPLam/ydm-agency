/**
 * FILE: CookieSettingsButton.tsx
 * PURPOSE: Provides a button that reopens the cookie consent settings dialog by dispatching a custom window event.
 * ARCHITECTURE: Client component that guards against SSR by tracking mount state, then dispatches the 'ydm:open-cookie-settings' CustomEvent on click for the CookieConsent component to listen for.
 * KEY RULES: Must only dispatch the event after client mount (isClient guard); must use the 'ydm:open-cookie-settings' event name that CookieConsent listens for.
 * DEPENDS ON: react (useEffect, useState).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
'use client';

import { useEffect, useState } from 'react';

/**
 * WHAT IT DOES: Renders a "Cookie Settings" button that dispatches a custom event to reopen the cookie consent dialog.
 * @return {JSX.Element} - Cookie settings button
 * SIDE EFFECTS: Sets isClient on mount; dispatches a 'ydm:open-cookie-settings' CustomEvent on window when clicked after mount.
 * ASSUMES: A CookieConsent component is mounted and listening for the 'ydm:open-cookie-settings' event.
 */
export const CookieSettingsButton = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClick = () => {
    if (isClient) {
      window.dispatchEvent(new CustomEvent('ydm:open-cookie-settings'));
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-text-secondary hover:text-text-primary text-sm underline underline-offset-4"
    >
      Cookie Settings
    </button>
  );
};
