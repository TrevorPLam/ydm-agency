import { SERVICE_LABELS } from './service-labels';

export interface ServicePricingDetails {
  slug: string;
  title: string;
  startingRange: string;
  extras: string[];
  minimumBudgetNote?: string;
}

export const PRICING_DETAILS: Record<string, ServicePricingDetails> = {
  'web-design': {
    slug: 'web-design',
    title: SERVICE_LABELS['web-design'],
    startingRange:
      'Most custom builds start at $5,000–$12,000, depending on page count, integrations, and content needs.',
    extras: [
      'Professional copywriting and content editing',
      'Original photography or image sourcing',
      'Advanced integrations, booking, or ecommerce',
      'Ongoing maintenance and performance tuning',
    ],
  },
  'seo': {
    slug: 'seo',
    title: SERVICE_LABELS['seo'],
    startingRange:
      'Ongoing SEO and AI search work typically starts at $1,000–$2,500/month, with project-based audits starting at $1,500.',
    extras: [
      'Content production and blog writing',
      'Targeted link-building and citation campaigns',
      'Local SEO for multiple locations',
      'Technical SEO remediation beyond standard scope',
    ],
  },
  'analytics': {
    slug: 'analytics',
    title: SERVICE_LABELS['analytics'],
    startingRange:
      'Analytics and attribution setup usually starts at $2,000–$4,000, with ongoing reporting from $500/month.',
    extras: [
      'Custom dashboards and executive reporting',
      'Additional platform integrations (CRM, ads, email)',
      'Monthly or weekly reporting cadence',
      'Advanced attribution modeling and forecasting',
    ],
  },
  'paid-ads': {
    slug: 'paid-ads',
    title: SERVICE_LABELS['paid-ads'],
    startingRange:
      'Paid advertising management typically starts at $1,000–$2,500/month, separate from the ad spend paid directly to platforms.',
    extras: [
      'Landing page design and conversion copy',
      'Creative production (images, video, ad copy)',
      'Additional ad platforms (Meta, LinkedIn, YouTube)',
      'Geo or multi-location campaign management',
    ],
    minimumBudgetNote: 'A realistic starting ad spend is typically $1,500–$3,000/month, depending on cost per click, cost per lead, and how fast the campaign needs to gather optimization data.'
  },
  'branding': {
    slug: 'branding',
    title: SERVICE_LABELS['branding'],
    startingRange:
      'Branding and positioning projects typically start at $3,000–$8,000, depending on research depth and deliverables.',
    extras: [
      'Additional brand assets and templates',
      'Stationery, business cards, or collateral',
      'Brand guidelines expansion and team training',
      'Brand photography or illustration direction',
    ],
  },
  'content': {
    slug: 'content',
    title: SERVICE_LABELS['content'],
    startingRange:
      'Website and marketing copywriting typically starts at $2,000–$5,000 per project, or $1,000–$2,500/month for ongoing content.',
    extras: [
      'Additional pages, landing pages, or blog posts',
      'Ongoing blog or newsletter retainer',
      'SEO keyword research and topic mapping',
      'Email sequences and lead-nurture copy',
    ],
  },
  'automation': {
    slug: 'automation',
    title: SERVICE_LABELS['automation'],
    startingRange:
      'CRM and marketing automation setup typically starts at $1,500–$3,500, with ongoing optimization from $500/month.',
    extras: [
      'Additional automation workflows and branches',
      'Third-party integrations and API connections',
      'Advanced lead scoring and segmentation',
      'Monthly workflow optimization and reporting',
    ],
  },
  'reputation': {
    slug: 'reputation',
    title: SERVICE_LABELS['reputation'],
    startingRange:
      'Reputation and review management typically starts at $500–$1,500/month, scaled to location count and review volume.',
    extras: [
      'Review-generation materials and campaigns',
      'Additional profiles and location expansion',
      'Crisis-response and negative-review support',
      'Competitor review benchmarking and reporting',
    ],
  },
};
