/**
 * FILE: faq-utils.ts
 * PURPOSE: Provides FAQ classification, grouping, and answer-engine utilities that organize service FAQs into themed groups and supply canonical answers for the answer-engine UI.
 * ARCHITECTURE: Pure utility module with keyword-based FAQ classification into themes (Pricing, Timeline, Scope, Prerequisites, Compliance, General) and a SERVICE_ANSWERS record of canonical per-service answers; depends on SERVICES_CONFIG.
 * KEY RULES: Classification must be deterministic and keyword-based; theme ordering must follow THEME_ORDER; groupServiceFaqs must omit empty themes; answers must use the firm-level impersonal voice.
 * DEPENDS ON: ./services-config (SERVICES_CONFIG).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
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
  Pricing: [
    'cost',
    'costs',
    'price',
    'pricing',
    'budget',
    'fee',
    'fees',
    'investment',
    'how much',
    'charge',
  ],
  Timeline: [
    'long',
    'take',
    'takes',
    'time',
    'week',
    'weeks',
    'month',
    'months',
    'day',
    'days',
    'start',
    'starting',
    'fast',
    'quick',
    'soon',
    'duration',
  ],
  Scope: [
    'include',
    'includes',
    'included',
    'what',
    'cover',
    'covers',
    'scope',
    'deliverable',
    'deliverables',
    'service',
    'services',
    'get',
    'receive',
  ],
  Prerequisites: [
    'need',
    'needed',
    'have',
    'has',
    'already',
    'prerequisite',
    'require',
    'required',
    'start',
    'existing',
    'before',
  ],
  Compliance: [
    'legal',
    'compliant',
    'compliance',
    'allowed',
    'permit',
    'permission',
    'policy',
    'law',
  ],
};

const THEME_ORDER = ['Pricing', 'Timeline', 'Scope', 'Prerequisites', 'Compliance', 'General'];

/**
 * WHAT IT DOES: Classifies a single FAQ into a theme by matching its question against keyword lists, defaulting to 'General' when no keyword matches.
 * @param {FaqItem} faq - FAQ item with a question and answer
 * @return {string} - Matching theme name, or 'General' if no keywords match
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: THEME_KEYWORDS maps theme names to lowercase keyword arrays.
 */
function classifyFaq(faq: FaqItem): string {
  const q = faq.q.toLowerCase();
  for (const [theme, keywords] of Object.entries(THEME_KEYWORDS)) {
    if (keywords.some((kw) => q.includes(kw))) {
      return theme;
    }
  }
  return 'General';
}

/**
 * WHAT IT DOES: Groups an array of FAQ items into themed FaqGroup objects, ordered by THEME_ORDER and omitting empty themes.
 * @param {FaqItem[]} faqs - Flat list of FAQ items to group
 * @return {FaqGroup[]} - Ordered list of non-empty themed FAQ groups
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: classifyFaq returns a theme present in THEME_ORDER or 'General'.
 */
export function groupServiceFaqs(faqs: FaqItem[]): FaqGroup[] {
  const map = new Map<string, FaqItem[]>();
  for (const faq of faqs) {
    const theme = classifyFaq(faq);
    const items = map.get(theme) ?? [];
    items.push(faq);
    map.set(theme, items);
  }

  return THEME_ORDER.filter((theme) => map.has(theme)).map((theme) => ({
    theme,
    items: map.get(theme)!,
  }));
}

const SERVICE_TITLES: Record<string, string> = {
  'web-design': 'website design and development',
  seo: 'SEO and AI search optimization',
  analytics: 'analytics and attribution',
  'paid-ads': 'paid advertising',
  branding: 'branding and positioning',
  content: 'content and copywriting',
  automation: 'CRM and marketing automation',
  reputation: 'reputation and review management',
};

interface AnswerEngineAnswers {
  cost: string;
  timeline: string;
  scope: string;
  prerequisites: string;
  comparison: string;
}

