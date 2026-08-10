/**
 * FILE: constants.ts
 * PURPOSE: Pricing estimator constants and types
 */
import { SERVICE_LABELS } from '../service-labels';

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
