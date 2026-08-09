import React from "react";
import Link from "next/link";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { Container } from "./Container";

export interface HeroProps {
  badgeText?: string;
  title: string;
  highlightedTitle?: string;
  description: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export const Hero: React.FC<HeroProps> = ({
  badgeText,
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
        {badgeText && (
          <div className="flex justify-center mb-6">
            <Badge variant="accent">{badgeText}</Badge>
          </div>
        )}
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
