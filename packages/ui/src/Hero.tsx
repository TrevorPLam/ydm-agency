'use client';

import React from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { Container } from './Container';

export interface HeroProps {
  badgeText?: string;
  title: string;
  highlightedTitle?: string;
  description: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  badgeText,
  title,
  highlightedTitle,
  description,
  primaryCtaText = 'Get Started',
  primaryCtaHref,
  secondaryCtaText = 'View Live Demos',
  secondaryCtaHref,
  onPrimaryClick,
  onSecondaryClick,
}) => {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />
      <Container className="relative z-10 text-center">
        {badgeText && (
          <div className="flex justify-center mb-6">
            <Badge variant="accent">{badgeText}</Badge>
          </div>
        )}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.15]">
          {title}{' '}
          {highlightedTitle && (
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              {highlightedTitle}
            </span>
          )}
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          {description}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {primaryCtaHref ? (
            <a href={primaryCtaHref}>
              <Button variant="primary" className="w-full sm:w-auto px-8 py-3 text-base">
                {primaryCtaText}
              </Button>
            </a>
          ) : (
            <Button
              variant="primary"
              onClick={onPrimaryClick}
              className="w-full sm:w-auto px-8 py-3 text-base"
            >
              {primaryCtaText}
            </Button>
          )}

          {secondaryCtaHref ? (
            <a href={secondaryCtaHref}>
              <Button variant="secondary" className="w-full sm:w-auto px-8 py-3 text-base bg-slate-800 text-slate-100 hover:bg-slate-700">
                {secondaryCtaText}
              </Button>
            </a>
          ) : (
            <Button
              variant="secondary"
              onClick={onSecondaryClick}
              className="w-full sm:w-auto px-8 py-3 text-base bg-slate-800 text-slate-100 hover:bg-slate-700"
            >
              {secondaryCtaText}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
};
