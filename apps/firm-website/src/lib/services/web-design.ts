/**
 * FILE: web-design.ts
 * PURPOSE: Web design service configuration
 */
import { ServiceConfig } from '../services-config';

export const webDesignConfig: ServiceConfig = {
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
};
