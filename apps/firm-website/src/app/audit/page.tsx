import Link from 'next/link';
import { Container, Button } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';
import { AuditForm } from '@/components/AuditForm';

export async function generateMetadata() {
  return constructMetadata({
    title: 'Free Marketing Audit | YDM Agency',
    description:
      'Get a free marketing audit — website, traffic, leads, and conversion gaps reviewed with clear next steps. No obligation.',
  });
}

const AUDIT_COVERAGE = [
  {
    title: 'Website health',
    description:
      'The website health check covers speed, mobile experience, broken links, accessibility, and how well the site guides visitors toward a conversion. It flags anything that makes the site slow, confusing, or untrustworthy.',
  },
  {
    title: 'Traffic and visibility',
    description:
      'The traffic and visibility review looks at where visitors come from, how the business shows up in search, and whether local SEO and AI search signals are in place. It identifies gaps that keep the site from being found.',
  },
  {
    title: 'Lead and conversion gaps',
    description:
      'The conversion and lead-flow review examines forms, calls-to-action, tracking, and where visitors drop off before becoming leads. It finds the leaks that cost inquiries and sales.',
  },
  {
    title: 'Next-step recommendations',
    description:
      'The final output is a prioritized action list with the highest-impact fixes first, the best-fit YDM Agency services for each, and a realistic budget and timeline for next steps.',
  },
];

export default function AuditPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-24 md:py-32">
        <Container>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6">
            Free Marketing Audit
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl">
            Get a structured review of what is working, what is leaking, and what to fix first — with
            clear, prioritized next steps.
          </p>
        </Container>
      </section>

      {/* What the audit covers */}
      <section className="py-16 md:py-24 bg-surface border-y border-border">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
            <div>
              <h2 className="text-2xl font-display font-semibold text-text-primary mb-4">
                What the Audit Covers
              </h2>
              <ul className="space-y-4 text-text-secondary">
                {AUDIT_COVERAGE.map((item, index) => (
                  <li key={index}>
                    <span className="text-text-primary font-medium">{item.title}:</span>{' '}
                    {item.description}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-display font-semibold text-text-primary mb-4">
                What You Receive
              </h2>
              <p className="text-text-secondary mb-4">
                A written audit report with prioritized actions, plus a short video walkthrough
                explaining the findings and recommended next steps. The report is clear, jargon-free,
                and ready to act on.
              </p>
              <p className="text-text-secondary">
                Turnaround: 2 business days after the request form is submitted.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Form */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-text-primary mb-4 text-center">
              Request Your Free Audit
            </h2>
            <p className="text-text-secondary text-center mb-8">
              Takes about 2 minutes. No spam, no sales pressure — just an honest assessment.
            </p>
            <AuditForm />
            <p className="text-text-secondary text-center mt-6 text-xs">
              By submitting, you agree to YDM Agency reviewing the information provided. See the{' '}
              <Link href="/privacy" className="text-accent hover:text-accent-hover underline underline-offset-4">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-surface border-t border-border">
        <Container>
          <div className="max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-6">
              Prefer to talk it through?
            </h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              A free project outline can also be provided — no obligation.
            </p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">Get a Free Project Outline</Link>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
