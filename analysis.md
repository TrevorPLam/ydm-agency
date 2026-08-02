# YDM Agency Repository Analysis

**Date**: August 2, 2026  
**Repository**: ydm-agency  
**Analysis Type**: Comprehensive Codebase Examination

---

## 1. Monorepo Architecture

### 1.1 Structure Overview

Turborepo workspace with one app and seven shared packages.

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
│       │   │   ├── education/
│       │   │   │   ├── page.tsx
│       │   │   │   ├── EducationSearch.tsx
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
│       │   │       └── [slug]/
│       │   │           ├── page.tsx
│       │   │           ├── process/page.tsx
│       │   │           ├── deliverables/page.tsx
│       │   │           └── faq/page.tsx
│       │   ├── components/
│       │   │   ├── ServiceSubnav.tsx
│       │   │   └── AuditForm.tsx
│       │   ├── lib/
│       │   │   ├── audit-schema.ts
│       │   │   ├── blog-config.ts
│       │   │   ├── education-config.ts
│       │   │   ├── faq-utils.ts
│       │   │   ├── pricing-config.ts
│       │   │   ├── service-comparison-config.ts
│       │   │   ├── service-labels.ts
│       │   │   └── services-config.ts
│       │   └── middleware.ts
│       ├── next.config.js
│       └── tailwind.config.js
├── packages/
│   ├── ui/                      # 15 exports incl. Button, Card, Header, Footer,
│   │                            # CookieConsent, CookieConsentProvider, useConsent
│   │                            # + __tests__/
│   ├── forms/                   # LeadForm, ContactForm, Zod schemas
│   │                            # + __tests__/
│   ├── analytics/               # AnalyticsProvider, trackEvent
│   ├── seo/                     # constructMetadata, OrganizationJsonLd, FaqPageJsonLd
│   ├── email/                   # AcknowledgmentEmail, NotificationEmail, sendEmail
│   ├── utils/                   # cn, formatDate, formatCurrency
│   └── config/                  # shared ESLint, TS, Tailwind, Prettier, Next.js
├── e2e/                         # empty (only .gitkeep)
├── .github/workflows/           # ci.yml
├── .devin/workflows/            # audit, todo, and official/ workflows
├── turbo/generators/config.ts
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

**Structural notes**:
- Implemented routes: `/`, `/about`, `/audit`, `/blog`, `/blog/[slug]`, `/education`, `/education/[topic]`, `/education/[topic]/[slug]`, `/privacy`, `/services`, `/services/process`, `/services/pricing`, `/services/compare`, `/services/[slug]`, `/services/[slug]/deliverables`, `/services/[slug]/faq`, `/services/[slug]/process`.
- Missing routes: `/contact` and `/demos` are not present in `apps/firm-website/src/app/`.
- New service-page ecosystem helpers: `faq-utils.ts`, `service-labels.ts`, `service-comparison-config.ts`, `pricing-config.ts`, `audit-schema.ts`.
- Education and blog content is managed in `apps/firm-website/src/lib/education-config.ts` and `apps/firm-website/src/lib/blog-config.ts`.
- Only `packages/ui` and `packages/forms` contain unit tests; `e2e/` has no tests.

### 1.2 Package Management

**Package Manager**: pnpm 9.15.0 (`packageManager` field)  
**Engines**: Node.js >=22.0.0, pnpm >=9.0.0  
**Monorepo Tool**: Turborepo `^2.0.0` (resolved 2.10.7) with `@turbo/gen` 2.10.7

**Workspace Configuration** (`pnpm-workspace.yaml`):
- Globs: `apps/*`, `packages/*`
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
- `vitest` ^2.0.0 → 2.1.9
- `@testing-library/react` ^16.0.0 → 16.3.2, `@testing-library/jest-dom` ^6.5.0 → 6.9.1, `@testing-library/user-event` ^14.5.0 → 14.6.1
- `react-hook-form` ^7.54.0 → 7.83.0, `@hookform/resolvers` ^3.9.0 → 3.10.0
- `resend` ^4.0.0 → 4.8.0, `@react-email/components` ^0.0.22 → 0.0.22

**Resolved notes**:
- `typescript` is declared in the workspace catalog as `^5.6.3`, but every package pins it directly to `^5.6.0`; `pnpm-lock.yaml` resolves it to `5.9.3`.

**Workspace protocol usage**:
- `apps/firm-website` → `@ydm-agency/analytics`, `@ydm-agency/email`, `@ydm-agency/forms`, `@ydm-agency/seo`, `@ydm-agency/ui`, `@ydm-agency/utils`
- `packages/ui` → `@ydm-agency/utils`
- `packages/forms` → `@ydm-agency/analytics`, `@ydm-agency/ui`
- `packages/analytics` → `@ydm-agency/ui`
- `@ydm-agency/config` is a dev dependency in `apps/firm-website`, `packages/analytics`, `packages/email`, `packages/forms`, `packages/seo`, `packages/ui`, and `packages/utils`.

**Turbo pipeline** (`turbo.json`): `build`, `dev`, `lint`, `typecheck`, `test`, `e2e`, `clean`. `build` depends on `^build` and outputs `.next/**` (excluding `.next/cache/**`) and `dist/**`; `typecheck`, `test`, and `e2e` depend on `^build`; `dev` is persistent and uncached. Note: `package.json` also defines a `format` script, but `format` is not declared in `turbo.json` and no workspace package exposes a `format` task.

---

## 2. Application Analysis (firm-website)

### 2.1 Tech Stack

- **Framework**: Next.js 15.5.22 App Router; React Strict Mode enabled; workspace packages transpiled in `nextjs.js`
- **React**: 19.2.8
- **TypeScript**: 5.9.3, `strict` mode, `target: ES2022`, `module: ESNext`, `moduleResolution: bundler`, Next.js TS plugin
- **Build / Package Management**: pnpm 9.15.0, Turborepo 2.10.7
- **Styling**: Tailwind CSS 3.4.19, PostCSS + autoprefixer, CSS variables for dark/light design tokens (`globals.css`)
- **UI Components**: shadcn/ui pattern built on `@radix-ui/react-slot` / `@radix-ui/react-dialog`, `class-variance-authority`, `lucide-react`
- **Fonts**: `Inter` via `next/font/google` (body), `ClashDisplay-Variable` via `next/font/local` (headings), CSS variables `--font-sans` / `--font-display`
- **Theming**: `next-themes` 0.3.0 with `attribute="class"`, default dark mode, `enableSystem`, `storageKey: ydm-theme`
- **State / Forms**: `react-hook-form` 7.83.0, `@hookform/resolvers` 3.10.0, `zod` 3.25.76
- **Analytics**: GA4, PostHog, Meta Pixel through `@ydm-agency/analytics`
- **Email**: Resend 4.8.0 + `@react-email/components` 0.0.22
- **Testing**: Vitest 2.1.9, Testing Library, Playwright 1.62.1

### 2.2 Routing Structure

**Static / App Router routes**:
- `/` — Hero, services snapshot, process teaser, trust/FAQ
- `/services` — 9-card service hub with `selectClients` badges
- `/services/[slug]` — Service detail (SSG via `generateStaticParams` over 9 `SERVICES_CONFIG` slugs; `notFound()` for unknown slugs)
- `/services/[slug]/deliverables` — Service-specific deliverables / “What You Get” breakdown (SSG)
- `/services/[slug]/faq` — Service-specific FAQ hub with FAQPage JSON-LD (SSG)
- `/services/[slug]/process` — Service-specific process phases + FAQs (also SSG)
- `/services/process` — Process hub with 5-phase client lifecycle + links to all 9 service process pages
- `/services/pricing` — Global pricing and investment factors per service
- `/services/compare` — Service comparison and starting-point guide
- `/audit` — Free marketing audit request form (Server Action + Resend)
- `/about` — Founder story, principles, FAQs; includes a placeholder link to `/demos`
- `/blog` — Opinion and news hub (3 sample posts from `blog-config.ts`)
- `/education` — Technical lesson hub with 5 topics (SEO, Conversion, Foundations, Strategy, Compliance) containing 6 lessons total, with safety/attribution badges
- `/education/[topic]` — Topic-specific lesson listing (SSG via `generateStaticParams` over 5 `EDUCATION_TOPICS` slugs; `notFound()` for unknown topics)
- `/education/[topic]/[slug]` — Lesson detail (SSG via `generateStaticParams` over 6 `EDUCATION_LESSONS` slugs; `notFound()` for unknown lessons)
- `/privacy` — Privacy policy
- `/sitemap.xml` — Generated sitemap (static routes + 9 service spokes + 9 process spokes + 9 deliverables spokes + 9 FAQ spokes + 3 blog posts + 5 education topic pages + 6 education lesson pages)
- `/robots.txt` — `allow: /`, `disallow: /api/`, sitemap reference

**Referenced but not implemented**:
- `/contact` — Linked in `Header`, `Footer`, sitemap, and CTAs; `ContactForm` exists in `@ydm-agency/forms` but no route
- `/demos` — Linked from `/about` page text and FAQ

**Implemented since prior analysis**:
- `/services/[slug]/faq` — FAQ spoke pages
- `/services/pricing` — Pricing factors
- `/services/compare` — Service comparison
- `/audit` — Free marketing audit

