# YDM Agency — Repo Map

A structural map of the YDM Agency monorepo. Generated from a snapshot of the repository tree, package manifests, and cross-package imports.

## Root Layout

```
ydm-agency/
├── .devin/                  # Devin agent config + workflows
├── .github/workflows/       # GitHub Actions CI (ci.yml)
├── .turbo/                  # Turbo cache (generated)
├── apps/                    # Deployable applications
│   └── firm-website/        # Main marketing site (Next.js 15)
├── coverage/                # Vitest coverage output (generated)
├── docs/                    # Project documentation
├── e2e/                     # Playwright E2E tests (placeholder only)
├── node_modules/            # pnpm install output (generated)
├── packages/                # Shared workspace packages
│   ├── analytics/           # GA4 / PostHog / Meta Pixel provider
│   ├── branding/            # [ORPHANED] design tokens
│   ├── config/              # Shared ESLint / TS / Tailwind / Prettier configs
│   ├── design-system/       # [ORPHANED, excluded from workspace] broken fork of ui
│   ├── email/               # React Email templates + Resend sender
│   ├── forms/               # ContactForm, LeadForm + Zod schemas
│   ├── seo/                 # constructMetadata + JSON-LD components
│   ├── ui/                  # shadcn/ui-based component library
│   ├── utils/               # cn(), formatCurrency(), formatDate()
│   └── web-core/            # [ORPHANED] format/env/layout/meta helpers
├── playwright-report/       # Playwright HTML report (generated)
├── turbo/generators/        # Turborepo `new-app` generator (templates missing)
├── .env.example             # Env var template (GA4, PostHog, Meta, Resend, Supabase, Upstash, Calendly)
├── .gitignore
├── AGENTS.md                # Agent guidelines (tech stack, conventions, routing, security)
├── README.md                # Monorepo overview + quick start
├── TODO.md                  # Completed T-001..T-020 task log (Vitest setup, unit tests)
├── TASKS.md                 # Pending implementation tasks derived from recommendations.md
├── analysis.md              # Comprehensive codebase analysis (~1141 lines)
├── recommendations.md       # Master recommendations: global principles, page copy, add-ons
├── services-copy.md         # Services copy documentation (hub, comparison, pricing, process, industries)
├── package.json             # Root scripts (dev, build, test, lint, typecheck, clean, format) + shared devDeps
├── turbo.json               # Turborepo task pipeline + caching rules
├── pnpm-workspace.yaml      # Workspace globs (apps/*, packages/* minus design-system) + catalog
├── pnpm-lock.yaml
├── playwright.config.ts     # Playwright config (Chromium, baseURL localhost:3000, turbo dev server)
├── vitest.config.ts         # Root Vitest config (jsdom, v8 coverage, workspace aliases)
└── vitest.setup.ts          # jest-dom, jest-axe, next/* mocks
```

## apps/firm-website

The single deployable Next.js 15 application. Package name `@ydm-agency/firm-website`.

### Dependencies (workspace)
`@ydm-agency/analytics`, `@ydm-agency/email`, `@ydm-agency/forms`, `@ydm-agency/seo`, `@ydm-agency/ui`, `@ydm-agency/utils` (dev: `@ydm-agency/config`).

### Notable external deps
`@supabase/supabase-js`, `@upstash/ratelimit`, `@upstash/redis`, `react-calendly`, `react-hook-form`, `@hookform/resolvers`, `zod`, `lucide-react`, `next`, `next-themes`, `react`, `react-dom`.

