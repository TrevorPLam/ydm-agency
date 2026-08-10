/**
 * FILE: pricing-estimator.ts
 * PURPOSE: Provides the pricing estimator data (services, extras, business-size and timeline multipliers) and pure calculation/lookup functions that power the PricingEstimator component and /services/pricing prefill.
 * ARCHITECTURE: Static typed data plus pure helpers; calculateEstimate applies business-size and timeline multipliers to selected services and extras, splitting results into one-time and monthly buckets; buildContactMessage serializes the estimate into a contact-form message.
 * KEY RULES: All functions must be pure; service slugs must match SERVICE_LABELS keys; extras only apply when an applicable service is selected; multipliers default to 1.0 when an option is not found.
 * DEPENDS ON: ./service-labels (SERVICE_LABELS), ./service-comparison-config (COMPARISON_SCENARIOS).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import { SERVICE_LABELS } from './service-labels';
import { COMPARISON_SCENARIOS } from './service-comparison-config';

export type BusinessSize = 'solo' | 'small' | 'multi';
export type Timeline = 'flexible' | 'standard' | 'rush';

export interface EstimatorService {
  slug: string;
  title: string;
  baseLow: number;
  baseHigh: number;
  isMonthly: boolean;
  description: string;
  included: string[];
}

export interface EstimatorExtra {
  id: string;
  label: string;
  costLow: number;
  costHigh: number;
  isMonthly?: boolean;
  appliesTo: string[];
  description?: string;
}

export interface EstimatorInputs {
  situation: string;
  services: string[];
  businessSize: BusinessSize;
  timeline: Timeline;
  extras: string[];
}

export interface EstimateItem {
  label: string;
  low: number;
  high: number;
  isMonthly: boolean;
  note?: string;
}

export interface EstimateBucket {
  low: number;
  high: number;
  items: EstimateItem[];
}

export interface EstimateResult {
  oneTime: EstimateBucket | null;
  monthly: EstimateBucket | null;
  businessSizeMultiplier: number;
  timelineMultiplier: number;
}

export interface BusinessSizeOption {
  value: BusinessSize;
  label: string;
  description: string;
  multiplier: number;
}

export interface TimelineOption {
  value: Timeline;
  label: string;
  description: string;
  multiplier: number;
}

export const BUSINESS_SIZE_OPTIONS: BusinessSizeOption[] = [
  {
    value: 'solo',
    label: 'Solo / one location',
    description: 'A single owner-operator or one-location business.',
    multiplier: 0.85,
  },
  {
    value: 'small',
    label: 'Small team / 2–5 locations',
    description: 'A small team or a few locations.',
    multiplier: 1.0,
  },
  {
    value: 'multi',
    label: 'Multi-location / larger',
    description: 'Multiple locations, more pages, or a larger scope.',
    multiplier: 1.25,
  },
];

export const TIMELINE_OPTIONS: TimelineOption[] = [
  {
    value: 'flexible',
    label: 'Flexible',
    description: 'I can wait for a standard slot.',
    multiplier: 0.95,
  },
  {
    value: 'standard',
    label: 'Standard',
    description: 'A normal turnaround (2–6 weeks for most projects).',
    multiplier: 1.0,
  },
  {
    value: 'rush',
    label: 'Rush',
    description: 'I need this to start or finish quickly.',
    multiplier: 1.15,
  },
];

export const ESTIMATOR_SERVICES: EstimatorService[] = [
  {
    slug: 'web-design',
    title: SERVICE_LABELS['web-design'],
    baseLow: 5000,
    baseHigh: 12000,
    isMonthly: false,
    description: 'A custom-built site designed around your business and conversion goals.',
    included: [
      'Custom design — no template',
      'Mobile-friendly layout',
      'On-page SEO built in',
      'Fast load speeds',
      'Contact forms and lead capture',
    ],
  },
  {
    slug: 'seo',
    title: SERVICE_LABELS['seo'],
    baseLow: 1000,
    baseHigh: 2500,
    isMonthly: true,
    description: 'Ongoing SEO and AI search work that makes you findable over time.',
    included: [
      'Technical SEO audit and fixes',
      'On-page optimization',
      'Local SEO and Google Business Profile',
      'AI search readiness',
      'Plain-English monthly reporting',
    ],
  },
  {
    slug: 'analytics',
    title: SERVICE_LABELS['analytics'],
    baseLow: 2000,
    baseHigh: 4000,
    isMonthly: false,
    description: 'Clean tracking, conversion measurement, and plain-English reporting.',
    included: [
      'Channel and conversion tracking setup',
      'Page performance and drop-off analysis',
      'Live dashboard',
      'Plain-English monthly report',
      '1–2 prioritized action items',
    ],
  },
  {
    slug: 'paid-ads',
    title: SERVICE_LABELS['paid-ads'],
    baseLow: 1000,
    baseHigh: 2500,
    isMonthly: true,
    description: 'Campaign strategy, build, and active weekly optimization.',
    included: [
      'Campaign strategy and keyword/audience research',
      'Ad creative setup',
      'Conversion tracking',
      'Weekly optimization and A/B testing',
      'Monthly plain-English report',
    ],
  },
  {
    slug: 'branding',
    title: SERVICE_LABELS['branding'],
    baseLow: 3000,
    baseHigh: 8000,
    isMonthly: false,
    description: 'Positioning, messaging, and visual identity that makes you unforgettable.',
    included: [
      'Positioning statement',
      'Core messaging',
      'Logo refinement or creation',
      'Color palette and typography',
      'Simple brand style guide',
    ],
  },
  {
    slug: 'content',
    title: SERVICE_LABELS['content'],
    baseLow: 2000,
    baseHigh: 5000,
    isMonthly: false,
    description: 'Website and marketing copy that sounds like you and sells.',
    included: [
      'Voice capture and research',
      'SEO-aware copy',
      'Website, landing page, or marketing copy',
      'Two rounds of revisions',
      'Final copy ready for design or publication',
    ],
  },
  {
    slug: 'automation',
    title: SERVICE_LABELS['automation'],
    baseLow: 1500,
    baseHigh: 3500,
    isMonthly: false,
    description: 'CRM and marketing automation that captures and nurtures leads.',
    included: [
      'Lead-flow audit and roadmap',
      'Workflow and automation setup',
      'CRM integration and tagging',
      'Lead scoring and segmentation',
      'Handoff documentation',
    ],
  },
  {
    slug: 'reputation',
    title: SERVICE_LABELS['reputation'],
    baseLow: 500,
    baseHigh: 1500,
    isMonthly: true,
    description: 'Review generation, profile optimization, and response management.',
    included: [
      'Google Business Profile optimization',
      'Review-generation system',
      'Review response workflow',
      'Competitor benchmarking',
      'Monthly reporting',
    ],
  },
];

export const ESTIMATOR_EXTRAS: EstimatorExtra[] = [
  {
    id: 'copywriting',
    label: 'Professional copywriting',
    costLow: 500,
    costHigh: 2000,
    appliesTo: ['web-design', 'branding', 'content'],
    description: 'Extra pages, marketing copy, or content editing beyond the base scope.',
  },
  {
    id: 'photography',
    label: 'Original photography / image sourcing',
    costLow: 500,
    costHigh: 1500,
    appliesTo: ['web-design', 'branding', 'content', 'paid-ads'],
    description: 'Custom photos or curated images for the site, ads, or brand.',
  },
  {
    id: 'ecommerce-booking',
    label: 'E-commerce, booking, or advanced integrations',
    costLow: 2000,
    costHigh: 5000,
    appliesTo: ['web-design'],
    description: 'Online store, booking system, membership, or custom integration.',
  },
  {
    id: 'advanced-integrations',
    label: 'Advanced CRM / API integrations',
    costLow: 1000,
    costHigh: 3000,
    appliesTo: ['web-design', 'automation', 'analytics'],
    description: 'Connecting additional platforms, custom APIs, or complex data flows.',
  },
  {
    id: 'landing-pages',
    label: 'Dedicated landing pages',
    costLow: 1000,
    costHigh: 2000,
    appliesTo: ['paid-ads', 'web-design'],
    description: 'Conversion-focused landing pages built for specific campaigns.',
  },
  {
    id: 'multi-location',
    label: 'Multiple locations',
    costLow: 300,
    costHigh: 800,
    isMonthly: true,
    appliesTo: ['seo', 'paid-ads', 'reputation'],
    description: 'Extra location targeting, listings, and local optimization.',
  },
  {
    id: 'ad-spend',
    label: 'Recommended monthly ad spend',
    costLow: 1500,
    costHigh: 3000,
    isMonthly: true,
    appliesTo: ['paid-ads'],
    description: 'Amount paid directly to Google, Meta, or other ad platforms (not to YDM Agency).',
  },
  {
    id: 'ongoing-care',
    label: 'Ongoing maintenance / optimization',
    costLow: 500,
    costHigh: 1500,
    isMonthly: true,
    appliesTo: ['web-design', 'analytics', 'automation', 'content'],
    description: 'Monthly care, reporting, or content/optimization retainer.',
  },
  {
    id: 'video-motion',
    label: 'Video / motion graphics',
    costLow: 800,
    costHigh: 2500,
    appliesTo: ['web-design', 'content', 'branding', 'paid-ads'],
    description: 'Short video or motion content for the site, ads, or brand.',
  },
  {
    id: 'seo-audit',
    label: 'One-time SEO / AI search audit',
    costLow: 1500,
    costHigh: 2000,
    appliesTo: ['seo'],
    description: 'A standalone technical and strategic audit before deciding on ongoing work.',
  },
];

/**
 * WHAT IT DOES: Returns the default service slugs (primary plus also-consider) for a comparison scenario by its id.
 * @param {string} situationId - Comparison scenario id
 * @return {string[]} - Service slugs for the scenario, or an empty array if not found
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: situationId matches a COMPARISON_SCENARIOS entry id.
 */
