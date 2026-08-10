/**
 * FILE: page.tsx
 * PURPOSE: Renders the /services/compare page with scenario cards and a service fit matrix that helps visitors choose the right starting service.
 * ARCHITECTURE: Server component generating metadata via constructMetadata; renders COMPARISON_SCENARIOS as cards and a fit matrix using getFitLevel and SERVICE_LABELS.
 * KEY RULES: Must use the firm-level impersonal voice; scenario estimate links must prefill the pricing estimator via ?situation=; final CTA must point to /contact.
 * DEPENDS ON: next/link, @ydm-agency/ui (Container, Button, Card, Badge), @ydm-agency/seo (constructMetadata), @/lib/service-labels, @/lib/service-comparison-config.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import Link from 'next/link';
import { Container, Button, Card, Badge } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';
import { SERVICE_LABELS } from '@/lib/service-labels';
import { COMPARISON_SCENARIOS, getFitLevel, type FitLevel } from '@/lib/service-comparison-config';

/**
 * WHAT IT DOES: Generates the SEO metadata for the compare page via constructMetadata.
 * @return {Promise<Metadata>} - Next.js metadata object for the compare page
 * SIDE EFFECTS: None (pure async function).
 * ASSUMES: constructMetadata provides sensible defaults.
 */
export async function generateMetadata() {
  return constructMetadata({
    title: 'Compare Services | YDM Agency',
    description:
      'Not sure which YDM Agency service fits your business? Compare services by scenario and find the right starting point.',
  });
}

/**
 * WHAT IT DOES: Renders a single fit-matrix cell, displaying 'Best fit' as an accent Badge, 'Also consider' as secondary text, and '—' as muted text.
 * @param {{ level: FitLevel }} props - Fit level to render
 * @return {JSX.Element} - Rendered fit cell
 * SIDE EFFECTS: None (pure rendering component).
 * ASSUMES: level is one of the FitLevel union values.
 */
function FitCell({ level }: { level: FitLevel }) {
  if (level === 'Best fit') {
    return <Badge variant="accent">{level}</Badge>;
  }
  if (level === 'Also consider') {
    return <span className="text-text-secondary text-sm">{level}</span>;
  }
  return <span className="text-text-secondary/50 text-sm">{level}</span>;
}

const serviceSlugs = Object.keys(SERVICE_LABELS);

/**
 * WHAT IT DOES: Renders the service comparison page with scenario cards, a service fit matrix, and a final CTA.
 * @return {JSX.Element} - Rendered compare page
 * SIDE EFFECTS: None (server-side rendering).
 * ASSUMES: COMPARISON_SCENARIOS and SERVICE_LABELS share compatible service slugs.
 */
export default function ServiceComparisonPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-24 md:py-32">
        <Container>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6">
            Compare Services for Your Business
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl">
            Pick the situation that matches where the business is right now. YDM Agency will recommend
            the best-fit starting point and what to do next.
          </p>
        </Container>
      </section>

      {/* Scenario cards */}
      <section className="py-16 md:py-24 bg-surface border-y border-border">
        <Container>
          <h2 className="text-3xl font-display font-bold text-text-primary mb-8">
            Find Your Starting Point
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMPARISON_SCENARIOS.map((scenario) => (
              <Card key={scenario.id} className="p-6 h-full flex flex-col">
                <h3 className="text-xl font-display font-semibold text-text-primary mb-3">
                  {scenario.title}
                </h3>
                <p className="text-text-secondary mb-6 flex-1">{scenario.description}</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-text-primary font-medium">Best fit:</span>{' '}
                    <Link
                      href={`/services/${scenario.primaryService}`}
                      className="text-accent hover:text-accent-hover underline underline-offset-4"
                    >
                      {SERVICE_LABELS[scenario.primaryService]} →
                    </Link>
                  </div>
                  {scenario.alsoConsider.length > 0 && (
                    <div>
                      <span className="text-text-primary font-medium">Also consider:</span>{' '}
                      {scenario.alsoConsider.map((slug, index) => (
                        <span key={slug}>
                          <Link
                            href={`/services/${slug}`}
                            className="text-text-secondary hover:text-accent underline underline-offset-4"
                          >
                            {SERVICE_LABELS[slug]}
                          </Link>
                          {index < scenario.alsoConsider.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                  )}
                  <div>
                    <span className="text-text-primary font-medium">Typical starting point:</span>{' '}
                    <span className="text-text-secondary">{scenario.startingPoint}</span>
                  </div>
                  <div>
                    <Link
                      href={`/services/pricing?situation=${scenario.id}`}
                      className="text-accent hover:text-accent-hover underline underline-offset-4 font-medium"
                    >
                      Get a ballpark estimate →
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Fit matrix */}
      <section className="py-16 md:py-24">
        <Container>
          <h2 className="text-3xl font-display font-bold text-text-primary mb-4">Service Fit Matrix</h2>
          <p className="text-text-secondary mb-8 max-w-3xl">
            A quick view of which service matches each business situation. Use this to narrow options
            before getting a free project outline.
          </p>
          <div className="overflow-x-auto border border-border rounded-xl">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-surface text-text-primary">
                <tr>
                  <th className="px-4 py-3 font-display font-semibold sticky left-0 bg-surface z-10 min-w-[240px]">
                    Business situation
                  </th>
                  {serviceSlugs.map((slug) => (
                    <th key={slug} className="px-4 py-3 font-display font-semibold min-w-[120px]">
                      <Link href={`/services/${slug}`} className="hover:text-accent">
                        {SERVICE_LABELS[slug]}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COMPARISON_SCENARIOS.map((scenario) => (
                  <tr key={scenario.id} className="hover:bg-surface/50">
                    <td className="px-4 py-3 text-text-primary font-medium sticky left-0 bg-background z-10">
                      {scenario.title}
                    </td>
                    {serviceSlugs.map((slug) => (
                      <td key={slug} className="px-4 py-3">
                        <FitCell level={getFitLevel(scenario, slug)} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-surface border-t border-border">
        <Container>
          <div className="max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-6">
              Still not sure? A brief conversation pinpoints the right starting point.
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact">Get a Free Project Outline</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/services">Explore All Services</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