**Notes**:
- `services/layout.tsx` is a passthrough layout.
- The sitemap emits `/contact` even though the route is not implemented.
- Education routes use a two-level structure: `/education/[topic]/[slug]` for lessons, with topic hub pages at `/education/[topic]`

### 2.3 Key Components

**App shell** (`apps/firm-website/src/app`):
- `layout.tsx` — Root layout: `Inter` + `ClashDisplay` fonts, `constructMetadata`, `OrganizationJsonLd`, Header/Footer/CookieConsent, `AppProviders`
- `providers.tsx` — `ThemeProvider` (next-themes, default dark), `CookieConsentProvider`, `AnalyticsProvider`
- `globals.css` — Tailwind directives + CSS variables for dark/light design tokens + `.noise` overlay
- `Header.tsx` (`@ydm-agency/ui`) — Fixed responsive header, skip-to-content, desktop + mobile Radix Dialog nav, active-path indicator, `ThemeToggle`
- `Footer.tsx` — Quick links, contact email, legal links, `CookieSettingsButton`

**Shared UI library** (`@ydm-agency/ui`):
- `Button` — CVA variants (`primary`, `secondary`, `ghost`), sizes, Radix `Slot` support (`asChild`)
- `Card`, `Container`, `Badge` — layout primitives
- `Hero` — Title + highlighted text, description, dual CTAs
- `Features`, `Pricing` — grid/pricing components (defined but not currently used in routes)
- `ThemeToggle` — dark/light toggle with `next-themes`
- `CookieConsent`, `CookieConsentProvider`, `useConsent`, `CookieSettingsButton` — consent state + banner

**Cross-cutting packages**:
- `@ydm-agency/seo` — `constructMetadata()` (OG, Twitter, metadataBase), `OrganizationJsonLd`, `FaqPageJsonLd`
- `@ydm-agency/analytics` — `AnalyticsProvider` (GA4, PostHog, Meta Pixel, consent-gated Scripts), `trackEvent()`
- `@ydm-agency/forms` — `ContactForm` (`react-hook-form` + Zod + honeypot), `LeadForm` (controlled inputs + Zod)
- `@ydm-agency/utils` — `cn()` (clsx + tailwind-merge), `formatDate()`, `formatCurrency()`

**Page components**:
- `page.tsx` (home) — `Hero` (CTA to `/services` and `/contact`), 3-card services snapshot, 3-step process teaser, trust banner, final CTA
- `services/page.tsx` — 9-card service hub with `selectClients` badges, "Why Work With YDM Agency" section, and links to `/services/compare`, `/services/pricing`, and `/audit`
- `services/[slug]/page.tsx` — Dynamic service detail: hero, problem/solution, included list, who it’s for, cross-service links, FAQs, final CTA, and links to FAQ/pricing; includes a `ServiceSubnav` linking to deliverables, process, and FAQ spokes
- `services/[slug]/deliverables/page.tsx` — Service-specific deliverables / “What You Get” breakdown, with output, timeline, and outcome for each deliverable; includes a link to the FAQ page
- `services/[slug]/faq/page.tsx` — Grouped service FAQs (Pricing, Timeline, Scope, Prerequisites, Compliance, General, Answer Engine) with `FAQPage` JSON-LD
- `services/[slug]/process/page.tsx` — Service process phases (timeline with duration badges), FAQ, back links, and link to the FAQ page; includes the `ServiceSubnav`
- `services/process/page.tsx` — 5-phase client lifecycle, links to all 9 service process pages, FAQ
- `services/compare/page.tsx` — Scenario-based service comparison and a service fit matrix
- `services/pricing/page.tsx` — Per-service investment factors, included extras, and starting-range placeholders
- `audit/page.tsx` — Free marketing audit form (name, email, website, challenge, marketing state) with Zod + honeypot; backed by `apps/firm-website/src/app/audit/actions.ts`
- `apps/firm-website/src/components/AuditForm.tsx` — Client audit form using `react-hook-form`, `zodResolver`, and `submitAudit` Server Action
- `about/page.tsx` — Founder story, company principles, trust signals, FAQ (includes placeholder `/demos` link)
- `blog/page.tsx` — Opinion and news hub with featured article layout (editorial styling, pull quotes, author metadata)
- `education/page.tsx` — Technical lesson hub with search component and topic-based organization (5 topics with lesson counts)
- `education/[topic]/page.tsx` — Topic-specific lesson listing with safety/attribution badges
- `education/[topic]/[slug]/page.tsx` — Dynamic lesson detail: hero, topic/safety/level badges, sections, back link, CTA
- `privacy/page.tsx` — Privacy policy
- `sitemap.ts` / `robots.ts` — Generated SEO routes

### 2.4 Security Implementation

**HTTP headers** (`apps/firm-website/src/middleware.ts`):
- Matcher: `/((?!api|_next/static|_next/image|favicon.ico|og-image.png).*)`
- `Content-Security-Policy`: `default-src 'self'; script-src 'self' https://www.googletagmanager.com https://va.vercel-scripts.com; frame-src https://calendly.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

**Form / bot protection**:
- `ContactForm` (`@ydm-agency/forms`) uses `react-hook-form` + `zodResolver` + `contactFormSchema`
  - Honeypot `_honeypot` hidden field must be empty
  - `name` ≥ 2 chars, valid email, `message` ≥ 20 chars, optional `projectType` enum
- `LeadForm` uses `leadCaptureSchema` (`fullName`, email, `message` ≥ 10 chars)
- `AuditForm` (`apps/firm-website/src/components/AuditForm.tsx`) uses `react-hook-form` + `zodResolver` + `auditFormSchema`
  - Honeypot `_honeypot` hidden field must be empty
  - `name` ≥ 2 chars, valid email, `website` ≥ 3 chars, `challenge` ≥ 10 chars, `marketingState` enum
  - Submits to `submitAudit()` Server Action in `apps/firm-website/src/app/audit/actions.ts`
- `sendEmail()` in `@ydm-agency/email` is wired to the `/audit` Server Action

**Privacy / consent**:
- `CookieConsentProvider` sets `ydm-analytics-consent` (`SameSite=Lax`, 1 year) and exposes `accept`/`reject`/`useConsent`
- `AnalyticsProvider` only loads GA4/PostHog/Meta Pixel scripts after consent
- `/privacy` documents collection, cookies, third parties (Vercel, Resend, Calendly, Supabase), and user rights

**Not yet implemented**:
- No `app/api/` routes, Supabase/Upstash wiring, or rate limiting in code
- `ContactForm` receives an `onSubmit` prop but has no backend handler
- `AuditForm` has a backend handler but no Supabase storage or rate limiting

**Analysis**: Strong static security posture via headers and client-side bot/privacy controls; the `/audit` Server Action provides a working Resend-based form backend, but storage and rate limiting remain unimplemented.

### 2.5 Design System

**Color tokens** (`apps/firm-website/src/app/globals.css` + `packages/config/tailwind.js`):
- Background: `#0A0A0B` dark / `#FFFFFF` light
- Surface: `#161618` dark / `#F5F5F6` light
- Text Primary: `#F5F5F6` dark / `#0A0A0B` light
- Text Secondary: `#A1A1A9` dark / `#4A4A52` light
- Accent: `#3B82F6`; Accent Hover: `#2563EB` (same in both dark and light, matches `AGENTS.md`)
- Border: `#2A2A2E`
- Error: `#F87171`
- Success: `#3B82F6` (aliased to the same value as accent, not a distinct green)
- Exposed as Tailwind colors: `bg-background`, `text-text-primary`, `text-text-secondary`, `bg-surface`, `border-border`, `text-accent`, `bg-accent`, etc.

**Design system drift**: 
- `packages/email` (`AcknowledgmentEmail.tsx`, `NotificationEmail.tsx`) still hard-codes the old accent color `#4AE4A8` (teal/green) for signature/label text, since email templates can't consume CSS variables. This no longer matches the site's current blue accent (`#3B82F6`/`#2563EB`) and should be updated for brand consistency if the email flow is ever wired up.
- `Button` component still uses the old teal shadow color `rgba(74,228,168,0.3)` in its hover state instead of the current blue accent color.

**Typography**:
- Headings: `ClashDisplay-Variable` via `next/font/local`, CSS var `--font-display`
- Body: `Inter` (variable) via `next/font/google`, CSS var `--font-sans`
- Tailwind `fontFamily.display` / `fontFamily.sans` mapped to the CSS vars

**Layout / spacing**:
- `Container` = `max-w-6xl` (1152px) with `px-4 sm:px-6 lg:px-8`
- Mobile-first responsive pattern; sections typically `py-24 md:py-32`
- `Card` = `bg-surface border-border rounded-xl` with hover lift/shadow

**Component styling**:
- `Button` CVA: `primary` (accent fill), `secondary` (border), `ghost`, sizes `sm`/`default`/`lg`/`icon`
- `Badge` CVA: `default`, `accent`, `outline`
- `noise` class applies a subtle SVG overlay (`/noise.svg`)

**Theming**:
- `next-themes` with `attribute="class"`, default `dark`, `enableSystem`, `storageKey: ydm-theme`
- `:root` defines dark defaults; `.light` class flips to light tokens

**Notes**:
- `Features` and `Pricing` components (`@ydm-agency/ui`) use hard-coded `slate-*` blues instead of the design tokens and are not currently used in routes.
- `globals.css` still sets a fallback `font-family: system-ui` on `body`, which can conflict with Tailwind `font-sans`.

