/**
 * FILE: CookieSettingsButton.tsx
 * PURPOSE: Exposes a button that reopens the cookie consent banner.
 * ARCHITECTURE: Client component dispatching a custom window event consumed by CookieConsentContext.
 * KEY RULES: This package is an orphaned/broken fork of packages/ui and is excluded from the pnpm workspace; do not modify logic.
 * DEPENDS ON: React, ./CookieConsentContext (event contract).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

'use client';

import { useEffect, useState } from 'react';

/**
 * WHAT IT DOES: Renders a button that reopens the cookie consent settings dialog.
 * @param none – This component accepts no props.
 * @return {React.ReactElement} – A button that dispatches the open-settings event.
 * SIDE EFFECTS: Dispatches a `ydm:open-cookie-settings` CustomEvent on the window when clicked.
 * ASSUMES: A CookieConsentProvider is listening for the custom event; runs only on the client.
 */
export const CookieSettingsButton = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  /**
   * WHAT IT DOES: Dispatches the custom event to reopen cookie settings.
   * @param none – This function takes no arguments.
   * @return {void}
   * SIDE EFFECTS: Dispatches `ydm:open-cookie-settings` on the window when client-side.
   * ASSUMES: `isClient` is true before dispatching.
   */
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
