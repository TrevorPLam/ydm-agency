/**
 * FILE: data.ts
 * PURPOSE: FAQ data constants
 */
export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqGroup {
  theme: string;
  items: FaqItem[];
}

export const THEME_KEYWORDS: Record<string, string[]> = {
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

export const THEME_ORDER = ['Pricing', 'Timeline', 'Scope', 'Prerequisites', 'Compliance', 'General'];

export const SERVICE_TITLES: Record<string, string> = {
  'web-design': 'website design and development',
  seo: 'SEO and AI search optimization',
  analytics: 'analytics and attribution',
  'paid-ads': 'paid advertising',
  branding: 'branding and positioning',
  content: 'content and copywriting',
  automation: 'CRM and marketing automation',
  reputation: 'reputation and review management',
};

export interface AnswerEngineAnswers {
  cost: string;
  timeline: string;
  scope: string;
  prerequisites: string;
  comparison: string;
}

export const SERVICE_ANSWERS: Record<string, AnswerEngineAnswers> = {
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
      "YDM Agency keeps the business's own account at the center, uses compliant review-generation methods, and provides professional response drafts rather than generic templates. No long-term lock-in is required.",
  },
};

interface ContextKeywordGroup {
  keywords: string[];
  weight: number;
}

interface ContextKeywords {
  overview: ContextKeywordGroup[];
  process: ContextKeywordGroup[];
}

export const CONTEXT_KEYWORDS: ContextKeywords = {
  overview: [
    {
      keywords: [
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
      weight: 4,
    },
    {
      keywords: [
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
      weight: 3,
    },
    {
      keywords: [
        'guarantee',
        'guarantees',
        'promise',
        'promises',
        'result',
        'results',
        'outcome',
        'outcomes',
        'work',
        'actually',
        'different',
        'better',
        'vs',
        'versus',
        'compare',
        'comparison',
        'why',
        'advantage',
        'benefit',
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
