'use client';

import { ThemeProvider } from 'next-themes';
import { CookieConsentProvider } from '@ydm-agency/ui';
import { AnalyticsProvider } from '@ydm-agency/analytics';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      storageKey="ydm-theme"
    >
      <CookieConsentProvider>
        <AnalyticsProvider gaId="" posthogKey="" metaPixelId="" />
        {children}
      </CookieConsentProvider>
    </ThemeProvider>
  );
}
