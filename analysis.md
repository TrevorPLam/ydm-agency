# YDM Agency Repository Analysis

**Date**: August 4, 2026 (verified against live repo)  
**Repository**: ydm-agency  
**Analysis Type**: Comprehensive Codebase Examination

---

## 1. Monorepo Architecture

### 1.1 Structure Overview

Turborepo workspace with one app and ten packages under `packages/` — seven active (`ui`, `forms`, `analytics`, `seo`, `email`, `utils`, `config`) and three orphaned (`branding`, `design-system`, `web-core`, not wired into the dependency graph — Section 1.3).

```
ydm-agency/
├── apps/
│   └── firm-website/            # Next.js 15 marketing site
│       ├── public/              # fonts/ClashDisplay-Variable.woff2, noise.svg
│       ├── src/
│       │   ├── app/
│       │   │   ├── page.tsx
│       │   │   ├── layout.tsx
│       │   │   ├── providers.tsx
│       │   │   ├── globals.css
│       │   │   ├── robots.ts
│       │   │   ├── sitemap.ts
│       │   │   ├── about/page.tsx
│       │   │   ├── blog/
│       │   │   │   ├── page.tsx
│       │   │   │   └── [slug]/page.tsx
│       │   │   ├── contact/
│       │   │   │   ├── page.tsx
│       │   │   │   └── actions.ts
│       │   │   ├── education/
│       │   │   │   ├── page.tsx
│       │   │   │   ├── EducationSearch.tsx
│       │   │   │   ├── LessonFilter.tsx
│       │   │   │   ├── TopicContent.tsx
│       │   │   │   ├── TableOfContents.tsx
│       │   │   │   ├── EducationAnalytics.tsx
│       │   │   │   ├── SocialShare.tsx
│       │   │   │   ├── PrintButton.tsx
│       │   │   │   ├── print.css
│       │   │   │   ├── search-actions.ts
│       │   │   │   ├── paths/
│       │   │   │   │   ├── page.tsx
│       │   │   │   │   └── [slug]/page.tsx
│       │   │   │   └── [topic]/
│       │   │   │       ├── page.tsx
│       │   │   │       └── [slug]/page.tsx
│       │   │   ├── privacy/page.tsx
│       │   │   ├── audit/
│       │   │   │   ├── page.tsx
│       │   │   │   └── actions.ts
│       │   │   └── services/
│       │   │       ├── page.tsx
│       │   │       ├── layout.tsx
│       │   │       ├── process/page.tsx
│       │   │       ├── compare/page.tsx
│       │   │       ├── pricing/page.tsx
│       │   │       ├── industries/
│       │   │       │   ├── page.tsx
│       │   │       │   └── [slug]/page.tsx
│       │   │       └── [slug]/
│       │   │           ├── page.tsx
│       │   │           ├── process/page.tsx
│       │   │           ├── deliverables/page.tsx
│       │   │           └── faq/page.tsx
│       │   ├── components/
│       │   │   ├── ServiceSubnav.tsx
│       │   │   ├── AuditForm.tsx
│       │   │   ├── CalendlyWidget.tsx
│       │   │   ├── CalendlySection.tsx
│       │   │   ├── CalendlyEmbed.tsx
│       │   │   └── PricingEstimator.tsx
│       │   ├── lib/
│       │   │   ├── audit-schema.ts
│       │   │   ├── audit-schema.test.ts
│       │   │   ├── blog-config.ts
│       │   │   ├── contrast.test.ts
│       │   │   ├── education-config.ts
│       │   │   ├── faq-utils.ts
│       │   │   ├── industries-config.ts
│       │   │   ├── industries-config.test.ts
│       │   │   ├── pricing-config.ts
│       │   │   ├── pricing-estimator.ts
│       │   │   ├── pricing-estimator.test.ts
│       │   │   ├── service-comparison-config.ts
│       │   │   ├── service-labels.ts
│       │   │   ├── services-config.ts
│       │   │   └── education/
│       │   │       ├── seo-lessons.ts
│       │   │       ├── seo-lessons-new.ts
│       │   │       ├── conversion-lessons.ts
│       │   │       ├── conversion-lessons-new.ts
│       │   │       ├── foundations-lessons.ts
│       │   │       ├── foundations-lessons-new.ts
│       │   │       ├── strategy-lessons.ts
│       │   │       ├── strategy-lessons-new.ts
│       │   │       ├── compliance-lessons.ts
│       │   │       ├── compliance-lessons-new.ts
│       │   │       ├── learning-paths.ts
│       │   │       └── types.ts
│       │   └── middleware.ts
│       ├── next.config.js
│       ├── postcss.config.js
│       └── tailwind.config.js
├── packages/
│   ├── ui/                      # 14 exports incl. Button, Card, Header, Footer,
│   │                            # CookieConsent, CookieConsentProvider, useConsent
│   │                            # + src/Button.test.tsx, src/__tests__/{Card,Badge,CookieConsent,Header}.test.tsx
│   ├── forms/                   # LeadForm, ContactForm; Zod schemas (contact, lead)
│   │                            # re-exported via src/schemas.ts from src/schemas/
│   │                            # + __tests__/, src/schemas/*.test.ts
│   ├── analytics/               # AnalyticsProvider, trackEvent
│   ├── seo/                     # constructMetadata, OrganizationJsonLd,
│   │                            # ServiceJsonLd, FaqPageJsonLd
│   ├── email/                   # sendEmail, AcknowledgmentEmail, NotificationEmail
│   ├── utils/                   # cn, formatCurrency, formatDate + *.test.ts
│   ├── config/                  # shared ESLint, TS, Tailwind, Prettier, Next.js
│   ├── branding/                # orphaned: tokens object + tests
│   ├── design-system/           # orphaned, excluded from pnpm workspace
│   │                            # package.json contains two concatenated JSON objects
│   └── web-core/                # orphaned: format/env/layout/meta + tests
├── e2e/                         # only .gitkeep
├── .github/workflows/           # ci.yml
├── .devin/workflows/            # audit, todo, and official/ workflows
├── docs/                        # archive/planning markdown specs
├── turbo/generators/config.ts
├── .env.example
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── turbo.json
├── vitest.config.ts
├── vitest.setup.ts
└── playwright.config.ts
```

**Structural notes**:
- Implemented routes: `/`, `/about`, `/audit`, `/blog`, `/blog/[slug]`, `/contact`, `/education`, `/education/[topic]`, `/education/[topic]/[slug]`, `/education/paths`, `/education/paths/[slug]`, `/privacy`, `/services`, `/services/process`, `/services/pricing`, `/services/compare`, `/services/industries`, `/services/industries/[slug]`, `/services/[slug]`, `/services/[slug]/deliverables`, `/services/[slug]/faq`, `/services/[slug]/process`. `/contact` and `/audit` include working Server Actions (Section 2.4).
- Missing: `/demos` is not present in `apps/firm-website/src/app/`.
- Service-page ecosystem helpers: `faq-utils.ts`, `service-labels.ts`, `service-comparison-config.ts`, `pricing-config.ts`, `pricing-estimator.ts`, `industries-config.ts`, `audit-schema.ts` (+ 338-line `audit-schema.test.ts` Vitest suite; also `contrast.test.ts`, `industries-config.test.ts`, `pricing-estimator.test.ts`).
- `apps/firm-website/src/app/education/` also contains `LessonFilter.tsx` (difficulty-level filter, used by `TopicContent.tsx`), `TopicContent.tsx` (filtered lesson list, used by `[topic]/page.tsx`), and `search-actions.ts` (lesson-search Server Action used by `EducationSearch.tsx` in the education hub and topic listing pages).
- `apps/firm-website/src/components/` also contains `CalendlyEmbed.tsx`, `CalendlySection.tsx`, `CalendlyWidget.tsx`, and `PricingEstimator.tsx`.
- `apps/firm-website/src/lib/education/` has five topic files (seo/conversion/foundations/strategy/compliance-lessons.ts) plus a `-new` counterpart for each (e.g. `seo-lessons-new.ts`), all imported and concatenated by `education-config.ts` — an active content-expansion pass, not dead code (lesson counts: Section 4.2).
- Blog content: `apps/firm-website/src/lib/blog-config.ts`.
- Tests: `packages/ui` (`src/Button.test.tsx` + `src/__tests__/{Card,Badge,CookieConsent,Header}.test.tsx`); `packages/forms` (`__tests__/` + `src/schemas/*.test.ts`); `packages/utils` (`cn.test.ts`, `formatCurrency.test.ts`, `formatDate.test.ts`); orphaned packages `branding`, `design-system`, `web-core`; `apps/firm-website` (four Vitest suites in `src/lib/`). `e2e/` has no tests. Active packages `@ydm-agency/analytics`, `@ydm-agency/email`, and `@ydm-agency/seo` have no test files or `test` scripts (Section 5.1).
- Root test/E2E config: `vitest.config.ts` (unified Vitest runner across `apps/**` and `packages/**`, excludes `packages/design-system` from test and coverage), `vitest.setup.ts` (jest-dom, jest-axe, Next.js mocks), `playwright.config.ts` (E2E against `apps/firm-website` dev server, `e2e/` test dir).
- Root docs: `README.md`, `AGENTS.md`, `TODO.md`, `CONTENT.md`, `PAGES.md`, `copy.md`, `recommendations.md`; archived planning specs in `docs/archive/planning/`.
- Orphaned packages (`branding`, `design-system`, `web-core`) are not consumed by `apps/firm-website` or any active package; `design-system` is also excluded from the pnpm workspace glob (`!packages/design-system` — Section 1.3).

### 1.2 Package Management

**Package Manager**: pnpm 9.15.0 (`packageManager` field)  
**Engines**: Node.js >=22.0.0, pnpm >=9.0.0  
**Monorepo Tool**: Turborepo `^2.0.0` (resolved 2.10.7) with `@turbo/gen` 2.10.7

**Workspace Configuration** (`pnpm-workspace.yaml`):
- Globs: `apps/*`, `packages/*`, with `!packages/design-system` explicitly excluded (see Section 1.3)
- `default` catalog for shared dependency versions

**Catalog / resolved versions** (from `pnpm-lock.yaml` `catalogs.default`):
- `next` ^15.1.0 → 15.5.22
- `react` ^19.0.0 → 19.2.8
- `react-dom` ^19.0.0 → 19.2.8
- `tailwindcss` ^3.4.17 → 3.4.19
- `autoprefixer` ^10.4.20 → 10.5.4
- `clsx` ^2.1.1 → 2.1.1
- `tailwind-merge` ^2.5.5 → 2.6.1
- `lucide-react` ^0.468.0 → 0.468.0
- `zod` ^3.24.1 → 3.25.76
- `next-themes` ^0.3.0 → 0.3.0
- `class-variance-authority` ^0.7.0 → 0.7.1
- `@radix-ui/react-slot` ^1.1.0 → 1.3.3
- `@radix-ui/react-dialog` ^1.1.0 → 1.1.23
- `@radix-ui/react-dropdown-menu` ^2.1.21 → 2.1.24
- `vitest` ^2.0.0 → 2.1.9
- `@testing-library/react` ^16.0.0 → 16.3.2, `@testing-library/jest-dom` ^6.5.0 → 6.9.1, `@testing-library/user-event` ^14.5.0 → 14.6.1
- `react-hook-form` ^7.54.0 → 7.83.0, `@hookform/resolvers` ^3.9.0 → 3.10.0
- `resend` ^4.0.0 → 4.8.0, `@react-email/components` ^0.0.22 → 0.0.22
- `typescript` ^5.6.3 → 5.9.3

**Resolved notes**:
- The workspace catalog declares `typescript` as `^5.6.3`, but the root `package.json` and most packages pin it to `^5.6.0`; `packages/branding` and `packages/web-core` use `catalog:`. `pnpm-lock.yaml` resolves all to `5.9.3`.

**Workspace protocol usage**:
- `apps/firm-website` → `@ydm-agency/analytics`, `@ydm-agency/email`, `@ydm-agency/forms`, `@ydm-agency/seo`, `@ydm-agency/ui`, `@ydm-agency/utils`
- `packages/ui` → `@ydm-agency/utils`
- `packages/forms` → `@ydm-agency/analytics`, `@ydm-agency/ui`
- `packages/analytics` → `@ydm-agency/ui`
- `@ydm-agency/config` is a dev dependency in `apps/firm-website`, `packages/analytics`, `packages/branding`, `packages/email`, `packages/forms`, `packages/seo`, `packages/ui`, `packages/utils`, and `packages/web-core` (not `packages/design-system`, excluded from workspace, and `packages/config` does not depend on itself).

**Turbo pipeline** (`turbo.json`): `build`, `dev`, `lint`, `typecheck`, `test`, `e2e`, `clean` with `globalDependencies: ["**/.env.*local"]`. `build` depends on `^build` and outputs `.next/**` (excluding `.next/cache/**`) and `dist/**`; `typecheck`, `test`, and `e2e` depend on `^build`; `dev` is persistent and uncached. Note: `package.json` also defines `test:watch`, `test:ui`, `test:coverage`, and `format` scripts; those scripts are not declared in `turbo.json` (only the seven pipeline tasks are). No workspace package exposes a `format` task.

### 1.3 Orphaned / Unused Packages

Three packages under `packages/` exist but are not part of the working system — none are imported by `apps/firm-website` or any other active package. `packages/design-system` is explicitly excluded from the pnpm workspace and does not appear in `pnpm-lock.yaml`; `packages/branding` and `packages/web-core` are in the workspace and do appear in `pnpm-lock.yaml`, but no other package depends on them:

- **`branding`** (`@packages/branding`) — a `tokens` object (colors, typography, logos) duplicating `packages/config/tailwind.js` / `globals.css`. Has its own tests.
- **`design-system`** — a broken fork of `packages/ui`: same component set, but `package.json` contains two malformed duplicate package definitions (the first reuses the active package name `@ydm-agency/ui`), `src/index.ts` duplicates its own exports, and it bundles `clsx`/`tailwind-merge` directly instead of via `@ydm-agency/utils`. Explicitly excluded from the workspace glob (`!packages/design-system` in `pnpm-workspace.yaml`).
- **`web-core`** (`@packages/web-core`) — `getEnv()`, `RootLayout`, `createRootMetadata()`, `formatDate()`/`formatCurrency()`, overlapping `@ydm-agency/seo` and `@ydm-agency/utils`. `package.json` `main`/`types` point to `src/index.ts`, which does not exist; subpath `exports` (`./format`, `./env`, `./layout`, `./meta`) are defined but unused. Has its own tests.

`docs/archive/planning/planning.md` — an ≈760-line future multi-tenant roadmap doc — names packages `web-core` and `branding` as part of a planned architecture, the likely origin of all three: abandoned scaffolding, not in-progress features.

---

## 2. Application Analysis (firm-website)

### 2.1 Tech Stack

