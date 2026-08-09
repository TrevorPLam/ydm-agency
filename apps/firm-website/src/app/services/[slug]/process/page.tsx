import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Button, Card, Badge } from '@ydm-agency/ui';
import { SERVICES_CONFIG } from '@/lib/services-config';
import { constructMetadata } from '@ydm-agency/seo';
import { ServiceSubnav } from '@/components/ServiceSubnav';
import { getContextualFaqs } from '@/lib/faq-utils';
import { getEstimateHref } from '@/lib/pricing-estimator';

export async function generateStaticParams() {
  return Object.keys(SERVICES_CONFIG).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES_CONFIG[slug];
  if (!service) return constructMetadata({ title: 'Service Not Found' });

  return constructMetadata({
    title: `${service.h1} Process | YDM Agency`,
    description: `See exactly how ${service.h1} projects are delivered — phases, timelines, and deliverables.`,
  });
}

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
