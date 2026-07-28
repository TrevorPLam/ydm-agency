import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@ydm-agency/ui';
import { Container } from '@ydm-agency/ui';
import { Badge } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';
import { SERVICES_CONFIG } from '../../../lib/services-config';

export async function generateStaticParams() {
  return Object.keys(SERVICES_CONFIG).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = SERVICES_CONFIG[slug];
  if (!config) {
    return {};
  }
  return constructMetadata({
    title: config.metaTitle,
    description: config.metaDescription,
  });
}

export default async function ServiceSpokePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = SERVICES_CONFIG[slug];

  if (!config) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Disclaimer for select clients */}
      {config.selectClients && (
        <section className="py-8 bg-surface border-b border-border">
          <Container>
            <div className="max-w-3xl">
              <Badge variant="accent" className="mb-3">Available for select clients</Badge>
              <p className="text-text-secondary text-sm">
                This service is available for select clients. See the page below for details on requirements and how it&apos;s delivered.
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* Hero */}
      <section className="py-24 md:py-32">
        <Container>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6">
            {config.h1}
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl">
            {config.subhead}
          </p>
        </Container>
      </section>

      {/* Problem/Solution */}
      {config.problemSolution && (
        <section className="py-16 md:py-24 bg-surface border-y border-border">
          <Container>
            <div className="max-w-3xl">
              <h2 className="text-2xl font-display font-semibold text-text-primary mb-4">
                {config.problemSolution.split('\n\n')[0]}
              </h2>
              <p className="text-text-secondary whitespace-pre-line">
                {config.problemSolution.split('\n\n').slice(1).join('\n\n')}
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* What's Included */}
      <section className="py-16 md:py-24">
        <Container>
          <h2 className="text-3xl font-display font-bold text-text-primary mb-8">
            What&apos;s Included
          </h2>
          <ul className="space-y-4 max-w-3xl">
            {config.included.map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <p className="text-text-secondary">{item}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Who It's For */}
      <section className="py-16 md:py-24 bg-surface border-y border-border">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-display font-bold text-text-primary mb-6">
              Who It&apos;s For
            </h2>
            <p className="text-text-secondary text-lg">{config.whoItsFor}</p>
          </div>
        </Container>
      </section>

      {/* How It Fits */}
      <section className="py-16 md:py-24">
        <Container>
          <h2 className="text-3xl font-display font-bold text-text-primary mb-8">
            How It Fits
          </h2>
          <ul className="space-y-4 max-w-3xl">
            {config.howItFits.map((link, index) => (
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

      {/* What Working With YDM Agency Looks Like */}
      <section className="py-16 md:py-24 bg-surface border-y border-border">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-display font-bold text-text-primary mb-6">
              What Working With YDM Agency Looks Like
            </h2>
            <p className="text-text-secondary text-lg whitespace-pre-line">
              {config.workingWithYdm}
            </p>
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24">
        <Container>
          <h2 className="text-3xl font-display font-bold text-text-primary mb-8">
            FAQs
          </h2>
          <div className="max-w-3xl space-y-4">
            {config.faqs.map((faq, index) => (
              <details
                key={index}
                className="group border border-border rounded-lg bg-surface"
              >
                <summary className="cursor-pointer p-4 font-medium text-text-primary hover:bg-background transition-colors flex items-center justify-between">
                  {faq.q}
                  <span className="ml-4 text-accent group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-4 pb-4 text-text-secondary">{faq.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-surface border-t border-border">
        <Container>
          <div className="max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-6">
              {config.finalCtaText}
            </h2>
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Get a Free Project Outline
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
