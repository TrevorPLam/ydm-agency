/**
 * FILE: error.tsx
 * PURPOSE: Root error boundary UI for the Next.js App Router.
 * ARCHITECTURE: Client component rendered inside the root layout when an error is caught by the React error boundary; logs the error and offers a reset action.
 * KEY RULES: Error files must be Client Components; keep error UI minimal and avoid heavy client logic; do not duplicate the Header/Footer because the root layout already provides them.
 * DEPENDS ON: react (useEffect), next/link, @ydm-agency/ui (Container, Button).
 * LAST UPDATED: 2026-08-10 T-074 add missing Next.js UI convention files
 */
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Container, Button } from '@ydm-agency/ui';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * WHAT IT DOES: Renders the global error fallback with a reset action and a contact CTA.
 * @param {ErrorProps} props - The caught error and a reset callback
 * @return {JSX.Element} - Rendered error page
 * SIDE EFFECTS: Logs the error to the console for debugging.
 * ASSUMES: The root layout wraps this component with the site header, footer, and global styles.
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <Container className="text-center py-24 md:py-32">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-6">
          Something went wrong
        </h1>
        <p className="text-text-secondary mb-8 max-w-xl mx-auto">
          An unexpected error occurred. Please try again or contact YDM Agency if the issue persists.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={reset} size="lg">
            Try again
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/contact">Get a Free Project Outline</Link>
          </Button>
        </div>
      </Container>
    </main>
  );
}
