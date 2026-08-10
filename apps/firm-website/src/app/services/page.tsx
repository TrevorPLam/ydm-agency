/**
 * FILE: page.tsx
 * PURPOSE: Renders the /services hub page with a hero, an eight-card services grid, a "why work with YDM Agency" section, a starting-point guide, and a final CTA.
 * ARCHITECTURE: Server component generating metadata via constructMetadata and rendering a services grid from SERVICE_LABELS and SERVICE_CARD_DESCRIPTIONS with lucide-react icons.
 * KEY RULES: Must use the firm-level impersonal voice; service cards must link to /services/[slug]; must include links to compare, pricing, industries, and audit pages.
 * DEPENDS ON: react, next/link, @ydm-agency/ui (Card, Button, Container), @ydm-agency/seo (constructMetadata), @/lib/service-labels, lucide-react.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import type { ComponentType } from 'react';
import Link from 'next/link';
import { Card } from '@ydm-agency/ui';
import { Button } from '@ydm-agency/ui';
import { Container } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';
import { SERVICE_LABELS, SERVICE_CARD_DESCRIPTIONS } from '@/lib/service-labels';
import {
  Monitor,
  Search,
  BarChart3,
  Megaphone,
  Sparkles,
  PenTool,
  Zap,
  Star
} from 'lucide-react';

const SERVICE_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  'web-design': Monitor,
  'seo': Search,
  'analytics': BarChart3,
  'paid-ads': Megaphone,
  'branding': Sparkles,
  'content': PenTool,
  'automation': Zap,
  'reputation': Star,
};

const serviceSlugs = Object.keys(SERVICE_LABELS);

/**
 * WHAT IT DOES: Generates the SEO metadata for the services hub page via constructMetadata.
 * @return {Promise<Metadata>} - Next.js metadata object for the services hub
 * SIDE EFFECTS: None (pure async function).
 * ASSUMES: constructMetadata provides sensible defaults.
 */
export async function generateMetadata() {
  return constructMetadata({
    title: 'Services | YDM Agency',
    description: 'Custom web design, SEO, analytics, and marketing systems for small businesses.',
  });
}

/**
 * WHAT IT DOES: Renders the services hub page with a hero, eight-card services grid, "why work with YDM Agency" section, starting-point links, and a final CTA.
 * @return {JSX.Element} - Rendered services hub page
 * SIDE EFFECTS: None (server-side rendering).
 * ASSUMES: SERVICE_LABELS and SERVICE_CARD_DESCRIPTIONS share the same slug keys.
 */
export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <Container>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6">
            Website Design, SEO, and Marketing Services for Small Businesses
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl">
            Whatever&apos;s holding your business back online — an outdated website, invisible search rankings, or marketing you don&apos;t have time to manage — issues are fixed directly, without agency overhead.
          </p>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceSlugs.map((slug) => {
              const Icon = SERVICE_ICONS[slug];
              return (
                <Link key={slug} href={`/services/${slug}`}>
                  <Card className="h-full p-6 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      {Icon && <Icon className="w-8 h-8 text-accent" />}
                    </div>
                    <h3 className="text-xl font-display font-semibold text-text-primary mb-3">
                      {SERVICE_LABELS[slug]}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {SERVICE_CARD_DESCRIPTIONS[slug]}
                    </p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Why Work With YDM Agency */}
      <section className="py-16 md:py-24 bg-surface border-y border-border">
        <Container>
          <h2 className="text-3xl font-display font-bold text-text-primary mb-12">
            Why Work With YDM Agency
          </h2>
          <ul className="space-y-6 max-w-3xl">
            <li className="flex items-start gap-4">
              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
              <p className="text-text-secondary">
                Direct collaboration with the person executing the work — no account managers, no waiting on someone else&apos;s schedule.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
              <p className="text-text-secondary">
                Modern, custom‑built results — every project uses current tools, not recycled templates.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
              <p className="text-text-secondary">
                Fair pricing — skipping agency overhead means your budget goes into your project, not extra layers of staff.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
              <p className="text-text-secondary">
                AI‑augmented execution — modern tools deliver faster turnarounds and fewer errors without cutting corners.
              </p>
            </li>
          </ul>
        </Container>
      </section>

      {/* Not Sure Where to Start */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-display font-bold text-text-primary mb-4">
              Not Sure Where to Start?
            </h2>
            <p className="text-lg text-text-secondary mb-4">
              Most clients begin with a website or SEO foundation and add services as they see results. A brief discovery call helps pinpoint the highest‑impact starting point — no obligation.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/services/compare" className="text-accent hover:text-accent-hover underline underline-offset-4">
                Compare services →
              </Link>
              <Link href="/services/pricing" className="text-accent hover:text-accent-hover underline underline-offset-4">
                Pricing factors →
              </Link>
              <Link href="/services/industries" className="text-accent hover:text-accent-hover underline underline-offset-4">
                Industry solutions →
              </Link>
              <Link href="/audit" className="text-accent hover:text-accent-hover underline underline-offset-4">
                Free marketing audit →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-surface border-t border-border">
        <Container>
          <div className="max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-6">
              Describe what&apos;s not working — a clear path to fix it will be provided.
            </h2>
            <Button asChild variant="primary" size="lg">
              <Link href="/contact">Get a Free Project Outline</Link>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