---

## 3. Packages Analysis

### 3.1 @ydm-agency/ui

**Purpose**: Shared React UI component library built on shadcn/ui patterns and the workspace design system.

**Exports** (`packages/ui/src/index.ts`):
- **Button** — CVA variants `primary`/`secondary`/`ghost`; sizes `sm`/`default`/`lg`/`icon`; `asChild` via `@radix-ui/react-slot`.
- **Card** — `bg-surface border-border rounded-xl` with hover lift/shadow.
- **Container** — `max-w-6xl` centered wrapper with responsive horizontal padding.
- **Badge** — CVA variants `default`/`accent`/`outline`.
- **Hero** — centered hero with badge, title, optional highlighted span, and dual CTAs.
- **Features** — 3-column feature grid (`FeatureItem[]`, optional icons).
- **Header** — fixed responsive header with skip-to-content link, desktop/mobile Radix Dialog nav, active-path indicator, and `ThemeToggle`. Nav links to `/`, `/services`, `/services/process`, `/blog`, `/education`, `/about`, and `/contact`.
- **Footer** — brand blurb, quick links (`/services`, `/services/process`, `/blog`, `/education`, `/about`, `/contact`), `contact@ydmagency.com`, legal, and `CookieSettingsButton`.
- **Pricing** — 3-tier pricing grid; supports `ctaHref`/`ctaText` links or an `onSelectPlan` callback.
- **ThemeToggle** — dark/light toggle via `next-themes`.
- **CookieSettingsButton** — re-opens the consent banner by dispatching `ydm:open-cookie-settings`.
- **CookieConsent** — bottom fixed banner with Accept/Reject and Escape-to-dismiss.
- **CookieConsentProvider** + **useConsent** — consent state, `ydm-analytics-consent` cookie (`SameSite=Lax`, 1 year, values `accepted`/`rejected`), `accept`/`reject`/`openSettings` API plus the `analyticsConsent` boolean.

**Dependencies** (`packages/ui/package.json`):
- Runtime: `react`, `react-dom`, `next`, `lucide-react`, `next-themes`, `class-variance-authority`, `@radix-ui/react-slot`, `@radix-ui/react-dialog`, `@ydm-agency/utils`.
- Dev: `@ydm-agency/config`, `@types/node`, `@types/react`, `@types/react-dom`, `typescript`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@vitejs/plugin-react`, `jsdom`.

**Scripts**: `lint`, `typecheck`, `test` (Vitest).

**Tests** (`packages/ui/src/__tests__/`): 4 Vitest test files — `Button.test.tsx`, `Card.test.tsx`, `Badge.test.tsx`, `CookieConsent.test.tsx` — covering variants, class merging, `asChild` rendering, disabled states, and consent accept/reject/cookie flows.

**Observations**:
- Strong TypeScript typing with exported `*Props` interfaces and consistent `cn()`/`cva` patterns.
- `Button`, `Badge`, `Card`, `Container`, `Hero`, `Header`, `Footer`, `CookieConsent`, and `CookieSettingsButton` use the workspace Tailwind tokens (`bg-accent`, `text-text-primary`, etc.).
- `Button` primary variant adds a stale teal glow shadow (`rgba(74,228,168,0.3)`) on hover, which does not match the current blue accent.
- `Features.tsx` and `Pricing.tsx` are hard-coded to `slate-*`/`blue-*` colors instead of design tokens and are not imported by any route in `apps/firm-website`.
- `Header` and `Footer` link to `/contact`, which is not implemented in the app router.
- `CookieConsentProvider` is client-only (`document.cookie`, `window` event listeners) and has no SSR cookie handling.

**Analysis**: A clean, well-typed component library. Main gaps are the two unused, off-palette components (`Features`, `Pricing`), the stale teal shadow in `Button`, and the `/contact` route referenced by the site shell.

### 3.2 @ydm-agency/utils

**Purpose**: Shared helper utilities for class-name merging and locale formatting.

**Exports** (`packages/utils/src/index.ts`):
- `cn(...inputs: ClassValue[]): string` — `clsx` (`ClassValue` type) + `tailwind-merge` for conditional Tailwind classes.
- `formatDate(date: Date | string): string` — parses a string date if needed, then returns an `en-US` long date (`month long`, day, year) via `toLocaleDateString`.
- `formatCurrency(amount: number, currency = 'USD'): string` — `Intl.NumberFormat` currency string.

**Dependencies** (`packages/utils/package.json`):
- Runtime: `clsx`, `tailwind-merge`.
- Dev: `@ydm-agency/config`, `typescript`.

**Scripts**: `lint`, `typecheck` only; no `test` script.

**Usage**:
- `cn` is imported by `packages/ui` (`Button`, `Card`, `Badge`, `Container`) and is the primary class-merge utility across the UI package.
- `formatDate` and `formatCurrency` are exported but not imported by any page or package outside their own package.

**Observations**:
- Functions are strongly typed and use standard built-ins (`clsx`, `tailwind-merge`, `Intl.NumberFormat`, `toLocaleDateString`).
- No unit tests exist in `packages/utils`, despite the `AGENTS.md` requirement for utility tests.
- `formatDate` and `formatCurrency` are currently dead code; no `apps/firm-website` page formats dates or currencies using these helpers.

**Analysis**: Clean, focused helpers. `cn()` is actively used across the UI package, while the formatting utilities are unused and untested.

### 3.3 @ydm-agency/forms

**Purpose**: Form components and Zod validation schemas for lead capture and contact.

**Exports** (`packages/forms/src/index.ts`):
- `ContactForm`, `type ContactFormProps`
- `LeadForm`, `type LeadFormProps`
- `contactFormSchema`, `type ContactFormInput`
- `leadCaptureSchema`, `type LeadCaptureInput`

**Schemas** (`packages/forms/src/schemas.ts`):
- `contactFormSchema` — `name` (≥2), `email`, `projectType` enum (`website`/`seo`/`marketing`/`analytics`/`other`, optional; empty string is preprocessed to `undefined`), `message` (≥20), `_honeypot` must be empty.
- `leadCaptureSchema` — `fullName` (≥2), `email`, `companyName` (optional), `budget` (optional string; not validated against the dropdown values), `message` (≥10).

**Components**:
- **ContactForm** — `react-hook-form` + `zodResolver` with an injected async `onSubmit` prop. Fields: name, email, optional project-type select, message, hidden `_honeypot`. Handles `idle`/`loading`/`success`/`error` states and renders a "Message received" success panel.
- **LeadForm** — controlled-input form using `useState`, manual `leadCaptureSchema.safeParse` validation, budget dropdown, configurable `title`/`subtitle`/`sourceApp`/`onSubmitSuccess` props, and calls `trackEvent('lead_form_submitted')` on successful validation. It does not persist or submit lead data to a backend.

**Dependencies** (`packages/forms/package.json`):
- Runtime: `zod`, `react`, `react-hook-form`, `@hookform/resolvers`, `@ydm-agency/ui`, `@ydm-agency/analytics`.
- Dev: `@ydm-agency/config`, `@testing-library/jest-dom`, `@testing-library/react`, `@testing-library/user-event`, `@types/node`, `@types/react`, `typescript`, `vitest`.

**Scripts**: `lint`, `typecheck`, `test` (vitest).

**Tests** (`packages/forms/src/__tests__/`): `ContactForm.test.tsx` (field render, validation, honeypot, valid submit, success state) and `schemas.test.ts` (valid/invalid contact input, honeypot, projectType, 20-char message). No `LeadForm` tests.

**Observations**:
- `ContactForm` uses design-system Tailwind tokens and expects an injected async `onSubmit` handler.
- `LeadForm` is hard-coded to `gray-*`/`blue-500`/`emerald-*`/`red-500` colors and contains first-person copy ("we will get back to you", "We have received your request"), which conflicts with the "no we/us/our" voice rule.
- The `@ydm-agency/forms` package is not imported by `apps/firm-website`; the `/contact` route and any Server Action/backend handler are missing.
- `LeadForm` does not submit data to a backend; it only fires an analytics event.

**Analysis**: Solid validation and testing for `contactFormSchema`/`ContactForm`. Main issues are the off-palette, off-voice `LeadForm`, no `LeadForm` test coverage, no app route integration, and no real backend wiring for either form.

### 3.4 @ydm-agency/analytics

**Purpose**: Consent-gated analytics loading and event tracking for GA4, PostHog, and Meta Pixel.

**Exports** (`packages/analytics/src/index.ts`):
- `AnalyticsProvider`, `AnalyticsProps`
- `trackEvent`, `TrackEventOptions`

**`AnalyticsProvider`** (`packages/analytics/src/Analytics.tsx`):
- Client component using `useConsent` from `@ydm-agency/ui`.
- Conditionally injects `next/script` snippets for GA4, PostHog, and Meta Pixel only when `analyticsConsent` is `true` and the corresponding ID prop is provided (`gaId`, `posthogKey`, `metaPixelId`).
- Calls `window.gtag('consent', 'update', { analytics_storage: 'granted' })` when consent is granted (no-op if gtag script not loaded).

**`trackEvent`** (`packages/analytics/src/events.ts`):
- Guarded by `typeof window` check and `ydm-analytics-consent=accepted` cookie read.
- Dispatches a `CustomEvent('ydm_analytics_event')`.
- Routes to `gtag('event')`, `posthog.capture`, and `fbq('trackCustom')` if the global objects exist; logs in development.

**Dependencies** (`packages/analytics/package.json`):
- Runtime: `react`, `next`, `@ydm-agency/ui`.
- Dev: `@ydm-agency/config`, `@types/node`, `@types/react`, `typescript`.

**Scripts**: `lint`, `typecheck` only; no tests.

**Usage**:
- `AppProviders` (`apps/firm-website/src/app/providers.tsx`) wraps `AnalyticsProvider` inside `CookieConsentProvider`, but all ID props are currently empty strings (`gaId=""`, `posthogKey=""`, `metaPixelId=""`).
- `trackEvent` is called only in `packages/forms/src/LeadForm.tsx`, which is itself not used by `apps/firm-website`.

**Observations**:
- Analytics are effectively disabled by the empty provider IDs.
- `AnalyticsProvider` uses `dangerouslySetInnerHTML` for GA4, PostHog, and Meta Pixel initialization. The current `Content-Security-Policy` (`script-src 'self' https://www.googletagmanager.com https://va.vercel-scripts.com`) does not allow inline scripts or `https://connect.facebook.net` / PostHog hosts, so scripts would be blocked even if IDs were configured. Because `default-src 'self'` is set and no `connect-src` is defined, event POSTs to analytics APIs would also be blocked.
- `trackEvent` dispatches a `CustomEvent('ydm_analytics_event')`, but no package or app currently listens for it.
- `trackEvent` relies on type-unsafe `window as any` access to `gtag`, `posthog`, and `fbq`.
- No unit or integration tests cover consent gating or event dispatch.