export function getDefaultServicesForSituation(situationId: string): string[] {
  const scenario = COMPARISON_SCENARIOS.find((s) => s.id === situationId);
  if (!scenario) return [];
  return [scenario.primaryService, ...scenario.alsoConsider];
}

/**
 * WHAT IT DOES: Finds the id of the comparison scenario whose primary service matches the given slug.
 * @param {string} slug - Service slug
 * @return {string | undefined} - Scenario id, or undefined if no scenario has this slug as its primary service
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: None.
 */
export function getPrimaryScenarioForService(slug: string): string | undefined {
  return COMPARISON_SCENARIOS.find((s) => s.primaryService === slug)?.id;
}

/**
 * WHAT IT DOES: Builds a /services/pricing href prefilled with the scenario (if a primary scenario exists for the slug) or the service slug directly.
 * @param {string} slug - Service slug
 * @return {string} - Pricing page href with situation or services query parameter
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: None.
 */
export function getEstimateHref(slug: string): string {
  const scenarioId = getPrimaryScenarioForService(slug);
  if (scenarioId) return `/services/pricing?situation=${scenarioId}`;
  return `/services/pricing?services=${slug}`;
}

/**
 * WHAT IT DOES: Looks up an estimator service by its slug.
 * @param {string} slug - Service slug
 * @return {EstimatorService | undefined} - Matching service, or undefined if not found
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: None.
 */
