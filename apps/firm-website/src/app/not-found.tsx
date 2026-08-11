/**
 * FILE: not-found.tsx
 * PURPOSE: Root 404 (not-found) UI for the Next.js App Router.
 * ARCHITECTURE: Server component rendered inside the root layout; uses the Container and Button components from the design system.
 * KEY RULES: Keep the tone firm-level and impersonal; do not duplicate the Header/Footer because the root layout already provides them.
 * DEPENDS ON: next (Metadata, Link), @ydm-agency/ui (Container, Button), @ydm-agency/seo (constructMetadata).
 * LAST UPDATED: 2026-08-10 T-074 add missing Next.js UI convention files
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Button } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Page Not Found | YDM Agency',
  description: 'The requested page could not be found. Explore services or contact YDM Agency for help.',
});

/**
 * WHAT IT DOES: Renders the global 404 page with a clear message and primary navigation CTAs.
 * @return {JSX.Element} - Rendered not-found page
 * SIDE EFFECTS: None (server-side rendering).
 * ASSUMES: The root layout wraps this component with the site header, footer, and global styles.
 */
export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Container className="text-center py-24 md:py-32">
        <h1 className="text-6xl md:text-8xl font-display font-bold text-accent mb-6">404</h1>
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-text-primary mb-4">
          Page not found
        </h2>
        <p className="text-text-secondary mb-8 max-w-xl mx-auto">
          That page does not exist. It may have been moved, removed, or the URL was mistyped.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/">Go home</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/services">Explore Services</Link>
          </Button>
        </div>
      </Container>
    </main>
  );
}