- **Framework**: Next.js 15.5.22 App Router; `reactStrictMode: true` in `packages/config/nextjs.js`; workspace packages `@ydm-agency/{ui,forms,seo,analytics,utils,email}` transpiled via `apps/firm-website/next.config.js` re-exporting that shared config
- **React**: 19.2.8 (catalog `^19.0.0`)
- **TypeScript**: 5.9.3, `strict` mode, `target: ES2022`, `module: ESNext`, `moduleResolution: bundler`, Next.js TS plugin in `packages/config/tsconfig.base.json`
- **Build / Package Management**: pnpm 9.15.0 (`packageManager` field), Turborepo 2.10.7 (`turbo` + `@turbo/gen` catalog `^2.0.0`)
- **Styling**: Tailwind CSS 3.4.19, PostCSS + autoprefixer 10.5.4, CSS variables for dark/light tokens (`apps/firm-website/src/app/globals.css`)
- **UI Components**: shadcn/ui pattern in `@ydm-agency/ui` built on Radix primitives (`@radix-ui/react-slot`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`), `class-variance-authority` 0.7.1, `lucide-react` 0.468.0, `cn()` from `@ydm-agency/utils` (`clsx` 2.1.1 + `tailwind-merge` 2.6.1)
- **Fonts**: `Inter` via `next/font/google` (body), `ClashDisplay-Variable` via `next/font/local` (headings, `public/fonts/ClashDisplay-Variable.woff2`); CSS variables `--font-sans` / `--font-display`
- **Theming**: `next-themes` 0.3.0, `attribute="class"`, default dark, `enableSystem`, `storageKey="ydm-theme"`
- **State / Forms**: `react-hook-form` 7.83.0, `@hookform/resolvers` 3.10.0, `zod` 3.25.76
- **Backend / Integrations (contact & audit)**: `@supabase/supabase-js` 2.110.8 (leads table), `@upstash/ratelimit` 2.0.4, `@upstash/redis` 1.38.0 (5/hr IP rate limit), `react-calendly` 4.4.0 (lazy-loaded embed)
- **Analytics**: GA4, PostHog, Meta Pixel via consent-gated `@ydm-agency/analytics` (`AnalyticsProvider` + `trackEvent`); IDs are empty strings in `providers.tsx` so no scripts are currently injected
- **Email**: Resend 4.8.0 + `@react-email/components` 0.0.22
- **Testing**: Vitest 2.1.9, `@testing-library/react` 16.3.2 / `@testing-library/jest-dom` 6.9.1 / `@testing-library/user-event` 14.6.1, `jsdom` 25.0.1, `@playwright/test` 1.62.1

### 2.2 Routing Structure

**Static / App Router routes**:
- `/` — Hero, 3-card services snapshot, 3-step process teaser, trust banner, final CTA
- `/services` — 8-card service hub with `SERVICE_CARD_DESCRIPTIONS` + icons, "Why Work With YDM Agency" section, links to `/services/compare`, `/services/pricing`, `/services/industries`, and `/audit`
- `/services/[slug]` — Service detail (SSG via `generateStaticParams` over 8 `SERVICES_CONFIG` slugs; `notFound()` for unknown slugs); includes four-tab `ServiceSubnav` (overview, deliverables, process, FAQ)
- `/services/[slug]/deliverables` — Service-specific deliverables / "What You Get" breakdown (SSG)
- `/services/[slug]/faq` — Grouped service FAQs (Pricing, Timeline, Scope, Prerequisites, Compliance, General, Answer Engine Questions) with `FAQPage` JSON-LD (SSG)
- `/services/[slug]/process` — Service-specific process phases with duration badges and FAQ (SSG)
- `/services/process` — Process hub with 5-phase client lifecycle, links to 8 service process pages, FAQ
- `/services/pricing` — Per-service investment factors + interactive `PricingEstimator`
- `/services/compare` — Scenario-based service comparison and service fit matrix
- `/services/industries` — 3-card industry vertical hub (Professional Services, Home Services, Solopreneurs & Personal Services)
- `/services/industries/[slug]` — Industry detail (SSG via `generateStaticParams` over 3 `INDUSTRIES_CONFIG` slugs; `notFound()` for unknown slugs)
- `/audit` — Free marketing audit request form (Server Action + Resend)
- `/contact` — Contact form with hero, response promise, Calendly integration; backed by `apps/firm-website/src/app/contact/actions.ts` (Supabase leads, Resend, Upstash rate limiting)
- `/about` — Founder story, company principles, FAQs
- `/blog` — 3-post opinion and news hub
- `/blog/[slug]` — Individual blog post (SSG via `generateStaticParams` over 3 `BLOG_POSTS` slugs; `notFound()` for unknown slugs)
- `/education` — Technical lesson hub with search, 5 topics, 47 lessons, 4 learning paths
- `/education/[topic]` — Topic-specific lesson listing (SSG via `generateStaticParams` over 5 `EDUCATION_TOPICS` slugs; `notFound()` for unknown topics)
- `/education/[topic]/[slug]` — Lesson detail (SSG via `generateStaticParams` over 47 `EDUCATION_LESSONS` slugs; `notFound()` for unknown lessons)
- `/education/paths` — Learning paths hub with 4 cross-cutting learning paths
- `/education/paths/[slug]` — Individual learning path detail (SSG via `generateStaticParams` over 4 `LEARNING_PATHS`; `notFound()` for unknown paths)
- `/privacy` — Privacy policy
- `/sitemap.xml` — Generated sitemap (`sitemap.ts`): 107 URLs = 8 static routes (`/`, `/services`, `/services/process`, `/about`, `/blog`, `/education`, `/contact`, `/privacy`) + 8 service spokes + 8 process spokes + 8 deliverables spokes + 8 FAQ spokes + 4 utility routes (`/services/compare`, `/services/pricing`, `/services/industries`, `/audit`) + 3 industry spokes + 3 blog posts + 5 education topic pages + 47 education lesson pages + 5 learning-path URLs (`/education/paths` + 4 detail)
- `/robots.txt` — `allow: /`, `disallow: /api/`, sitemap reference

**Notes**:
- `services/layout.tsx` is a passthrough layout.
- Education routes use a two-level structure: `/education/[topic]/[slug]` for lessons, with topic hub pages at `/education/[topic]`.
- `/demos` is not implemented and is not referenced by any current route.
- There are no `api/` routes. The only server-side entry points are the three Server Actions (`/contact/actions.ts`, `/audit/actions.ts`, `education/search-actions.ts`) and the middleware (`middleware.ts`).
- All dynamic routes are statically generated at build time via `generateStaticParams`; unknown slugs call `notFound()`.

### 2.3 Key Components

**App shell** (`apps/firm-website/src/app`):
- `layout.tsx` — Root layout: `Inter` + `ClashDisplay` fonts, `constructMetadata`, `OrganizationJsonLd`, Header/Footer/CookieConsent, `AppProviders`
- `providers.tsx` — `ThemeProvider` (next-themes, default dark), `CookieConsentProvider`, `AnalyticsProvider`
- `globals.css` — Tailwind directives + CSS variables for dark/light design tokens + `.noise` overlay
- `Header.tsx` (`@ydm-agency/ui`) — Fixed responsive header, skip-to-content, desktop Radix `DropdownMenu` + mobile Radix `Dialog` nav, active-path indicator, `ThemeToggle`
- `Footer.tsx` — Quick links, contact email, legal links, `CookieSettingsButton`

**Shared UI library** (`@ydm-agency/ui`):
- `Button` — CVA variants (`primary`, `secondary`, `ghost`), sizes, Radix `Slot` support (`asChild`)
- `Card`, `Container`, `Badge` — layout primitives
- `Hero` — Title + highlighted text, description, dual CTAs
- `Features`, `Pricing` — grid/pricing components (defined but not currently used in routes)
- `ThemeToggle` — dark/light toggle with `next-themes`
- `CookieConsent`, `CookieConsentProvider`, `useConsent`, `CookieSettingsButton` — consent state + banner; `ydm-analytics-consent` cookie, 1 year, `SameSite=Lax`

**Cross-cutting packages**:
- `@ydm-agency/seo` — `constructMetadata()` (OG, Twitter, metadataBase), `OrganizationJsonLd`, `ServiceJsonLd`, `FaqPageJsonLd`
- `@ydm-agency/analytics` — `AnalyticsProvider` (GA4, PostHog, Meta Pixel, consent-gated Scripts), `trackEvent()`
- `@ydm-agency/forms` — `ContactForm` (`react-hook-form` + Zod + honeypot), `LeadForm` (controlled inputs + Zod; not used in `apps/firm-website`)
- `@ydm-agency/utils` — `cn()` (`clsx` + `tailwind-merge`), `formatDate()`, `formatCurrency()`

**App-specific shared components** (`apps/firm-website/src/components`):
- `ServiceSubnav.tsx` — Four-tab sub-navigation (overview, deliverables, process, FAQ) across service spoke pages
- `AuditForm.tsx` — Client audit form using `react-hook-form`, `zodResolver`, `submitAudit`
- `CalendlyWidget.tsx` — Lazy-loaded `react-calendly` `InlineWidget` (used on `/contact`)
- `CalendlySection.tsx` / `CalendlyEmbed.tsx` — Additional Calendly wrappers, not imported by any route
- `PricingEstimator.tsx` — Interactive multi-step pricing estimator (situation → services → business size → timeline → extras → result)

**Page components**:
- `page.tsx` (home) — `Hero` (CTA to `/services` and `/contact`), 3-card services snapshot, 3-step process teaser, trust banner, final CTA
- `services/page.tsx` — 8-card service hub with `SERVICE_CARD_DESCRIPTIONS` + icons, "Why Work With YDM Agency" section, links to `/services/compare`, `/services/pricing`, `/services/industries`, and `/audit`
- `services/[slug]/page.tsx` — Service detail (`ServiceJsonLd`, `ServiceSubnav` four tabs): hero, problem/solution, included list, who it’s for, `howItFits` cross-service links, working-with-YDM, overview FAQs, final CTA with contact/process buttons + estimate/pricing links
- `services/[slug]/deliverables/page.tsx` — Deliverables breakdown (output/timeline/outcome), how it fits, final CTA, `ServiceSubnav`, link to FAQ
- `services/[slug]/faq/page.tsx` — Grouped service FAQs (Pricing, Timeline, Scope, Prerequisites, Compliance, General, Answer Engine Questions) with `FAQPage` JSON-LD and `ServiceSubnav`
- `services/[slug]/process/page.tsx` — Process phases with duration badges, process FAQs, back links, link to FAQ, `ServiceSubnav`
- `services/process/page.tsx` — 5-phase client lifecycle, links to 8 service process pages, FAQ
- `services/pricing/page.tsx` — Per-service investment factors + interactive `PricingEstimator`
- `services/compare/page.tsx` — Scenario-based service comparison and service fit matrix
- `services/industries/page.tsx` — 3-card industry vertical hub (Professional Services, Home Services, Solopreneurs & Personal Services)
- `services/industries/[slug]/page.tsx` — Industry detail: common challenges, recommended services, who it’s for, industry-specific notes, FAQs, final CTA
- `audit/page.tsx` — Free marketing audit request, what the audit covers, what you receive, `AuditForm`
- `contact/page.tsx` — Contact form, response promise, alternative contact methods (direct email), Calendly integration
- `contact/actions.ts` — Server Action: `contactFormSchema` validation, Supabase `leads` table, Resend emails, Upstash rate limit (5/hr per IP)
- `education/page.tsx` — Lesson hub with `EducationSearch`, topic grid (5 topics with lesson counts), learning paths
- `education/[topic]/page.tsx` — Topic listing with `EducationSearch`, `LessonFilter`, `TopicContent`, safety/attribution/level badges
- `education/[topic]/[slug]/page.tsx` — Lesson detail: `ArticleJsonLd`, hero, topic/safety/level badges, learning outcome, sections, `TableOfContents`, `EducationAnalytics`, `SocialShare`, `PrintButton`, back link, CTA
- `education/paths/page.tsx` — Learning paths hub with 4 paths
- `education/paths/[slug]/page.tsx` — Path detail with lesson list, descriptions, `Badge` lesson counts
- `education/search-actions.ts` — Server Action for `EducationSearch`
- `about/page.tsx` — Founder story, company principles, FAQs
- `blog/page.tsx` — 3-post opinion/news hub with featured article layout, editorial styling, pull quotes, author metadata
- `privacy/page.tsx` — Privacy policy
- `sitemap.ts` / `robots.ts` — Generated SEO routes

**Resilience / assets**:
- No `error.tsx`, `not-found.tsx`, or `loading.tsx` boundaries exist in `apps/firm-website/src/app`. Dynamic routes call `notFound()` for invalid slugs, which falls back to Next.js's unstyled default pages.
- No `next/image` or raster `<img>` usage in the app source; the only images are hard-coded `logo.png` URLs in `OrganizationJsonLd` and `ArticleJsonLd`. `public/` contains only `fonts/ClashDisplay-Variable.woff2` and `noise.svg`.

### 2.4 Security Implementation

**HTTP headers** (`apps/firm-website/src/middleware.ts`):
- Matcher: `/((?!api|_next/static|_next/image|favicon.ico|og-image.png).*)` — applies to all routes except `api`, static assets, `favicon.ico`, and `og-image.png`.
- `Content-Security-Policy: default-src 'self'; script-src 'self' https://www.googletagmanager.com https://va.vercel-scripts.com; frame-src https://calendly.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

**CSP / analytics caveat**: The CSP blocks the `dangerouslySetInnerHTML` inline scripts in `AnalyticsProvider` (no `unsafe-inline` or nonce) and the PostHog/Meta Pixel hosts (`app.posthog.com`, `connect.facebook.net` are not in `script-src`). Only the external GA loader (`https://www.googletagmanager.com/gtag/js`) can be fetched; its inline `gtag` config, PostHog, and Meta Pixel remain blocked. In practice, analytics is also disabled because `apps/firm-website/src/app/providers.tsx` passes `gaId=""`, `posthogKey=""`, and `metaPixelId=""`.

**Form / bot protection**:
- `ContactForm` (`packages/forms/src/ContactForm.tsx`) — `react-hook-form` + `zodResolver` + `contactFormSchema` (`packages/forms/src/schemas.ts`): honeypot `_honeypot` must be empty; `name` ≥2; valid email; `message` ≥20; optional `projectType` (`website`/`traffic-leads`/`other`). Wired by `/contact/page.tsx` to `submitContact()` in `apps/firm-website/src/app/contact/actions.ts`. Errors render with `role="alert" aria-live="assertive"`, `aria-invalid`, and `aria-describedby`. On success, calls `trackEvent({ eventName: 'form_submission', properties: { form: 'contact', projectType: data.projectType ?? 'none' } })`.
- `AuditForm` (`apps/firm-website/src/components/AuditForm.tsx`) — `react-hook-form` + `zodResolver` + `auditFormSchema` (`apps/firm-website/src/lib/audit-schema.ts`): honeypot; `name` ≥2; valid email; `website` ≥3 and regex-matched (`SOMETHING.SOMETHING` or `http(s)://...`); `challenge` ≥10; `marketingState` enum. Submits to `submitAudit()` in `apps/firm-website/src/app/audit/actions.ts`, which calls `sendEmail()` only — no Supabase storage, no rate limiting.
- `LeadForm` (`packages/forms/src/LeadForm.tsx`) — `leadCaptureSchema` (`packages/forms/src/schemas/lead-schema.ts`): `fullName` ≥2, email, `message` ≥10, optional `companyName`/`budget`. Manual `useState` validation, no backend, fires `trackEvent('lead_form_submitted')` only. Not imported or rendered anywhere in `apps/firm-website`.

**`/contact` Server Action** (`apps/firm-website/src/app/contact/actions.ts`) — fully implemented; runtime operation depends on configured secrets:
- Validation: server-side `contactFormSchema.safeParse`; on failure returns `{ success: false, error: <joined Zod messages> }`.
- Rate limiting: `@upstash/ratelimit` `2.0.4` + `@upstash/redis` `1.38.0`, sliding window 5 submissions/hour per IP. IP from `x-forwarded-for` || `x-real-ip` || `'unknown'`. If `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` are missing, the limiter is `null` and the path continues unthrottled; if `ratelimit.limit()` throws, it is logged and the request continues.
- Supabase lead storage: `@supabase/supabase-js` `2.110.8`; inserts into `leads` (`name`, `email`, `project_type` [nullable], `message`, `source: 'website'`, `status: 'new'`, `created_at` ISO). The action reads `SUPABASE_URL` and `SUPABASE_ANON_KEY`, but `.env.example` declares `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (see Section 7.1 for the variable-name mismatch and the service-role vs. anon-key question). If the runtime environment does not provide the names the code expects, the Supabase client is `null` and storage no-ops silently.
- Email: calls `sendEmail()` from `@ydm-agency/email` for acknowledgment + internal notification. `sendEmail()` returns `success: true` whenever `RESEND_API_KEY` is present and no exception is thrown; it uses `Promise.allSettled` and logs rejected Resend sends but does not propagate them, so the caller may report success even if the actual emails fail.
- Calendly: `CalendlyWidget.tsx` and `CalendlyEmbed.tsx` load `react-calendly` `4.4.0` `InlineWidget` with `NEXT_PUBLIC_CALENDLY_URL`; `CalendlyWidget` falls back to `https://calendly.com/ydm-agency/project-consultation` when the env is absent.

**`/audit` Server Action** (`apps/firm-website/src/app/audit/actions.ts`):
- Validation: server-side `auditFormSchema.safeParse`; on failure returns `{ success: false, error: <joined Zod messages> }`.
- Constructs a plain-text message and calls `sendEmail()`. No Supabase storage, no rate limiting, no IP throttling.

**Privacy / consent**:
- `CookieConsentProvider` (`packages/ui/src/CookieConsentContext.tsx`) sets `ydm-analytics-consent` cookie (`max-age=31536000`, `path=/`, `SameSite=Lax`) and exposes `accept`/`reject`/`openSettings`/`useConsent`. `CookieConsent` (`packages/ui/src/CookieConsent.tsx`) is a bottom fixed banner; Accept/Reject and Escape-to-dismiss trigger `reject()`.
- `AnalyticsProvider` (`packages/analytics/src/Analytics.tsx`) only renders GA/PostHog/Meta scripts when `analyticsConsent` is true and the corresponding ID prop is non-empty; on consent it also calls `gtag('consent', 'update', { analytics_storage: 'granted' })`. `trackEvent` (`packages/analytics/src/events.ts`) re-checks the consent cookie, dispatches a `ydm_analytics_event` custom event, and pushes to `gtag`/`posthog`/`fbq` only when those globals exist.
- `/privacy` (`apps/firm-website/src/app/privacy/page.tsx`) documents data collection, the consent cookie, third parties (Vercel, Resend, Calendly, Supabase), retention, user rights, and contact details; the opening paragraph uses "we"/"us", which conflicts with the project's impersonal voice guideline.

**Analysis**: Static security posture is solid via middleware headers and client-side bot/privacy controls. `/contact` has the most defenses (validation, honeypot, rate limiting, Supabase storage, email); `/audit` has validation, honeypot, and email only. Two runtime caveats: (1) the `contact/actions.ts` Supabase env variable names do not match `.env.example`, so lead storage is silently disabled unless the correct names are supplied; (2) the CSP is stricter than the analytics scripts it is meant to allow, so all three analytics providers remain blocked even if IDs and consent are configured. `LeadForm` is dead code in the app.

### 2.5 Design System

**Color tokens** (`apps/firm-website/src/app/globals.css` → `packages/config/tailwind.js`):
- Dark (`:root`): background `#0A0A0B`; surface `#161618`; text primary `#F5F5F6`; text secondary `#A1A1A9`; accent `#3B82F6`; accent hover `#4B8AF2`; border `#2A2A2E`; error `#F87171`; success `#3B82F6` (same as accent).
- Light (`.light`): background `#FFFFFF`; surface `#F5F5F6`; text primary `#0A0A0B`; text secondary `#4A4A52`; accent `#2563EB`; accent hover `#1D4ED8`; border `#2A2A2E`; error `#B91C1C`; success `#2563EB` (same as accent).
- Exposed as Tailwind colors: `bg-background`, `bg-surface`, `text-text-primary`, `text-text-secondary`, `bg-accent`, `text-accent`, `bg-accent-hover`, `text-accent-hover`, `border-border`, `text-error`, `text-success`, etc.
- `success` is aliased to `accent` in both themes; it is not a distinct green.
- `apps/firm-website/src/lib/contrast.test.ts` parses both themes from `globals.css` and asserts WCAG 2.1 AA contrast for `text-primary`/`text-secondary` on `background`/`surface`, `accent`/`accent-hover` on `background`/`surface`, `background` on `accent`/`accent-hover`, `error`/`success` on `background`/`surface`, plus a 3:1 graphical-object check for `bg-accent/10` wells.

**Typography**:
- Display: `public/fonts/ClashDisplay-Variable.woff2` via `next/font/local` as `--font-display`; applied to headings in `globals.css` (`h1-h6 { font-family: var(--font-display); letter-spacing: -0.02em; }`) and via Tailwind `font-display`.
- Body: `Inter` (variable) via `next/font/google` as `--font-sans`; applied via Tailwind `font-sans` on `<body>` (`layout.tsx`).
- Tailwind `fontFamily.display` / `fontFamily.sans` mapped to the CSS vars.
- **Bug**: `packages/config/tailwind.js` sets `fontFamily.display` fallback to `...fontFamily.serif` (`ui-serif`, `Georgia`, etc.) instead of `...fontFamily.sans`; the display typeface is a sans-style variable font and should fall back to the sans stack.
- `globals.css` still declares `body { font-family: system-ui, ... }` at the end of the file. It is redundant because `layout.tsx` applies `font-sans` to `<body>`, whose class selector (0,1,0) out-specifies the `body` rule (0,0,1), so `Inter` still wins. No visual conflict, but the fallback should be removed for cleanliness.

**Layout / spacing**:
- `Container` (`packages/ui/src/Container.tsx`): `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full`.
- Mobile-first responsive pattern; sections typically `py-24 md:py-32`.
- `Card` (`packages/ui/src/Card.tsx`): `bg-surface border border-border rounded-xl` with `hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10`.

**Component styling**:
- `Button` (`packages/ui/src/Button.tsx`) CVA: `primary` (`bg-accent text-background hover:bg-accent-hover hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]`), `secondary` (`border border-border text-text-primary hover:bg-surface hover:border-accent`), `ghost` (`text-text-secondary hover:text-text-primary hover:bg-surface`); sizes `sm`/`default`/`lg`/`icon`; `asChild` via `@radix-ui/react-slot`.
- `Badge` (`packages/ui/src/Badge.tsx`) CVA: `default` (`bg-surface border border-border text-text-secondary`), `accent` (`bg-accent text-background`), `outline` (`border border-accent text-accent bg-transparent`).
- `Hero` (`packages/ui/src/Hero.tsx`) uses tokens: `bg-background text-text-primary`, `font-display`, `text-accent` for the highlighted span, `text-text-secondary` for description.
- `ThemeToggle` (`packages/ui/src/ThemeToggle.tsx`) toggles `dark`/`light` with `Sun`/`Moon` icons.
- `noise` class (`globals.css`) applies a fixed-position `::before` pseudo-element with `/noise.svg` at 3% opacity.

**Theming**:
- `next-themes` in `apps/firm-website/src/app/providers.tsx`: `attribute="class"`, `defaultTheme="dark"`, `enableSystem`, `storageKey="ydm-theme"`.
- `RootLayout` (`apps/firm-website/src/app/layout.tsx`) pre-seeds `<html className="... dark ...">`. `:root` in `globals.css` carries dark defaults; `.light` overrides them.

**Design system drift**:
- `packages/ui/src/Features.tsx` and `packages/ui/src/Pricing.tsx` are hard-coded to `slate-*`/`blue-*` grays and `white` text, not the design tokens. Neither is imported by any route in `apps/firm-website`; `Pricing` is not used by any page. `/services/pricing` uses `PricingEstimator.tsx` (`apps/firm-website/src/components/`) instead.
- `Features` uses `bg-slate-900 text-white`, `bg-slate-800/60 border-slate-700/60`, `text-blue-400`, etc.
- `Pricing` uses `bg-slate-950 text-white`, `bg-slate-900 border-slate-800`, `text-blue-400`, and overrides the `Button` with `bg-slate-800 hover:bg-slate-700 text-white` for non-popular plans — drifting from the token-based `Button` variants.
- `packages/email/src/AcknowledgmentEmail.tsx` and `NotificationEmail.tsx` do **not** drift from the blue accent; they use current design-token hexes (`#0A0A0B`, `#161618`, `#F5F5F6`, `#A1A1A9`, `#3B82F6`) because CSS variables do not work in most email clients.
- `Button` hover shadow is `rgba(59,130,246,0.3)` (current blue), not the old teal.

---

## 3. Packages Analysis

This section covers the seven active packages. All are `private: true`, `version: "0.0.0"`. The six runtime packages (`ui`, `forms`, `analytics`, `seo`, `email`, `utils`) are source-only (`main`/`types` → `src/index.ts`) and compiled by Next.js through `transpilePackages` in `packages/config/nextjs.js`; `@ydm-agency/config` has no `main`/`types` and is consumed by direct file import. The three orphaned packages (`branding`, `design-system`, `web-core`) are described in Section 1.3 and are not analyzed here.

### 3.1 @ydm-agency/ui

**Purpose**: Shared React UI component library built on shadcn/ui patterns and the workspace design system.

**Entry**: `packages/ui/src/index.ts` (source-only; `main`/`types` point to `src/index.ts`).

**Exports**:
- **Button** — CVA variants `primary`/`secondary`/`ghost`; sizes `sm`/`default`/`lg`/`icon`; `asChild` via `@radix-ui/react-slot`.
- **Card** — `bg-surface border-border rounded-xl` with `hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10`.
- **Container** — `max-w-6xl` centered wrapper with responsive horizontal padding.
- **Badge** — CVA variants `default`/`accent`/`outline`.
- **Hero** — centered hero with badge, title, optional highlighted span, and dual CTAs. Default `primaryCtaText="Get Started"` and `secondaryCtaText="Explore Services"` are dead code; the only usage (homepage) overrides both.
- **Features** — 3-column feature grid (`FeatureItem[]`, optional icon). Hard-coded `slate-*`/`blue-*`/`white`; exported but not imported by any app route.
- **Header** — fixed responsive header with skip-to-content link (`href="#main-content"`), active-path indicator, `ThemeToggle`, desktop `DropdownMenu` for `serviceLinks`, and Radix `Dialog` mobile nav with a collapsible services list. Nav links: `/`, `/services`, `/services/process`, `/blog`, `/education`, `/about`, `/contact`.
- **Footer** — brand blurb, quick links (`/services`, `/services/compare`, `/services/pricing`, `/audit`, `/services/process`, `/blog`, `/education`, `/about`, `/contact`), `contact@ydmagency.com`, legal (`/privacy`, `CookieSettingsButton`), and copyright bar.
- **Pricing** — 3-tier pricing grid; supports `ctaHref`/`ctaText` or `onSelectPlan`. Hard-coded `slate-*`/`blue-*`/`white` and overrides non-popular `Button` with `bg-slate-800 hover:bg-slate-700 text-white`; exported but not imported by any app route. `/services/pricing` uses `apps/firm-website/src/components/PricingEstimator.tsx`.
- **ThemeToggle** — dark/light toggle via `next-themes` (`Sun`/`Moon`).
- **CookieSettingsButton** — dispatches `ydm:open-cookie-settings`.
- **CookieConsent** — bottom fixed banner with Accept/Reject; Escape calls `reject()`.
- **CookieConsentProvider** + **useConsent** — consent state, `ydm-analytics-consent` cookie (`SameSite=Lax`, 1 year, `accepted`/`rejected`), `accept`/`reject`/`openSettings` API, and `analyticsConsent` boolean. Client-only; no SSR cookie handling.

**Dependencies** (`packages/ui/package.json`):
- Runtime: `react`, `react-dom`, `next`, `lucide-react`, `next-themes`, `class-variance-authority`, `@radix-ui/react-slot`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@ydm-agency/utils`.
- Dev: `@ydm-agency/config`, `@types/node`, `@types/react`, `@types/react-dom`, `typescript`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `@vitejs/plugin-react`, `jsdom`.

**Scripts**: `lint`, `typecheck`, `test`.

**Tests**: 5 Vitest files, 28 cases — `Card.test.tsx` (3), `Badge.test.tsx` (4), `CookieConsent.test.tsx` (4), `Header.test.tsx` (8), and `Button.test.tsx` (9, in `src/`, not `__tests__/`). `src/__tests__/setup.ts` imports `@testing-library/jest-dom`.

**Observations**:
- Strong TypeScript typing with exported `*Props` interfaces and consistent `cn()`/`cva` patterns.
- `Button`, `Badge`, `Card`, `Container`, `Hero`, `Header`, `Footer`, `CookieConsent`, and `CookieSettingsButton` use workspace Tailwind tokens (`bg-accent`, `text-text-primary`, etc.).
- `Button` primary hover shadow is `rgba(59,130,246,0.3)` (current blue accent).
- `Features.tsx` and `Pricing.tsx` are off-palette dead exports.
- `Header`/`Footer` link to `/contact`, which is implemented. `Header`'s skip-to-content link correctly targets `id="main-content"` in `apps/firm-website/src/app/layout.tsx:60`.
- `CookieConsentProvider` is client-only; no SSR cookie handling.
- `packages/design-system` is an excluded, unused fork.
- `tsconfig.json` excludes `src/__tests__` and `src/**/*.test.tsx`, so `Button.test.tsx` is excluded from `tsc --noEmit`; package and workspace `typecheck` pass.
- `CookieConsent.test.tsx` triggers React `act(...)` warnings because accept/reject clicks are not wrapped in `act`.
- **Quality gap**: `Button.test.tsx` imports `jest-axe` (`axe`, `toHaveNoViolations`), but `jest-axe` is not declared in `packages/ui/package.json` (only at workspace root). It resolves through pnpm hoisting today, but is a phantom dependency for isolated package testing.

**Analysis**: A clean, well-typed component library. Main gaps are the two off-palette dead exports (`Features`, `Pricing`) and the undeclared `jest-axe` dev dependency.

### 3.2 @ydm-agency/utils

**Purpose**: Shared helper utilities for class-name merging and locale formatting.

**Entry**: `packages/utils/src/index.ts` (source-only; `main`/`types` point to source).

**Exports**:
- `cn(...inputs: ClassValue[]): string` — `clsx` (`ClassValue` type) + `tailwind-merge` for conditional Tailwind classes.
- `formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions = {}): string` — parses string dates, returns an `en-US` long date (`month long`, day, year) by default, supports `timeZone` overrides; returns `"Invalid Date"` for unparseable input.
- `formatCurrency(amount: number, currency = 'USD'): string` — `Intl.NumberFormat` currency string.

**Dependencies** (`packages/utils/package.json`):
- Runtime: `clsx`, `tailwind-merge`.
- Dev: `@ydm-agency/config`, `typescript`, `vitest`.

**Scripts**: `lint`, `typecheck`, `test`, `test:coverage`.

**Tests**: 3 files in `src/` (not `__tests__/`): `cn.test.ts` (27 cases), `formatCurrency.test.ts` (10), `formatDate.test.ts` (12), 49 total. No package-level `vitest.config.ts`; `test`/`test:coverage` fall back to the root `vitest.config.ts` and run the whole workspace suite unless invoked with a path filter.

**Usage**:
- `cn` is imported by `packages/ui` (`Button`, `Card`, `Badge`, `Container`) and `apps/firm-website/src/components/ServiceSubnav.tsx` and `PricingEstimator.tsx`. The orphaned `packages/design-system` also imports `cn`, but it is excluded from the pnpm workspace and unused.
- `formatDate`/`formatCurrency` are exported but not imported by any active page or package outside their own tests. `packages/web-core` reimplements near-identical helpers (Section 1.3).

**Observations**:
- Functions are strongly typed, standard built-ins (`clsx`, `tailwind-merge`, `Intl.NumberFormat`, `toLocaleDateString`).
- `formatDate`/`formatCurrency` are dead code in the active app (unit-tested but unused).
- `packages/utils/tsconfig.json` does not exclude test files, so `*.test.ts` are included in `tsc --noEmit`; the package typechecks successfully.
- `lint` fails: the package has no `eslint.config.mjs`, so `pnpm --filter @ydm-agency/utils lint` exits with "ESLint couldn't find an eslint.config file". `packages/ui` and `packages/forms` are the only active packages with package-level ESLint configs (Section 3.7/8.5).

**Analysis**: Clean, focused helpers. `cn()` is actively used across the UI package and app, while the formatting utilities are tested but unused. The missing `eslint.config.mjs` should be added if the `lint` script is intended to be runnable in isolation.

### 3.3 @ydm-agency/forms

**Purpose**: Form components and Zod schemas for contact/lead capture.

**Exports** (`packages/forms/src/index.ts`): `ContactForm`/`ContactFormProps`, `LeadForm`/`LeadFormProps`, `contactFormSchema`/`ContactFormInput`, `leadCaptureSchema`/`LeadCaptureInput`.

**Schemas**:
- `contactFormSchema` (`src/schemas.ts`, used by `ContactForm` and app): `name` ≥2, valid `email`, optional `projectType` enum (`website`/`traffic-leads`/`other`, empty string preprocessed to `undefined`), `message` ≥20, `_honeypot` must be empty.
- `contactSchema` (`src/schemas/contact-schema.ts`): identical fields, only referenced by its own test. Separate object with distinct inferred type `ContactSchemaInput` — drift risk against the production `contactFormSchema`.
- `leadCaptureSchema` (`src/schemas/lead-schema.ts`, re-exported by `schemas.ts`): `fullName` ≥2, valid `email`, optional `companyName`, optional `budget` (unvalidated string, not restricted to dropdown values), `message` ≥10.

**Components**:
- **ContactForm** (`src/ContactForm.tsx`): `react-hook-form` + `zodResolver`, injected async `onSubmit`. Props include optional `submitLabel` (default 'Send Message'), `successTitle` (default 'Message received'), `successMessage` (default 'Expect a personal reply within 2 hours on business days.'), and `defaultValues`. Fields: name, email, optional project-type select ("Website & brand", "Traffic & leads", "Other / I'm not sure"), message, hidden `_honeypot`. `idle`/`loading`/`success`/`error` states; success panel uses `successTitle`/`successMessage`. Errors use `role="alert" aria-live="assertive"`, `aria-invalid`, `aria-describedby`. On success calls `trackEvent({ eventName: 'form_submission', properties: { form: 'contact', projectType: data.projectType ?? 'none' } })`.
- **LeadForm** (`src/LeadForm.tsx`): controlled inputs, manual `leadCaptureSchema.safeParse`, budget dropdown. Configurable `title`/`subtitle`/`sourceApp`/`onSubmitSuccess`. On valid submit fires `trackEvent({ eventName: 'lead_form_submitted', properties: { sourceApp, budget } })`; no backend submission.

**Dependencies** (`packages/forms/package.json`):
- Runtime: `zod`, `react`, `react-hook-form`, `@hookform/resolvers`, `@ydm-agency/ui`, `@ydm-agency/analytics`.
- Dev: `@ydm-agency/config`, `@testing-library/jest-dom`, `@testing-library/react`, `@testing-library/user-event`, `@types/node`, `@types/react`, `typescript`, `vitest`.

**Scripts**: `lint`, `typecheck`, `test`, `test:coverage` (vitest). ESLint config exists (`packages/forms/eslint.config.mjs` re-exports `@ydm-agency/config/eslint-ui.config.mjs`); `lint` and `typecheck` pass.

**Tests** (4 files, 62 cases):
- `src/__tests__/ContactForm.test.tsx`: 5 RTL cases.
- `src/__tests__/schemas.test.ts`: 7 cases for the production `contactFormSchema`.
- `src/schemas/contact-schema.test.ts`: 18 test blocks / 24 cases (parameterized projectType and email validation) for the unused `contactSchema`.
- `src/schemas/lead-schema.test.ts`: 18 test blocks / 26 cases (parameterized budget and email validation) for `leadCaptureSchema`.
- No `LeadForm` component tests.

**Usage**: `ContactForm` wired to `submitContact` in `apps/firm-website/src/app/contact/page.tsx` and `apps/firm-website/src/app/contact/actions.ts`. `LeadForm` not imported or rendered in `apps/firm-website`.

**Observations**:
- Duplicate `contactFormSchema` / `contactSchema` is the main maintenance risk; tests cover both, so edits to one must be mirrored to the other or the unused file removed.
- `LeadForm` is dead code in the app and off-brand: hard-coded `gray-*`/`blue-500`/`emerald-*`/`red-500` colors and first-person copy ("we will get back to you", "We have received your request") — violates the no-`we/us/our` voice rule.
- `packages/forms/tsconfig.json` includes `src/**/*` without excluding test directories, so `__tests__/` and `schemas/*.test.ts` are typechecked; currently passes.
- Package-level `pnpm --filter @ydm-agency/forms test` currently has 2 failing `ContactForm` cases (timeout on `calls onSubmit with correct data on valid fill`, missing success-panel text match on `shows success message after onSubmit resolves with success`). The same tests pass when run from the root `vitest.config.ts` (Section 5.1).

**Analysis**: Contact form validation, accessibility, and backend integration logic are solid. Priority fixes: consolidate the duplicate contact schema; either remove `LeadForm` or restyle/rewrite it to match the design system and voice; fix package-level `ContactForm` test execution.

### 3.4 @ydm-agency/analytics

**Purpose**: Consent-gated analytics loading and event tracking for GA4, PostHog, and Meta Pixel.

**Exports** (`packages/analytics/src/index.ts`): `AnalyticsProvider`/`AnalyticsProps`, `trackEvent`/`TrackEventOptions`.

**`AnalyticsProvider`** (`packages/analytics/src/Analytics.tsx`):
- Client component using `useConsent` from `@ydm-agency/ui`.
- Conditionally renders `next/script` snippets for GA4, PostHog, and Meta Pixel only when `analyticsConsent` is `true` and the corresponding ID prop is non-empty (`gaId`, `posthogKey`, `metaPixelId`).
- On consent, calls `window.gtag('consent', 'update', { analytics_storage: 'granted' })` if `gtag` exists; no-op otherwise.

**`trackEvent`** (`packages/analytics/src/events.ts`):
- Guards: `typeof window !== 'undefined'` and `ydm-analytics-consent=accepted` cookie read.
- Dispatches `CustomEvent('ydm_analytics_event')` with `detail: { eventName, properties, timestamp }`.
- Pushes to `gtag('event', ...)` if `gtag` is a function; `posthog.capture(...)` if `posthog.capture` exists; `fbq('trackCustom', ...)` if `fbq` is a function.
- Logs in development via `process.env.NODE_ENV`.
- `TrackEventOptions.properties` is `Record<string, any>`.

**Dependencies** (`packages/analytics/package.json`):
- Runtime: `react`, `next`, `@ydm-agency/ui`.
- Dev: `@ydm-agency/config`, `@types/node`, `@types/react`, `typescript`.

**Scripts**: `lint`, `typecheck`; no tests. `pnpm --filter @ydm-agency/analytics lint` fails because `packages/analytics/eslint.config.mjs` is missing. `typecheck` passes.

**Usage**:
- `AppProviders` (`apps/firm-website/src/app/providers.tsx`) wraps `AnalyticsProvider` inside `CookieConsentProvider`; all ID props are empty strings (`gaId=""`, `posthogKey=""`, `metaPixelId=""`).
- `trackEvent` is used in:
  - `packages/forms/src/ContactForm.tsx` — `form_submission`.
  - `packages/forms/src/LeadForm.tsx` — `lead_form_submitted` (LeadForm unused in `apps/firm-website`).
  - `apps/firm-website/src/app/education/EducationAnalytics.tsx` — `lesson_view`, `topic_view`, `education_search`, `lesson_filter`.
  - `apps/firm-website/src/app/education/EducationSearch.tsx` — `education_search`.
  - `apps/firm-website/src/app/education/SocialShare.tsx` — `lesson_share_link_copy`, `lesson_share`.
  - `apps/firm-website/src/app/education/LessonFilter.tsx` — `lesson_filter`.
  - `apps/firm-website/src/components/PricingEstimator.tsx` — `pricing_estimator_started`, `pricing_estimator_step_changed`, `pricing_estimator_restarted`, `pricing_estimator_completed`, `pricing_estimator_cta_clicked`.

**Observations**:
- Analytics are effectively disabled by the empty provider IDs.
- `AnalyticsProvider` uses `dangerouslySetInnerHTML` for all three provider init snippets. The current CSP (`script-src 'self' https://www.googletagmanager.com https://va.vercel-scripts.com`) blocks all inline scripts and `https://connect.facebook.net`; `connect-src` is not explicitly set, so it falls back to `default-src 'self'`, blocking API POSTs to GA/PostHog/Meta even if the scripts were allowed.
- No package or app listens for the `ydm_analytics_event` custom event.
- `trackEvent` re-reads the consent cookie directly instead of using `useConsent` or a cookie helper; relies on type-unsafe `window as any` access to `gtag`, `posthog`, and `fbq`.
- No tests cover consent gating, script injection, or event dispatch.

**Analysis**: Consent-gating design is correct, but the package is not wired to production IDs, the CSP blocks the scripts it would inject, and the `lint` script is broken. Needs ID configuration, CSP updates, an ESLint config, and tests.

### 3.5 @ydm-agency/seo

**Purpose**: Next.js metadata generation and JSON-LD structured data helpers.

**Exports** (`packages/seo/src/index.ts`): `constructMetadata`/`MetadataOptions`, `OrganizationJsonLd`/`OrganizationJsonLdProps`, `ServiceJsonLd`/`ServiceJsonLdProps`, `FaqPageJsonLd`/`FaqPageJsonLdProps`/`FaqPageJsonLdItem`.

**`constructMetadata`** (`packages/seo/src/constructMetadata.ts`):
- Returns a Next.js `Metadata` object from `title`, `description`, `image`, `icons`, `noIndex`, `canonicalUrl`, `siteName`.
- Defaults: title `YDM Agency | Digital Growth & Native Web Applications`, description `Data-driven marketing, ultra-fast web development, and client conversion systems for ambitious businesses.`, image `/og-image.png`, icons `/favicon.ico`, siteName `YDM Agency`.
- `metadataBase` set to `canonicalUrl ?? (process.env.NEXT_PUBLIC_SITE_URL || 'https://ydm-agency.com')`.
- OpenGraph and Twitter `summary_large_image` with creator `@ydmagency`.
- `noIndex` sets `robots: { index: false, follow: false }`; does not set `alternates.canonical`.

**JSON-LD helpers** (`packages/seo/src/JsonLd.tsx` and `FaqPageJsonLd.tsx`):
- `OrganizationJsonLd` — `Organization` schema with `name`, `url`, optional `logo`, `sameAs`, `contactPoint` (`email`, `contactType`).
- `ServiceJsonLd` — `Service` schema with `name`, `description`, `url`, optional `provider` (defaults to `YDM Agency` / `https://ydm-agency.com`).
- `FaqPageJsonLd` — `FAQPage` schema from `mainEntity` array of `{ question, answer }`.

**Dependencies** (`packages/seo/package.json`):
- Runtime: `next`, `react`.
- Dev: `@ydm-agency/config`, `@types/react`, `typescript`.

**Scripts**: `lint`, `typecheck`; no tests. `pnpm --filter @ydm-agency/seo lint` fails because `packages/seo/eslint.config.mjs` is missing. `typecheck` passes.

**Usage**:
- `constructMetadata` in root `layout.tsx` and 21 page metadata exports: `/about`, `/audit`, `/blog`, `/blog/[slug]`, `/contact`, `/education`, `/education/[topic]`, `/education/[topic]/[slug]`, `/education/paths`, `/education/paths/[slug]`, `/privacy`, `/services`, `/services/process`, `/services/pricing`, `/services/compare`, `/services/industries`, `/services/industries/[slug]`, `/services/[slug]`, `/services/[slug]/deliverables`, `/services/[slug]/faq`, `/services/[slug]/process`. The homepage (`/`) has no page-level metadata and inherits from `layout.tsx`.
- `OrganizationJsonLd` in `layout.tsx` with name `YDM Agency`, url `https://ydm-agency.com`, logo `https://ydm-agency.com/logo.png`, contact point `contact@ydmagency.com` / `Customer Support`.
- `ServiceJsonLd` in `/services/[slug]/page.tsx`.
- `FaqPageJsonLd` in `/services/[slug]/faq/page.tsx`.

**Observations**:
- `constructMetadata` defaults to `/og-image.png` and `/favicon.ico`; neither exists in `apps/firm-website/public/` (only `fonts/` and `noise.svg`).
- `OrganizationJsonLd` references `https://ydm-agency.com/logo.png`, also not in `public/`.
- No page passes `canonicalUrl`, `image`, or `icons`. `metadataBase` still falls back to `https://ydm-agency.com`, so the default image/icon URLs resolve there and 404.
- Error-state metadata is inconsistent: `services/[slug]/page.tsx` and `services/industries/[slug]/page.tsx` return `{}` for unknown slugs; `services/[slug]/{faq,deliverables,process}/page.tsx` return `constructMetadata({ title: 'Service Not Found' })`.
- No unit tests for metadata construction or JSON-LD output.

**Analysis**: Clean, well-typed SEO helper with broad route coverage and three JSON-LD variants. Main gaps: missing static assets (`og-image.png`, `favicon.ico`, `logo.png`), no explicit canonical link tag, inconsistent not-found metadata, missing ESLint config, and no tests.

### 3.6 @ydm-agency/email

**Purpose**: React Email templates and Resend-based sending for contact/audit form submissions.

**Exports** (`packages/email/src/index.ts`): `AcknowledgmentEmail`, `NotificationEmail`, `sendEmail`, `SendEmailOptions`, `SendEmailResult`.

**`SendEmailOptions`**: `name: string`, `email: string`, `projectType?: string`, `message: string`.

**Templates**:
- **AcknowledgmentEmail** (`src/AcknowledgmentEmail.tsx`) — dark-themed (`#0A0A0B` background, `#161618` container, `#3B82F6` signature) with heading `Got your message — YDM Agency`; confirms receipt and the 2-hour reply promise.
- **NotificationEmail** (`src/NotificationEmail.tsx`) — dark-themed internal summary with sections for name, email, optional `projectType`, message; `#3B82F6` labels.

**`sendEmail`** (`src/index.ts`):
- Creates `new Resend(process.env.RESEND_API_KEY)` per call.
- Returns `{ success: false, error: 'RESEND_API_KEY not configured' }` if the key is missing.
- Renders both templates with `@react-email/render`.
- Sends acknowledgment to `options.email` and notification to `contact@ydmagency.com` in parallel via `Promise.allSettled`.
- Logs rejected Resend sends to the console but returns `{ success: true }` if no exception is thrown.
- Catches unexpected render/send errors and returns `{ success: false, error: 'Failed to send emails' }`.

**Dependencies** (`packages/email/package.json`):
- Runtime: `resend`, `@react-email/components`, `@react-email/render` (`^0.0.12`).
- Peer: `react`.
- Dev: `@ydm-agency/config`, `@types/node`, `@types/react`, `typescript`.

**Scripts**: `lint`, `typecheck`, `build` (`tsc`).
- `lint` fails because `packages/email/eslint.config.mjs` is missing.
- `typecheck` and `build` pass, but `build` produces no `dist/` because the inherited `tsconfig.base.json` sets `noEmit: true`; the repo relies on Next.js `transpilePackages`.

**Usage**: `sendEmail` is used by `/contact` and `/audit` Server Actions; `@ydm-agency/email` is a dependency of `apps/firm-website` and is in `transpilePackages`.

**Observations**:
- No tests.
- `from` is `YDM Agency <noreply@ydmagency.com>`; internal `to` is `contact@ydmagency.com`.
- Rate limiting and Supabase storage live in `/contact`'s Server Action, not here.

**Analysis**: Clean React Email templates and Resend wrapper, actively used end-to-end by `/contact` and `/audit`. Main gaps: missing ESLint config, build is a no-op, no tests.

### 3.7 @ydm-agency/config

**Purpose**: Shared base configuration files consumed by `apps/firm-website` and workspace packages.

**Package** (`packages/config/package.json`): No scripts. `devDependencies`: `@eslint/js`, `eslint`, `eslint-config-next`, `eslint-config-prettier`, `eslint-plugin-react`, `typescript`, `typescript-eslint`, `tailwindcss`, `prettier`, `prettier-plugin-tailwindcss`. `files` field: `eslint-next.js`, `eslint-react.js`, `eslint-ui.config.mjs`, `nextjs.js`, `prettier.js`, `tailwind.js`, `tsconfig.base.json`. No `main`/`types` entry; configs consumed by direct import.

**Configs**:
- `tsconfig.base.json` — strict TS: `target: ES2022`, `lib: ["ES2022"]`, `module: ESNext`, `moduleResolution: bundler`, `resolveJsonModule`, `allowJs`, `strict`, `noEmit`, `esModuleInterop`, `skipLibCheck`, `forceConsistentCasingInFileNames`, `isolatedModules`, `incremental`, Next.js TS plugin.
- `tailwind.js` — design tokens as CSS variables (`background`, `surface`, `text-primary`, `text-secondary`, `accent`, `accent-hover`, `border`, `error`, `success`), `fontFamily.display` (`var(--font-display)` + `fontFamily.serif` fallback), `fontFamily.sans` (`var(--font-sans)` + `fontFamily.sans` fallback). Content: consuming app `./src/**/*.{js,ts,jsx,tsx,mdx}` and `../../packages/{ui,forms,analytics,seo}/src/**/*`.
- `nextjs.js` — `reactStrictMode: true`, `transpilePackages` lists all six active workspace packages (`@ydm-agency/config` correctly excluded).
- `eslint-next.js` — `.eslintrc` format; extends `next/core-web-vitals` + `prettier`; turns off `@next/next/no-html-link-for-pages`.
- `eslint-react.js` — `.eslintrc` format; extends `eslint:recommended`, `plugin:react/recommended`, `prettier`; React version `detect`; `react/react-in-jsx-scope` and `react/prop-types` off.
- `eslint-ui.config.mjs` — flat config for package source; uses `@eslint/js`, `typescript-eslint`, `eslint-plugin-react`, `prettier`; `jsx` parser; React version `detect`; `react/react-in-jsx-scope` and `react/prop-types` off; ignores `_`-prefixed unused vars; disables `@typescript-eslint/no-empty-object-type`.
- `prettier.js` — `prettier-plugin-tailwindcss`, single quote, semicolons, tab width 2, `trailingComma: 'es5'`, `printWidth: 100`.

**Consumption**:
- `apps/firm-website/.eslintrc.js` → `require('@ydm-agency/config/eslint-next.js')`.
- `packages/ui/eslint.config.mjs` and `packages/forms/eslint.config.mjs` → `import uiConfig from '@ydm-agency/config/eslint-ui.config.mjs'`.
- `packages/analytics`, `packages/seo`, `packages/email`, `packages/utils` have `lint` scripts but no ESLint config; their lint commands fail.

**Observations**:
- Tailwind design tokens rely on CSS variables defined in `apps/firm-website/src/app/globals.css`; the config itself does not set values.
- Tailwind `content` glob does not include `packages/email` or `packages/utils` (acceptable: `email` uses inline styles, `utils` has no JSX).
- **Bug**: `tailwind.js` sets `fontFamily.display` fallback to `fontFamily.serif`; `ClashDisplay` is a sans-style variable font, so the fallback should be `fontFamily.sans`.
- `globals.css` hard-codes a fallback `font-family` on `body`; because `layout.tsx` applies the `font-sans` class, the Tailwind stack takes precedence (class specificity > element selector). The rule is redundant design-system drift, not an active override.
- Only `apps/firm-website`, `packages/ui`, and `packages/forms` currently wire their `lint` script to a shared config; `packages/analytics`, `packages/seo`, `packages/email`, and `packages/utils` still have broken lint.
- `eslint-react.js` is not imported by any package; `apps/firm-website` uses `eslint-next.js` and `packages/ui`/`packages/forms` use `eslint-ui.config.mjs`.

**Analysis**: Solid centralized config. The new `eslint-ui.config.mjs` is a good flat-config addition, but most packages still lack package-level configs to consume it. The `fontFamily.display` fallback is a real bug; the `body` font-family is redundant but not overriding.

---
## 4. Content Management

### 4.1 Services Configuration

**File**: `apps/firm-website/src/lib/services-config.ts` (1089 lines)

**Structure**: Single module exporting `ProcessPhase`, `Deliverable`, `ServiceConfig`, and `SERVICES_CONFIG: Record<string, ServiceConfig>`.

**Types**:
- `ProcessPhase` — `phase` number, `title`, `duration`, `description`.
- `Deliverable` — `title`, `description`, `output`, `timeline`, `outcome`.
- `ServiceConfig` — `slug`, `h1`, `subhead`, `problemSolution`, `included[]`, `whoItsFor`, `howItFits[]` (cross-service `{label, href}`), `workingWithYdm`, `faqs[]` (`{q, a}`), `finalCtaText`, `metaTitle`, `metaDescription`, `processPhases[]`, `deliverables[]`.

**Services** (8):
- `web-design` — full site builds/redesigns.
- `seo` — search + AI search optimization.
- `analytics` — tracking, conversion reporting.
- `paid-ads` — Google/Meta ad management.
- `branding` — positioning and visual identity.
- `content` — copy and blog content.
- `automation` — CRM/automation.
- `reputation` — GBP and review management.

**Usage** (files importing `SERVICES_CONFIG`):
- `services/[slug]/page.tsx` — SSG params, metadata, full service detail rendering.
- `services/[slug]/deliverables/page.tsx` — SSG params, metadata, service-specific deliverables page.
- `services/[slug]/faq/page.tsx` — SSG params, metadata, grouped service FAQs.
- `services/[slug]/process/page.tsx` — SSG params, metadata, service-specific process page.
- `services/pricing/page.tsx` — Iterates `Object.keys(SERVICES_CONFIG)`; renders `config.included` and `PRICING_DETAILS[slug]` per service card.
- `services/industries/[slug]/page.tsx` — Uses `SERVICES_CONFIG[rec.service].h1` for recommended-service link text.
- `sitemap.ts` — `Object.keys(SERVICES_CONFIG)` for service, process, deliverables, and FAQ spoke URL generation.
- `lib/faq-utils.ts` — `SERVICES_CONFIG[slug].faqs` for FAQ grouping (`groupServiceFaqs`), contextual FAQ selection (`getContextualFaqs`), and `SERVICES_CONFIG[slug]?.h1` for answer-engine FAQ generation (`getAnswerEngineFaqs` / `getAllServiceFaqs`).
- `components/ServiceSubnav.tsx` — Four-tab sub-navigation (Overview, What You Get, Process, FAQ); does not import `SERVICES_CONFIG` directly (receives `slug` prop).
- **Not** consumed by `/services` hub (`services/page.tsx` uses `SERVICE_LABELS` / `SERVICE_CARD_DESCRIPTIONS` from `service-labels.ts`) or `/services/process` hub (defines its own `PHASES` array) — duplication/inconsistency risk.

**Observations**:
- Content per service is comprehensive: problem/solution, inclusions, deliverables (with output, timeline, and outcome for each), audience, cross-service links, working-with-YDM, FAQs, process timeline, and metadata.
- All 8 services have fully written `problemSolution` copy; none are empty.
- All copy uses an impersonal, firm-level voice and customer-second-person (`your`, `you'll`) with no first-person pronouns.
- The single-file format (1089 lines) is convenient but large; splitting into per-service modules would reduce merge conflicts and improve maintainability.

