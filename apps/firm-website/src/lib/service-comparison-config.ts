export interface ServiceComparisonScenario {
  id: string;
  title: string;
  description: string;
  primaryService: string;
  alsoConsider: string[];
  startingPoint: string;
}

export const COMPARISON_SCENARIOS: ServiceComparisonScenario[] = [
  {
    id: 'no-website',
    title: 'I have no website or the current one is outdated',
    description:
      '[[PLACEHOLDER: Add scenario copy for businesses without a website or with an outdated site. Mention how to choose between custom design, maintenance, and quick fixes.]]',
    primaryService: 'web-design',
    alsoConsider: ['maintenance', 'seo'],
    startingPoint: 'A free project outline for a new website build.',
  },
  {
    id: 'low-traffic',
    title: 'My website gets little or no search traffic',
    description:
      '[[PLACEHOLDER: Add scenario copy for businesses invisible in search. Mention SEO, AI search readiness, and content.]]',
    primaryService: 'seo',
    alsoConsider: ['content', 'web-design'],
    startingPoint: 'An SEO and AI search audit to identify quick wins.',
  },
  {
    id: 'traffic-no-leads',
    title: 'I have traffic but few conversions or leads',
    description:
      '[[PLACEHOLDER: Add scenario copy for businesses with visitors but low conversion. Mention analytics, conversion copy, and landing pages.]]',
    primaryService: 'analytics',
    alsoConsider: ['paid-ads', 'content'],
    startingPoint: 'A conversion tracking and page review.',
  },
  {
    id: 'need-leads-now',
    title: 'I need leads this month, not in six months',
    description:
      '[[PLACEHOLDER: Add scenario copy for businesses needing fast lead flow. Mention paid ads, landing pages, and minimum budget considerations.]]',
    primaryService: 'paid-ads',
    alsoConsider: ['analytics', 'web-design'],
    startingPoint: 'A paid ads strategy with a dedicated landing page.',
  },
  {
    id: 'leads-slip',
    title: 'Inquiries fall through the cracks after they come in',
    description:
      '[[PLACEHOLDER: Add scenario copy for businesses losing leads to slow follow-up. Mention CRM and marketing automation.]]',
    primaryService: 'automation',
    alsoConsider: ['analytics', 'reputation'],
    startingPoint: 'A lead-flow audit and automation roadmap.',
  },
  {
    id: 'reputation-weak',
    title: 'My online reviews and reputation need work',
    description:
      '[[PLACEHOLDER: Add scenario copy for local businesses with few or poor reviews. Mention Google Business Profile and review generation.]]',
    primaryService: 'reputation',
    alsoConsider: ['seo', 'branding'],
    startingPoint: 'A reputation and Google Business Profile audit.',
  },
  {
    id: 'messaging-unclear',
    title: 'I am not sure how to describe what makes us different',
    description:
      '[[PLACEHOLDER: Add scenario copy for businesses with unclear messaging. Mention branding before copywriting.]]',
    primaryService: 'branding',
    alsoConsider: ['content', 'web-design'],
    startingPoint: 'A positioning and messaging workshop.',
  },
  {
    id: 'copy-needed',
    title: 'I need website or marketing copy that actually sells',
    description:
      '[[PLACEHOLDER: Add scenario copy for businesses needing website, landing page, or blog copy. Mention SEO-aware copywriting.]]',
    primaryService: 'content',
    alsoConsider: ['branding', 'seo'],
    startingPoint: 'A voice-capture session and first draft.',
  },
];

export type FitLevel = 'Best fit' | 'Also consider' | '—';

export function getFitLevel(scenario: ServiceComparisonScenario, slug: string): FitLevel {
  if (scenario.primaryService === slug) return 'Best fit';
  if (scenario.alsoConsider.includes(slug)) return 'Also consider';
  return '—';
}
