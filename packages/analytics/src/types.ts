/// <reference lib="dom" />

export type Gtag = (...args: unknown[]) => void;

export interface PostHog {
  capture: (eventName: string, properties?: Record<string, unknown>) => void;
}

export type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    posthog?: PostHog;
    fbq?: Fbq;
    dataLayer?: unknown[];
  }
}
