I’ll produce the updated task register, starting with the header and table of contents, then the first five tasks in full detail—exactly matching the structure and style of the original document.

---

# YDM Agency — Implementation Task Register (Active)

<!--
  Status  : PENDING | IN_PROGRESS | COMPLETE | BLOCKED
  Labels  : [AGENT] = AI/CLI-executable | [HUMAN] = requires action outside IDE/CLI
  IDs     : T-NNN parent | T-NNN.N subtask
  Methods : SDD (Spec+DoD before subtasks) | DDD (domain grouping + ubiquitous language)
            TDD (TEST subtasks before impl) | BDD (Given/When/Then behavior) | Deep modules (narrow Exports)
-->

## Table of Contents

| ID | Title | Domain | Status |
|----|-------|--------|--------|
| T‑001 | Analytics Consent Architecture | Analytics + SEO | COMPLETE |
| T‑002 | SEO Infrastructure | Analytics + SEO | PENDING |
| T‑003 | Demo App Scaffold | Demo Applications | PENDING |
| T‑004 | Unit Testing Setup | Testing | PENDING |
| T‑005 | E2E Testing Setup | Testing | PENDING |
| T‑006 | Environment Variables & External Accounts | Infrastructure | PENDING |
| T‑007 | Contact Server Action Pipeline | Lead Capture | PENDING |
| T‑008 | Unit Tests: Components and Validation | Testing | PENDING |
| T‑009 | Demo: Coastal Cafe | Demo Applications | PENDING |
| T‑010 | Demo: Apex SaaS | Demo Applications | PENDING |
| T‑011 | Demo: Vanguard Plumbing | Demo Applications | PENDING |
| T‑012 | Demo: Nova Storefront | Demo Applications | PENDING |
| T‑013 | Contact Page Assembly | Lead Capture | PENDING |
| T‑014 | E2E Tests: Critical User Flows | Testing | PENDING |
| T‑015 | CI/CD Pipeline Updates | Infrastructure | PENDING |
| T‑016 | Deployment Configuration | Infrastructure | PENDING |
| T‑017 | Update Privacy Policy “Last Updated” Date | Pages | PENDING |

---

## [x] T‑001 — Analytics Consent Architecture
**Status:** COMPLETE | **Domain:** Analytics + SEO | **Depends On:** none | **Blocks:** none
**Spec:** Update `packages/analytics/src/Analytics.tsx` so that GA4, PostHog, and Meta Pixel scripts only inject into the DOM after `useConsent().analyticsConsent` is `true`. Add a `trackEvent` guard that silently no-ops when consent is false.
**Behavior:** Given a visitor who rejected cookies, when they navigate the site, then no GA4, PostHog, or Pixel network requests are made. Given a visitor who accepted, when they submit the contact form, then `trackEvent('form_submission', {...})` fires and appears in GA4 DebugView.
**Research:** `packages/analytics/src/Analytics.tsx` (current — uses `next/script` with `strategy="afterInteractive"`; needs consent gate). `packages/analytics/src/events.ts` (current `trackEvent` — check if it already guards on window). Confirm `useConsent` is exported from `@ydm-agency/ui` (already completed).
**Files:** `packages/analytics/src/Analytics.tsx` [UPDATE], `packages/analytics/src/events.ts` [UPDATE]
**Pattern:** Consent-gated script loading — scripts are not added to the DOM until consent state is `true`; `useConsent` provides the gate; scripts unmount if consent is later withdrawn.
**Anti-Patterns:** Never load analytics scripts unconditionally regardless of consent. Never call `window.gtag` without guarding `typeof window !== 'undefined' && window.gtag`.
**Rules:** (1) `AnalyticsProvider` is `'use client'`; it calls `useConsent()`. (2) Scripts render only inside `{analyticsConsent && <Script ...>}`. (3) `trackEvent` no-ops silently (no throw) when consent false or window.gtag absent.
**Exports:** `AnalyticsProvider`, `trackEvent` (unchanged public interface — internal behavior changes).
**DoD:** No network requests to analytics domains visible in DevTools when consent is rejected. `trackEvent` throws no errors when consent false. TypeCheck passes.
**Out of Scope:** Consent-gated Vercel Speed Insights (separate script). PostHog session recording consent.
**Validate:** `pnpm turbo run typecheck --filter=@ydm-agency/analytics`

**Subtasks:**
- [x] T‑001.1 [AGENT] `packages/analytics/src/Analytics.tsx` — UPDATE: add `'use client'` directive. Import `useConsent` from `@ydm-agency/ui`. Wrap all three `<Script>` tags in `{analyticsConsent && (<Script .../>)}`. Add `useEffect` to call `window.gtag?.('consent', 'update', { analytics_storage: 'granted' })` when consent becomes true.
- [x] T‑001.2 [AGENT] `packages/analytics/src/events.ts` — UPDATE: wrap each `window.gtag` / `window.posthog` call with `if (typeof window === 'undefined' || !window.gtag) return;` guard to silently no-op when scripts are not loaded.
- [x] T‑001.3 [AGENT] `CHANGELOG.md` — Append: `### T‑001 — Analytics\n- Consent-gated script loading implemented; analytics only fire after cookie acceptance.`

---

## [x] T‑002 — SEO Infrastructure
**Status:** COMPLETE | **Domain:** Analytics + SEO | **Depends On:** none | **Blocks:** none
**Spec:** Add `sitemap.ts` and `robots.ts` App Router route handlers to `apps/firm-website/src/app/`. Update `packages/seo/src` to support per-page OG image metadata. Ensure every page has a unique `<title>` and `<meta description>`.
**Behavior:** Given a search engine crawler hitting `https://ydm-agency.com/sitemap.xml`, when the response is returned, then it contains all static page URLs including all nine service spokes and nine process spokes. Given Googlebot checking `robots.txt`, then `Disallow: /api/` is present.
**Research:** `packages/seo/src/` (read existing `constructMetadata` — confirm it accepts `openGraph` image option). Confirm Next.js 15 App Router uses `sitemap.ts` exporting a `Sitemap` type array for automatic XML generation.
**Files:** `apps/firm-website/src/app/sitemap.ts` [CREATE], `apps/firm-website/src/app/robots.ts` [CREATE], `packages/seo/src/metadata.ts` [UPDATE — add OG image support]
**Pattern:** Next.js App Router metadata conventions — `sitemap.ts` and `robots.ts` are special route files that return typed objects; Next.js handles serialization to XML/txt.
**Anti-Patterns:** Never hardcode a static `sitemap.xml` file — use the dynamic route for maintainability. Never set `robots: 'noindex'` on production pages.
**Rules:** (1) `sitemap.ts` must include all 22 static pages (home, services hub, 9 spokes, process hub, 9 process spokes, demos, about, contact, privacy). (2) `changeFrequency: 'monthly'` on static content pages. (3) `priority: 1.0` on homepage; `0.8` on service spokes; `0.6` on process spokes.
**Exports:** Default exports from `sitemap.ts` and `robots.ts` (Next.js convention). Extended `constructMetadata` in `@ydm-agency/seo`.
**DoD:** `GET /sitemap.xml` returns valid XML with 22+ URLs. `GET /robots.txt` returns correct directives. All page files have `generateMetadata`. TypeCheck passes.
**Out of Scope:** Dynamic sitemap from CMS. Per-page OG image generation (phase 2).
**Validate:** `pnpm turbo run build --filter=apps/firm-website` then `curl http://localhost:3000/sitemap.xml | grep '<url>' | wc -l` (expect 22+).

