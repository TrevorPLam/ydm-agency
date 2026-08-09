# UI Implementation Assessment — YDM Agency Monorepo

I read the source code directly (components, pages, styles, shared packages, and their config/data dependencies) rather than relying on documentation. Below is a file-by-file assessment of the UI implementation, grouped by package or app area, plus a summary of cross-cutting issues.

---

## Scope

- **Active UI packages:** `packages/ui`, `packages/forms`, `packages/analytics`, `packages/email`, `packages/seo`, `packages/utils`, `packages/config`
- **App UI:** `apps/firm-website/src/app/**/*.tsx/.css`, `apps/firm-website/src/components/**/*.tsx`, `apps/firm-website/tailwind.config.js`, `globals.css`, `print.css`
- **Supporting UI data/config:** `apps/firm-website/src/lib/**/*.ts`
- **Orphaned / broken packages:** `packages/design-system`, `packages/branding`, `packages/web-core`
- **Excluded from this report:** test files, `node_modules`, build output, and unrelated docs.

---

## Quality Key

| Rating | Meaning |
|---|---|
| **Excellent** | Idiomatic, accessible, consistent, well-typed, no significant issues. |
| **Good** | Solid implementation with minor issues or one area to improve. |
| **Fair** | Works but has maintainability, consistency, or a11y gaps that should be addressed. |
| **Poor** | Significant bugs, dead code, or inconsistent with the design system. |
| **Broken / Dead** | Invalid file contents, duplicate definitions, or no active usage. |

---

## 1. Shared UI Packages

### 1.1 `packages/ui` (active, wired to app)

- **File:** `packages/ui/package.json`
  - **Description:** Package manifest. Declares the package as `@ydm-agency/ui`, sets `main` and `types` to `./src/index.ts`, and lists Radix primitives, `lucide-react`, `next-themes`, `class-variance-authority`, and workspace deps.
  - **Connected to:** Consumed by `apps/firm-website`, `packages/forms`, `packages/analytics`.
  - **Quality:** Good — standard workspace setup.

- **File:** `packages/ui/src/index.ts`
  - **Description:** Barrel export for all UI components, CVA variant helpers (`buttonVariants`), and types (including `FeatureItem` and `PricingPlan`).
  - **Connected to:** Imported by app pages, layouts, `apps/firm-website/src/app/providers.tsx`, `@ydm-agency/forms`, and `@ydm-agency/analytics` (via `useConsent`).
  - **Quality:** Good — clean re-exports.

- **File:** `packages/ui/src/Button.tsx`
  - **Description:** `forwardRef` button with CVA variants (`primary`, `secondary`, `ghost`), sizes, and `asChild` support via Radix `Slot`.
  - **Connected to:** Used across pages and forms.
  - **Quality:** Good — typed with `VariantProps`, handles refs, focus-visible ring, disabled states. The focus-visible ring uses `focus-visible:ring-text-primary` (white) instead of `accent`, and the primary variant's `hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]` hardcodes the blue color rather than using the `accent` token.

- **File:** `packages/ui/src/Badge.tsx`
  - **Description:** Small badge with `default`, `accent`, `outline` variants.
  - **Connected to:** Used in Hero, blog pages, education hub/topic/lesson/paths, `EducationSearch`, and `TopicContent`; also `services/compare` and `services/[slug]/process`. Imported but not used in `LessonFilter`. Not used in `PricingEstimator`.
  - **Quality:** Good — typed, uses `cn`.

- **File:** `packages/ui/src/Card.tsx`
  - **Description:** Surface card with hover lift and accent shadow.
  - **Connected to:** Used across homepage, services, blog, education, service pricing/comparison/industry pages, `EducationSearch`, `TopicContent`, and the dead `LeadForm`. Not used in `PricingEstimator`.
  - **Quality:** Good — uses design tokens (`bg-surface`, `border-border`, `shadow-accent/10`).

- **File:** `packages/ui/src/Container.tsx`
  - **Description:** Max-width wrapper (`max-w-6xl`) with responsive padding.
  - **Connected to:** Used by almost every page and section.
  - **Quality:** Excellent — minimal, typed, composable.

- **File:** `packages/ui/src/Hero.tsx`
  - **Description:** Hero section with badge, title, highlighted span, description, and two CTA buttons.
  - **Connected to:** Used on `apps/firm-website/src/app/page.tsx`.
  - **Quality:** Fair — uses design tokens, but the `badgeText` prop is never passed by any page, so the `Badge` is dead UI. The CTA buttons are also wrapped in `Link` without `asChild`, producing invalid `<a><button>` HTML.

- **File:** `packages/ui/src/Features.tsx`
  - **Description:** Features grid that consumes `FeatureItem[]` and renders cards with optional icons.
  - **Connected to:** Exported from package but not used by any app page I found.
  - **Quality:** Fair — implementation is fine, but it hardcodes `slate-*` and `blue-*` colors (`bg-slate-900`, `border-slate-800`, `text-slate-400`, `bg-slate-800/60`, `border-slate-700/60`, `bg-blue-600/20`, `text-blue-400`, `text-slate-300`, `text-white`) instead of the design-system tokens defined in `globals.css` and `packages/config/tailwind.js`.

- **File:** `packages/ui/src/Pricing.tsx`
  - **Description:** Three-column pricing grid with “Most Popular” highlight and optional `onSelectPlan`.
  - **Connected to:** Exported from package but not used by any app page.
  - **Quality:** Poor — hardcodes `slate-*` and `blue-*` colors (`bg-slate-950`, `bg-slate-900`, `border-slate-800`, `text-slate-400`, `text-slate-300`, `border-blue-500`, `text-blue-400`, `bg-slate-800`, `hover:bg-slate-700`, `text-white`) and overrides the secondary button with ad-hoc slate styles. Declares `'use client'` because the `onClick` handler on the non-linked CTA button makes it a client component; it also uses a raw `<a>` instead of `next/link` for `ctaHref`. The linked CTA wraps `Button` inside `<a>`, which is invalid HTML.

- **File:** `packages/ui/src/Header.tsx`
  - **Description:** Fixed site header with skip link, logo, desktop dropdown, mobile Radix Dialog, active-state highlighting, and `ThemeToggle`.
  - **Connected to:** Used in `apps/firm-website/src/app/layout.tsx`.
  - **Quality:** Good — accessible skip link, `aria-current` for active links, keyboard handling, mobile touch targets (`min-h-[44px]`). The inline class-name concatenation is verbose and could be collapsed with `cn`/`cva`, and the desktop and mobile menus both split `/services/industries` from other service links with manual `.filter()` calls, which is fragile.

- **File:** `packages/ui/src/Footer.tsx`
  - **Description:** Four-column footer with brand blurb, quick links, contact info, legal links, and `CookieSettingsButton`.
  - **Connected to:** Used in root layout.
  - **Quality:** Good — uses `next/link` for internal routes, uses design tokens.

- **File:** `packages/ui/src/ThemeToggle.tsx`
  - **Description:** Sun/moon toggle using `next-themes`.
  - **Connected to:** Used in Header.
  - **Quality:** Good — has `aria-label`, simple client component.

- **File:** `packages/ui/src/CookieConsent.tsx`
  - **Description:** Fixed bottom banner with Accept/Reject buttons; dismisses on `Escape`.
  - **Connected to:** Used in root layout; consumes `CookieConsentContext`.
  - **Quality:** Fair — clear copy and Escape-key dismissal, but it does not manage focus trap or return focus, and it lacks `role="dialog"`, `aria-modal`, and an `aria-label`. The outer `<div>` does not include a `CookieConsent` class, so the `.CookieConsent` selector in `print.css` cannot target the banner for print suppression (only the inner `<Button>` elements are hidden by the `button` selector).

- **File:** `packages/ui/src/CookieConsentContext.tsx`
  - **Description:** Context provider that reads/writes the `ydm-analytics-consent` cookie and exposes `analyticsConsent`, `accept`, `reject`, `isOpen`, `openSettings`.
  - **Connected to:** Wrapped by `AppProviders`; used by `CookieConsent` and `AnalyticsProvider` via `useConsent`. `CookieSettingsButton` does not consume the context directly; it dispatches the `ydm:open-cookie-settings` event the context listens for.
  - **Quality:** Good — guards `document` for SSR, listens for `ydm:open-cookie-settings` custom event.

- **File:** `packages/ui/src/CookieSettingsButton.tsx`
  - **Description:** Footer button that dispatches the custom event to reopen cookie settings.
  - **Connected to:** Used by Footer.
  - **Quality:** Good — client-only guard with `isClient`.

### 1.2 `packages/forms` (active, wired to app)

- **File:** `packages/forms/package.json`
  - **Description:** Manifest for `@ydm-agency/forms`. Declares `react-hook-form`, Zod, workspace UI/analytics deps. Has `main`/`types` set to `./src/index.ts`, no `build` script, and `lint`/`typecheck`/`test`/`test:coverage` scripts.
  - **Connected to:** Dependency of `apps/firm-website`; consumed by `apps/firm-website/src/app/contact/page.tsx` and `apps/firm-website/src/app/contact/actions.ts`.
  - **Quality:** Good.

