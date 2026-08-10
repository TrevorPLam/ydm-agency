/**
 * FILE: page.tsx
 * PURPOSE: Renders the /services/process hub page describing the five-phase client lifecycle, service-specific process links, what-to-expect, FAQs, and a final CTA.
 * ARCHITECTURE: Server component generating metadata via constructMetadata; renders static PHASES, SERVICE_PROCESS_LINKS, and FAQS data inline.
 * KEY RULES: Must use the firm-level impersonal voice; service process links must point to /services/[slug]/process; final CTA must point to /contact.
 * DEPENDS ON: next/link, @ydm-agency/ui (Button, Container), @ydm-agency/seo (constructMetadata).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import Link from 'next/link';
import { Button } from '@ydm-agency/ui';
import { Container } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';

const PHASES = [
  {
    phase: 1,
    title: 'Initial Conversation',
    description: 'A short call or detailed questionnaire captures your business, challenges, and definition of success. The goal is to determine mutual fit — no pitch, no pressure.',
    whatYouReceive: 'A summary of the discussion and a decision on next steps.',
  },
  {
    phase: 2,
    title: 'Scope & Proposal',
    description: 'The project is defined concretely: deliverables, timeline, and investment. Every assumption is documented.',
    whatYouReceive: 'A written proposal with a fixed-price scope or transparent estimate.',
  },
  {
    phase: 3,
    title: 'Delivery & Collaboration',
    description: 'Work proceeds in defined phases with regular previews and feedback loops. Modern, AI-augmented tools accelerate execution without cutting corners. Progress is visible early and often — no black boxes.',
    whatYouReceive: 'Access to staging links, dashboards, or draft deliverables, depending on the service.',
  },
  {
    phase: 4,
    title: 'Launch & Handoff',
    description: 'Performance, accessibility, and integration testing is completed before deployment. Final files, documentation, and any necessary training are handed over.',
    whatYouReceive: 'A live, fully functioning deliverable and continued availability for questions.',
  },
  {
    phase: 5,
    title: 'Ongoing Support (Optional)',
    description: 'Many clients choose to continue with maintenance, SEO, or content retainers. The relationship doesn&apos;t end at launch unless that is preferred.',
    whatYouReceive: 'Optional ongoing plans that keep the project performing and up-to-date.',
  },
];

const SERVICE_PROCESS_LINKS = [
  { label: 'Web Design Process', href: '/services/web-design/process' },
  { label: 'SEO & AI Search Process', href: '/services/seo/process' },
  { label: 'Analytics & Attribution Process', href: '/services/analytics/process' },
  { label: 'Paid Advertising Process', href: '/services/paid-ads/process' },
  { label: 'Branding & Positioning Process', href: '/services/branding/process' },
  { label: 'Content & Copywriting Process', href: '/services/content/process' },
  { label: 'CRM & Automation Process', href: '/services/automation/process' },
  { label: 'Reputation & Review Management Process', href: '/services/reputation/process' },
];

const FAQS = [
  {
    q: 'How quickly can a project start?',
    a: 'Most begin within one week of an approved scope.',
  },
  {
    q: 'How involved does a client need to be?',
    a: 'Enough to provide direction and feedback at key milestones. The heavy lifting is handled.',
  },
  {
    q: 'What if needs change mid-way?',
    a: 'Scope adjustments are discussed openly and documented — no hidden change fees.',
  },
  {
    q: 'Is there a minimum project size?',
    a: 'No. Small projects are evaluated on the same structured basis.',
  },
];

/**
 * WHAT IT DOES: Generates the SEO metadata for the process hub page via constructMetadata.
 * @return {Promise<Metadata>} - Next.js metadata object for the process hub
 * SIDE EFFECTS: None (pure async function).
 * ASSUMES: constructMetadata provides sensible defaults.
 */
export async function generateMetadata() {
  return constructMetadata({
    title: 'Our Process | YDM Agency',
    description: 'A five-phase client lifecycle built around transparency, clear deliverables, and measurable outcomes.',
  });
}

/**
 * WHAT IT DOES: Renders the process hub page with the five-phase client lifecycle, service-specific process links, what-to-expect section, FAQs, and a final CTA.
 * @return {JSX.Element} - Rendered process hub page
 * SIDE EFFECTS: None (server-side rendering).
 * ASSUMES: SERVICE_PROCESS_LINKS hrefs point to existing service process spoke pages.
 */
export default function ProcessHubPage() {
  return (
    <main className="min-h-screen bg-background text-text-primary">
      <Container className="py-24 md:py-32">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            How Projects Come Together at YDM Agency
          </h1>
          <p className="text-xl text-text-secondary">
            A structured, transparent approach that turns your goals into a finished project — on time, without surprises.
          </p>
        </div>

        {/* The Client Lifecycle */}
        <section className="mb-24">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">The Client Lifecycle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PHASES.map((phase) => (
              <div
                key={phase.phase}
                className="bg-surface border border-border rounded-xl p-8 hover:border-accent transition-colors"
              >
                <div className="text-accent font-bold text-sm mb-2">Phase {phase.phase}</div>
                <h3 className="text-xl font-display font-bold mb-4">{phase.title}</h3>
                <p className="text-text-secondary mb-6">{phase.description}</p>
                <div className="bg-background border border-border rounded-lg p-4">
                  <p className="text-sm font-medium text-text-primary">
                    <span className="text-accent">What you receive:</span> {phase.whatYouReceive}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Service-Specific Processes */}
        <section className="mb-24">
          <h2 className="text-3xl font-display font-bold mb-4 text-center">Service-Specific Processes</h2>
          <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
            Each service has a detailed breakdown with phases, durations, and FAQs. Select the one matching your project to see exactly how it unfolds:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SERVICE_PROCESS_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-surface border border-border rounded-lg p-4 hover:border-accent hover:bg-surface/80 transition-colors text-center"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        {/* What to Expect */}
        <section className="mb-24 bg-surface border border-border rounded-xl p-8 md:p-12">
          <h2 className="text-3xl font-display font-bold mb-6">What to Expect</h2>
          <p className="text-text-secondary leading-relaxed">
            Direct access to the professional executing the work — no handoffs, no account managers filtering information. Clear milestones and regular previews ensure you&apos;ll never wonder what&apos;s happening. Modern tools and a disciplined process mean faster delivery and transparent reporting — always.
          </p>
        </section>

        {/* FAQs */}
        <section className="mb-24">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">FAQs</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq, index) => (
              <details
                key={index}
                className="bg-surface border border-border rounded-lg group"
              >
                <summary className="cursor-pointer p-6 font-medium hover:text-accent transition-colors list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-text-secondary group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-6 text-text-secondary">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Get a clear project outline with no obligation.
          </p>
          <Button variant="primary" asChild>
            <Link href="/contact">Get a Free Project Outline</Link>
          </Button>
        </section>
      </Container>
    </main>
  );
}