### src/app — Routes

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Homepage |
| — | `app/layout.tsx` | Root layout (theme, cookie consent, analytics providers, fonts) |
| — | `app/providers.tsx` | Theme, cookie consent, and analytics provider wrapper |
| — | `app/globals.css` | Tailwind directives + CSS variables |
| — | `app/robots.ts` | robots.txt |
| — | `app/sitemap.ts` | Dynamic sitemap |
| `/about` | `app/about/page.tsx` | Founder story |
| `/audit` | `app/audit/page.tsx` + `actions.ts` | Free audit request form + Server Action |
| `/blog` | `app/blog/page.tsx` | Blog listing |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Individual post |
| `/contact` | `app/contact/page.tsx` + `actions.ts` | Contact form + Server Action (Supabase, Resend, Upstash); Calendly embed on page |
| `/education` | `app/education/page.tsx` | Education hub |
| `/education/[topic]` | `app/education/[topic]/page.tsx` + `TopicContent.tsx` | Topic lesson listing |
| `/education/[topic]/[slug]` | `app/education/[topic]/[slug]/page.tsx` | Individual lesson |
| `/education/paths` | `app/education/paths/page.tsx` | Learning paths hub |
| `/education/paths/[slug]` | `app/education/paths/[slug]/page.tsx` | Learning path detail |
| — | `app/education/*` | `EducationSearch.tsx`, `LessonFilter.tsx`, `TableOfContents.tsx`, `EducationAnalytics.tsx`, `SocialShare.tsx`, `PrintButton.tsx`, `search-actions.ts`, `print.css` |
| `/privacy` | `app/privacy/page.tsx` | Privacy policy |
| `/services` | `app/services/page.tsx` + `layout.tsx` | Services hub (8-card grid) |
| `/services/[slug]` | `app/services/[slug]/page.tsx` | Individual service page |
| `/services/[slug]/deliverables` | `app/services/[slug]/deliverables/page.tsx` | Deliverables spoke |
| `/services/[slug]/faq` | `app/services/[slug]/faq/page.tsx` | FAQ spoke (FAQPage JSON-LD) |
| `/services/[slug]/process` | `app/services/[slug]/process/page.tsx` | Process spoke |
| `/services/process` | `app/services/process/page.tsx` | Process hub |
| `/services/compare` | `app/services/compare/page.tsx` | Service comparison |
| `/services/pricing` | `app/services/pricing/page.tsx` | Pricing + investment factors |
| `/services/industries` | `app/services/industries/page.tsx` | Industries hub |
| `/services/industries/[slug]` | `app/services/industries/[slug]/page.tsx` | Industry landing page |

### src/components
- `ServiceSubnav.tsx` — service section navigation
- `AuditForm.tsx` — audit request form
- `CalendlyWidget.tsx` — Calendly widget (lazy-loaded)
- `CalendlySection.tsx` — Calendly embed section
- `CalendlyEmbed.tsx` — Calendly embed wrapper
- `PricingEstimator.tsx` — multi-step pricing estimator

### src/lib
- `services-config.ts`, `service-labels.ts`, `service-comparison-config.ts`
- `pricing-config.ts`, `pricing-estimator.ts` (+ `.test.ts`)
- `industries-config.ts` (+ `.test.ts`)
- `faq-utils.ts`
- `audit-schema.ts` (+ `.test.ts`)
- `blog-config.ts`, `education-config.ts`
- `contrast.test.ts` — color contrast accessibility tests

### src/lib/education
- `types.ts`, `learning-paths.ts`
- Per-topic lesson files (original + `-new` variants): `seo-lessons{,-new}.ts`, `conversion-lessons{,-new}.ts`, `foundations-lessons{,-new}.ts`, `strategy-lessons{,-new}.ts`, `compliance-lessons{,-new}.ts`

### Other
- `src/middleware.ts` — Next.js middleware (security headers per AGENTS.md)
- `public/fonts/ClashDisplay-Variable.woff2` — local display font
- `public/noise.svg` — background texture asset

## packages/

### Active packages

#### @ydm-agency/analytics
- **Exports**: `AnalyticsProvider`, `trackEvent`
- **Deps**: `@ydm-agency/ui`
- **Files**: `src/Analytics.tsx`, `src/events.ts`, `src/index.ts`

#### @ydm-agency/config
- **Role**: Shared dev configuration (no runtime deps)
- **Files**: `eslint-next.js`, `eslint-react.js`, `eslint-ui.config.mjs`, `nextjs.js`, `prettier.js`, `tailwind.js`, `tsconfig.base.json`

#### @ydm-agency/email
- **Exports**: `sendEmail`, `AcknowledgmentEmail`, `NotificationEmail`
- **Deps**: `resend`, `@react-email/components`, `@react-email/render`
- **Files**: `src/index.ts`, `src/AcknowledgmentEmail.tsx`, `src/NotificationEmail.tsx`

#### @ydm-agency/forms
- **Exports**: `LeadForm`, `ContactForm`, `leadCaptureSchema`, `contactFormSchema`
- **Deps**: `@ydm-agency/ui`, `@ydm-agency/analytics`, `zod`, `react-hook-form`, `@hookform/resolvers`
- **Files**: `src/index.ts`, `src/LeadForm.tsx`, `src/ContactForm.tsx`, `src/schemas.ts`, `src/schemas/{contact,lead}-schema.ts` (+ tests), `src/__tests__/`