**Analysis**: Well-typed, comprehensive content system. Main issues are the monolithic file and the lack of reuse with the service/process hub pages.

### 4.2 Blog & Education Configuration

**Files**:
- `apps/firm-website/src/lib/blog-config.ts`
- `apps/firm-website/src/lib/education-config.ts`

**`blog-config.ts`**:
- Exports `BlogPost` interface with `slug`, `title`, `summary`, `category` (`'Opinion' | 'Analysis' | 'News' | 'Essay'`), `contentType`, `publishedAt`, `readTime`, `featured?`, `author?` (`name`, `role`, `photo?`, `bio?`), `pullQuote?`, `sections?` (`heading`, `body`, `type?`), `metaTitle`, and `metaDescription`.
- Contains 3 sample blog posts.
- Drives `/blog` hub (`blog/page.tsx`) and `/blog/[slug]` detail pages (`blog/[slug]/page.tsx`) with `generateStaticParams` and per-post metadata.

**`education-config.ts`**:
- Exports `EducationTopic` interface (defined in this file) and re-exports `EducationLessonSection`, `EducationLesson` from `./education/types`. Helpers: `getLessonsByTopic`, `getLessonBySlug`, `getTopicsFromLessons`, `getTopicBySlug`, `getRelatedLessons`, `getAdjacentLessons`.
- `EducationLesson` includes `slug`, `title`, `summary`, `topic`, `level` (`'Beginner' | 'Intermediate' | 'Advanced'`), `readTime`, `attribution`, `safety` (`'public-domain' | 'cite-creator' | 'extra-care'`), `metaTitle`, `metaDescription`, `learningOutcome`, `sections`, and `lastUpdated?`.
- `EducationTopic` includes `slug`, `name`, `description`, `icon` (Lucide icon name), and `order`.
- Topic files in `apps/firm-website/src/lib/education/`: `seo-lessons.ts`, `conversion-lessons.ts`, `foundations-lessons.ts`, `strategy-lessons.ts`, `compliance-lessons.ts`, each with a `-new` counterpart (e.g. `seo-lessons-new.ts`) imported and concatenated by `education-config.ts` — an active content-expansion pass, not dead code.
- **47 lessons** across 5 topics: SEO 11 (2+9), Conversion 9 (1+8), Foundations 9 (1+8), Strategy 9 (1+8), Compliance 9 (1+8) — original + `-new` counts shown.
- `learning-paths.ts` exports `LearningPath` interface (`slug`, `title`, `description`, `lessonSlugs: string[]`), `LEARNING_PATHS` array (4 paths: "Build Your First Marketing Stack in a Weekend", "The Ethical Marketer's Toolkit", "From Zero to Ranked: A 6-Week SEO Plan", "Launching Your Next Product Without Legal Nightmares"), and `getLearningPathBySlug` helper.
- Drives `/education` hub (`education/page.tsx`), `/education/[topic]` topic pages, `/education/[topic]/[slug]` detail pages, `/education/paths` hub, and `/education/paths/[slug]` learning path detail pages. `generateStaticParams` is implemented on topic, lesson detail, and learning path detail pages. Article JSON-LD (inline `Article` schema via `dangerouslySetInnerHTML`) is rendered ONLY on the lesson detail pages (`/education/[topic]/[slug]`), not on learning path detail pages.

