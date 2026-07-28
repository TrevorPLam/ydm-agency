import React from 'react';
import { Header, Hero, Features, Pricing, Container, Card, Badge, Footer } from '@ydm-agency/ui';
import { LeadForm } from '@ydm-agency/forms';

export default function Home() {
  const agencyServices = [
    {
      title: 'High-Converting Web Platforms',
      description: 'Ultra-fast Next.js & React websites built with sub-second page loads, mobile perfection, and search engine dominance.',
      icon: '🚀',
    },
    {
      title: 'Subdomain Landing Page Engines',
      description: 'Deploy bespoke client campaigns and interactive demo sites in minutes using our monorepo architecture.',
      icon: '⚡',
    },
    {
      title: 'Conversion Analytics & Funnels',
      description: 'End-to-end attribution modeling with GA4, PostHog, and Meta Pixel so every marketing dollar is accounted for.',
      icon: '📊',
    },
    {
      title: 'Native Business Applications',
      description: 'Custom internal tools, client portals, and workflow automation apps tailored specifically to your business operations.',
      icon: '💼',
    },
  ];

  const demoSites = [
    {
      title: 'Apex Dental Care',
      subdomain: 'demo-1.ydm-agency.com',
      demoPath: '/demos/demo-1',
      industry: 'Healthcare / Local Business',
      description: 'Complete patient self-scheduling platform with automated SMS intake and digital medical forms.',
      badge: 'Healthcare Demo',
    },
    {
      title: 'FlowMetric AI',
      subdomain: 'saas.ydm-agency.com',
      demoPath: '/demos/saas',
      industry: 'B2B SaaS / Tech',
      description: 'Data analytics platform marketing site with interactive pricing tiers, feature highlights, and lead capture.',
      badge: 'B2B SaaS Demo',
    },
  ];

  const agencyPlans = [
    {
      name: 'Landing Page System',
      price: '$2,500',
      period: 'one-time',
      description: 'Ideal for launching a flagship product, local business, or specific marketing campaign.',
      features: [
        'Bespoke Next.js & Tailwind UI',
        'Mobile & Conversion Optimized',
        'Lead Capture Form Integration',
        'Full SEO Meta & Schema Setup',
        'Subdomain or Custom Domain Deployment',
      ],
    },
    {
      name: 'Growth Web Platform',
      price: '$4,900',
      period: 'one-time',
      description: 'Complete marketing website + CMS setup for scaling businesses looking to dominate search.',
      features: [
        'Multi-Page Next.js App Router',
        'Headless Content Management',
        'Subdomain & Demo Ecosystem Integration',
        'GA4, PostHog & Pixel Setup',
        'Performance & Accessibility Guarantee',
        '3 Months Post-Launch Support',
      ],
      popular: true,
    },
    {
      name: 'Custom Agency Partnership',
      price: '$7,500+',
      period: 'monthly or project',
      description: 'Full-service web development, continuous landing page production, and native business applications.',
      features: [
        'Dedicated Monorepo Application Workspace',
        'Infinite Subdomain Campaign Deployment',
        'Custom Business App & Portal Development',
        '24/7 Monitoring & Direct Developer Access',
        'A/B Testing & Funnel Optimization',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Header brandName="YDM Agency" />

      <main className="flex-1">
        <Hero
          badgeText="Next-Gen Marketing & Monorepo Development"
          title="We Build High-Converting Sites & Native Web Apps for"
          highlightedTitle="Ambitious Businesses"
          description="YDM Agency combines modern engineering with conversion rate psychology to deliver lightning-fast web platforms, subdomain marketing campaigns, and native business apps."
          primaryCtaText="Book Strategy Call"
          primaryCtaHref="#contact"
          secondaryCtaText="Explore Demo Sites"
          secondaryCtaHref="#demos"
        />

        <div id="services">
          <Features
            title="Core Marketing & Engineering Services"
            subtitle="Built on enterprise-grade monorepo technology to scale your business without technical debt."
            features={agencyServices}
          />
        </div>

        <section id="demos" className="py-20 bg-slate-900 border-t border-slate-800">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="accent" className="mb-4">Subdomain Showcase</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Live Subdomain Demo Sites
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                Test-drive sample client websites running directly on subdomains from our unified agency monorepo architecture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {demoSites.map((demo, idx) => (
                <Card
                  key={idx}
                  className="bg-slate-950 border-slate-800 p-8 hover:border-blue-500/60 transition-all duration-300 shadow-2xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="default">{demo.badge}</Badge>
                      <span className="text-xs text-slate-500 font-mono">{demo.industry}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{demo.title}</h3>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                      {demo.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs font-mono text-blue-400 bg-blue-950/60 px-3 py-1.5 rounded border border-blue-900/60">
                      https://{demo.subdomain}
                    </span>
                    <a
                      href={demo.demoPath}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-lg transition-colors shadow-md"
                    >
                      View Live Demo →
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        <Pricing
          title="Transparent Agency Investment"
          subtitle="Fixed-rate engagement models with clear deliverables and zero hidden fees."
          plans={agencyPlans}
        />

        <section id="contact" className="py-20 bg-slate-950 border-t border-slate-800">
          <Container>
            <LeadForm
              title="Schedule Your Growth Strategy Call"
              subtitle="Let us analyze your web strategy and demonstrate how our monorepo architecture can scale your brand."
              sourceApp="agency-main-homepage"
            />
          </Container>
        </section>
      </main>

      <Footer brandName="YDM Agency" />
    </div>
  );
}
