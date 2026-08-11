/**
 * FILE: CalendlyWidget.tsx
 * PURPOSE: Provides a single, lazy-loaded Calendly scheduling widget that only mounts when it nears the viewport.
 * ARCHITECTURE: Client component using next/dynamic to lazy-load react-calendly's InlineWidget with ssr disabled, and an IntersectionObserver to defer mounting until the container is near the viewport; reads the Calendly URL from NEXT_PUBLIC_CALENDLY_URL.
 * KEY RULES: Must not render the widget when NEXT_PUBLIC_CALENDLY_URL is unset (returns null); must use a dynamic import (no top-level InlineWidget import); must defer widget mount until intersection to protect initial page performance; must disconnect the observer after first intersection; must use a consistent 630px height.
 * DEPENDS ON: next/dynamic, react, react-calendly (InlineWidget), NEXT_PUBLIC_CALENDLY_URL env var.
 * LAST UPDATED: 2026-08-10 T-073 consolidate Calendly wrappers
 */
'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL;

// WHY: Lazy load the Calendly widget so it is not included in the initial client bundle
const CalendlyInlineWidget = dynamic(
  () => import('react-calendly').then((mod) => ({ default: mod.InlineWidget })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[630px] bg-surface border border-border rounded-xl animate-pulse" />
    ),
  }
);

/**
 * WHAT IT DOES: Renders the Calendly inline widget lazily once the container nears the viewport, using the configured scheduling URL.
 * @return {JSX.Element | null} - Calendly inline widget, a pulse placeholder, or null when no URL is configured
 * SIDE EFFECTS: Creates and disconnects an IntersectionObserver; triggers a dynamic import of react-calendly when the widget becomes visible.
 * ASSUMES: NEXT_PUBLIC_CALENDLY_URL, when set, is a valid Calendly scheduling URL.
 */
export function CalendlyWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px', threshold: 0 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (!CALENDLY_URL) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="min-h-[630px]"
      role="region"
      aria-label="Calendly scheduling"
    >
      {isVisible ? (
        <CalendlyInlineWidget
          url={CALENDLY_URL}
          styles={{ minWidth: '100%', height: '630px' }}
        />
      ) : (
        <div className="w-full h-[630px] bg-surface border border-border rounded-xl animate-pulse" />
      )}
    </div>
  );
}

export default CalendlyWidget;
