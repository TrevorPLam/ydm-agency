/**
 * FILE: CalendlyWidget.tsx
 * PURPOSE: Provides the CalendlyWidget client component that dynamically imports and renders the Calendly inline scheduling widget with a loading fallback.
 * ARCHITECTURE: Client component using next/dynamic to lazy-load react-calendly's InlineWidget with ssr disabled and a loading placeholder; reads the Calendly URL from NEXT_PUBLIC_CALENDLY_URL with a default fallback.
 * KEY RULES: Must lazy-load the Calendly widget (ssr: false) to avoid bundling it in the initial client bundle; must provide a loading placeholder; must fall back to a default Calendly URL when the env var is unset.
 * DEPENDS ON: next/dynamic, react-calendly (InlineWidget), NEXT_PUBLIC_CALENDLY_URL env var.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
'use client';

import dynamic from 'next/dynamic';
import { InlineWidget } from 'react-calendly';

// WHY: Lazy load the actual Calendly widget so it is not included in the initial client bundle
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

/**
 * WHAT IT DOES: Renders the dynamically-loaded Calendly inline widget using the configured or default scheduling URL.
 * @return {JSX.Element} - Calendly inline widget wrapped in a min-height container
 * SIDE EFFECTS: Triggers dynamic import of react-calendly on the client.
 * ASSUMES: NEXT_PUBLIC_CALENDLY_URL, when set, is a valid Calendly scheduling URL.
 */
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