- **File:** `packages/forms/src/index.ts`
  - **Description:** Barrel export of forms and schemas.
  - **Connected to:** Imported by `contact/page.tsx` and `contact/actions.ts`; consumed by package tests.
  - **Quality:** Good.

- **File:** `packages/forms/src/ContactForm.tsx`
  - **Description:** Contact form using `react-hook-form` + `zodResolver`, honeypot, ARIA live/error mappings, analytics `trackEvent` on success.
  - **Connected to:** `apps/firm-website/src/app/contact/page.tsx` and `submitContact` server action. Tested by `packages/forms/src/__tests__/ContactForm.test.tsx`.
  - **Quality:** Excellent — properly associates labels/inputs, uses `aria-invalid`, `aria-describedby`, `role="alert"`, uses design tokens. The success panel is not programmatically announced (no `aria-live` or focus management), which is the only minor a11y gap.

- **File:** `packages/forms/src/LeadForm.tsx`
  - **Description:** Lead-capture form with manual `useState`, manual Zod `safeParse`, and analytics tracking.
  - **Connected to:** Exported from `@ydm-agency/forms` but **not imported or rendered anywhere in the app**.
  - **Quality:** Poor / Dead — hardcoded `gray-*`, `blue-500`, `emerald-*`, `red-500`, and `bg-white` colors that do not match the dark design system; uses first-person copy (“we will get back to you”, “We have received your request”); inconsistent with `ContactForm` (no `react-hook-form`, no `aria-*` attributes). Should be removed or rewritten.

- **File:** `packages/forms/src/schemas.ts`
  - **Description:** Re-exports `leadCaptureSchema` and defines `contactFormSchema` inline with Zod.
  - **Connected to:** Used by `ContactForm`, `packages/forms/src/index.ts`, `apps/firm-website/src/app/contact/actions.ts`, and `packages/forms/src/__tests__/schemas.test.ts`.
  - **Quality:** Fair — duplicated logic: `contactFormSchema` is also defined in `schemas/contact-schema.ts` with a slightly different name (`contactSchema`/`ContactSchemaInput`).

- **File:** `packages/forms/src/schemas/contact-schema.ts`
  - **Description:** Zod schema for contact form.
  - **Connected to:** Not re-exported by `packages/forms/src/index.ts`; superseded by `schemas.ts`. Only referenced by its own test file (`packages/forms/src/schemas/contact-schema.test.ts`).
  - **Quality:** Fair — valid schema, but unused duplicate.

- **File:** `packages/forms/src/schemas/lead-schema.ts`
  - **Description:** Zod schema for lead form.
  - **Connected to:** Re-exported via `packages/forms/src/schemas.ts` and used by `LeadForm`. Also tested by `packages/forms/src/schemas/lead-schema.test.ts`.
  - **Quality:** Good.

- **Files:** `packages/forms/src/__tests__/*`, `packages/forms/src/schemas/*.test.ts`
  - **Description:** Test suite for `ContactForm` (5 RTL cases), the production `contactFormSchema` (7 cases), the unused `contactSchema` duplicate (24 cases), and `leadCaptureSchema` (26 cases).
  - **Connected to:** Package `test` script and root `vitest` config.
  - **Quality:** Good — all 62 tests pass and `tsc --noEmit` passes.

- **Files:** `packages/forms/vitest.config.ts`, `packages/forms/tsconfig.json`, `packages/forms/eslint.config.mjs`
  - **Description:** Tooling config. `vitest.config.ts` uses `jsdom` with a self-referential alias. `tsconfig.json` includes `src/**/*`, so tests are typechecked. `eslint.config.mjs` re-exports the shared UI ESLint config. `tsconfig.tsbuildinfo` is a build artifact.
  - **Connected to:** Build/lint/test pipeline.
  - **Quality:** Good.

### 1.3 `packages/analytics`

- **File:** `packages/analytics/package.json`
  - **Description:** Manifest for `@ydm-agency/analytics`.
  - **Connected to:** Dependency of `apps/firm-website` and `packages/forms`; consumed by `apps/firm-website/src/app/providers.tsx`, `ContactForm`, `LeadForm`, `PricingEstimator`, and education components.
  - **Quality:** Fair — standard workspace setup, but the `lint` script cannot run because the package has no `eslint.config.mjs`. It also has no `test` or `build` script, and `tsconfig.tsbuildinfo` is tracked rather than gitignored.

- **File:** `packages/analytics/src/index.ts`
  - **Description:** Barrel export: `AnalyticsProvider`/`AnalyticsProps` and `trackEvent`/`TrackEventOptions`.
  - **Connected to:** Imported by `apps/firm-website/src/app/providers.tsx` and all `trackEvent` consumers.
  - **Quality:** Good — clean, minimal exports.

- **File:** `packages/analytics/src/Analytics.tsx`
  - **Description:** Consent-gated loader for GA4, PostHog, and Meta Pixel scripts using `next/script` with `dangerouslySetInnerHTML`.
  - **Connected to:** Rendered inside `AppProviders` (`apps/firm-website/src/app/providers.tsx`), which passes empty `gaId`, `posthogKey`, and `metaPixelId`.
  - **Quality:** Poor/Fair — the consent gate is structurally correct, but four issues prevent it from working:
    1. `providers.tsx` passes empty strings, so no provider scripts ever render.
    2. The current CSP (`script-src 'self' https://www.googletagmanager.com https://va.vercel-scripts.com`) blocks the inline `dangerouslySetInnerHTML` scripts because it lacks `'unsafe-inline'` or a nonce; PostHog and Meta Pixel domains are not in `script-src` either.
    3. `default-src 'self'` is also the implicit `connect-src`, so even if scripts loaded, event posts to `app.posthog.com`, `connect.facebook.net`, and `google-analytics.com` would be blocked.
    4. The `gtag('consent','update', ...)` `useEffect` runs on `analyticsConsent` change, before the `afterInteractive` GA script has loaded `window.gtag`, so the consent update is effectively a no-op on first accept.

- **File:** `packages/analytics/src/events.ts`
  - **Description:** Client-side `trackEvent` helper. Guards `window`, reads the `ydm-analytics-consent` cookie directly, dispatches a `ydm_analytics_event` CustomEvent, and forwards to `window.gtag`, `window.posthog.capture`, and `window.fbq` if they exist. Logs in development.
  - **Connected to:** Used by `ContactForm`, `LeadForm`, `PricingEstimator`, `EducationSearch`, `EducationAnalytics`, `LessonFilter`, and `SocialShare`. `LeadForm` is exported but not rendered in the app.
  - **Quality:** Fair — works as a dispatcher, but uses `Record<string, any>` and multiple `window as any` casts that fail the shared ESLint UI config. It also duplicates the consent concern (reads the cookie instead of using `useConsent`) and dispatches a custom event that no listener consumes.

### 1.4 `packages/email`

- **File:** `packages/email/package.json`
  - **Description:** Manifest for `@ydm-agency/email` (Resend + React Email).
  - **Connected to:** Used by contact/audit server actions.
  - **Quality:** Good — has `lint`, `typecheck`, and `build` scripts. No `test` script or test files; `tsconfig.tsbuildinfo` is tracked rather than gitignored.

- **File:** `packages/email/src/index.ts`
  - **Description:** `sendEmail` orchestration and template exports.
  - **Connected to:** `apps/firm-website/src/app/contact/actions.ts`, `apps/firm-website/src/app/audit/actions.ts`.
  - **Quality:** Fair — uses `Promise.allSettled` and returns a success flag, but does not inspect the resolved Resend results. In Resend v4, `resend.emails.send()` resolves even when the API returns an error (`{ data, error }`), so `sendEmail` can report `success: true` while both emails actually failed. Logs `rejected` promises only.

- **File:** `packages/email/src/AcknowledgmentEmail.tsx`
  - **Description:** React Email template for auto-acknowledgment to submitters.
  - **Connected to:** Rendered by `sendEmail`.
  - **Quality:** Good — current working tree uses the design-system palette (`#0A0A0B`, `#161618`, `#F5F5F6`, `#A1A1A9`, `#3B82F6`). The signature color was `#4AE4A8` (not in the palette) in the previous committed state; the current uncommitted changes align it with the accent token `#3B82F6`.

- **File:** `packages/email/src/NotificationEmail.tsx`
  - **Description:** React Email template for internal lead notification.
  - **Connected to:** Rendered by `sendEmail`.
  - **Quality:** Good — current working tree uses design-system colors, including `#3B82F6` for labels (previously `#4AE4A8` in the last commit). Minor copy issue: the hard-coded "New Contact" heading is reused for audit requests, producing "New Contact: ... — Free Marketing Audit".