**Subtasks:**
- [x] T‑002.1 [AGENT] `apps/firm-website/src/app/sitemap.ts` — CREATE: import `SERVICES_CONFIG` from `lib/services-config.ts`; export default function returning `MetadataRoute.Sitemap` array covering all 22 static URLs with correct `changeFrequency` and `priority` values. Base URL: `https://ydm-agency.com`.
- [x] T‑002.2 [AGENT] `apps/firm-website/src/app/robots.ts` — CREATE: export default function returning `{ rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }], sitemap: 'https://ydm-agency.com/sitemap.xml' }`.
- [x] T‑002.3 [AGENT] `packages/seo/src/metadata.ts` — UPDATE: add `openGraph.images` field to `constructMetadata` return value using the provided `ogImage` param (default: `/og-default.png`).

---

## [x] T‑003 — Demo App Scaffold
**Status:** COMPLETE | **Domain:** Demo Applications | **Depends On:** none | **Blocks:** T‑009, T‑010, T‑011, T‑012
**Spec:** Define the standard structure that all four demo apps follow. Create `apps/demo-restaurant/` as the canonical template. Every demo app: Next.js 15 App Router, shared `@ydm-agency/ui` + `@ydm-agency/config`, single-page or two-page layout, subdomain-aware, no auth, no CMS.
**Behavior:** Given `pnpm turbo run build --filter=apps/demo-restaurant`, when the build completes, then the app builds to a static export with no errors and all pages render in under 2s.
**Research:** `apps/demo-1/` (read existing structure — use as reference for package.json, next.config.js, tsconfig.json patterns). `pnpm-workspace.yaml` (confirm demo apps are covered by `apps/*` glob). `turbo.json` (confirm `build` pipeline covers all apps).
**Files:** `apps/demo-restaurant/package.json` [CREATE], `apps/demo-restaurant/next.config.js` [CREATE], `apps/demo-restaurant/tsconfig.json` [CREATE], `apps/demo-restaurant/tailwind.config.js` [CREATE], `apps/demo-restaurant/src/app/layout.tsx` [CREATE], `apps/demo-restaurant/src/app/globals.css` [CREATE]
**Pattern:** Monorepo app template — each demo inherits shared config from `@ydm-agency/config`; zero duplicated ESLint/TS/Tailwind config per app.
**Anti-Patterns:** Never copy-paste full config files across demo apps — always extend from `@ydm-agency/config`.
**Rules:** (1) Package name: `@ydm-agency/demo-{slug}`. (2) `next.config.js` enables `output: 'standalone'` for Vercel. (3) Tailwind config extends `@ydm-agency/config/tailwind`. (4) Each demo gets its own port (3001, 3002, 3003, 3004) for local dev.
**Exports:** Each demo app is a standalone Next.js application; no package exports.
**DoD:** `pnpm turbo run build --filter=apps/demo-restaurant` passes. TypeCheck passes. App renders at `localhost:3001` in dev.
**Out of Scope:** Shared demo layout component in `@ydm-agency/ui`. CMS integration.
**Validate:** `pnpm turbo run build --filter=apps/demo-restaurant && pnpm turbo run typecheck --filter=apps/demo-restaurant`

**Subtasks:**
- [x] T‑003.1 [AGENT] `apps/demo-restaurant/package.json` — CREATE: name `@ydm-agency/demo-restaurant`, scripts `dev: next dev -p 3001`, `build: next build`, `typecheck: tsc --noEmit`. Deps: `next: catalog:`, `react: catalog:`, `react-dom: catalog:`, `@ydm-agency/ui: workspace:*`, `@ydm-agency/config: workspace:*`, `tailwindcss: catalog:`.
- [x] T‑003.2 [AGENT] `apps/demo-restaurant/next.config.js` — CREATE: `module.exports = { output: 'standalone', transpilePackages: ['@ydm-agency/ui'] }`.
- [x] T‑003.3 [AGENT] `apps/demo-restaurant/tsconfig.json` — CREATE: `{ "extends": "@ydm-agency/config/tsconfig.json", "include": ["src", "next-env.d.ts"], "exclude": ["node_modules"] }`.
- [x] T‑003.4 [AGENT] `apps/demo-restaurant/tailwind.config.js` — CREATE: `module.exports = { ...require('@ydm-agency/config/tailwind'), content: ['./src/**/*.{js,ts,jsx,tsx}', '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'] }`.
- [x] T‑003.5 [AGENT] `apps/demo-restaurant/src/app/globals.css` — CREATE: `@tailwind base; @tailwind components; @tailwind utilities;` plus import the brand token CSS vars from `@ydm-agency/config` (copy relevant `:root` block from the config package).
- [x] T‑003.6 [AGENT] `apps/demo-restaurant/src/app/layout.tsx` — CREATE: minimal RSC layout with `<html lang="en" className="dark">`, appropriate metadata, `bg-background text-text-primary` body.

---

## [x] T‑004 — Unit Testing Setup
**Status:** COMPLETE | **Domain:** Testing | **Depends On:** none | **Blocks:** T‑008
**Spec:** Install and configure Vitest + `@testing-library/react` across `packages/ui` and `packages/forms`. Add `vitest.config.ts` to each. Add a `test` script to `turbo.json` pipeline. Configure JSDOM environment and global test utilities.
**Behavior:** Given `pnpm turbo run test --filter=@ydm-agency/ui`, when the command runs, then all unit tests in `packages/ui/src/__tests__/` execute and results are reported.
**Research:** Check `packages/ui/package.json` and `packages/forms/package.json` — confirm `vitest`, `@testing-library/react`, `@testing-library/user-event` are absent. Check `turbo.json` — confirm no `test` task exists. Check `pnpm-workspace.yaml` catalog — add testing deps there.
**Files:** `pnpm-workspace.yaml` [UPDATE — add test deps], `packages/ui/package.json` [UPDATE], `packages/ui/vitest.config.ts` [CREATE], `packages/forms/package.json` [UPDATE], `packages/forms/vitest.config.ts` [CREATE], `turbo.json` [UPDATE — add test task]
**Pattern:** Vitest with JSDOM environment — each package has its own `vitest.config.ts` extending a shared config. Tests live in `src/__tests__/` directories.
**Anti-Patterns:** Never run the full turbo test suite to verify a single package's tests — use `--filter` to isolate. Never mock React hooks globally when a targeted mock is sufficient.
**Rules:** (1) `environment: 'jsdom'` in vitest config. (2) `setupFiles: ['./src/__tests__/setup.ts']` for `@testing-library/jest-dom` matchers. (3) `turbo.json` test task depends on `^build`. (4) Tests do not make real network requests — use `vi.mock` for fetch calls.
**Exports:** No package exports. Test infrastructure only.
**DoD:** `pnpm turbo run test --filter=@ydm-agency/ui` executes with exit 0. `pnpm turbo run test --filter=@ydm-agency/forms` executes with exit 0. TypeCheck passes.
**Out of Scope:** Coverage reporting configuration. Snapshot testing.
**Validate:** `pnpm turbo run test --filter=@ydm-agency/ui && pnpm turbo run test --filter=@ydm-agency/forms`