const SERVICE_ANSWERS: Record<string, AnswerEngineAnswers> = {
  'web-design': {
    cost: 'Most custom website design and development projects at YDM Agency start at $5,000–$12,000. The final investment depends on page count, custom functionality, content, and integrations. A free project outline provides a transparent, scoped estimate before any work begins.',
    timeline:
      'A typical website takes 2 to 4 weeks from approved scope to launch. Smaller sites may move faster; larger or more complex builds take longer. The timeline is set upfront and tracked through staging previews.',
    scope:
      'Each build includes custom design, mobile-friendly layouts, on-page SEO, fast load speeds, contact forms and lead capture, plus launch testing and handoff documentation. Maintenance can be added for ongoing care.',
    prerequisites:
      'Useful assets include a logo, brand colors, existing content, photos, and a clear sense of the goals for the site. Not everything is required — YDM Agency can help define what is needed during the free project outline.',
    comparison:
      'Unlike template-based builders or agencies that pass work between teams, YDM Agency assigns one professional directly to the project. AI-assisted tools speed up repetitive tasks; design, quality control, and testing stay manual.',
  },
  seo: {
    cost: 'Ongoing SEO and AI search optimization typically starts at $1,000–$2,500 per month. One-time audits start at $1,500. The final scope depends on market competitiveness, current site health, and how many locations are targeted.',
    timeline:
      'Initial technical and on-page improvements usually show in 30–60 days. Meaningful, compounding results typically build over 3–6 months. That timeline is set honestly upfront, not oversold.',
    scope:
      'The work includes a technical SEO audit, on-page optimization, local SEO and Google Business Profile work, AI search readiness, and plain-English monthly reporting. Ongoing iteration adjusts based on results.',
    prerequisites:
      'An existing website and analytics access are helpful, though not required. YDM Agency can work with a new site or audit an existing one. Access to the site, search console, and business listings is needed.',
    comparison:
      'YDM Agency combines traditional SEO with AI search readiness in one plan, reports in plain English, and does not require a long-term lock-in contract. Work is adjusted monthly based on what the data shows.',
  },
  analytics: {
    cost: 'Analytics and attribution setup typically starts at $2,000–$4,000, with ongoing reporting from $500 per month. The scope depends on how many channels and platforms need to be connected and cleaned.',
    timeline:
      'A full setup typically takes 1–2 weeks. Monthly reporting begins after the first reporting cycle. Dashboards are available for real-time access once the initial configuration is complete.',
    scope:
      'The work includes channel clarity, conversion tracking, page performance and drop-off identification, a live dashboard, and plain-English monthly reports with 1–2 prioritized action items.',
    prerequisites:
      "Access to the website, existing analytics accounts, and any advertising platforms is needed. If no accounts exist, YDM Agency sets them up in the client's name from day one.",
    comparison:
      "YDM Agency builds reports around what to do next, not vanity metrics. Accounts are set up in the client's own name, and a live dashboard is provided for anytime access, with no black-box dashboards.",
  },
  'paid-ads': {
    cost: 'Paid advertising management typically starts at $1,000–$2,500 per month, separate from the ad spend paid directly to platforms. Ad spend is billed directly by Google or Meta, not through YDM Agency.',
    timeline:
      'Strategy takes about one week. Campaign build and launch take 1–2 weeks. Meaningful optimization that lowers cost per lead usually takes 4–8 weeks of real data after launch.',
    scope:
      'The service includes campaign strategy, keyword and audience research, ad creative setup, conversion tracking, ongoing weekly optimization, A/B testing, and a monthly plain-English report with a live dashboard.',
    prerequisites:
      'A working website or landing page, a platform billing method, and a recommended ad budget of $1,500–$3,000/month for algorithmic optimization. Smaller budgets are possible but usually require more time to gather statistically useful data. A dedicated landing page is strongly recommended and can be built alongside the campaign.',
    comparison:
      "YDM Agency provides a shared live dashboard, bills ad spend directly through the client's platform account, and does not require a long-term contract. Weekly adjustments keep spend efficient and transparent.",
  },
  branding: {
    cost: 'Branding and positioning projects at YDM Agency typically start at $3,000–$8,000. The investment depends on research depth, how much of the visual identity is needed, and whether messaging or full brand guidelines are included.',
    timeline:
      'A typical branding project takes 3 to 6 weeks, split across discovery, messaging, visual identity, and application handoff. Timelines scale with the number of deliverables and revision rounds.',
    scope:
      'Deliverables include a positioning statement, core messaging, logo refinement or creation, a color palette and typography, a simple brand style guide, and competitive differentiation messaging.',
    prerequisites:
      "A clear sense of the business's audience, market, and current pain points is helpful. Existing logos or visual assets can be used if they are worth keeping. YDM Agency starts with discovery to fill any gaps.",
    comparison:
      'YDM Agency defines messaging before visuals, so the identity is built on strategy rather than guesswork. All final assets are owned outright by the client once delivered, with no ongoing licensing fees.',
  },
  content: {
    cost: 'Website and marketing copywriting at YDM Agency typically starts at $2,000–$5,000 per project, or $1,000–$2,500 per month for ongoing content. Pricing depends on the number of pages, research needs, and revision rounds.',
    timeline:
      'A small project takes 1–2 weeks. Larger sites or ongoing retainers scale to the content calendar. Voice discovery happens first so drafts sound like the business, not a generic writer.',
    scope:
      'Deliverables can include home, about, service, and contact page copy, landing page copy, blog and article content, a voice and tone brief, and revisions. SEO is built in without making copy sound robotic.',
    prerequisites:
      'Background on the business, audience, and goals is needed. Existing copy can be reviewed and improved. YDM Agency runs a discovery process to capture voice before writing begins.',
    comparison:
      'YDM Agency pairs AI-assisted audience research with human editing and revision, so copy is strategically informed and authentically voiced. Full rights transfer upon delivery, with no long-term content lock-in.',
  },
  automation: {
    cost: 'CRM and marketing automation setup at YDM Agency typically starts at $1,500–$3,500, with ongoing optimization from $500 per month. The cost depends on the number of workflows, integrations, and contacts.',
    timeline:
      'Process audit and mapping take 2–4 days. Tool selection and setup take 1–2 weeks. Workflows are built and tested in about one week. Monthly optimization follows once the system is live.',
    scope:
      'The work includes instant lead acknowledgment, appointment confirmations and reminders, lead nurture sequences, lead scoring and routing, post-project follow-ups, and a central dashboard for every lead.',
    prerequisites:
      "A clear lead flow and access to existing tools (CRM, email, calendar) are helpful. If no system exists, YDM Agency selects the right tool and sets it up in the client's own account.",
    comparison:
      "YDM Agency audits the current lead flow first, selects the right tool for the business, and sets everything up in the client's own name. Documentation and optional training are included, so the system does not depend on YDM Agency to keep running.",
  },
  reputation: {
    cost: 'Reputation and review management at YDM Agency typically starts at $500–$1,500 per month, scaled by location count, review volume, and how active management needs to be.',
    timeline:
      'A profile audit and optimization take 1–2 days. A review-generation system is set up within about one week. Ongoing monitoring, response drafting, and monthly summaries continue monthly.',
    scope:
      'The work includes Google Business Profile setup and optimization, a compliant review-generation system, real-time review monitoring, professional response drafts for every review, profile posts, and a monthly reputation summary.',
    prerequisites:
      "Access to the business's Google Business Profile and any other review profiles is needed. Existing login credentials and knowledge of the customer journey help, but YDM Agency can guide setup if access is missing.",
    comparison:
      "YDM Agency keeps the Google Business Profile under the client's own account, responds to negative reviews within 24 hours, and uses only platform-compliant review-generation methods. The business owns the profile throughout.",
  },
};

