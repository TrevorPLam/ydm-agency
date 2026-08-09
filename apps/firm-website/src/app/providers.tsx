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
        <AnalyticsProvider
          gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
          posthogKey={process.env.NEXT_PUBLIC_POSTHOG_KEY}
          metaPixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID}
        />
        {children}
      </CookieConsentProvider>
    </ThemeProvider>
  );
}