- **File:** `packages/email/tsconfig.tsbuildinfo`
  - **Description:** TypeScript build-info artifact.
  - **Connected to:** Build output for the package.
  - **Quality:** Poor — tracked in git and modified in the working tree; should be removed from the index and added to `.gitignore`.

### 1.5 `packages/seo`

- **File:** `packages/seo/package.json`
  - **Description:** Manifest for `@ydm-agency/seo`.
  - **Connected to:** Dependency of `apps/firm-website` and listed in `packages/config/nextjs.js` `transpilePackages`; its exports are imported by the root layout and almost every page.
  - **Quality:** Fair — standard manifest, but the package has no `eslint.config.mjs`, so the `lint` script fails. It also has no `test` script or test files.

- **File:** `packages/seo/tsconfig.tsbuildinfo`
  - **Description:** TypeScript build-info artifact.
  - **Connected to:** Build output for the package.
  - **Quality:** Poor — tracked in git and modified in the working tree; should be removed from the index and added to `.gitignore`.

- **File:** `packages/seo/src/index.ts`
  - **Description:** Barrel export of `constructMetadata`, `OrganizationJsonLd`, `ServiceJsonLd`, `FaqPageJsonLd`, and their prop types.
  - **Connected to:** Imported by `apps/firm-website/src/app/layout.tsx` and by every route page except `apps/firm-website/src/app/page.tsx`, which inherits the root layout metadata.
  - **Quality:** Good — clean re-exports.

- **File:** `packages/seo/src/constructMetadata.ts`
  - **Description:** Helper that builds Next.js `Metadata` with OpenGraph, Twitter, icons, and no-index support. Defaults to `https://ydm-agency.com` for `metadataBase` (overridable via `NEXT_PUBLIC_SITE_URL`). The `canonicalUrl` prop is accepted, but it is used only for `metadataBase`, not for a real canonical `<link>` tag (`alternates.canonical`); the `noIndex` prop is implemented but not used by any page. The dead `packages/web-core/src/meta.ts` contains a similar helper that does set `alternates.canonical`, highlighting the gap.
  - **Connected to:** Used by 22 `page.tsx` files and the root layout (`apps/firm-website/src/app/layout.tsx`), which provides the default metadata for all routes.
  - **Quality:** Good — sensible defaults and uses `metadataBase` to resolve relative image/icon URLs. The `canonicalUrl` naming/behavior gap is the main issue.

- **File:** `packages/seo/src/JsonLd.tsx`
  - **Description:** Renders `Organization` and `Service` JSON-LD `<script>` tags using `dangerouslySetInnerHTML`.
  - **Connected to:** `OrganizationJsonLd` is used in `apps/firm-website/src/app/layout.tsx` inside `<head>`; `ServiceJsonLd` is used in `apps/firm-website/src/app/services/[slug]/page.tsx`. `apps/firm-website/src/app/education/[topic]/[slug]/page.tsx` defines its own local `ArticleJsonLd` function and does not import JSON-LD from this package.
  - **Quality:** Good — standard schema.org output, but the inline scripts need CSP allowance (`script-src 'unsafe-inline'` or a nonce). Note that `ServiceJsonLd` and `FaqPageJsonLd` are rendered inside `<main>` in their consumers rather than inside `<head>`.

- **File:** `packages/seo/src/FaqPageJsonLd.tsx`
  - **Description:** Renders `FAQPage` JSON-LD.
  - **Connected to:** Used in `apps/firm-website/src/app/services/[slug]/faq/page.tsx`.
  - **Quality:** Good.

### 1.6 `packages/utils`

- **File:** `packages/utils/package.json`
  - **Description:** Manifest for `@ydm-agency/utils`. Declares `clsx` and `tailwind-merge` as dependencies and points `main`/`types` directly to `src/index.ts`. No `build` script.
  - **Connected to:** Directly consumed by `packages/ui` and `apps/firm-website`; `packages/forms` uses it only transitively through `@ydm-agency/ui`. Included in `packages/config/nextjs.js` `transpilePackages`.
  - **Quality:** Fair — standard workspace setup, but it has no `eslint.config.mjs`, so the `lint` script fails, and `tsconfig.tsbuildinfo` is tracked rather than gitignored.

- **File:** `packages/utils/src/index.ts`
  - **Description:** Barrel export of `cn`, `formatCurrency`, `formatDate`.
  - **Connected to:** `cn` is imported by `packages/ui` and a few app components; `formatCurrency` and `formatDate` are not imported by any active app or package outside their own tests.
  - **Quality:** Good.

- **File:** `packages/utils/src/cn.ts`
  - **Description:** `clsx` + `tailwind-merge` class-name helper.
  - **Connected to:** Used in `packages/ui/src/{Button,Container,Badge,Card}.tsx` and `apps/firm-website/src/components/{PricingEstimator,ServiceSubnav}.tsx`. Not used by most app components.
  - **Quality:** Excellent — standard, minimal, typed.

- **File:** `packages/utils/src/formatCurrency.ts`
  - **Description:** `Intl.NumberFormat` currency formatter.
  - **Connected to:** Exported but not used in any active app or package (only in its own tests and the orphaned `packages/web-core/src/format.ts`).
  - **Quality:** Good.

- **File:** `packages/utils/src/formatDate.ts`
  - **Description:** `Intl.DateTimeFormat` date formatter.
  - **Connected to:** Exported but not used in any active app or package (only in its own tests and the orphaned `packages/web-core/src/format.ts`). The blog pages render `publishedAt` as a raw string and do not call this helper.
  - **Quality:** Good.

- **Files:** `packages/utils/src/{cn,formatCurrency,formatDate}.test.ts`
  - **Description:** Unit tests for the three helpers. `cn.test.ts` has 27 cases, `formatCurrency.test.ts` has 10, and `formatDate.test.ts` has 12.
  - **Connected to:** Package `test` script. Because `packages/utils` has no `vitest.config.ts`, the script runs the entire workspace suite.
  - **Quality:** Good — all tests pass and `tsc --noEmit` passes.

- **File:** `packages/utils/tsconfig.json`
  - **Description:** Standard TypeScript config extending `packages/config/tsconfig.base.json`, with `strict: true` inherited and `include: ["src/**/*"]`.
  - **Connected to:** Build/typecheck pipeline.
  - **Quality:** Good.

### 1.7 `packages/config`

- **File:** `packages/config/package.json`
  - **Description:** Config-only package manifest for `@ydm-agency/config`. Declares no `main`/`types`/scripts. The `files` field lists every exported config asset (`eslint-next.js`, `eslint-react.js`, `eslint-ui.config.mjs`, `nextjs.js`, `prettier.js`, `tailwind.js`, `tsconfig.base.json`).
  - **Connected to:** Referenced in `devDependencies` by every workspace package (active and orphaned).
  - **Quality:** Good — standard workspace setup, but the package itself has no lint/typecheck/test scripts.

- **File:** `packages/config/tailwind.js`
  - **Description:** Shared Tailwind config mapping custom colors and fonts to CSS variables (`var(--color-*)` / `var(--font-*)`). Content paths cover `packages/ui`, `packages/forms`, `packages/analytics`, and `packages/seo`; they omit the broken `packages/design-system` (and `packages/email`/`packages/utils`, which do not emit Tailwind classes).
  - **Connected to:** Imported by `apps/firm-website/tailwind.config.js` and consumed by `apps/firm-website/src/app/globals.css` and `apps/firm-website/src/app/layout.tsx`.
  - **Quality:** Fair — design-token mapping is correct, but `fontFamily.display` uses `...fontFamily.serif` as a fallback, which is wrong for the sans/variable Clash Display font. The `./src/**/*` content path also depends on the app’s cwd; the config is not portable as-is. Content also lists `packages/analytics/src` and `packages/seo/src`, which emit no Tailwind classes, and `plugins` is empty, which is why the `prose` classes used in the app are never generated.

- **File:** `packages/config/nextjs.js`
  - **Description:** Shared Next.js config with `reactStrictMode: true` and `transpilePackages` listing the six active runtime packages (`@ydm-agency/ui`, `@ydm-agency/forms`, `@ydm-agency/seo`, `@ydm-agency/analytics`, `@ydm-agency/utils`, `@ydm-agency/email`). Correctly omits `packages/design-system`, `packages/branding`, and `packages/web-core`.
  - **Connected to:** Imported by `apps/firm-website/next.config.js`.
  - **Quality:** Good.

- **File:** `packages/config/prettier.js`
  - **Description:** Prettier config with `prettier-plugin-tailwindcss`, single quotes, semicolons, tab width 2, `trailingComma: "es5"`, and `printWidth: 100`.
  - **Connected to:** Referenced only by `apps/firm-website/.prettierrc.js`. No package references it. The root `package.json` has a `format` script (`turbo run format`) but `turbo.json` has no `format` task.
  - **Quality:** Good — the config is fine, but formatting is not wired into packages or the Turbo pipeline.

