/**
 * FILE: index.ts
 * PURPOSE: Public barrel export for the design-system package.
 * ARCHITECTURE: Re-exports components, utilities, and their prop interfaces.
 * KEY RULES: This package is an orphaned/broken fork of packages/ui and is excluded from the pnpm workspace; do not modify the duplicated blocks.
 * DEPENDS ON: ./Badge, ./Button, ./Card, ./Container, ./CookieConsent, ./CookieConsentContext, ./CookieSettingsButton, ./Features, ./Footer, ./Hero, ./Pricing, ./ThemeToggle, ./cn.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

export { Button, buttonVariants, type ButtonProps } from './Button';
export { Card, type CardProps } from './Card';
export { Container, type ContainerProps } from './Container';
export { Badge, type BadgeProps } from './Badge';
export { Hero, type HeroProps } from './Hero';
export { Features, type FeaturesProps, type FeatureItem } from './Features';

export { Footer, type FooterProps } from './Footer';
export { Pricing, type PricingProps, type PricingPlan } from './Pricing';
export { ThemeToggle } from './ThemeToggle';
export { CookieSettingsButton } from './CookieSettingsButton';
export { CookieConsent } from './CookieConsent';
export { CookieConsentProvider } from './CookieConsentContext';
export { useConsent } from './CookieConsentContext';

export { cn } from './cn';
export { Button, buttonVariants, type ButtonProps } from './Button';
export { Card, type CardProps } from './Card';
export { Container, type ContainerProps } from './Container';
export { Badge, type BadgeProps } from './Badge';
export { Hero, type HeroProps } from './Hero';
export { Features, type FeaturesProps, type FeatureItem } from './Features';

export { Footer, type FooterProps } from './Footer';
export { Pricing, type PricingProps, type PricingPlan } from './Pricing';
export { ThemeToggle } from './ThemeToggle';
export { CookieSettingsButton } from './CookieSettingsButton';
export { CookieConsent } from './CookieConsent';
export { CookieConsentProvider } from './CookieConsentContext';
export { useConsent } from './CookieConsentContext';
