import Link from 'next/link';
import { Button } from '@ydm-agency/ui';
import { Container } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';

export const metadata = constructMetadata({
  title: 'About | YDM Agency',
  description: 'YDM Agency is a solo AI-augmented web and marketing firm. Learn how projects are built and delivered.',
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-text-primary">
      <Container className="py-24 md:py-32">
        {/* Hero Section */}
        <section className="mb-24">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            About YDM Agency
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl">
            A modern marketing firm built for small businesses that want high‑quality work, direct communication, and results — without the overhead of a traditional agency.
          </p>
        </section>

        {/* Founder Photo Block */}
        <section className="mb-24 flex flex-col md:flex-row gap-12 items-center">
          <div className="relative w-full max-w-md aspect-square bg-surface border border-border rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">👤</div>
              <p className="text-text-secondary text-sm">Founder Photo Placeholder</p>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              The Person Behind the Work
            </h2>
            <p className="text-text-secondary mb-4">
              YDM Agency is led by Trevor Lam — a self‑taught developer who built expertise through hands‑on project work and continuous learning. Rather than relying on traditional credentials, the focus is on demonstrated capability through live demos and transparent processes.
            </p>
            <p className="text-text-secondary">
              Every project is executed with modern tools and AI‑augmented workflows, ensuring clients receive high‑quality work delivered efficiently — without paying for agency overhead.
            </p>
          </div>
        </section>

        {/* How YDM Agency Works */}
        <section className="mb-24">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            How YDM Agency Works
          </h2>
          <p className="text-text-secondary mb-6 max-w-3xl">
            YDM Agency was created to give businesses a smarter alternative: a focused, lean operation that uses modern, AI‑accelerated tools to deliver custom websites, search visibility, and marketing systems — faster and more affordably than a legacy agency.
          </p>
          <p className="text-text-secondary mb-8 max-w-3xl">
            Every engagement rests on three principles:
          </p>
          <ul className="space-y-4 max-w-3xl">
            <li className="flex gap-4">
              <span className="text-accent font-bold">Direct collaboration.</span>
              <span className="text-text-secondary">Clients talk to the professional executing the work — no handoffs, no account managers filtering information.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-accent font-bold">Modern execution.</span>
              <span className="text-text-secondary">Latest tech stacks handle repetitive research and accelerate development, while strategy, creativity, and quality control stay firmly in human hands.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-accent font-bold">Radical transparency.</span>
              <span className="text-text-secondary">Real‑time dashboards, plain‑English reports, and no long‑term lock‑in contracts. Clients see exactly what's happening and only pay for what they need.</span>
            </li>
          </ul>
          <p className="text-text-secondary mt-8 max-w-3xl">
            YDM Agency is deliberately lean — not because of limitation, but because this structure keeps communication clear, overhead low, and quality high.
          </p>
        </section>

        {/* What YDM Agency Believes */}
        <section className="mb-24">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            What YDM Agency Believes
          </h2>
          <ul className="space-y-4 max-w-3xl">
            <li className="flex gap-4">
              <span className="text-accent font-bold">Results over reports.</span>
              <span className="text-text-secondary">The goal isn't a 40‑page PDF of jargon — it's more leads, more sales, and more visibility.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-accent font-bold">No templates, no shortcuts.</span>
              <span className="text-text-secondary">Every website and campaign is custom‑built with modern frameworks (Next.js, Tailwind CSS) and designed to grow with the business.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-accent font-bold">Accessibility and performance by default.</span>
              <span className="text-text-secondary">All work meets WCAG 2.1 AA standards and is optimized for speed and search from day one.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-accent font-bold">No lock‑in.</span>
              <span className="text-text-secondary">Clients stay because the work performs, not because a contract makes it hard to leave.</span>
            </li>
          </ul>
        </section>

        {/* What Sets YDM Agency Apart */}
        <section className="mb-24">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            What Sets YDM Agency Apart
          </h2>
          <ul className="space-y-4 max-w-3xl">
            <li className="flex gap-4">
              <span className="text-accent font-bold">AI‑augmented, human‑directed.</span>
              <span className="text-text-secondary">The speed of AI with the judgment of an experienced practitioner — projects ship in weeks, not months.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-accent font-bold">Direct access to the person doing the work.</span>
              <span className="text-text-secondary">The professional building your site or managing your campaign is the one you talk to.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-accent font-bold">A documented, transparent process.</span>
              <span className="text-text-secondary">Every service has a detailed process page showing exactly how the work unfolds, with clear timelines and deliverables. <Link href="/services/process" className="text-accent hover:underline">→ /services/process</Link></span>
            </li>
            <li className="flex gap-4">
              <span className="text-accent font-bold">Fair, straightforward pricing.</span>
              <span className="text-text-secondary">Agency overhead is stripped away. Budgets go into the project, not layers of management.</span>
            </li>
          </ul>
        </section>

        {/* Proof of Capability */}
        <section className="mb-24">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Proof of Capability
          </h2>
          <p className="text-text-secondary mb-6 max-w-3xl">
            YDM Agency is a new firm, but the quality of the work is immediately visible. Rather than relying on a long client list, the firm offers:
          </p>
          <ul className="space-y-4 max-w-3xl">
            <li className="flex gap-4">
              <span className="text-accent font-bold">Live project demos</span>
              <span className="text-text-secondary">— fully functional websites and applications that demonstrate design, speed, and technical capability. These are self‑initiated, built to the same standard as client work. <Link href="/demos" className="text-accent hover:underline">→ /demos</Link></span>
            </li>
            <li className="flex gap-4">
              <span className="text-accent font-bold">Detailed service‑specific process pages</span>
              <span className="text-text-secondary">— so potential clients can see exactly how a project would be delivered before ever making contact.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-accent font-bold">A commitment to transparency</span>
              <span className="text-text-secondary">— client dashboards, monthly reporting, and open communication ensure nothing is hidden.</span>
            </li>
          </ul>
          <p className="text-text-secondary mt-8 max-w-3xl">
            As real client projects are completed, case studies and testimonials will be added here. In the meantime, the process and the demos speak for themselves.
          </p>
        </section>

        {/* Where Based */}
        <section className="mb-24">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Where YDM Agency Is Based
          </h2>
          <p className="text-text-secondary max-w-3xl">
            YDM Agency is a fully remote operation. That structure keeps costs low and allows the firm to serve clients efficiently, regardless of time zone.
          </p>
        </section>

        {/* FAQs */}
        <section className="mb-24">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            FAQs
          </h2>
          <dl className="space-y-4 max-w-3xl">
            <details className="group">
              <summary className="cursor-pointer font-medium text-text-primary hover:text-accent transition-colors list-none flex items-center justify-between">
                Who will I work with?
                <span className="transform group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-text-secondary">
                Every client works directly with a dedicated professional — the same person from start to finish.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-text-primary hover:text-accent transition-colors list-none flex items-center justify-between">
                How big is the firm?
                <span className="transform group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-text-secondary">
                YDM Agency is intentionally lean. You'll collaborate directly with that dedicated professional — no account managers, no handoffs.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-text-primary hover:text-accent transition-colors list-none flex items-center justify-between">
                What types of businesses does YDM Agency work with?
                <span className="transform group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-text-secondary">
                Small businesses, local service providers, startups, and anyone needing a modern online presence without a massive retainer.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-text-primary hover:text-accent transition-colors list-none flex items-center justify-between">
                Where can I see examples of the work?
                <span className="transform group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-text-secondary">
                Live project demos are available on the Demos page, and service process pages illustrate how work is delivered.
              </p>
            </details>
          </dl>
        </section>

        {/* Final CTA */}
        <section className="py-16 border-t border-border">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Ready to Start a Project?
            </h2>
            <p className="text-text-secondary mb-8">
              Get a free project outline with no obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" asChild>
                <Link href="/contact">
                  Get a Free Project Outline
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/services/process">
                  Learn more about the process
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
