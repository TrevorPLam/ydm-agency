# YDM Agency - Agent Guidelines

## Project Overview
Monorepo for YDM Agency marketing firm website. Solo developer (Trevor Lam) using AI-augmented development.

## Tech Stack & Versions
- **Package Manager**: pnpm 9.15.0
- **Monorepo**: Turborepo 2.10.7
- **Framework**: Next.js 15.5.22
- **UI**: React 19.2.8
- **Language**: TypeScript 5.9.3 (strict mode enabled)
- **Styling**: Tailwind CSS 3.4.19
- **Components**: shadcn/ui (Radix primitives)
- **Theming**: next-themes (default dark mode)
- **Fonts**: Clash Display Variable via next/font/local (headings), Inter Variable via next/font/google (body)

## Project Structure
```
apps/
  firm-website/      # Main marketing site

packages/
  ui/                # shadcn/ui components (Button, Card, Header, Footer, CookieConsent, etc.)
  forms/             # ContactForm and Zod schemas
  analytics/         # AnalyticsProvider (GA4, PostHog, Meta Pixel), trackEvent
  seo/               # constructMetadata(), OrganizationJsonLd, ServiceJsonLd, FaqPageJsonLd
  email/             # React Email templates, Resend sending
  utils/             # cn(), formatCurrency(), formatDate()
  config/            # Shared ESLint, TS, Tailwind, Prettier configs
  # Orphaned (not wired into the dependency graph):
  branding/          # tokens object + tests (duplicates config/tailwind.js)
  design-system/     # broken fork of packages/ui, excluded from pnpm workspace
  web-core/          # format/env/layout/meta helpers, unused
```

App-specific shared components (e.g., `ServiceSubnav`, `AuditForm`, `CalendlyWidget`, `CalendlyEmbed`, `CalendlySection`, `PricingEstimator`) live in `apps/firm-website/src/components/`. App-specific configuration helpers (e.g., `faq-utils.ts`, `service-labels.ts`, `service-comparison-config.ts`, `pricing-config.ts`, `pricing-estimator.ts`, `industries-config.ts`, `audit-schema.ts`) live in `apps/firm-website/src/lib/`. Education-specific components (e.g., `TableOfContents`, `EducationAnalytics`, `SocialShare`, `PrintButton`) and education content files live in `apps/firm-website/src/app/education/` and `apps/firm-website/src/lib/education/`.

## Design System

### Color Palette
- **Background**: #0A0A0B
- **Surface**: #161618
- **Accent**: #3B82F6
- **Accent Hover**: #4B8AF2
- **Border**: #2A2A2E
- **Text Primary**: #F5F5F6
- **Text Secondary**: #A1A1A9
- **Error**: #F87171
- **Success**: #3B82F6 (aliased to accent)

### Typography
- **Headings**: Clash Display
- **Body**: Inter Variable
- Load via `next/font` (Inter from Google, Clash Display as local font)

### Layout
- **Max Content Width**: max-w-6xl (1152px)
- Use Container component from @ydm-agency/ui

### Components
- Use shadcn/ui components as base
- Customize with design system colors
- CookieConsent banner for analytics gating
- Scroll reveal and heavy animations are currently not implemented (`framer-motion` is not a dependency)

## Code Conventions

### TypeScript
- Strict mode enabled
- Use explicit return types for public functions
- Prefer interfaces over types for object shapes
- Use `const assertions` for literal types

### React
- Use functional components with hooks
- Server Components by default in Next.js 15
- Client Components only when needed (useState, useEffect, etc.)
- Use "use client" directive at top of file when needed

### Styling
- Use Tailwind utility classes
- Use cn() utility from @ydm-agency/utils for conditional classes
- Avoid inline styles
- Follow mobile-first responsive design

### File Naming
- Components: PascalCase (e.g., HeroSection.tsx)
- Utilities: camelCase (e.g., formatDate.ts)
- Pages: kebab-case (e.g., services/[slug]/page.tsx)

## Routing Structure (firm-website)
- `/` - Homepage
- `/services` - Services hub (9-card grid)
- `/services/[slug]` - Individual service pages (9 spokes)
- `/services/[slug]/deliverables` - Detailed deliverables / "What You Get" spoke pages
- `/services/[slug]/faq` - FAQ spoke pages with FAQPage JSON-LD
- `/services/process` - Process hub
- `/services/[slug]/process` - Process spoke pages
- `/services/compare` - Service comparison / "Which service is right?"
- `/services/pricing` - Service pricing and investment factors
- `/services/industries` - Industries hub
- `/services/industries/[slug]` - Industry-specific landing pages
- `/audit` - Free marketing audit request
- `/contact` - Contact form with Server Action, Supabase storage, Resend emails, Upstash rate limiting
- `/about` - Founder story
- `/blog` - Opinion and news
- `/blog/[slug]` - Individual blog posts
- `/education` - Technical lesson hub
- `/education/[topic]` - Topic-specific lesson listing
- `/education/[topic]/[slug]` - Individual lesson pages
- `/education/paths` - Learning paths hub
- `/education/paths/[slug]` - Individual learning path detail pages
- `/privacy` - Privacy policy

