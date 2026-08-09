import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Button } from '@ydm-agency/ui';
import { constructMetadata, FaqPageJsonLd } from '@ydm-agency/seo';
import { ServiceSubnav } from '@/components/ServiceSubnav';
import { SERVICES_CONFIG } from '@/lib/services-config';
import { getAllServiceFaqs } from '@/lib/faq-utils';
import { getEstimateHref } from '@/lib/pricing-estimator';

export async function generateStaticParams() {
  return Object.keys(SERVICES_CONFIG).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES_CONFIG[slug];
  if (!service) {
    return constructMetadata({ title: 'Service Not Found' });
  }

  return constructMetadata({
    title: `${service.h1} FAQ | YDM Agency`,
    description: `Answers to the most common questions about ${service.h1.toLowerCase()} — pricing, timeline, scope, and what to expect.`,
  });
}

export default async function ServiceFaqPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES_CONFIG[slug];

  if (!service) {
    notFound();
  }

  const faqGroups = getAllServiceFaqs(slug);
  const allQuestions = faqGroups.flatMap((group) => group.items);

  return (
    <main className="min-h-screen">
      <FaqPageJsonLd mainEntity={allQuestions.map((item) => ({ question: item.q, answer: item.a }))} />

      <ServiceSubnav slug={service.slug} active="faq" />

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
            <span className="text-text-primary">FAQ</span>
          </nav>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6">
            {service.h1} — FAQ
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl">
            Answers to the most common questions about {service.h1.toLowerCase()}: pricing, timeline,
            scope, and what to expect.
          </p>
        </Container>
      </section>

      {/* FAQ groups */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl space-y-12">
            {faqGroups.map((group) => (
              <div key={group.theme}>
                <h2 className="text-2xl font-display font-bold text-text-primary mb-6">
                  {group.theme}
                </h2>
                <div className="space-y-4">
                  {group.items.map((faq, index) => (
                    <details
                      key={index}
                      className="group border border-border rounded-lg bg-surface"
                    >
                      <summary className="cursor-pointer p-4 font-medium text-text-primary hover:bg-background transition-colors flex items-center justify-between">
                        {faq.q}
                        <span className="ml-4 text-accent group-open:rotate-180 transition-transform">
                          ▼
                        </span>
                      </summary>
                      <p className="px-4 pb-4 text-text-secondary">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
                <Link href={`/services/${service.slug}`}>Back to Overview</Link>
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