- **File:** `packages/config/eslint-next.js`
  - **Description:** `.eslintrc`-format preset for the Next.js app. Extends `next/core-web-vitals` and `prettier`, and turns off `@next/next/no-html-link-for-pages`.
  - **Connected to:** Imported by `apps/firm-website/.eslintrc.js` and used by `next lint` (deprecated in Next.js 16).
  - **Quality:** Good.

- **File:** `packages/config/eslint-react.js`
  - **Description:** `.eslintrc`-format React preset. Extends `eslint:recommended`, `plugin:react/recommended`, and `prettier`; sets React version to `detect`; turns off `react/react-in-jsx-scope` and `react/prop-types`.
  - **Connected to:** Not imported by any package or app.
  - **Quality:** Poor / Dead — unused; can be removed.

- **File:** `packages/config/eslint-ui.config.mjs`
  - **Description:** Flat-config (ESLint 9) preset for package source. Uses `@eslint/js`, `typescript-eslint`, `eslint-plugin-react`, and `eslint-config-prettier`. Disables `react/react-in-jsx-scope`, `react/prop-types`, `@typescript-eslint/no-empty-object-type`, and ignores `_`-prefixed unused vars.
  - **Connected to:** Re-exported by `packages/ui/eslint.config.mjs` and `packages/forms/eslint.config.mjs`.
  - **Quality:** Good — but `packages/analytics`, `packages/seo`, `packages/email`, and `packages/utils` have `lint` scripts but no ESLint config, so they fail.

- **File:** `packages/config/tsconfig.base.json`
  - **Description:** Base TypeScript config with `strict: true`, `target: ES2022`, `module: ESNext`, `moduleResolution: bundler`, and the Next.js TS plugin.
  - **Connected to:** Extended by every package `tsconfig.json` and `apps/firm-website/tsconfig.json`.
  - **Quality:** Excellent.

---

## 2. `apps/firm-website` UI

### 2.1 Global styles, layout, providers

- **File:** `apps/firm-website/src/app/globals.css`
  - **Description:** Tailwind directives, CSS custom properties for dark/light themes, `::selection`, scrollbar styling, `.noise` texture, and base heading/body typography.
  - **Connected to:** Loaded by `apps/firm-website/src/app/layout.tsx`; drives the Tailwind color/font theme in `packages/config/tailwind.js`. The `.noise` utility references `/noise.svg` in the `public` folder.
  - **Quality:** Good — the token mapping is correct, but the `body` fallback `color`, `background`, and `font-family` are largely overridden by the Tailwind utility classes applied to `<body>` in `layout.tsx` (`bg-background text-text-primary font-sans`), so the base `body` block is mostly redundant. No errors.

- **File:** `apps/firm-website/src/app/education/print.css`
  - **Description:** Print media query used by the lesson detail page. Hides `header`, `footer`, `nav`, `aside`, `button`, `.no-print`, and `.CookieConsent`; forces black text on a white background; removes backgrounds; expands link URLs; and defines helper classes (`.card`, `.badge`, `.container`, `.print-only`, `.print-footer`).
  - **Connected to:** Imported by `apps/firm-website/src/app/education/[topic]/[slug]/page.tsx`.
  - **Quality:** Fair — the main hiding logic works for semantic elements and the `no-print` class, but the `.CookieConsent`, `.card`, `.badge`, and `.container` selectors do not match the actual class names used by the `CookieConsent`, `Card`, `Badge`, and `Container` components, so those rules are dead. `.print-only` and `.print-footer` are also unused. The cookie-consent banner could still be printed because it does not have the `.CookieConsent` class. Consider simplifying to semantic selectors, data attributes, or explicit class names, and add a `no-print` class to `CookieConsent`.

- **File:** `apps/firm-website/src/app/layout.tsx`
  - **Description:** Root server layout. Loads Inter from `next/font/google` and Clash Display via `next/font/local`, sets default metadata with `constructMetadata`, renders `OrganizationJsonLd` in `<head>`, and wraps `AppProviders`, `Header`, `<main id="main-content">`, `Footer`, and `CookieConsent`.
  - **Connected to:** All pages.
  - **Quality:** Good — excellent use of `next/font`, `lang="en"`, semantic landmarks, and the provider tree. However, the `public` folder does not contain `logo.png`, `og-image.png`, or `favicon.ico`, all of which are referenced by `OrganizationJsonLd` (logo) and `constructMetadata` defaults (OG image, icons). These assets will 404 until they are added or the URLs are updated. Also, `OrganizationJsonLd` uses an inline JSON-LD script that will be blocked by the current CSP (see `middleware.ts`).

- **File:** `apps/firm-website/src/app/providers.tsx`
  - **Description:** Client provider wrapper for `next-themes`, `CookieConsentProvider`, and `AnalyticsProvider`. `ThemeProvider` is configured with `attribute="class"`, `defaultTheme="dark"`, `enableSystem`, and `storageKey="ydm-theme"`.
  - **Connected to:** Imported by `apps/firm-website/src/app/layout.tsx`.
  - **Quality:** Fair — `AnalyticsProvider` is invoked with empty `gaId`, `posthogKey`, and `metaPixelId`, so no analytics scripts render. Even after IDs are configured, the `dangerouslySetInnerHTML` inline scripts used by `AnalyticsProvider` will be blocked by the current CSP (see `middleware.ts`).

- **File:** `apps/firm-website/tailwind.config.js`
  - **Description:** Re-exports `@ydm-agency/config/tailwind.js`.
  - **Connected to:** Tailwind build for the app.
  - **Quality:** Good — the re-export itself is correct. The underlying shared config has a content-path portability and a serif fallback issue, which are covered in the `packages/config` assessment.

- **File:** `apps/firm-website/postcss.config.js`
  - **Description:** Standard PostCSS config (`tailwindcss` and `autoprefixer` plugins).
  - **Connected to:** Build pipeline.
  - **Quality:** Good.

- **File:** `apps/firm-website/next.config.js`
  - **Description:** Re-exports `@ydm-agency/config/nextjs.js` (`reactStrictMode: true` and a `transpilePackages` list for the six active packages).
  - **Connected to:** Next.js build.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/app/sitemap.ts`
  - **Description:** Generates `/sitemap.xml` covering static pages, service spokes (overview, deliverables, process, FAQ), compare/pricing/industries/audit, industry verticals, blog posts, education topics/lessons, and learning paths.
  - **Connected to:** SEO.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/app/robots.ts`
  - **Description:** Generates `/robots.txt` allowing all paths except `/api/` and pointing to the sitemap.
  - **Connected to:** SEO.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/middleware.ts`
  - **Description:** Global middleware that adds security headers on all non-Next/static/image routes: `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy`.
  - **Connected to:** All pages; directly impacts whether `AnalyticsProvider`, `OrganizationJsonLd`, and `ServiceJsonLd`/`FaqPageJsonLd` inline scripts can run.
  - **Quality:** Fair — the header set is a good security baseline, but the current CSP (`default-src 'self'; script-src 'self' https://www.googletagmanager.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'`) does not include `'unsafe-inline'` for scripts, a nonce, or the PostHog/Meta Pixel/GA4 connect hosts, so the `dangerouslySetInnerHTML` scripts in `AnalyticsProvider` and `@ydm-agency/seo` JSON-LD will be blocked even after analytics IDs are configured.

### 2.2 Shared app components (`apps/firm-website/src/components/`)

- **File:** `apps/firm-website/src/components/AuditForm.tsx`
  - **Description:** Client form for the free marketing audit, uses `react-hook-form` + Zod, honeypot, success/error states.
  - **Connected to:** `apps/firm-website/src/app/audit/page.tsx` and `submitAudit` server action.
  - **Quality:** Good — uses design tokens, has honeypot. Missing ARIA `aria-invalid`/`aria-describedby` and `role="alert"` on per-field errors that `ContactForm` has. The global error block and the success panel also lack `role="alert"` / `aria-live` / focus management, and the form does not call `trackEvent` on success.

- **File:** `apps/firm-website/src/components/CalendlyEmbed.tsx`
  - **Description:** Lazy Calendly embed using `IntersectionObserver` to load `react-calendly/InlineWidget` only when in viewport.
  - **Connected to:** Imported by `CalendlySection.tsx`, which is itself unused, so `CalendlyEmbed` is also effectively dead in the running app.
  - **Quality:** Fair — good lazy-loading, but returns `null` silently if `NEXT_PUBLIC_CALENDLY_URL` is unset. Loading placeholder has no `aria-label`; the rendered `InlineWidget` iframe also has no accessible title.

- **File:** `apps/firm-website/src/components/CalendlySection.tsx`
  - **Description:** Wrapper around `CalendlyEmbed` using `next/dynamic` with `ssr: false`.
  - **Connected to:** Not imported by any app page I found.
  - **Quality:** Fair — clean dynamic import, but effectively dead code. It wraps `CalendlyEmbed` in another layer of `next/dynamic` lazy-loading on top of `CalendlyEmbed`'s own `IntersectionObserver` lazy-loading, and it duplicates the "Prefer to pick a time?" heading already present on the contact page.

