/**
 * FILE: types.ts
 * PURPOSE: TypeScript type definitions for the global analytics provider APIs used by GA4, PostHog, and Meta Pixel.
 * ARCHITECTURE: Declares provider-specific function and interface types, then augments the global Window interface with optional analytics globals.
 * KEY RULES: Types must remain provider-agnostic where possible; Window augmentation must use optional (undefined) properties and not introduce runtime code.
 * DEPENDS ON: TypeScript DOM lib (via /// <reference lib="dom" />).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
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
