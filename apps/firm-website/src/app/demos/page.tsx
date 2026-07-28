import Link from 'next/link';
import { Badge } from '@ydm-agency/ui';
import { Button } from '@ydm-agency/ui';
import { Container } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';

interface Demo {
  name: string;
  type: string;
  description: string;
  tags: string[];
  subdomain: string;
  screenshotSrc: string;
}

const DEMOS: Demo[] = [
  {
    name: 'Coastal Café',
    type: 'Restaurant Marketing Site',
    description: 'A warm, inviting site with online menu, reservation form, and location map — built to show how a local restaurant can turn visitors into diners.',
    tags: ['Responsive design', 'Form handling', 'SEO optimised', 'Performance tested'],
    subdomain: 'https://restaurant.ydm-agency.com',
    screenshotSrc: '/demos/coastal-cafe.png',
  },
  {
    name: 'Apex SaaS',
    type: 'SaaS Landing Page',
    description: 'A modern dark-themed product marketing page with waitlist CTA, scroll animations, and conversion-focused layout for B2B software.',
    tags: ['Modern dark aesthetics', 'Scroll animations', 'Waitlist CTA', 'Performance tested'],
    subdomain: 'https://saas.ydm-agency.com',
    screenshotSrc: '/demos/apex-saas.png',
  },
  {
    name: 'Vanguard Plumbing',
    type: 'Local Service Business',
    description: 'A trust-focused site with service badges, review integration, service area map, and instant quote request form for trade businesses.',
    tags: ['Trust signals', 'Service area map', 'Quote form', 'Mobile responsive'],
    subdomain: 'https://plumbing.ydm-agency.com',
    screenshotSrc: '/demos/vanguard-plumbing.png',
  },
  {
    name: 'Nova Storefront',
    type: 'Simple E‑commerce Storefront',
    description: 'A product grid with cart functionality, headless CMS integration, and product search/filtering for online retail.',
    tags: ['Product grid', 'Cart functionality', 'Headless CMS', 'Search/filtering'],
    subdomain: 'https://store.ydm-agency.com',
    screenshotSrc: '/demos/nova-storefront.png',
  },
];

export async function generateMetadata() {
  return constructMetadata({
    title: 'Live Demos | YDM Agency',
    description: 'Explore fully functional, custom-built websites and applications deployed on subdomains. See what YDM Agency can build for your business.',
  });
}

export default function DemosPage() {
  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <section className="py-24 md:py-32">
        <Container>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6">
            Live Demos, Real Code. See What&apos;s Possible.
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mb-4">
            Every project below is a fully functional, custom-built website or application — deployed, interactive, and ready for you to explore. No mockups. No templates.
          </p>
          <p className="text-sm text-text-secondary">
            These are self-initiated projects built to the same standard as client work. The same process and attention to detail go into every engagement.
          </p>
        </Container>
      </section>

      {/* Demo Grid */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {DEMOS.map((demo) => (
              <div key={demo.name} className="bg-surface border border-border rounded-xl overflow-hidden hover:-translate-y-1 transition-transform duration-200">
                {/* Device-framed screenshot placeholder */}
                <div className="aspect-video bg-surface border-b border-border flex items-center justify-center">
                  <p className="text-text-secondary text-sm">{demo.name} screenshot</p>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-display font-semibold text-text-primary">
                      {demo.name}
                    </h3>
                    <Badge variant="outline">{demo.type}</Badge>
                  </div>

                  <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                    {demo.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {demo.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <a
                    href={demo.subdomain}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-accent hover:text-accent-hover text-sm font-medium underline underline-offset-4"
                  >
                    View Live Site →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Transparency Note */}
      <section className="py-16 md:py-24">
        <Container>
          <blockquote className="border-l-4 border-accent pl-6 py-4 max-w-4xl">
            <p className="text-text-secondary text-lg italic">
              These demos are self‑initiated, not client work — but the same process, modern tools, and quality standards are applied to every real project. As client sites go live, they&apos;ll be featured here alongside these examples.
            </p>
          </blockquote>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-surface border-t border-border">
        <Container>
          <div className="max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-6">
              Ready for your own high‑performing site?
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
