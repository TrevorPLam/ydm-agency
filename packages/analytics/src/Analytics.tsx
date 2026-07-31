'use client';

/// <reference lib="dom" />
import { useEffect } from 'react';
import Script from 'next/script';
import { useConsent } from '@ydm-agency/ui';

export interface AnalyticsProps {
  gaId?: string;
  posthogKey?: string;
  metaPixelId?: string;
}

export function AnalyticsProvider({ gaId, posthogKey, metaPixelId }: AnalyticsProps) {
  const { analyticsConsent } = useConsent();

  useEffect(() => {
    if (analyticsConsent && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  }, [analyticsConsent]);

  return (
    <>
      {analyticsConsent && gaId && (
        <>
          <Script
            id="ga-script"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script
            id="ga-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { page_path: window.location.pathname });
              `,
            }}
          />
        </>
      )}

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