export function getServiceBySlug(slug: string): EstimatorService | undefined {
  return ESTIMATOR_SERVICES.find((s) => s.slug === slug);
}

/**
 * WHAT IT DOES: Looks up an estimator extra by its id.
 * @param {string} id - Extra id
 * @return {EstimatorExtra | undefined} - Matching extra, or undefined if not found
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: None.
 */
export function getExtraById(id: string): EstimatorExtra | undefined {
  return ESTIMATOR_EXTRAS.find((e) => e.id === id);
}

/**
 * WHAT IT DOES: Returns the extras that apply to at least one of the selected services.
 * @param {string[]} services - Selected service slugs
 * @return {EstimatorExtra[]} - Extras whose appliesTo list intersects the selected services
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: None.
 */
export function getRelevantExtras(services: string[]): EstimatorExtra[] {
  return ESTIMATOR_EXTRAS.filter((extra) =>
    extra.appliesTo.some((slug) => services.includes(slug))
  );
}

/**
 * WHAT IT DOES: Returns the price multiplier for a business size, defaulting to 1.0 if the option is not found.
 * @param {BusinessSize} size - Business size value
 * @return {number} - Multiplier to apply to base price ranges
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: None.
 */
export function getBusinessSizeMultiplier(size: BusinessSize): number {
  return BUSINESS_SIZE_OPTIONS.find((o) => o.value === size)?.multiplier ?? 1.0;
}

