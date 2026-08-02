import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Button, Card, Badge } from '@ydm-agency/ui';
import { SERVICES_CONFIG } from '@/lib/services-config';
import { constructMetadata } from '@ydm-agency/seo';
import { ServiceSubnav } from '@/components/ServiceSubnav';

export async function generateStaticParams() {
  return Object.keys(SERVICES_CONFIG).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES_CONFIG[slug];
  if (!service) return constructMetadata({ title: 'Service Not Found' });

  return constructMetadata({
    title: `What You Get — ${service.h1} | YDM Agency`,
    description: `See exactly what is included in ${service.h1.toLowerCase()} — deliverables, outputs, and timelines for small businesses.`,
  });
}

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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6">
            What You Get with {service.h1}
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl">
            {service.subhead}
          </p>
        </Container>
      </section>

      {/* Select client disclaimer */}
      {service.selectClients && (
        <section className="py-8 bg-surface border-y border-border">
          <Container>
            <div className="max-w-3xl">
              <Badge variant="accent" className="mb-3">Available for select clients</Badge>
              <p className="text-text-secondary text-sm">
                {service.disclaimer || "This service is available for select clients. See the page below for details on requirements and how it is delivered."}
              </p>
            </div>
          </Container>
        </section>
      )}

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
                href={`/services/${service.slug}/faq`}
                className="text-text-secondary hover:text-accent underline underline-offset-4"
              >
                View {service.h1} FAQs →
              </Link>
              <Link
                href="/services/pricing"
                className="text-text-secondary hover:text-accent underline underline-offset-4"
              >
                See pricing factors →
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
