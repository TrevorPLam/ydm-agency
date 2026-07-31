/// <reference lib="dom" />
/// <reference types="node" />

export interface TrackEventOptions {
  eventName: string;
  properties?: Record<string, any>;
}

export function trackEvent({ eventName, properties = {} }: TrackEventOptions) {
  if (typeof window === 'undefined') return;

  const consent = typeof document !== 'undefined'
    ? document.cookie.match(/(?:^|; )ydm-analytics-consent=([^;]+)/)?.[1]
    : null;
  if (consent !== 'accepted') return;

  // Custom window event dispatch for universal listener
  const event = new CustomEvent('ydm_analytics_event', {
    detail: { eventName, properties, timestamp: new Date().toISOString() },
  });
  window.dispatchEvent(event);

  // Google Analytics
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', eventName, properties);
  }

  // PostHog
  if ((window as any).posthog && typeof (window as any).posthog.capture === 'function') {
    (window as any).posthog.capture(eventName, properties);
  }

  // Meta Pixel
  if (typeof (window as any).fbq === 'function') {
    (window as any).fbq('trackCustom', eventName, properties);
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] Tracked: ${eventName}`, properties);
  }
}