- **File:** `apps/firm-website/src/components/CalendlyWidget.tsx`
  - **Description:** Alternative Calendly wrapper using `next/dynamic`.
  - **Connected to:** Used in `apps/firm-website/src/app/contact/page.tsx`.
  - **Quality:** Fair — it imports `InlineWidget` at the top of the file *and* dynamically imports it, defeating most code-splitting. It also hardcodes a fallback Calendly URL that may differ from `CalendlyEmbed`, loads immediately with no `IntersectionObserver`, uses a 700px height that differs from the 630px in `CalendlyEmbed`, and the dynamic-import loading state has no `aria-label`. Duplicates the functionality of `CalendlySection`/`CalendlyEmbed`.

- **File:** `apps/firm-website/src/components/PricingEstimator.tsx`
  - **Description:** Large multi-step estimator (703 lines) for service pricing; handles situation selection, service toggles, business size, timeline, add-ons, and a result step with analytics.
  - **Connected to:** `apps/firm-website/src/app/services/pricing/page.tsx`; links to `/contact` with pre-filled query params.
  - **Quality:** Fair/Good — uses design tokens, has `fieldset`/`legend`, `aria-hidden` on icons, keyboard-friendly cards. However the file is very long and should be split into smaller step components for maintainability, and it uses `React.FC` which is no longer idiomatic. The `useEffect` that tracks “started” is correct but needs the `eslint-disable` comment.

- **File:** `apps/firm-website/src/components/ServiceSubnav.tsx`
  - **Description:** Sub-navigation for service spoke pages (Overview, What You Get, Process, FAQ). Visually tab-like, but implemented as a `nav` with `Link` elements and `aria-current` rather than a full `role="tablist"` pattern.
  - **Connected to:** Service detail, deliverables, process, and FAQ pages.
  - **Quality:** Excellent — server component, typed props, `aria-current`, `aria-label`, responsive overflow scroll.

### 2.3 Education-specific components (`apps/firm-website/src/app/education/`)

This directory also contains the education page routes, `print.css`, and the `search-actions.ts` server action. Those are covered in sections 2.1, 2.4, and 2.5; the section below focuses on the reusable UI pieces.

- **File:** `apps/firm-website/src/app/education/EducationSearch.tsx`
  - **Description:** Client search input that filters the lesson catalog through the `searchLessons` server action. Supports a compact layout mode. Results are rendered inline once the query is non-empty.
  - **Connected to:** `apps/firm-website/src/app/education/page.tsx` and `apps/firm-website/src/app/education/[topic]/page.tsx`.
  - **Caveats:** There is no actual debounce — the server action is called on every keystroke. The `showResults` prop is declared but never consumed, so the topic page still renders search results when a query exists. The `<input>` has no `<label>` or `aria-label`, and the wrapper is a plain `<div>` rather than a `<form>` or `role="search"`. Analytics tracking (`education_search`) fires only on the first non-empty query.
  - **Quality:** Good/Fair — functional, but the dead prop and per-keystroke server action call should be fixed.

- **File:** `apps/firm-website/src/app/education/EducationAnalytics.tsx`
  - **Description:** Invisible client component that dispatches `trackEvent` for one of four event types: `lesson_view`, `topic_view`, `education_search`, or `lesson_filter`.
  - **Connected to:** `apps/firm-website/src/app/education/[topic]/page.tsx` (`topic_view`) and `apps/firm-website/src/app/education/[topic]/[slug]/page.tsx` (`lesson_view`). It is not currently used for `education_search` or `lesson_filter`; those are tracked directly inside `EducationSearch` and `LessonFilter`.
  - **Quality:** Good — with the caveat that the search/filter event types are not currently wired into any page.

- **File:** `apps/firm-website/src/app/education/LessonFilter.tsx`
  - **Description:** Difficulty-level filter buttons (`All`, `Beginner`, `Intermediate`, `Advanced`) that filter a client-side `lessons` array.
  - **Connected to:** `apps/firm-website/src/app/education/[topic]/TopicContent.tsx` and indirectly `apps/firm-website/src/app/education/[topic]/page.tsx`.
  - **Caveats:** Imports `Badge` from `@ydm-agency/ui` but does not use it; uses raw `<button>` elements rather than the shared `Button`; has no `aria-pressed` to indicate the selected filter.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/app/education/PrintButton.tsx`
  - **Description:** Client button that calls `window.print()`.
  - **Connected to:** `apps/firm-website/src/app/education/[topic]/[slug]/page.tsx`.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/app/education/SocialShare.tsx`
  - **Description:** Twitter, LinkedIn, and copy-link buttons. Tracks `lesson_share` and `lesson_share_link_copy` events.
  - **Connected to:** `apps/firm-website/src/app/education/[topic]/[slug]/page.tsx`.
  - **Caveats:** Uses raw `<a>` tags for external share URLs (not Next `<Link>`). Copy success is communicated only by an icon color change, with no `aria-live` announcement.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/app/education/TableOfContents.tsx`
  - **Description:** Sticky sidebar TOC that uses `IntersectionObserver` to highlight the currently visible section and smooth-scrolls to it on click.
  - **Connected to:** `apps/firm-website/src/app/education/[topic]/[slug]/page.tsx`.
  - **Caveats:** Hidden below the `xl` breakpoint (`hidden xl:block`). Uses `<button>` elements rather than anchor links, and the active item has no `aria-current`. The `<nav>` has no `aria-label`.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/app/education/[topic]/TopicContent.tsx`
  - **Description:** Client list of lessons for a topic, with `LessonFilter` state and a rendered card list.
  - **Connected to:** `apps/firm-website/src/app/education/[topic]/page.tsx`.
  - **Caveats:** Duplicates the `getSafetyBadgeVariant` and `getSafetyLabel` helpers that also exist in the lesson detail page.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/app/education/search-actions.ts`
  - **Description:** `use server` action that searches the `EDUCATION_LESSONS` array by lesson title, summary, topic, and section heading/body.
  - **Connected to:** `EducationSearch`.
  - **Quality:** Good.

### 2.4 Pages

- **File:** `apps/firm-website/src/app/page.tsx`
  - **Description:** Homepage with Hero, service snapshot cards, process teaser, trust banner, and final CTA.
  - **Connected to:** `Hero`, `Container`, `Card`, `Button`, `Link`, `CheckCircle`, `Monitor`, `MessageSquare`, `Rocket`, `noise` utility class.
  - **Quality:** Good — clean server component, consistent tokens.

- **File:** `apps/firm-website/src/app/about/page.tsx`
  - **Description:** Founder story, principles, differentiators, and location.
  - **Connected to:** `Container`, `Button`, `constructMetadata`, `Link`.
  - **Quality:** Fair — the “founder photo” block uses an emoji placeholder (`👤`) and placeholder text, which is not production-ready.

- **File:** `apps/firm-website/src/app/audit/page.tsx`
  - **Description:** Marketing audit landing page with coverage details and `AuditForm`.
  - **Connected to:** `AuditForm`, `Container`, `Button`, `constructMetadata`, `Link`, local `AUDIT_COVERAGE` array.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/app/blog/page.tsx`
  - **Description:** Blog hub with featured article and recent posts grid.
  - **Connected to:** `Container`, `Badge`, `Button`, `BLOG_POSTS`, `Link`, `Calendar`, `Clock`, `User`, `ArrowRight`, `constructMetadata`, `getCategoryColor` helper.
  - **Quality:** Fair — editorial layout, but `getCategoryColor` uses hardcoded `amber-500`, `blue-500`, `green-500`, and `purple-500` classes, just like `blog/[slug]/page.tsx`.

- **File:** `apps/firm-website/src/app/blog/[slug]/page.tsx`
  - **Description:** Individual blog post with breadcrumb, author bio, related CTA.
  - **Connected to:** `Container`, `Badge`, `Button`, `BLOG_POSTS`, `Link`, `notFound`, `constructMetadata`, `Calendar`, `Clock`, `User`, `ArrowLeft`, `Share2`.
  - **Quality:** Fair — the “Share” button has no click handler or URL generation, so it is non-functional. The article content is wrapped in `prose prose-lg prose-invert`, but since `@tailwindcss/typography` is not installed these classes are no-ops; the page relies on explicit heading/body classes for basic layout. The pull quote also hardcodes `border-amber-500` and `bg-amber-500/5`.

- **File:** `apps/firm-website/src/app/contact/page.tsx`
  - **Description:** Contact page with `ContactForm`, response promise, email card, and `CalendlyWidget`.
  - **Connected to:** `ContactForm`, `CalendlyWidget`, `submitContact`, `constructMetadata`, `Container`, `Link`, `VALID_PROJECT_TYPES` guard.
  - **Quality:** Good — pre-fills `projectType` and `message` from query params, uses `VALID_PROJECT_TYPES` guard.

