/**
 * FILE: service-labels.ts
 * PURPOSE: Provides the canonical slug-to-label and slug-to-card-description mappings for the eight services, used by navigation, headers, and service cards.
 * ARCHITECTURE: Static const records keyed by service slug; consumed by the root layout (service nav links) and service hub/cards.
 * KEY RULES: Slugs must match the keys in SERVICES_CONFIG; labels use the firm-level impersonal voice; card descriptions are benefit-focused and plain-English.
 * DEPENDS ON: None (pure data); consumed by apps/firm-website/src/app/layout.tsx and service pages.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
export const SERVICE_LABELS: Record<string, string> = {
  'web-design': 'Website Design & Development',
  'seo': 'SEO & AI Search Optimization',
  'analytics': 'Analytics & Reporting',
  'paid-ads': 'Paid Advertising',
  'branding': 'Branding & Messaging',
  'content': 'Website & Marketing Copywriting',
  'automation': 'CRM & Marketing Automation',
  'reputation': 'Reputation & Review Management',
};

export const SERVICE_CARD_DESCRIPTIONS: Record<string, string> = {
  'web-design': 'Custom sites that turn visitors into customers — fast, mobile‑ready, and built around how you do business.',
  'seo': 'Customers find you wherever they\'re searching — traditional search engines and AI‑powered tools.',
  'analytics': 'Simple, honest tracking turns data into plain‑English reports — so guessing what\'s working stops and investing in what actually brings business begins.',
  'paid-ads': 'Ads are built, managed, and optimized to turn clicks into customers — not just spend.',
  'branding': 'Messages are defined, identity is sharpened, and businesses are made unforgettable.',
  'content': 'Copy is written that sounds like you and sells like crazy — benefit‑driven, clear, and conversion‑focused.',
  'automation': 'Systems are set up that automatically follow up, remind who to call, and make sure every inquiry gets a response — personalized and on time, even while you sleep.',
  'reputation': 'Profiles are optimized, a system for collecting genuine reviews is built, and responses are handled — so your reputation works for you around the clock.',
};
