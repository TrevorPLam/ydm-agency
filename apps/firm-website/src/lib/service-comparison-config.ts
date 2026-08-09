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
      'A business with no website or an outdated one first needs a clear build-versus-fix decision. YDM Agency scopes a custom design when the brand and conversion flow matter, or maintenance and targeted updates when the foundation is still solid. The free project outline maps the right path and starting budget.',
    primaryService: 'web-design',
    alsoConsider: ['seo', 'branding'],
    startingPoint: 'A free project outline for a new website build.',
  },
  {
    id: 'low-traffic',
    title: 'My website gets little or no search traffic',
    description:
      'Search traffic usually stalls when a site is not built around what customers actually search for, or when it lacks the authority signals that both traditional search and AI features need. YDM Agency makes the business findable through SEO and content work. An SEO and AI search audit identifies the highest-impact fixes first.',
    primaryService: 'seo',
    alsoConsider: ['content', 'web-design'],
    startingPoint: 'An SEO and AI search audit to identify quick wins.',
  },
  {
    id: 'traffic-no-leads',
    title: 'I have traffic but few conversions or leads',
    description:
      'Traffic without conversions is a measurement and messaging problem. YDM Agency uses analytics to find drop-off points, conversion copy and landing pages to fix the message, and paid ads only after the funnel is clear. A conversion tracking and page review is the right starting point.',
    primaryService: 'analytics',
    alsoConsider: ['paid-ads', 'content'],
    startingPoint: 'A conversion tracking and page review.',
  },
  {
    id: 'need-leads-now',
    title: 'I need leads this month, not in six months',
    description:
      'When a business needs leads quickly, paid search and social can drive targeted traffic within days, but the budget must be large enough to generate data and the landing page must match the ad promise. YDM Agency builds the landing page and campaign together. A paid ads strategy with a dedicated landing page is the fastest starting point.',
    primaryService: 'paid-ads',
    alsoConsider: ['analytics', 'web-design'],
    startingPoint: 'A paid ads strategy with a dedicated landing page.',
  },
  {
    id: 'leads-slip',
    title: 'Inquiries fall through the cracks after they come in',
    description:
      'Inquiries that go unanswered or lack follow-up lose revenue no matter how much marketing spend is behind them. YDM Agency sets up CRM and automation workflows that capture, tag, and nurture leads without manual work. A lead-flow audit and automation roadmap shows what to fix first.',
    primaryService: 'automation',
    alsoConsider: ['analytics', 'reputation'],
    startingPoint: 'A lead-flow audit and automation roadmap.',
  },
  {
    id: 'reputation-weak',
    title: 'My online reviews and reputation need work',
    description:
      'Local customers often filter businesses by reviews before anything else. YDM Agency strengthens the review profile through consistent review generation, Google Business Profile optimization, and response workflows. A reputation and Google Business Profile audit is the starting point.',
    primaryService: 'reputation',
    alsoConsider: ['seo', 'branding'],
    startingPoint: 'A reputation and Google Business Profile audit.',
  },
  {
    id: 'messaging-unclear',
    title: 'I am not sure how to describe what makes us different',
    description:
      'When a business cannot clearly explain what makes it different, every page, ad, and email works harder than it should. YDM Agency clarifies the message through branding and positioning work before copywriting begins. A positioning and messaging workshop is the right starting point.',
    primaryService: 'branding',
    alsoConsider: ['content', 'web-design'],
    startingPoint: 'A positioning and messaging workshop.',
  },
  {
    id: 'copy-needed',
    title: 'I need website or marketing copy that actually sells',
    description:
      'A clear offer still needs the right words to sell it. YDM Agency writes SEO-aware copy that matches how customers search and decide, for websites, landing pages, and ongoing content. A voice-capture session and first draft is the starting point.',
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
