# YDM Agency Monorepo

Enterprise marketing monorepo for YDM Agency containing the agency's primary web platform and shared packages.

## Monorepo Architecture

- **Package Manager**: `pnpm 9.15.0` with Workspace Catalogs (`pnpm-workspace.yaml`)
- **Build Orchestration**: `Turborepo 2.10.7` topological pipeline with remote build caching
- **Web Framework**: `Next.js 15.5.22` (App Router)
- **UI**: `React 19.2.8`
- **Styling**: `Tailwind CSS 3.4.19` with shared design tokens
- **Type Safety**: `TypeScript 5.9.3` strict mode across all packages

## Directory Layout

```
ydm-agency/
├── apps/
│   └── firm-website/         # Primary agency site (ydm-agency.com)
├── packages/
│   ├── ui/                   # Shared React components (Hero, Header, Footer, Card, Button, Badge, Container, CookieConsent)
│   ├── forms/                # Zod schemas and ContactForm (@ydm-agency/forms)
│   ├── seo/                  # OpenGraph generators, JSON-LD Schema.org, metadata helpers (@ydm-agency/seo)
│   ├── analytics/            # Unified GA4, PostHog, Meta Pixel event tracking (@ydm-agency/analytics)
│   ├── email/                # React Email templates, Resend sending (@ydm-agency/email)
│   ├── config/               # Shared ESLint, TypeScript, Tailwind CSS, Prettier, Next.js configs
│   ├── utils/                # Class joiner (`cn`), date, and currency helpers
│   # Orphaned (not wired into the dependency graph):
│   ├── branding/             # Design tokens (duplicates config/tailwind.js); has tests
│   ├── design-system/        # Broken fork of packages/ui; excluded from pnpm workspace
│   └── web-core/             # format/env/layout/meta helpers; unused
├── e2e/                      # Playwright end-to-end tests (currently empty)
├── docs/
│   └── archive/planning/     # Archived page specs and launch protocol
├── turbo/
│   └── generators/           # App & package scaffolding generators
├── pnpm-workspace.yaml       # Workspace definition & catalog dependency alignment
├── turbo.json                # Turborepo task pipeline rules
├── playwright.config.ts      # Playwright E2E configuration
└── package.json              # Root package.json
```

## Shared Packages

### `@ydm-agency/ui`
Shared React component library built on shadcn/ui patterns:
- `<Hero />`, `<Header />`, `<Footer />`, `<Card />`, `<Button />`, `<Badge />`, `<Container />`
- `<Features />`, `<Pricing />` (defined but not currently used)
- `<ThemeToggle />`, `<CookieConsent />`, `<CookieConsentProvider />`, `<useConsent />`, `<CookieSettingsButton />`

### `@ydm-agency/forms`
Form components and Zod validation schemas:
- `<ContactForm />` - Contact form with honeypot bot detection and Zod validation
- `contactFormSchema` - Zod schema for contact submissions

### `@ydm-agency/seo`
SEO meta tag generation and Schema.org structured data:
- `constructMetadata()` - Universal Next.js Metadata helper
- `<OrganizationJsonLd />` - Structured JSON-LD schema generator
- `<ServiceJsonLd />` - Service schema generator for service pages
- `<FaqPageJsonLd />` - FAQPage schema generator for service FAQ spokes

### `@ydm-agency/analytics`
Consent-gated analytics loading and event tracking:
- `<AnalyticsProvider />` - Async GA4, PostHog, and Meta Pixel scripts (consent-gated)
- `trackEvent()` - Universal analytics event dispatcher

### `@ydm-agency/utils`
Shared TypeScript helpers:
- `cn()` - `clsx` + `tailwind-merge` class name utility
- `formatCurrency()`, `formatDate()` (currently unused in routes)

Unit tests exist for `cn`, `formatCurrency`, and `formatDate`.

### `@ydm-agency/email`
React Email templates and Resend-based sending:
- `<AcknowledgmentEmail />` - Auto-acknowledgment template for form submissions
- `<NotificationEmail />` - Internal lead-notification template
- `sendEmail()` - Resend wrapper for sending transactional emails

**Note**: `sendEmail()` is consumed by both the `/contact` and `/audit` Server Actions.

## Security Headers

Next.js Middleware in `apps/firm-website/src/middleware.ts` applies the following security headers to every request:

- Content-Security-Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

## Implementation Status

**Implemented Routes**:
- `/` - Homepage
- `/services` - Services hub (9-card grid)
- `/services/[slug]` - Individual service pages (9 spokes)
- `/services/[slug]/process` - Process spoke pages
- `/services/[slug]/deliverables` - Detailed deliverables / "What You Get" spoke pages
- `/services/[slug]/faq` - FAQ spoke pages
- `/services/process` - Process hub
- `/services/compare` - Service comparison / "Which service is right?"
- `/services/pricing` - Pricing and investment factors
- `/services/industries` - Industries hub
- `/services/industries/[slug]` - Industry-specific landing pages
- `/audit` - Free marketing audit request
- `/contact` - Contact form with Server Action, Supabase storage, Resend emails, Upstash rate limiting, and Calendly integration
- `/about` - Founder story
- `/blog` - Opinion and news
- `/blog/[slug]` - Individual blog posts
- `/education` - Technical lesson hub
- `/education/[topic]` - Topic-specific lesson listing
- `/education/[topic]/[slug]` - Individual lesson pages
- `/education/paths` - Learning paths hub
- `/education/paths/[slug]` - Individual learning path detail pages
- `/privacy` - Privacy policy
- `/sitemap.xml` - Generated sitemap
- `/robots.txt` - Robots directives

