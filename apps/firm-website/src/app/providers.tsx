/**
 * FILE: providers.tsx
 * PURPOSE: Root application provider composition that sets up theme, cookie consent, and analytics contexts for the entire app.
 * ARCHITECTURE: Client component that composes next-themes ThemeProvider, custom CookieConsentProvider, and AnalyticsProvider in nested hierarchy.
 * KEY RULES: Analytics must be nested inside consent provider for consent gating; theme provider must be outermost for CSS variable scope; environment variables must be validated.
 * DEPENDS ON: next-themes, @ydm-agency/ui (CookieConsentProvider), @ydm-agency/analytics (AnalyticsProvider).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
'use client';

import { ThemeProvider } from 'next-themes';
import { CookieConsentProvider } from '@ydm-agency/ui';
import { AnalyticsProvider } from '@ydm-agency/analytics';

/**
 * WHAT IT DOES: Composes all application context providers in the correct nesting order for theme, consent, and analytics functionality.
 * @param {{ children: React.ReactNode }} props - Application component tree
 * @return {JSX.Element} - Provider-wrapped component tree
 * SIDE EFFECTS: Initializes theme context, cookie consent state, and analytics injection based on environment variables.
 * ASSUMES: Environment variables for analytics IDs are set (empty strings are valid for no-analytics mode); runs in client context.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      storageKey="ydm-theme"
    >
      <CookieConsentProvider>
        {/* WHY: Analytics nested inside consent provider to enable consent-gated script loading */}
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
