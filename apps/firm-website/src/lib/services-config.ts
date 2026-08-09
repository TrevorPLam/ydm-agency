export interface ProcessPhase {
  phase: number;
  title: string;
  duration: string;
  description: string;
}

export interface Deliverable {
  title: string;
  description: string;
  output: string;
  timeline: string;
  outcome: string;
}

export interface ServiceConfig {
  slug: string;
  h1: string;
  subhead: string;
  problemSolution: string;
  included: string[];
  whoItsFor: string;
  howItFits: { label: string; href: string }[];
  workingWithYdm: string;
  faqs: { q: string; a: string }[];
  finalCtaText: string;
  metaTitle: string;
  metaDescription: string;
  processPhases: ProcessPhase[];
  deliverables: Deliverable[];
}

export const SERVICES_CONFIG: Record<string, ServiceConfig> = {
  'web-design': {
    slug: 'web-design',
    h1: 'Website Design That Turns Visitors Into Customers',
    subhead:
      "Whether it's a first website or an overhaul of one that isn't working, expect custom website design and development — fast to load, mobile-ready, and built around how a small business actually runs. No templates, no guesswork.",
    problemSolution:
      "Problem / Solution\n\nYour current site takes 6 seconds to load on a phone, and the 'Contact Us' button is buried. Potential customers bounce and call the competitor who loaded faster. YDM Agency builds custom sites that load in under 2 seconds, put the call to action front and center, and are designed around exactly how your customers behave. No templates, no guesswork - a site that works as hard as you do, then stays updated with optional monthly management.",
    included: [
      'Custom design — no template',
      'Mobile-friendly layout',
      'On-page SEO built in from day one',
      'Fast load speeds, tested pre-launch',
      'Contact forms and lead capture integrated',
      'A simple update process, with optional ongoing maintenance as part of the website engagement',
    ],
    whoItsFor:
      'Starting from scratch. Outdated sites that no longer represent the business. Local service providers who need to be found and trusted online. Startups that need a landing page that converts.',
    howItFits: [
      { label: 'SEO & AI Search Optimization', href: '/services/seo' },
      { label: 'Analytics & Attribution', href: '/services/analytics' },
      { label: 'Branding & Messaging', href: '/services/branding' },
    ],
    workingWithYdm:
      "Handled directly by the professional assigned to the project — no handoffs. AI-augmented tools speed up the repetitive work without cutting corners on the parts that matter. Progress is visible through prototypes and staging previews along the way. A live, tested site is delivered on the business's own domain. Everything is set up in your own accounts. You own the data, the profiles, the logins - not YDM Agency. No long-term contracts. If YDM Agency doesn't deliver measurable improvement, you can walk away after a month with everything still in your name.",
    faqs: [
      {
        q: 'How long does a website project take?',
        a: 'Most projects take 2 to 4 weeks from approved scope to launch, depending on the number of pages and any custom functionality involved.',
      },
      {
        q: 'Will I need to know how to code to update my own site?',
        a: "No. Straightforward content updates don't require any technical background. For anything more involved, an optional ongoing care plan is available as part of the website engagement.",
      },
      {
        q: 'I already have a site — will a redesign hurt my search rankings?',
        a: "No. Existing SEO value is preserved during a redesign. URLs, page structure, and search-visible content are carried over deliberately so rankings aren't lost in the process.",
      },
      {
        q: 'Why custom-built instead of a template?',
        a: "Templates are built to be generic, which limits flexibility and often hurts performance. A custom build is designed around the specific business, its content, and its goals from day one — with room to grow later without hitting a template's ceiling.",
      },
      {
        q: "I don't know exactly what I need yet — can you help me figure it out?",
        a: 'Yes. Full guidance is provided for businesses starting from scratch. The first conversation is about understanding the business and its goals; the site plan gets built from there.',
      },
      {
        q: 'Does using AI tools mean corners get cut?',
        a: "AI speeds up the repetitive parts of the build — boilerplate code, first-pass layouts — the parts that don't need a human's judgment. Design decisions, code quality, and testing are done manually, the same as they'd be without AI in the loop. The speed comes from skipping busywork, not from skipping review.",
      },
      {
        q: 'How much does a website cost?',
        a: 'Every project is scoped individually based on pages, features, and timeline, so no single number fits all cases. The free project outline includes a clear, transparent estimate before any commitment is made.',
      },
    ],
    finalCtaText: 'Ready for a website that works as hard as you do?',
    deliverables: [
      {
        title: 'Custom design — no template',
        description:
          'Every page is designed from a blank canvas around the business, its content, and its goals. No pre-made themes or one-size-fits-all layouts are used.',
        output: 'Approved visual designs and a structured page plan before any code is written.',
        timeline: 'Phases 1–2 (Discovery through Design & Prototyping)',
        outcome:
          'A site that looks, feels, and performs like the business — not a generic template.',
      },
      {
        title: 'Mobile-friendly layout',
        description:
          'The site is planned, designed, and tested for phones and tablets first, then scaled up to larger screens.',
        output: 'Responsive layouts that work cleanly across all common devices and screen sizes.',
        timeline: 'Designed in phase 2; built and tested in phase 3.',
        outcome: 'Visitors on any device can navigate, read, and convert without friction.',
      },
      {
        title: 'On-page SEO built in from day one',
        description:
          'Search fundamentals — clean markup, meta data, headings, URL structure, and internal linking — are part of the build, not bolted on later.',
        output:
          'Pages optimized with titles, descriptions, structured headings, and fast, crawlable code.',
        timeline: 'Built into design and development; validated before launch.',
        outcome: 'The site is findable by Google and ready for further SEO or AI search work.',
      },
      {
        title: 'Fast load speeds, tested pre-launch',
        description:
          'Performance is measured and tuned before the site goes live, including image handling, code splitting, and caching where appropriate.',
        output: 'A tested, production-ready site that loads quickly on real connections.',
        timeline: 'Phase 3 (AI-Assisted Build & Review) and phase 4 (Testing, Launch & Handoff).',
        outcome: 'Lower bounce rates, better search signals, and a smoother visitor experience.',
      },
      {
        title: 'Contact forms and lead capture integrated',
        description:
          'Forms, calls-to-action, and lead capture points are placed where visitors actually make decisions, then connected to the business.',
        output: 'Working contact forms, lead capture flows, and delivery routing.',
        timeline: 'Phase 3 build; tested in phase 4.',
        outcome: 'More inquiries turn into actual leads instead of leaking at the form.',
      },
      {
        title: 'A simple update process, with optional ongoing maintenance',
        description:
          'The business is shown how to make straightforward content updates, or an optional ongoing care plan keeps the site current.',
        output: 'Documentation, training notes, or a monthly care plan.',
        timeline: 'Handoff in phase 4; ongoing care begins when chosen.',
        outcome:
          'The site stays accurate and secure long after launch without requiring technical knowledge.',
      },
    ],
    metaTitle: 'Custom Website Design & Management for Small Businesses | YDM Agency',
    metaDescription:
      'Mobile-first, fast websites designed to convert. Get a free project outline with a transparent estimate. No templates, no commitment.',
    processPhases: [
      {
        phase: 1,
        title: 'Discovery & Strategy',
        duration: '1–3 days',
        description:
          'Your business, goals, and requirements are documented. Site structure and content needs are defined.',
      },
      {
        phase: 2,
        title: 'Design & Prototyping',
        duration: '3–7 days',
        description:
          'Visual design is created and refined. Interactive prototypes let you see and test the layout before build.',
      },
      {
        phase: 3,
        title: 'AI-Assisted Build & Review',
        duration: '1–3 weeks',
        description:
          'The site is built using modern frameworks. Staging previews are shared for feedback at key milestones.',
      },
      {
        phase: 4,
        title: 'Testing, Launch & Handoff',
        duration: '2–3 days',
        description:
          'Performance, accessibility, and integration testing is completed. The site goes live and documentation is provided.',
      },
    ],
  },
  seo: {
    slug: 'seo',
    h1: 'Get Found by the Customers Already Searching for You',
    subhead:
      'Whether starting from scratch, recovering lost rankings, or preparing for AI-powered search, expect a combined approach that gets a business found — on Google and through the AI tools more people are asking instead.',
    problemSolution:
      "Problem / Solution\n\nIf your business doesn't appear in Google search results and is invisible in AI tools like ChatGPT, you're losing customers who never even knew you existed. A combined SEO and AI-search optimization approach tackles both: ranking for the searches that matter, and structuring content so AI engines cite you directly. No tricks, no buying links - just white-hat, long-term growth.",
    included: [
      'AI search optimization — structuring site content so tools like ChatGPT and Perplexity can find and recommend the business, not just traditional search engines',
      'Technical SEO audit & fixes',
      'On-page optimization matched to real customer searches',
      'Local SEO (Google Business Profile), so nearby searches turn into calls and visits',
      'Plain-English monthly reporting',
      'Initial improvements in 30–60 days, full results over 3–6 months',
    ],
    whoItsFor:
      'Not generating search leads. Local service providers who need to be found nearby. Businesses previously burned by an SEO vendor. Forward-thinking owners preparing for AI-powered search.',
    howItFits: [
      { label: 'Website Design & Development', href: '/services/web-design' },
      { label: 'Analytics & Attribution', href: '/services/analytics' },
      { label: 'Reputation & Review Management', href: '/services/reputation' },
    ],
    workingWithYdm:
      "A roadmap delivered in month one, then consistent monthly execution paired with plain-English reporting — no jargon-heavy PDFs. No lock-in; the plan adjusts monthly based on what's working. Meaningful results build over 3–6 months, and that timeline is set honestly upfront, not oversold. If YDM Agency doesn't improve your search visibility within six months, you can walk away with all your data - no contracts, no questions.",
    faqs: [
      {
        q: 'How long until I see results?',
        a: "Initial improvements typically show up in 30–60 days, with meaningful, significant results building over 3–6 months. Anyone promising overnight rankings isn't being straight about how search works.",
      },
      {
        q: 'Do you guarantee #1 rankings?',
        a: "No — no one controls Google's algorithm, so that guarantee isn't an honest one to make. What's guaranteed is transparent, consistent work each month, reported in plain English, with no hidden tactics.",
      },
      {
        q: 'What is AI search optimization, and do I actually need it?',
        a: "More people now ask AI tools like ChatGPT and Perplexity questions instead of typing a Google search. AI search optimization structures a site's content so those tools can find, understand, and recommend the business — the same job traditional SEO does for Google. It's a growing second channel, not a replacement for traditional search.",
      },
      {
        q: 'I was burned by an SEO company before — how is this different?',
        a: "Plain-English monthly reports explain exactly what's being done and why, with no proprietary jargon or vague check-the-box work. No long-term lock-in contract is required either — the work has to keep earning its place.",
      },
      {
        q: 'My website is already live — do you start from scratch?',
        a: "No. An existing site gets a technical and on-page audit first, so the plan builds on what's already working instead of discarding it.",
      },
      {
        q: 'How much does SEO cost?',
        a: "Every plan is scoped to the size of the business and how competitive its market is, so there isn't one flat number. The free project outline includes a transparent estimate before any commitment is made.",
      },
    ],
    finalCtaText: 'Ready to get found by the customers searching for you right now?',
    deliverables: [
      {
        title: 'Technical SEO audit & fixes',
        description:
          'The site is crawled and diagnosed for technical blockers that prevent search engines from indexing or ranking pages correctly.',
        output:
          'A prioritized technical audit and implemented fixes (speed, crawlability, mobile issues, structured data).',
        timeline: 'Month 1',
        outcome:
          'A site that search engines can crawl, understand, and rank without technical obstacles.',
      },
      {
        title: 'On-page optimization matched to real customer searches',
        description:
          'Page content, titles, headings, and internal links are aligned with the actual words customers use when searching.',
        output: 'Updated page copy, metadata, and keyword mapping based on real search data.',
        timeline: 'Month 1–2',
        outcome: 'Pages become relevant for the searches that drive revenue, not just traffic.',
      },
      {
        title: 'Local SEO (Google Business Profile)',
        description:
          'The business’s local presence is optimized so nearby searches turn into calls, visits, and map views.',
        output: 'An optimized Google Business Profile and local citation alignment.',
        timeline: 'Month 1',
        outcome: 'The business shows up correctly for “near me” and local service searches.',
      },
      {
        title: 'AI search optimization',
        description:
          'Content is structured so AI answer engines like ChatGPT, Perplexity, and Google AI Overviews can find, understand, and recommend the business.',
        output:
          'Clear entity signals, structured data, and content formatted for generative engine extraction.',
        timeline: 'Ongoing, starting month 1',
        outcome:
          'Visibility expands beyond traditional search into the AI tools buyers now use to ask questions.',
      },
      {
        title: 'Plain-English monthly reporting',
        description:
          'Each month the business receives a clear summary of what was done, what changed, and what happens next — no jargon or vanity metrics.',
        output: 'A monthly report with rankings, traffic, conversions, and the next month’s plan.',
        timeline: 'Monthly',
        outcome: 'Marketing decisions become informed and accountable instead of guesswork.',
      },
      {
        title: 'Ongoing optimization & iteration',
        description:
          'SEO is not a one-time task. The plan is adjusted each month based on data, algorithm changes, and competitive movement.',
        output: 'Monthly execution, content updates, and strategy refinements.',
        timeline: 'Months 2–6 and beyond',
        outcome:
          'Initial improvements in 30–60 days, with meaningful results compounding over 3–6 months.',
      },
    ],
    metaTitle: 'SEO & AI Search Optimization for Small Businesses | YDM Agency',
    metaDescription:
      'Get found on Google & AI tools like ChatGPT. Technical gaps fixed, content optimized for AI answers, and reports in plain English. Free project outline.',
    processPhases: [
      {
        phase: 1,
        title: 'Audit & Discovery',
        duration: '1–2 weeks',
        description:
          'Technical SEO audit is performed. Current rankings, competitors, and search opportunities are identified.',
      },
      {
        phase: 2,
        title: 'Foundation Fixes & On-Page Optimization',
        duration: '2–4 weeks',
        description:
          'Technical issues are resolved. On-page elements are optimized for target keywords and AI search readiness.',
      },
      {
        phase: 3,
        title: 'Content & Authority Building',
        duration: 'ongoing monthly',
        description:
          'Content strategy is executed. Authority signals are built through quality content and local SEO efforts.',
      },
      {
        phase: 4,
        title: 'Monthly Reporting & Iteration',
        duration: 'ongoing',
        description:
          'Progress is tracked and reported monthly. Strategy is adjusted based on performance data.',
      },
    ],
  },
  analytics: {
    slug: 'analytics',
    h1: 'Know Exactly Where Your Customers Come From',
    subhead:
      "Simple, honest tracking is set up and data is turned into plain-English reports — so guessing what's working stops.",
    problemSolution:
      "Problem / Solution\n\nYou're spending money on ads, SEO, and social, but when someone asks, 'What's actually working?' you're guessing. That ends here. Privacy-first tracking is set up that shows exactly which channel brings in leads and revenue - not just traffic. Every month you'll get a plain-English report with one or two clear actions, not a 40-page data dump.",
    included: [
      'Channel clarity — seeing exactly how much each source (Google, social, email, ads) actually contributes, not just how much traffic it sends',
      'Conversion tracking (which keywords/campaigns generate calls and form fills)',
      'Automatic "how did you hear about us" insight, without asking every customer',
      'Page performance and drop-off identification — seeing exactly where visitors leave before converting',
      'Month-over-month trends with clear recommendations, not just numbers',
      'Full setup included, on new or existing analytics accounts',
    ],
    whoItsFor:
      'Owners who can\'t answer "where are my leads actually coming from." Teams that need to prove marketing ROI. Anyone ready to double down on what\'s already working instead of splitting budget evenly across everything.',
    howItFits: [
      { label: 'SEO & AI Search Optimization', href: '/services/seo' },
      { label: 'Paid Advertising', href: '/services/paid-ads' },
      { label: 'CRM & Marketing Automation', href: '/services/automation' },
    ],
    workingWithYdm:
      "Everything is set up in your own accounts. You own the data, the profiles, the logins - not YDM Agency. Clean tracking is established first, then monthly plain-English reports follow — with one or two clear action items, not a 40-page data dump nobody reads. A live dashboard is provided for anytime access. Tracking is built with proper consent banners and respects user privacy - you stay compliant, your data stays reliable. No long-term contracts. If YDM Agency doesn't deliver measurable improvement, you can walk away after a month with everything still in your name.",
    faqs: [
      {
        q: "I don't have any tracking set up right now — where do we start?",
        a: 'A full install and configuration happens from the ground up — accounts, goals, and dashboards, all set up correctly from day one.',
      },
      {
        q: 'I already have Google Analytics — what does this add?',
        a: 'Custom, revenue-tied goals and dashboards get configured and explained in plain English, so existing data finally means something actionable instead of sitting unused.',
      },
      {
        q: 'Can every conversion actually be tracked?',
        a: "Most digital actions can — form fills, calls initiated from the site, clicks, purchases. Some can't be tracked perfectly by nature, like a walk-in customer who saw the site days earlier or a phone call placed without call tracking enabled. Where that's the case, it's stated plainly rather than papered over with an inflated number.",
      },
      {
        q: 'How often will I actually see reports?',
        a: 'A monthly summary is sufficient for most small businesses — enough to act on, without becoming another task to manage.',
      },
      {
        q: 'How much does analytics setup cost?',
        a: "Every analytics setup is scoped to the business, the channels being tracked, and whether existing accounts need cleanup, so there isn't one flat number. The free project outline includes a transparent estimate before any commitment is made.",
      },
      {
        q: 'Will this tell me if my marketing is actually working, or just show more numbers?',
        a: 'The reports are built around one question: what should happen next. Every monthly report includes specific action items, not just charts — the number of visitors matters far less than what to do about it.',
      },
    ],
    finalCtaText: 'Ready to stop guessing and start knowing?',
    deliverables: [
      {
        title: 'Channel clarity',
        description:
          'Traffic is attributed to the actual source that sent it — Google, social, email, ads, direct, referrals — so the business can see what each channel contributes.',
        output: 'A clean channel grouping and source report aligned to business goals.',
        timeline: 'Setup phase (1–2 weeks)',
        outcome: 'Budget stops being split evenly and starts flowing toward what actually works.',
      },
      {
        title: 'Conversion tracking',
        description:
          'The actions that matter — form fills, calls, purchases, bookings — are tracked and tied back to the marketing that drove them.',
        output:
          'Configured goals, events, and conversion reports in the business’s analytics account.',
        timeline: 'Setup phase (1–2 weeks)',
        outcome: 'The business knows which keywords, campaigns, and channels generate real leads.',
      },
      {
        title: 'Automatic “how did you hear about us” insight',
        description:
          'A tracking setup captures the source of leads and customers without relying on staff to ask every caller.',
        output: 'A reporting view showing how leads heard about the business.',
        timeline: 'Setup phase',
        outcome: 'Sales and marketing teams stop guessing where leads come from.',
      },
      {
        title: 'Page performance and drop-off identification',
        description:
          'Page-level data shows where visitors leave before converting, so problem pages can be fixed.',
        output: 'A page performance report with drop-off points and recommendations.',
        timeline: 'First reporting cycle and ongoing',
        outcome:
          'Conversion leaks are found and fixed with targeted changes instead of site-wide overhauls.',
      },
      {
        title: 'Month-over-month trends with clear recommendations',
        description:
          'Each monthly report focuses on what changed and what to do next, not vanity numbers.',
        output: 'Plain-English monthly report with 1–2 prioritized action items.',
        timeline: 'Monthly',
        outcome: 'Data turns into decisions instead of unread dashboards.',
      },
      {
        title: 'Full setup on new or existing accounts',
        description:
          'Analytics accounts are set up, cleaned, or reconfigured in the business’s own name — no black-box dashboards.',
        output: 'Fully configured analytics property, goals, and a live dashboard.',
        timeline: 'Setup phase (1–2 weeks)',
        outcome:
          'The business owns its data and can access it anytime without depending on a third party.',
      },
    ],
    metaTitle: 'Marketing Analytics & Attribution for Small Businesses | YDM Agency',
    metaDescription:
      "Know exactly where your leads come from. Privacy-first tracking, plain-English monthly reports. Free project outline.",
    processPhases: [
      {
        phase: 1,
        title: 'Setup & Configuration',
        duration: '1–2 weeks',
        description:
          'Analytics tools are installed and configured. Conversion tracking is set up for key actions.',
      },
      {
        phase: 2,
        title: 'First Reporting Cycle',
        duration: '1 month after setup',
        description:
          'Initial data is collected and analyzed. Baseline metrics are established and reported.',
      },
      {
        phase: 3,
        title: 'Monthly Refinement',
        duration: 'ongoing',
        description:
          'Reports are delivered monthly with clear insights and actionable recommendations.',
      },
    ],
  },
  'paid-ads': {
    slug: 'paid-ads',
    h1: 'Turn Ad Spend Into Customers, Not Just Clicks',
    subhead:
      "Whether launching a first campaign or rescuing a budget that's bleeding cash with nothing to show for it, ads are built, managed, and optimized to turn clicks into paying customers.",
    problemSolution:
      "Problem / Solution\n\nYour ad budget is leaking - paying for clicks from people who will never buy. Industry data shows the average small business wastes about 25% of their PPC budget on irrelevant clicks. YDM Agency stops that leakage. Campaigns are restructured so every dollar targets a real potential customer. With weekly adjustments and a live dashboard, you'll see exactly what's working. If after 90 days your cost per lead hasn't improved, YDM Agency helps find a better fit - no hard feelings, no long-term contracts.",
    included: [
      'Campaign strategy aligned to actual business goals, not just impressions',
      'Keyword research and search ad structure (Google), so budget targets people already looking to buy',
      'Audience targeting and creative setup (Meta), so ads reach the people most likely to act on them',
      'Conversion tracking on every click, so spend is tied to results, not guesswork',
      'Ongoing optimization — weekly adjustments, A/B testing',
      'Monthly plain-English report and a live dashboard, always visible',
    ],
    whoItsFor:
      'Businesses wanting visibility while SEO builds in the background. Local providers needing a steady, predictable stream of leads. Businesses able to commit at least $1,500–$3,000/month in platform ad spend, or a smaller test budget with the understanding that algorithmic optimization will take longer.',
    howItFits: [
      { label: 'Website Design & Development', href: '/services/web-design' },
      { label: 'Analytics & Attribution', href: '/services/analytics' },
      { label: 'SEO & AI Search Optimization', href: '/services/seo' },
    ],
    workingWithYdm:
      "A shared live dashboard means the campaign is never a black box. Daily monitoring and weekly adjustments keep spend efficient, and a monthly report explains plainly what happened and what's changing next. Full visibility. Ad spend is paid directly to the platforms from your account - it never passes through YDM Agency. You always see the real numbers. Everything is set up in your own accounts. You own the data, the profiles, the logins - not YDM Agency. No long-term contracts. If YDM Agency doesn't deliver measurable improvement, you can walk away after a month with everything still in your name.",
    faqs: [
      {
        q: 'How much of my budget actually goes to the ads themselves?',
        a: "Ad spend is paid directly to the platforms (Google, Meta) using the client's own payment method — it never passes through YDM Agency. Only the separate management fee is invoiced. That means billing can be checked directly against the platform at any time.",
      },
      {
        q: 'What does managing my campaign actually cost?',
        a: "Management fees are scoped to the campaign size, number of platforms, and how much ongoing optimization is needed, so there isn't one flat number. The free project outline includes a transparent estimate before any commitment is made.",
      },
      {
        q: 'Do I need a minimum ad budget to get started?',
        a: "There is no platform-enforced minimum, but most campaigns need enough conversion volume for the algorithm to optimize. For Google Smart Bidding, that typically means 30+ conversions per month; for Meta, about 50 optimization events per ad set per week. At 2026 benchmarks, that usually translates to $1,500–$3,000/month in ad spend for a single small campaign, though very low-cost verticals can sometimes start lower. The exact number depends on cost per click and cost per lead in your market, not the budget alone.",
      },
      {
        q: 'Should I run Google Ads, Meta Ads, or both?',
        a: "Google captures high-intent searches from people already looking to buy; Meta reaches people based on interest and behavior before they're actively searching. Many businesses use both, aimed at different stages of the same customer journey.",
      },
      {
        q: 'How fast will I see results?',
        a: 'Clicks and traffic start immediately once a campaign launches, but meaningful optimization — the kind that actually lowers cost per lead — typically takes 4 to 8 weeks of real data.',
      },
      {
        q: 'Do I need a dedicated landing page, or can ads point to my existing site?',
        a: "A dedicated landing page is strongly recommended, since it's built around one specific offer instead of competing with a homepage's other messages. It can be built alongside the ad campaign if one doesn't exist yet.",
      },
    ],
    finalCtaText: 'Ready to turn your ad budget into measurable growth?',
    deliverables: [
      {
        title: 'Campaign strategy aligned to business goals',
        description:
          'The campaign is built around a real outcome — leads, sales, bookings — not impressions or clicks.',
        output: 'A written campaign strategy with goals, budget allocation, and KPIs.',
        timeline: 'Phase 1 (1 week)',
        outcome: 'Ad spend is tied to business results from the start.',
      },
      {
        title: 'Keyword research and search ad structure (Google)',
        description:
          'The search campaigns target the exact queries people type when they are ready to buy.',
        output:
          'Structured Google Ads campaigns with keyword themes, match types, and negative keywords.',
        timeline: 'Phase 2 (1–2 weeks)',
        outcome: 'Budget goes toward high-intent searches instead of broad, expensive clicks.',
      },
      {
        title: 'Audience targeting and creative setup (Meta)',
        description:
          'Meta campaigns reach the people most likely to act, with creative and messaging built for the platform.',
        output: 'Audience definitions, ad sets, and launch-ready creative.',
        timeline: 'Phase 2 (1–2 weeks)',
        outcome: 'Ads are shown to the right people, not the widest possible audience.',
      },
      {
        title: 'Conversion tracking on every click',
        description:
          'Every meaningful action is tracked so the business knows exactly what the ad budget produced.',
        output: 'Conversion events, tracking tags, and attribution setup.',
        timeline: 'Phase 2',
        outcome: 'Cost per lead and return on ad spend become visible and optimizable.',
      },
      {
        title: 'Ongoing optimization — weekly adjustments, A/B testing',
        description:
          'Campaigns are watched and tuned weekly: bids, audiences, creative, and landing page alignment.',
        output: 'Weekly optimization log and monthly performance summary.',
        timeline: 'Phase 3 (ongoing)',
        outcome:
          'Ad performance improves over time instead of bleeding budget on underperforming ads.',
      },
      {
        title: 'Monthly plain-English report and live dashboard',
        description:
          'The business sees what was spent, what it produced, and what is changing next — in language that makes sense.',
        output: 'A shared live dashboard and a monthly report with action items.',
        timeline: 'Monthly',
        outcome: 'Full transparency; the campaign is never a black box.',
      },
    ],
    metaTitle: 'Google & Meta Ads Management for Small Businesses | YDM Agency',
    metaDescription:
      'Turn ad spend into customers with weekly optimization and a live dashboard. No lock-in. Free project outline.',
    processPhases: [
      {
        phase: 1,
        title: 'Strategy & Goal Setting',
        duration: '1 week',
        description:
          'Campaign objectives and target audiences are defined. Budget allocation and KPIs are established.',
      },
      {
        phase: 2,
        title: 'Campaign Build & Launch',
        duration: '1–2 weeks',
        description:
          'Ad creatives and copy are developed. Campaigns are launched with conversion tracking in place.',
      },
      {
        phase: 3,
        title: 'Ongoing Management & Optimization',
        duration: 'ongoing',
        description:
          'Weekly adjustments and A/B testing are performed. Monthly reports show performance and optimization actions.',
      },
    ],
  },
  branding: {
    slug: 'branding',
    h1: 'Branding & Positioning That Makes Customers Choose You',
    subhead:
      'Whether starting from scratch, tired of looking inconsistent, or unable to explain why someone should pick this business over the next one — messages are defined, identity is sharpened, and businesses are made unforgettable.',
    problemSolution:
      "Problem / Solution\n\nYour logo looks one way on the website, another on your business card, and when a prospect asks what makes you different, you fumble. YDM Agency fixes that. Deep discovery defines who you serve and why you're the right choice, then a visual identity and voice are crafted to make every touchpoint feel like the same confident business. The result? You stop explaining and start getting chosen.",
    included: [
      "Positioning statement — who the business serves, the problem it solves, and why it's the right choice",
      'Core messaging (mission, brand promise, elevator pitch) — so the business can be explained clearly in one sentence, not fumbled through',
      'Visual identity (logo refinement or creation, palette, typography, imagery style)',
      'A simple brand style guide, so every future piece — from a social post to a proposal — looks like it came from the same business',
      "Competitive clarity — a clear answer to what makes this business different from the next name on a prospect's list",
    ],
    whoItsFor:
      "New businesses that need a foundation to build on. Established businesses that have grown inconsistent across channels. Owners who can't yet put into words what makes the business different. Businesses that have simply outgrown their current brand.",
    howItFits: [
      { label: 'Website Design & Development', href: '/services/web-design' },
      { label: 'Content & Copywriting', href: '/services/content' },
      { label: 'Paid Advertising', href: '/services/paid-ads' },
    ],
    workingWithYdm:
      "Strategy always comes before visuals. YDM Agency won't touch a sketchbook until your positioning is crystal clear - deep discovery first, so messaging and identity get built on a real foundation instead of guesswork. All final assets are owned outright by the client once delivered. No long-term contracts. If YDM Agency doesn't deliver measurable improvement, you can walk away after a month with everything still in your name.",
    faqs: [
      {
        q: 'I already have a logo — do I need to start over?',
        a: "No. A full brand can be built around an existing logo if it's worth keeping, rather than discarding something that already has recognition.",
      },
      {
        q: "What's the difference between positioning and a tagline?",
        a: "Positioning is the internal, strategic foundation — who's served, what problem is solved, why this business specifically. A tagline is the short, customer-facing line that grows out of that foundation. Both are covered, but they're not the same thing.",
      },
      {
        q: 'Will a rebrand feel jarring to my current customers?',
        a: "There's usually a short adjustment period while new materials roll out across the website, social channels, and anywhere else the old identity lived — that's normal and expected, not something to pretend away. Once it's live everywhere consistently, most businesses find loyal customers adjust quickly, especially when the new brand actually captures what they already valued about the business.",
      },
      {
        q: 'How long does a branding project take?',
        a: 'Most branding projects take 2 to 4 weeks, depending on how much visual identity work is involved alongside the messaging.',
      },
      {
        q: 'How much does branding cost?',
        a: "Every branding project is scoped to the amount of messaging and visual identity work needed, so there isn't one flat number. The free project outline includes a transparent estimate before any commitment is made.",
      },
      {
        q: "I'm not a 'creative' person — how involved do I need to be?",
        a: 'Deep discovery upfront does most of the heavy lifting. Direction and feedback are needed at key points, but the strategic and creative work itself is handled directly.',
      },
    ],
    finalCtaText: 'Ready for a brand that does the selling before you even open your mouth?',
    deliverables: [
      {
        title: 'Positioning statement',
        description:
          'A clear definition of who the business serves, the problem it solves, and why it is the right choice.',
        output: 'A one-page positioning statement.',
        timeline: 'Phase 2 (3–5 days)',
        outcome: 'The business can explain its place in the market in one sentence.',
      },
      {
        title: 'Core messaging',
        description:
          'Mission, brand promise, and elevator pitch are defined so the business speaks consistently everywhere.',
        output: 'Core messaging document with mission, promise, pitch, and supporting messages.',
        timeline: 'Phase 2 (3–5 days)',
        outcome: 'Every channel says the same thing, the same way.',
      },
      {
        title: 'Visual identity',
        description:
          'Logo, color palette, typography, and imagery style are created or refined to match the positioning.',
        output: 'Logo files, color palette, type pairings, and imagery direction.',
        timeline: 'Phase 3 (1–2 weeks)',
        outcome: 'The brand looks cohesive, professional, and instantly recognizable.',
      },
      {
        title: 'Simple brand style guide',
        description:
          'A practical guide so anyone creating future materials can keep the brand consistent.',
        output: 'A brand style guide covering logo usage, colors, type, tone, and examples.',
        timeline: 'Phase 4 (2–3 days)',
        outcome:
          'Future marketing — social posts, proposals, ads — all look like the same business.',
      },
      {
        title: 'Competitive clarity',
        description:
          'A clear answer to what makes this business different from the next option on a prospect’s list.',
        output: 'Competitive differentiation statement and messaging.',
        timeline: 'Phase 2',
        outcome:
          'Prospects understand why to choose this business over competitors without having to figure it out themselves.',
      },
    ],
    metaTitle: 'Branding & Positioning for Small Businesses | YDM Agency',
    metaDescription:
      'Positioning, messaging, and visual identity that make you the obvious choice. Free project outline with a clear estimate.',
    processPhases: [
      {
        phase: 1,
        title: 'Discovery & Research',
        duration: '3–5 days',
        description:
          'Your business, market, and competitors are researched. Brand positioning opportunities are identified.',
      },
      {
        phase: 2,
        title: 'Messaging & Positioning',
        duration: '3–5 days',
        description:
          'Core messaging is defined. Positioning statement, mission, and brand promise are crafted.',
      },
      {
        phase: 3,
        title: 'Visual Identity Development',
        duration: '1–2 weeks',
        description:
          'Logo, color palette, typography, and imagery style are created. Brand guidelines are documented.',
      },
      {
        phase: 4,
        title: 'Application & Handoff',
        duration: '2–3 days',
        description:
          'Brand assets are finalized and delivered. Implementation guidance is provided.',
      },
    ],
  },
  content: {
    slug: 'content',
    h1: 'Words That Turn Visitors Into Customers',
    subhead:
      'Great design gets someone to look. Great words get someone to act. Whether a full website is needed written from scratch, a landing page that converts, or ongoing content that brings in search traffic — copy is written that sounds like you and sells like crazy.',
    problemSolution:
      "Problem / Solution\n\nYour website talks about your features, but your customers only care about what's in it for them. Copy is rewritten to start with their problem and lead to your solution - the same method that lifts conversion rates across industries. It's also structured so AI search engines can easily extract and cite your content, giving you double visibility.",
    included: [
      'Website copy (home, about, services, contact)',
      'Landing page copy built around a single goal',
      'Blog and article content (SEO‑aware, interesting)',
      'Discovery process to capture your voice',
      'Revisions to ensure the final copy feels authentically yours',
    ],
    whoItsFor:
      'New businesses needing complete website copy, those whose site doesn’t clearly explain what they do, product/service launches, ongoing blog content for SEO.',
    howItFits: [
      {
        label: 'Pair with Web Design so words and visuals work together',
        href: '/services/web-design',
      },
      {
        label: 'Pair with Branding & Positioning to define the message before writing',
        href: '/services/branding',
      },
      {
        label: 'Pair with SEO to ensure copy targets the right search terms',
        href: '/services/seo',
      },
    ],
    workingWithYdm:
      "Before a word is written, a voice interview locks in your tone. The final copy will sound like you on your best day - not a generic writer. Discovery first, then benefit-driven, conversational copy. AI-driven audience research combines with human editing, so copy is strategically informed and reads like a real person. Full rights transfer upon delivery. No long-term contracts. If YDM Agency doesn't deliver measurable improvement, you can walk away after a month with everything still in your name.",
    faqs: [
      {
        q: 'Are revisions included?',
        a: 'Yes. Reasonable back-and-forth is included so the final copy feels authentically yours.',
      },
      {
        q: 'Will the writer understand my industry?',
        a: 'Deep research is done before drafting. You bring the expertise; YDM Agency translates it into clear, customer-focused copy.',
      },
      {
        q: 'Can you work with copy I already have?',
        a: 'Yes. Existing copy can be reviewed and improved rather than started from scratch.',
      },
      {
        q: 'Is the copy optimized for SEO?',
        a: 'Yes. Every piece is optimized for search while reading naturally.',
      },
      {
        q: 'How do you match my brand voice?',
        a: 'Discovery captures your tone, and refinement continues until the copy feels right.',
      },
    ],
    finalCtaText: 'Ready for words that work as hard as you do?',
    deliverables: [
      {
        title: 'Website copy',
        description:
          'Home, about, services, and contact pages are written to sound like the business and move visitors toward action.',
        output: 'Final website copy in an editable format, ready for design or implementation.',
        timeline: 'Phase 2 (1–2 weeks)',
        outcome:
          'The site explains what the business does and why it matters without relying on the visitor to translate.',
      },
      {
        title: 'Landing page copy',
        description:
          'A dedicated page is written around one goal — a call, a form, a sale — with no competing messages.',
        output: 'Conversion-focused landing page copy with headline, body, and CTA.',
        timeline: 'Phase 2',
        outcome: 'A page that supports ads or campaigns by speaking directly to one offer.',
      },
      {
        title: 'Blog and article content',
        description:
          'SEO-aware articles are written to attract search traffic and demonstrate expertise without sounding robotic.',
        output: 'Draft blog posts or article outlines, ready for review.',
        timeline: 'Phase 2–3',
        outcome:
          'The business becomes discoverable for long-tail searches and has content to share across channels.',
      },
      {
        title: 'Discovery process to capture voice',
        description:
          'A structured interview and research process captures the business’s tone, audience, and key messages before writing starts.',
        output: 'Voice and tone brief plus content strategy notes.',
        timeline: 'Phase 1 (2–4 days)',
        outcome: 'The final copy sounds like the real business, not a generic writer.',
      },
      {
        title: 'Revisions',
        description:
          'Back-and-forth refinement is included so the copy feels authentic and hits the mark.',
        output: 'Revised drafts based on feedback.',
        timeline: 'Phase 2',
        outcome: 'The business owns the final words and is confident in how it sounds.',
      },
    ],
    metaTitle: 'Content & SEO Copywriting for Small Businesses | YDM Agency',
    metaDescription:
      'Website, landing page, and blog copy that sounds like you and converts. Free project outline, no obligation.',
    processPhases: [
      {
        phase: 1,
        title: 'Discovery & Voice Capture',
        duration: '2–4 days',
        description:
          'Your voice and tone are captured through discovery. Audience and messaging goals are defined.',
      },
      {
        phase: 2,
        title: 'First Drafts & Iteration',
        duration: '1–2 weeks',
        description:
          'Copy is drafted and refined through collaboration. Revisions ensure authenticity and impact.',
      },
      {
        phase: 3,
        title: 'SEO Polish & Final Delivery',
        duration: '2–3 days',
        description:
          'Final copy is optimized for search. All deliverables are provided in editable format.',
      },
    ],
  },
  automation: {
    slug: 'automation',
    h1: 'Never Lose Track of a Lead Again',
    subhead:
      'Systems are set up that automatically follow up, flag who to call, and make sure every inquiry gets a response — personalized and on time, even overnight.',
    problemSolution:
      "Problem / Solution\n\nThe average lead goes to the first responder - if you reply after 30 minutes, you've likely lost the sale. Automated workflows ensure every inquiry gets an instant, personalized acknowledgment, then a follow-up sequence that moves them toward a decision - without you touching a thing. It's like hiring a 24/7 sales assistant that never forgets.",
    included: [
      'Instant lead acknowledgment (email/SMS), so no one is left wondering if their message actually went through',
      'Appointment confirmations and reminders',
      'Lead nurture sequences',
      'Lead scoring and routing — surfacing which leads to call first, instead of working through inquiries in whatever order they arrived',
      'Post-project follow-ups (review requests, feedback)',
      'A central dashboard showing every lead and every interaction in one place',
    ],
    whoItsFor:
      "Businesses currently tracking leads manually. A CRM that's gone dusty and unused. Anyone who's lost a sale to a missed follow-up before. Growing businesses that need a process built to scale, not a spreadsheet held together by habit.",
    howItFits: [
      { label: 'Website Design & Development', href: '/services/web-design' },
      { label: 'Analytics & Attribution', href: '/services/analytics' },
      { label: 'Reputation & Review Management', href: '/services/reputation' },
    ],
    workingWithYdm:
      "Every automation is built with explicit opt-in and easy opt-out. You stay compliant, always. Current lead flow gets audited first, then a workflow is designed around the right tools for that specific business. Everything is set up in your own accounts. You own the data, the profiles, the logins - not YDM Agency. Documentation and optional training are included, so the system doesn't depend on YDM Agency to keep running day-to-day. No long-term contracts. If YDM Agency doesn't deliver measurable improvement, you can walk away after a month with everything still in your name.",
    faqs: [
      {
        q: 'Is automated follow-up actually legal and compliant?',
        a: 'Yes — automated SMS and email outreach is subject to real opt-in and consent rules, and every workflow is built to follow them, not around them. That means proper consent capture and easy opt-out are part of the setup from day one, not an afterthought bolted on later.',
      },
      {
        q: "I already have a CRM I'm not using — do we start over?",
        a: 'Not necessarily. An existing CRM can often be revived and reconfigured rather than replaced outright, if the underlying tool still fits the business.',
      },
      {
        q: 'Will automated messages feel spammy to my customers?',
        a: 'Sequences are designed to feel helpful and personal — timed and worded like a real follow-up, not a mass blast. The goal is a response that feels like it came from a person paying attention, not a script.',
      },
      {
        q: 'How long does setup take?',
        a: 'Most automation builds take 1 to 2 weeks, depending on how many workflows and tools are involved.',
      },
      {
        q: 'Can the workflows be adjusted later if my process changes?',
        a: 'Yes — workflows are built to be flexible and adjusted as the business changes, not locked in permanently at setup.',
      },
      {
        q: 'How much does CRM setup and automation cost?',
        a: "Every CRM and automation setup is scoped to the number of workflows, tools, and integrations needed, so there isn't one flat number. The free project outline includes a transparent estimate before any commitment is made.",
      },
    ],
    finalCtaText: 'Ready to stop losing leads to follow-up gaps?',
    deliverables: [
      {
        title: 'Instant lead acknowledgment',
        description:
          'Every inquiry receives an immediate email or SMS response so the prospect knows their message was received.',
        output: 'Configured acknowledgment workflows with branded messaging.',
        timeline: 'Phase 3 (1 week)',
        outcome: 'No lead is left wondering if their form or message went into a black hole.',
      },
      {
        title: 'Appointment confirmations and reminders',
        description:
          'Bookings are confirmed and reminded automatically, reducing no-shows and manual back-and-forth.',
        output: 'Automated confirmation and reminder sequences.',
        timeline: 'Phase 3',
        outcome: 'Fewer missed appointments and less administrative time spent on scheduling.',
      },
      {
        title: 'Lead nurture sequences',
        description:
          'A series of helpful, timed follow-ups keeps prospects warm and moves them toward a decision.',
        output: 'Configured email/SMS nurture workflows.',
        timeline: 'Phase 3',
        outcome: 'More leads convert over time without manual chasing.',
      },
      {
        title: 'Lead scoring and routing',
        description:
          'Inquiries are scored and routed to the right person so the best leads get attention first.',
        output: 'Lead scoring rules and routing logic inside the CRM.',
        timeline: 'Phase 3',
        outcome:
          'Sales time is spent on the leads most likely to close, not on sorting through inboxes.',
      },
      {
        title: 'Post-project follow-ups',
        description:
          'Review requests and feedback outreach are automated after a project or purchase is completed.',
        output: 'Post-project follow-up workflows and review request sequences.',
        timeline: 'Phase 3',
        outcome: 'More genuine reviews and feedback without awkward manual asks.',
      },
      {
        title: 'A central dashboard',
        description:
          'Every lead and interaction is visible in one place, so nothing falls through the cracks.',
        output: 'A CRM dashboard configured for the business’s pipeline.',
        timeline: 'Phase 2–3',
        outcome: 'The team sees the full picture of every lead and every follow-up in real time.',
      },
    ],
    metaTitle: 'CRM, Email & Marketing Automation for Small Businesses | YDM Agency',
    metaDescription:
      'Never lose a lead again. Automated follow-up, lead routing, and a central dashboard - set up in your own accounts. Free project outline.',
    processPhases: [
      {
        phase: 1,
        title: 'Process Audit & Mapping',
        duration: '2–4 days',
        description:
          'Current lead flow is audited. Automation opportunities are identified and mapped.',
      },
      {
        phase: 2,
        title: 'Tool Selection & Setup',
        duration: '1–2 weeks',
        description:
          'Appropriate tools are selected. Accounts are set up in your name with full ownership.',
      },
      {
        phase: 3,
        title: 'Workflow Automation & Testing',
        duration: '1 week',
        description:
          'Automated workflows are built and tested. Documentation and optional training are provided.',
      },
    ],
  },
  reputation: {
    slug: 'reputation',
    h1: 'Turn Your Online Reputation Into Your Biggest Asset',
    subhead:
      'Most customers check your reviews before they ever call. If your profile is outdated, your reviews are thin, or a bad one is sitting unanswered — business is being lost.',
    problemSolution:
      "Problem / Solution\n\n98% of consumers read online reviews before contacting a business (BrightLocal). A single unanswered negative review can cost you nearly 22% of potential customers. If your profile is outdated, your reviews are thin, or a bad one sits unanswered, you're actively losing business. YDM Agency optimizes your Google Business Profile, builds a system that automatically generates new reviews, and crafts professional responses - typically within 24 hours. Once it's set up, reviews flow in without you having to ask.",
    included: [
      'Google Business Profile setup and full optimization, so the business shows up correctly the moment someone searches nearby',
      'A compliant review-generation system (QR codes, follow-up emails, SMS)',
      "Regular profile posts and updates, signaling an active, trustworthy business to both customers and Google's own ranking signals",
      'Real-time review monitoring and alerts',
      'Professional response drafts for every review, positive and negative',
      'Monthly reputation summary',
    ],
    whoItsFor:
      '"Near me" search-reliant local businesses. Untouched or neglected profiles. Businesses unsure how to respond to a negative review without making it worse. Anyone without a systematic process for generating new reviews.',
    howItFits: [
      { label: 'SEO & AI Search Optimization', href: '/services/seo' },
      { label: 'CRM & Marketing Automation', href: '/services/automation' },
      { label: 'Website Design & Development', href: '/services/web-design' },
    ],
    workingWithYdm:
      "A full profile audit comes first, then a review-generation system is built to fit how customers actually interact with the business. Negative reviews get a calm, professional response drafted promptly — never left to sit. Everything is set up in your own accounts. You own the data, the profiles, the logins - not YDM Agency. Your profile stays in your own Google account; YDM Agency just makes it work harder. No long-term contracts. If YDM Agency doesn't deliver measurable improvement, you can walk away after a month with everything still in your name.",
    faqs: [
      {
        q: 'Can a bad review just be removed?',
        a: "Only if it violates platform policy — a fake review, harassment, that kind of thing. A legitimate but unflattering review can't simply be taken down. What works instead is a calm, professional public response, which often does more to build trust with future customers than the negative review does to hurt it.",
      },
      {
        q: 'Is it okay to offer a discount or incentive for leaving a review?',
        a: "No — incentivizing reviews isn't allowed under platform policy, and every strategy used here stays fully compliant. More reviews come from making it easy (direct links) and asking at the right moment, not from paying for them.",
      },
      {
        q: 'My profile is basically empty right now — is that actually hurting me?',
        a: "Yes, more than most owners realize. An incomplete profile ranks and converts significantly worse than a fully optimized one — it's often the single biggest fixable gap for a local business.",
      },
      {
        q: 'Who actually owns the Google Business Profile once this is set up?',
        a: "The business does, fully. Profiles remain under the client's own Google account the entire time — there's no dependency on YDM Agency to keep access.",
      },
      {
        q: 'How fast are negative reviews addressed?',
        a: 'Negative reviews are addressed within 24 hours, with a response drafted for approval or, if preferred, posted directly.',
      },
      {
        q: 'How much does reputation management cost?',
        a: "Every reputation management plan is scoped to the business, its current profile state, and how active review management needs to be, so there isn't one flat number. The free project outline includes a transparent estimate before any commitment is made.",
      },
    ],
    finalCtaText: 'Ready to turn your online reputation into your biggest asset?',
    deliverables: [
      {
        title: 'Google Business Profile setup and full optimization',
        description:
          'The profile is completed, corrected, and optimized with categories, services, photos, and business information.',
        output: 'A fully optimized Google Business Profile under the client’s own account.',
        timeline: 'Phase 1 (1–2 days)',
        outcome: 'The business shows up accurately in local and “near me” searches.',
      },
      {
        title: 'Compliant review-generation system',
        description:
          'A simple, platform-compliant system is built to make it easy for happy customers to leave reviews.',
        output: 'QR cards, follow-up emails or SMS, and direct review links.',
        timeline: 'Phase 2 (1 week)',
        outcome: 'A steady, organic flow of new reviews without policy violations.',
      },
      {
        title: 'Regular profile posts and updates',
        description:
          'The profile stays active with posts, offers, and updates that signal a live, trustworthy business.',
        output: 'Scheduled or monthly profile posts.',
        timeline: 'Ongoing monthly',
        outcome:
          'The profile remains fresh and engaging to both customers and Google’s ranking signals.',
      },
      {
        title: 'Real-time review monitoring and alerts',
        description: 'New reviews are tracked as they come in so nothing sits unanswered.',
        output: 'Review alert system and monitoring dashboard.',
        timeline: 'Phase 2',
        outcome: 'Negative reviews are caught early and addressed before they damage reputation.',
      },
      {
        title: 'Professional response drafts for every review',
        description:
          'Calm, professional responses are drafted for positive and negative reviews, ready for approval or posting.',
        output: 'Response drafts and, if preferred, posted replies.',
        timeline: 'Within 24 hours of new review',
        outcome: 'Public responses build trust with future customers and show the business cares.',
      },
      {
        title: 'Monthly reputation summary',
        description:
          'Each month the business receives a snapshot of reviews, ratings, profile activity, and trends.',
        output: 'Monthly reputation report.',
        timeline: 'Monthly',
        outcome: 'The business sees how its reputation is trending and where to focus next.',
      },
    ],
    metaTitle: 'Google Business Profile & Review Management for Small Businesses | YDM Agency',
    metaDescription:
      'Proactive review generation, 24-hour negative review response, and a fully optimized profile. Free project outline.',
    processPhases: [
      {
        phase: 1,
        title: 'Profile Audit & Optimization',
        duration: '1–2 days',
        description:
          'Google Business Profile is audited and optimized. Missing information is completed.',
      },
      {
        phase: 2,
        title: 'Review Generation System Setup',
        duration: '1 week',
        description:
          'Compliant review generation system is built. QR codes and automated requests are configured.',
      },
      {
        phase: 3,
        title: 'Ongoing Monitoring & Response',
        duration: 'monthly',
        description:
          'Reviews are monitored and responses are drafted. Monthly reputation summaries are provided.',
      },
    ],
  },
};
