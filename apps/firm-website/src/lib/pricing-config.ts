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
      '[[PLACEHOLDER: Add typical starting range for custom website design and development.]]',
    extras: [
      '[[PLACEHOLDER: Add common extras for website design, e.g., professional copywriting, photography, advanced integrations, ecommerce functionality.]]',
    ],
  },
  'seo': {
    slug: 'seo',
    title: SERVICE_LABELS['seo'],
    startingRange:
      '[[PLACEHOLDER: Add typical monthly or project-based starting range for SEO and AI search optimization.]]',
    extras: [
      '[[PLACEHOLDER: Add common extras for SEO, e.g., content production, link-building campaigns, local citation services.]]',
    ],
  },
  'maintenance': {
    slug: 'maintenance',
    title: SERVICE_LABELS['maintenance'],
    startingRange:
      '[[PLACEHOLDER: Add typical monthly starting range for website maintenance plans.]]',
    extras: [
      '[[PLACEHOLDER: Add common extras for maintenance, e.g., extra content update hours, emergency support, additional site monitoring.]]',
    ],
  },
  'analytics': {
    slug: 'analytics',
    title: SERVICE_LABELS['analytics'],
    startingRange:
      '[[PLACEHOLDER: Add typical starting range for analytics and attribution setup.]]',
    extras: [
      '[[PLACEHOLDER: Add common extras for analytics, e.g., custom dashboards, additional platform integrations, monthly reporting.]]',
    ],
  },
  'paid-ads': {
    slug: 'paid-ads',
    title: SERVICE_LABELS['paid-ads'],
    startingRange:
      '[[PLACEHOLDER: Add typical management-fee starting range for paid advertising.]]',
    extras: [
      '[[PLACEHOLDER: Add common extras for paid ads, e.g., landing page design, creative production, additional ad platforms.]]',
    ],
    minimumBudgetNote: 'A recommended minimum ad spend of $500/month is typical.',
  },
  'branding': {
    slug: 'branding',
    title: SERVICE_LABELS['branding'],
    startingRange:
      '[[PLACEHOLDER: Add typical starting range for branding and positioning.]]',
    extras: [
      '[[PLACEHOLDER: Add common extras for branding, e.g., additional brand assets, stationery, brand guidelines expansion.]]',
    ],
  },
  'content': {
    slug: 'content',
    title: SERVICE_LABELS['content'],
    startingRange:
      '[[PLACEHOLDER: Add typical starting range for content and copywriting.]]',
    extras: [
      '[[PLACEHOLDER: Add common extras for content, e.g., additional pages, ongoing blog retainers, SEO keyword research.]]',
    ],
  },
  'automation': {
    slug: 'automation',
    title: SERVICE_LABELS['automation'],
    startingRange:
      '[[PLACEHOLDER: Add typical starting range for CRM setup and marketing automation.]]',
    extras: [
      '[[PLACEHOLDER: Add common extras for automation, e.g., additional workflows, integrations, advanced lead scoring.]]',
    ],
  },
  'reputation': {
    slug: 'reputation',
    title: SERVICE_LABELS['reputation'],
    startingRange:
      '[[PLACEHOLDER: Add typical starting range for reputation and review management.]]',
    extras: [
      '[[PLACEHOLDER: Add common extras for reputation, e.g., review-generation materials, additional profiles, crisis-response support.]]',
    ],
  },
};