/**
 * WHAT IT DOES: Generates a canonical set of five answer-engine FAQ items (cost, timeline, scope, prerequisites, comparison) for a service, using SERVICE_ANSWERS or generated fallbacks when no canonical answers exist.
 * @param {string} slug - Service slug
 * @return {FaqItem[]} - Five answer-engine FAQ items for the service
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: slug may not exist in SERVICE_ANSWERS; fallbacks are generated from the service label or h1.
 */
export function getAnswerEngineFaqs(slug: string): FaqItem[] {
  const serviceH1 = SERVICES_CONFIG[slug]?.h1 ?? `${slug} services`;
  const label = SERVICE_TITLES[slug] ?? serviceH1.toLowerCase();
  const answers = SERVICE_ANSWERS[slug] ?? {
    cost: `Pricing for ${label} is scoped individually. A free project outline provides a transparent estimate based on the specific goals and scope.`,
    timeline: `Timelines for ${label} depend on scope and current state. A realistic schedule is included in the free project outline.`,
    scope: `The scope of ${label} is tailored to the business. Deliverables and outcomes are defined clearly in the free project outline.`,
    prerequisites: `What is needed before starting ${label} depends on the project. YDM Agency reviews existing assets and gaps during the free project outline.`,
    comparison: `YDM Agency approaches ${label} with direct execution, plain-English reporting, and no long-term lock-in contract. AI-assisted tools handle repetitive work while strategy and quality control stay manual.`,
  };

  return [
    {
      q: `How much does ${label} cost?`,
      a: answers.cost,
    },
    {
      q: `How long does ${label} take to deliver?`,
      a: answers.timeline,
    },
    {
      q: `What is included in ${label}?`,
      a: answers.scope,
    },
    {
      q: `Do I need anything in place before starting ${label}?`,
      a: answers.prerequisites,
    },
    {
      q: `How is ${label} different from doing it in-house or with a traditional agency?`,
      a: answers.comparison,
    },
  ];
}

