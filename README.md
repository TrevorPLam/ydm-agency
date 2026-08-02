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
│   ├── forms/                # Zod schemas, ContactForm, LeadForm (@ydm-agency/forms)
│   ├── seo/                  # OpenGraph generators, JSON-LD Schema.org, metadata helpers (@ydm-agency/seo)
│   ├── analytics/            # Unified GA4, PostHog, Meta Pixel event tracking (@ydm-agency/analytics)
│   ├── email/                # React Email templates, Resend sending (@ydm-agency/email)
│   ├── config/               # Shared ESLint, TypeScript, Tailwind CSS, Prettier, Next.js configs
│   └── utils/                # Class joiner (`cn`), date, and currency helpers
├── e2e/                      # Playwright end-to-end tests (currently empty)
├── docs/
│   └── planning/             # Page specs and launch protocol
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
- `<LeadForm />` - Lead capture form with instant validation & analytics tracking
- `contactFormSchema` - Zod schema for contact submissions
- `leadCaptureSchema` - Zod schema for lead capture

### `@ydm-agency/seo`
SEO meta tag generation and Schema.org structured data:
- `constructMetadata()` - Universal Next.js Metadata helper
- `<OrganizationJsonLd />` - Structured JSON-LD schema generator
- `<FaqPageJsonLd />` - FAQPage schema generator for service FAQ spokes

### `@ydm-agency/analytics`
Consent-gated analytics loading and event tracking:
- `<AnalyticsProvider />` - Async GA4, PostHog, and Meta Pixel scripts (consent-gated)
- `trackEvent()` - Universal analytics event dispatcher

### `@ydm-agency/utils`
Shared TypeScript helpers:
- `cn()` - `clsx` + `tailwind-merge` class name utility
- `formatCurrency()`, `formatDate()` (currently unused in routes)

**Note**: No unit tests exist for this package yet.

### `@ydm-agency/email`
React Email templates and Resend-based sending:
- `<AcknowledgmentEmail />` - Auto-acknowledgment template for form submissions
- `<NotificationEmail />` - Internal lead-notification template
- `sendEmail()` - Resend wrapper for sending transactional emails

**Note**: `sendEmail()` is consumed by the `/audit` Server Action. It is not yet wired to a `/contact` route.

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
- `/audit` - Free marketing audit request
- `/about` - Founder story
- `/blog` - Opinion and news
- `/blog/[slug]` - Individual blog posts
- `/education` - Technical lesson hub
- `/education/[topic]` - Topic-specific lesson listing
- `/education/[topic]/[slug]` - Individual lesson pages
- `/privacy` - Privacy policy
- `/sitemap.xml` - Generated sitemap
- `/robots.txt` - Robots directives

Content for services, education, and blog is managed in:
- `apps/firm-website/src/lib/services-config.ts` — service copy, process phases, deliverables, and cross-service links
- `apps/firm-website/src/lib/faq-utils.ts` — FAQ grouping and answer-engine question helpers
- `apps/firm-website/src/lib/service-labels.ts` — short service names for comparison/pricing pages
- `apps/firm-website/src/lib/service-comparison-config.ts` — `/services/compare` scenario and fit matrix data
- `apps/firm-website/src/lib/pricing-config.ts` — `/services/pricing` starting ranges and extras
- `apps/firm-website/src/lib/audit-schema.ts` — Zod schema for the audit form
- `apps/firm-website/src/lib/education-config.ts`
- `apps/firm-website/src/lib/blog-config.ts`

**Not Yet Implemented**:
- `/contact` - Contact form (ContactForm exists in @ydm-agency/forms but no route or Server Action)
- `/demos` - Referenced from /about but not implemented
- Supabase `leads` table storage integration
- Upstash Redis rate limiting (5/hr per IP)
- GA4 `form_submission` event tracking
- Analytics provider IDs (currently empty strings in `providers.tsx`)
- CSP updates required for PostHog/Meta Pixel inline scripts
- `next/image` optimization (no raster images in use)
- `next/dynamic` code splitting
- Lighthouse CI

**Testing**:
- Unit tests exist for `@ydm-agency/ui` and `@ydm-agency/forms`
- `@ydm-agency/utils`, `@ydm-agency/analytics`, `@ydm-agency/email`, and `@ydm-agency/seo` are untested
- E2E tests not yet implemented (`e2e/` directory is empty)
- Playwright config exists at the repo root

## Environment Variables

Copy `.env.example` to `.env.local` and populate the required values:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_META_PIXEL_ID`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `NEXT_PUBLIC_CALENDLY_URL`

`RESEND_API_KEY` is consumed by the `/audit` Server Action; analytics, Supabase, Upstash, and Calendly wiring are not yet implemented.

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
