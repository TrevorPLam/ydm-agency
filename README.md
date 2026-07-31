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
│   ├── config/               # Shared ESLint, TypeScript, Tailwind CSS configs
│   └── utils/                # Class joiner (`cn`), date, currency, and URL helpers
├── turbo/
│   └── generators/           # App & package scaffolding generators
├── pnpm-workspace.yaml       # Workspace definition & catalog dependency alignment
├── turbo.json                # Turborepo task pipeline rules
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

### `@ydm-agency/analytics`
Consent-gated analytics loading and event tracking:
- `<AnalyticsProvider />` - Async GA4, PostHog, and Meta Pixel scripts (consent-gated)
- `trackEvent()` - Universal analytics event dispatcher

### `@ydm-agency/utils`
Shared TypeScript helpers:
- `cn()` - `clsx` + `tailwind-merge` class name utility
- `formatCurrency()`, `formatDate()` (currently unused)

### `@ydm-agency/email`
React Email templates and Resend-based sending:
- `<AcknowledgmentEmail />` - Auto-acknowledgment template for form submissions
- `<NotificationEmail />` - Internal lead-notification template
- `sendEmail()` - Resend wrapper for sending transactional emails

**Note**: Email package exists but is not yet wired to a Server Action or route.

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
- `/services/process` - Process hub
- `/services/[slug]/process` - Process spoke pages
- `/about` - Founder story
- `/blog` - Opinion and news
- `/education` - Technical lesson hub
- `/education/[slug]` - Individual lesson pages
- `/privacy` - Privacy policy

Education and blog content is managed in `apps/firm-website/src/lib/education-config.ts` and `apps/firm-website/src/lib/blog-config.ts`.

**Not Yet Implemented**:
- `/contact` - Contact form (ContactForm exists in @ydm-agency/forms but no route)
- `/demos` - Referenced from /about but not implemented
- Server Actions for form submission
- Supabase lead storage integration
- Upstash Redis rate limiting
- Analytics provider IDs (currently empty strings)

**Testing**:
- Unit tests exist for @ydm-agency/ui and @ydm-agency/forms
- E2E tests not yet implemented (e2e/ directory is empty)

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
```


## License

Private — YDM Agency. All rights reserved.