**Analysis**: The consent-gating design is correct, but the package is not wired to production IDs and the current CSP blocks the inline/external scripts it would inject. Needs ID configuration, CSP updates, and tests.

### 3.5 @ydm-agency/seo

**Purpose**: Next.js metadata generation and JSON-LD structured data helpers.

**Exports** (`packages/seo/src/index.ts`):
- `constructMetadata`, `type MetadataOptions`
- `OrganizationJsonLd`, `type OrganizationJsonLdProps`

**`constructMetadata`** (`packages/seo/src/constructMetadata.ts`):
- Returns a Next.js `Metadata` object from `title`, `description`, `image`, `icons`, `noIndex`, `canonicalUrl`, and `siteName`.
- Defaults: title `YDM Agency | Digital Growth & Native Web Applications`, description about data-driven marketing, image `/og-image.png`, icons `/favicon.ico`, siteName `YDM Agency`.
- OpenGraph and Twitter `summary_large_image` with creator `@ydmagency`.
- `canonicalUrl` sets `metadataBase`; `noIndex` sets `robots: { index: false, follow: false }`.

**`OrganizationJsonLd`** (`packages/seo/src/JsonLd.tsx`):
- Renders an `application/ld+json` `Organization` schema with `name`, `url`, optional `logo`, `sameAs`, and `contactPoint`.
- Used in root `layout.tsx` with name `YDM Agency`, url `https://ydm-agency.com`, logo `https://ydm-agency.com/logo.png`, contact point `contact@ydmagency.com`.

**Dependencies** (`packages/seo/package.json`):
- Runtime: `next`, `react`.
- Dev: `@ydm-agency/config`, `@types/react`, `typescript`.

**Scripts**: `lint`, `typecheck` only; no tests.

**Usage**:
- `constructMetadata` is used in `layout.tsx` and every page metadata export: `/about`, `/audit`, `/blog`, `/blog/[slug]`, `/education`, `/education/[topic]`, `/education/[topic]/[slug]`, `/privacy`, `/services`, `/services/process`, `/services/pricing`, `/services/compare`, `/services/[slug]`, `/services/[slug]/deliverables`, `/services/[slug]/faq`, `/services/[slug]/process`.
- `OrganizationJsonLd` is used in `layout.tsx`.
- `FaqPageJsonLd` is used in `/services/[slug]/faq`.

**Observations**:
- `constructMetadata` defaults to `/og-image.png` and `/favicon.ico`, but neither file exists in `apps/firm-website/public/` (only `fonts/` and `noise.svg` are present).
- `OrganizationJsonLd` references an external `https://ydm-agency.com/logo.png` that is not in the repo.
- No page passes `canonicalUrl`, `image`, or `icons`, so `metadataBase` is undefined and OpenGraph/Twitter images resolve as relative paths using the defaults.
- No unit tests for metadata construction or JSON-LD output.

**Analysis**: Clean, well-typed SEO helper. Main gaps are missing static assets, no canonical default, and no tests.

### 3.6 @ydm-agency/email

**Purpose**: React Email templates and Resend-based sending for contact form submissions.

**Exports** (`packages/email/src/index.ts`):
- `AcknowledgmentEmail` — auto-acknowledgment template.
- `NotificationEmail` — internal lead-notification template.
- `sendEmail`, `type SendEmailOptions`, `type SendEmailResult`.

**Templates**:
- **AcknowledgmentEmail** — dark-themed (`#0A0A0B` background, `#161618` container, `#4AE4A8` signature) with heading `Got your message — YDM Agency`, confirms receipt and the 2-hour reply promise.
- **NotificationEmail** — dark-themed summary email with sections for name, email, `projectType`, and message.

**`sendEmail` implementation**:
- Creates `new Resend(process.env.RESEND_API_KEY)` per call.
- Returns `{ success: false, error: 'RESEND_API_KEY not configured' }` if the env var is missing.
- Renders both templates to HTML via `@react-email/render`.
- Sends acknowledgment to the submitter and notification to `contact@ydmagency.com` in parallel with `Promise.allSettled`.
- Returns `{ success: true }` even if one send fails, logging the failure to the console.

**Dependencies** (`packages/email/package.json`):
- Runtime: `resend`, `@react-email/components`, `@react-email/render`.
- Peer: `react`.
- Dev: `@ydm-agency/config`, `@types/node`, `@types/react`, `typescript`.

**Scripts**: `lint`, `typecheck`, `build`.

**Usage**: `sendEmail`, `AcknowledgmentEmail`, and `NotificationEmail` are not imported anywhere outside `packages/email/src/index.ts` (verified by codebase search). There is no Server Action or `/contact` route wiring them to `ContactForm`.

**Observations**:
- No unit or integration tests for rendering or `sendEmail` logic.
- `from` address is `YDM Agency <noreply@ydmagency.com>`; internal `to` address is `contact@ydmagency.com`.
- `sendEmail` instantiates a new Resend client on every call and lacks rate-limiting or Supabase lead storage integration.
- `AcknowledgmentEmail` and `NotificationEmail` both use a teal `#4AE4A8` accent for the signature and labels, which is stale relative to the current blue accent (`#3B82F6`).
- It is currently unused by the app, so the email flow is not reachable end-to-end.

**Analysis**: Clean React Email templates and a straightforward Resend wrapper. Needs integration with a Server Action and the contact form, plus tests, environment validation, and a design-token refresh.

### 3.7 @ydm-agency/config

**Purpose**: Shared base configuration files consumed by `apps/firm-website` and other workspace packages.

**Package** (`packages/config/package.json`): No runtime scripts; only `devDependencies` (`eslint`, `eslint-config-next`, `eslint-config-prettier`, `eslint-plugin-react`, `typescript`, `tailwindcss`, `prettier`, `prettier-plugin-tailwindcss`). Exposes the listed config files via the `files` field.

**Configs**:
- `tsconfig.base.json` — strict TypeScript: `target: ES2022`, `lib: ["ES2022"]`, `module: ESNext`, `moduleResolution: bundler`, `resolveJsonModule: true`, `allowJs: true`, `strict: true`, `noEmit: true`, `esModuleInterop: true`, `skipLibCheck: true`, `forceConsistentCasingInFileNames: true`, `isolatedModules: true`, `incremental: true`, and the Next.js TS plugin.
- `tailwind.js` — design-system colors mapped to CSS variables (`background`, `surface`, `text-primary`, `text-secondary`, `accent`, `accent-hover`, `border`, `error`, `success`), plus `fontFamily.display`/`fontFamily.sans`. Content glob covers `./src/**/*` (consuming app) and `../../packages/{ui,forms,analytics,seo}/src/**/*`.
- `nextjs.js` — `reactStrictMode: true`, `transpilePackages: ['@ydm-agency/ui', '@ydm-agency/forms', '@ydm-agency/seo', '@ydm-agency/analytics', '@ydm-agency/utils']`. (`email` and `config` are not included.)
- `eslint-next.js` — extends `next/core-web-vitals` + `prettier`; turns off `@next/next/no-html-link-for-pages`.
- `eslint-react.js` — extends `eslint:recommended`, `plugin:react/recommended`, `prettier`; `parserOptions` for latest ES modules and JSX; React version `detect`; `react/react-in-jsx-scope` and `react/prop-types` off.
- `prettier.js` — `prettier-plugin-tailwindcss`, single quote, semicolons, tab width 2, `trailingComma: 'es5'`, `printWidth: 100`.

