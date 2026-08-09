import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@ydm-agency/ui';
import { Container } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';
import { INDUSTRIES_CONFIG } from '@/lib/industries-config';
import { SERVICES_CONFIG } from '@/lib/services-config';
import { SERVICE_LABELS } from '@/lib/service-labels';

export async function generateStaticParams() {
  return Object.keys(INDUSTRIES_CONFIG).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = INDUSTRIES_CONFIG[slug];
  if (!config) {
    return {};
  }
  return constructMetadata({
    title: config.metaTitle,
    description: config.metaDescription,
  });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = INDUSTRIES_CONFIG[slug];

  if (!config) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-24 md:py-32">
        <Container>
          <Link 
            href="/services/industries" 
            className="inline-block text-sm text-accent hover:text-accent-hover mb-6 underline underline-offset-4"
          >
            ← Back to Industries
          </Link>
          <h1 className="mb-6 font-display text-4xl font-bold text-text-primary md:text-5xl lg:text-6xl">
            {config.h1}
          </h1>
          <p className="max-w-3xl text-xl text-text-secondary">{config.subhead}</p>
        </Container>
      </section>

      {/* Problem/Solution */}
      {config.problemSolution && (
        <section className="border-y border-border bg-surface py-16 md:py-24">
          <Container>
            <div className="max-w-3xl">
              <h2 className="mb-4 font-display text-2xl font-semibold text-text-primary">
                {config.problemSolution.split('\n\n')[0]}
              </h2>
              <p className="whitespace-pre-line text-text-secondary">
                {config.problemSolution.split('\n\n').slice(1).join('\n\n')}
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* Common Challenges */}
      <section className="py-16 md:py-24">
        <Container>
          <h2 className="mb-8 font-display text-3xl font-bold text-text-primary">
            Common Challenges
          </h2>
          <ul className="max-w-3xl space-y-4">
            {config.commonChallenges.map((challenge, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                <p className="text-text-secondary">{challenge}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Recommended Services */}
      <section className="border-y border-border bg-surface py-16 md:py-24">
        <Container>
          <h2 className="mb-8 font-display text-3xl font-bold text-text-primary">
            Recommended Services
          </h2>
          <div className="max-w-3xl space-y-6">
            {config.recommendedServices.map((rec, index) => {
              const serviceConfig = SERVICES_CONFIG[rec.service];
              return (
                <div key={index} className="border border-border rounded-lg p-6 bg-background">
                  <Link
                    href={`/services/${rec.service}`}
                    className="text-lg font-display font-semibold text-accent hover:text-accent-hover underline underline-offset-4"
                  >
                    {serviceConfig?.h1 || SERVICE_LABELS[rec.service] || rec.service}
                  </Link>
                  <p className="mt-2 text-text-secondary">{rec.reason}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Who It's For */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <h2 className="mb-6 font-display text-3xl font-bold text-text-primary">
              Who It&apos;s For
            </h2>
            <p className="text-lg text-text-secondary">{config.whoItsFor}</p>
          </div>
        </Container>
      </section>

      {/* Industry-Specific */}
      <section className="border-y border-border bg-surface py-16 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <h2 className="mb-6 font-display text-3xl font-bold text-text-primary">
              Why This Industry Is Different
            </h2>
            <p className="whitespace-pre-line text-lg text-text-secondary">
              {config.industrySpecific}
            </p>
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24">
        <Container>
          <h2 className="mb-8 font-display text-3xl font-bold text-text-primary">FAQs</h2>
          <div className="max-w-3xl space-y-4">
            {config.faqs.map((faq, index) => (
              <details key={index} className="group rounded-lg border border-border bg-surface">
                <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-text-primary transition-colors hover:bg-background">
                  {faq.q}
                  <span className="ml-4 text-accent transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="px-4 pb-4 text-text-secondary">{faq.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-surface py-24 md:py-32">
        <Container>
          <div className="max-w-2xl text-center">
            <h2 className="mb-6 font-display text-3xl font-bold text-text-primary md:text-4xl">
              {config.finalCtaText}
            </h2>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact">Get a Free Project Outline</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/services">See All Services</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