**Subtasks:**
- [x] T‑004.1 [AGENT] `pnpm-workspace.yaml` — Add to catalog: `vitest: ^2.1.0`, `@testing-library/react: ^16.0.0`, `@testing-library/user-event: ^14.5.0`, `@testing-library/jest-dom: ^6.6.0`, `jsdom: ^25.0.0`, `@vitejs/plugin-react: ^4.3.0`.
- [x] T‑004.2 [AGENT] `packages/ui/package.json` — Add to `devDependencies`: all five test deps from catalog.
- [x] T‑004.3 [AGENT] `packages/ui/vitest.config.ts` — CREATE: `import { defineConfig } from 'vitest/config'; import react from '@vitejs/plugin-react'; export default defineConfig({ plugins: [react()], test: { environment: 'jsdom', setupFiles: ['./src/__tests__/setup.ts'], globals: true } })`.
- [x] T‑004.4 [AGENT] `packages/ui/src/__tests__/setup.ts` — CREATE: `import '@testing-library/jest-dom'`.
- [x] T‑004.5 [AGENT] `packages/forms/package.json` — Add same devDependencies as T‑004.2.
- [x] T‑004.6 [AGENT] `packages/forms/vitest.config.ts` — CREATE: same config as T‑004.3.
- [x] T‑004.7 [AGENT] `packages/forms/src/__tests__/setup.ts` — CREATE: `import '@testing-library/jest-dom'`.
- [x] T‑004.8 [AGENT] `turbo.json` — Add `"test": { "dependsOn": ["^build"], "cache": false }` to the `tasks` object.

---

## [ ] T‑005 — E2E Testing Setup
**Status:** PENDING | **Domain:** Testing | **Depends On:** none | **Blocks:** T‑014
**Spec:** Install and configure Playwright for E2E testing against the `apps/firm-website` dev server. Create `e2e/` directory at repo root. Configure `playwright.config.ts` targeting `localhost:3000`. Add `e2e` task to `turbo.json`.
**Behavior:** Given `pnpm playwright test`, when run against the running dev server, then Playwright launches a Chromium browser, navigates to the configured base URL, and executes all spec files in `e2e/`.
**Research:** Check `package.json` at repo root — confirm `@playwright/test` is absent. Confirm `e2e/` directory does not exist. Check GitHub Actions workflow `ci.yml` to understand where E2E fits in the pipeline.
**Files:** `package.json` (root) [UPDATE — add playwright as devDependency], `playwright.config.ts` [CREATE — at repo root], `e2e/` [CREATE DIR], `turbo.json` [UPDATE — add e2e task], `.github/workflows/ci.yml` [UPDATE — add E2E step]
**Pattern:** Playwright project config with single Chromium project for CI speed; additional browsers added in phase 2.
**Anti-Patterns:** Never run E2E tests against production URL in CI — always use the locally started dev server. Never hardcode absolute URLs in spec files.
**Rules:** (1) `baseURL: 'http://localhost:3000'` in config. (2) `webServer.command: 'pnpm turbo run dev --filter=apps/firm-website'`. (3) `webServer.url: 'http://localhost:3000'`. (4) `retries: 1` in CI, `0` in local.
**Exports:** No package exports. Test infrastructure only.
**DoD:** `pnpm playwright test --list` shows spec files without error. Config file valid. TypeCheck passes.
**Out of Scope:** Mobile device emulation (phase 2). Firefox/WebKit browsers (phase 2). Visual regression.
**Validate:** `pnpm playwright install chromium && pnpm playwright test --list`

**Subtasks:**
- [ ] T‑005.1 [AGENT] `package.json` (root) — Add `"@playwright/test": "^1.48.0"` to devDependencies.
- [ ] T‑005.2 [AGENT] `playwright.config.ts` — CREATE at repo root: configure `baseURL`, `webServer` (start firm-website dev server), `projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]`, `retries: process.env.CI ? 1 : 0`, `reporter: 'html'`.
- [ ] T‑005.3 [AGENT] `e2e/` — CREATE directory with a `.gitkeep` file so the directory is tracked.
- [ ] T‑005.4 [AGENT] `turbo.json` — Add `"e2e": { "dependsOn": ["^build"], "cache": false }` task.
- [ ] T‑005.5 [AGENT] `.github/workflows/ci.yml` — Add E2E job after the lint/typecheck/build jobs: `pnpm playwright install --with-deps chromium` then `pnpm playwright test`.

---

Below are tasks T‑006 through T‑010, continuing the same format, numbering, and depth as the original register.

---

## [ ] T‑006 — Environment Variables & External Accounts
**Status:** PENDING | **Domain:** Infrastructure | **Depends On:** none | **Blocks:** T‑007, T‑015
**Spec:** Create the `.env.local` for `apps/firm-website` (gitignored) and populate it with credentials from four external services. The documentation file `.env.example` and the `.gitignore` guard are already in place from earlier setup. All remaining work is **HUMAN** account creation and key collection.
**Behavior:** Given a developer running the firm‑website dev server after this task, when any server action or API call executes, then valid credentials are available and the service responds with live data.
**Research:** Confirm `.env.example` exists at repo root (already created). Confirm `.gitignore` includes `.env.local` entries (already verified). The required variables are: `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_META_PIXEL_ID`, `RESEND_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `NEXT_PUBLIC_CALENDLY_URL`.
**Files:** `apps/firm-website/.env.local` [CREATE — HUMAN fills values]
**Pattern:** Environment‑variable contract — `.env.example` documents every variable with its purpose and source; `.env.local` is never committed.
**Anti-Patterns:** Never commit `.env.local` or any file containing real API keys. Never use `NEXT_PUBLIC_` prefix for server‑only secrets.
**Rules:** (1) `SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY` must NOT have `NEXT_PUBLIC_` prefix. (2) All Upstash vars must NOT have `NEXT_PUBLIC_` prefix. (3) `.env.example` values are placeholders only.
**Exports:** No code exports. Configuration artifact only.
**DoD:** All nine variables are populated in `apps/firm-website/.env.local`. Dev server can connect to Supabase, Resend, and Upstash without errors. No real keys in any tracked file.
**Out of Scope:** Vault/secrets manager integration. Automatic env‑var injection in CI (handled in T‑015).
**Validate:** Start the dev server with `pnpm run dev --filter=apps/firm-website` and confirm no missing‑variable errors in the terminal.

**Subtasks:**
- [x] T‑006.1 [AGENT] `.env.example` — Already created with all 9 variables documented.
- [x] T‑006.2 [AGENT] `.gitignore` — Already verified to include `.env.local`, `.env*.local`.
- [ ] T‑006.3 [HUMAN] Create a Supabase project at `https://supabase.com`. Create a `leads` table with columns: `id uuid primary key`, `name text not null`, `email text not null`, `project_type text`, `message text not null`, `created_at timestamptz default now()`, `source text`. Copy `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`.
- [ ] T‑006.4 [HUMAN] Create a Resend account at `https://resend.com`. Verify the `ydmagency.com` domain. Create an API key with send permissions. Copy `RESEND_API_KEY` to `.env.local`.
- [ ] T‑006.5 [HUMAN] Create an Upstash account at `https://upstash.com`. Create a Redis database (free tier). Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to `.env.local`.
- [ ] T‑006.6 [HUMAN] Create a Calendly account at `https://calendly.com`. Set up a 30‑minute “Strategy Call” event type. Copy the embed URL to `NEXT_PUBLIC_CALENDLY_URL` in `.env.local`.
- [ ] T‑006.7 [HUMAN] Obtain GA4 measurement ID from Google Analytics property. Copy `NEXT_PUBLIC_GA_MEASUREMENT_ID` to `.env.local`.

