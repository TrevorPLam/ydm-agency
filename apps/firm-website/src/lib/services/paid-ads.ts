/**
 * FILE: paid-ads.ts
 * PURPOSE: Paid ads service configuration
 */
import { ServiceConfig } from '../services-config';

export const paidAdsConfig: ServiceConfig = {
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
};