Content for services, education, and blog is managed in:
- `apps/firm-website/src/lib/services-config.ts` — service copy, process phases, deliverables, and cross-service links
- `apps/firm-website/src/lib/faq-utils.ts` — FAQ grouping and answer-engine question helpers
- `apps/firm-website/src/lib/service-labels.ts` — short service names for comparison/pricing pages
- `apps/firm-website/src/lib/service-comparison-config.ts` — `/services/compare` scenario and fit matrix data
- `apps/firm-website/src/lib/pricing-config.ts` — `/services/pricing` starting ranges and extras
- `apps/firm-website/src/lib/pricing-estimator.ts` — Pricing estimator logic for the `PricingEstimator` component
- `apps/firm-website/src/lib/industries-config.ts` — `/services/industries` hub and industry-specific page data
- `apps/firm-website/src/lib/audit-schema.ts` — Zod schema for the audit form
- `apps/firm-website/src/lib/education-config.ts` — education configuration that imports from topic-specific files
- `apps/firm-website/src/lib/education/` — topic-specific lesson files (seo-lessons.ts, conversion-lessons.ts, foundations-lessons.ts, strategy-lessons.ts, compliance-lessons.ts, learning-paths.ts, types.ts)
- `apps/firm-website/src/lib/blog-config.ts`

App-specific components:
- `apps/firm-website/src/components/ServiceSubnav.tsx` — Navigation tabs for service spoke pages
- `apps/firm-website/src/components/AuditForm.tsx` — Audit form component
- `apps/firm-website/src/components/CalendlyWidget.tsx` — Calendly scheduling widget with lazy loading
- `apps/firm-website/src/components/CalendlyEmbed.tsx` — Lazy-loaded Calendly embed used by `CalendlyWidget` and `CalendlySection`
- `apps/firm-website/src/components/CalendlySection.tsx` — Page section wrapper around the Calendly embed
- `apps/firm-website/src/components/PricingEstimator.tsx` — Multi-step pricing estimator with analytics tracking

**Not Yet Implemented**:
- GA4 `form_submission` event tracking (trackEvent exists but GA4 provider IDs are not configured)
- Analytics provider IDs (currently empty strings in `providers.tsx`)
- CSP updates required for PostHog/Meta Pixel inline scripts
- `next/image` optimization (no raster images in use)
- `next/dynamic` code splitting
- Lighthouse CI

**Testing**:
- Unit tests exist for `@ydm-agency/ui`, `@ydm-agency/forms`, and `@ydm-agency/utils` (`cn`, `formatCurrency`, `formatDate`)
- `apps/firm-website/src/lib/` has Vitest suites for `audit-schema`, `contrast`, `industries-config`, and `pricing-estimator`
- `@ydm-agency/analytics`, `@ydm-agency/email`, and `@ydm-agency/seo` are untested
- E2E tests not yet implemented (`e2e/` directory is empty) - should include contact form, navigation, and cookie consent flows
- Playwright config exists at the repo root

## Environment Variables

Copy `.env.example` to `.env.local` and populate the required values:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - GA4 measurement ID
- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog API key
- `NEXT_PUBLIC_META_PIXEL_ID` - Meta Pixel ID
- `RESEND_API_KEY` - Resend API key for email sending (used by `/contact` and `/audit`)
- `SUPABASE_URL` - Supabase project URL for leads table storage
- `SUPABASE_ANON_KEY` - Supabase anonymous key for leads table access
- `UPSTASH_REDIS_REST_URL` - Upstash Redis REST URL for rate limiting
- `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis REST token for rate limiting
- `NEXT_PUBLIC_CALENDLY_URL` - Calendly scheduling URL (optional, defaults to https://calendly.com/ydm-agency/project-consultation)

**Current Usage**:
- `RESEND_API_KEY` is consumed by the `/contact` and `/audit` Server Actions
- `SUPABASE_URL` and `SUPABASE_ANON_KEY` are used by the `/contact` Server Action for leads table storage
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are used by the `/contact` Server Action for rate limiting
- `NEXT_PUBLIC_CALENDLY_URL` is used by the `/contact` page for Calendly integration
- Analytics provider IDs are not yet configured in `providers.tsx`

## CI / CD

GitHub Actions (`.github/workflows/ci.yml`) runs on every `push` to `main` and every `pull_request`:

1. **lint** - `pnpm turbo run lint`
2. **typecheck** - `pnpm turbo run typecheck`
3. **build** - `pnpm turbo run build`
4. **e2e** - `pnpm playwright install --with-deps chromium` then `pnpm playwright test`

The `test` Turbo task is not currently run in CI.

## Getting Started

### Prerequisites
- Node.js >= 22.0.0
- pnpm >= 9.0.0

### Installation & Development
```bash
# Install dependencies
pnpm install

# Run all applications in dev mode
pnpm dev

# Type check all packages and apps
pnpm typecheck

# Build all applications for production
pnpm build

# Run unit tests
pnpm test
```


## License

Private — YDM Agency. All rights reserved.