---

## [ ] T‑007 — Contact Server Action Pipeline
**Status:** PENDING | **Domain:** Lead Capture | **Depends On:** T‑006 | **Blocks:** T‑013
**Spec:** Create `apps/firm-website/src/app/contact/actions.ts` as a Next.js Server Action implementing a five‑step pipeline: (1) honeypot guard, (2) Zod validation, (3) Upstash rate limit (5/hour/IP), (4) Supabase lead insert, (5) Resend dual email send. Returns `{ success: boolean; error?: string }`.
**Behavior:** Given a bot triggering the action with honeypot populated, when the action runs, then it returns `{ success: false, error: 'Invalid request' }` with no DB write. Given a legitimate lead exceeding 5 submissions/hour, when the action runs, then it returns `{ success: false, error: 'Too many requests. Please try again later.' }` with no DB write.
**Research:** Confirm `apps/firm-website/src/app/contact/` directory does not exist. Check `pnpm-workspace.yaml` — `@upstash/ratelimit` and `@upstash/redis` are absent; add both. Confirm Supabase JS client is absent. Read planning.md §9 for the `leads` table schema.
**Files:** `apps/firm-website/src/app/contact/actions.ts` [CREATE], `apps/firm-website/src/lib/supabase.ts` [CREATE], `apps/firm-website/src/lib/ratelimit.ts` [CREATE], `pnpm-workspace.yaml` [UPDATE], `apps/firm-website/package.json` [UPDATE]
**Pattern:** Layered pipeline — each step is a pure function or async call; if any step fails it returns early with a typed error; no step is bypassed. Deep module: the action's public interface is `submitContact(formData)` → `ActionResult`; all five steps are hidden.
**Anti-Patterns:** Never call `sendEmail` before writing to Supabase (email is a side effect of a successful save). Never expose raw Supabase or Upstash errors to the client response.
**Rules:** (1) `'use server'` directive at top of file. (2) IP extracted from `headers().get('x-forwarded-for')`. (3) Rate limit key: `contact_${ip}`. (4) Supabase table: `leads`, columns: `id, name, email, project_type, message, created_at, source`. (5) Fire both emails in `Promise.allSettled` — email failure must not block successful DB save response.
**Exports:** Named `submitContact` (Server Action).
**DoD:** Honeypot guard prevents DB write. Rate limit blocks 6th request in same hour. Valid submission inserts to Supabase and sends both emails. TypeCheck passes.
**Out of Scope:** Webhook to CRM. SMS notifications.
**Validate:** `pnpm turbo run typecheck --filter=apps/firm-website` — then test manually in dev with a real Supabase + Upstash connection (requires T‑006 env vars set).

**Subtasks:**
- [ ] T‑007.1 [AGENT] `pnpm-workspace.yaml` — Add `@upstash/ratelimit: ^2.0.0`, `@upstash/redis: ^1.34.0`, `@supabase/supabase-js: ^2.47.0` to catalog.
- [ ] T‑007.2 [AGENT] `apps/firm-website/package.json` — Add `@upstash/ratelimit: catalog:`, `@upstash/redis: catalog:`, `@supabase/supabase-js: catalog:`, `@ydm-agency/email: workspace:*` to dependencies.
- [ ] T‑007.3 [AGENT] `apps/firm-website/src/lib/supabase.ts` — CREATE: export `supabase` client instance: `import { createClient } from '@supabase/supabase-js'; export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)`.
- [ ] T‑007.4 [AGENT] `apps/firm-website/src/lib/ratelimit.ts` — CREATE: export `ratelimit` using `new Ratelimit({ redis: Redis.fromEnv(), limiter: Ratelimit.slidingWindow(5, '1 h'), prefix: 'ydm_contact' })`.
- [ ] T‑007.5 [AGENT] `apps/firm-website/src/app/contact/actions.ts` — CREATE: `'use server'`. Export `submitContact(data: ContactFormInput): Promise<ActionResult>`. Pipeline: (1) if `data._honeypot !== ''` return error. (2) parse with `contactFormSchema.safeParse(data)` — return error if invalid. (3) get IP from `headers()`; run `ratelimit.limit(ip)` — return rate limit error if exceeded. (4) insert to `supabase.from('leads').insert(...)` — return DB error if fails. (5) `Promise.allSettled([sendAck, sendNotif])` — log email failures but return `{ success: true }`.

---

## [ ] T‑008 — Unit Tests: Components and Validation
**Status:** PENDING | **Domain:** Testing | **Depends On:** T‑004 | **Blocks:** none
**Spec:** Write unit tests for all rebuilt UI components (Button, Badge, Card, Container, ThemeToggle, CookieConsent) and all form schemas (contactFormSchema, leadCaptureSchema). Test scaffolding for Button and schemas was completed in earlier tasks; this task ensures full coverage across the remaining components.
**Behavior:** Given `pnpm turbo run test`, when all test files run, then every exported UI component and schema has at least one passing test covering its core behavior and one test covering an error/edge case.
**Research:** `packages/ui/src/__tests__/Button.test.tsx` (scaffolded earlier — expand if needed). Confirm `CookieConsent`, `ThemeToggle`, `Badge`, `Card` do not yet have test files. Read `packages/forms/src/__tests__/schemas.test.ts` (already covers schemas).
**Files:** `packages/ui/src/__tests__/Badge.test.tsx` [CREATE], `packages/ui/src/__tests__/Card.test.tsx` [CREATE], `packages/ui/src/__tests__/CookieConsent.test.tsx` [CREATE]
**Pattern:** Arrange‑Act‑Assert for unit tests. User‑event library (`userEvent.click`, `userEvent.type`) for interaction tests.
**Anti-Patterns:** Never test implementation details (class names of internal elements). Test observable behavior and rendered output.
**Rules:** (1) Each test file has a `describe` block matching the component name. (2) Use `render` from `@testing-library/react` and `screen` queries. (3) Mock `next-themes` `useTheme` when testing ThemeToggle. (4) Mock `document.cookie` when testing CookieConsent.
**Exports:** No exports. Test files only.
**DoD:** `pnpm turbo run test` exits 0 with no failures. All components have at least 2 tests. TypeCheck passes.
**Out of Scope:** Visual regression tests. Storybook stories.
**Validate:** `pnpm turbo run test --filter=@ydm-agency/ui --filter=@ydm-agency/forms`

