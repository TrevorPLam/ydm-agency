/**
 * FILE: page.tsx
 * PURPOSE: Renders the /services/pricing page with how-pricing-works, the PricingEstimator widget (prefillable via query params), per-service investment factor cards, and a final CTA.
 * ARCHITECTURE: Server component generating metadata via constructMetadata; reads searchParams to prefill the PricingEstimator with situation/services; renders PRICING_DETAILS cards per service.
 * KEY RULES: Must use the firm-level impersonal voice; must prefill the estimator from ?situation= and ?services= query params; must present pricing as scoped estimates, not a fixed menu.
 * DEPENDS ON: next/link, @ydm-agency/ui (Container, Button, Card), @ydm-agency/seo (constructMetadata), @/lib/services-config, @/lib/service-labels, @/lib/pricing-config, @/components/PricingEstimator.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import Link from 'next/link';
import { Container, Button, Card } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';
import { SERVICES_CONFIG } from '@/lib/services-config';
import { SERVICE_LABELS } from '@/lib/service-labels';
import { PRICING_DETAILS } from '@/lib/pricing-config';
import { PricingEstimator } from '@/components/PricingEstimator';

/**
 * WHAT IT DOES: Generates the SEO metadata for the pricing page via constructMetadata.
 * @return {Promise<Metadata>} - Next.js metadata object for the pricing page
 * SIDE EFFECTS: None (pure async function).
 * ASSUMES: constructMetadata provides sensible defaults.
 */
export async function generateMetadata() {
  return constructMetadata({
    title: 'Pricing & Investment Factors | YDM Agency',
    description:
      'How YDM Agency pricing works for websites, SEO, ads, and marketing services. No fixed-menu gimmicks — just transparent factors and a free project outline.',
  });
}

/**
 * WHAT IT DOES: Reads a single string value from a Next.js searchParams record, returning the first element when the value is an array.
 * @param {Record<string, string | string[] | undefined>} params - Next.js searchParams record
 * @param {string} key - Parameter key to read
 * @return {string | undefined} - First string value for the key, or undefined
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: None.
 */
function getSearchParam(params: Record<string, string | string[] | undefined>, key: string): string | undefined {
  const value = params[key];
  if (Array.isArray(value)) return value[0];
  return value;
}

/**
 * WHAT IT DOES: Parses a comma-separated services query parameter into an array of service slugs, filtering empty segments.
 * @param {string | undefined} value - Comma-separated services parameter value
 * @return {string[] | undefined} - Array of service slugs, or undefined when no value
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: None.
 */
function parseServicesParam(value: string | undefined): string[] | undefined {
  if (!value) return undefined;
  return value.split(',').filter(Boolean);
}

/**
 * WHAT IT DOES: Renders the pricing page with how-pricing-works, a query-prefilled PricingEstimator, per-service investment factor cards, and a final CTA.
 * @param {{ searchParams: Promise<Record<string, string | string[] | undefined>> }} args - Route search params for estimator prefill
 * @return {Promise<JSX.Element>} - Rendered pricing page
 * SIDE EFFECTS: None (server-side rendering).
 * ASSUMES: PRICING_DETAILS and SERVICES_CONFIG share compatible service slugs; missing PRICING_DETAILS entries fall back to default copy.
 */
export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialSituation = getSearchParam(params, 'situation');
  const initialServices = parseServicesParam(getSearchParam(params, 'services'));

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-24 md:py-32">
        <Container>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6">
            Pricing & Investment Factors
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl">
            Every project is scoped individually. Below is what drives the investment for each service,
            what a typical starting point looks like, and what the free project outline covers.
          </p>
        </Container>
      </section>

      {/* How pricing works */}
      <section className="py-16 md:py-24 bg-surface border-y border-border">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-display font-semibold text-text-primary mb-4">
              How Pricing Works
            </h2>
            <p className="text-text-secondary text-lg">
              There is no one-size-fits-all menu. The final investment depends on scope, existing assets,
              integrations, timeline, and competitive context. A free project outline provides a
              transparent, fixed-price or clearly scoped estimate before any commitment is made.
            </p>
          </div>
        </Container>
      </section>

      <PricingEstimator
        initialSituation={initialSituation}
        initialServices={initialServices}
      />

      {/* Service pricing cards */}
      <section className="py-16 md:py-24">
        <Container>
          <h2 className="text-3xl font-display font-bold text-text-primary mb-8">
            Service-by-Service Investment Factors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(SERVICES_CONFIG).map((slug) => {
              const config = SERVICES_CONFIG[slug];
              const details = PRICING_DETAILS[slug] ?? {
                startingRange: 'Starting range depends on scope; a free project outline provides a fixed-price estimate.',
                extras: ['Scope-specific add-ons such as copywriting, photography, integrations, or ongoing support.'],
              };

              return (
                <Card key={slug} className="p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-display font-semibold text-text-primary">
                      {SERVICE_LABELS[slug]}
                    </h3>
                  </div>

                  <div className="space-y-4 text-sm flex-1">
                    <div>
                      <p className="text-text-primary font-medium mb-1">
                        Starting range / minimum budget signal:
                      </p>
                      <p className="text-text-secondary">{details.startingRange}</p>
                    </div>

                    <div>
                      <p className="text-text-primary font-medium mb-2">Included:</p>
                      <ul className="space-y-1 text-text-secondary list-disc list-inside">
                        {config.included.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    {details.extras.length > 0 && (
                      <div>
                        <p className="text-text-primary font-medium mb-2">Common extras:</p>
                        <ul className="space-y-1 text-text-secondary list-disc list-inside">
                          {details.extras.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {details.minimumBudgetNote && (
                      <p className="text-text-secondary text-xs">{details.minimumBudgetNote}</p>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <Link
                      href={`/services/${slug}`}
                      className="text-accent hover:text-accent-hover underline underline-offset-4 text-sm"
                    >
                      See {SERVICE_LABELS[slug]} overview →
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-surface border-t border-border">
        <Container>
          <div className="max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-6">
              Get a Transparent, No-Obligation Estimate
            </h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              A free project outline matches your goals, scope, and budget — no fixed-menu guesswork.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact">Get a Free Project Outline</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/services/compare">Compare Services</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