**Attribution & safety model**:
- `safety` categorizes lessons by sharing risk.
- `attribution` is a short text note (no URLs) naming originators/creators where relevant (e.g., "SMART goals framework — George T. Doran, Management Review, 1981", "BCG Growth-Share Matrix — Bruce Henderson, Boston Consulting Group, circa 1968-1970"). Displayed on lesson heroes (`[topic]/[slug]/page.tsx`), topic listing cards (`TopicContent.tsx`), and search results (`EducationSearch.tsx`) — NOT on the education hub page.
- Framework content includes originators, creators, and trademark symbols (e.g., SOSTAC®). No source hyperlinks are present in any education content file.

### 4.3 Content Voice

**Guideline** (per `AGENTS.md`): Impersonal firm-level voice — "YDM Agency builds..." — with no `we/us/our`; professional, direct, benefit-focused.

**Observations**:
- `services-config.ts` and the spoke detail/process pages follow the guideline: third-person/firm references ("YDM Agency", "the firm"), passive/benefit-driven descriptions, and customer-second-person (`your`, `you’ll`). The config does contain 4 first-person pronouns, all in quoted customer-voice text where "we/us" refers to the customer's business, not YDM Agency: FAQ questions `"I don't have any tracking set up right now — where do we start?"` (line 342) and `"I already have a CRM I'm not using — do we start over?"` (line 861), and feature/deliverable descriptions `"Automatic 'how did you hear about us' insight"` (lines 326, 386). YDM Agency itself never speaks in first person in the config.
- `education-config.ts` and `blog-config.ts` themselves contain no first-person pronouns. `blog-config.ts` lesson content follows the firm-level voice. The original education lesson files (`*-lessons.ts`) also have zero first-person pronouns. However, the `-new` lesson expansion files contain 24 first-person pronouns across `strategy-lessons-new.ts` (12), `foundations-lessons-new.ts` (6), `conversion-lessons-new.ts` (3), and `seo-lessons-new.ts` (3) — all in illustrative example text showing what a hypothetical business owner might say (e.g., `"We want more people to know about us"`, `"we just need more leads"`). These are pedagogical examples, not YDM Agency speaking in first person.
- `apps/firm-website/src/app/page.tsx` breaks the rule in the 3-step process section: headings are **"We talk.", "We build.", "We deliver."** (lines 117, 127, 138). These are the only first-person pronouns on the homepage.
- `packages/forms/src/LeadForm.tsx` uses first-person copy in three places: default subtitle **"Fill out the form below and we will get back to you within 24 hours."** (line 17), success message **"We have received your request. A team member will review your details and be in touch shortly."** (line 87), and message field placeholder **"Tell us about your project requirements or growth goals..."** (line 178).
- `apps/firm-website/src/app/privacy/page.tsx` uses `we`/`us` throughout legal copy ("YDM Agency ('the firm,' 'we,' 'us') operates this website...", line 18), which is conventional for privacy policies but still a first-person exception to the site-wide voice.
- Verified clean (no first-person pronouns): `about`, `services` hub, `services/process` hub, `services/[slug]` (page/process/deliverables/faq), `services/compare`, `services/pricing`, `services/industries` (both pages), `blog` hub, `blog/[slug]` detail, `education` hub, `education/[topic]`, `education/[topic]/[slug]`, `education/paths` (both pages), `contact` page, `audit` page, `ContactForm.tsx`, `AuditForm.tsx`, `Header.tsx`, `Footer.tsx`, `layout.tsx`, and all `@ydm-agency/email` templates.

