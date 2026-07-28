import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { OrganizationJsonLd, constructMetadata } from '@ydm-agency/seo';
import { Header, Footer, CookieConsent } from '@ydm-agency/ui';
import { AppProviders } from './providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const clashDisplay = localFont({
  src: '../../public/fonts/ClashDisplay-Variable.woff2',
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = constructMetadata({
  title: 'YDM Agency | Custom Websites, Marketing Systems & Business Apps',
  description: 'Your business deserves a website and marketing that actually work. Custom websites, search visibility, and marketing systems — built by a modern, AI-augmented firm.',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${clashDisplay.variable} dark scroll-smooth`}>
      <head>
        <OrganizationJsonLd
          name="YDM Agency"
          url="https://ydm-agency.com"
          logo="https://ydm-agency.com/logo.png"
          contactPoint={{
            email: 'contact@ydmagency.com',
            contactType: 'Customer Support',
          }}
        />
      </head>
      <body className="bg-background text-text-primary antialiased font-sans">
        <AppProviders>
          <Header brandName="YDM Agency" />
          <main id="main-content">
            {children}
          </main>
          <Footer />
          <CookieConsent />
        </AppProviders>
      </body>
    </html>
  );
}
