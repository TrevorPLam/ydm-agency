import Link from 'next/link';
import { Card } from '@ydm-agency/ui';
import { Badge } from '@ydm-agency/ui';
import { Button } from '@ydm-agency/ui';
import { Container } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';
import { 
  Monitor, 
  Search, 
  Shield, 
  BarChart3, 
  Megaphone, 
  Sparkles, 
  PenTool, 
  Zap, 
  Star 
} from 'lucide-react';

interface ServiceCard {
  slug: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  selectClients: boolean;
}

const SERVICE_CARDS: ServiceCard[] = [
  {
    slug: 'web-design',
    title: 'Website Design & Development',
    description: 'Custom sites that turn visitors into customers — fast, mobile‑ready, and built around how you do business.',
    icon: Monitor,
    selectClients: false,
  },
  {
    slug: 'seo',
    title: 'SEO & AI Search Optimization',
    description: 'Customers find you wherever they\'re searching — traditional search engines and AI‑powered tools.',
    icon: Search,
    selectClients: false,
  },
  {
    slug: 'maintenance',
    title: 'Website Maintenance',
    description: 'Sites are kept secure, fast, and up‑to‑date so you never have to think about it.',
    icon: Shield,
    selectClients: false,
  },
  {
    slug: 'analytics',
    title: 'Analytics & Reporting',
    description: 'Simple, honest tracking turns data into plain‑English reports — so guessing what\'s working stops and investing in what actually brings business begins.',
    icon: BarChart3,
    selectClients: false,
  },
  {
    slug: 'paid-ads',
    title: 'Paid Advertising',
    description: 'Ads are built, managed, and optimized to turn clicks into customers — not just spend.',
    icon: Megaphone,
    selectClients: true,
  },
  {
    slug: 'branding',
    title: 'Branding & Messaging',
    description: 'Messages are defined, identity is sharpened, and businesses are made unforgettable.',
    icon: Sparkles,
    selectClients: false,
  },
  {
    slug: 'content',
    title: 'Website & Marketing Copywriting',
    description: 'Copy is written that sounds like you and sells like crazy — benefit‑driven, clear, and conversion‑focused.',
    icon: PenTool,
    selectClients: false,
  },
  {
    slug: 'automation',
    title: 'CRM & Marketing Automation',
    description: 'Systems are set up that automatically follow up, remind who to call, and make sure every inquiry gets a response — personalized and on time, even while you sleep.',
    icon: Zap,
    selectClients: true,
  },
  {
    slug: 'reputation',
    title: 'Reputation & Review Management',
    description: 'Profiles are optimized, a system for collecting genuine reviews is built, and responses are handled — so your reputation works for you around the clock.',
    icon: Star,
    selectClients: true,
  },
];

export async function generateMetadata() {
  return constructMetadata({
    title: 'Services | YDM Agency',
    description: 'Custom web design, SEO, analytics, and marketing systems for small businesses.',
  });
}

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
            {SERVICE_CARDS.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.slug} href={`/services/${service.slug}`}>
                  <Card className="h-full p-6 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <Icon className="w-8 h-8 text-accent" />
                      {service.selectClients && (
                        <Badge variant="accent">Select clients</Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-display font-semibold text-text-primary mb-3">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {service.description}
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
            <p className="text-lg text-text-secondary mb-4">
              Most clients begin with a website or SEO foundation and add services as they see results. A brief discovery call helps pinpoint the highest‑impact starting point — no obligation.
            </p>
            <Link href="/contact" className="text-accent hover:text-accent-hover underline underline-offset-4">
              Get in touch →
            </Link>
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
