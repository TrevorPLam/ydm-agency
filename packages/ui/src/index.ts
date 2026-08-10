/**
 * FILE: index.ts
 * PURPOSE: Public API barrel exports for the @ydm-agency/ui package, exposing all design-system components, their props, and cookie-consent primitives.
 * ARCHITECTURE: Re-exports presentational components (Button, Card family, Container, Badge, Hero, Features, Header, Footer, Pricing, ThemeToggle) and cookie-consent primitives (CookieConsent, CookieConsentProvider, useConsent, CookieSettingsButton).
 * KEY RULES: Maintain backward compatibility; export all public components and their prop types; keep the API surface consistent.
 * DEPENDS ON: ./Button, ./Card, ./Container, ./Badge, ./Hero, ./Features, ./Header, ./Footer, ./Pricing, ./ThemeToggle, ./CookieSettingsButton, ./CookieConsent, ./CookieConsentContext.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
export { Button, buttonVariants, type ButtonProps } from './Button';
export { Card, type CardProps } from './Card';
export {
  CardHeader,
  type CardHeaderProps,
  CardTitle,
  type CardTitleProps,
  CardDescription,
  type CardDescriptionProps,
  CardContent,
  type CardContentProps,
  CardFooter,
  type CardFooterProps,
} from './Card';
export { Container, type ContainerProps } from './Container';
export { Badge, type BadgeProps } from './Badge';
export { Hero, type HeroProps } from './Hero';
export { Features, type FeaturesProps, type FeatureItem } from './Features';
export { Header, type HeaderProps } from './Header';
export { Footer, type FooterProps } from './Footer';
export { Pricing, type PricingProps, type PricingPlan } from './Pricing';
export { ThemeToggle } from './ThemeToggle';
export { CookieSettingsButton } from './CookieSettingsButton';
export { CookieConsent } from './CookieConsent';
export { CookieConsentProvider } from './CookieConsentContext';
export { useConsent } from './CookieConsentContext';
