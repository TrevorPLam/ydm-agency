/**
 * FILE: page.tsx
 * PURPOSE: Renders the dynamic service spoke page (/services/[slug]) with hero, problem/solution, included items, who-it's-for, how-it-fits, working-with-YDM, contextual FAQs, and a final CTA.
 * ARCHITECTURE: Server component with generateStaticParams and generateMetadata; reads SERVICES_CONFIG by slug, emits ServiceJsonLd structured data, and renders contextual overview FAQs via getContextualFaqs.
 * KEY RULES: Must 404 for unknown slugs; must emit ServiceJsonLd for rich results; must use the firm-level impersonal voice; CTAs must point to /contact and the service's process/deliverables/faq spokes.
 * DEPENDS ON: next/link, next/navigation, @ydm-agency/ui (Button, Container), @ydm-agency/seo (constructMetadata, ServiceJsonLd), @/components/ServiceSubnav, @/lib/services-config, @/lib/faq-utils, @/lib/pricing-estimator.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@ydm-agency/ui';
import { Container } from '@ydm-agency/ui';
import { constructMetadata, ServiceJsonLd } from '@ydm-agency/seo';
import { ServiceSubnav } from '@/components/ServiceSubnav';
import { SERVICES_CONFIG } from '@/lib/services-config';
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
 * WHAT IT DOES: Generates the SEO metadata for a service spoke page from the service's configured metaTitle and metaDescription.
 * @param {{ params: Promise<{ slug: string }> }} args - Route params containing the service slug
 * @return {Promise<Metadata>} - Next.js metadata object, or empty object for unknown slugs
 * SIDE EFFECTS: None (pure async function).
 * ASSUMES: params.slug is a potential key in SERVICES_CONFIG.
 */
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

/**
 * WHAT IT DOES: Renders the service spoke page for a given slug, including ServiceJsonLd, subnav, hero, problem/solution, included items, who-it's-for, how-it-fits, working-with-YDM, contextual FAQs, and a final CTA with estimate link.
 * @param {{ params: Promise<{ slug: string }> }} args - Route params containing the service slug
 * @return {Promise<JSX.Element>} - Rendered service spoke page
 * SIDE EFFECTS: Calls notFound() for unknown slugs (renders the 404 page).
 * ASSUMES: params.slug is a potential key in SERVICES_CONFIG.
 */
export default async function ServiceSpokePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = SERVICES_CONFIG[slug];

  if (!config) {
    notFound();
  }

  const overviewFaqs = getContextualFaqs(config.slug, 'overview');

  return (
    <main className="min-h-screen">
      <ServiceJsonLd
        name={config.h1}
        description={config.subhead}
        url={`https://ydm-agency.com/services/${config.slug}`}
      />
      <ServiceSubnav slug={config.slug} active="overview" />

      {/* Hero */}
      <section className="py-24 md:py-32">
        <Container>
          <nav className="mb-8 flex items-center gap-2 text-sm text-text-secondary" aria-label="Breadcrumb">
            <Link href="/services" className="hover:text-text-primary">
              Services
            </Link>
            <span>/</span>
            <span className="text-text-primary">{config.h1}</span>
          </nav>

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

      {/* What's Included */}
      <section className="py-16 md:py-24">
        <Container>
          <h2 className="mb-8 font-display text-3xl font-bold text-text-primary">
            What&apos;s Included
          </h2>
          <ul className="max-w-3xl space-y-4">
            {config.included.map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                <p className="text-text-secondary">{item}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 max-w-3xl">
            <Link
              href={`/services/${config.slug}/deliverables`}
              className="text-accent underline underline-offset-4 hover:text-accent-hover"
            >
              See the full breakdown of what you get →
            </Link>
          </div>
        </Container>
      </section>

      {/* Who It's For */}
      <section className="border-y border-border bg-surface py-16 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <h2 className="mb-6 font-display text-3xl font-bold text-text-primary">
              Who It&apos;s For
            </h2>
            <p className="text-lg text-text-secondary">{config.whoItsFor}</p>
          </div>
        </Container>
      </section>

      {/* How It Fits */}
      <section className="py-16 md:py-24">
        <Container>
          <h2 className="mb-8 font-display text-3xl font-bold text-text-primary">How It Fits</h2>
          <ul className="max-w-3xl space-y-4">
            {config.howItFits.map((link, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                <Link
                  href={link.href}
                  className="text-text-secondary underline underline-offset-4 hover:text-accent"
                >
                  {link.label} →
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-text-secondary">
            <Link
              href="/services/how-it-works"
              className="text-accent underline underline-offset-4 hover:text-accent-hover"
            >
              All eight services work as one system – see how they connect.
            </Link>
          </p>
        </Container>
      </section>

      {/* What Working With YDM Agency Looks Like */}
      <section className="border-y border-border bg-surface py-16 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <h2 className="mb-6 font-display text-3xl font-bold text-text-primary">
              What Working With YDM Agency Looks Like
            </h2>
            <p className="whitespace-pre-line text-lg text-text-secondary">
              {config.workingWithYdm}
            </p>
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24">
        <Container>
          <h2 className="mb-8 font-display text-3xl font-bold text-text-primary">FAQs</h2>
          <div className="max-w-3xl space-y-4">
            {overviewFaqs.map((faq, index) => (
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
          <div className="mt-8 max-w-3xl">
            <Link
              href={`/services/${config.slug}/faq`}
              className="text-accent underline underline-offset-4 hover:text-accent-hover"
            >
              View all {config.h1} FAQs →
            </Link>
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
                <Link href={`/services/${config.slug}/process`}>See the Process</Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href={getEstimateHref(config.slug)}
                className="text-accent underline underline-offset-4 hover:text-accent-hover"
              >
                Get a ballpark estimate for {config.h1} →
              </Link>
              <Link
                href="/services/pricing"
                className="text-text-secondary underline underline-offset-4 hover:text-accent"
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
