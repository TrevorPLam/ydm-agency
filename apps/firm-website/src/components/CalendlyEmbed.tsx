/**
 * FILE: CalendlyEmbed.tsx
 * PURPOSE: Provides the CalendlyEmbed client component that lazily renders the Calendly inline scheduling widget only when it scrolls into view.
 * ARCHITECTURE: Client component using an IntersectionObserver to defer mounting the react-calendly InlineWidget until the container is near the viewport, showing a pulse placeholder until then; reads the Calendly URL from NEXT_PUBLIC_CALENDLY_URL.
 * KEY RULES: Must not render the widget when NEXT_PUBLIC_CALENDLY_URL is unset (returns null); must defer widget mount until intersection to protect initial page performance; must disconnect the observer after first intersection.
 * DEPENDS ON: react, react-calendly (InlineWidget), NEXT_PUBLIC_CALENDLY_URL env var.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { InlineWidget } from 'react-calendly';

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL;

/**
 * WHAT IT DOES: Renders the Calendly inline widget lazily once the container scrolls into view, or null when no Calendly URL is configured.
 * @return {JSX.Element | null} - Calendly inline widget, a pulse placeholder, or null
 * SIDE EFFECTS: Creates and disconnects an IntersectionObserver; sets visible state on intersection.
 * ASSUMES: NEXT_PUBLIC_CALENDLY_URL, when set, is a valid Calendly scheduling URL.
 */
export function CalendlyEmbed() {
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
    <div ref={containerRef} className="min-h-[630px]">
      {isVisible ? (
        <InlineWidget url={CALENDLY_URL} styles={{ minWidth: '100%', height: '630px' }} />
      ) : (
        <div className="w-full h-[630px] bg-surface border border-border rounded-xl animate-pulse" />
      )}
    </div>
  );
}
