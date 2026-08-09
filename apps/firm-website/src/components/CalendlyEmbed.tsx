'use client';

import React, { useEffect, useRef, useState } from 'react';
import { InlineWidget } from 'react-calendly';

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL;

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