/**
 * WHAT IT DOES: Returns the price multiplier for a timeline option, defaulting to 1.0 if the option is not found.
 * @param {Timeline} timeline - Timeline value
 * @return {number} - Multiplier to apply to base price ranges
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: None.
 */
export function getTimelineMultiplier(timeline: Timeline): number {
  return TIMELINE_OPTIONS.find((o) => o.value === timeline)?.multiplier ?? 1.0;
}

/**
 * WHAT IT DOES: Formats a low/high price pair as a USD currency range string with no fractional digits (e.g., "$5,000–$12,000").
 * @param {number} low - Lower bound of the range
 * @param {number} high - Upper bound of the range
 * @return {string} - Formatted currency range string
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: low <= high.
 */
export function formatPriceRange(low: number, high: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
  return `${formatter.format(low)}–${formatter.format(high)}`;
}

/**
 * WHAT IT DOES: Calculates a pricing estimate by applying business-size and timeline multipliers to selected services and adding applicable extras, splitting results into one-time and monthly buckets.
 * @param {EstimatorInputs} inputs - Selected situation, services, business size, timeline, and extras
 * @return {EstimateResult} - One-time and monthly estimate buckets with the applied multipliers
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: Extras are only included when an applicable service is selected; unknown slugs/ids are skipped.
 */
export function calculateEstimate(inputs: EstimatorInputs): EstimateResult {
  const businessSizeMultiplier = getBusinessSizeMultiplier(inputs.businessSize);
  const timelineMultiplier = getTimelineMultiplier(inputs.timeline);

  const oneTimeItems: EstimateItem[] = [];
  const monthlyItems: EstimateItem[] = [];

  for (const slug of inputs.services) {
    const service = getServiceBySlug(slug);
    if (!service) continue;

    const low = Math.round(service.baseLow * businessSizeMultiplier * timelineMultiplier);
    const high = Math.round(service.baseHigh * businessSizeMultiplier * timelineMultiplier);

    const item: EstimateItem = {
      label: service.title,
      low,
      high,
      isMonthly: service.isMonthly,
      note: service.isMonthly ? 'Monthly management or retainer' : 'One-time project',
    };

    if (service.isMonthly) {
      monthlyItems.push(item);
    } else {
      oneTimeItems.push(item);
    }
  }

  for (const extraId of inputs.extras) {
    const extra = getExtraById(extraId);
    if (!extra) continue;

    const hasApplicableService = extra.appliesTo.some((slug) => inputs.services.includes(slug));
    if (!hasApplicableService) continue;

    const item: EstimateItem = {
      label: extra.label,
      low: extra.costLow,
      high: extra.costHigh,
      isMonthly: extra.isMonthly ?? false,
      note: extra.description,
    };

    if (item.isMonthly) {
      monthlyItems.push(item);
    } else {
      oneTimeItems.push(item);
    }
  }

  const oneTime = oneTimeItems.length
    ? {
        low: oneTimeItems.reduce((sum, item) => sum + item.low, 0),
        high: oneTimeItems.reduce((sum, item) => sum + item.high, 0),
        items: oneTimeItems,
      }
    : null;

  const monthly = monthlyItems.length
    ? {
        low: monthlyItems.reduce((sum, item) => sum + item.low, 0),
        high: monthlyItems.reduce((sum, item) => sum + item.high, 0),
        items: monthlyItems,
      }
    : null;

  return {
    oneTime,
    monthly,
    businessSizeMultiplier,
    timelineMultiplier,
  };
}