/**
 * WHAT IT DOES: Combines a service's existing themed FAQ groups with its answer-engine FAQ items, appending an "Answer Engine Questions" group when answer-engine items exist.
 * @param {string} slug - Service slug
 * @return {FaqGroup[]} - Themed FAQ groups plus an optional answer-engine group
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: SERVICES_CONFIG may not contain the slug; returns only the answer-engine group in that case.
 */
export function getAllServiceFaqs(slug: string): FaqGroup[] {
  const config = SERVICES_CONFIG[slug];
  const existingGroups = config ? groupServiceFaqs(config.faqs) : [];
  const answerEngineItems = getAnswerEngineFaqs(slug);

  if (answerEngineItems.length > 0) {
    return [...existingGroups, { theme: 'Answer Engine Questions', items: answerEngineItems }];
  }

  return existingGroups;
}

const CONTEXT_KEYWORDS: Record<'overview' | 'process', { keywords: string[]; weight: number }[]> = {
  overview: [
    {
      keywords: [
        'how much',
        'cost',
        'costs',
        'price',
        'prices',
        'pricing',
        'budget',
        'fee',
        'fees',
        'investment',
        'charge',
      ],
      weight: 4,
    },
    {
      keywords: [
        'what is included',
        "what's included",
        'what do i get',
        'what does this add',
        'what does it include',
        'what does it cover',
        'what is covered',
        "what's covered",
        'are revisions included',
        'is seo included',
        'what is',
        "what's",
        'what does',
        'what do',
        'what are',
        'deliverable',
        'deliverables',
        'scope',
        'service',
        'services',
        'include',
        'includes',
        'included',
        'revisions',
        'revision',
        'seo',
        'optimized',
        'voice',
        'match',
        'industry',
        'content',
      ],
      weight: 2,
    },
    {
      keywords: ['do i need', 'should i', 'need', 'needed', 'actually need'],
      weight: 1,
    },
  ],
  process: [
    {
      keywords: [
        'how long',
        'how fast',
        'how soon',
        'how much time',
        'long',
        'take',
        'takes',
        'time',
        'week',
        'weeks',
        'month',
        'months',
        'day',
        'days',
        'start',
        'starting',
        'fast',
        'quick',
        'soon',
        'duration',
      ],
      weight: 4,
    },
    {
      keywords: [
        'set up',
        'setup',
        'where do we start',
        'where do',
        'how do we start',
        'do not have',
        "don't have",
        'no tracking',
        'already have',
        'already',
        'existing',
        'prerequisite',
        'require',
        'required',
        'need',
        'needed',
        'have',
        'has',
        'before',
        'start from scratch',
        'industry',
        'copy',
      ],
      weight: 3,
    },
    {
      keywords: [
        'process',
        'workflow',
        'phase',
        'how involved',
        'how does this work',
        'what is the process',
        'revisions',
        'revision',
      ],
      weight: 2,
    },
  ],
};

