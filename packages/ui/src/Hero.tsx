/**
 * FILE: Hero.tsx
 * PURPOSE: Provides the Hero component for prominent above-the-fold headline sections with highlighted title and primary/secondary CTAs.
 * ARCHITECTURE: Presentational server component composing Button (asChild with Link) and Container; renders a centered headline layout with display font.
 * KEY RULES: Must render CTAs only when their href is provided; must apply the Clash Display font to the h1; must highlight the optional highlightedTitle segment in accent color.
 * DEPENDS ON: react, next/link, ./Button, ./Container.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import React from "react";
import Link from "next/link";
import { Button } from "./Button";
import { Container } from "./Container";

export interface HeroProps {
  title: string;
  highlightedTitle?: string;
  description: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

/**
 * WHAT IT DOES: Renders a centered hero section with headline (with optional accent-highlighted segment), description, and up to two CTA buttons.
 * @param {HeroProps} props - Title, highlighted title, description, and optional primary/secondary CTA text and hrefs
 * @return {JSX.Element} - Rendered hero section
 * SIDE EFFECTS: None (pure rendering component).
 * ASSUMES: CTA hrefs point to valid internal routes when provided.
 */
export const Hero: React.FC<HeroProps> = ({
  title,
  highlightedTitle,
  description,
  primaryCtaText = "Get Started",
  primaryCtaHref,
  secondaryCtaText = "Explore Services",
  secondaryCtaHref,
}) => {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 bg-background text-text-primary">
      <Container className="relative z-10 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.15] font-display">
          {title}{" "}
          {highlightedTitle && (
            <span className="text-accent">{highlightedTitle}</span>
          )}
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto font-normal leading-relaxed">
          {description}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {primaryCtaHref && (
            <Button
              asChild
              variant="primary"
              className="w-full sm:w-auto px-8 py-3 text-base"
            >
              <Link href={primaryCtaHref}>{primaryCtaText}</Link>
            </Button>
          )}

          {secondaryCtaHref && (
            <Button
              asChild
              variant="secondary"
              className="w-full sm:w-auto px-8 py-3 text-base"
            >
              <Link href={secondaryCtaHref}>{secondaryCtaText}</Link>
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
};