- **File:** `apps/firm-website/src/app/privacy/page.tsx`
  - **Description:** Privacy policy with prose typography and a third-party-services table.
  - **Connected to:** `constructMetadata`.
  - **Quality:** Poor — uses `prose prose-invert prose-headings:font-display` for long-form text, but `@tailwindcss/typography` is not installed or configured. The `prose` classes are not generated, so the privacy policy will render without expected typographic spacing, table borders, list bullets, and link styling.

- **File:** `apps/firm-website/src/app/services/page.tsx`
  - **Description:** Services hub with 8-card grid, “Why YDM Agency,” and navigation links.
  - **Connected to:** `Card`, `Button`, `Container`, `SERVICE_LABELS`, `SERVICE_CARD_DESCRIPTIONS`, `constructMetadata`, Lucide icon map (`Monitor`, `Search`, `BarChart3`, `Megaphone`, `Sparkles`, `PenTool`, `Zap`, `Star`).
  - **Quality:** Good — server component, icon mapping. (Note: `SERVICE_LABELS` defines 8 services, so the grid renders 8 cards, not 9.)

- **File:** `apps/firm-website/src/app/services/layout.tsx`
  - **Description:** Minimal services layout (renders children).
  - **Connected to:** All `/services/*` routes.
  - **Quality:** Good — placeholder for future shared UI.

- **File:** `apps/firm-website/src/app/services/[slug]/page.tsx`
  - **Description:** Service overview spoke page (problem/solution, deliverables, FAQs, CTA).
  - **Connected to:** `ServiceSubnav`, `SERVICES_CONFIG`, `ServiceJsonLd`, `Button`, `Container`, `constructMetadata`, `getContextualFaqs`, `getEstimateHref`.
  - **Quality:** Fair — contains a hard-coded link to `/services/how-it-works` in the “How It Fits” section, but no such route exists. It likely should be `/services/process`.

- **File:** `apps/firm-website/src/app/services/[slug]/deliverables/page.tsx`
  - **Description:** “What You Get” spoke page.
  - **Connected to:** `ServiceSubnav`, `SERVICES_CONFIG`, `Container`, `Button`, `Card`, `constructMetadata`, `getEstimateHref`.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/app/services/[slug]/process/page.tsx`
  - **Description:** Service process spoke page.
  - **Connected to:** `ServiceSubnav`, `SERVICES_CONFIG`, `Container`, `Button`, `Card`, `Badge`, `constructMetadata`, `getContextualFaqs`, `getEstimateHref`.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/app/services/[slug]/faq/page.tsx`
  - **Description:** Service FAQ spoke page with grouped questions and `FaqPageJsonLd`.
  - **Connected to:** `ServiceSubnav`, `SERVICES_CONFIG`, `faq-utils` (`getAllServiceFaqs`), `Container`, `Button`, `constructMetadata`, `FaqPageJsonLd`, `getEstimateHref`.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/app/services/compare/page.tsx`
  - **Description:** Service comparison page with scenario cards and fit matrix.
  - **Connected to:** `Container`, `Card`, `Badge`, `Button`, `COMPARISON_SCENARIOS`, `SERVICE_LABELS`, `getFitLevel`.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/app/services/pricing/page.tsx`
  - **Description:** Pricing factors page with `PricingEstimator` and service-by-service pricing cards.
  - **Connected to:** `Container`, `Card`, `Button`, `PricingEstimator`, `SERVICES_CONFIG`, `SERVICE_LABELS`, `PRICING_DETAILS`, `constructMetadata`.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/app/services/process/page.tsx`
  - **Description:** Process hub with 5-phase lifecycle and service-specific process links.
  - **Connected to:** `Container`, `Button`, `constructMetadata`, and local constants `PHASES`, `SERVICE_PROCESS_LINKS`, `FAQS`.
  - **Quality:** Good — the page does **not** use `Card`, `Badge`, or `SERVICES_CONFIG`; it uses styled `div`s and hard-coded data, which will drift if the service config changes.

- **File:** `apps/firm-website/src/app/services/industries/page.tsx`
  - **Description:** Industries hub with vertical cards.
  - **Connected to:** `Container`, `Card`, `Button`, `Link`, local `INDUSTRY_CARDS` array with Lucide icons (`Briefcase`, `Wrench`, `User`).
  - **Quality:** Good — does **not** import or use `INDUSTRIES_CONFIG`; it hard-codes the three industry cards.

- **File:** `apps/firm-website/src/app/services/industries/[slug]/page.tsx`
  - **Description:** Industry-specific landing page.
  - **Connected to:** `INDUSTRIES_CONFIG`, `SERVICES_CONFIG`, `SERVICE_LABELS`, `Container`, `Button`, `Link`.
  - **Quality:** Good — does **not** use `Card` or `Badge`; it renders recommended services and FAQs in plain styled containers.

- **File:** `apps/firm-website/src/app/education/page.tsx`
  - **Description:** Education hub with topic grid, search, learning paths CTA.
  - **Connected to:** `Container`, `Card`, `Badge`, `Button`, `EducationSearch`, `EDUCATION_TOPICS`, `EDUCATION_LESSONS`, `LEARNING_PATHS`, Lucide icon map (`Search`, `BookOpen`, `Target`, `Lightbulb`, `Shield`, `Route`, `ArrowRight`), `constructMetadata`.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/app/education/[topic]/page.tsx`
  - **Description:** Topic listing page with lessons and filter.
  - **Connected to:** `Container`, `Card`, `Badge`, `Button`, `TopicContent`, `EducationSearch`, `EducationAnalytics`, `EDUCATION_TOPICS`, `EDUCATION_LESSONS`, `getTopicBySlug`, `getLessonsByTopic`, `Link`, `ArrowLeft`, `GraduationCap`, `constructMetadata`.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/app/education/[topic]/[slug]/page.tsx`
  - **Description:** Individual lesson page with TOC, social share, print button, and related lessons.
  - **Connected to:** `Container`, `Badge`, `Button`, `TableOfContents`, `SocialShare`, `PrintButton`, `EducationAnalytics`, `EDUCATION_LESSONS`, `getTopicBySlug`, `getRelatedLessons`, `getAdjacentLessons`, local `ArticleJsonLd` component, `print.css`.
  - **Quality:** Good — imports `print.css`, injects `Article` JSON-LD via a local `ArticleJsonLd` component, and renders a three-column layout (topic nav, main content, TOC). It does **not** wrap content in an `<article>` landmark despite using Article schema.

- **File:** `apps/firm-website/src/app/education/paths/page.tsx`
  - **Description:** Learning paths hub.
  - **Connected to:** `LEARNING_PATHS`, `Container`, `Card`, `Badge`, `Button`, `Route` icon, `getLessonBySlug`, `constructMetadata`.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/app/education/paths/[slug]/page.tsx`
  - **Description:** Individual learning path page.
  - **Connected to:** `LEARNING_PATHS`, `Container`, `Card`, `Badge`, `Button`, `getLearningPathBySlug`, `getLessonBySlug`, `ArrowLeft`, `GraduationCap`, `constructMetadata`. (`EDUCATION_LESSONS` is the underlying source for `getLessonBySlug`.)
  - **Quality:** Good.

### 2.5 App data/config files (`apps/firm-website/src/lib/`)

These are not components, but they drive the UI and are therefore relevant.

- **File:** `apps/firm-website/src/lib/service-labels.ts`
  - **Description:** Service names and short card descriptions.
  - **Connected to:** `services/page.tsx`, `services/pricing/page.tsx`, `services/compare/page.tsx`, `services/industries/[slug]/page.tsx`, `app/layout.tsx` (header nav), `PricingEstimator`, `pricing-estimator.ts`, `pricing-config.ts`.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/lib/services-config.ts`
  - **Description:** Large (1,088-line) data file with H1, problem/solution, deliverables, process phases, FAQs for all 8 services.
  - **Connected to:** All service spoke pages.
  - **Quality:** Fair — content is well-structured, but the file is too large to maintain easily; should be split per service.

- **File:** `apps/firm-website/src/lib/pricing-config.ts`
  - **Description:** Service pricing details.
  - **Connected to:** `services/pricing/page.tsx`.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/lib/pricing-estimator.ts`
  - **Description:** Pricing-estimator logic (499 lines): service definitions, multipliers, calculation helpers, URL/message builders.
  - **Connected to:** `PricingEstimator`, `services/[slug]/*` (via `getEstimateHref`).
  - **Quality:** Good — well-typed, but large; constants and calculations could be split.

