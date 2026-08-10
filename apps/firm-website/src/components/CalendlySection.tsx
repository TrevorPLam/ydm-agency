/**
 * FILE: CalendlySection.tsx
 * PURPOSE: Provides the CalendlySection client component that wraps the lazily-imported CalendlyEmbed with a heading and intro copy.
 * ARCHITECTURE: Client component using next/dynamic to lazy-load CalendlyEmbed (ssr: false) with a pulse placeholder; renders a heading, description, and the embedded scheduling widget.
 * KEY RULES: Must lazy-load CalendlyEmbed (ssr: false) to keep the Calendly script out of the initial bundle; must provide a loading placeholder matching the embed height.
 * DEPENDS ON: next/dynamic, @/components/CalendlyEmbed.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
'use client';

import dynamic from 'next/dynamic';

const CalendlyEmbed = dynamic(
  () => import('@/components/CalendlyEmbed').then((mod) => mod.CalendlyEmbed),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[630px] bg-surface border border-border rounded-xl animate-pulse" />
    ),
  }
);

/**
 * WHAT IT DOES: Renders a section with a heading, intro copy, and the lazily-loaded Calendly embed.
 * @return {JSX.Element} - Rendered Calendly scheduling section
 * SIDE EFFECTS: Triggers dynamic import of CalendlyEmbed on the client.
 * ASSUMES: CalendlyEmbed handles its own URL configuration and lazy mounting.
 */
export function CalendlySection() {
  return (
    <div>
      <h2 className="text-xl font-display font-semibold text-text-primary mb-4">
        Prefer to pick a time?
      </h2>
      <p className="text-text-secondary mb-4">
        Use the calendar below — no back-and-forth needed.
      </p>
      <CalendlyEmbed />
    </div>
  );
}
