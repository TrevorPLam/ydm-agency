'use client';

import dynamic from 'next/dynamic';
import { InlineWidget } from 'react-calendly';

// Lazy load the actual Calendly widget
const CalendlyInlineWidget = dynamic(
  () => import('react-calendly').then((mod) => ({ default: mod.InlineWidget })),
  {
    ssr: false,
    loading: () => (
      <div className="bg-surface border border-border rounded-xl p-8 text-center">
        <p className="text-text-secondary">Loading calendar...</p>
      </div>
    ),
  }
);

export function CalendlyWidget() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/ydm-agency/project-consultation';
  
  return (
    <div className="min-h-[700px]">
      <CalendlyInlineWidget
        url={calendlyUrl}
        styles={{ height: '700px' }}
        prefill={{}}
      />
    </div>
  );
}

export default CalendlyWidget;