**Analysis**: The firm-level voice is well-maintained across most pages and components. The clear violations are the homepage process headings ("We talk./We build./We deliver.") and `LeadForm` copy (subtitle, success message, and placeholder). The privacy policy first person is a common legal exception. The first-person pronouns in `services-config.ts` FAQ questions and `-new` education lesson examples are customer-voice/pedagogical quotations, not firm-voice violations — but the `LeadForm` and homepage instances should be rewritten to maintain consistency.

### 4.4 Supporting Service Content Configs

Six additional content modules in `apps/firm-website/src/lib/` support the service-page ecosystem alongside `services-config.ts` (Section 4.1). All are typed TypeScript exports with no runtime dependencies beyond each other and `services-config.ts`.

**`service-labels.ts`** (21 lines):
- Exports `SERVICE_LABELS: Record<string, string>` (8 slug→display-label mappings, e.g. `'web-design': 'Website Design & Development'`) and `SERVICE_CARD_DESCRIPTIONS: Record<string, string>` (8 slug→one-sentence card descriptions).
- Consumed by: `/services` hub (both), `/services/compare` (`SERVICE_LABELS`), `/services/pricing` (`SERVICE_LABELS`), `/services/industries/[slug]` (`SERVICE_LABELS`), `pricing-config.ts` (`SERVICE_LABELS` for titles), `pricing-estimator.ts` (`SERVICE_LABELS` for titles).
- This is the canonical service-name source; `services-config.ts` does not export labels, so any page needing a service display name imports from here.

**`industries-config.ts`** (155 lines):
- Exports `IndustryConfig` interface (`slug`, `h1`, `subhead`, `problemSolution`, `commonChallenges[]`, `recommendedServices[]` (`{service, reason}`), `whoItsFor`, `industrySpecific`, `faqs[]` (`{q, a}`), `finalCtaText`, `metaTitle`, `metaDescription`) and `INDUSTRIES_CONFIG: Record<string, IndustryConfig>`.
- 3 industries: `professional-services` (law/accounting/consulting), `home-services` (plumbing/HVAC/electrical), `solopreneurs` (day care/salons/tattoo studios).
- Each industry has 4 `recommendedServices` referencing valid `SERVICES_CONFIG` slugs (validated by `industries-config.test.ts`), 5 FAQs, and full metadata.
- Consumed by: `/services/industries/[slug]` (SSG via `generateStaticParams` over `Object.keys(INDUSTRIES_CONFIG)`, `generateMetadata`, full industry detail rendering with `SERVICES_CONFIG[rec.service].h1` for recommended-service links).
- **Not** consumed by `/services/industries` hub — that page defines its own inline `INDUSTRY_CARDS` array (3 cards with slug, title, description, icon, subIndustries). Duplication risk: the hub's titles/descriptions are hand-written and could drift from `INDUSTRIES_CONFIG`.

**`pricing-config.ts`** (109 lines):
- Exports `ServicePricingDetails` interface (`slug`, `title`, `startingRange`, `extras[]`, `minimumBudgetNote?`) and `PRICING_DETAILS: Record<string, ServicePricingDetails>` (8 entries, one per service).
- `title` is sourced from `SERVICE_LABELS[slug]`; `startingRange` is a plain-text range string (e.g. `'$5,000–$12,000'`); `extras` lists 4 add-on categories per service; `minimumBudgetNote` is set only on `paid-ads`.
- Consumed by: `/services/pricing` (iterates `Object.keys(SERVICES_CONFIG)`, renders `config.included` from `SERVICES_CONFIG` and `PRICING_DETAILS[slug]` per card).

**`service-comparison-config.ts`** (91 lines):
- Exports `ServiceComparisonScenario` interface (`id`, `title`, `description`, `primaryService`, `alsoConsider[]`, `startingPoint`), `COMPARISON_SCENARIOS: ServiceComparisonScenario[]` (8 scenarios), `FitLevel` type (`'Best fit' | 'Also consider' | '—'`), and `getFitLevel(scenario, slug)` helper.
- 8 scenarios map to the 8 services as `primaryService` (e.g. `'no-website'→'web-design'`, `'low-traffic'→'seo'`), each with 2–3 `alsoConsider` services and a `startingPoint` CTA.
- Consumed by: `/services/compare` (scenario cards + 8×8 fit matrix using `getFitLevel`), `pricing-estimator.ts` (`getDefaultServicesForSituation`, `getPrimaryScenarioForService`, `getEstimateHref`).