**Implemented in latest update**:
- `/services/[slug]/faq` - FAQ spoke pages for each service
- `/services/compare` - Service comparison and starting-point guide
- `/services/pricing` - Pricing and investment factors per service
- `/services/industries` and `/services/industries/[slug]` - Industries hub and industry-specific landing pages
- `/audit` - Free marketing audit request form and Server Action
- `/contact` - Contact form with Server Action, Supabase leads table storage, Resend emails, Upstash rate limiting, and Calendly integration
- `PricingEstimator` component with multi-step estimator and analytics tracking
- Education content expansion: 47 lessons across 5 topics (SEO, Conversion, Foundations, Strategy, Compliance) with topic-specific content files
- Learning paths feature: 4 cross-cutting learning paths with dedicated hub and detail pages
- Education lesson schema update: Added `learningOutcome` field to explicitly state lesson outcomes
- Education UI improvements: Table of contents, analytics tracking, social sharing, and print functionality

**Not Yet Implemented**:
- GA4 `form_submission` tracking (trackEvent exists but GA4 provider IDs are not configured)
- `next/image` optimization (no raster images currently in use) and Lighthouse CI

## Content Guidelines

### Voice & Tone
- Impersonal firm-level voice ("YDM Agency builds...")
- Never use "we/us/our"
- Professional, direct, benefit-focused

### Business Details
- **Email**: contact@ydmagency.com
- **Response Promise**: Instant auto-ack + personal reply within 2 hours on business days
- **Primary CTA**: "Get a Free Project Outline" → /contact
- **Secondary CTA**: "Explore Services" → /services
- **No phone number at launch**
- **No testimonials/fake social proof** - process pages build trust

## Security & Compliance

### Required Headers
Implement security headers in middleware:
- Content-Security-Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

### Contact Form Security
- Honeypot field for bot detection (implemented in ContactForm)
- Zod validation via `@ydm-agency/forms`
- Upstash Redis rate limiting (5/hr per IP) - implemented in `/contact` Server Action
- Server Actions for form submission - implemented in `/contact` and `/audit`
- GA4 `form_submission` event tracking - implemented in ContactForm component but requires GA4 provider IDs

### Privacy
- Cookie consent banner (gating analytics)
- Privacy policy page at /privacy
- No data collection without consent
- Analytics scripts are blocked by the current CSP when consent is granted

## Backend Integration

### Contact Form (Implemented)
- Next.js Server Action in `apps/firm-website/src/app/contact/actions.ts`
- Supabase `leads` table storage (name, email, project_type, message, source, status, timestamp)
- Resend transactional emails (auto-acknowledgment + internal notification)
- Zod validation via @ydm-agency/forms
- Upstash Redis rate limiting (5 submissions per hour per IP)
- Calendly integration via react-calendly with lazy loading

**Current State**: ContactForm component exists in `@ydm-agency/forms` with honeypot and Zod validation. `sendEmail` exists in `@ydm-agency/email` and is used by both `/contact` and `/audit` Server Actions. The `/contact` route is fully implemented with form, Server Action, and Calendly integration.

**Required Environment Variables**:
- `SUPABASE_URL` and `SUPABASE_ANON_KEY` for Supabase leads table storage
- `RESEND_API_KEY` for Resend email sending
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` for Upstash rate limiting
- `NEXT_PUBLIC_CALENDLY_URL` for custom Calendly scheduling URL (optional, has default)

### Analytics
- GA4, PostHog, Meta Pixel via @ydm-agency/analytics
- trackEvent() function for custom events
- Cookie consent gating required

**Current State**: AnalyticsProvider exists and is consent-gated, but provider IDs are empty strings in `apps/firm-website/src/app/providers.tsx`. The current CSP does not allow the inline `dangerouslySetInnerHTML` scripts or PostHog/Meta Pixel hosts, so scripts will be blocked even after IDs are configured.

## Testing Requirements
- Unit tests for utility functions (`@ydm-agency/ui`, `@ydm-agency/forms`, and `@ydm-agency/utils` have tests)
- Integration tests for forms
- E2E tests for critical user flows (contact form, navigation, cookie consent)
- Use Playwright for E2E

**Current State**: Unit tests exist for `@ydm-agency/ui`, `@ydm-agency/forms`, and `@ydm-agency/utils` (`cn`, `formatCurrency`, `formatDate`). `apps/firm-website/src/lib/` has Vitest suites for `audit-schema`, `contrast`, `industries-config`, and `pricing-estimator`. `@ydm-agency/analytics`, `@ydm-agency/email`, and `@ydm-agency/seo` are untested. E2E tests not yet implemented (`e2e/` directory is empty). The `/contact` form is now implemented and should be included in E2E test coverage.

## Git Workflow
- Feature branches from main
- Commit format: `T-XXX: [task title]` for TODO tasks
- Push to main after task completion
- No force pushing

## Performance
- Optimize images with Next.js Image component (currently no `next/image` or `<img>` usage in `apps/firm-website`)
- Use dynamic imports for heavy components (`next/dynamic` is used to lazy-load the Calendly embed in `CalendlyWidget.tsx` and `CalendlySection.tsx`)
- Implement code splitting
- Lighthouse score targets: 90+ Performance, 95+ Accessibility (no Lighthouse CI step configured)

## Dependencies
- Use pnpm for package management
- Workspace catalog centralizes shared versions in `pnpm-workspace.yaml`
- Check for security vulnerabilities regularly
- Keep dependencies up to date
- Prefer peer dependencies where appropriate

## Deployment
- Deploy via Vercel (recommended for Next.js)
- Environment variables for secrets (Supabase, Resend, Upstash)
- Build with Turborepo
- Enable CI/CD via GitHub Actions