/**
 * WHAT IT DOES: Escapes regular expression metacharacters in a string so it can be safely embedded in a RegExp pattern.
 * @param {string} value - Raw string to escape
 * @return {string} - Escaped string safe for RegExp embedding
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: None.
 */
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * WHAT IT DOES: Tests whether a keyword phrase appears as a whole-word (whitespace/punctuation-bounded) match in a question, case-insensitively and unicode-aware.
 * @param {string} q - Question text to search
 * @param {string} keyword - Keyword phrase to match (spaces treated as flexible whitespace)
 * @return {boolean} - True if the keyword matches as a bounded phrase
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: q is lowercase; keyword is a literal phrase (metacharacters handled by escapeRegExp).
 */
function keywordMatchesQuestion(q: string, keyword: string): boolean {
  const phrase = escapeRegExp(keyword).replace(/\\ /g, '\\s+');
  const pattern = new RegExp(`(?:^|[\\s\\p{P}])${phrase}(?:[\\s\\p{P}]|$)`, 'iu');
  return pattern.test(q);
}

/**
 * WHAT IT DOES: Scores a FAQ item's relevance to a given context (overview or process) by summing weighted keyword matches and adding a small bonus for questions ending with '?'.
 * @param {FaqItem} faq - FAQ item to score
 * @param {'overview' | 'process'} context - Contextual bucket to score against
 * @return {number} - Relevance score (higher is more relevant)
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: CONTEXT_KEYWORDS contains weighted keyword groups for the given context.
 */
function scoreFaqForContext(faq: FaqItem, context: 'overview' | 'process'): number {
  let score = 0;
  for (const { keywords, weight } of CONTEXT_KEYWORDS[context]) {
    if (keywords.some((kw) => keywordMatchesQuestion(faq.q, kw))) {
      score += weight;
    }
  }
  // WHY: Prefer real questions (ending with '?') over headings or fragments when scoring FAQ relevance.
  if (faq.q.trim().endsWith('?')) {
    score += 0.5;
  }
  return score;
}

/**
 * WHAT IT DOES: Returns the top-N most contextually relevant FAQs for a service, scored by keyword relevance and reordered to preserve their original document order.
 * @param {string} slug - Service slug
 * @param {'overview' | 'process'} context - Contextual bucket to select for
 * @param {number} limit - Maximum number of FAQs to return (defaults to 2)
 * @return {FaqItem[]} - Contextually relevant FAQs in original document order
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: SERVICES_CONFIG may not contain the slug; returns an empty array in that case.
 */
export function getContextualFaqs(
  slug: string,
  context: 'overview' | 'process',
  limit = 2
): FaqItem[] {
  const config = SERVICES_CONFIG[slug];
  if (!config) return [];

  const scored = config.faqs.map((faq, index) => ({
    faq,
    index,
    score: scoreFaqForContext(faq, context),
  }));

  scored.sort((a, b) => b.score - a.score || a.index - b.index);

  return scored
    .slice(0, limit)
    .sort((a, b) => a.index - b.index)
    .map((item) => item.faq);
}
