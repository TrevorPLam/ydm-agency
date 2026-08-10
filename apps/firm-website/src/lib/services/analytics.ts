/**
 * FILE: analytics.ts
 * PURPOSE: Analytics service configuration
 */
import { ServiceConfig } from '../services-config';

export const analyticsConfig: ServiceConfig = {
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
        "Configured goals, events, and conversion reports in the business's analytics account.",
      timeline: 'Setup phase (1–2 weeks)',
      outcome: 'The business knows which keywords, campaigns, and channels generate real leads.',
    },
    {
      title: 'Automatic "how did you hear about us" insight',
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
        "Analytics accounts are set up, cleaned, or reconfigured in the business's own name — no black-box dashboards.",
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
};
