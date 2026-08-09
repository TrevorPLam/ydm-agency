/**
 * FILE: Analytics.tsx
 * PURPOSE: Inject analytics providers (GA4, PostHog, Meta Pixel) with consent-gated loading and gtag consent updates.
 * ARCHITECTURE: Client component that observes CookieConsentContext, conditionally renders third-party scripts, and defers gtag('consent','update') until the GA4 script has actually loaded.
 * KEY RULES: Guard window access; never call gtag before window.gtag exists; avoid duplicate consent updates; keep default analytics_storage denied.
 * DEPENDS ON: next/script, react, @ydm-agency/ui (CookieConsentContext/useConsent)
 * LAST UPDATED: 2026-08-09 Fix gtag consent timing race
 */
'use client';

/// <reference lib="dom" />
import { useCallback, useEffect, useRef } from 'react';
import Script from 'next/script';
import { useConsent } from '@ydm-agency/ui';

export interface AnalyticsProps {
  gaId?: string;
  posthogKey?: string;
  metaPixelId?: string;
}

/**
 * WHAT IT DOES: Coordinates analytics script injection and gtag consent state.
 * @param {AnalyticsProps} props - analytics provider IDs
 * @return {JSX.Element | null} - script tags or fragment
 * SIDE EFFECTS: Defines window.gtag and window.dataLayer, pushes consent and config commands to the GA4 dataLayer, loads PostHog and Meta Pixel when consent is granted.
 * ASSUMES: Runs inside a CookieConsentProvider; window exists (client-only).
 */
export function AnalyticsProvider({ gaId, posthogKey, metaPixelId }: AnalyticsProps) {
  const { analyticsConsent } = useConsent();
  const consentRef = useRef(analyticsConsent);
  const lastConsentRef = useRef(analyticsConsent);

  // WHY: Sync consentRef with current consent value for use in updateConsent callback
  useEffect(() => {
    consentRef.current = analyticsConsent;
  }, [analyticsConsent]);

  /**
   * WHAT IT DOES: Sends the current consent state to gtag when window.gtag is available, skipping duplicate or premature calls.
   * @return {void}
   * SIDE EFFECTS: Calls window.gtag('consent','update') when gtag exists and the consent value has changed since the last successful call.
   * ASSUMES: consentRef is kept in sync by the parent effect; lastConsentRef is per-instance and starts at the initial analyticsConsent value.
   */
  const updateConsent = useCallback(() => {
    if (typeof window === 'undefined' || !(window as any).gtag) return;
    // WHY: Skip duplicate consent updates to prevent redundant gtag calls
    if (lastConsentRef.current === consentRef.current) return;
    lastConsentRef.current = consentRef.current;
    (window as any).gtag('consent', 'update', {
      analytics_storage: consentRef.current ? 'granted' : 'denied',
    });
  }, []);

  // WHY: Trigger consent update whenever consent state changes
  useEffect(() => {
    updateConsent();
  }, [analyticsConsent, updateConsent]);

  return (
    <>
      {analyticsConsent && gaId && (
        <>
          {/* WHY: Load GA4 gtag.js script only when consent is granted, trigger consent update on load */}
          <Script
            id="ga-script"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            onLoad={updateConsent}
          />
          {/* WHY: Initialize GA4 with default consent denied, then configure tracking */}
          <Script
            id="ga-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', { analytics_storage: 'denied' });
                gtag('js', new Date());
                gtag('config', '${gaId}', { page_path: window.location.pathname });
              `,
            }}
          />
        </>
      )}

      {/* WHY: Load PostHog only when consent is granted */}
      {analyticsConsent && posthogKey && (
        <Script
          id="posthog-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}var w=e;for("undefined"!=typeof a?w=e[a]=[]:a="posthog",w.people=w.people||[],w.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},w.people.toString=function(){return w.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(w,o[n]);e._i.push([i,s,a])},e.__SV=1.0}(document,window.posthog||[]);
              posthog.init('${posthogKey}',{api_host:'https://app.posthog.com'});
            `,
          }}
        />
      )}

      {/* WHY: Load Meta Pixel only when consent is granted */}
      {analyticsConsent && metaPixelId && (
        <Script
          id="meta-pixel-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}
    </>
  );
}
