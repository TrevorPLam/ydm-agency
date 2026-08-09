import Link from 'next/link';
import { Hero, Container, Card, Button } from '@ydm-agency/ui';
import { CheckCircle, Monitor, MessageSquare, Rocket } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="noise relative">
        <Hero
          title="Your Business Deserves a Website and Marketing That"
          highlightedTitle="Actually Work"
          description="Custom websites, search visibility, and marketing systems — built by a modern, AI‑augmented firm that moves fast, communicates directly, and doesn't charge agency overhead."
          primaryCtaText="Explore Services"
          primaryCtaHref="/services"
          secondaryCtaText="Get a Free Project Outline"
          secondaryCtaHref="/contact"
        />
      </section>

      {/* Services Snapshot */}
      <section id="services" className="bg-background py-24 md:py-32">
        <Container>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Start with What Matters Most
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Three core services that drive immediate results for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="flex h-full flex-col p-8">
              <div className="mb-4 flex items-center gap-4">
                <div className="bg-accent/10 rounded-lg p-3">
                  <Monitor className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary">
                  Build a Website That Converts
                </h3>
              </div>
              <p className="mb-6 flex-1 text-text-secondary">
                Custom design and development, fast load speeds, mobile‑ready, and built to turn
                visitors into leads.
              </p>
              <Link
                href="/services/web-design"
                className="inline-flex items-center gap-2 font-medium text-accent hover:text-accent-hover"
              >
                See Website Design →
              </Link>
            </Card>

            <Card className="flex h-full flex-col p-8">
              <div className="mb-4 flex items-center gap-4">
                <div className="bg-accent/10 rounded-lg p-3">
                  <Rocket className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary">
                  Get Found on Google & Beyond
                </h3>
              </div>
              <p className="mb-6 flex-1 text-text-secondary">
                SEO, local search optimization, and AI‑search readiness so customers can find you
                wherever they look.
              </p>
              <Link
                href="/services/seo"
                className="inline-flex items-center gap-2 font-medium text-accent hover:text-accent-hover"
              >
                See SEO & AI Search →
              </Link>
            </Card>

            <Card className="flex h-full flex-col p-8">
              <div className="mb-4 flex items-center gap-4">
                <div className="bg-accent/10 rounded-lg p-3">
                  <MessageSquare className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary">
                  Market Smarter, Not Harder
                </h3>
              </div>
              <p className="mb-6 flex-1 text-text-secondary">
                Paid advertising, branding, copywriting, and automation — all managed with total
                transparency.
              </p>
              <Link
                href="/services/paid-ads"
                className="inline-flex items-center gap-2 font-medium text-accent hover:text-accent-hover"
              >
                See Paid Advertising →
              </Link>
            </Card>
          </div>
        </Container>
      </section>

      {/* Process Teaser */}
      <section className="bg-background py-24 md:py-32">
        <Container>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              How Projects Move Forward
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              A clear, transparent process from first conversation to final delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="p-8 text-center">
              <div className="bg-accent/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <span className="text-2xl font-bold text-accent">1</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-text-primary">We talk.</h3>
              <p className="text-text-secondary">
                A short call or questionnaire uncovers your goals and what success looks like.
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="bg-accent/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <span className="text-2xl font-bold text-accent">2</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-text-primary">We build.</h3>
              <p className="text-text-secondary">
                AI‑augmented development accelerates the work; you see progress through regular
                previews and dashboards.
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="bg-accent/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <span className="text-2xl font-bold text-accent">3</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-text-primary">We deliver.</h3>
              <p className="text-text-secondary">
                Performance‑tested, designed to WCAG 2.1/2.2 AA standards, and fully deployed — with
                ongoing support available.
              </p>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services/process"
              className="inline-flex items-center gap-2 font-medium text-accent hover:text-accent-hover"
            >
              Learn more about the process →
            </Link>
          </div>
        </Container>
      </section>

      {/* Trust Banner */}
      <section className="border-y border-border bg-surface py-12">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex items-start gap-4">
              <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
              <p className="text-text-primary">
                No account managers. You talk directly to the person building your project.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
              <p className="text-text-primary">
                No templates. Every project is custom‑built with modern frameworks.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
              <p className="text-text-primary">
                No lock‑in contracts. Client relationships last because the results speak for
                themselves.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
              <p className="text-text-primary">
                AI‑augmented, human‑directed. Speed without sacrifice.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="bg-background py-24 md:py-32">
        <Container className="max-w-3xl text-center">
          <h2 className="mb-6 font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Ready for a website or marketing system that actually performs?
          </h2>
          <p className="mb-8 text-lg text-text-secondary">
            Describe what is not working — a clear path forward will be provided, free of charge.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button variant="primary" className="w-full sm:w-auto">
                Get a Free Project Outline
              </Button>
            </Link>
            <Link
              href="/services"
              className="font-medium text-text-secondary hover:text-text-primary"
            >
              Explore all services
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
