/**
 * FILE: seo.ts
 * PURPOSE: SEO service configuration
 */
import { ServiceConfig } from '../services-config';

export const seoConfig: ServiceConfig = {
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
      outcome: 'The business shows up correctly for "near me" and local service searches.',
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
      output: "A monthly report with rankings, traffic, conversions, and the next month's plan.",
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
};
