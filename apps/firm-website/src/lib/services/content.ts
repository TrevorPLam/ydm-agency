/**
 * FILE: content.ts
 * PURPOSE: Content service configuration
 */
import { ServiceConfig } from '../services-config';

export const contentConfig: ServiceConfig = {
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
    "New businesses needing complete website copy, those whose site doesn't clearly explain what they do, product/service launches, ongoing blog content for SEO.",
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
        "A structured interview and research process captures the business's tone, audience, and key messages before writing starts.",
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
};