**Observations**:
- Tailwind design tokens rely on CSS variables defined in `apps/firm-website/src/app/globals.css`; the config itself does not set values.
- The Tailwind `content` glob does not include `packages/email` or `packages/utils` source, which is acceptable because `email` uses inline styles and `utils` has no JSX.
- `transpilePackages` lists the runtime workspace packages used by the site; `@ydm-agency/email` is omitted because it is not currently imported by the app.
- The `files` field means these configs are included when the package is installed, but they are consumed by direct import rather than through a `main` entry.

**Analysis**: Solid centralized config that keeps TypeScript, Tailwind, ESLint, and Prettier consistent. The Tailwind content paths are correct for `apps/firm-website` but would need review if another app re-uses the same config.

---

## 4. Content Management

### 4.1 Services Configuration

**File**: `apps/firm-website/src/lib/services-config.ts`

**Structure**: Single module exporting `ProcessPhase`, `Deliverable`, `ServiceConfig`, and `SERVICES_CONFIG: Record<string, ServiceConfig>`.

**Types**:
- `ProcessPhase` — `phase` number, `title`, `duration`, `description`.
- `Deliverable` — `title`, `description`, `output`, `timeline`, `outcome`.
- `ServiceConfig` — `slug`, `h1`, `subhead`, `problemSolution`, `included[]`, `deliverables[]`, `whoItsFor`, `howItFits[]` (cross-service `{label, href}`), `workingWithYdm`, `faqs[]`, `finalCtaText`, `selectClients`, `disclaimer?`, `metaTitle`, `metaDescription`, `processPhases[]`, `processDisclaimer`.

**Services** (9):
- `web-design` — full site builds/redesigns.
- `seo` — search + AI search optimization.
- `maintenance` — monthly care and support.
- `analytics` — tracking, conversion reporting.
- `paid-ads` — Google/Meta ad management (`selectClients: true`, `processDisclaimer: true`, includes a `disclaimer` string).
- `branding` — positioning and visual identity.
- `content` — copy and blog content (empty `problemSolution`).
- `automation` — CRM/automation (`selectClients: true`, `processDisclaimer: true`, includes a `disclaimer` string).
- `reputation` — GBP and review management (`selectClients: true`, `processDisclaimer: true`, includes a `disclaimer` string).

**Usage**:
- `services/[slug]/page.tsx` — SSG params, metadata, and full service detail rendering.
- `services/[slug]/deliverables/page.tsx` — SSG params, metadata, and service-specific deliverables / “What You Get” page.
- `services/[slug]/faq/page.tsx` — SSG params, metadata, and grouped service FAQs.
- `services/[slug]/process/page.tsx` — SSG params, metadata, and service-specific process page.
- `services/pricing/page.tsx` — Derives pricing context from `SERVICES_CONFIG.included`, `selectClients`, and `PRICING_DETAILS`.
- `components/ServiceSubnav.tsx` — Navigation tabs across the four service spoke pages (overview, deliverables, process, FAQ).
- **Not** consumed by `/services` hub or `/services/process` hub, which maintain their own content arrays (duplication/inconsistency risk).

**Observations**:
- Content per service is comprehensive: problem/solution, inclusions, deliverables (with output, timeline, and outcome for each), audience, cross-service links, working-with-YDM, FAQs, process timeline, metadata, and select-client flags.
- Only `content` has an empty `problemSolution` string (`''`); all other 8 services, including `branding`, have fully written problem/solution copy.
- All copy in the config uses an impersonal, firm-level voice and customer-second-person (`your`, `you’ll`) with no first-person pronouns.
- The single-file format is convenient but large; splitting into per-service modules would reduce merge conflicts and improve maintainability.

**Analysis**: Well-typed, comprehensive content system. Main issues are the monolithic file, one empty `problemSolution` field (`content`), and the lack of reuse with the service/process hub pages.

### 4.2 Blog & Education Configuration

**Files**:
- `apps/firm-website/src/lib/blog-config.ts`
- `apps/firm-website/src/lib/education-config.ts`

**`blog-config.ts`**:
- Exports `BlogPost` interface with `slug`, `title`, `summary`, `category` (`'Opinion' | 'Analysis' | 'News' | 'Essay'`), `contentType`, `publishedAt`, `readTime`, `featured?`, `author?` (`name`, `role`, `photo?`, `bio?`), `pullQuote?`, `sections?` (`heading`, `body`, `type?`), `metaTitle`, and `metaDescription`.
- Contains 3 sample blog posts.
- Drives `/blog` hub (`blog/page.tsx`) and `/blog/[slug]` detail pages (`blog/[slug]/page.tsx`) with `generateStaticParams` and per-post metadata.

**`education-config.ts`**:
- Exports `EducationLessonSection`, `EducationLesson`, `EducationTopic` interfaces plus helpers `getLessonsByTopic`, `getTopicsFromLessons`, `getTopicBySlug`.
- `EducationLesson` includes `slug`, `title`, `summary`, `topic`, `level` (`'Beginner' | 'Intermediate' | 'Advanced'`), `readTime`, `attribution`, `safety` (`'public-domain' | 'cite-creator' | 'extra-care'`), `metaTitle`, `metaDescription`, `sections`, and `lastUpdated?`.
- `EducationTopic` includes `slug`, `name`, `description`, `icon` (Lucide icon name), and `order`.
- Contains 6 lessons across 5 topics: 2 SEO lessons, 1 Conversion, 1 Foundations, 1 Strategy, 1 Compliance — including 3 framework/attribution lessons (public domain, named frameworks, proprietary frameworks).
- Drives `/education` hub (`education/page.tsx`), `/education/[topic]` topic pages, and `/education/[topic]/[slug]` detail pages (`education/[topic]/[slug]/page.tsx`) with `generateStaticParams` and Article JSON-LD.

**Attribution & safety model**:
- `safety` categorizes lessons by sharing risk.
- `attribution` provides a short source/trademark note displayed on hub cards and lesson heroes.
- Framework content includes originators, creators, trademark symbols (e.g., SOSTAC®), and source links.

## 4.3 Content Voice

**Guideline** (per `AGENTS.md`): Impersonal firm-level voice — "YDM Agency builds..." — with no `we/us/our`; professional, direct, benefit-focused.

**Observations**:
- `services-config.ts` and the spoke detail/process pages strictly follow the guideline: third-person/firm references ("YDM Agency", "the firm"), passive/benefit-driven descriptions, and customer-second-person (`your`, `you’ll`). No first-person pronouns in the config.
- `education-config.ts` and `blog-config.ts` follow the firm-level voice: third-person explanations, no `we/us/our`, and direct attribution language ("Cite the creator in every reference", "Trademark and copyright awareness required").
- `apps/firm-website/src/app/page.tsx` breaks the rule in the 3-step process section: headings are **"We talk.", "We build.", "We deliver."**
- `packages/forms/src/LeadForm.tsx` uses first-person copy: **"Fill out the form below and we will get back to you within 24 hours."** and **"We have received your request."**
- `apps/firm-website/src/app/privacy/page.tsx` uses `we`/`us` in legal copy ("YDM Agency ('the firm,' 'we,' 'us') operates this website..."), which is conventional for privacy policies but still a first-person exception to the site-wide voice.
- Most other pages (`about`, `services` hub, `services/process` hub, `blog`, `education`) use the desired impersonal, firm-level voice.

**Analysis**: The configuration and the majority of pages follow the voice guideline well, but the homepage process headings and `LeadForm` copy contain clear first-person violations. The privacy policy first person is a common legal exception, but the other instances should be rewritten to maintain consistency.

---

## 5. Testing Infrastructure

### 5.1 Test Stack & Orchestration

- **Unit/Integration runner**: Vitest 2.1.9 (`vitest` catalog ^2.0.0) + `@testing-library/react` 16.3.2 + `@testing-library/jest-dom` 6.9.1 + `@testing-library/user-event` 14.6.1; `jsdom` environment; per-package `__tests__/setup.ts` imports `jest-dom`.
- **E2E runner**: `@playwright/test` 1.62.1 (specifier ^1.48.0); config at repo root `playwright.config.ts`; `testDir: './e2e'`; Chromium-only; `baseURL: 'http://localhost:3000'`; `trace: 'on-first-retry'`; HTML reporter; webServer `pnpm turbo run dev --filter=apps/firm-website`; `retries: 1`, `workers: 1` in CI, `forbidOnly` in CI.
- **Turbo pipeline**: `test` depends on `^build`, outputs `coverage/**`; `e2e` depends on `^build`, `cache: false`. Root `package.json` has `test` script but no `e2e` script; CI invokes `pnpm playwright test` directly after the build job.
- **Packages with `test` scripts**: only `@ydm-agency/ui` and `@ydm-agency/forms` (`vitest run`). `apps/firm-website`, `@ydm-agency/utils`, `@ydm-agency/analytics`, `@ydm-agency/email`, and `@ydm-agency/seo` have no test scripts or test files.

### 5.2 Test Coverage

