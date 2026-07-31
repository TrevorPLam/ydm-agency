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
      <section id="services" className="py-24 md:py-32 bg-background">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary font-display">
              Start with What Matters Most
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Three core services that drive immediate results for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Monitor className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary">Build a Website That Converts</h3>
              </div>
              <p className="text-text-secondary mb-6 flex-1">
                Custom design and development, fast load speeds, mobile‑ready, and built to turn visitors into leads.
              </p>
              <Link href="/services/web-design" className="text-accent hover:text-accent-hover font-medium inline-flex items-center gap-2">
                Learn more →
              </Link>
            </Card>

            <Card className="p-8 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Rocket className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary">Get Found on Google & Beyond</h3>
              </div>
              <p className="text-text-secondary mb-6 flex-1">
                SEO, local search optimization, and AI‑search readiness so customers can find you wherever they look.
              </p>
              <Link href="/services/seo" className="text-accent hover:text-accent-hover font-medium inline-flex items-center gap-2">
                Learn more →
              </Link>
            </Card>

            <Card className="p-8 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-accent/10">
                  <MessageSquare className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary">Market Smarter, Not Harder</h3>
              </div>
              <p className="text-text-secondary mb-6 flex-1">
                Paid advertising, branding, copywriting, and automation — all managed with total transparency.
              </p>
              <Link href="/services/paid-ads" className="text-accent hover:text-accent-hover font-medium inline-flex items-center gap-2">
                Learn more →
              </Link>
            </Card>
          </div>
        </Container>
      </section>

      {/* Process Teaser */}
      <section className="py-24 md:py-32 bg-background">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary font-display">
              How Projects Move Forward
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              A clear, transparent process from first conversation to final delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">1</span>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">We talk.</h3>
              <p className="text-text-secondary">
                A short call or questionnaire uncovers your goals and what success looks like.
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">2</span>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">We build.</h3>
              <p className="text-text-secondary">
                AI‑augmented development accelerates the work; you see progress through regular previews and dashboards.
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">3</span>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">We deliver.</h3>
              <p className="text-text-secondary">
                Performance‑tested, accessibility‑checked, and fully deployed — with ongoing support available.
              </p>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/services/process" className="text-accent hover:text-accent-hover font-medium inline-flex items-center gap-2">
              Learn more about the process →
            </Link>
          </div>
        </Container>
      </section>

      {/* Trust Banner */}
      <section className="bg-surface border-y border-border py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <p className="text-text-primary">
                No account managers. You talk directly to the person building your project.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <p className="text-text-primary">
                No templates. Every project is custom‑built with modern frameworks.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <p className="text-text-primary">
                No lock‑in contracts. Client relationships last because the results speak for themselves.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <p className="text-text-primary">
                AI‑augmented, human‑directed. Speed without sacrifice.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-background">
        <Container className="text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary font-display mb-6">
            Ready for a website or marketing system that actually performs?
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            Describe what is not working — a clear path forward will be provided, free of charge.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary" className="w-full sm:w-auto">
                Get a Free Project Outline
              </Button>
            </Link>
            <Link href="/services" className="text-text-secondary hover:text-text-primary font-medium">
              Explore all services
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
