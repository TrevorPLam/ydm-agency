/**
 * FILE: events.ts
 * PURPOSE: Universal analytics event tracking function that dispatches to GA4, PostHog, and Meta Pixel with consent gating.
 * ARCHITECTURE: Client-side utility that checks consent via cookie and calls provider-specific tracking APIs.
 * KEY RULES: Guard window access; only track when consent is 'accepted'; support multiple analytics providers; provide development logging.
 * DEPENDS ON: DOM APIs (window, document), analytics provider globals (gtag, posthog, fbq).
 * LAST UPDATED: 2026-08-09 Refactor typing and consent handling
 */
/// <reference lib="dom" />
/// <reference types="node" />

export type EventPropertyValue = string | number | boolean | null | undefined;
export type EventProperties = Record<string, EventPropertyValue>;

export const EVENT_NAMES = {
  FORM_SUBMISSION: 'form_submission',
  LEAD_FORM_SUBMITTED: 'lead_form_submitted',
  PRICING_ESTIMATOR_STARTED: 'pricing_estimator_started',
  PRICING_ESTIMATOR_STEP_CHANGED: 'pricing_estimator_step_changed',
  PRICING_ESTIMATOR_RESTARTED: 'pricing_estimator_restarted',
  PRICING_ESTIMATOR_COMPLETED: 'pricing_estimator_completed',
  PRICING_ESTIMATOR_CTA_CLICKED: 'pricing_estimator_cta_clicked',
  LESSON_FILTER: 'lesson_filter',
  LESSON_SHARE_LINK_COPY: 'lesson_share_link_copy',
  LESSON_SHARE: 'lesson_share',
  EDUCATION_SEARCH: 'education_search',
  LESSON_VIEW: 'lesson_view',
  TOPIC_VIEW: 'topic_view',
} as const;

export type AnalyticsEventName = (typeof EVENT_NAMES)[keyof typeof EVENT_NAMES];

export interface TrackEventOptions<TName extends string = string> {
  eventName: TName;
  properties?: EventProperties;
}

const COOKIE_NAME = 'ydm-analytics-consent' as const;
const CONSENT_ACCEPTED = 'accepted' as const;

/**
 * WHAT IT DOES: Reads the analytics consent cookie and returns whether it is set to 'accepted'.
 * @return {boolean} - true if consent is granted, false otherwise
 * SIDE EFFECTS: None (read-only cookie access).
 * ASSUMES: Runs in browser environment; document.cookie is accessible.
 */
function hasConsent(): boolean {
  if (typeof document === 'undefined') return false;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]+)`));
  return match?.[1] === CONSENT_ACCEPTED;
}

/**
 * WHAT IT DOES: Tracks analytics events across multiple providers (GA4, PostHog, Meta Pixel) with consent gating.
 * @param {TrackEventOptions} options - Event name and optional properties
 * @return {void}
 * SIDE EFFECTS: Calls gtag(), posthog.capture(), and fbq.trackCustom() when consent is granted.
 * ASSUMES: Runs in browser environment with consent cookie set; provider globals are available when consent is granted.
 */
export function trackEvent<TName extends string>({
  eventName,
  properties = {},
}: TrackEventOptions<TName>): void {
  if (typeof window === 'undefined') return;
  if (!hasConsent()) return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, properties);
  }

  if (typeof window.posthog?.capture === 'function') {
    window.posthog.capture(eventName, properties);
  }

  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, properties);
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] Tracked: ${eventName}`, properties);
  }
}
