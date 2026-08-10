/**
 * FILE: layout.tsx
 * PURPOSE: Root layout component for the Next.js app, configuring fonts, metadata, structured data, and global component hierarchy.
 * ARCHITECTURE: Server component that sets up HTML structure, font loading, SEO metadata, JSON-LD structured data, and composes all global providers and layout components.
 * KEY RULES: Must include proper semantic HTML; must configure fonts with display swap; must include JSON-LD for SEO; must maintain accessibility with main landmark; must support dark mode.
 * DEPENDS ON: next (Metadata, Inter, localFont), @ydm-agency/seo (constructMetadata, OrganizationJsonLd), @ydm-agency/ui (Header, Footer, CookieConsent), ./providers (AppProviders), @/lib/service-labels.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { OrganizationJsonLd, constructMetadata } from '@ydm-agency/seo';
import { Header, Footer, CookieConsent } from '@ydm-agency/ui';
import { AppProviders } from './providers';
import { SERVICE_LABELS } from '@/lib/service-labels';
import './globals.css';

// WHY: Inter font for body text with display swap for performance
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// WHY: Clash Display variable font for headings with display swap for performance
const clashDisplay = localFont({
  src: '../../public/fonts/ClashDisplay-Variable.woff2',
  variable: '--font-display',
  display: 'swap',
});

// WHY: Construct metadata for SEO with custom title and description for the homepage
export const metadata: Metadata = constructMetadata({
  title: 'YDM Agency | Custom Websites, Marketing Systems & Business Apps',
  description: 'Your business deserves a website and marketing that actually work. Custom websites, search visibility, and marketing systems — built by a modern, AI-augmented firm.',
});

// WHY: Generate service navigation links from service labels configuration
const serviceLinks = Object.entries(SERVICE_LABELS).map(([slug, label]) => ({
  label,
  href: `/services/${slug}`,
}));

// WHY: Define utility links for service-related pages (compare, pricing, industries, audit)
const serviceUtilityLinks = [
  { label: 'Compare Services', href: '/services/compare' },
  { label: 'Pricing', href: '/services/pricing' },
  { label: 'Industries', href: '/services/industries' },
  { label: 'Free Marketing Audit', href: '/audit' },
];

/**
 * WHAT IT DOES: Renders the root HTML structure with fonts, metadata, structured data, and global layout components.
 * @param {{ children: React.ReactNode }} props - Page content to render
 * @return {JSX.Element} - Complete HTML document structure
 * SIDE EFFECTS: None (server-side rendering).
 * ASSUMES: Font files exist in public directory; service labels are configured; providers handle client-side state.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${clashDisplay.variable} dark scroll-smooth`}>
      <head>
        {/* WHY: Organization JSON-LD for search engine understanding and rich snippets */}
        <OrganizationJsonLd
          name="YDM Agency"
          url="https://ydm-agency.com"
          logo="https://ydm-agency.com/logo.svg"
          contactPoint={{
            email: 'contact@ydmagency.com',
            contactType: 'Customer Support',
          }}
        />
      </head>
      <body className="bg-background text-text-primary antialiased font-sans">
        <AppProviders>
          <Header brandName="YDM Agency" serviceLinks={[...serviceLinks, ...serviceUtilityLinks]} />
          {/* WHY: Page-level <main> landmarks live in each page; the root wrapper keeps the skip-to-content target */}
          <div id="main-content">
            {children}
          </div>
          <Footer />
          <CookieConsent />
        </AppProviders>
      </body>
    </html>
  );
}
