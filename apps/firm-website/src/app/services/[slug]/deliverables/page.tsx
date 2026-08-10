/**
 * FILE: page.tsx
 * PURPOSE: Renders the /services/[slug]/deliverables spoke page showing a detailed breakdown of each deliverable's output, timeline, and outcome.
 * ARCHITECTURE: Server component with generateStaticParams and generateMetadata; reads SERVICES_CONFIG by slug and renders deliverable cards plus how-it-fits and a final CTA.
 * KEY RULES: Must 404 for unknown slugs; must use the firm-level impersonal voice; CTAs must point to /contact, the service's process/faq spokes, and the pricing estimator.
 * DEPENDS ON: next/link, next/navigation, @ydm-agency/ui (Container, Button, Card), @ydm-agency/seo (constructMetadata), @/components/ServiceSubnav, @/lib/services-config, @/lib/pricing-estimator.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Button, Card } from '@ydm-agency/ui';
import { SERVICES_CONFIG } from '@/lib/services-config';
import { constructMetadata } from '@ydm-agency/seo';
import { ServiceSubnav } from '@/components/ServiceSubnav';
import { getEstimateHref } from '@/lib/pricing-estimator';

/**
 * WHAT IT DOES: Pre-generates static params for each service slug in SERVICES_CONFIG at build time.
 * @return {Promise<{ slug: string }[]>} - Array of slug params for static generation
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: SERVICES_CONFIG keys are valid service slugs.
 */
export async function generateStaticParams() {
  return Object.keys(SERVICES_CONFIG).map((slug) => ({ slug }));
}

/**
 * WHAT IT DOES: Generates the SEO metadata for the deliverables spoke page, with a not-found fallback for unknown slugs.
 * @param {{ params: Promise<{ slug: string }> }} args - Route params containing the service slug
 * @return {Promise<Metadata>} - Next.js metadata object for the deliverables page
 * SIDE EFFECTS: None (pure async function).
 * ASSUMES: params.slug is a potential key in SERVICES_CONFIG.
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES_CONFIG[slug];
  if (!service) return constructMetadata({ title: 'Service Not Found' });

  return constructMetadata({
    title: `What You Get — ${service.h1} | YDM Agency`,
    description: `See exactly what is included in ${service.h1.toLowerCase()} — deliverables, outputs, and timelines for small businesses.`,
  });
}

/**
 * WHAT IT DOES: Renders the deliverables spoke page for a service, showing subnav, hero, intro, deliverable cards (output/timeline/outcome), how-it-fits, and a final CTA with estimate link.
 * @param {{ params: Promise<{ slug: string }> }} args - Route params containing the service slug
 * @return {Promise<JSX.Element>} - Rendered deliverables page
 * SIDE EFFECTS: Calls notFound() for unknown slugs (renders the 404 page).
 * ASSUMES: params.slug is a potential key in SERVICES_CONFIG.
 */
export default async function ServiceDeliverablesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES_CONFIG[slug];
  if (!service) notFound();

  return (
    <main className="min-h-screen">
      <ServiceSubnav slug={service.slug} active="deliverables" />

      {/* Hero */}
      <section className="py-24 md:py-32">
        <Container>
          <nav className="mb-8 flex items-center gap-2 text-sm text-text-secondary" aria-label="Breadcrumb">
            <Link href="/services" className="hover:text-text-primary">
              Services
            </Link>
            <span>/</span>
            <Link href={`/services/${service.slug}`} className="hover:text-text-primary">
              {service.h1}
            </Link>
            <span>/</span>
            <span className="text-text-primary">What You Get</span>
          </nav>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6">
            What You Get with {service.h1}
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl">
            {service.subhead}
          </p>
        </Container>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24 bg-surface border-y border-border">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-display font-semibold text-text-primary mb-4">
              Every deliverable tied to a business outcome
            </h2>
            <p className="text-text-secondary text-lg">
              Below is a clear breakdown of what is included, what the business receives, and how each piece moves the project forward. Scope, outputs, and realistic timelines are documented upfront so there are no surprises.
            </p>
          </div>
        </Container>
      </section>

      {/* Deliverables */}
      <section className="py-16 md:py-24">
        <Container>
          <h2 className="text-3xl font-display font-bold text-text-primary mb-12">
            Deliverables
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.deliverables.map((deliverable, index) => (
              <Card key={index} className="p-6 h-full flex flex-col">
                <h3 className="text-xl font-display font-semibold text-text-primary mb-3">
                  {deliverable.title}
                </h3>
                <p className="text-text-secondary mb-6 flex-1">
                  {deliverable.description}
                </p>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-text-primary font-medium">Output:</span>{' '}
                    <span className="text-text-secondary">{deliverable.output}</span>
                  </div>
                  <div>
                    <span className="text-text-primary font-medium">Timeline:</span>{' '}
                    <span className="text-text-secondary">{deliverable.timeline}</span>
                  </div>
                  <div>
                    <span className="text-text-primary font-medium">Outcome:</span>{' '}
                    <span className="text-text-secondary">{deliverable.outcome}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Fits */}
      <section className="py-16 md:py-24 bg-surface border-y border-border">
        <Container>
          <h2 className="text-3xl font-display font-bold text-text-primary mb-8">
            How It Fits
          </h2>
          <ul className="space-y-4 max-w-3xl">
            {service.howItFits.map((link, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <Link
                  href={link.href}
                  className="text-text-secondary hover:text-accent underline underline-offset-4"
                >
                  {link.label} →
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-surface border-t border-border">
        <Container>
          <div className="max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-6">
              {service.finalCtaText}
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact">Get a Free Project Outline</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href={`/services/${service.slug}/process`}>See the Process</Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href={getEstimateHref(service.slug)}
                className="text-accent hover:text-accent-hover underline underline-offset-4 font-medium"
              >
                Get a ballpark estimate →
              </Link>
              <Link
                href={`/services/${service.slug}/faq`}
                className="text-text-secondary hover:text-accent underline underline-offset-4"
              >
                View {service.h1} FAQs →
              </Link>
              <Link
                href="/services/pricing"
                className="text-text-secondary hover:text-accent underline underline-offset-4"
              >
                See all pricing factors →
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