**Subtasks:**
- [ ] T‑008.1 [AGENT] `packages/ui/src/__tests__/Badge.test.tsx` — CREATE: tests for (a) `default` variant renders with `bg-surface` class; (b) `accent` variant renders with `bg-accent`; (c) `outline` variant renders with `border-accent`; (d) children content renders.
- [ ] T‑008.2 [AGENT] `packages/ui/src/__tests__/Card.test.tsx` — CREATE: tests for (a) renders children; (b) base classes include `bg-surface border-border rounded-xl`; (c) custom `className` is merged not replaced.
- [ ] T‑008.3 [AGENT] `packages/ui/src/__tests__/CookieConsent.test.tsx` — CREATE: tests for (a) banner renders when no consent cookie exists; (b) “Accept” click calls `accept()`; (c) “Reject” click calls `reject()`; (d) banner hidden when cookie is set. Mock `CookieConsentContext`.

---

## [ ] T‑009 — Demo: Coastal Cafe
**Status:** PENDING | **Domain:** Demo Applications | **Depends On:** T‑003 | **Blocks:** T‑016
**Spec:** Build `apps/demo-restaurant/` as a fully functional single‑page demo for “Coastal Cafe” — a fictional restaurant. Sections per planning.md §6: Hero (with reservation CTA), Menu (two categories), About, Location/Hours, Contact form. Warm coastal color accent overrides the default mint.
**Behavior:** Given a visitor landing on `demo-restaurant.ydm-agency.com`, when the page loads, then they see a polished restaurant site with a “Reserve a Table” CTA, menu items, and location info. Given they submit the contact form, then a static success message displays (no backend for demos).
**Research:** Read planning.md §6 for Coastal Cafe sections, copy, and accent color override (`#E8A96B` warm amber instead of mint). Read `apps/demo-restaurant/src/app/layout.tsx` from T‑003 — layout is ready; only `page.tsx` needs to be built.
**Files:** `apps/demo-restaurant/src/app/page.tsx` [CREATE], `apps/demo-restaurant/src/app/globals.css` [UPDATE — accent color override]
**Pattern:** Config‑driven accent override — demo‑level CSS overrides `--color-accent` to the demo’s brand color; all components render correctly without modification.
**Anti-Patterns:** Never fork or copy `@ydm-agency/ui` components for demo‑specific styling. Use CSS variable overrides only.
**Rules:** (1) No real backend for demo forms — show static “Reservation request received!” on submit. (2) Accent: `--color-accent: #E8A96B`. (3) “Powered by YDM Agency” badge in footer linking back to `https://ydm-agency.com`. (4) All demo copy is fictional (not real business data).
**Exports:** Default `CoastalCafePage`.
**DoD:** Page renders all five sections. No 404 assets. Accent color is amber not mint. “Powered by YDM Agency” badge present. Build passes.
**Out of Scope:** Real reservation system. CMS. User auth.
**Validate:** `pnpm turbo run build --filter=apps/demo-restaurant`

**Subtasks:**
- [ ] T‑009.1 [AGENT] `apps/demo-restaurant/src/app/globals.css` — Add override: `:root, .dark { --color-accent: #E8A96B; --color-accent-hover: #D4924A; }`.
- [ ] T‑009.2 [AGENT] `apps/demo-restaurant/src/app/page.tsx` — CREATE: Hero section with background image placeholder, restaurant name “Coastal Cafe”, tagline, “Reserve a Table” `<Button variant="primary">`. Menu section with two categories (4 items each) using `<Card>`. About section (2‑column: text + image placeholder). Location/Hours section (address, hours table). Contact: static form with `onSubmit` showing success message. Footer with “Powered by YDM Agency” badge + link to `https://ydm-agency.com`.

---

## [ ] T‑010 — Demo: Apex SaaS
**Status:** PENDING | **Domain:** Demo Applications | **Depends On:** T‑003 | **Blocks:** T‑016
**Spec:** Build `apps/demo-saas/` as a B2B SaaS marketing site for “Apex SaaS” — a fictional analytics platform. Sections: Hero (dashboard screenshot mockup), Features (3‑column grid), Pricing (3 tiers), FAQ, CTA. Indigo/violet accent override.
**Behavior:** Given a visitor landing on `demo-saas.ydm-agency.com`, when they view pricing, then three tiers are visible with a highlighted “Most Popular” middle tier. Given they click “Start Free Trial”, then a static lead capture form appears (no backend).
**Research:** Read planning.md §6 for Apex SaaS sections and copy. Note accent override: `#6366F1` (indigo). Mirror the scaffold created in T‑003 for `apps/demo-saas/`.
**Files:** `apps/demo-saas/package.json` [CREATE], `apps/demo-saas/next.config.js` [CREATE], `apps/demo-saas/tsconfig.json` [CREATE], `apps/demo-saas/tailwind.config.js` [CREATE], `apps/demo-saas/src/app/layout.tsx` [CREATE], `apps/demo-saas/src/app/globals.css` [CREATE], `apps/demo-saas/src/app/page.tsx` [CREATE]
**Pattern:** Same config‑driven accent override and scaffold pattern as T‑003 and T‑009.
**Rules:** (1) No real auth or trial backend. (2) Accent: `--color-accent: #6366F1`. (3) “Powered by YDM Agency” badge in footer. (4) Port `3002` for local dev.
**Exports:** Default `ApexSaasPage`.
**DoD:** All five sections render. Pricing tiers visible with correct highlighting. “Powered by YDM Agency” present. Build passes.
**Out of Scope:** Real auth. Dashboard UI beyond static screenshot placeholder.
**Validate:** `pnpm turbo run build --filter=apps/demo-saas`

**Subtasks:**
- [ ] T‑010.1 [AGENT] `apps/demo-saas/` — CREATE all scaffold files (package.json, next.config.js, tsconfig.json, tailwind.config.js, globals.css, layout.tsx) following the exact same pattern as T‑003 subtasks. Package name: `@ydm-agency/demo-saas`. Dev port: 3002. Accent override: `--color-accent: #6366F1; --color-accent-hover: #4F46E5`.
- [ ] T‑010.2 [AGENT] `apps/demo-saas/src/app/page.tsx` — CREATE: Hero with dashboard image placeholder and “Start Free Trial” CTA. Features 3‑column grid with icons (planning.md §6 Apex SaaS features). Pricing 3‑tier using `<Pricing>` or custom component (Free / Pro / Enterprise). FAQ as `<details>/<summary>`. Final CTA. “Powered by YDM Agency” footer.

