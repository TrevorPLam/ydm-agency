/**
 * FILE: loading.tsx
 * PURPOSE: Root loading fallback for the Next.js App Router while page content streams in.
 * ARCHITECTURE: Server component rendered inside the root layout; shows a minimal pulse skeleton using design tokens.
 * KEY RULES: Keep loading UI lightweight and avoid client-side state; use the Container component from the design system.
 * DEPENDS ON: @ydm-agency/ui (Container).
 * LAST UPDATED: 2026-08-10 T-074 add missing Next.js UI convention files
 */
import { Container } from '@ydm-agency/ui';

/**
 * WHAT IT DOES: Renders a root loading skeleton that matches the site background and surface colors.
 * @return {JSX.Element} - Rendered loading fallback
 * SIDE EFFECTS: None (server-side rendering).
 * ASSUMES: The root layout wraps this component with the site header, footer, and global styles.
 */
export default function Loading() {
  return (
    <main className="min-h-screen">
      <Container className="py-24 md:py-32">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="h-12 bg-surface border border-border rounded-xl animate-pulse w-2/3" />
          <div className="h-6 bg-surface border border-border rounded-xl animate-pulse w-1/2" />
          <div className="h-64 bg-surface border border-border rounded-xl animate-pulse" />
          <div className="h-6 bg-surface border border-border rounded-xl animate-pulse w-3/4" />
        </div>
      </Container>
    </main>
  );
}
