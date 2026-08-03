'use client';

import { useEffect, useState } from 'react';

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