---

Continuing with T‑011 through T‑015, formatted identically to the previous blocks.

---

## [ ] T‑011 — Demo: Vanguard Plumbing
**Status:** PENDING | **Domain:** Demo Applications | **Depends On:** T‑003 | **Blocks:** T‑016
**Spec:** Build `apps/demo-plumber/` as a local‑service site for “Vanguard Plumbing” — a fictional plumbing company. Sections: Hero (emergency call CTA), Services list, Why Choose Us, Service Area, Contact/Booking form. Deep blue accent override.
**Behavior:** Given a visitor landing on `demo-plumber.ydm-agency.com`, when they see the Hero, then an “Emergency? Call Now” button is prominently visible. Given they submit the booking form, then a static success message appears.
**Research:** Read planning.md §6 for Vanguard Plumbing sections and copy. Note accent override: `#2563EB` (blue‑600). Mirror the scaffold from T‑003 for `apps/demo-plumber/`.
**Files:** `apps/demo-plumber/package.json` [CREATE], `apps/demo-plumber/next.config.js` [CREATE], `apps/demo-plumber/tsconfig.json` [CREATE], `apps/demo-plumber/tailwind.config.js` [CREATE], `apps/demo-plumber/src/app/layout.tsx` [CREATE], `apps/demo-plumber/src/app/globals.css` [CREATE], `apps/demo-plumber/src/app/page.tsx` [CREATE]
**Pattern:** Same scaffold + accent override pattern as T‑003.
**Rules:** (1) “Emergency? Call Now” CTA is `<a href="tel:+15551234567">` — static fictional phone number. (2) Accent: `--color-accent: #2563EB`. (3) “Powered by YDM Agency” badge in footer. (4) Port `3003`.
**Exports:** Default `VanguardPlumbingPage`.
**DoD:** All sections render. Emergency CTA is a tel: link. “Powered by YDM Agency” present. Build passes.
**Out of Scope:** Real booking system. GPS service area map.
**Validate:** `pnpm turbo run build --filter=apps/demo-plumber`

**Subtasks:**
- [ ] T‑011.1 [AGENT] `apps/demo-plumber/` — CREATE all scaffold files following T‑003 pattern. Package name `@ydm-agency/demo-plumber`. Port 3003. Accent: `--color-accent: #2563EB; --color-accent-hover: #1D4ED8`.
- [ ] T‑011.2 [AGENT] `apps/demo-plumber/src/app/page.tsx` — CREATE: Hero with background image placeholder, “Vanguard Plumbing” name, tagline, “Emergency? Call Now” `<a href="tel:+15551234567">` + “Book a Visit” secondary CTA. Services list (6 items with icons). Why Choose Us (3‑column grid). Service Area section (city list or static map placeholder). Contact form (static success). “Powered by YDM Agency” footer.

---

## [ ] T‑012 — Demo: Nova Storefront
**Status:** PENDING | **Domain:** Demo Applications | **Depends On:** T‑003 | **Blocks:** T‑016
**Spec:** Build `apps/demo-store/` as a minimal e‑commerce marketing site for “Nova Storefront” — a fictional product brand. Sections: Hero (product showcase), Featured Products grid (6 cards), About brand, Newsletter signup (static), CTA. Rose/coral accent override.
**Behavior:** Given a visitor landing on `demo-store.ydm-agency.com`, when they view featured products, then six product cards render with image placeholder, product name, price, and “Add to Cart” button that shows a static “Added!” state on click.
**Research:** Read planning.md §6 for Nova Storefront sections and copy. Note accent override: `#F43F5E` (rose‑500). Mirror the scaffold from T‑003 for `apps/demo-store/`.
**Files:** `apps/demo-store/package.json` [CREATE], `apps/demo-store/next.config.js` [CREATE], `apps/demo-store/tsconfig.json` [CREATE], `apps/demo-store/tailwind.config.js` [CREATE], `apps/demo-store/src/app/layout.tsx` [CREATE], `apps/demo-store/src/app/globals.css` [CREATE], `apps/demo-store/src/app/page.tsx` [CREATE]
**Pattern:** Same scaffold + accent override as T‑003.
**Rules:** (1) No real cart backend — “Add to Cart” shows static “Added!” feedback via local React state. (2) Accent: `--color-accent: #F43F5E`. (3) “Powered by YDM Agency” badge in footer. (4) Port `3004`.
**Exports:** Default `NovaStorefrontPage`.
**DoD:** Hero, six product cards, About, Newsletter, CTA all render. “Add to Cart” shows feedback. Build passes.
**Out of Scope:** Real cart. Checkout. Payment processing.
**Validate:** `pnpm turbo run build --filter=apps/demo-store`

**Subtasks:**
- [ ] T‑012.1 [AGENT] `apps/demo-store/` — CREATE all scaffold files following T‑003 pattern. Package name `@ydm-agency/demo-store`. Port 3004. Accent: `--color-accent: #F43F5E; --color-accent-hover: #E11D48`.
- [ ] T‑012.2 [AGENT] `apps/demo-store/src/app/page.tsx` — CREATE: Hero with product image placeholder and “Shop Now” CTA. Featured Products `grid grid-cols-2 md:grid-cols-3 gap-6` — 6 `<Card>` product cards each with image placeholder, name, price (`$XX.00`), “Add to Cart” button using local `useState` to toggle “Add to Cart” / “Added!”. About brand section. Static newsletter signup input. Final CTA. “Powered by YDM Agency” footer.
- [ ] T‑012.3 [AGENT] `apps/firm-website/src/app/demos/page.tsx` — UPDATE `screenshotSrc` paths for all four demos once this task is complete (if screenshots have been taken). Otherwise note placeholder stays until screenshots are taken post‑deploy.

---

## [ ] T‑013 — Contact Page Assembly
**Status:** PENDING | **Domain:** Lead Capture | **Depends On:** T‑007 | **Blocks:** T‑014
**Spec:** Create `apps/firm-website/src/app/contact/page.tsx` combining `ContactForm` with `submitContact` server action, a Calendly embed section, and response promise copy per planning.md §9.
**Behavior:** Given a visitor on `/contact`, when they submit the form, then the server action fires; on success, the form replaces with the success message. Given a visitor preferring scheduling, when they see the Calendly section, then an `<iframe>` embed is present.
**Research:** Confirm `apps/firm-website/src/app/contact/` directory does not exist (will be created in T‑007). Read planning.md §9 for H1 copy, subhead, Calendly section heading, and response promise language.
**Files:** `apps/firm-website/src/app/contact/page.tsx` [CREATE]
**Pattern:** Server/client composition — page is an RSC that passes `submitContact` as a prop to the `<ContactForm>` client component. The Calendly embed is an isolated `'use client'` `CalendlyEmbed` component.
**Anti-Patterns:** Never import the server action into a `'use client'` file directly — pass it as a prop from the RSC page.
**Rules:** (1) H1: “Get a Free Project Outline” from planning.md §9. (2) Two‑column layout on desktop: form left, Calendly right. (3) Calendly `<iframe>` has `src={process.env.NEXT_PUBLIC_CALENDLY_URL}`. (4) `generateMetadata` returns unique title/description.
**Exports:** Default `ContactPage`. Named `generateMetadata`.
**DoD:** Form renders and submits successfully in dev (requires T‑006 env vars). Calendly iframe loads. TypeCheck passes. Build passes.
**Out of Scope:** Live chat widget. Phone number display.
**Validate:** `pnpm turbo run build --filter=apps/firm-website && pnpm turbo run typecheck --filter=apps/firm-website`