**`pricing-estimator.ts`** (499 lines):
- Exports 11 interfaces (`EstimatorService`, `EstimatorExtra`, `EstimatorInputs`, `EstimateItem`, `EstimateBucket`, `EstimateResult`, `BusinessSizeOption`, `TimelineOption`, etc.), 4 data arrays (`ESTIMATOR_SERVICES` (8), `ESTIMATOR_EXTRAS` (10), `BUSINESS_SIZE_OPTIONS` (3), `TIMELINE_OPTIONS` (3)), and 10 helper functions.
- `ESTIMATOR_SERVICES` mirrors the 8 services with `baseLow`/`baseHigh` numeric ranges (matching `pricing-config.ts` ranges), `isMonthly` flag, `description`, and `included[]` list.
- `ESTIMATOR_EXTRAS` defines 10 add-on categories (copywriting, photography, ecommerce-booking, advanced-integrations, landing-pages, multi-location, ad-spend, ongoing-care, video-motion, seo-audit), each with `appliesTo[]` service-slug list.
- `BUSINESS_SIZE_OPTIONS` multipliers: solo 0.85, small 1.0, multi 1.25. `TIMELINE_OPTIONS` multipliers: flexible 0.95, standard 1.0, rush 1.15.
- `calculateEstimate(inputs)` applies multipliers to service base ranges (not to extras), splits results into `oneTime` and `monthly` buckets.
- `buildContactMessage(inputs, result)` generates a pre-filled contact form message from estimator selections; `getProjectTypeForContact(services)` maps service selections to contact form's `project_type` field (`'website' | 'traffic-leads' | 'other'`).
- Consumed by: `components/PricingEstimator.tsx` (client component, `'use client'`), which renders the interactive estimator on `/services/pricing` and deep-links to `/contact` with pre-filled message and project type.
- Tested by `pricing-estimator.test.ts` (Vitest).

**`faq-utils.ts`** (440 lines):
- Exports `FaqItem`, `FaqGroup` interfaces; `groupServiceFaqs(faqs)` (classifies FAQs into 6 themes — Pricing, Timeline, Scope, Prerequisites, Compliance, General — via keyword matching on question text), `getAnswerEngineFaqs(slug)` (generates 5 synthetic FAQs per service from a `SERVICE_ANSWERS` content table), `getAllServiceFaqs(slug)` (combines real config FAQs + answer-engine FAQs), `getContextualFaqs(slug, context, limit)` (scores and selects top FAQs for `'overview'` or `'process'` context via weighted keyword matching).
- `SERVICE_ANSWERS: Record<string, AnswerEngineAnswers>` is a significant content table (8 services × 5 answers each = 40 hand-written answer strings covering cost, timeline, scope, prerequisites, and comparison). This content is NOT in `services-config.ts` — it is unique to `faq-utils.ts`.
- `SERVICE_TITLES` (8 entries) duplicates `SERVICE_LABELS` from `service-labels.ts` with slight formatting differences (e.g. `'SEO and AI search optimization'` vs `'SEO & AI Search Optimization'`) — minor inconsistency risk.
- Consumed by: `/services/[slug]/faq` (`getAllServiceFaqs` + `FaqPageJsonLd` over all questions), `/services/[slug]` (`getContextualFaqs` with `'overview'` context), `/services/[slug]/process` (`getContextualFaqs` with `'process'` context).

**Inline content in hub pages** (duplication/inconsistency risks):
- `services/process/page.tsx` defines its own inline `PHASES` array (5 phases with `phase`, `title`, `description`, `whatYouReceive`), `SERVICE_PROCESS_LINKS` (8 hardcoded links), and `FAQS` (4 items) — does not import `SERVICES_CONFIG` or `faq-utils.ts`. The per-service `processPhases` in `services-config.ts` are separate from these hub-level phases.
- `services/industries/page.tsx` defines its own inline `INDUSTRY_CARDS` array (3 cards) — does not import `INDUSTRIES_CONFIG`. Titles and descriptions are hand-written and could drift from the config (see above).

**Analysis**: The supporting configs form a well-typed content layer that decouples display labels, pricing, comparison scenarios, and estimator logic from the main `services-config.ts`. Key observations: (1) `service-labels.ts` is the canonical label source but `faq-utils.ts` maintains a parallel `SERVICE_TITLES` with formatting drift; (2) two hub pages (`/services/process`, `/services/industries`) bypass their respective configs with inline content, creating the same duplication risk noted in Section 4.1 for the `/services` hub; (3) `faq-utils.ts` contains substantial unique content (`SERVICE_ANSWERS`) that is not documented anywhere else and drives the answer-engine FAQ generation and `FAQPage` JSON-LD on the FAQ spoke pages.

---

## 5. Testing Infrastructure

### 5.1 Test Stack & Orchestration

- **Unit/Integration runner**: Vitest 2.1.9 (`vitest` catalog ^2.0.0) + `@testing-library/react` 16.3.2 + `@testing-library/jest-dom` 6.9.1 + `@testing-library/user-event` 14.6.1 + `jest-axe` 9.0.0 (root-only dependency, used by `packages/ui/src/Button.test.tsx` without being declared in that package — see Section 3.1) + `@vitest/coverage-v8` 2.1.9 + `@vitest/ui` 2.1.9 + `@vitejs/plugin-react` 4.7.0 + `jsdom` 25.0.1 (all root devDependencies); `jsdom` environment; `packages/ui`, `packages/forms`, and `packages/design-system` each have `src/__tests__/setup.ts` containing `import '@testing-library/jest-dom'` (other packages with vitest configs — `branding`, `web-core` — have no `setupFiles`).
- **Root-level test config** (undocumented elsewhere): `vitest.config.ts` and `vitest.setup.ts` at the repo root run a separate workspace-wide test pass (`include: ['apps/**/*.{test,spec}.{ts,tsx}', 'packages/**/*.{test,spec}.{ts,tsx}']`), independent of each package's own `vitest.config.ts`. It aliases `@ydm-agency/{utils,ui,forms,analytics,email,seo,config,branding,firm-website}` + `@` to source and mocks `next/headers`, `next/navigation`, `next/cache`. `vitest.setup.ts` extends `expect` with both jest-dom matchers and `toHaveNoViolations` from jest-axe. Coverage config: `provider: 'v8'`, `reporter: ['text', 'html', 'lcov']`, `include: ['apps/*/src/**/*.{ts,tsx}', 'packages/*/src/**/*.{ts,tsx}']`, no thresholds configured. It explicitly excludes `packages/design-system/**` from both test execution and coverage — consistent with that package being excluded from the workspace entirely (Section 1.3). Note it aliases `@ydm-agency/branding` but not `@ydm-agency/web-core`.
- **E2E runner**: `@playwright/test` 1.62.1 (specifier ^1.48.0); config at repo root `playwright.config.ts`; `testDir: './e2e'`; Chromium-only; `fullyParallel: true`; `baseURL: 'http://localhost:3000'`; `trace: 'on-first-retry'`; HTML reporter; webServer `pnpm turbo run dev --filter=apps/firm-website` with `reuseExistingServer: !CI`; `retries: 1`, `workers: 1`, `forbidOnly` in CI.
- **Turbo pipeline**: `test` depends on `^build`, outputs `coverage/**`; `e2e` depends on `^build`, `cache: false`. Root `package.json` has `test` (`vitest`), `test:watch`, `test:ui`, `test:coverage` scripts but no `e2e` script; CI invokes `pnpm playwright test` directly after the build job.
- **Packages with `test` scripts**: `@ydm-agency/ui`, `@ydm-agency/forms`, `@ydm-agency/utils` (all `vitest run`; forms and utils also have `test:coverage`), plus the three orphaned packages (Section 1.3). `apps/firm-website` has `test` (`vitest run`) and `test:coverage` scripts, and four test suites in `src/lib/` — `audit-schema.test.ts` (338 lines, 40 cases incl. 3 `it.each`), `contrast.test.ts` (135 lines, 29 cases incl. 1 `it.each`), `industries-config.test.ts` (15 lines, 1 case), `pricing-estimator.test.ts` (152 lines, 17 cases) — but it lacks a dedicated `vitest.config.ts`. `@ydm-agency/analytics`, `@ydm-agency/email`, `@ydm-agency/seo` have none.
- **Vitest config inconsistency**: `packages/ui` and `packages/forms` each have their own `vitest.config.ts`; `packages/utils` and `apps/firm-website` do not. Running `pnpm --filter @ydm-agency/utils test` falls back to the root `vitest.config.ts` and executes the entire workspace suite rather than only the package's tests.

### 5.2 Test Coverage

- **`packages/ui`**: 5 files, 28 cases — `src/__tests__/Card.test.tsx` (3), `Badge.test.tsx` (4), `CookieConsent.test.tsx` (4), `Header.test.tsx` (8), and `src/Button.test.tsx` (9, not in `__tests__/`).
- **`packages/forms`**: 4 files in two locations — `src/__tests__/ContactForm.test.tsx` (5), `src/__tests__/schemas.test.ts` (7), `src/schemas/contact-schema.test.ts` (24, incl. 2 `it.each`), `src/schemas/lead-schema.test.ts` (26, incl. 2 `it.each`).
- **`packages/utils/src/*.test.ts`**: `cn.test.ts` (27, incl. 2 `it.each`), `formatCurrency.test.ts` (10, incl. 1 `it.each`), `formatDate.test.ts` (12) — 49 total (located in `src/`, not a `__tests__/` subdirectory).
- **`apps/firm-website/src/lib/`**: 4 files, 87 total cases — `audit-schema.test.ts` (338 lines, 40 cases for `auditFormSchema`, incl. 3 `it.each`), `contrast.test.ts` (135 lines, 29 WCAG contrast cases, incl. 1 `it.each` with 28 token-pair cases), `industries-config.test.ts` (15 lines, 1 case validating service slugs), `pricing-estimator.test.ts` (152 lines, 17 cases for `calculateEstimate`/`formatPriceRange`/`getDefaultServicesForSituation`/`getRelevantExtras`/`getProjectTypeForContact`/`buildContactMessage`).
- **Orphaned packages** (Section 1.3): `branding` — 1 file, 4 cases (`src/__tests__/tokens.test.ts`, 99 lines); `design-system` — 4 files, 22 cases (`Badge` 4, `Button` 11, `Card` 3, `CookieConsent` 4; near-duplicates of `packages/ui` tests); `web-core` — 4 files, 12 cases (`env` 4, `format` 4, `layout` 2, `meta` 2). None ship value since the packages aren't wired into the dependency graph.
- **E2E**: `e2e/` contains only `.gitkeep`; no specs, though the CI `e2e` job runs Playwright anyway.
- **Untested**: `@ydm-agency/analytics`, `@ydm-agency/email`, `@ydm-agency/seo`. No component or page tests in `apps/firm-website` — all 4 suites cover `src/lib/` config/schema/util modules only.

### 5.3 Gaps & Next Steps

- **E2E**: Add specs for contact form, navigation, cookie consent, service-spoke rendering — especially valuable given the Supabase env var bug (Section 2.4/7.1).
- **Unit tests**: Add tests for `analytics` consent/event dispatch, `email` template rendering and `sendEmail` outcomes, and `seo` metadata/JSON-LD output. `utils` is now covered.
- **App tests**: `apps/firm-website` has a `test` script and four `src/lib/` test files (audit-schema, contrast, industries-config, pricing-estimator) but no component or page tests; consider Next.js integration tests for SSG service/process pages and the home hero CTAs.
- **Coverage/CI**: No coverage thresholds or `coverage/` artifacts; root `package.json` lacks an `e2e` script despite `turbo.json` defining the task; CI never runs `pnpm turbo run test`, so none of the above unit tests (including the newer ones) are actually verified in CI.
- **Orphaned packages**: `branding`, `design-system`, and `web-core` (Section 1.3) have their own test suites but ship no value since the packages themselves aren't used — these should be deleted or the useful parts merged into the packages that are actually consumed.

---

## 6. CI/CD Pipeline

### 6.1 GitHub Actions

**File**: `.github/workflows/ci.yml`

**Triggers**: `pull_request`, `push` to `main`.

**Runner & package manager**: `ubuntu-latest`, Node.js 22, pnpm 9.15.0; `TURBO_TOKEN` / `TURBO_TEAM` set from `secrets`/`vars` for Remote Cache.

**Concurrency**: `group: ci-${{ github.ref }}`, `cancel-in-progress: true`.

**Change detection** (`changes` job):
- Uses `dorny/paths-filter@v3` to set `code` output.
- Watches `apps/**/*.ts`, `apps/**/*.tsx`, `packages/**/*.ts`, `packages/**/*.tsx`, `turbo.json`, `package.json`, `pnpm-lock.yaml`.

**Jobs** (all gated on `needs.changes.outputs.code == 'true'`):
1. **lint** — `pnpm install --frozen-lockfile` → `pnpm turbo run lint`.
2. **typecheck** — install → `pnpm turbo run typecheck` (`typecheck` depends on `^build` in `turbo.json`). Passes (verified: `10 successful, 10 total`, exit 0); `packages/ui/tsconfig.json` excludes `src/__tests__` and `src/**/*.test.tsx`, so `Button.test.tsx` is not typechecked. Turbo reports 10 in-scope workspaces (9 packages + `firm-website`; `design-system` is excluded from the pnpm workspace), but `@ydm-agency/config` has no `scripts` block so its `typecheck` is a `<NONEXISTENT>` no-op — only 9 actually execute `tsc --noEmit` (Section 3.1).
3. **build** — checkout with `fetch-depth: 2` → install → `pnpm turbo run build --filter='...[origin/main]'`.
4. **e2e** — needs `build` → install → `pnpm playwright install --with-deps chromium` → `pnpm playwright test`.

### 6.2 Turbo Pipeline & Scripts

- **`turbo.json` tasks**: `build` depends on `^build` and outputs `.next/**` (minus `!.next/cache/**`) and `dist/**`; `typecheck`, `test`, and `e2e` depend on `^build`; `lint` has no dependencies and `outputs: []`; `dev`, `clean`, and `e2e` set `cache: false`; `dev` is `persistent`.
- **Root `package.json` scripts** (10 total): `dev`→`turbo run dev`, `build`→`turbo run build`, `test`→`vitest`, `test:watch`→`vitest --watch`, `test:ui`→`vitest --ui`, `test:coverage`→`vitest run --coverage`, `lint`→`turbo run lint`, `typecheck`→`turbo run typecheck`, `clean`→`turbo run clean`, `format`→`turbo run format`.
- **Script/Task mismatches**:
  - `format` script calls `turbo run format`, but `turbo.json` has no `format` task; **verified failure** — `pnpm format` exits 1 with "Could not find task `format` in project".
  - `e2e` task exists in `turbo.json`, but root `package.json` has no `e2e` script; **verified** — `pnpm e2e` fails with "Command 'e2e' not found". CI calls `pnpm playwright test` directly instead of `turbo run e2e`.
- **CI does not run `test`**: the `test` Turbo task and root script both exist, but no CI job executes either. Note the root `test` script is `vitest` (root-level, uses root `vitest.config.ts` which globs `apps/**` and `packages/**`), **not** `turbo run test` (per-package) — the two are different execution models. `pnpm test` passes locally: 21 files, 242 tests (Section 5).
- **Playwright `webServer`**: `playwright.config.ts` starts the app via `pnpm turbo run dev --filter=apps/firm-website` against `http://localhost:3000`, `reuseExistingServer: !process.env.CI`. CI e2e therefore runs against the **dev server**, not a production build (build artifacts are not shared between CI jobs — each is a fresh runner).

### 6.3 Deployment & Release

- **No deployment workflow** in the repo (verified: `.github/workflows/` contains only `ci.yml`) and no `vercel.json`, `Dockerfile`, or release config anywhere in the tree.
- **Deployment target** per `AGENTS.md` is Vercel, but the repo only contains CI; deployment is presumed to be via the Vercel Git integration.
- **No staging/previews** or deploy artifact steps in CI; the `build` job runs `pnpm turbo run build --filter='...[origin/main]'` but does not upload or persist `.next` output.

### 6.4 Gaps & Next Steps