- **File:** `apps/firm-website/src/lib/service-comparison-config.ts`
  - **Description:** Scenario-to-service mapping and fit-level utility.
  - **Connected to:** `services/compare/page.tsx`, `PricingEstimator`, `pricing-estimator.ts`.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/lib/industries-config.ts`
  - **Description:** Industry landing-page content (problems, recommended services, FAQs).
  - **Connected to:** `services/industries/*`.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/lib/faq-utils.ts`
  - **Description:** FAQ grouping, theme mapping, and service-specific answers.
  - **Connected to:** Service FAQ pages.
  - **Quality:** Fair — useful logic, but at 440 lines the data/logic mix is hard to scan.

- **File:** `apps/firm-website/src/lib/blog-config.ts`
  - **Description:** Blog post data and TypeScript interfaces.
  - **Connected to:** Blog hub and post pages.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/lib/audit-schema.ts`
  - **Description:** Zod schema for the audit form.
  - **Connected to:** `AuditForm`, `apps/firm-website/src/app/audit/actions.ts`.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/lib/education-config.ts`
  - **Description:** Aggregates all lesson arrays and provides helper functions.
  - **Connected to:** Education pages and search.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/lib/education/types.ts`
  - **Description:** Type definitions for lessons and sections.
  - **Connected to:** All education content and pages.
  - **Quality:** Good.

- **File:** `apps/firm-website/src/lib/education/learning-paths.ts`
  - **Description:** Learning path definitions and lookup helper.
  - **Connected to:** Education paths pages.
  - **Quality:** Good.

- **Files:** `apps/firm-website/src/lib/education/*-lessons.ts` and `*-lessons-new.ts` (10 files)
  - **Description:** Static lesson content arrays for SEO, Conversion, Foundations, Strategy, and Compliance topics.
  - **Connected to:** Education hub, topic, lesson, and learning-path pages.
  - **Quality:** Good — consistent `EducationLesson` shape; the split between original and `-new` files is slightly awkward and suggests a migration still in progress.

### 2.6 Server actions connected to UI forms

- **File:** `apps/firm-website/src/app/contact/actions.ts`
  - **Description:** Server action for contact form: server-side `contactFormSchema` validation, Upstash rate limiting (5/hr per IP via `x-forwarded-for`/`x-real-ip`), Supabase `leads` table storage, and Resend email dispatch via `@ydm-agency/email`.
  - **Connected to:** `ContactForm` through `apps/firm-website/src/app/contact/page.tsx`; also depends on `@ydm-agency/email` and environment variables `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, and `RESEND_API_KEY`.
  - **Caveats / operational issues:**
    - **Supabase env var mismatch:** The action reads `SUPABASE_URL` and `SUPABASE_ANON_KEY`, but `.env.example` documents `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. The names, the `NEXT_PUBLIC_` prefix, and the key type (anon vs. service role) all differ. If the environment is provisioned from `.env.example`, the Supabase client remains `null` and the lead-storage block no-ops silently.
    - **Supabase insert failure blocks email:** If the `leads` insert fails, the function returns an error before calling `sendEmail`, so the submitter receives no acknowledgment email at all.
    - **Shared `sendEmail` false-positive:** Both this action and `audit/actions.ts` rely on `packages/email/src/index.ts`, which uses `Promise.allSettled` and only logs rejected promises; it does not inspect the resolved Resend result for an `error` field. `sendEmail` can return `success: true` when Resend actually rejects one or both sends (see section 4.11).
  - **Quality:** Fair — the logic is comprehensive, but the env var mismatch and the email false-positive make the end-to-end submission pipeline unreliable in a `.env.example`-provisioned environment.

- **File:** `apps/firm-website/src/app/audit/actions.ts`
  - **Description:** Server action for audit form: server-side `auditFormSchema` validation, human-readable `marketingState` label mapping, and Resend email dispatch.
  - **Connected to:** `AuditForm` through `apps/firm-website/src/app/audit/page.tsx`; also depends on `@ydm-agency/email` and `RESEND_API_KEY`.
  - **Caveats / operational issues:**
    - **No rate limiting and no Supabase persistence**, unlike the contact action. If the audit form is public, it is more exposed to spam and no leads are tracked in the database.
    - **Shared `sendEmail` false-positive:** Uses the same `sendEmail` as the contact action, so it is also subject to the false-positive success bug described above.
  - **Quality:** Fair — lacks the security and operational parity of the contact action and is also affected by the shared `sendEmail` caveat.

> **Completeness note:** A third server action, `apps/firm-website/src/app/education/search-actions.ts`, exists but powers the `EducationSearch` input rather than a form, so it is intentionally outside the scope of this section.

---

## 3. Orphaned / Broken Packages

### 3.1 `packages/design-system` — Broken / excluded

- **File:** `packages/design-system/package.json`
  - **Description:** Contains **two concatenated JSON objects** (first claiming `name: "@ydm-agency/ui"`, second `name: "@packages/design-system"`). It is explicitly excluded from `pnpm-workspace.yaml` (`!packages/design-system`).
  - **Connected to:** Nothing.
  - **Quality:** Broken — invalid manifest.

- **Files:** `packages/design-system/src/index.ts`, `src/Button.tsx`, `src/Badge.tsx`, `src/Card.tsx`, etc.
  - **Description:** Duplicate component code. Several files contain two full component definitions stacked back-to-back, and `index.ts` re-exports the same symbols twice. It is also missing the `Header` component present in `packages/ui`.
  - **Connected to:** Not wired into the workspace or `transpilePackages`.
  - **Quality:** Broken / Dead — should be deleted.

- **File:** `packages/design-system/src/cn.ts`
  - **Description:** Duplicate of `packages/utils/src/cn.ts`.
  - **Connected to:** Nothing.
  - **Quality:** Dead — redundant.

### 3.2 `packages/branding` — Orphaned / misnamed

- **File:** `packages/branding/package.json`
  - **Description:** Declares `name: "@packages/branding"` (wrong scope). It does set `main`/`types` to `./src/index.ts`, which exists.
  - **Connected to:** Not imported by the app. The root `vitest.config.ts` aliases `@ydm-agency/branding` to the source path, but the package is not in `next.config.js transpilePackages`.
  - **Quality:** Poor — misnamed and unused.

- **File:** `packages/branding/src/tokens.ts`
  - **Description:** Design tokens (colors, typography, logos) as a TypeScript object.
  - **Connected to:** Nothing at runtime.
  - **Quality:** Fair — well-structured, but duplicates values already in `packages/config/tailwind.js` and `globals.css`.

### 3.3 `packages/web-core` — Orphaned / misnamed

- **File:** `packages/web-core/package.json`
  - **Description:** Declares `name: "@packages/web-core"` and defines subpath exports for `format`, `env`, `layout`, `meta`. It has no `main`/`types` and no `src/index.ts`; it relies solely on subpath exports, all of which are unused.
  - **Connected to:** Not imported by the app.
  - **Quality:** Poor — misnamed and unused.

- **Files:** `packages/web-core/src/format.ts`, `src/meta.ts`, `src/layout.tsx`, `src/env.ts`
  - **Description:** Helpers that duplicate `@ydm-agency/utils` (`formatDate`, `formatCurrency`), `@ydm-agency/seo` (`createRootMetadata` vs `constructMetadata`), and `packages/ui` layout concerns.
  - **Connected to:** Nothing.
  - **Quality:** Dead — redundant with existing packages.

---

## 4. Cross-Cutting Findings & Recommendations

### Strengths
1. **TypeScript discipline** — strict mode, explicit interfaces, and Zod schemas are used consistently.
2. **Server/Client split** — most pages are Server Components; only interactive pieces are marked `'use client'`.
3. **Accessibility baseline** — skip links, `aria-current`, `aria-label`, `aria-invalid`, semantic sections, and focus-visible rings are present in key components.
4. **Design tokens** — the Tailwind config and `globals.css` establish a coherent dark-first palette and font system.
5. **Form security** — `ContactForm` has honeypot, Zod validation, and the contact action has rate limiting + Supabase + email.
6. **SEO** — `constructMetadata`, JSON-LD components, `sitemap.ts`, and `robots.ts` are wired through the app.

### Issues to address
1. **Analytics is not operational** — `providers.tsx` passes empty strings to `AnalyticsProvider`; even after IDs are configured, the CSP will block the inline `dangerouslySetInnerHTML` scripts used by `Analytics.tsx` and the JSON-LD scripts in `@ydm-agency/seo`.
2. **Hardcoded colors outside the token system** — `packages/ui/src/Features.tsx`, `packages/ui/src/Pricing.tsx`, `packages/forms/src/LeadForm.tsx`, and both `apps/firm-website/src/app/blog/page.tsx` and `apps/firm-website/src/app/blog/[slug]/page.tsx` (via `getCategoryColor` and the pull quote) use raw `slate-*`, `gray-*`, `emerald-*`, `blue-500`, `amber-*`, `green-*`, `purple-*`, and `bg-white` classes.
3. **Dead and broken packages** — `packages/design-system` has invalid files and is excluded; `packages/branding` and `packages/web-core` are misnamed and unused. All three should be removed or fixed.
4. **Duplicate code** — `packages/forms` has two contact schema definitions; `packages/design-system` duplicates `packages/ui` components; `packages/web-core` duplicates `utils`/`seo`; `getSafetyBadgeVariant`/`getSafetyLabel` are duplicated between `education/[topic]/[slug]/page.tsx` and `TopicContent.tsx`.
5. **Unused `LeadForm`** — the component is exported but never rendered, and its styling/copy is off-brand.
6. **Calendly duplication** — three wrappers (`CalendlyEmbed`, `CalendlySection`, `CalendlyWidget`) with inconsistent sizes, lazy-loading, and fallback URL handling. `CalendlySection` and `CalendlyEmbed` are both unused; only `CalendlyWidget` is rendered, and it loads immediately with no `IntersectionObserver`, has a hardcoded fallback URL, and uses a 700px height instead of the 630px used elsewhere.
7. **Large files** — `services-config.ts` (1,088 lines), `pricing-estimator.ts` (499 lines), `PricingEstimator.tsx` (703 lines), `faq-utils.ts` (440 lines) are hard to maintain and should be split.
8. **Non-functional UI** — blog share button has no handler; about page has an emoji photo placeholder.
9. **Audit form lacks parity** — no rate limiting, no Supabase storage, no analytics `trackEvent` call on success, and weaker ARIA error mapping compared with `ContactForm` (missing per-field `aria-invalid`/`aria-describedby`, no `role="alert"` on the global error block, no `aria-live` or focus management on the success panel).
10. **Orphaned shared components** — `Features.tsx` and `Pricing.tsx` in `packages/ui` are exported but not used by any app page; they should either be used, deleted, or have their token issues fixed.
11. **Email sending can silently fail** — `packages/email/src/index.ts` uses `Promise.allSettled` but does not check the resolved Resend response. `sendEmail` can return `success: true` when Resend rejects the send request (e.g., unverified domain, invalid API key, rate limit). `tsconfig.tsbuildinfo` files are tracked across every package (including `packages/email`) and should be ignored; `packages/branding` and `packages/web-core` currently have untracked `tsconfig.tsbuildinfo` files because `.gitignore` does not exclude them.
12. **`packages/seo` tooling and canonical gap** — the package has no `eslint.config.mjs` (its `lint` script fails), no `test` script or test files, and `tsconfig.tsbuildinfo` is tracked. `constructMetadata` accepts `canonicalUrl` but only uses it for `metadataBase`; it does not generate a canonical `<link>` tag (`alternates.canonical`). `noIndex` is implemented but unused. `OrganizationJsonLd` is correctly placed inside `<head>` in `layout.tsx`, but `ServiceJsonLd`/`FaqPageJsonLd` are rendered inside `<main>` rather than `<head>`.
13. **Missing `@tailwindcss/typography` plugin** — `apps/firm-website/src/app/privacy/page.tsx` and `apps/firm-website/src/app/blog/[slug]/page.tsx` rely on `prose prose-invert`/`prose prose-lg prose-invert` classes, but the package is not in `package.json` and the Tailwind config `plugins` array is empty. The generated CSS contains no `.prose` rules, so `/privacy` will render un-styled native elements (no margins, un-styled lists/tables, default link colors).
14. **Invalid `Link`/`Button` nesting** — `packages/ui/src/Hero.tsx`, `packages/ui/src/Pricing.tsx`, and many final-CTA pages (`page.tsx`, `services/page.tsx`, `services/industries/page.tsx`, `education/page.tsx`, `education/[topic]/page.tsx`, `education/paths/page.tsx`, `education/paths/[slug]/page.tsx`, `education/[topic]/[slug]/page.tsx`, `blog/page.tsx`, `blog/[slug]/page.tsx`) wrap `Button` inside `Link` without `asChild`, producing invalid `<a><button>` HTML.
15. **Button focus and hover not fully tokenized** — `packages/ui/src/Button.tsx` uses `focus-visible:ring-text-primary` (white) for the focus ring instead of `accent`, and the primary variant's `hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]` hardcodes the blue color rather than the `accent` token.
16. **`CookieConsent` accessibility and print gaps** — `packages/ui/src/CookieConsent.tsx` lacks `role="dialog"`, `aria-modal`, an `aria-label`, focus trap, and return-focus management. The outer `<div>` does not include a `CookieConsent` class, so the `.CookieConsent` selector in `print.css` cannot target the banner for print suppression (only the inner `<Button>` elements are hidden by the `button` selector).
17. **Education filter and TOC a11y gaps** — `LessonFilter` uses raw `<button>` elements with no `aria-pressed`, `role="radiogroup"`, or `aria-live` announcement. `TableOfContents` uses `<button>` instead of anchors, has no `aria-current` on the active item, no `aria-label` on `<nav>`, and is hidden below `xl` with no mobile fallback.
18. **Audit form a11y gaps** — `AuditForm` does not set `aria-invalid`/`aria-describedby` on inputs, does not wrap error/success blocks in `role="alert"` or `aria-live`, and has no focus management on success or error.

### Bottom-line grade
The active UI layer is **solid and largely production-ready**, with good TypeScript, accessibility, and component architecture. The main risks are **dead/broken packages, analytics/CSP wiring, color-token consistency, email send-error handling, `packages/seo` tooling/canonical gaps, a few non-functional or placeholder UI elements, and two critical UI bugs: the missing `@tailwindcss/typography` plugin (which breaks `/privacy` and partially `/blog/[slug]` styling) and the widespread `Link` wrapping `Button` without `asChild` (invalid `<a><button>` nesting across the homepage and many routes)**. Fixing those would raise the overall UI quality from “functional but uneven” to “polished and maintainable.”

---

## 5. QA Additions — Files and Concerns Added During Verification

The following UI-relevant files, configurations, and content issues were not covered in the original assessment but were found by re-reading the source code directly.

### 5.1 `packages/ui` configuration and test files

- `packages/ui/eslint.config.mjs` — re-exports the shared UI flat config.
- `packages/ui/tsconfig.json` — extends the base config but **excludes `src/__tests__` and `*.test.tsx`**, so `tsc --noEmit` does not typecheck the tests.
- `packages/ui/vitest.config.ts` — uses a hardcoded relative alias to `../utils/src`.
- `packages/ui/src/Button.test.tsx` and `packages/ui/src/__tests__/*.test.tsx` — component tests are present but not discussed.
- `packages/ui/tsconfig.tsbuildinfo` — tracked in git and should be gitignored.

### 5.2 Build artifacts and missing tooling across active packages

- `tsconfig.tsbuildinfo` files are tracked in **all** active packages (`ui`, `forms`, `utils`, `analytics`, `seo`, `email`), not just the ones called out. `packages/branding` and `packages/web-core` have untracked `tsconfig.tsbuildinfo` files because `.gitignore` does not exclude `*.tsbuildinfo`.
- `packages/analytics`, `packages/seo`, `packages/email`, and `packages/utils` have `lint` scripts but no `eslint.config.mjs`.
- `packages/analytics`, `packages/seo`, and `packages/email` have no `vitest.config.ts`; `packages/utils` also runs tests through the root config.

### 5.3 Workspace pipeline and config gaps

- `turbo.json` has no `format` task, so `pnpm format` / `turbo run format` from the root `package.json` does not work.
- `packages/config/eslint-ui.config.mjs` is currently untracked in git but is listed in `packages/config/package.json` `files` and is re-exported by `packages/ui` and `packages/forms` ESLint configs.

### 5.4 App-level files and public assets

- `apps/firm-website` also contains `next-env.d.ts`, `tsconfig.json`, `.eslintrc.js`, and `.prettierrc.js` (correctly wired but unmentioned).
- Missing Next.js UI conventions: `not-found.tsx`, `error.tsx`, `loading.tsx`, `manifest.ts`, `opengraph-image.*`, and any `api/` routes.
- `apps/firm-website/public/` only contains `fonts/ClashDisplay-Variable.woff2` and `noise.svg`. `logo.png`, `og-image.png`, and `favicon.ico` are referenced by `layout.tsx` and `constructMetadata` but do not exist.
- `packages/branding/src/tokens.ts` references `/logo-mark.svg`, `/logo-wordmark.svg`, and `/favicon.svg`, none of which exist.

### 5.5 Content and copy issues

- `apps/firm-website/src/app/page.tsx` process cards use the headings **“We talk.”**, **“We build.”**, and **“We deliver.”** (lines 117–138). This conflicts with the project’s impersonal voice guideline (“never use we/us/our”).

### 5.6 Additional implementation notes

- `packages/forms/src/LeadForm.tsx` also hardcodes `bg-white` in the budget `<select>`.
- `apps/firm-website/src/components/CalendlyWidget.tsx` imports `InlineWidget` at the top of the file **and** dynamically imports it, defeating most of the code-splitting benefit.
- `PrintButton.tsx` applies a `no-print` class that is not defined in `print.css`; it works only because `print.css` also hides all `<button>` elements.
- `EducationSearch.tsx` declares a `showResults` prop that is never consumed.