- **`packages/ui/src/__tests__/`** (4 files): `Button.test.tsx` (5 cases: primary/secondary/ghost variants, `asChild`, disabled), `Card.test.tsx` (3: render, base classes, className merge), `Badge.test.tsx` (4: default/accent/outline variants, children), `CookieConsent.test.tsx` (4: banner render, accept/reject/cookie hide).
- **`packages/forms/src/__tests__/`** (2 files): `ContactForm.test.tsx` (5 cases: fields render, validation errors, honeypot hidden, valid submit payload, success message) and `schemas.test.ts` (7 cases: `contactFormSchema` valid/invalid name, email, message length, honeypot, projectType enum, optional projectType).
- **E2E**: `e2e/` contains only `.gitkeep`; no Playwright specs. The `e2e` CI job installs Chromium and runs Playwright, but currently has no tests to execute.
- **Untested packages**: `@ydm-agency/utils` (`cn`, `formatDate`, `formatCurrency`), `@ydm-agency/analytics` (`AnalyticsProvider`, `trackEvent`), `@ydm-agency/email` (`sendEmail`, React Email templates), `@ydm-agency/seo` (`constructMetadata`, `OrganizationJsonLd`), and all `apps/firm-website` routes/pages.

### 5.3 Gaps & Next Steps

- **E2E**: Add specs for critical user flows—contact form, navigation, cookie consent, service-spoke rendering—once the `/contact` route and backend action are implemented.
- **Unit tests**: Add tests for `utils` (per `AGENTS.md`), `analytics` consent/event dispatch, `email` template rendering and `sendEmail` outcomes, `seo` metadata/JSON-LD output.
- **App tests**: `apps/firm-website` has no component or page tests; consider Next.js integration tests for SSG service/process pages and the home hero CTAs.
- **Coverage/CI**: No coverage thresholds or `coverage/` artifacts; root `package.json` lacks an `e2e` script despite `turbo.json` defining the task.

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
2. **typecheck** — install → `pnpm turbo run typecheck` (`typecheck` depends on `^build` in `turbo.json`).
3. **build** — checkout with `fetch-depth: 2` → install → `pnpm turbo run build --filter='...[origin/main]'`.
4. **e2e** — needs `build` → install → `pnpm playwright install --with-deps chromium` → `pnpm playwright test`.

### 6.2 Turbo Pipeline & Scripts

- **`turbo.json` tasks**: `build` depends on `^build` and outputs `.next/**` and `dist/**`; `typecheck`, `test`, and `e2e` depend on `^build`; `lint` has no dependencies/outputs; `dev`, `clean`, and `e2e` set `cache: false`; `dev` is `persistent`.
- **Root `package.json` scripts**: `dev`, `build`, `test`, `lint`, `typecheck`, `clean`, `format`.
- **Script/Task mismatches**:
  - `format` script calls `turbo run format`, but `turbo.json` has no `format` task; this command will fail.
  - `e2e` task exists in `turbo.json`, but root `package.json` has no `e2e` script; CI calls `pnpm playwright test` directly instead of `turbo run e2e`.
- **CI does not run `test`**: the `test` Turbo task and root script exist, but there is no CI job that executes `pnpm turbo run test` or `pnpm test`.

### 6.3 Deployment & Release

- **No deployment workflow** in the repo and no `vercel.json`, `Dockerfile`, or release config.
- **Deployment target** per `AGENTS.md` is Vercel, but the repo only contains CI; deployment is presumed to be via the Vercel Git integration.
- **No staging/previews** or deploy artifact steps in CI; build output is the standard Next.js `.next` directory.

### 6.4 Gaps & Next Steps

- Add a root `e2e` script or switch the CI `e2e` job to `pnpm turbo run e2e`.
- Resolve the `format` script by adding a `format` task to `turbo.json` (or remove the script).
- Add a CI `test` job to run `pnpm turbo run test`.
- Add a deployment workflow or `vercel.json` if Vercel is the target, or document the manual/Vercel Git-based deploy process.

---

## 7. Environment Configuration

### 7.1 Environment Variables

**File**: `.env.example` (9 variables, grouped by category with comments).

**Declared variables**:
- **Analytics (client-side)**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_META_PIXEL_ID`.
- **Email (server secret)**: `RESEND_API_KEY`.
- **Database (client + server)**: `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
- **Rate limiting (server secrets)**: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`.
- **Scheduling (client-side)**: `NEXT_PUBLIC_CALENDLY_URL`.

**Actual code usage**:
- `RESEND_API_KEY` is the only `.env.example` variable consumed in code (`packages/email/src/index.ts`); a missing key returns `{ success: false, error: 'RESEND_API_KEY not configured' }`.
- `process.env.NODE_ENV` is used in `packages/analytics/src/events.ts` for development-only logging.
- `process.env.CI` is used in `playwright.config.ts` for retries, workers, and `reuseExistingServer`.
- `AnalyticsProvider` accepts `gaId`, `posthogKey`, and `metaPixelId` as props, but `apps/firm-website/src/app/providers.tsx` hardcodes them to `''`; no `NEXT_PUBLIC_*` analytics env var is read anywhere.
- `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, and `NEXT_PUBLIC_CALENDLY_URL` are declared but not referenced in the current codebase.

**Build / cache dependencies**:
- `turbo.json` declares `globalDependencies: ['**/.env.*local']`, so env-file changes invalidate the Turbo cache.

**Security posture**:
- Server-only variables (`RESEND_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `UPSTASH_*`) are documented without a `NEXT_PUBLIC_` prefix and are not exposed to the browser.
- No `.env.local`, `.env.*.local`, or committed secrets are present in the repo; only `.env.example` exists.

### 7.2 Gaps & Next Steps

- **Analytics wiring**: Read `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_POSTHOG_KEY`, and `NEXT_PUBLIC_META_PIXEL_ID` in `providers.tsx` and pass them to `AnalyticsProvider`.
- **Backend integration**: `SUPABASE_*` and `UPSTASH_*` variables are unused because the contact form Server Action, lead storage, and rate limiting are not yet implemented.
- **Calendly**: `NEXT_PUBLIC_CALENDLY_URL` is unused because the `/contact` route and Calendly embed are not yet implemented.
- **Validation**: Consider failing the build or logging loudly when required server secrets (`RESEND_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `UPSTASH_*`) are missing in production.

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
- React packages add `jsx: react-jsx` and DOM libs; `utils` has no JSX.
- None override `noEmit: true`, so `tsc` typechecks without emitting; Next.js transpiles workspace packages directly.
- `packages/ui/tsconfig.json` additionally excludes `src/__tests__`; other package configs do not exclude test files.

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
- `transpilePackages: ['@ydm-agency/ui', '@ydm-agency/forms', '@ydm-agency/seo', '@ydm-agency/analytics', '@ydm-agency/utils']`.
- `@ydm-agency/email` and `@ydm-agency/config` are not transpiled (email is unused by the app; config is a dev-only package).

**App config** (`apps/firm-website/next.config.js`): re-exports `@ydm-agency/config/nextjs.js`.

### 8.4 Linting & Formatting

**ESLint shared configs** (`packages/config/`):
- `eslint-next.js`: extends `next/core-web-vitals` + `prettier`; turns off `@next/next/no-html-link-for-pages`.
- `eslint-react.js`: extends `eslint:recommended`, `plugin:react/recommended`, `prettier`; sets `react: { version: 'detect' }`; turns off `react/react-in-jsx-scope` and `react/prop-types`.

**App usage**: `apps/firm-website/.eslintrc.js` requires `eslint-next.js`; `apps/firm-website/.prettierrc.js` requires `prettier.js`.

**Prettier shared config** (`packages/config/prettier.js`):
- `prettier-plugin-tailwindcss`, `singleQuote: true`, `semi: true`, `tabWidth: 2`, `trailingComma: 'es5'`, `printWidth: 100`.

### 8.5 Observations & Gaps

- **`noEmit` inherited by packages**: package `tsconfig.json` files set `outDir`/`rootDir` but do not set `noEmit: false`, so `tsc` will not write `dist` even for packages with a `build` script (e.g., `@ydm-agency/email`).
- **Transpile gap**: `@ydm-agency/email` is omitted from `transpilePackages`; since the app does not import it, this is currently harmless.
- **No build artifact for packages**: package `main`/`types` point to `./src/index.ts`; the monorepo relies on Next.js `transpilePackages` and source references rather than compiled `dist` output.

---

## 9. Dependencies Analysis

### 9.1 Dependency Management

- **Package manager**: `pnpm@9.15.0` (`packageManager` field); engines `node >=22.0.0`, `pnpm >=9.0.0`.
- **Workspace catalog**: `pnpm-workspace.yaml` centralizes shared versions under `catalog:`; package.json files use `catalog:` specifiers for most shared deps.
- **Lockfile**: `pnpm-lock.yaml` (`lockfileVersion: '9.0'`, `autoInstallPeers: true`).
- **Workspace links**: `apps/firm-website` depends on `@ydm-agency/{ui,forms,analytics,seo,utils}`. `packages/email` is not used by the app. `@ydm-agency/config` is dev-only shared configuration.

### 9.2 Runtime Dependencies

| Category | Package | Specifier | Resolved |
|---|---|---|---|
| **Framework** | `next` | `^15.1.0` | `15.5.22` |
| | `react` | `^19.0.0` | `19.2.8` |
| | `react-dom` | `^19.0.0` | `19.2.8` |
| **Styling** | `tailwindcss` | `^3.4.17` | `3.4.19` |
| | `autoprefixer` | `^10.4.20` | `10.5.4` |
| | `clsx` | `^2.1.1` | `2.1.1` |
| | `tailwind-merge` | `^2.5.5` | `2.6.1` |
| | `class-variance-authority` | `^0.7.0` | `0.7.1` |
| **UI components** | `lucide-react` | `^0.468.0` | `0.468.0` |
| | `@radix-ui/react-slot` | `^1.1.0` | `1.3.3` |
| | `@radix-ui/react-dialog` | `^1.1.0` | `1.1.23` |
| **Forms** | `react-hook-form` | `^7.54.0` | `7.83.0` |
| | `@hookform/resolvers` | `^3.9.0` | `3.10.0` |
| | `zod` | `^3.24.1` | `3.25.76` |
| **Theming** | `next-themes` | `^0.3.0` | `0.3.0` |
| **Email** | `resend` | `^4.0.0` | `4.8.0` |
| | `@react-email/components` | `^0.0.22` | `0.0.22` |
| | `@react-email/render` | `^0.0.12` | `0.0.12` |