- **`e2e/` is empty** (only `.gitkeep`, 0 bytes) — the CI `e2e` job installs chromium and runs `pnpm playwright test` against 0 tests, making it an effective no-op that always passes. Writing actual E2E tests (contact form, navigation, cookie consent per `AGENTS.md`) is the prerequisite before the e2e job has value.
- Add a root `e2e` script or switch the CI `e2e` job to `pnpm turbo run e2e` (and decide whether e2e should run against a production build rather than the dev server).
- Resolve the `format` script by adding a `format` task to `turbo.json` (or remove the script) — currently `pnpm format` fails with exit 1.
- Add a CI `test` job. Decide between `pnpm test` (root vitest, already collects all 242 tests across apps + packages) and `pnpm turbo run test` (per-package); the root vitest approach is what `pnpm test` uses today.
- Add a deployment workflow or `vercel.json` if Vercel is the target, or document the manual/Vercel Git-based deploy process.

---

## 7. Environment Configuration

### 7.1 Environment Variables

**File**: `.env.example` (9 declared variables, grouped by category with comments; no values, only `your_*_here` placeholders).

**Declared variables** (by category):
- **Analytics (client-side, `NEXT_PUBLIC_`)**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_META_PIXEL_ID`.
- **Email (server secret)**: `RESEND_API_KEY`.
- **Database**: `NEXT_PUBLIC_SUPABASE_URL` (public-prefixed), `SUPABASE_SERVICE_ROLE_KEY` (server-only, no prefix).
- **Rate limiting (server secrets)**: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`.
- **Scheduling (client-side, `NEXT_PUBLIC_`)**: `NEXT_PUBLIC_CALENDLY_URL`.

**Actual code usage** (verified via `process.env.*` grep across `*.ts`/`*.tsx`/`*.js`/`*.mjs`):
- `RESEND_API_KEY` — consumed in `packages/email/src/index.ts` (instantiates `new Resend(...)` then null-checks; missing key returns `{ success: false, error: 'RESEND_API_KEY not configured' }`). Reached indirectly by both `contact/actions.ts` and `audit/actions.ts` via `sendEmail`.
- `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN` — read in `contact/actions.ts` via an explicit `process.env.* && process.env.*` guard that gates `Ratelimit` construction, and again implicitly via `Redis.fromEnv()` inside that branch. Missing → rate limiter is `null` and rate limiting silently no-ops.
- `NEXT_PUBLIC_CALENDLY_URL` — read in TWO components with divergent behavior:
  - `apps/firm-website/src/components/CalendlyWidget.tsx`: `process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/ydm-agency/project-consultation'` (hardcoded fallback, always renders).
  - `apps/firm-website/src/components/CalendlyEmbed.tsx`: `const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL` then `if (!CALENDLY_URL) return null` (renders nothing when unset). `CalendlyEmbed` is lazy-loaded by `CalendlySection.tsx` via `next/dynamic`.
- `NEXT_PUBLIC_SITE_URL` — read in `packages/seo/src/constructMetadata.ts` (`typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL ? ... : 'https://ydm-agency.com'`). **NOT declared in `.env.example`** — the only code-consumed env var with no corresponding entry. Used as `metadataBase` default for all `constructMetadata()` calls site-wide.
- `process.env.NODE_ENV` — used in `packages/analytics/src/events.ts` (`=== 'development'` gates `console.log` of tracked events).
- `process.env.CI` — used in `playwright.config.ts` (4 reads: `forbidOnly`, `retries` (1 vs 0), `workers` (1 vs undefined), `reuseExistingServer` (false vs true)).
- `AnalyticsProvider` (`packages/analytics/src/Analytics.tsx`) accepts `gaId`, `posthogKey`, `metaPixelId` as props and only emits the GA4/PostHog/Meta Pixel scripts when the prop is truthy AND `analyticsConsent === 'accepted'`. `apps/firm-website/src/app/providers.tsx` hardcodes all three to `''`, so no analytics script is ever emitted regardless of consent. No `NEXT_PUBLIC_GA_*` / `NEXT_PUBLIC_POSTHOG_*` / `NEXT_PUBLIC_META_*` env var is read anywhere in the codebase.

**BUG — Supabase env var name mismatch**: `.env.example` declares `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`, but `contact/actions.ts` reads `process.env.SUPABASE_URL` / `process.env.SUPABASE_ANON_KEY` — different names on both variables, matching nothing in `.env.example`. Effect: an environment provisioned strictly from `.env.example` leaves both vars `undefined`; the `supabaseUrl && supabaseAnonKey ? createClient(...) : null` guard then sets `supabase = null` and lead storage silently no-ops (the `if (supabase) { ... }` block is skipped without error). Fix: align names on one side, and decide whether a service-role key (bypasses RLS) or anon key (subject to RLS) is intended for server-side inserts into the `leads` table.

**`audit/actions.ts` has no backend integration**: unlike `contact/actions.ts`, the audit Server Action only calls `sendEmail` — no Supabase insert, no Upstash rate limiting, no env vars read directly. Audit submissions are therefore not rate-limited and not persisted.

**Build / cache dependencies**:
- `turbo.json` declares `globalDependencies: ['**/.env.*local']`, so changes to any `.env.*local` file invalidate the Turbo cache for all tasks.

