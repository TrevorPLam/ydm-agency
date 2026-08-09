/**
 * FILE: events.ts
 * PURPOSE: Universal analytics event tracking function that dispatches to GA4, PostHog, and Meta Pixel with consent gating.
 * ARCHITECTURE: Client-side utility that checks consent via cookie, dispatches custom event for universal listeners, and calls provider-specific tracking APIs.
 * KEY RULES: Guard window access; only track when consent is 'accepted'; support multiple analytics providers; provide development logging.
 * DEPENDS ON: DOM APIs (window, document, CustomEvent), analytics provider globals (gtag, posthog, fbq).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
/// <reference lib="dom" />
/// <reference types="node" />

export interface TrackEventOptions {
  eventName: string;
  properties?: Record<string, unknown>;
}

/**
 * WHAT IT DOES: Tracks analytics events across multiple providers (GA4, PostHog, Meta Pixel) with consent gating and custom event dispatch.
 * @param {TrackEventOptions} options - Event name and optional properties
 * @return {void}
 * SIDE EFFECTS: Dispatches custom window event, calls gtag(), posthog.capture(), and fbq.trackCustom() when consent is granted.
 * ASSUMES: Runs in browser environment with consent cookie set; provider globals are available when consent is granted.
 */
export function trackEvent({ eventName, properties = {} }: TrackEventOptions) {
  if (typeof window === 'undefined') return;

  const consent = typeof document !== 'undefined'
    ? document.cookie.match(/(?:^|; )ydm-analytics-consent=([^;]+)/)?.[1]
    : null;
  if (consent !== 'accepted') return;

  // WHY: Custom window event dispatch for universal listener pattern (allows components to listen to all analytics events)
  const event = new CustomEvent<{ eventName: string; properties: Record<string, unknown>; timestamp: string }>('ydm_analytics_event', {
    detail: { eventName, properties, timestamp: new Date().toISOString() },
  });
  window.dispatchEvent(event);

  // Google Analytics
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, properties);
  }

  // PostHog
  if (typeof window.posthog?.capture === 'function') {
    window.posthog.capture(eventName, properties);
  }

  // Meta Pixel
  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, properties);
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] Tracked: ${eventName}`, properties);
  }
}