#### @ydm-agency/seo
- **Exports**: `constructMetadata`, `OrganizationJsonLd`, `ServiceJsonLd`, `FaqPageJsonLd`
- **Deps**: `next`, `react`
- **Files**: `src/index.ts`, `src/constructMetadata.ts`, `src/JsonLd.tsx`, `src/FaqPageJsonLd.tsx`

#### @ydm-agency/ui
- **Exports**: `Button`, `Card`, `Container`, `Badge`, `Hero`, `Features`, `Header`, `Footer`, `Pricing`, `ThemeToggle`, `CookieSettingsButton`, `CookieConsent`, `CookieConsentProvider`, `useConsent`
- **Deps**: `@ydm-agency/utils`, Radix primitives, `class-variance-authority`, `next-themes`, `lucide-react`
- **Files**: `src/index.ts` + components and `__tests__/`

#### @ydm-agency/utils
- **Exports**: `cn`, `formatCurrency`, `formatDate`
- **Deps**: `clsx`, `tailwind-merge`
- **Files**: `src/index.ts`, `src/cn.ts`, `src/formatCurrency.ts`, `src/formatDate.ts` (+ tests)

### Orphaned packages (not wired into the dependency graph)

| Package | Status | Notes |
|---|---|---|
| `packages/branding` | Orphaned | Misnamed `@packages/branding`; design tokens (unused; color values mirror the active CSS/Tailwind theme). Has tests but unused. |
| `packages/design-system` | Excluded from workspace | Malformed `package.json` (two concatenated JSON objects); broken fork of `packages/ui`. Excluded via `!packages/design-system` in `pnpm-workspace.yaml`. |
| `packages/web-core` | Orphaned | Misnamed `@packages/web-core`; format/env/layout/meta helpers. Has tests but unused. |

## Cross-Package Dependency Graph

```
firm-website
├── analytics → ui → utils
├── email
├── forms → ui → utils
│         └── analytics → ui → utils
├── seo
├── ui → utils
└── utils
```

`@ydm-agency/config` is the shared dev-only base package (no workspace runtime deps; all active packages and `firm-website` dev-depend on it). The 7 active packages form a coherent runtime chain. The 3 orphaned packages are not imported by any active package.

## Other Top-Level Directories

- **.devin/** — `README.md` + `workflows/` (audit-architecture, audit-code, audit-dependencies, audit-hygiene, audit-security, audit-tests, create-todo, execute-todo, official/official)
- **.github/** — `workflows/ci.yml` (GitHub Actions CI)
- **docs/** — `docs/{CONTENT,OURSERVICES,PAGES,SERVICES}.md` and `docs/archive/planning/` (12 archived planning docs: `00-index`, `01`–`05`, `07`–`12`; `06` is missing, plus `planning.md`)
- **e2e/** — `.gitkeep` only (Playwright E2E tests not yet implemented)
- **turbo/** — `generators/config.ts` (Turborepo `new-app` generator; templates are missing)
- **coverage/** and **playwright-report/** — generated test artifacts

## Key Findings

1. **Single deployable app**: `apps/firm-website` is the only application; all 7 active packages feed into it.
2. **Three orphaned packages**: `branding`, `design-system`, and `web-core` are not imported anywhere. `branding` and `web-core` have incorrect `@packages/*` names; `design-system` is excluded from the workspace and has a malformed `package.json`.
3. **Service-page ecosystem**: Extensive config under `src/lib/` drives the `/services/*` route tree (hub, spokes for deliverables/FAQ/process, compare, pricing, industries).
4. **Education content**: 5 topics (SEO, Conversion, Foundations, Strategy, Compliance) with original + `-new` lesson variants, plus 4 cross-cutting learning paths.
5. **Testing**: Unit tests exist for `utils`, `forms`, `ui`, and app-level `audit-schema`, `pricing-estimator`, `industries-config`, `contrast`. `analytics`, `email`, and `seo` are untested. E2E tests are not yet implemented.
6. **Backend integrations**: `/contact` and `/audit` Server Actions use Supabase (leads), Resend (emails), and Upstash (rate limiting). Analytics provider IDs are placeholders and the current CSP blocks the inline analytics scripts.
