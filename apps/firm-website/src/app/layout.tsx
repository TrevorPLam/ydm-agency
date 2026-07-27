import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { AnalyticsProvider } from '@ydm-agency/analytics';
import { OrganizationJsonLd, constructMetadata } from '@ydm-agency/seo';
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
  title: 'YDM Agency | Digital Growth & Native Web Applications',
  description: 'Data-driven marketing, ultra-fast web development, and client conversion systems for ambitious businesses.',
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
            email: 'hello@ydm-agency.com',
            contactType: 'Customer Support',
          }}
        />
      </head>
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-blue-500 selection:text-white">
        <AnalyticsProvider />
        {children}
      </body>
    </html>
  );
}
