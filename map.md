# YDM Agency — Repo Map v2

A human-readable and AI-usable blueprint of the YDM Agency monorepo.

This document is meant to be read by two audiences:

1. **You (the project owner)** — so you can understand what is built, what is still being built, what the moving parts do, and where to look when you want something changed.
2. **An AI coding assistant** — so it can quickly understand the project structure, conventions, status of features, known blockers, and where to make changes without breaking anything.

Every technical term is defined in the [Glossary](#14-glossary) or explained inline. The plain-English explanation comes before the technical detail.

> **Note:** This is a living document. If the codebase changes, this map should be updated to match.

---

## 1. What this project is, in plain English

The **YDM Agency website** is the public marketing site for YDM Agency. Its job is to:

- Explain what services YDM Agency offers.
- Show how those services fit together.
- Publish free educational lessons and learning paths to build trust.
- Capture leads through a contact form and a free marketing audit request.
- Allow visitors to schedule a call through Calendly.
- Load analytics (Google Analytics 4, PostHog, Meta Pixel) only after the visitor gives consent.

In short: a visitor reads about services and education, then either fills out a form or books a call. Submitted forms become leads stored in a database, and the site sends confirmation and notification emails.

**What the project is not:**

- It is not an online store (no checkout or payments).
- It is not a customer portal (no login or accounts for visitors).
- It is not a content management system with an admin dashboard; most content is stored in TypeScript config files.

### The technology stack (why these choices)

| Technology | What it is | Why it is used here |
|---|---|---|
| **Next.js 15** | A React framework for building websites | Handles pages, routing, server-side rendering, and SEO-friendly HTML generation. |
| **React 19** | The user interface library | Builds interactive components like forms, menus, and buttons. |
| **TypeScript 5.9** | JavaScript with strict type checking | Catches mistakes before the site goes live and makes the code easier for AI to reason about. |
| **Tailwind CSS 3.4** | A utility-first CSS framework | Keeps styling consistent and makes responsive design fast. |
| **Turborepo 2.10** | A build system for monorepos | Runs tasks (build, test, lint) across multiple packages efficiently and in the right order. |
| **pnpm 9.15** | Package manager | Installs dependencies and links the shared packages together. |
| **shadcn/ui + Radix** | A collection of accessible UI primitives | Provides buttons, dialogs, dropdowns, etc., customized with the YDM design system. |
| **Supabase** | A managed PostgreSQL database + backend service | Stores contact form leads. |
| **Resend** | Transactional email service | Sends the auto-acknowledgment and internal notification emails. |
| **Upstash Redis** | Managed Redis database | Rate-limits form submissions to 5 per hour per IP. |
| **Vercel** | Hosting and deployment platform | Runs the Next.js site in production. |

### Project model

This is a **monorepo** — one git repository containing the main website and several shared packages of reusable code. The shared packages live in `packages/` and the actual website lives in `apps/firm-website/`.

---

## 2. Status at a glance

This table is the fastest way to see what is done, what is partially done, and what still needs work.

| Area | Status | What it means |
|---|---|---|
| Homepage | [DONE] | Built and deployable. |
| Services hub (`/services`) | [DONE] | 8 service cards linking to detail pages. |
| 8 core service pages (`/services/[slug]`) | [DONE] | Each has a main page, deliverables, FAQ, and process spoke. |
| Service comparison (`/services/compare`) | [DONE] | Helps visitors choose the right service. |
| Service pricing (`/services/pricing`) | [DONE] | Pricing signals and investment factors. |
| Service process hub (`/services/process`) | [DONE] | Explains the agency process. |
| Industries hub + pages (`/services/industries`) | [DONE] | Industry-specific landing pages. |
| Contact form (`/contact`) | [DONE] | Stores leads, sends emails, rate-limits, and embeds Calendly. |
| Free marketing audit (`/audit`) | [DONE] | Submits to email; does not yet store in database. |
| Education hub + topics + lessons | [DONE] | 5 topics, 47 lessons, topic pages, and individual lesson pages. |
| Learning paths (`/education/paths`) | [DONE] | 4 cross-cutting learning paths. |
| About (`/about`) | [DONE] | Founder story; photo is still a placeholder. |
| Blog (`/blog` + `/blog/[slug]`) | [DONE] | Blog listing and individual posts. |
| Privacy policy (`/privacy`) | [DONE] | Required for cookie consent and analytics compliance. |
| Sitemap + robots | [DONE] | Auto-generated for search engines. |
| Cookie consent banner | [DONE] | Blocks analytics until the visitor consents. |
| Security headers | [DONE] | Applied via Next.js middleware. |
| Analytics (GA4, PostHog, Meta Pixel) | [PARTIAL] | Code exists, but provider IDs are empty and the current CSP blocks PostHog/Meta scripts. Analytics will not actually load even after consent. |
| E2E automated tests | [NOT DONE] | The `e2e/` folder is empty. No automated click-through testing yet. |
| Image optimization (Next.js Image) | [NOT DONE] | Not needed yet because the site uses no raster images, but it should be used if photos are added. |
| Lighthouse CI | [NOT DONE] | No automated performance/accessibility checks in CI. |
| Add-on service pages (CRO, Social Media, Accessibility, Podcast Production) | [NOT DONE] | Planned in `TASKS.md`, but the pages do not exist yet. |
| "How the System Works" page/section | [NOT DONE] | Planned in `TASKS.md`. |
| Orphaned package cleanup (`packages/branding`, `packages/design-system`, `packages/web-core`) | [NOT DONE] | These packages are not used by the live site and can confuse future work. |

### Launch-blocking issues to know about

1. **Analytics will not work until two things happen:** real IDs are added to `apps/firm-website/src/app/providers.tsx` and the Content-Security-Policy in `apps/firm-website/src/middleware.ts` is updated to allow PostHog and Meta Pixel scripts.
2. **Supabase environment variables in `.env.example` do not match the code.** The code uses `SUPABASE_URL` and `SUPABASE_ANON_KEY`, but `.env.example` lists `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Until this is aligned, contact-form leads cannot be stored in the database.
3. **Audit form does not store a lead in the database.** It only sends an email. If you want audit requests tracked alongside contact leads, the audit Server Action needs the same Supabase storage logic.
4. **No E2E tests yet.** This means there is no automated confirmation that the contact form, cookie consent, or navigation still work after each change.

---

## 3. How the site is organized

### Top-level directories

| Directory | What it is | Why it matters | Status |
|---|---|---|---|
| `apps/firm-website/` | The actual website | This is the only app that gets deployed to Vercel. | Active |
| `packages/ui/` | Reusable UI components (Button, Card, Header, Footer, CookieConsent, etc.) | Keeps the site looking consistent. | Active |
| `packages/forms/` | ContactForm, LeadForm, and Zod validation schemas | Centralizes form logic and validation rules. | Active |
| `packages/analytics/` | GA4, PostHog, Meta Pixel provider + `trackEvent` | Loads analytics only after cookie consent. | Active, partially broken (see blockers). |
| `packages/email/` | React Email templates and Resend sending | Sends auto-acknowledgment and internal notification emails. | Active |
| `packages/seo/` | Metadata helpers and JSON-LD schema components | Helps search engines understand pages. | Active |
| `packages/utils/` | `cn()`, `formatCurrency()`, `formatDate()` | Small shared helper functions. | Active |
| `packages/config/` | Shared ESLint, TypeScript, Tailwind, Prettier, Next.js configs | Keeps code style and build settings consistent. | Active (dev-only) |
| `packages/branding/` | Old design tokens | Not imported anywhere. The active design tokens are in `packages/config/tailwind.js` and `apps/firm-website/src/app/globals.css`. | [ORPHANED] |
| `packages/design-system/` | Broken copy of `packages/ui` | Excluded from the workspace because `package.json` contains two concatenated JSON objects. | [BROKEN] |
| `packages/web-core/` | Old format/env/layout/meta helpers | Not imported anywhere. | [ORPHANED] |
| `docs/` | Archived planning documents | Reference material for page copy and planning. | Reference only |
| `e2e/` | Playwright end-to-end tests | Currently empty. | [NOT DONE] |
| `.github/workflows/` | GitHub Actions CI | Runs lint, typecheck, build, and E2E tests on every push. | Active |
| `.devin/` | Devin AI agent workflows | Internal automation and checklists. | Active |

### Dependency graph (how packages connect)

```
apps/firm-website
├── @ydm-agency/analytics
│   └── @ydm-agency/ui
│       └── @ydm-agency/utils
├── @ydm-agency/email
├── @ydm-agency/forms
│   ├── @ydm-agency/ui
│   └── @ydm-agency/analytics
├── @ydm-agency/seo
├── @ydm-agency/ui
└── @ydm-agency/utils
```

What this means: `firm-website` depends on the other active packages. `forms` depends on `ui` and `analytics`. `ui` depends on `utils`. `config` is a dev-only package used by all of them for linting and typechecking.

---

## 4. The visitor journey (and how data flows)

### The core business flow: visitor → lead

1. **A visitor lands on the site.** The homepage, a service page, an education lesson, or an industry page.
2. **They click a call-to-action.** The primary CTA is "Get a Free Project Outline" and points to `/contact`. The secondary CTA is "Explore Services" and points to `/services`.
3. **They fill out the contact form** at `/contact`.
   - The browser checks that the email looks valid and required fields are filled (`packages/forms/src/schemas/contact-schema.ts`).
   - A hidden honeypot field helps detect bots.
4. **The form is sent to a Server Action** at `apps/firm-website/src/app/contact/actions.ts`.
   - The server re-validates the data.
   - Upstash rate-limiting checks that this IP has not submitted more than 5 times in the last hour.
   - The lead is inserted into the `leads` table in Supabase.
   - Resend sends two emails: an acknowledgment to the visitor and a notification to `contact@ydmagency.com`.
5. **The visitor sees a success message.** They can also book a call via the Calendly embed.
6. **You (or your team) receive the lead** in the Supabase dashboard and in the notification email.

### The audit request flow

1. **A visitor lands on `/audit`.**
2. **They fill out the free marketing audit form** (`apps/firm-website/src/components/AuditForm.tsx` and `apps/firm-website/src/lib/audit-schema.ts`).
3. **The form is sent to a Server Action** at `apps/firm-website/src/app/audit/actions.ts`.
   - The data is validated.
   - An email is sent via `packages/email/src/index.ts`.
   - **It is not currently stored in the database.**
4. **The visitor sees a success message.**

### The analytics consent flow

1. **A visitor arrives.** A cookie consent banner appears.
2. **If they accept analytics,** the `AnalyticsProvider` (`packages/analytics/src/Analytics.tsx`) tries to load the GA4, PostHog, and Meta Pixel scripts.
3. **If they decline,** the scripts are not loaded.
4. **Current problem:** Even if a visitor accepts, the scripts will not actually load because:
   - The provider IDs are empty strings in `apps/firm-website/src/app/providers.tsx`.
   - The Content-Security-Policy in `apps/firm-website/src/middleware.ts` does not allow the PostHog and Meta Pixel script hosts.

### Security headers

Every page request goes through `apps/firm-website/src/middleware.ts`, which adds these headers:

- `Content-Security-Policy` — restricts which outside scripts, styles, and images the site may load.
- `X-Frame-Options: DENY` — prevents the site from being embedded in an iframe.
- `X-Content-Type-Options: nosniff` — prevents browsers from guessing file types.
- `Referrer-Policy: strict-origin-when-cross-origin` — limits referrer information sent to other sites.
- `Permissions-Policy` — disables camera, microphone, and geolocation access.

---

## 5. Where things live (index)

Use this section when you want to know "which file controls X."

| If you want to change... | Look in this file |
|---|---|
| The homepage | `apps/firm-website/src/app/page.tsx` |
| The root layout (fonts, theme, providers) | `apps/firm-website/src/app/layout.tsx` |
| Theme, cookie consent, and analytics provider setup | `apps/firm-website/src/app/providers.tsx` |
| Global CSS variables and Tailwind theme colors | `apps/firm-website/src/app/globals.css` |
| Security headers | `apps/firm-website/src/middleware.ts` |
| The sitemap | `apps/firm-website/src/app/sitemap.ts` |
| The robots file | `apps/firm-website/src/app/robots.ts` |
| The 8 core service pages | `apps/firm-website/src/lib/services-config.ts` |
| Short service labels | `apps/firm-website/src/lib/service-labels.ts` |
| `/services/compare` scenarios | `apps/firm-website/src/lib/service-comparison-config.ts` |
| `/services/pricing` content | `apps/firm-website/src/lib/pricing-config.ts` |
| The pricing estimator logic | `apps/firm-website/src/lib/pricing-estimator.ts` |
| Industry pages | `apps/firm-website/src/lib/industries-config.ts` |
| FAQ content and helpers | `apps/firm-website/src/lib/faq-utils.ts` |
| Education topics, lessons, and learning paths | `apps/firm-website/src/lib/education/` (especially `types.ts`, `learning-paths.ts`, and `*-lessons.ts`) |
| Education hub layout | `apps/firm-website/src/app/education/page.tsx` |
| Blog posts | `apps/firm-website/src/lib/blog-config.ts` |
| The audit form schema | `apps/firm-website/src/lib/audit-schema.ts` |
| The audit form UI | `apps/firm-website/src/components/AuditForm.tsx` |
| The contact form submission logic | `apps/firm-website/src/app/contact/actions.ts` |
| The audit form submission logic | `apps/firm-website/src/app/audit/actions.ts` |
| The contact/lead form components and schemas | `packages/forms/src/` |
| The email templates and sending logic | `packages/email/src/` |
| Reusable UI components (Button, Card, Header, Footer, etc.) | `packages/ui/src/` |
| Analytics loading and event tracking | `packages/analytics/src/` |
| SEO metadata and JSON-LD helpers | `packages/seo/src/` |
| Shared helper functions | `packages/utils/src/` |
| Shared lint/type/tailwind configs | `packages/config/` |

---

## 6. Routes and what they do

The website uses **Next.js App Router**. Each folder under `apps/firm-website/src/app/` that contains a `page.tsx` file becomes a public route.

| Public route | File(s) | What a visitor does there | Status |
|---|---|---|---|
| `/` | `app/page.tsx` | Homepage introducing YDM Agency | [DONE] |
| `/about` | `app/about/page.tsx` | Founder story | [DONE] (photo placeholder) |
| `/audit` | `app/audit/page.tsx` + `app/audit/actions.ts` | Free marketing audit request | [DONE] |
| `/contact` | `app/contact/page.tsx` + `app/contact/actions.ts` | Contact form + Calendly | [DONE] |
| `/blog` | `app/blog/page.tsx` | Blog listing | [DONE] |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Individual blog post | [DONE] |
| `/education` | `app/education/page.tsx` | Education hub | [DONE] |
| `/education/[topic]` | `app/education/[topic]/page.tsx` + `TopicContent.tsx` | Topic lesson listing | [DONE] |
| `/education/[topic]/[slug]` | `app/education/[topic]/[slug]/page.tsx` | Individual lesson | [DONE] |
| `/education/paths` | `app/education/paths/page.tsx` | Learning paths hub | [DONE] |
| `/education/paths/[slug]` | `app/education/paths/[slug]/page.tsx` | Individual learning path detail | [DONE] |
| `/privacy` | `app/privacy/page.tsx` | Privacy policy | [DONE] |
| `/services` | `app/services/page.tsx` + `layout.tsx` | 8-card services hub | [DONE] |
| `/services/[slug]` | `app/services/[slug]/page.tsx` | Individual service page (one of 8 core services) | [DONE] |
| `/services/[slug]/deliverables` | `app/services/[slug]/deliverables/page.tsx` | Deliverables spoke page | [DONE] |
| `/services/[slug]/faq` | `app/services/[slug]/faq/page.tsx` | FAQ spoke page with FAQPage JSON-LD | [DONE] |
| `/services/[slug]/process` | `app/services/[slug]/process/page.tsx` | Process spoke page | [DONE] |
| `/services/process` | `app/services/process/page.tsx` | Process hub | [DONE] |
| `/services/compare` | `app/services/compare/page.tsx` | Service comparison | [DONE] |
| `/services/pricing` | `app/services/pricing/page.tsx` | Pricing and investment factors | [DONE] |
| `/services/industries` | `app/services/industries/page.tsx` | Industries hub | [DONE] |
| `/services/industries/[slug]` | `app/services/industries/[slug]/page.tsx` | Industry-specific landing page | [DONE] |

`[slug]` and `[topic]` are dynamic placeholders. For example, `/services/seo` and `/services/branding` use the same `app/services/[slug]/page.tsx` file, with the content pulled from `services-config.ts`.

---

## 7. Shared packages (the building blocks)

### `@ydm-agency/ui`

- **What it does:** Provides reusable visual components used across the site.
- **Exports:** `Button`, `Card`, `Container`, `Badge`, `Hero`, `Features`, `Header`, `Footer`, `Pricing`, `ThemeToggle`, `CookieConsent`, `CookieConsentProvider`, `useConsent`, `CookieSettingsButton`.
- **Depends on:** `@ydm-agency/utils`, Radix UI primitives, `next-themes`, `lucide-react`.
- **Why it matters:** If you want to change how buttons or the header look, you change them here and every page benefits.
- **Where it is used:** `firm-website`, `forms`, `analytics`.
- **AI notes:** Components are in `packages/ui/src/`. Tests are in `packages/ui/src/__tests__/`. Use Tailwind classes; avoid inline styles.

### `@ydm-agency/forms`

- **What it does:** Builds and validates the contact form and lead capture form.
- **Exports:** `ContactForm`, `LeadForm`, `contactFormSchema`, `leadCaptureSchema`.
- **Depends on:** `@ydm-agency/ui`, `@ydm-agency/analytics`, `zod`, `react-hook-form`, `@hookform/resolvers`.
- **Why it matters:** Form validation rules live in one place, so the browser and server can share the same logic.
- **Where it is used:** `firm-website` (contact and audit pages). `LeadForm` is available but may not yet be used.
- **AI notes:** Schemas are in `packages/forms/src/schemas/`. Any field change requires updating the schema, the form component, and the Server Action.

### `@ydm-agency/analytics`

- **What it does:** Loads GA4, PostHog, and Meta Pixel scripts after cookie consent and provides `trackEvent()`.
- **Exports:** `AnalyticsProvider`, `trackEvent`.
- **Depends on:** `@ydm-agency/ui` (for consent state), `next`, `react`.
- **Why it matters:** This is how you know how many visitors the site gets and whether they convert.
- **Where it is used:** Wrapped in `app/providers.tsx`.
- **AI notes:** Provider IDs are currently empty strings. The CSP in `middleware.ts` does not include the PostHog or Meta Pixel hosts in `script-src`, so those scripts will be blocked.

### `@ydm-agency/email`

- **What it does:** Renders React Email templates and sends them through Resend.
- **Exports:** `sendEmail`, `AcknowledgmentEmail`, `NotificationEmail`.
- **Depends on:** `resend`, `@react-email/components`, `@react-email/render`.
- **Why it matters:** This is how a visitor gets a confirmation email and you get a notification when a form is submitted.
- **Where it is used:** `apps/firm-website/src/app/contact/actions.ts` and `apps/firm-website/src/app/audit/actions.ts`.
- **AI notes:** `FROM_ADDRESS` is `YDM Agency <noreply@ydmagency.com>` and `TO_ADDRESS` is `contact@ydmagency.com`. Requires `RESEND_API_KEY`.

### `@ydm-agency/seo`

- **What it does:** Generates page metadata and structured data (JSON-LD) for search engines.
- **Exports:** `constructMetadata`, `OrganizationJsonLd`, `ServiceJsonLd`, `FaqPageJsonLd`.
- **Depends on:** `next`, `react`.
- **Why it matters:** Helps Google understand what each page is about and improves how pages appear in search results.
- **Where it is used:** Service pages, FAQ pages, and other routes in `firm-website`.
- **AI notes:** Untested. JSON-LD components are in `packages/seo/src/JsonLd.tsx` and `FaqPageJsonLd.tsx`.

### `@ydm-agency/utils`

- **What it does:** Tiny shared helper functions.
- **Exports:** `cn` (class name merger), `formatCurrency`, `formatDate`.
- **Depends on:** `clsx`, `tailwind-merge`.
- **Why it matters:** `cn()` is used everywhere to combine Tailwind classes conditionally.
- **Where it is used:** Across `packages/ui`, `packages/forms`, and `firm-website`.
- **AI notes:** Unit tests exist in `packages/utils/src/`. `formatCurrency` and `formatDate` are exported but not currently used in routes.

### `@ydm-agency/config`

- **What it does:** Shared developer configuration. It has no runtime code.
- **Files:** `eslint-next.js`, `eslint-react.js`, `eslint-ui.config.mjs`, `nextjs.js`, `prettier.js`, `tailwind.js`, `tsconfig.base.json`.
- **Why it matters:** Keeps code style, linting, and TypeScript settings consistent across the monorepo.
- **Where it is used:** As a dev dependency in every active package and in `firm-website`.

### Orphaned packages

| Package | What it is | Why it is orphaned | What to do about it |
|---|---|---|---|
| `packages/branding/` | Design tokens and a test suite | Misnamed `@packages/branding` and its values are duplicated in `packages/config/tailwind.js` and `globals.css`. | Safe to archive or delete. |
| `packages/design-system/` | Broken fork of `packages/ui` | `package.json` is malformed (two JSON objects concatenated) and the package is excluded in `pnpm-workspace.yaml`. | Either fix and merge into `packages/ui` or delete. |
| `packages/web-core/` | Format, env, layout, and meta helpers | Misnamed `@packages/web-core` and not imported anywhere. | Safe to archive or delete. |

None of these affect the live site. They mostly create clutter and potential confusion.

---

## 8. Design and content rules

### Color palette

These colors are defined in `apps/firm-website/src/app/globals.css` and `packages/config/tailwind.js`.

| Token | Hex value | Use case |
|---|---|---|
| Background | `#0A0A0B` | Main page background (very dark, near-black). |
| Surface | `#161618` | Cards, elevated sections, form backgrounds. |
| Accent | `#3B82F6` | Primary buttons, links, highlights. |
| Accent hover | `#4B8AF2` | Button/link hover state. |
| Border | `#2A2A2E` | Dividers, card borders, input borders. |
| Text primary | `#F5F5F6` | Headings and main body text. |
| Text secondary | `#A1A1A9` | Descriptions, captions, muted text. |
| Error | `#F87171` | Form validation errors. |
| Success | `#3B82F6` | Success states (aliased to accent). |

### Typography

- **Headings:** Clash Display (local variable font, loaded from `public/fonts/ClashDisplay-Variable.woff2`).
- **Body:** Inter Variable (loaded from Google Fonts via `next/font/google`).
- **Max content width:** `max-w-6xl` (1152 px). Use the `Container` component from `@ydm-agency/ui`.

### Styling rules

- Use Tailwind utility classes.
- Use the `cn()` helper for conditional class names.
- Avoid inline styles.
- Design mobile-first and scale up with responsive prefixes (`sm:`, `md:`, `lg:`).
- Default theme is dark.

### Content voice and tone

- Use an impersonal firm-level voice: "YDM Agency builds…" not "We build…"
- Never use first-person plural: no "we," "us," or "our."
- Be professional, direct, and benefit-focused.
- Do not include fake testimonials or made-up social proof.
- Primary CTA: "Get a Free Project Outline" → `/contact`.
- Secondary CTA: "Explore Services" → `/services`.
- Email: `contact@ydmagency.com`.
- Response promise: instant auto-acknowledgment + personal reply within 2 business hours.
- No phone number at launch.

---

## 9. Environment variables and deployment

### Environment variables

Copy `.env.example` to `.env.local` and fill in the values. Never commit `.env.local` to git.

| Variable | Public or secret? | What it does | Current issue |
|---|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Public (visible to browser) | Google Analytics 4 tracking ID. | Empty in `providers.tsx`; analytics will not load. |
| `NEXT_PUBLIC_POSTHOG_KEY` | Public | PostHog project API key. | Empty; also blocked by CSP. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Public | Meta (Facebook/Instagram) Pixel ID. | Empty; also blocked by CSP. |
| `RESEND_API_KEY` | Secret | Sends transactional emails through Resend. | Required for contact and audit forms to send email. |
| `SUPABASE_URL` | Secret (used server-side) | Supabase project URL for the leads table. | `.env.example` lists `NEXT_PUBLIC_SUPABASE_URL` instead; code expects `SUPABASE_URL`. |
| `SUPABASE_ANON_KEY` | Secret | Supabase key for the leads table. | `.env.example` lists `SUPABASE_SERVICE_ROLE_KEY` instead; code expects `SUPABASE_ANON_KEY`. |
| `UPSTASH_REDIS_REST_URL` | Secret | Upstash Redis REST endpoint. | Required for rate limiting on the contact form. |
| `UPSTASH_REDIS_REST_TOKEN` | Secret | Upstash Redis REST token. | Required for rate limiting. |
| `NEXT_PUBLIC_CALENDLY_URL` | Public | Calendly scheduling URL. | Optional; defaults to `https://calendly.com/ydm-agency/project-consultation`. |

**Important discrepancy to fix:**

- The contact Server Action in `apps/firm-website/src/app/contact/actions.ts` reads `process.env.SUPABASE_URL` and `process.env.SUPABASE_ANON_KEY`.
- `.env.example` currently documents `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
- This means if you copy `.env.example` exactly, the contact form will fail to store leads in Supabase.
- **Fix:** Update `.env.example` to match the code (`SUPABASE_URL` and `SUPABASE_ANON_KEY`), or update the code to match `.env.example`. Most likely you want to keep `SUPABASE_URL` / `SUPABASE_ANON_KEY` and fix `.env.example`.

### Deployment

- **Platform:** Vercel.
- **Build command:** `pnpm build` (uses Turborepo).
- **Dev command:** `pnpm dev`.
- **CI/CD:** GitHub Actions `.github/workflows/ci.yml` runs on every push to `main` and every pull request:
  1. `turbo run lint`
  2. `turbo run typecheck`
  3. `turbo run build`
  4. Playwright E2E tests (will fail or be skipped until tests are added).

### Common commands

| Command | What it does |
|---|---|
| `pnpm install` | Installs dependencies. |
| `pnpm dev` | Runs the website locally on `http://localhost:3000`. |
| `pnpm build` | Builds the production version. |
| `pnpm test` | Runs unit tests with Vitest. |
| `pnpm test:coverage` | Runs unit tests and generates a coverage report. |
| `pnpm lint` | Checks code style across packages. |
| `pnpm typecheck` | Runs TypeScript type checking. |
| `pnpm format` | Formats code with Prettier. |

---

## 10. Testing

### Current test coverage

| Type | What is tested | What is not tested | Status |
|---|---|---|---|
| **Unit tests** | `cn`, `formatCurrency`, `formatDate` in `utils`; contact and lead schemas in `forms`; some `ui` components; `audit-schema`, `contrast`, `industries-config`, and `pricing-estimator` in `firm-website/src/lib/`. | `analytics`, `email`, `seo` packages. | Active, partial |
| **Integration tests** | None dedicated. | Contact form end-to-end, audit form, email sending. | [NOT DONE] |
| **E2E tests** | `e2e/` directory is empty. | Navigation, contact form, cookie consent, audit form. | [NOT DONE] |

### Test tools

- **Vitest** for unit and integration tests.
- **Playwright** for E2E tests (configured at `playwright.config.ts`).
- **jest-axe** for accessibility checks in some tests.

### E2E tests that should be added

- Fill out the contact form and verify success.
- Verify cookie consent banner accepts/declines analytics.
- Navigate from the homepage to a service page and back.
- Submit the audit form and verify success.
- Verify the Calendly embed loads on `/contact`.

---

## 11. Known issues, blockers, and cleanup opportunities

### Launch blockers (should be fixed before the site is relied on for leads)

1. **Analytics is not wired up.**
   - `apps/firm-website/src/app/providers.tsx` passes empty strings for `gaId`, `posthogKey`, and `metaPixelId`.
   - The CSP in `apps/firm-website/src/middleware.ts` only allows `self`, `https://www.googletagmanager.com`, and `https://va.vercel-scripts.com` in `script-src`. It does not allow PostHog (`https://app.posthog.com`) or Meta Pixel (`https://connect.facebook.net`), so even with real IDs those scripts would be blocked.

2. **Supabase environment variables are misaligned.**
   - Code expects `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
   - `.env.example` documents `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
   - Until one side is corrected, the contact form cannot store leads.

3. **No E2E tests.**
   - There is no automated way to confirm that the contact form, cookie consent, or navigation still work after each change.

### Important but not launch-blocking

4. **Audit form does not store leads.**
   - `apps/firm-website/src/app/audit/actions.ts` only sends an email. If you want audit requests tracked in the same `leads` table as contact submissions, Supabase storage needs to be added.

5. **Orphaned packages clutter the repo.**
   - `packages/branding/`, `packages/design-system/`, and `packages/web-core/` are not used. They can confuse future AI assistants and add noise.

6. **No image optimization configured.**
   - The site currently uses no raster images, so this is fine for now. If photos or screenshots are added, use Next.js `<Image>` for automatic optimization.

7. **No Lighthouse CI.**
   - Performance and accessibility are not automatically measured in CI.

8. **Planned add-on pages are not yet implemented.**
   - `TASKS.md` lists CRO, Social Media, Accessibility, and Podcast Production service pages, plus a "How the System Works" section, as pending.

---

## 12. Common changes and where to start

This section is for both you and an AI. It says, "If you want to do X, the path through the codebase is Y."

### Change a service page

1. Open `apps/firm-website/src/lib/services-config.ts`.
2. Find the section for the service slug (e.g., `seo:`, `paid-ads:`).
3. Edit the `h1`, `subhead`, `problemSolution`, `included`, `faqs`, `processPhases`, and `deliverables` arrays.
4. Run `pnpm typecheck` and `pnpm test` to make sure nothing is broken.

### Change the contact form

1. Update the schema in `packages/forms/src/schemas/contact-schema.ts`.
2. Update the form UI in `packages/forms/src/ContactForm.tsx`.
3. Update the Server Action in `apps/firm-website/src/app/contact/actions.ts` to match the new fields.
4. Update the email templates in `packages/email/src/` if the email content needs to change.

### Add a new lesson

1. Open the relevant topic file in `apps/firm-website/src/lib/education/` (`seo-lessons.ts`, `conversion-lessons.ts`, etc.).
2. Add a new lesson object following the existing shape.
3. If the lesson belongs to a learning path, update `apps/firm-website/src/lib/education/learning-paths.ts`.

### Add a new learning path

1. Edit `apps/firm-website/src/lib/education/learning-paths.ts`.
2. Add the new path and the lessons it contains.
3. The page at `/education/paths/[slug]` will automatically pick it up.

### Change colors or fonts

1. Colors: edit `apps/firm-website/src/app/globals.css` (CSS variables) and `packages/config/tailwind.js` (Tailwind theme tokens).
2. Fonts: edit `apps/firm-website/src/app/layout.tsx` where `next/font` is configured.

### Add analytics

1. Add real IDs to `apps/firm-website/src/app/providers.tsx`:
   - `gaId` for GA4
   - `posthogKey` for PostHog
   - `metaPixelId` for Meta Pixel
2. Update the Content-Security-Policy in `apps/firm-website/src/middleware.ts` to allow the PostHog and Meta Pixel hosts in `script-src`.
3. Test with the browser console open to confirm scripts load without CSP errors.

### Add a new public page

1. Create a new folder under `apps/firm-website/src/app/` (e.g., `app/new-page/page.tsx`).
2. If the page needs metadata, use `constructMetadata` from `@ydm-agency/seo`.
3. Add the page to the sitemap in `apps/firm-website/src/app/sitemap.ts` if it should be indexed.
4. Run `pnpm typecheck` and `pnpm lint`.

### Run the site locally

```bash
pnpm install
pnpm dev
```

The site will be available at `http://localhost:3000`.

### Run tests

```bash
pnpm test              # unit tests
pnpm test:coverage     # unit tests with coverage
pnpm lint              # linting
pnpm typecheck         # TypeScript type checking
```

---

## 13. Glossary

This section defines the technical terms used throughout the document.

- **API key:** A secret password that lets one program talk to a service like Resend or Supabase. Should never be shared or committed to git.
- **CSP (Content-Security-Policy):** A security header that tells the browser which outside scripts, styles, and images the site is allowed to load.
- **Client-side validation:** Checking form inputs in the browser before sending them to the server.
- **Component:** A reusable piece of a user interface, like a button or a header.
- **E2E test (end-to-end test):** An automated test that simulates a real user clicking through the site.
- **Environment variable:** A value stored outside the code, usually in `.env.local`, that the site reads at runtime. Used for secrets and configuration.
- **Framework:** A pre-built structure that provides common functionality so developers do not have to write everything from scratch.
- **Git repository (repo):** A folder of code tracked by Git, with a history of changes.
- **JSON-LD:** A way to put structured data on a web page so search engines can read it. Used for FAQ pages and service pages.
- **Middleware:** Code that runs on every request before the page is served. In this project, it adds security headers.
- **Monorepo:** One git repository that contains multiple related projects or packages.
- **Next.js:** A popular React framework. The project uses Next.js 15 with the App Router.
- **Orphaned package:** A package in the repo that is not used by the live application.
- **Package:** A bundle of reusable code with its own `package.json` file.
- **pnpm:** The package manager used in this project (version 9.15.0). It installs dependencies and links workspace packages.
- **pnpm-workspace:** The way pnpm knows which apps and packages belong to the same monorepo.
- **React:** A JavaScript library for building user interfaces.
- **Server Action:** A function that runs on the server when a visitor does something like submit a form.
- **Server-side validation:** Re-checking form inputs on the server after they arrive, even if the browser already checked them.
- **shadcn/ui:** A collection of copy-pasteable, accessible React components built on top of Radix UI.
- **Slug:** A URL-friendly name, like `seo` in `/services/seo`.
- **Supabase:** A hosted database and backend service. This project uses it to store contact leads.
- **Tailwind CSS:** A CSS framework where you style elements by adding small utility classes directly in HTML/JSX.
- **Track event:** A record of something a visitor did, like submitting a form. Used in analytics.
- **Turborepo:** A tool that speeds up builds and tests in a monorepo by running tasks in the right order and caching results.
- **TypeScript:** A version of JavaScript that adds strict type checking to catch errors early.
- **Unit test:** A small test that checks one function or component in isolation.
- **Upstash:** A managed Redis service. This project uses it to limit how often one IP can submit a form.
- **Vercel:** The cloud platform where the website is deployed.
- **Workspace package:** A package inside the same monorepo that is shared by other packages.
- **Zod:** A TypeScript library for validating the shape and contents of data, especially form submissions.

---

## 14. Appendix: raw inventory for AI

### Active package file list

```
packages/analytics/src/
  ├── Analytics.tsx        # Consent-gated GA4 / PostHog / Meta Pixel loader
  ├── events.ts            # trackEvent helper
  └── index.ts             # Public exports

packages/config/
  ├── eslint-next.js
  ├── eslint-react.js
  ├── eslint-ui.config.mjs
  ├── nextjs.js
  ├── prettier.js
  ├── tailwind.js
  └── tsconfig.base.json

packages/email/src/
  ├── AcknowledgmentEmail.tsx
  ├── NotificationEmail.tsx
  ├── index.ts             # sendEmail
  └── ...

packages/forms/src/
  ├── ContactForm.tsx
  ├── LeadForm.tsx
  ├── index.ts
  ├── schemas/
  │   ├── contact-schema.ts (+ test)
  │   └── lead-schema.ts
  └── __tests__/

packages/seo/src/
  ├── constructMetadata.ts
  ├── FaqPageJsonLd.tsx
  ├── JsonLd.tsx
  └── index.ts

packages/ui/src/
  ├── index.ts             # Public exports
  ├── Button.tsx
  ├── Card.tsx
  ├── Container.tsx
  ├── Badge.tsx
  ├── Hero.tsx
  ├── Features.tsx
  ├── Header.tsx
  ├── Footer.tsx
  ├── Pricing.tsx
  ├── ThemeToggle.tsx
  ├── CookieConsent.tsx
  ├── CookieConsentContext.tsx
  ├── CookieSettingsButton.tsx
  └── __tests__/

packages/utils/src/
  ├── index.ts
  ├── cn.ts
  ├── cn.test.ts
  ├── formatCurrency.ts
  ├── formatCurrency.test.ts
  ├── formatDate.ts
  └── formatDate.test.ts
```

### `apps/firm-website/src/app/` route files

```
app/
├── page.tsx
├── layout.tsx
├── providers.tsx
├── globals.css
├── robots.ts
├── sitemap.ts
├── about/page.tsx
├── audit/page.tsx
├── audit/actions.ts
├── blog/page.tsx
├── blog/[slug]/page.tsx
├── contact/page.tsx
├── contact/actions.ts
├── education/page.tsx
├── education/[topic]/page.tsx
├── education/[topic]/TopicContent.tsx
├── education/[topic]/[slug]/page.tsx
├── education/paths/page.tsx
├── education/paths/[slug]/page.tsx
├── education/EducationSearch.tsx
├── education/LessonFilter.tsx
├── education/TableOfContents.tsx
├── education/EducationAnalytics.tsx
├── education/SocialShare.tsx
├── education/PrintButton.tsx
├── education/search-actions.ts
├── education/print.css
├── privacy/page.tsx
├── services/page.tsx
├── services/layout.tsx
├── services/[slug]/page.tsx
├── services/[slug]/deliverables/page.tsx
├── services/[slug]/faq/page.tsx
├── services/[slug]/process/page.tsx
├── services/compare/page.tsx
├── services/industries/page.tsx
├── services/industries/[slug]/page.tsx
├── services/pricing/page.tsx
└── services/process/page.tsx
```

### App-specific components and lib

```
apps/firm-website/src/
├── components/
│   ├── ServiceSubnav.tsx
│   ├── AuditForm.tsx
│   ├── CalendlyWidget.tsx
│   ├── CalendlyEmbed.tsx
│   ├── CalendlySection.tsx
│   └── PricingEstimator.tsx
├── lib/
│   ├── services-config.ts
│   ├── service-labels.ts
│   ├── service-comparison-config.ts
│   ├── pricing-config.ts
│   ├── pricing-estimator.ts
│   ├── pricing-estimator.test.ts
│   ├── industries-config.ts
│   ├── industries-config.test.ts
│   ├── faq-utils.ts
│   ├── audit-schema.ts
│   ├── audit-schema.test.ts
│   ├── blog-config.ts
│   ├── education-config.ts
│   ├── contrast.test.ts
│   └── education/
│       ├── types.ts
│       ├── learning-paths.ts
│       ├── seo-lessons.ts
│       ├── seo-lessons-new.ts
│       ├── conversion-lessons.ts
│       ├── conversion-lessons-new.ts
│       ├── foundations-lessons.ts
│       ├── foundations-lessons-new.ts
│       ├── strategy-lessons.ts
│       ├── strategy-lessons-new.ts
│       ├── compliance-lessons.ts
│       └── compliance-lessons-new.ts
└── middleware.ts
```

### Root configuration

```
ydm-agency/
├── .devin/
├── .github/workflows/ci.yml
├── .turbo/                  # generated
├── apps/firm-website/
├── coverage/                # generated
├── docs/
├── e2e/                     # empty placeholder
├── packages/
├── playwright-report/       # generated
├── turbo/generators/
├── .env.example
├── .gitignore
├── AGENTS.md                # full agent guidelines
├── README.md                # overview
├── TODO.md                  # completed task log
├── TASKS.md                 # pending task list
├── analysis.md
├── map.md                   # previous repo map
├── recommendations.md
├── services-copy.md
├── package.json
├── turbo.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── playwright.config.ts
├── vitest.config.ts
└── vitest.setup.ts
```

---

## 15. How to keep this map useful

- Update the [Status at a glance](#2-status-at-a-glance) section when a feature becomes done or partially done.
- Add new routes to [Routes and what they do](#6-routes-and-what-they-do).
- Update [Known issues](#11-known-issues-blockers-and-cleanup-opportunities) as blockers are resolved or new ones appear.
- If you add a new package or archive an orphaned one, update the package tables.
- If you change the environment variables, update [Environment variables and deployment](#9-environment-variables-and-deployment).

If an AI assistant is about to make a change, point it to this map first, especially the [Common changes](#12-common-changes-and-where-to-start) and [Where things live](#5-where-things-live-index) sections.