### 9.3 Development & Tooling Dependencies

| Category | Package | Specifier | Resolved |
|---|---|---|---|
| **TypeScript** | `typescript` | `^5.6.0` / catalog `^5.6.3` | `5.9.3` |
| | `@types/node` | `^22.0.0` | `22.20.1` |
| | `@types/react` | `^19.0.0` | `19.2.17` |
| | `@types/react-dom` | `^19.0.0` | `19.2.3` |
| **Testing** | `vitest` | `^2.0.0` | `2.1.9` |
| | `@testing-library/react` | `^16.0.0` | `16.3.2` |
| | `@testing-library/user-event` | `^14.5.0` | `14.6.1` |
| | `@testing-library/jest-dom` | `^6.5.0` | `6.9.1` |
| | `@playwright/test` | `^1.48.0` | `1.62.1` |
| | `jsdom` | `^25.0.0` | `25.0.1` |
| | `@vitejs/plugin-react` | `^4.3.0` | `4.7.0` |
| **Lint/Format** | `eslint` | `^9.0.0` | `9.39.5` |
| | `eslint-config-next` | `^15.0.0` | `15.5.22` |
| | `eslint-config-prettier` | `^9.1.0` | `9.1.2` |
| | `eslint-plugin-react` | `^7.34.0` | `7.37.5` |
| | `prettier` | `^3.3.0` | `3.9.6` |
| | `prettier-plugin-tailwindcss` | `^0.6.0` | `0.6.14` |
| **Monorepo** | `turbo` | `^2.0.0` | `2.10.7` |
| | `@turbo/gen` | `^2.0.0` | `2.10.7` |

### 9.4 Observations & Gaps

- **Version alignment**: Most catalog deps resolve to the latest compatible version. `react-hook-form` resolves to `7.83.0` under `^7.54.0`—verify this is the intended minor, as it is far from the lower bound.
- **Radix UI divergence**: `@radix-ui/react-slot` (`1.3.3`) and `@radix-ui/react-dialog` (`1.1.23`) are on different minor tracks; acceptable but may be worth aligning.
- **React Email duplication**: `resend@4.8.0` transitively depends on `@react-email/render@1.1.2`, while `packages/email` directly declares `@react-email/render@0.0.12`; a third resolved version, `@react-email/render@0.0.17`, also appears in `pnpm-lock.yaml` as a transitive dependency. Three versions are installed; consider aligning on one.
- **Email package unused by app**: `resend`, `@react-email/components`, and `@react-email/render` are installed in `packages/email`, but `apps/firm-website` does not depend on `@ydm-agency/email`.
- **next-themes**: `0.3.0` is installed; `0.4+` is available if a future upgrade is desired.

---

## 10. Code Quality Observations

### 10.1 TypeScript Usage

**Strict Mode**: Enabled across all packages  
**Type Safety**: Proper typing for components, props, and functions  
**Interface vs Type**: Interfaces used for object shapes (per guidelines)

**Analysis**: Good TypeScript discipline with explicit types and proper strict mode usage.

### 10.2 React Patterns

**Component Types**: Functional components with hooks  
**Server Components**: Default in Next.js 15  
**Client Components**: Properly marked with 'use client' directive  
**Forward Refs**: Used for Button component

**Analysis**: Modern React patterns followed correctly. Proper separation of server and client components.

### 10.3 Code Organization

**File Naming**:
- Components: PascalCase (Button.tsx)
- Utilities: camelCase (formatDate.ts)
- Pages: kebab-case (services/[slug]/page.tsx)

**Analysis**: Consistent naming conventions following the specified guidelines.

### 10.4 Styling Practices

**Approach**: Tailwind utility classes with cn() helper  
**Custom Styles**: Minimal, only for global CSS variables  
**Responsive Design**: Mobile-first approach evident

**Analysis**: Clean styling approach with proper utility-first methodology.

---

## 11. Security Analysis

### 11.1 Implemented Security Measures

**Headers**:
- CSP with domain whitelisting
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy
- Permissions-Policy

**Form Security**:
- Honeypot field for bot detection
- Zod validation
- Server Actions (referenced in AGENTS.md, not yet examined)

**Privacy**:
- Cookie consent gating
- Privacy policy page
- No data collection without consent

**Analysis**: Good security posture with proper headers, bot protection, and privacy-first approach.

### 11.2 Potential Security Considerations

**Environment Variables**: Proper separation of client/server variables  
**API Keys**: Server-side secrets not exposed to client  
**Dependencies**: Modern versions, but regular security audits recommended

---

## 12. Performance Considerations

### 12.1 Performance Optimizations

**Fonts**: next/font/google with display: swap  
**Images**: Next.js Image component referenced in guidelines  
**Code Splitting**: Dynamic imports mentioned in guidelines  
**Build Optimization**: Turborepo caching and incremental builds

**Analysis**: Performance best practices are documented in guidelines, implementation should be verified.

### 12.2 Bundle Size

**Analysis**: No bundle analysis performed. Recommend adding bundle size monitoring.

---

## 13. Missing Implementations

### 13.1 Critical Missing Pages

1. **Contact Page** (`/contact`)
   - Referenced in navigation and CTAs
   - Should include ContactForm component
   - Should integrate with Supabase and Resend

2. **Demo Projects Page** (`/demos`)
   - Referenced in about page
   - Should showcase live project demos
   - Mentioned as proof of capability

**Note**: Service process pages (`/services/[slug]/process`), service deliverables pages (`/services/[slug]/deliverables`), service FAQ pages (`/services/[slug]/faq`), the service comparison page (`/services/compare`), the pricing page (`/services/pricing`), and the free audit page (`/audit`) are now implemented (see Section 2.2/2.3) and are no longer missing. `/blog` and `/education` (including `/education/[slug]` detail pages) are now implemented as well.

**Authoritative specs exist for both missing pages** (`docs/planning/`, not yet built) — see Section 16.2/16.3 for the full spec-vs-implementation comparison.

### 13.2 Missing Backend Integration

**Referenced in AGENTS.md but not examined**:
- Supabase leads table storage
- Upstash Redis rate limiting
- Server Actions for form submission

### 13.3 Missing Tests

- E2E tests (directory empty)
- Unit tests for utility functions
- Integration tests for forms

---

## 14. Recommendations

### 14.1 High Priority

1. **Implement Contact Page**
   - Create `/contact` route
   - Integrate ContactForm component
   - Implement Server Actions for form submission
   - Connect to Supabase and Resend

2. **Add E2E Tests**
   - Test critical user flows (contact form, navigation)
   - Test cookie consent functionality
   - Test responsive design

3. **Implement Demo Projects Page**
   - Create `/demos` route
   - Add demo project showcases
   - Link from about page

### 14.2 Medium Priority

4. **Split Services Configuration**
   - Break services-config.ts into separate files per service
   - Improve maintainability

5. **Add Unit Tests**
   - Test utility functions (cn, formatDate, formatCurrency)
   - Test form validation schemas
   - Test SEO utilities

### 14.3 Low Priority

6. **Add Bundle Analysis**
   - Implement bundle size monitoring
   - Optimize large dependencies

7. **Add Performance Monitoring**
   - Implement Core Web Vitals tracking
   - Add Lighthouse CI

8. **Enhance Error Handling**
   - Add global error boundaries
   - Improve error logging

---

## 15. Planning Documentation & Governance

### 15.1 `docs/planning/` Corpus (13 files, not yet cross-referenced against code)

| File | Size | Covers |
|---|---|---|
| `00-index.md` | 3.4KB | Shared placeholders (`[STD-CTA]`, `[RESPONSE-PROMISE]`) referenced by other docs |
| `01-strategy-positioning.md` | 2.8KB | Brand strategy |
| `02-design-system.md` | 4.5KB | Design tokens (source of truth AGENTS.md/config derive from) |
| `03-sitemap-ia-navigation.md` | 4.1KB | IA/nav — compare against `Header.tsx`/`Footer.tsx` |
| `04-home-page.md` | 3.6KB | Home page copy/layout spec |
| `05-services-copy.md` | 15.7KB | Services copy — largest planning doc, source for `services-config.ts` |
| `06-demos-page.md` | 3.4KB | `/demos` spec — see 15.3 |
| `07-process-copy.md` | 5.8KB | Process page copy |
| `08-about-page.md` | 3.0KB | About page spec |
| `09-contact-page.md` | 3.8KB | `/contact` spec — see 15.2 |
| `10-privacy-policy.md` | 4.8KB | Privacy policy spec |
| `11-tech-stack-implementation.md` | 7.6KB | Tech stack rationale |
| `12-launch-protocol.md` | 3.9KB | Launch checklist |