**Subtasks:**
- [ ] T‑013.1 [AGENT] `apps/firm-website/src/app/contact/page.tsx` — CREATE: RSC. Import `ContactForm` from `@ydm-agency/forms` and `submitContact` from `./actions`. Two‑column `grid grid-cols-1 lg:grid-cols-2 gap-12` layout. Left: H1, subhead, `<ContactForm onSubmit={submitContact} />`. Right: “Prefer to schedule a call?” heading + `<CalendlyEmbed />` client component.
- [ ] T‑013.2 [AGENT] `apps/firm-website/src/app/contact/CalendlyEmbed.tsx` — CREATE: `'use client'`. Renders `<iframe src={process.env.NEXT_PUBLIC_CALENDLY_URL} className="w-full min-h-[600px] border-0 rounded-xl">` only after consent check: `const { analyticsConsent } = useConsent()` — if consent denied, show “Enable analytics cookies to use the scheduling widget, or email contact@ydmagency.com directly.”
- [ ] T‑013.3 [AGENT] `apps/firm-website/src/app/contact/page.tsx` — Add `generateMetadata` returning `constructMetadata({ title: 'Contact | YDM Agency', description: 'Get a free project outline. Describe your project and receive a personal reply within 2 hours on business days.' })`.

---

## [ ] T‑014 — E2E Tests: Critical User Flows
**Status:** PENDING | **Domain:** Testing | **Depends On:** T‑005, T‑007, T‑013 | **Blocks:** none
**Spec:** Write Playwright E2E specs for three critical user flows: (1) Contact form submission, (2) Cookie consent accept/reject flow, (3) Demo gallery navigation.
**Behavior:**
- Given a user on `/contact`, when they fill and submit the valid form, then the success message “Message received” appears within 5 seconds.
- Given a first‑time visitor, when the cookie banner appears and they click “Reject”, then no analytics network requests are visible in the next 3 seconds.
- Given a user on `/demos`, when they click “View Live Site” on any card, then a new browser tab opens.
**Research:** Confirm T‑005 setup is complete (playwright.config.ts, e2e/ dir). Read `apps/firm-website/src/app/contact/page.tsx` and `apps/firm-website/src/app/demos/page.tsx` for exact selector text.
**Files:** `e2e/contact-form.spec.ts` [CREATE], `e2e/cookie-consent.spec.ts` [CREATE], `e2e/demos-navigation.spec.ts` [CREATE]
**Pattern:** BDD Given/When/Then structure — each `test()` block maps to one behavior scenario. `page.getByRole` and `page.getByText` for resilient selectors (not CSS selectors).
**Anti-Patterns:** Never use `page.waitForTimeout(ms)` fixed delays — use `page.waitForSelector` or `expect(locator).toBeVisible()`. Never select elements by CSS class names (fragile).
**Rules:** (1) Use `page.getByRole` and `page.getByLabel` for form fields. (2) Network interception via `page.route()` to mock the server action in contact form tests. (3) `expect(page).toHaveURL` for navigation assertions.
**Exports:** No exports. Spec files only.
**DoD:** All three spec files pass with `pnpm playwright test`. No flaky tests on re‑run.
**Out of Scope:** Accessibility automated audit (separate axe‑core integration, phase 2). Performance test in Playwright.
**Validate:** `pnpm playwright test e2e/contact-form.spec.ts e2e/cookie-consent.spec.ts e2e/demos-navigation.spec.ts --reporter=line`

**Subtasks:**
- [ ] T‑014.1 [AGENT] `e2e/contact-form.spec.ts` — CREATE: test “valid submission shows success”. Use `page.route('**/contact/actions*', ...)` to mock the server action returning `{ success: true }`. Fill form with `page.getByLabel`, submit, assert `page.getByText('Message received')` visible.
- [ ] T‑014.2 [AGENT] `e2e/contact-form.spec.ts` — ADD: test “empty submission shows validation errors”. Submit without filling fields. Assert `page.getByText('Name required')` and `page.getByText('Invalid email')` visible.
- [ ] T‑014.3 [AGENT] `e2e/cookie-consent.spec.ts` — CREATE: test “reject hides banner and clears analytics”. Clear cookies before test. Navigate to `/`. Assert banner visible. Click “Reject”. Assert banner gone. Assert no requests to `google-analytics.com` were made.
- [ ] T‑014.4 [AGENT] `e2e/cookie-consent.spec.ts` — ADD: test “accept hides banner and persists across reload”. Click “Accept”. Reload page. Assert banner does not appear again.
- [ ] T‑014.5 [AGENT] `e2e/demos-navigation.spec.ts` — CREATE: test “demo cards link to external URLs in new tab”. Navigate to `/demos`. For each card assert “View Live Site” link has `target="_blank"` and `rel` containing `noopener`. Assert four cards visible.

---

## [ ] T‑015 — CI/CD Pipeline Updates
**Status:** PENDING | **Domain:** Infrastructure | **Depends On:** T‑004, T‑005, T‑006 | **Blocks:** T‑016
**Spec:** Update `.github/workflows/ci.yml` to include the test and E2E stages alongside the existing lint/typecheck/build stages. Add Turborepo remote caching via TURBO_TOKEN. Add E2E environment variables as GitHub Secrets references.
**Behavior:** Given a pull request to `main`, when the CI pipeline runs, then lint, typecheck, build, unit tests, and E2E tests all execute in the correct order; if any stage fails, the PR is blocked from merging.
**Research:** Read `.github/workflows/ci.yml` — note existing stages and matrix. Confirm `TURBO_TOKEN` and `TURBO_TEAM` are listed as secrets to add. Confirm `pnpm` version in CI matches `pnpm-workspace.yaml`.
**Files:** `.github/workflows/ci.yml` [UPDATE]
**Pattern:** Turborepo‑optimized CI — use `--filter` for targeted package pipelines; cache Turborepo output via `TURBO_TOKEN`; run unit tests and E2E in separate jobs that both must pass.
**Anti-Patterns:** Never run the full test suite without Turborepo cache — it will timeout. Never store secrets in CI YAML files.
**Rules:** (1) Unit tests job: `pnpm turbo run test`. (2) E2E job: `pnpm playwright install --with-deps chromium && pnpm playwright test`. (3) E2E job runs after build job. (4) All jobs use `pnpm` with `--frozen-lockfile`. (5) `TURBO_TOKEN` and `TURBO_TEAM` set as environment variables.
**Exports:** No code exports. CI configuration only.
**DoD:** CI pipeline passes on a clean commit. Unit tests and E2E are separate jobs visible in GitHub Actions UI. No secrets in tracked files.
**Out of Scope:** Deployment automation from CI (handled in Vercel). Lighthouse CI (phase 2).
**Validate:** Push a test commit and verify all CI jobs pass in GitHub Actions UI.

