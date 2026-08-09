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
