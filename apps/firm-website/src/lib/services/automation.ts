/**
 * FILE: automation.ts
 * PURPOSE: Automation service configuration
 */
import { ServiceConfig } from '../services-config';

export const automationConfig: ServiceConfig = {
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
      output: "A CRM dashboard configured for the business's pipeline.",
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
};
