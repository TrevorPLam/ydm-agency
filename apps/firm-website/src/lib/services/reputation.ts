/**
 * FILE: reputation.ts
 * PURPOSE: Reputation service configuration
 */
import { ServiceConfig } from '../services-config';

export const reputationConfig: ServiceConfig = {
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
      output: "A fully optimized Google Business Profile under the client's own account.",
      timeline: 'Phase 1 (1–2 days)',
      outcome: 'The business shows up accurately in local and "near me" searches.',
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
        "The profile remains fresh and engaging to both customers and Google's ranking signals.",
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
};