/**
 * WHAT IT DOES: Maps a set of selected service slugs to a contact-form project type ('website', 'traffic-leads', or 'other'), or undefined when no services are selected.
 * @param {string[]} services - Selected service slugs
 * @return {'website' | 'traffic-leads' | 'other' | undefined} - Project type for the contact form
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: Service slugs fall into website or traffic service groups; mixed selections map to 'other'.
 */
export function getProjectTypeForContact(services: string[]): 'website' | 'traffic-leads' | 'other' | undefined {
  if (services.length === 0) return undefined;

  const websiteServices = ['web-design', 'branding', 'content'];
  const trafficServices = ['seo', 'paid-ads', 'analytics', 'automation', 'reputation'];

  const hasWebsite = services.some((s) => websiteServices.includes(s));
  const hasTraffic = services.some((s) => trafficServices.includes(s));

  if (hasWebsite && !hasTraffic) return 'website';
  if (hasTraffic && !hasWebsite) return 'traffic-leads';
  return 'other';
}

/**
 * WHAT IT DOES: Serializes the estimator inputs and result into a human-readable contact-form message describing the situation, services, business size, timeline, extras, and estimated investment ranges.
 * @param {EstimatorInputs} inputs - Selected situation, services, business size, timeline, and extras
 * @param {EstimateResult} result - Calculated estimate buckets
 * @return {string} - Newline-joined contact message body
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: inputs and result are consistent (result derived from inputs via calculateEstimate).
 */
export function buildContactMessage(inputs: EstimatorInputs, result: EstimateResult): string {
  const scenario = COMPARISON_SCENARIOS.find((s) => s.id === inputs.situation);
  const sizeOption = BUSINESS_SIZE_OPTIONS.find((o) => o.value === inputs.businessSize);
  const timelineOption = TIMELINE_OPTIONS.find((o) => o.value === inputs.timeline);

  const serviceLabels = inputs.services
    .map((slug) => getServiceBySlug(slug)?.title ?? slug)
    .join(', ');

  const extraLabels = inputs.extras
    .map((id) => getExtraById(id)?.label ?? id)
    .join(', ') || 'None selected';

  const lines: string[] = [
    'I used the project estimator on the YDM Agency pricing page and got a ballpark range.',
    '',
    `Current situation: ${scenario?.title ?? inputs.situation}`,
    `Services I'm interested in: ${serviceLabels}`,
    `Business size: ${sizeOption?.label ?? inputs.businessSize}`,
    `Timeline: ${timelineOption?.label ?? inputs.timeline}`,
    `Extras: ${extraLabels}`,
  ];

  if (result.oneTime) {
    lines.push('', `Estimated one-time investment: ${formatPriceRange(result.oneTime.low, result.oneTime.high)}`);
  }

  if (result.monthly) {
    lines.push('', `Estimated monthly investment: ${formatPriceRange(result.monthly.low, result.monthly.high)}`);
    if (result.monthly.items.some((i) => i.label === 'Recommended monthly ad spend')) {
      lines.push('(Ad spend is paid directly to the advertising platforms, not to YDM Agency.)');
    }
  }

  lines.push(
    '',
    "I'd like a free project outline to confirm scope and get a precise, no-obligation quote.",
    '',
    'Feel free to reply with any questions about the estimate.'
  );

  return lines.join('\n');
}
