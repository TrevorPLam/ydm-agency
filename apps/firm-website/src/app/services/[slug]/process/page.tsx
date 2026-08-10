/**
 * FILE: page.tsx
 * PURPOSE: Renders the /services/[slug]/process spoke page showing the service's process phases, contextual process FAQs, and a final CTA.
 * ARCHITECTURE: Server component with generateStaticParams and generateMetadata; reads SERVICES_CONFIG by slug, renders process phase cards, and includes contextual process FAQs via getContextualFaqs.
 * KEY RULES: Must 404 for unknown slugs; must use the firm-level impersonal voice; CTAs must point to /contact, the service's deliverables/faq spokes, and the pricing estimator.
 * DEPENDS ON: next/link, next/navigation, @ydm-agency/ui (Container, Button, Card, Badge), @ydm-agency/seo (constructMetadata), @/components/ServiceSubnav, @/lib/services-config, @/lib/faq-utils, @/lib/pricing-estimator.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Button, Card, Badge } from '@ydm-agency/ui';
import { SERVICES_CONFIG } from '@/lib/services-config';
import { constructMetadata } from '@ydm-agency/seo';
import { ServiceSubnav } from '@/components/ServiceSubnav';
import { getContextualFaqs } from '@/lib/faq-utils';
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
 * WHAT IT DOES: Generates the SEO metadata for the process spoke page, with a not-found fallback for unknown slugs.
 * @param {{ params: Promise<{ slug: string }> }} args - Route params containing the service slug
 * @return {Promise<Metadata>} - Next.js metadata object for the process page
 * SIDE EFFECTS: None (pure async function).
 * ASSUMES: params.slug is a potential key in SERVICES_CONFIG.
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES_CONFIG[slug];
  if (!service) return constructMetadata({ title: 'Service Not Found' });

  return constructMetadata({
    title: `${service.h1} Process | YDM Agency`,
    description: `See exactly how ${service.h1} projects are delivered — phases, timelines, and deliverables.`,
  });
}

/**
 * WHAT IT DOES: Renders the process spoke page for a service, showing subnav, breadcrumbs, process phase cards, contextual process FAQs, back links, and a final CTA with estimate link.
 * @param {{ params: Promise<{ slug: string }> }} args - Route params containing the service slug
 * @return {Promise<JSX.Element>} - Rendered process page
 * SIDE EFFECTS: Calls notFound() for unknown slugs (renders the 404 page).
 * ASSUMES: params.slug is a potential key in SERVICES_CONFIG.
 */
export default async function ServiceProcessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES_CONFIG[slug];
  if (!service) notFound();

  const processFaqs = getContextualFaqs(service.slug, 'process');

  return (
    <main className="min-h-screen">
      <ServiceSubnav slug={service.slug} active="process" />
      <section className="py-16 md:py-24">
        <Container>
          {/* Breadcrumbs */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-text-secondary" aria-label="Breadcrumb">
            <Link href="/services" className="hover:text-text-primary">
              Services
            </Link>
            <span>/</span>
            <Link href={`/services/${service.slug}`} className="hover:text-text-primary">
              {service.h1}
            </Link>
            <span>/</span>
            <span className="text-text-primary">Process</span>
          </nav>

          {/* Page Header */}
          <div className="mb-12">
            <h1 className="mb-4 font-display text-3xl font-semibold text-text-primary md:text-4xl">
              {service.h1} Process
            </h1>
            <p className="text-lg text-text-secondary">{service.subhead}</p>
          </div>

          {/* Process Phases */}
          <div className="mb-12 space-y-6">
            {service.processPhases.map((phase) => (
              <Card key={phase.phase} className="p-6">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent font-semibold text-background">
                        {phase.phase}
                      </span>
                      <h3 className="font-display text-xl font-semibold text-text-primary">
                        {phase.title}
                      </h3>
                    </div>
                    <Badge variant="outline">{phase.duration}</Badge>
                  </div>
                  <p className="text-text-secondary">{phase.description}</p>
                </Card>
              )
            )}
          </div>

          {/* Service FAQs */}
          {processFaqs.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-6 font-display text-2xl font-semibold text-text-primary">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {processFaqs.map((faq: { q: string; a: string }, index: number) => (
                  <details key={index} className="group rounded-lg border border-border bg-surface">
                    <summary className="cursor-pointer p-4 font-medium text-text-primary group-hover:text-accent">
                      {faq.q}
                    </summary>
                    <p className="px-4 pb-4 text-text-secondary">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Back Links */}
          <div className="mb-8 flex flex-wrap gap-4 text-sm">
            <Link href="/services/process" className="text-text-secondary hover:text-text-primary">
              ← Back to Process Hub
            </Link>
            <span className="text-text-secondary">|</span>
            <Link
              href={`/services/${service.slug}`}
              className="text-text-secondary hover:text-text-primary"
            >
              ← Back to {service.h1}
            </Link>
            <span className="text-text-secondary">|</span>
            <Link
              href={`/services/${service.slug}/faq`}
              className="text-text-secondary hover:text-text-primary"
            >
              View all {service.h1} FAQs →
            </Link>
          </div>

          {/* Final CTA */}
          <div className="rounded-xl border border-border bg-surface p-8 text-center">
            <h2 className="mb-4 font-display text-2xl font-semibold text-text-primary">
              {service.finalCtaText}
            </h2>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button variant="primary" asChild>
                <Link href="/contact">Get a Free Project Outline</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href={`/services/${service.slug}/deliverables`}>See What You Get</Link>
              </Button>
            </div>
            <div className="mt-6">
              <Link
                href={getEstimateHref(service.slug)}
                className="text-accent underline underline-offset-4 hover:text-accent-hover text-sm"
              >
                Get a ballpark estimate for {service.h1} →
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
