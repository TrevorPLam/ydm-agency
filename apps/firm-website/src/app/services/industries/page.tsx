import Link from 'next/link';
import { Card } from '@ydm-agency/ui';
import { Button } from '@ydm-agency/ui';
import { Container } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';
import { 
  Briefcase, 
  Wrench, 
  User 
} from 'lucide-react';

interface IndustryCard {
  slug: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  subIndustries: string[];
}

const INDUSTRY_CARDS: IndustryCard[] = [
  {
    slug: 'professional-services',
    title: 'Professional Services',
    description: 'Law firms, accounting practices, and consulting businesses build trust through credential display, case study positioning, and referral-driven marketing systems.',
    icon: Briefcase,
    subIndustries: ['Law Firms', 'Accounting & Tax', 'Consulting'],
  },
  {
    slug: 'home-services',
    title: 'Home Services',
    description: 'Plumbing, HVAC, and electrical contractors get found locally, handle emergency calls, and turn reviews into repeat business.',
    icon: Wrench,
    subIndustries: ['Plumbing', 'HVAC', 'Electrical'],
  },
  {
    slug: 'solopreneurs',
    title: 'Solo-preneurs & Personal Services',
    description: 'Day care providers, salons, tattoo studios, and personal service businesses build local visibility and appointment systems that work while you focus on clients.',
    icon: User,
    subIndustries: ['Day Care', 'Hair Salons', 'Tattoo Studios', 'Barbershops'],
  },
];

export async function generateMetadata() {
  return constructMetadata({
    title: 'Industry Solutions | YDM Agency',
    description: 'Specialized marketing and web design solutions for professional services, home services contractors, and solo-preneurs.',
  });
}

export default function IndustriesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <Container>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6">
            Marketing Solutions Built for Your Industry
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl">
            Generic marketing doesn&apos;t work when your business has specific needs — credential display for professional services, emergency response for home services, appointment systems for personal services. Industry-specific solutions address what actually matters.
          </p>
        </Container>
      </section>

      {/* Industries Grid */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INDUSTRY_CARDS.map((industry) => {
              const Icon = industry.icon;
              return (
                <Link key={industry.slug} href={`/services/industries/${industry.slug}`}>
                  <Card className="h-full p-6 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-display font-semibold text-text-primary mb-3">
                      {industry.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {industry.description}
                    </p>
                    <div className="mt-auto">
                      <p className="text-xs text-text-secondary mb-2">Includes:</p>
                      <div className="flex flex-wrap gap-2">
                        {industry.subIndustries.map((sub) => (
                          <span key={sub} className="text-xs bg-surface border border-border px-2 py-1 rounded text-text-secondary">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Why Industry-Specific Matters */}
      <section className="py-16 md:py-24 bg-surface border-y border-border">
        <Container>
          <h2 className="text-3xl font-display font-bold text-text-primary mb-12">
            Why Industry-Specific Solutions Matter
          </h2>
          <ul className="space-y-6 max-w-3xl">
            <li className="flex items-start gap-4">
              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
              <p className="text-text-secondary">
                <strong>Professional services</strong> need credential display, case study positioning, and referral-driven systems — not generic lead generation.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
              <p className="text-text-secondary">
                <strong>Home services</strong> need local visibility, emergency call handling, and review systems that drive repeat business — not brand awareness campaigns.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
              <p className="text-text-secondary">
                <strong>Solo-preneurs</strong> need appointment systems, local search visibility, and marketing that works while you&apos;re with clients — not complex enterprise tools.
              </p>
            </li>
          </ul>
        </Container>
      </section>

      {/* Not Sure */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-display font-bold text-text-primary mb-4">
              Don&apos;t See Your Industry?
            </h2>
            <p className="text-lg text-text-secondary mb-4">
              The core services — website design, SEO, analytics, and marketing systems — work across any business. Industry pages highlight specific patterns and common starting points, but every project is scoped individually.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/services" className="text-accent hover:text-accent-hover underline underline-offset-4">
                See all services →
              </Link>
              <Link href="/contact" className="text-accent hover:text-accent-hover underline underline-offset-4">
                Get a free project outline →
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
              Describe your business and industry — a tailored approach will be provided.
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