**Subtasks:**
- [ ] T‑015.1 [AGENT] `.github/workflows/ci.yml` — Add `test` job after `build`: `pnpm turbo run test`. Depends on `build` job.
- [ ] T‑015.2 [AGENT] `.github/workflows/ci.yml` — Add `e2e` job after `build`: install Playwright Chromium, start dev server, run `pnpm playwright test`. Reference GitHub Secrets for all `NEXT_PUBLIC_*` env vars needed to run the dev server.
- [ ] T‑015.3 [AGENT] `.github/workflows/ci.yml` — Add `env: TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }} TURBO_TEAM: ${{ secrets.TURBO_TEAM }}` to enable Turborepo remote caching.
- [ ] T‑015.4 [HUMAN] Add `TURBO_TOKEN`, `TURBO_TEAM`, and all required `NEXT_PUBLIC_*` variables as GitHub Repository Secrets via the repository Settings > Secrets UI. These contain real credentials that cannot be committed to files.

---

Here are the final two tasks, T‑016 and T‑017, completing the active task register.

---

## [ ] T‑016 — Deployment Configuration
**Status:** PENDING | **Domain:** Infrastructure | **Depends On:** T‑015, T‑009, T‑010, T‑011, T‑012 | **Blocks:** none
**Spec:** Configure Vercel deployments for `apps/firm-website` and all four demo apps. Set up wildcard subdomain routing for demo apps on `ydm-agency.com`. Configure production environment variables in each Vercel project.
**Behavior:** Given a push to `main`, when Vercel deploys, then `ydm-agency.com` serves the firm website; `demo-restaurant.ydm-agency.com`, `demo-saas.ydm-agency.com`, `demo-plumber.ydm-agency.com`, `demo-store.ydm-agency.com` each serve their respective demo apps.
**Research:** `apps/firm-website/src/middleware.ts` — confirms it handles subdomain rewrites for the firm‑website (this is not used for demo apps which are separate Vercel projects). Confirm Vercel CLI is available or can be installed. Read `apps/demo-restaurant/next.config.js` from T‑003 — confirm `output: 'standalone'`.
**Files:** `vercel.json` [CREATE — in each app directory], `apps/firm-website/next.config.js` [CHECK/UPDATE — ensure standalone output]
**Pattern:** Vercel monorepo deployment — each app is a separate Vercel project pointing to its subdirectory. The `vercel.json` in each app directory configures the project. Wildcard `*.ydm-agency.com` domain is added to the firm‑website project for demo subdomain rewrites.
**Anti-Patterns:** Never use a single Vercel project for all apps. Never put secrets in `vercel.json`.
**Rules:** (1) Firm‑website Vercel project: root directory `apps/firm-website`. (2) Demo Vercel projects: root directory `apps/demo-{slug}`. (3) Wildcard `*.ydm-agency.com` domain assigned to firm‑website project. (4) Individual demo subdomains assigned to their respective projects. (5) All env vars set per‑project in Vercel dashboard.
**Exports:** No code exports. Deployment configuration only.
**DoD:** All five Vercel projects deploy successfully. `ydm-agency.com` serves firm‑website. All four demo subdomains serve their apps. SSL valid on all domains.
**Out of Scope:** Preview deployment URLs. CDN configuration beyond Vercel defaults. Custom cache headers.
**Validate:** `curl -I https://ydm-agency.com` returns 200. `curl -I https://demo-restaurant.ydm-agency.com` returns 200.

**Subtasks:**
- [ ] T‑016.1 [HUMAN] Create a Vercel account or log in at `https://vercel.com`. This requires a browser‑based OAuth flow that cannot be automated.
- [ ] T‑016.2 [AGENT] Install Vercel CLI: `pnpm add -g vercel`. Run `vercel login` — this will open a browser; approve the login.
- [ ] T‑016.3 [HUMAN] In Vercel dashboard: create five new projects linked to this GitHub repository. Set root directory for each: `apps/firm-website`, `apps/demo-restaurant`, `apps/demo-saas`, `apps/demo-plumber`, `apps/demo-store`. Set framework to “Next.js” for all.
- [ ] T‑016.4 [HUMAN] In Vercel dashboard for the `firm-website` project: add custom domain `ydm-agency.com` and wildcard domain `*.ydm-agency.com`. Follow DNS verification instructions.
- [ ] T‑016.5 [HUMAN] In Vercel dashboard for each demo project: add the respective custom subdomain (`demo-restaurant.ydm-agency.com`, etc.). Configure DNS at your domain registrar to point each subdomain to the correct Vercel project.
- [ ] T‑016.6 [HUMAN] In Vercel dashboard for `firm-website` project: add all production environment variables from `.env.local` under Settings > Environment Variables. Repeat for each demo project with relevant variables.
- [ ] T‑016.7 [AGENT] `apps/firm-website/next.config.js` — Verify or add `output: 'standalone'` so Vercel builds correctly in monorepo mode.

---

## [ ] T‑017 — Update Privacy Policy “Last Updated” Date
**Status:** PENDING | **Domain:** Pages | **Depends On:** none | **Blocks:** none
**Spec:** Update the hard‑coded “Last Updated” date in `apps/firm-website/src/app/privacy/page.tsx` to the actual launch date. This is a manual confirmation step to be performed just before going live.
**Behavior:** Given the site is live, when a visitor views the Privacy Policy page, then the “Last Updated” date reflects the actual launch date, not the placeholder.
**Research:** Locate the “Last Updated” line in `apps/firm-website/src/app/privacy/page.tsx` (currently contains a placeholder `[current year]` or similar draft date).
**Files:** `apps/firm-website/src/app/privacy/page.tsx` [UPDATE]
**Pattern:** Single‑line date update — no structural changes; only the date string is replaced.
**Anti-Patterns:** Never launch with a placeholder date that could mislead users or violate privacy regulations.
**Rules:** (1) Date format: `Month DD, YYYY` (e.g., `October 17, 2025`). (2) Update must be done as the final manual step before launch.
**Exports:** No new exports.
**DoD:** Privacy Policy page shows the correct launch date. No other files modified.
**Out of Scope:** Updating any other legal content.
**Validate:** `curl https://ydm-agency.com/privacy | grep "Last Updated"` returns the correct date.

**Subtasks:**
- [ ] T‑017.1 [HUMAN] Before launch, update the “Last Updated” date in `apps/firm-website/src/app/privacy/page.tsx` to the actual launch date. This is a date‑confirmation decision that requires human approval.

---

*End of Document*