This corpus is not referenced anywhere in `analysis.md`'s prior revision or in `README.md`; it is the design source-of-truth for unbuilt pages.

### 15.2 Contact Page: Spec (`09-contact-page.md`) vs. Implementation

| Spec requirement | Implemented? |
|---|---|
| Route `/contact` with `ContactForm` | **No** — route absent (Section 2.2) |
| Server Action: validate → Supabase `leads` insert → Resend ack + internal notify | **No** — no Server Action anywhere in repo |
| Upstash rate limiting, 5/hr/IP | **No** — `@upstash/ratelimit` not a dependency |
| GA4 `form_submission` event on success | **No** — `trackEvent` never called from `ContactForm` |
| Calendly inline embed, lazy-loaded (`next/dynamic`, `ssr: false`) | **No** — no Calendly integration/dependency found |
| `role="alert"` on field errors | **No** — `ContactForm.tsx:80-135` renders errors as plain `<p className="text-error ...">`, no `role="alert"`/`aria-live` |
| Honeypot, Zod validation, React Hook Form | **Yes** — `ContactForm.tsx` fully implements these |
| Submit button copy "Get Your Free Project Outline" | **No** — actual button reads "Send Message" (`ContactForm.tsx:159`) |

### 15.3 Demos Page: Spec (`06-demos-page.md`) vs. Implementation

- Spec calls for 4 named demo subdomains: **Coastal Café** (restaurant), **Apex SaaS** (landing page), **Vanguard Plumbing** (local service), **Nova Storefront** (e-commerce) — each an independent Next.js app in the monorepo deployed to its own subdomain.
- **None exist**: no additional apps in `apps/`, no `/demos` route, no demo-related code anywhere in the repo.
- `/demos` is referenced twice in `about/page.tsx` (line 137 inline link, line 202 FAQ answer text) and is absent from `Header`/`Footer` nav — consistent with "not yet implemented" but the About page over-promises functionality that doesn't exist yet.

### 15.4 `.devin/workflows/` (9 files)

`audit-architecture.md`, `audit-code.md`, `audit-dependencies.md`, `audit-hygiene.md`, `audit-security.md`, `audit-tests.md`, `create-todo.md`, `execute-todo.md` (4-6KB each), plus `official/official.md` (42.9KB — largest single doc in the repo, not inspected in this pass due to size).

### 15.5 README.md / AGENTS.md Drift

- Both `README.md` and `AGENTS.md` have been updated to list the new service-page ecosystem routes (`/services/[slug]/faq`, `/services/compare`, `/services/pricing`, `/audit`) and the new `@ydm-agency/seo` `FaqPageJsonLd` export.
- Both `README.md` and `AGENTS.md` still list the education route as `/education/[slug]`. The actual implemented structure is the two-level `/education/[topic]/[slug]` (Section 2.2) — both governance docs are stale on this specific point.
- `AGENTS.md` does not list `success` as a documented color token (only `README`-adjacent `tailwind.js`/`globals.css` define it), though it's aliased to the same value as `accent` (Section 2.5) so the omission is low-impact.
- `README.md` and `AGENTS.md` route lists otherwise match the implemented routes in Section 2.2.

### 15.6 AGENTS.md Directives Not Currently Met

| AGENTS.md directive | Status |
|---|---|
| "Implement scroll reveals with Framer Motion" (line 56) | **Not met** — `framer-motion` is not a dependency in any `package.json`; no scroll-reveal animation code found anywhere in `apps/firm-website` or `packages/ui` |
| "Optimize images with Next.js Image component" (line 167) | **Not applicable yet** — zero `next/image` or `<img>` usage found in `apps/firm-website/src` (grep-confirmed); the only "photo" is an emoji placeholder (`👤`) in `about/page.tsx:29`, so there are no raster images to optimize |
| "Use dynamic imports for heavy components" (line 168) | **Not met** — no `next/dynamic` usage found anywhere in the app |
| "Lighthouse score targets: 90+ Performance, 95+ Accessibility" (line 170) | **Unverified** — no Lighthouse CI step in `.github/workflows/ci.yml`, no local Lighthouse config |

---

## 16. Accessibility & Resilience Audit

### 16.1 Error Handling Boundaries

No `error.tsx`, `not-found.tsx`, or `loading.tsx` exist anywhere in `apps/firm-website/src/app` (confirmed via `find_by_name` across the app tree). Dynamic routes (`services/[slug]`, `services/[slug]/process`, `services/[slug]/deliverables`, `services/[slug]/faq`, `education/[topic]`, `education/[topic]/[slug]`) call Next.js's `notFound()` for invalid params, but there is no custom `not-found.tsx` to style that state, and no `error.tsx` to catch runtime render errors — both fall back to Next.js's unstyled defaults.

### 16.2 Form & Interactive Component Accessibility

- **`ContactForm.tsx`** (`packages/forms/src`): field errors render as plain `<p className="text-error text-sm mt-1">` with no `role="alert"` or `aria-live` region, despite `docs/planning/09-contact-page.md:35` explicitly specifying `role="alert"` for errors and keyboard-navigable, accessible error states.
- **`CookieConsent.tsx`** (`packages/ui/src`): the bottom banner has no `role="dialog"`/`role="alertdialog"`, no `aria-live`, and no focus trap despite blocking the viewport and requiring a decision.
- **`CookieConsent.tsx:12-16`**: pressing `Escape` calls `reject()` directly — this silently opts the visitor out of analytics rather than performing a neutral dismiss, which may be an unintended UX side-effect of the Escape handler.
- **`Header.tsx`**: correctly implements a skip-to-content link, `aria-label`s on menu buttons, and Radix `Dialog` for the mobile nav (accessible focus trap/`Escape` handling comes from Radix here, unlike the custom `CookieConsent` implementation).

### 16.3 Images

No `next/image` or raw `<img>` tags exist anywhere in `apps/firm-website/src` (grep-confirmed). The About page's "Founder Photo" section (`about/page.tsx:26-32`) is a bordered placeholder `<div>` containing an emoji (`👤`) and the text "Founder Photo Placeholder" — there is currently no real photography/imagery in the site at all, only Lucide icons and CSS.

---

## 17. Code Hygiene & Type Safety

- **No `TODO`/`FIXME`/`XXX` comments** found anywhere in `apps/` or `packages/` (grep-confirmed across `.ts`/`.tsx`) — outstanding work is tracked in `docs/planning/` and `.devin/workflows/` rather than inline code comments.
- **No `any` type or `as any` casts** found in `apps/firm-website/src` or any `packages/*/src` (grep-confirmed) — this exceeds the AGENTS.md baseline and contradicts nothing; worth noting as a positive strength not previously captured.
- **`console.log` usage**: exactly one call, in `packages/analytics/src/events.ts:39`, gated by `process.env.NODE_ENV === 'development'`. No stray debug logging elsewhere.
- **`tsconfig.base.json` strictness**: `strict: true` is set, but stricter opt-in flags are not enabled: `noUncheckedIndexedAccess`, `noImplicitOverride`, `exactOptionalPropertyTypes`, `noPropertyAccessFromIndexSignature`. Not required by `AGENTS.md`, but would harden the `Record<string, ServiceConfig>`-style lookups in `services-config.ts`/`education-config.ts` where slug lookups aren't currently guaranteed non-`undefined` by the type system.
- **Vitest config** (`packages/ui/vitest.config.ts`, `packages/forms/vitest.config.ts`): both use `environment: 'jsdom'`, `globals: true`, and a package-local `setupFiles` importing `jest-dom`; each aliases its own workspace package to source (`@ydm-agency/utils`, `@ydm-agency/forms` respectively) for import resolution during tests, bypassing the built/published entry point.

---

## 18. Conclusion

The YDM Agency repository demonstrates a well-architected, modern web application built with current best practices. The monorepo structure is properly configured, the design system is comprehensive, and security measures are thoughtfully implemented. Type safety and code hygiene (Section 17) exceed the `AGENTS.md` baseline — no `any` usage, no stray debug logging, no unresolved `TODO`s.

**Overall Assessment**: Production-ready foundation with missing implementations for critical user-facing features and two categories of resilience gaps not previously documented: (1) no Next.js `error.tsx`/`not-found.tsx`/`loading.tsx` boundaries anywhere in the app, and (2) accessibility gaps in `ContactForm` error states and the `CookieConsent` banner (Section 16). Detailed, pre-written specs for both missing pages already exist in `docs/planning/06-demos-page.md` and `docs/planning/09-contact-page.md` (Section 15), including exact copy, a Supabase `leads` schema, and rate-limiting requirements — these should be treated as the implementation source of truth rather than re-derived from `AGENTS.md` alone.

**Next Steps**: Focus on implementing the missing contact page (per `docs/planning/09-contact-page.md`) and demos page (per `docs/planning/06-demos-page.md`), adding E2E tests, adding `error.tsx`/`not-found.tsx` boundaries, fixing the form/cookie-banner accessibility gaps, and reconciling `README.md`/`AGENTS.md` route documentation drift (Section 15.5) before launch.

---

**Analysis Completed By**: Cascade AI Assistant  
**Analysis Method**: Direct code examination without markdown documentation review, cross-referenced against `docs/planning/`, `AGENTS.md`, and `README.md` for spec/governance drift  
**Lines of Code Examined**: ~3,500+ across configuration, components, pages, and planning documentation
