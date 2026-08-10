/**
 * FILE: branding.ts
 * PURPOSE: Branding service configuration
 */
import { ServiceConfig } from '../services-config';

export const brandingConfig: ServiceConfig = {
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
        "A clear answer to what makes this business different from the next option on a prospect's list.",
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
};