**Security posture**:
- Server-only variables (`RESEND_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY` / the actually-read `SUPABASE_URL` & `SUPABASE_ANON_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) are documented without a `NEXT_PUBLIC_` prefix and are not exposed to the browser.
- `.gitignore` ignores `.env` and `.env*.local`; only `.env.example` is committed. No `.env.local`, `.env.*.local`, or real secrets are present in the repo.

### 7.2 Gaps & Next Steps

- **Fix the Supabase env var mismatch (highest priority)** — see 7.1 BUG. Either rename the reads in `contact/actions.ts` to `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`, or rename the declarations in `.env.example` to `SUPABASE_URL` / `SUPABASE_ANON_KEY`. Decide RLS posture (service-role vs anon) explicitly.
- **Declare `NEXT_PUBLIC_SITE_URL` in `.env.example`** — it is the only code-consumed env var absent from the file; `constructMetadata.ts` silently falls back to `https://ydm-agency.com` (note: that fallback domain does not match the business email domain `ydmagency.com`).
- **Analytics wiring**: read `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_META_PIXEL_ID` in `providers.tsx` and pass to `AnalyticsProvider` (currently hardcoded `''`). Note: even after wiring, the current CSP blocks the inline `dangerouslySetInnerHTML` scripts and the PostHog/Meta Pixel hosts (see Section 2.x / AGENTS.md).
- **Reconcile Calendly fallback behavior**: `CalendlyWidget.tsx` falls back to a hardcoded URL; `CalendlyEmbed.tsx` returns `null`. Pick one strategy so the embed is consistent across pages.
- **Add rate limiting + Supabase persistence to `audit/actions.ts`** to match `contact/actions.ts` posture, or document why audit is intentionally lighter.
- **Validation**: fail the build or log loudly when required server secrets are missing/misnamed in production, so the Supabase bug above can't silently ship again.

---

## 8. Build Configuration

### 8.1 TypeScript Configuration

**Base config** (`packages/config/tsconfig.base.json`):
- `target: ES2022`, `lib: [ES2022]`, `module: ESNext`, `moduleResolution: bundler`.
- `strict: true`, `noEmit: true`, `isolatedModules: true`, `incremental: true`.
- `allowJs: true`, `resolveJsonModule: true`, `esModuleInterop: true`, `skipLibCheck: true`, `forceConsistentCasingInFileNames: true`.
- Next.js TS plugin enabled.

**App config** (`apps/firm-website/tsconfig.json`):
- Extends `packages/config/tsconfig.base.json`.
- `jsx: preserve`, `outDir: dist`.
- Path alias `@/*` → `./src/*`.
- Includes `next-env.d.ts`, `**/*.ts`, `**/*.tsx`, `.next/types/**/*.ts`.

**Package configs** (`packages/{ui,forms,analytics,seo,email,utils}/tsconfig.json`):
- All extend the base config and set `outDir: dist`, `rootDir: src`.
- All non-`utils` packages add `jsx: react-jsx`. DOM libs are added by `ui` (`ES2022`, `DOM`, `DOM.Iterable`), `forms`/`analytics`/`email` (`dom`, `dom.iterable`, `esnext`); `seo` adds `jsx: react-jsx` but does NOT override `lib` (inherits `ES2022` from base, no DOM libs). `utils` has no JSX and no `lib` override.
- None override `noEmit: true`, so `tsc` typechecks without emitting; Next.js transpiles workspace packages directly.
- `packages/ui/tsconfig.json` excludes `src/__tests__` and `src/**/*.test.tsx`; other package configs do not exclude test files.

### 8.2 Tailwind Configuration

**Shared config** (`packages/config/tailwind.js`):
- Content globs: `./src/**/*.{js,ts,jsx,tsx,mdx}` plus `packages/{ui,forms,analytics,seo}/src/**/*.{js,ts,jsx,tsx}`.
- Theme extension maps design tokens to CSS variables: `background`, `surface`, `text-primary`, `text-secondary`, `accent`, `accent-hover`, `border`, `error`, `success`.
- Font families: `display` → `--font-display`, `sans` → `--font-sans`.

**App config** (`apps/firm-website/tailwind.config.js`): re-exports `@ydm-agency/config/tailwind.js`.
**PostCSS** (`apps/firm-website/postcss.config.js`): `tailwindcss` + `autoprefixer`.

**Note**: The actual CSS variable values (dark/light tokens) are defined in `apps/firm-website/src/app/globals.css`, not in the Tailwind config. `packages/email` and `packages/utils` source paths are absent from the content glob because `email` uses inline styles and `utils` has no JSX.

### 8.3 Next.js Configuration

**Shared config** (`packages/config/nextjs.js`):
- `reactStrictMode: true`.
- `transpilePackages: ['@ydm-agency/ui', '@ydm-agency/forms', '@ydm-agency/seo', '@ydm-agency/analytics', '@ydm-agency/utils', '@ydm-agency/email']`.
- `@ydm-agency/email` **is** transpiled (it is actively used by `/contact` and `/audit`); `@ydm-agency/config` is not transpiled because it's a dev-only configuration package with no runtime component.

**App config** (`apps/firm-website/next.config.js`): re-exports `@ydm-agency/config/nextjs.js`.

### 8.4 Linting & Formatting

**ESLint shared configs** (`packages/config/`):
- `eslint-next.js`: `.eslintrc` format; extends `next/core-web-vitals` + `prettier`; turns off `@next/next/no-html-link-for-pages`.
- `eslint-react.js`: `.eslintrc` format; extends `eslint:recommended`, `plugin:react/recommended`, `prettier`; sets `react: { version: 'detect' }`; turns off `react/react-in-jsx-scope` and `react/prop-types`. Not imported by any consumer (legacy).
- `eslint-ui.config.mjs`: flat config (ESLint 9); uses `@eslint/js`, `typescript-eslint`, `eslint-plugin-react`, `prettier`; `jsx` parser; React version `detect`; `react/react-in-jsx-scope` and `react/prop-types` off; ignores `_`-prefixed unused vars; disables `@typescript-eslint/no-empty-object-type`.

**App usage**: `apps/firm-website/.eslintrc.js` requires `eslint-next.js`; `apps/firm-website/.prettierrc.js` requires `prettier.js`.
**Package usage**: `packages/ui/eslint.config.mjs` and `packages/forms/eslint.config.mjs` both re-export `@ydm-agency/config/eslint-ui.config.mjs` (flat config). `packages/analytics`, `packages/seo`, `packages/email`, `packages/utils` have `lint` scripts but no ESLint config file — their lint commands fail under ESLint 9.

**Prettier shared config** (`packages/config/prettier.js`):
- `prettier-plugin-tailwindcss`, `singleQuote: true`, `semi: true`, `tabWidth: 2`, `trailingComma: 'es5'`, `printWidth: 100`.

### 8.5 Observations & Gaps

- **`noEmit` inherited by packages**: package `tsconfig.json` files set `outDir`/`rootDir` but do not set `noEmit: false`, so `tsc` will not write `dist` even for packages with a `build` script (e.g., `@ydm-agency/email`).
- **No build artifact for packages**: package `main`/`types` point to `./src/index.ts`; the monorepo relies on Next.js `transpilePackages` (including `@ydm-agency/email`, which is used) and source references rather than compiled `dist` output.
- **`@ydm-agency/email` build is a no-op**: its `build` script runs `tsc`, but the inherited `tsconfig.base.json` sets `noEmit: true`, so no `dist/` is produced. Turbo warns that the `dist/**` output glob is empty.
- **Package lint scripts partially misconfigured**: every package has a `lint` script running `eslint src/`. `packages/ui` and `packages/forms` have `eslint.config.mjs` (flat config re-exporting `@ydm-agency/config/eslint-ui.config.mjs`) and lint successfully. `packages/analytics`, `packages/seo`, `packages/email`, and `packages/utils` have no ESLint config file; running `pnpm --filter @ydm-agency/<pkg> lint` fails because ESLint 9 cannot find a config. `eslint-react.js` is not imported by any consumer; `eslint-next.js` is used only by `apps/firm-website`.
- **Build verified**: `pnpm --filter @ydm-agency/firm-website build` completes successfully and prerenders all 112 routes.

---

## 9. Dependencies Analysis

### 9.1 Dependency Management

- **Package manager**: `pnpm@9.15.0` (`packageManager` field in root `package.json`); `engines` requires `node >=22.0.0`, `pnpm >=9.0.0`.
- **Workspace catalog**: `pnpm-workspace.yaml` centralizes 21 shared versions under `catalog:` (default catalog). Catalogued: `react`, `react-dom`, `next`, `typescript`, `tailwindcss`, `autoprefixer`, `clsx`, `tailwind-merge`, `lucide-react`, `zod`, `next-themes`, `class-variance-authority`, `@radix-ui/react-slot`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `vitest`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `react-hook-form`, `@hookform/resolvers`, `resend`, `@react-email/components`. Package.json files reference these via `catalog:` specifiers. Notably NOT in catalog: `@react-email/render`, `@supabase/supabase-js`, `@upstash/*`, `react-calendly`, all `@types/*`, `eslint*`, `prettier*`, `turbo`, `@playwright/test`, `jsdom`, `@vitejs/plugin-react`, `@vitest/*`, `jest-axe`.
- **Lockfile**: `pnpm-lock.yaml` (`lockfileVersion: '9.0'`, `settings.autoInstallPeers: true`, `excludeLinksFromLockfile: false`).
- **Workspace links**: `apps/firm-website` `dependencies` lists `@ydm-agency/{analytics,email,forms,seo,ui,utils}` as `workspace:*` — all six are imported in app code, including `email` (`/contact` and `/audit` Server Actions). `@ydm-agency/config` is `workspace:*` under `devDependencies` of every active package and the app (shared ESLint/TS/Tailwind/Prettier/Next config). Internal `workspace:*` links among packages: `forms → {ui, analytics}`, `analytics → ui`, `ui → utils`. `branding`, `design-system` (excluded via `!packages/design-system` in `pnpm-workspace.yaml`), and `web-core` are not referenced by any `package.json` in the repo — confirmed orphaned (Section 1.3).

### 9.2 Runtime Dependencies

All resolved versions verified against `pnpm-lock.yaml` importers + catalog. "Declared in" indicates which workspace(s) list the package; catalogued deps are pulled via `catalog:`.

| Category | Package | Specifier | Resolved | Declared in |
|---|---|---|---|---|
| **Framework** | `next` | `^15.1.0` (catalog) | `15.5.22` | app, ui, analytics, seo |
| | `react` | `^19.0.0` (catalog) | `19.2.8` | app, ui, forms, analytics, seo; peer in email |
| | `react-dom` | `^19.0.0` (catalog) | `19.2.8` | app, ui |
| **Styling** | `tailwindcss` | `^3.4.17` (catalog) | `3.4.19` | app (dev), config (dev) |
| | `autoprefixer` | `^10.4.20` (catalog) | `10.5.4` | app (dev) |
| | `clsx` | `^2.1.1` (catalog) | `2.1.1` | utils |
| | `tailwind-merge` | `^2.5.5` (catalog) | `2.6.1` | utils |
| | `class-variance-authority` | `^0.7.0` (catalog) | `0.7.1` | ui |
| **UI components** | `lucide-react` | `^0.468.0` (catalog) | `0.468.0` | app, ui |
| | `@radix-ui/react-slot` | `^1.1.0` (catalog) | `1.3.3` | ui |
| | `@radix-ui/react-dialog` | `^1.1.0` (catalog) | `1.1.23` | ui |
| | `@radix-ui/react-dropdown-menu` | `^2.1.21` (catalog) | `2.1.24` | ui |
| **Forms** | `react-hook-form` | `^7.54.0` (catalog) | `7.83.0` | app, forms |
| | `@hookform/resolvers` | `^3.9.0` (catalog) | `3.10.0` | app, forms |
| | `zod` | `^3.24.1` (catalog) | `3.25.76` | app, forms |
| **Theming** | `next-themes` | `^0.3.0` (catalog) | `0.3.0` | app, ui |
| **Email** | `resend` | `^4.0.0` (catalog) | `4.8.0` | email |
| | `@react-email/components` | `^0.0.22` (catalog) | `0.0.22` | email |
| | `@react-email/render` | `^0.0.12` (direct, NOT catalog) | `0.0.12` | email |
| **Backend (app-only, exact pins)** | `@supabase/supabase-js` | `2.110.8` (pinned) | `2.110.8` | app |
| | `@upstash/ratelimit` | `2.0.4` (pinned) | `2.0.4` | app |
| | `@upstash/redis` | `1.38.0` (pinned) | `1.38.0` | app |
| **Integrations (app-only)** | `react-calendly` | `4.4.0` (pinned) | `4.4.0` | app |

### 9.3 Development & Tooling Dependencies

| Category | Package | Specifier | Resolved | Declared in |
|---|---|---|---|---|
| **TypeScript** | `typescript` | `^5.6.0` (direct) / `^5.6.3` (catalog) | `5.9.3` | root, app, all packages |
| | `@types/node` | `^22.0.0` | `22.20.1` | root, app, ui, forms, analytics, email |
| | `@types/react` | `^19.0.0` | `19.2.17` | app, ui, forms, analytics, seo, email |
| | `@types/react-dom` | `^19.0.0` | `19.2.3` | app, ui |
| **Testing** | `vitest` | `^2.0.0` (catalog) | `2.1.9` | root, app, ui, forms, utils, branding |
| | `@vitest/ui` | `^2.0.0` | `2.1.9` | root |
| | `@vitest/coverage-v8` | `^2.0.0` | `2.1.9` | root |
| | `@testing-library/react` | `^16.0.0` (catalog) | `16.3.2` | root, ui, forms |
| | `@testing-library/user-event` | `^14.5.0` (catalog) | `14.6.1` | root, ui, forms |
| | `@testing-library/jest-dom` | `^6.5.0` (catalog) | `6.9.1` | root, ui, forms |
| | `@playwright/test` | `^1.48.0` | `1.62.1` | root |
| | `jsdom` | `^25.0.0` | `25.0.1` | root, ui |
| | `@vitejs/plugin-react` | `^4.3.0` | `4.7.0` | root, ui |
| | `jest-axe` | `^9.0.0` | `9.0.0` | root |
| **Lint/Format** | `eslint` | `^9.0.0` | `9.39.5` | app, config |
| | `eslint-config-next` | `^15.0.0` | `15.5.22` | app, config |
| | `eslint-config-prettier` | `^9.1.0` | `9.1.2` | config |
| | `eslint-plugin-react` | `^7.34.0` | `7.37.5` | config |
| | `@eslint/js` | `^9.0.0` | `9.39.5` | config |
| | `typescript-eslint` | `^8.0.0` | `8.66.0` | config |
| | `prettier` | `^3.3.0` | `3.9.6` | root, config |
| | `prettier-plugin-tailwindcss` | `^0.6.0` | `0.6.14` | root, config |
| **Monorepo** | `turbo` | `^2.0.0` | `2.10.7` | root |
| | `@turbo/gen` | `^2.0.0` | `2.10.7` | root |

### 9.4 Observations & Gaps

- **Catalog coverage**: 21 packages are catalogued; `@react-email/render` is the notable omission — `packages/email` pins it directly at `^0.0.12` while `resend` and `@react-email/components` pull transitive copies (see below). Backend/integration deps (`@supabase/supabase-js`, `@upstash/ratelimit`, `@upstash/redis`, `react-calendly`) are app-only exact pins (no caret), intentionally locking the `/contact` + `/audit` Server Action surface.
- **`react-hook-form` jump**: resolves to `7.83.0` under `^7.54.0` — a large minor drift from the lower bound; verify this is intended.
- **Radix UI span**: three Radix packages on three different minor tracks — `react-slot@1.3.3`, `react-dialog@1.1.23`, `react-dropdown-menu@2.1.24`. Acceptable since each is independently versioned by Radix, but worth noting for alignment reviews.
- **React Email triple-install**: `pnpm-lock.yaml` resolves three copies of `@react-email/render`: `0.0.12` (direct dep of `packages/email`), `0.0.17` (transitive of `@react-email/components@0.0.22`), and `1.1.2` (transitive of `resend@4.8.0`). Three versions installed; consider aligning on one (e.g. bumping `packages/email`'s direct pin or upgrading `@react-email/components`).
- **`@ydm-agency/email` usage**: real `workspace:*` dependency of `apps/firm-website`, imported by both `/contact` and `/audit` Server Actions (Section 2.4).
- **`next-themes`**: `0.3.0` installed; `0.4+` available if upgrading.
- **Orphaned packages still installed**: `branding` and `web-core` are in the lockfile (each pulls `@ydm-agency/config` + `typescript`/`vitest` as devDeps) despite no consumer; `design-system` is excluded from the workspace entirely (`!packages/design-system`) and its `package.json` is malformed (two concatenated JSON objects — Section 1.3).

---

## 10. Missing Implementations

### 10.1 Missing Pages

**None.** Every route referenced in the codebase resolves to an implemented page. Verified via grep of all `href="/..."` occurrences in `apps/firm-website/src` and `packages/ui/src/{Header,Footer}.tsx` against the `apps/firm-website/src/app/` route tree, and against `sitemap.ts` (which enumerates all dynamic + static URLs). The original launch sitemap (`docs/archive/planning/03-sitemap-ia-navigation.md`) lists 9 route groups — `/`, `/services`, `/services/[slug]`, `/services/process`, `/services/[slug]/process`, `/about`, `/contact`, `/privacy`, plus `/blog` (marked "Future/Deferred" in spec, now implemented) — and all 9 are present. Routes implemented beyond the original spec: `/services/[slug]/deliverables`, `/services/[slug]/faq`, `/services/compare`, `/services/pricing`, `/services/industries`, `/services/industries/[slug]`, `/audit`, `/education`, `/education/[topic]`, `/education/[topic]/[slug]`, `/education/paths`, `/education/paths/[slug]`, `/blog/[slug]`.

Note: an earlier draft of this section claimed a missing `/demos` route referenced from `about/page.tsx` with spec `docs/archive/planning/06-demos-page.md`. That claim was incorrect — no `demos` string appears anywhere in `apps/firm-website/src` (the only grep hit is the word "demonstrated" in about-page prose), no `06-*` file exists in `docs/archive/planning/` (the index jumps `05`→`07`), and `/demos` is absent from `sitemap.ts`, `Header.tsx`, and `Footer.tsx`.

### 10.2 Backend Integration Status

- **Supabase leads storage** — implemented in `/contact` only (`contact/actions.ts` lines 16–21, 66–94). Broken by env var name mismatch: `.env.example` declares `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`, but the action reads `process.env.SUPABASE_URL` / `process.env.SUPABASE_ANON_KEY` — different names on both vars, matching nothing in `.env.example`. The `supabaseUrl && supabaseAnonKey ? createClient(...) : null` guard then sets `supabase = null` and the `if (supabase) { ... }` block silently no-ops without error (Section 2.4/7.1). `/audit` has no Supabase integration at all — `audit/actions.ts` only calls `sendEmail`.
- **Upstash rate limiting** — implemented in `/contact` only (`Ratelimit.slidingWindow(5, '1h')`, lines 24–30, 44–61). Same env-gated null pattern: missing `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` → `ratelimit = null` → rate limiting silently no-ops. `/audit` has no rate limiting.
- **Server Actions** — implemented for both: `submitContact` (`contact/actions.ts`) and `submitAudit` (`audit/actions.ts`), both `'use server'` with Zod `safeParse` validation.
- **Resend email** — implemented in `@ydm-agency/email` (`sendEmail`), used by both actions. Missing `RESEND_API_KEY` → returns `{ success: false, error: 'RESEND_API_KEY not configured' }`.
- **Honeypot** — schema-level in both: `contact-schema.ts` and `audit-schema.ts` both define `_honeypot: z.string().refine((val) => val === '', 'Bot detected')`, enforced via `safeParse` in each action. Both `ContactForm` and `AuditForm` components render the hidden `_honeypot` input.

### 10.3 Missing Tests

- **E2E** — `e2e/` contains only `.gitkeep`; no specs. CI `e2e` job runs `pnpm playwright test` against the empty directory (Section 5.2/6.1).
- **Untested packages** — `@ydm-agency/analytics`, `@ydm-agency/email`, and `@ydm-agency/seo` have zero test files in their `src/` (confirmed via recursive glob). Section 5.2 lists all three; this section previously omitted `seo`.
- **Form component coverage** — `ContactForm.test.tsx` (5 cases, mocked `onSubmit`) exists in `packages/forms`; `AuditForm.tsx` has no component test (only `audit-schema.test.ts` unit tests the schema, 40 cases).
- **Integration tests** — no test exercises a real Server Action end-to-end (Supabase insert, Resend send, Upstash rate limit). `ContactForm.test.tsx` mocks `onSubmit`; no test instantiates `submitContact`/`submitAudit` against live or stubbed backends.

---

## 11. Accessibility & Resilience Audit

### 11.1 Error Handling Boundaries

No `error.tsx`, `not-found.tsx`, `loading.tsx`, or `global-error.tsx` exist anywhere in `apps/firm-website/src/app` (grep-confirmed). Nine dynamic routes call `notFound()` for invalid params — `services/[slug]`, `services/[slug]/process`, `services/[slug]/deliverables`, `services/[slug]/faq`, `services/industries/[slug]`, `education/[topic]`, `education/[topic]/[slug]`, `education/paths/[slug]`, `blog/[slug]` — but all fall back to Next.js's unstyled default 404 page. No route has a custom error boundary, so any runtime error in a Server Component renders the framework default.

### 11.2 Form & Interactive Component Accessibility

**Forms**:
- **`ContactForm.tsx`** (`packages/forms/src`): every field error and the top-level error panel use `role="alert" aria-live="assertive"`, plus `aria-invalid`/`aria-describedby` on each input — matches the `09-contact-page.md` spec. No gap.
- **`AuditForm.tsx`** (`apps/firm-website/src/components`): the other live Server-Action form (wired to `/audit`), but has none of ContactForm's ARIA — error messages are plain `<p className="text-error text-sm mt-1">` with no `role="alert"`/`aria-live`, inputs have no `aria-invalid`/`aria-describedby`, and the top-level error panel (`bg-error/10 border-error/20`) has no `role="alert"`. Inconsistent with ContactForm despite being the same pattern.
- **`LeadForm.tsx`** (`packages/forms/src`): dead code in the app (Section 3.2/10), and also lacks all ARIA — plain `<p>` errors, no `aria-invalid`/`aria-describedby`. Additionally off-brand (`gray-*`/`blue-500`/`emerald-*` colors, first-person copy).

**Interactive components**:
- **`PricingEstimator.tsx`** (`apps/firm-website/src/components`): strongest ARIA in the codebase — `role="region" aria-label="Pricing estimator"`, `aria-labelledby="estimator-title"`, `aria-live="polite"` on step indicator and results, `role="alert"` on the "select at least one service" validation, `<fieldset>`/`<legend>` (sr-only) for grouped options.
- **`EducationSearch.tsx`**: gaps — search `<input>` has no `aria-label` (placeholder only), container has no `role="search"`, and the "Searching…"/"No lessons found" status messages have no `aria-live` region (screen readers won't announce result changes).
- **`LessonFilter.tsx`**: gaps — filter `<button>`s use visual `bg-accent` for selected state but no `aria-pressed`; the "Filter by level" label is not associated with the button group via `aria-labelledby`/`role="group"`.
- **`SocialShare.tsx`** / **`PrintButton.tsx`**: correctly provide `aria-label` on each share link and the print button. No gap.

**Overlays**:
- **`CookieConsent.tsx`** (`packages/ui/src`): the bottom banner has no `role="dialog"`/`alertdialog"`, no `aria-live`, and no focus trap despite blocking the viewport and requiring a decision.
- **`CookieConsent.tsx:12-16`**: pressing `Escape` calls `reject()` directly — silently opts the visitor out of analytics rather than performing a neutral dismiss.
- **`Header.tsx`**: correctly implements skip-to-content (`sr-only focus:not-sr-only`), `aria-label`s on both navs, and Radix `Dialog` for mobile nav (focus trap/`Escape` handled by Radix, unlike `CookieConsent`).

### 11.3 Images

No `next/image` or raw `<img>` tags exist anywhere in `apps/firm-website/src` (grep-confirmed; the only `image` string match is the middleware route-matcher exclusion). The About page's "Founder Photo" section (`about/page.tsx:27-32`) is a bordered placeholder `<div>` containing an emoji (`👤`) and the text "Founder Photo Placeholder" — there is currently no real photography/imagery in the site at all, only Lucide icons and CSS.

---

## 12. Code Hygiene & Type Safety

- **No `TODO`/`FIXME`/`XXX`/`HACK` comments** found anywhere in `apps/` or `packages/` (grep-confirmed across `.ts`/`.tsx`) — outstanding work is tracked in `docs/archive/planning/` and `.devin/workflows/` rather than inline code comments.
- **`any` usage is narrowly scoped but not fully absent**: `packages/analytics/src/events.ts` and `Analytics.tsx` have 8 `window as any` casts (reading `gtag`/`posthog`/`fbq` off `window` — Section 3.4), plus two genuine `Record<string, any>` annotations: `TrackEventOptions.properties` (`events.ts:6`) and `EducationAnalytics.tsx:23` (`const properties: Record<string, any>`) — untyped analytics payloads, not just DOM casts. No other `any` type usage found in `apps/firm-website/src` or `packages/*/src` (string-content matches for the word "any" excluded).
- **`console.*` usage**: one `console.log` in `packages/analytics/src/events.ts:39`, gated by `process.env.NODE_ENV === 'development'` — no stray debug logging. Six `console.error` calls exist for server-side/runtime error boundaries: `apps/firm-website/src/app/contact/actions.ts:58,81,88` (rate-limit, Supabase insert, Supabase client errors — all in Server Action, swallowed gracefully), `packages/email/src/index.ts:63,69` (Promise.allSettled rejection log + catch block), `apps/firm-website/src/app/education/SocialShare.tsx:35` (clipboard copy failure). No `console.warn`/`info`/`debug` anywhere.
- **`packages/config/tsconfig.base.json` strictness**: `strict: true` is set, but stricter opt-in flags are not enabled: `noUncheckedIndexedAccess`, `noImplicitOverride`, `exactOptionalPropertyTypes`, `noPropertyAccessFromIndexSignature`. Not required by `AGENTS.md`, but would harden the `Record<string, _>` lookups in `services-config.ts` (`SERVICES_CONFIG`), `industries-config.ts` (`INDUSTRIES_CONFIG`), `pricing-config.ts` (`PRICING_DETAILS`), `service-labels.ts` (`SERVICE_LABELS`, `SERVICE_CARD_DESCRIPTIONS`), and `faq-utils.ts` (`SERVICE_ANSWERS`, `SERVICE_TITLES`) where bracket-access slug lookups aren't currently guaranteed non-`undefined` by the type system. `education-config.ts` is unaffected — it uses array `.find()`/`.filter()` rather than Record indexing.

---

## 13. Conclusion

Production-ready foundation for the core marketing site: the monorepo is properly configured for its seven active packages, the design system is comprehensive, and `/contact`/`/audit` both have working, code-verified Server Actions with real email, storage, and rate-limiting integrations. Type safety and code hygiene (Section 12) are strong.

**Outstanding items**: the Supabase env var mismatch disabling `/contact` lead storage (Section 2.4/7.1) — fix before relying on it in production; no `error.tsx`/`not-found.tsx`/`loading.tsx` boundaries anywhere in the app; `CookieConsent`'s missing ARIA/focus-trap semantics (Section 11); three dead/orphaned packages worth deleting or finishing (`branding`, `design-system`, `web-core` — Section 1.3); no E2E tests; package-level `lint` scripts that lack ESLint config files (Section 3.7/8.5); and `README.md`/`AGENTS.md` should be updated to mention the orphaned packages and the education `-new` content files.

---

**Analysis Method**: Direct code examination, verified section-by-section against the live repository, cross-referenced against `docs/archive/planning/`, `AGENTS.md`, and `README.md`.
