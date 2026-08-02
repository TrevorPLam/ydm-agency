import { SERVICES_CONFIG } from './services-config';

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqGroup {
  theme: string;
  items: FaqItem[];
}

const THEME_KEYWORDS: Record<string, string[]> = {
  Pricing: ['cost', 'costs', 'price', 'pricing', 'budget', 'fee', 'fees', 'investment', 'how much', 'charge'],
  Timeline: ['long', 'take', 'takes', 'time', 'week', 'weeks', 'month', 'months', 'day', 'days', 'start', 'starting', 'fast', 'quick', 'soon', 'duration'],
  Scope: ['include', 'includes', 'included', 'what', 'cover', 'covers', 'scope', 'deliverable', 'deliverables', 'service', 'services', 'get', 'receive'],
  Prerequisites: ['need', 'needed', 'have', 'has', 'already', 'prerequisite', 'require', 'required', 'start', 'existing', 'before'],
  Compliance: ['legal', 'compliant', 'compliance', 'allowed', 'permit', 'permission', 'policy', 'law'],
};

const THEME_ORDER = ['Pricing', 'Timeline', 'Scope', 'Prerequisites', 'Compliance', 'General'];

function classifyFaq(faq: FaqItem): string {
  const q = faq.q.toLowerCase();
  for (const [theme, keywords] of Object.entries(THEME_KEYWORDS)) {
    if (keywords.some((kw) => q.includes(kw))) {
      return theme;
    }
  }
  return 'General';
}

export function groupServiceFaqs(faqs: FaqItem[]): FaqGroup[] {
  const map = new Map<string, FaqItem[]>();
  for (const faq of faqs) {
    const theme = classifyFaq(faq);
    const items = map.get(theme) ?? [];
    items.push(faq);
    map.set(theme, items);
  }

  return THEME_ORDER
    .filter((theme) => map.has(theme))
    .map((theme) => ({ theme, items: map.get(theme)! }));
}

const SERVICE_TITLES: Record<string, string> = {
  'web-design': 'website design and development',
  'seo': 'SEO and AI search optimization',
  'maintenance': 'website maintenance',
  'analytics': 'analytics and attribution',
  'paid-ads': 'paid advertising',
  'branding': 'branding and positioning',
  'content': 'content and copywriting',
  'automation': 'CRM and marketing automation',
  'reputation': 'reputation and review management',
};

export function getAnswerEngineFaqs(slug: string): FaqItem[] {
  const serviceH1 = SERVICES_CONFIG[slug]?.h1 ?? `${slug} services`;
  const label = SERVICE_TITLES[slug] ?? serviceH1.toLowerCase();

  return [
    {
      q: `How much does ${label} cost?`,
      a: `[[PLACEHOLDER: Add a concise, search-friendly answer about ${label} pricing. Include what the investment depends on and why it is scoped individually. Keep it under 75 words.]]`,
    },
    {
      q: `How long does ${label} take to deliver?`,
      a: `[[PLACEHOLDER: Add a realistic timeline for ${label}. Mention typical phases and what can affect the schedule. Keep it under 75 words.]]`,
    },
    {
      q: `What is included in ${label}?`,
      a: `[[PLACEHOLDER: List the core deliverables included in ${label}. Keep it scannable and benefit-focused. Keep it under 75 words.]]`,
    },
    {
      q: `Do I need anything in place before starting ${label}?`,
      a: `[[PLACEHOLDER: Describe any prerequisites, existing assets, or decisions a business should have before ${label} begins. Keep it under 75 words.]]`,
    },
    {
      q: `How is ${label} different from doing it in-house or with a traditional agency?`,
      a: `[[PLACEHOLDER: Explain the key difference between YDM Agency's approach to ${label} and in-house or traditional agency alternatives. Keep it under 75 words.]]`,
    },
  ];
}

export function getAllServiceFaqs(slug: string): FaqGroup[] {
  const config = SERVICES_CONFIG[slug];
  const existingGroups = config ? groupServiceFaqs(config.faqs) : [];
  const answerEngineItems = getAnswerEngineFaqs(slug);

  if (answerEngineItems.length > 0) {
    return [...existingGroups, { theme: 'Answer Engine Questions', items: answerEngineItems }];
  }

  return existingGroups;
}
