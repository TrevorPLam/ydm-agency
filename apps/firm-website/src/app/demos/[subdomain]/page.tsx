import React from 'react';
import { Hero, Features, Pricing, Container, Header, Footer } from '@ydm-agency/ui';
import { LeadForm } from '@ydm-agency/forms';
import { constructMetadata } from '@ydm-agency/seo';

interface DemoPageProps {
  params: Promise<{
    subdomain: string;
  }>;
}

const DEMO_CONFIGS: Record<string, {
  name: string;
  industry: string;
  tagline: string;
  heroHighlight: string;
  heroDescription: string;
  features: { title: string; description: string; icon?: string }[];
  pricing: { name: string; price: string; description: string; features: string[]; popular?: boolean }[];
}> = {
  'demo-1': {
    name: 'Apex Dental Care',
    industry: 'Healthcare / Dental',
    tagline: 'Modern Dental Practice Web Platform',
    heroHighlight: 'Smarter Patient Booking & Care',
    heroDescription: 'Experience seamless online appointment scheduling, digital intake forms, and automated patient reminder workflows built for high-growth dental practices.',
    features: [
      { title: '24/7 Patient Booking', description: 'Real-time sync with practice management software for instant self-scheduling.' },
      { title: 'Digital Intake Forms', description: 'Zero waiting room paperwork with secure mobile form submissions.' },
      { title: 'Automated Reminders', description: 'SMS and email notifications that cut no-show rates by up to 65%.' },
    ],
    pricing: [
      { name: 'Single Office', price: '$299', description: 'Ideal for independent practices', features: ['Online Scheduling', 'SMS Reminders', 'Standard Intake'] },
      { name: 'Multi-Location', price: '$599', description: 'For growing group practices', features: ['Multi-provider Calendar', 'Custom Intake Workflows', 'Priority Support'], popular: true },
      { name: 'Enterprise', price: '$999', description: 'Full custom integration', features: ['EHR/PMS Integration', 'Dedicated Account Manager', 'Custom Analytics'] },
    ],
  },
  'saas': {
    name: 'FlowMetric AI',
    industry: 'B2B Software',
    tagline: 'AI-Powered Business Intelligence',
    heroHighlight: 'Turn Raw Data into Growth Signals',
    heroDescription: 'Empower your revenue ops team with real-time conversion forecasting, user journey analytics, and automated attribution modeling.',
    features: [
      { title: 'Real-Time Telemetry', description: 'Sub-second event ingestion and conversion tracking across all web apps.' },
      { title: 'Predictive Churn AI', description: 'Identify at-risk accounts weeks before contract renewal dates.' },
      { title: '1-Click Integrations', description: 'Connects directly with Salesforce, HubSpot, Stripe, and Postgres.' },
    ],
    pricing: [
      { name: 'Starter', price: '$99', description: 'Up to 50k monthly events', features: ['Core Dashboards', '3 Team Members', 'Slack Alerts'] },
      { name: 'Pro Growth', price: '$299', description: 'Up to 500k monthly events', features: ['AI Forecasting', 'Unlimited Members', 'Custom Funnels'], popular: true },
      { name: 'Scale', price: '$799', description: 'Unlimited events & custom SLA', features: ['Dedicated Server', 'SOC2 Compliance', '24/7 Phone Support'] },
    ],
  },
};

export async function generateMetadata({ params }: DemoPageProps) {
  const { subdomain } = await params;
  const config = DEMO_CONFIGS[subdomain] || {
    name: `${subdomain.toUpperCase()} Demo`,
    tagline: 'Client Web Demo Platform',
    heroDescription: 'Interactive demonstration site hosted on YDM Agency subdomains.',
  };

  return constructMetadata({
    title: `${config.name} | YDM Agency Live Demo`,
    description: config.heroDescription,
  });
}

export default async function DemoSubdomainPage({ params }: DemoPageProps) {
  const { subdomain } = await params;
  const demo = DEMO_CONFIGS[subdomain] || {
    name: `${subdomain.toUpperCase()} Demo Site`,
    industry: 'Demo Showcase',
    tagline: 'Showcase Demo Platform',
    heroHighlight: 'Interactive Client Experience Showcase',
    heroDescription: 'This is a live interactive subdomain demo built on the YDM Agency Monorepo stack.',
    features: [
      { title: 'Ultra-Fast Performance', description: 'Sub-second load times engineered with Next.js App Router and edge caching.' },
      { title: 'Unified Design Tokens', description: 'Shared design system components reused seamlessly across all client projects.' },
      { title: 'Built-in Lead Capture', description: 'High-converting forms integrated with analytics tracking and email delivery.' },
    ],
    pricing: [
      { name: 'Basic Tier', price: '$1,500', description: 'Standard landing page setup', features: ['Custom UI Design', 'SEO Essentials', 'Mobile Responsive'] },
      { name: 'Growth Tier', price: '$3,500', description: 'Full marketing website + CMS', features: ['Headless CMS', 'Lead Routing', 'Conversion Analytics'], popular: true },
      { name: 'Enterprise App', price: '$8,000+', description: 'Native web application', features: ['Custom Backend', 'Subdomain Routing', 'Dedicated Infrastructure'] },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-2 px-4 text-center text-xs sm:text-sm font-medium">
        ⚡ Live Subdomain Demo: <span className="font-bold underline">{subdomain}.ydm-agency.com</span> ({demo.industry}) — Built by YDM Agency
      </div>

      <Header brandName={demo.name} />

      <main className="flex-1">
        <Hero
          badgeText={`Live Demo • ${demo.industry}`}
          title={demo.tagline}
          highlightedTitle={demo.heroHighlight}
          description={demo.heroDescription}
          primaryCtaText="Schedule Consultation"
          primaryCtaHref="#contact"
          secondaryCtaText="Explore Features"
          secondaryCtaHref="#features"
        />

        <div id="features">
          <Features
            title={`Why Clients Choose ${demo.name}`}
            subtitle="Engineered for maximum conversion, speed, and customer satisfaction."
            features={demo.features}
          />
        </div>

        <Pricing
          title="Transparent Pricing & Plans"
          subtitle="Flexible plans tailored to your exact business size and growth goals."
          plans={demo.pricing}
        />

        <section id="contact" className="py-20 bg-slate-900 border-t border-slate-800">
          <Container>
            <LeadForm
              title={`Interested in a Site Like ${demo.name}?`}
              subtitle="Let YDM Agency build, deploy, and scale your web presence with high-converting architecture."
              sourceApp={`demo-subdomain-${subdomain}`}
            />
          </Container>
        </section>
      </main>

      <Footer brandName={demo.name} />
    </div>
  );
}
