import Link from 'next/link';
import { Button } from '@ydm-agency/ui';
import { Container } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';

export const metadata = constructMetadata({
  title: 'About | YDM Agency',
  description:
    'YDM Agency is a solo AI-augmented web and marketing firm. Learn how projects are built and delivered.',
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-text-primary">
      <Container className="py-24 md:py-32">
        {/* Hero Section */}
        <section className="mb-24">
          <h1 className="mb-6 font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            About YDM Agency
          </h1>
          <p className="max-w-3xl text-xl text-text-secondary md:text-2xl">
            A modern marketing firm built for small businesses that want high‑quality work, direct
            communication, and results — without the overhead of a traditional agency.
          </p>
        </section>

        {/* Founder Photo Block */}
        <section className="mb-24 flex flex-col items-center gap-12 md:flex-row">
          <div className="relative flex aspect-square w-full max-w-md items-center justify-center rounded-xl border border-border bg-surface">
            <div className="text-center">
              <div className="mb-4 text-6xl">👤</div>
              <p className="text-sm text-text-secondary">Founder Photo Placeholder</p>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="mb-4 font-display text-2xl font-bold md:text-3xl">
              The Person Behind the Work
            </h2>
            <p className="mb-4 text-text-secondary">
              YDM Agency is led by Trevor Lam — a self‑taught developer who built expertise through
              hands‑on project work and continuous learning. Rather than relying on traditional
              credentials, the focus is on demonstrated capability through transparent processes and
              detailed service pages.
            </p>
            <p className="text-text-secondary">
              Every project is executed with modern tools and AI‑augmented workflows, ensuring
              clients receive high‑quality work delivered efficiently — without paying for agency
              overhead.
            </p>
          </div>
        </section>

        {/* How YDM Agency Works */}
        <section className="mb-24">
          <h2 className="mb-6 font-display text-2xl font-bold md:text-3xl">How YDM Agency Works</h2>
          <p className="mb-6 max-w-3xl text-text-secondary">
            YDM Agency was created to give businesses a smarter alternative: a focused, lean
            operation that uses modern, AI‑accelerated tools to deliver custom websites, search
            visibility, and marketing systems — faster and more affordably than a legacy agency.
          </p>
          <p className="mb-8 max-w-3xl text-text-secondary">
            Every engagement rests on three principles:
          </p>
          <ul className="max-w-3xl space-y-4">
            <li className="flex gap-4">
              <span className="font-bold text-accent">Direct collaboration.</span>
              <span className="text-text-secondary">
                Clients talk to the professional executing the work — no handoffs, no account
                managers filtering information.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-accent">Modern execution.</span>
              <span className="text-text-secondary">
                Latest tech stacks handle repetitive research and accelerate development, while
                strategy, creativity, and quality control stay firmly in human hands.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-accent">Radical transparency.</span>
              <span className="text-text-secondary">
                Real‑time dashboards, plain‑English reports, and no long‑term lock‑in contracts.
                Clients see exactly what&apos;s happening and only pay for what they need.
              </span>
            </li>
          </ul>
          <p className="mt-8 max-w-3xl text-text-secondary">
            YDM Agency is deliberately lean — not because of limitation, but because this structure
            keeps communication clear, overhead low, and quality high.
          </p>
        </section>

        {/* What YDM Agency Believes */}
        <section className="mb-24">
          <h2 className="mb-6 font-display text-2xl font-bold md:text-3xl">
            What YDM Agency Believes
          </h2>
          <ul className="max-w-3xl space-y-4">
            <li className="flex gap-4">
              <span className="font-bold text-accent">Results over reports.</span>
              <span className="text-text-secondary">
                The goal isn&apos;t a 40‑page PDF of jargon — it&apos;s more leads, more sales, and
                more visibility.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-accent">No templates, no shortcuts.</span>
              <span className="text-text-secondary">
                Every website and campaign is custom‑built with modern frameworks (Next.js, Tailwind
                CSS) and designed to grow with the business.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-accent">
                Accessibility and performance by default.
              </span>
              <span className="text-text-secondary">
                All work is designed to WCAG 2.1/2.2 AA standards and is optimized for speed and
                search from day one.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-accent">No lock‑in.</span>
              <span className="text-text-secondary">
                Clients stay because the work performs, not because a contract makes it hard to
                leave.
              </span>
            </li>
          </ul>
        </section>

        {/* What Sets YDM Agency Apart */}
        <section className="mb-24">
          <h2 className="mb-6 font-display text-2xl font-bold md:text-3xl">
            What Sets YDM Agency Apart
          </h2>
          <ul className="max-w-3xl space-y-4">
            <li className="flex gap-4">
              <span className="font-bold text-accent">AI‑augmented, human‑directed.</span>
              <span className="text-text-secondary">
                The speed of AI with the judgment of an experienced practitioner — projects ship in
                weeks, not months.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-accent">
                Direct access to the person doing the work.
              </span>
              <span className="text-text-secondary">
                The professional building your site or managing your campaign is the one you talk
                to.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-accent">A documented, transparent process.</span>
              <span className="text-text-secondary">
                Every service has a detailed process page showing exactly how the work unfolds, with
                clear timelines and deliverables.{' '}
                <Link href="/services/process" className="text-accent hover:underline">
                  → /services/process
                </Link>
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-accent">Fair, straightforward pricing.</span>
              <span className="text-text-secondary">
                Agency overhead is stripped away. Budgets go into the project, not layers of
                management.
              </span>
            </li>
          </ul>
        </section>

        {/* Where Based */}
        <section className="mb-24">
          <h2 className="mb-6 font-display text-2xl font-bold md:text-3xl">
            Where YDM Agency Is Based
          </h2>
          <p className="max-w-3xl text-text-secondary">
            YDM Agency is a fully remote operation. That structure keeps costs low and allows the
            firm to serve clients efficiently, regardless of time zone.
          </p>
        </section>

        {/* FAQs */}
        <section className="mb-24">
          <h2 className="mb-6 font-display text-2xl font-bold md:text-3xl">FAQs</h2>
          <dl className="max-w-3xl space-y-4">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-text-primary transition-colors hover:text-accent">
                Who will I work with?
                <span className="transform transition-transform group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-2 text-text-secondary">
                Every client works directly with a dedicated professional — the same person from
                start to finish.
              </p>
            </details>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-text-primary transition-colors hover:text-accent">
                How big is the firm?
                <span className="transform transition-transform group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-2 text-text-secondary">
                YDM Agency is intentionally lean. You&apos;ll collaborate directly with that
                dedicated professional — no account managers, no handoffs.
              </p>
            </details>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-text-primary transition-colors hover:text-accent">
                What types of businesses does YDM Agency work with?
                <span className="transform transition-transform group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-2 text-text-secondary">
                Small businesses, local service providers, startups, and anyone needing a modern
                online presence without a massive retainer.
              </p>
            </details>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-text-primary transition-colors hover:text-accent">
                Where can I see examples of the work?
                <span className="transform transition-transform group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-2 text-text-secondary">
                Service process pages and detailed deliverable overviews illustrate how work is
                delivered. Client case studies and examples will be added as real projects are
                completed.
              </p>
            </details>
          </dl>
        </section>

        {/* Final CTA */}
        <section className="border-t border-border py-16">
          <div className="max-w-2xl">
            <h2 className="mb-4 font-display text-2xl font-bold md:text-3xl">
              Ready to Start a Project?
            </h2>
            <p className="mb-8 text-text-secondary">
              Get a free project outline with no obligation.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button variant="primary" asChild>
                <Link href="/contact">Get a Free Project Outline</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/services/process">Learn more about the process</Link>
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
