# YDM Agency — Implementation Task Register

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
| T-001 | Design Token Configuration | Design System | done |
| T-002 | Typography System | Design System | done |
| T-003 | Theme Provider | Design System | done |
| T-004 | Button Component | Design System | done |
| T-005 | Card, Badge, and Container Components | Design System | done |
| T-006 | Header Component | Design System | done |
| T-007 | Footer Component | Design System | done |
| T-008 | Cookie Consent Component | Design System | done |
| T-009 | Root Layout and Global CSS | App Shell | done |
| T-010 | Middleware: Subdomain Routing and Security Headers | App Shell | ready |
| T-011 | Homepage | Pages | ready |
| T-012 | Services Hub Page | Pages | ready |
| T-013 | Service Spoke Pages | Pages | ready |
| T-014 | Process Hub Page | Pages | ready |
| T-015 | Service Process Spoke Pages | Pages | ready |
| T-016 | Demos Gallery Page | Pages | ready |
| T-017 | About Page | Pages | ready |
| T-018 | Privacy Policy Page | Pages | ready |
| T-019 | Contact Form Schema | Lead Capture | ready |
| T-020 | Contact Form UI Component | Lead Capture | ready |
| T-021 | Email Templates Package | Lead Capture | ready |
| T-022 | Contact Server Action Pipeline | Lead Capture | ready |
| T-023 | Contact Page Assembly | Lead Capture | ready |
| T-024 | Analytics Consent Architecture | Analytics + SEO | ready |
| T-025 | SEO Infrastructure | Analytics + SEO | ready |
| T-026 | Demo App Scaffold | Demo Applications | ready |
| T-027 | Demo: Coastal Cafe | Demo Applications | ready |
| T-028 | Demo: Apex SaaS | Demo Applications | ready |
| T-029 | Demo: Vanguard Plumbing | Demo Applications | ready |
| T-030 | Demo: Nova Storefront | Demo Applications | ready |
| T-031 | Unit Testing Setup | Testing | ready |
| T-032 | Unit Tests: Components and Validation | Testing | ready |
| T-033 | E2E Testing Setup | Testing | ready |
| T-034 | E2E Tests: Critical User Flows | Testing | ready |
| T-035 | Environment Variables and External Accounts | Infrastructure | ready |
| T-036 | CI/CD Pipeline Updates | Infrastructure | ready |
| T-037 | Deployment Configuration | Infrastructure | ready |

---

## [x] T-001 — Design Token Configuration
**Status:** done | **Domain:** Design System | **Depends On:** none | **Blocks:** T-002–T-009
**Spec:** Replace the two-variable Tailwind theme in `packages/config/tailwind.js` with the full YDM brand token set from planning.md §2. All colors are CSS custom properties referenced via `var(--color-*)`.
**Behavior:** Given any app extending `@ydm-agency/config/tailwind`, when Tailwind compiles, then `bg-accent` resolves to `#4AE4A8` and `text-text-primary` resolves to `#F5F5F6` in dark mode.
**Research:** `packages/config/tailwind.js` (existing extend.colors shape), `apps/firm-website/src/app/globals.css` (existing `--background`/`--foreground` vars to be replaced), `packages/config/package.json` (confirm tailwindcss is v3.x not v4).
**Files:** `packages/config/tailwind.js` [UPDATE], `apps/firm-website/src/app/globals.css` [UPDATE], `CHANGELOG.md` [CREATE]
**Pattern:** CSS Custom Properties as Tailwind primitives — hex values live exclusively in the CSS layer; Tailwind class names reference vars enabling theme-switching via a single class swap.
**Anti-Patterns:** No arbitrary values `[#4AE4A8]` for brand colors. No `slate-*` or `blue-*` in any new component files after this task.
**Rules:** (1) Token names exactly: background, surface, text-primary, text-secondary, accent, accent-hover, border, error, success. (2) `.dark` and `.light` classes both define all vars. (3) Content paths in tailwind.js must include all packages with JSX.
**Exports:** `module.exports` CJS tailwind config. CSS vars in `:root`, `.dark`, `.light` selectors.
**DoD:** `pnpm turbo run build --filter=apps/firm-website` exits 0. `bg-accent` class exists in compiled CSS. No raw hex in new component files.
**Out of Scope:** Font tokens (T-002). Light-mode toggle UI (T-003).
**Validate:** `pnpm turbo run typecheck --filter=@ydm-agency/config && pnpm turbo run build --filter=apps/firm-website`

**Subtasks:**
- [x] T-001.1 [AGENT] `packages/config/tailwind.js` — Replace `extend.colors` with 9-token map where each value is `var(--color-<name>)`. Add missing content paths: `../../packages/analytics/src/**/*.{js,ts,jsx,tsx}` and `../../packages/seo/src/**/*.{js,ts,jsx,tsx}`.
- [x] T-001.2 [AGENT] `apps/firm-website/src/app/globals.css` — Remove existing `--background`/`--foreground`. Add `:root { --color-background:#0A0A0B; --color-surface:#161618; --color-text-primary:#F5F5F6; --color-text-secondary:#A1A1A9; --color-accent:#4AE4A8; --color-accent-hover:#38C990; --color-border:#2A2A2E; --color-error:#F87171; --color-success:#4AE4A8; }`. Add `.light` class overriding surface (#F5F5F6), background (#FFFFFF), text-primary (#0A0A0B), text-secondary (#4A4A52), accent-hover (#38C990).
- [x] T-001.3 [AGENT] `CHANGELOG.md` — Create at repo root: `# Changelog\n\n## [Unreleased]\n### T-001 — Design Token Configuration\n- Replaced placeholder slate/blue palette with YDM brand tokens.`

---

## [x] T-002 — Typography System
**Status:** done | **Domain:** Design System | **Depends On:** T-001 | **Blocks:** T-009
**Spec:** Self-host Clash Display Variable (headings 600–700) and Inter Variable (body 400–600) via `next/font`. Inject as CSS custom properties; register in `packages/config/tailwind.js` under `extend.fontFamily`.
**Behavior:** Given a slow connection, when the page loads, then body text renders in the system fallback with `font-display: swap` until Inter loads without layout shift; headings use Clash Display at 600+.
**Research:** `apps/firm-website/src/app/layout.tsx` (identify `<html>` element for variable classes), `packages/config/tailwind.js` (confirm `extend.fontFamily` absent after T-001), `apps/firm-website/package.json` (confirm `next` version supports `next/font/local`).
**Files:** `apps/firm-website/public/fonts/ClashDisplay-Variable.woff2` [ADD — HUMAN], `apps/firm-website/src/app/layout.tsx` [UPDATE], `packages/config/tailwind.js` [UPDATE], `apps/firm-website/src/app/globals.css` [UPDATE]
**Pattern:** next/font variable injection — font generates a scoped CSS variable applied to `<html>`, consumed by Tailwind `fontFamily` tokens; zero `@font-face` boilerplate needed.
**Anti-Patterns:** Never load fonts from a CDN `<link>` tag. Never use `display: block` on font-face.
**Rules:** (1) Use `variable` option in `next/font` config. (2) Apply both `.variable` classes to `<html>` in layout. (3) Tailwind class `font-display` = Clash Display; `font-sans` = Inter.
**Exports:** Tailwind classes `font-display`, `font-sans`. CSS vars `--font-display`, `--font-sans`.
**DoD:** Build passes. No render-blocking font in Lighthouse. Headings render in Clash Display in dev server.
**Out of Scope:** Kinetic/animated type. Font subsetting beyond next/font defaults.
**Validate:** `pnpm turbo run build --filter=apps/firm-website` then inspect `.next/static/media/` for `.woff2` files.

**Subtasks:**
- [x] T-002.1 [HUMAN] Download `ClashDisplay-Variable.woff2` from `https://www.fontshare.com/fonts/clash-display` (free commercial license) and place at `apps/firm-website/public/fonts/ClashDisplay-Variable.woff2`. No CLI equivalent for this download exists.
- [x] T-002.2 [AGENT] `packages/config/tailwind.js` — Add `const { fontFamily } = require('tailwindcss/defaultTheme')`. Add to `extend`: `fontFamily: { display: ['var(--font-display)', ...fontFamily.serif], sans: ['var(--font-sans)', ...fontFamily.sans] }`.
- [x] T-002.3 [AGENT] `apps/firm-website/src/app/layout.tsx` — Import `Inter` from `next/font/google` with `{ subsets:['latin'], variable:'--font-sans', display:'swap' }`. Import `localFont` from `next/font/local` for ClashDisplay with `{ src:'../../public/fonts/ClashDisplay-Variable.woff2', variable:'--font-display', display:'swap' }`. Apply both `.variable` classes to `<html className>`.
- [x] T-002.4 [AGENT] `apps/firm-website/src/app/globals.css` — Add inside `@layer base`: `h1,h2,h3,h4,h5,h6 { font-family: var(--font-display); letter-spacing: -0.02em; }`.

---

## [x] T-003 — Theme Provider
**Status:** done | **Domain:** Design System | **Depends On:** T-001 | **Blocks:** T-008, T-009
**Spec:** Integrate `next-themes` for persistent dark/light mode. Default dark. `ThemeProvider` wraps the app via `providers.tsx`. `ThemeToggle` button lives in `@ydm-agency/ui`.
**Behavior:** Given a user who previously selected light mode, when they return, then the correct theme renders on first paint with no flash of wrong theme (preference stored in cookie, not localStorage).
**Research:** `pnpm-workspace.yaml` (next-themes absent from catalog — add it), `apps/firm-website/src/app/layout.tsx` (confirm no ThemeProvider yet), `packages/ui/package.json` (confirm next-themes absent from ui package too).
**Files:** `pnpm-workspace.yaml` [UPDATE], `apps/firm-website/package.json` [UPDATE], `apps/firm-website/src/app/providers.tsx` [CREATE], `packages/ui/src/ThemeToggle.tsx` [CREATE], `packages/ui/src/index.ts` [UPDATE]
**Pattern:** Provider composition — `ThemeProvider` is the outermost client boundary in layout; `ThemeToggle` is an isolated `'use client'` leaf. Server Components are unaffected.
**Anti-Patterns:** Never call `useTheme()` in a Server Component. Never place `ThemeProvider` inside a page file.
**Rules:** (1) `attribute="class"` so Tailwind `dark:` variant works. (2) `defaultTheme="dark"`. (3) `enableSystem={true}`. (4) `storageKey="ydm-theme"`.
**Exports:** `ThemeToggle` from `@ydm-agency/ui`. `AppProviders` from `providers.tsx` (internal).
**DoD:** Theme persists across refresh. No FOUC. ThemeToggle renders without TS errors.
**Out of Scope:** Per-page theme overrides. Animated theme transitions.
**Validate:** `pnpm turbo run typecheck --filter=apps/firm-website --filter=@ydm-agency/ui`

**Subtasks:**
- [x] T-003.1 [AGENT] `pnpm-workspace.yaml` — Add `next-themes: ^0.3.0` to the `catalog:` block.
- [x] T-003.2 [AGENT] `apps/firm-website/package.json` — Add `"next-themes": "catalog:"` under `dependencies`.
- [x] T-003.3 [AGENT] `apps/firm-website/src/app/providers.tsx` — CREATE: `'use client'`. Export `AppProviders({ children })` wrapping children in `<ThemeProvider attribute="class" defaultTheme="dark" enableSystem storageKey="ydm-theme">`.
- [x] T-003.4 [AGENT] `packages/ui/src/ThemeToggle.tsx` — CREATE: `'use client'`. Import `useTheme` from `next-themes`; import `Sun`, `Moon` from `lucide-react`. Render `<button>` that toggles theme with `aria-label="Toggle theme"` and `focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-2`.
- [x] T-003.5 [AGENT] `packages/ui/src/index.ts` — Add `export { ThemeToggle } from './ThemeToggle'`.

---

## [x] T-004 — Button Component
**Status:** done | **Domain:** Design System | **Depends On:** T-001 | **Blocks:** T-006, T-007, T-011
**Spec:** Rebuild `packages/ui/src/Button.tsx` using Class Variance Authority (CVA). Variants: `primary` (accent fill + glow), `secondary` (border), `ghost` (text only). `asChild` via Radix Slot. All variants have `focus-visible` ring.
**Behavior:** Given a keyboard user tabbing to a primary Button, then a 2px mint ring is visible. Given a mouse user hovering primary, then `box-shadow: 0 0 20px rgba(74,228,168,0.3)` glow activates.
**Research:** `packages/ui/src/Button.tsx` (current ternary variant logic — to be replaced), `packages/ui/package.json` (confirm `class-variance-authority` and `@radix-ui/react-slot` absent), `packages/utils/src/index.ts` (confirm `cn()` exported).
**Files:** `packages/ui/package.json` [UPDATE], `packages/ui/src/Button.tsx` [UPDATE], `packages/ui/src/__tests__/Button.test.tsx` [CREATE — TDD]
**Pattern:** Class Variance Authority — all variant logic in one `cva()` call at file top; zero conditional className logic in component JSX.
**Anti-Patterns:** Never use ternary class expressions inside JSX. Never remove `focus-visible` ring styles.
**Rules:** (1) All colors use design tokens, no raw hex. (2) `asChild` delegates render to child element via Slot. (3) Export `buttonVariants` for link-as-button usage.
**Exports:** `Button`, `ButtonProps`, `buttonVariants`.
**DoD:** `pnpm vitest run packages/ui/src/__tests__/Button.test.tsx` passes. All three variants render correct token classes. TypeCheck passes.
**Out of Scope:** Loading spinner state. Icon-only variant.
**Validate:** `pnpm turbo run typecheck --filter=@ydm-agency/ui && pnpm vitest run packages/ui/src/__tests__/Button.test.tsx`

**Subtasks:**
- [x] T-004.1 [AGENT] `packages/ui/package.json` — Add `"class-variance-authority": "^0.7.0"` and `"@radix-ui/react-slot": "^1.1.0"` to dependencies.
- [x] T-004.2 [AGENT] `packages/ui/src/__tests__/Button.test.tsx` — CREATE (TEST — write before implementation): assert (a) primary variant className contains `bg-accent`; (b) secondary contains `border-border`; (c) ghost renders without border or bg; (d) `asChild` renders the child element tag not `<button>`; (e) disabled sets `pointer-events-none opacity-50`. Use `vitest` + `@testing-library/react`.
- [x] T-004.3 [AGENT] `packages/ui/src/Button.tsx` — Rewrite: import `cva` from `class-variance-authority`, `Slot` from `@radix-ui/react-slot`, `cn` from `@ydm-agency/utils`. Base classes: `inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50`. Primary: `bg-accent text-background hover:bg-accent-hover hover:shadow-[0_0_20px_rgba(74,228,168,0.3)]`. Secondary: `border border-border text-text-primary hover:bg-surface hover:border-accent`. Ghost: `text-text-secondary hover:text-text-primary hover:bg-surface`. Export `buttonVariants`, `Button`, `ButtonProps`.
- [x] T-004.4 [AGENT] `packages/ui/src/index.ts` — Ensure `Button`, `ButtonProps`, `buttonVariants` are all exported.

---

## [x] T-005 — Card, Badge, and Container Components
**Status:** done | **Domain:** Design System | **Depends On:** T-001 | **Blocks:** T-011, T-012, T-016
**Spec:** Rebuild `Card` (hover lift + accent shadow), `Badge` (CVA: default/accent/outline variants), and `Container` (max-w-6xl with responsive px) using design tokens.
**Behavior:** Given a user hovering a demo card, when pointer enters, then card translates -4px Y with `shadow-accent/10`. Given any page using Container, then max-width is 1152px with responsive side padding.
**Research:** `packages/ui/src/Card.tsx` (thin wrapper, no hover — to be replaced), `packages/ui/src/Badge.tsx` (uses `purple`/`blue` variant keys conflicting with new tokens), `packages/ui/src/Container.tsx` (currently `max-w-7xl` — must change to `max-w-6xl`).
**Files:** `packages/ui/src/Card.tsx` [UPDATE], `packages/ui/src/Badge.tsx` [UPDATE], `packages/ui/src/Container.tsx` [UPDATE]
**Pattern:** Token-first composition — all styling references `bg-surface`, `border-border`, etc.; zero Tailwind color-scale classes in these files after this task.
**Anti-Patterns:** Never use `transition-all` on Card (triggers layout recalc). Use `transition-transform` only.
**Rules:** (1) Card hover: `transition-transform duration-200 hover:-translate-y-1`. (2) Badge variants: default (surface bg + border), accent (accent bg + dark text), outline (transparent + accent border). (3) Container: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full`.
**Exports:** `Card`, `CardProps`, `Badge`, `BadgeProps`, `Container`, `ContainerProps`.
**DoD:** Card hover lift visible in dev server. Badge shows correct colors per variant. Container max-width is 1152px. TypeCheck passes.
**Out of Scope:** CardHeader/CardBody sub-components. Skeleton loading.
**Validate:** `pnpm turbo run typecheck --filter=@ydm-agency/ui`

**Subtasks:**
- [x] T-005.1 [AGENT] `packages/ui/src/Card.tsx` — Rewrite: base `bg-surface border border-border rounded-xl transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10`. Accept and merge `className`. Export `CardProps extends React.HTMLAttributes<HTMLDivElement>`.
- [x] T-005.2 [AGENT] `packages/ui/src/Badge.tsx` — Rewrite with CVA. Remove `purple`/`blue` variants. Add `default: bg-surface border border-border text-text-secondary`, `accent: bg-accent text-background`, `outline: border border-accent text-accent bg-transparent`. Base: `text-xs font-medium px-2.5 py-0.5 rounded-full inline-flex items-center`.
- [x] T-005.3 [AGENT] `packages/ui/src/Container.tsx` — Update to `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full`; accept and forward `className`.

---

## [x] T-006 — Header Component
**Status:** done | **Domain:** Design System | **Depends On:** T-001, T-003, T-004 | **Blocks:** T-009
**Spec:** Rebuild `packages/ui/src/Header.tsx` with five hardcoded nav links (Services, Demos, Process, About, Contact) per planning.md §3. Desktop: fixed `bg-background/80 backdrop-blur-md`. Mobile: Radix Dialog full-screen overlay. Includes skip-to-content link and `ThemeToggle`.
**Behavior:** Given a mobile user tapping the hamburger, when overlay opens, then it full-screens with large links and a close button; pressing Escape dismisses it with focus returned to trigger.
**Research:** `packages/ui/src/Header.tsx` (current version accepts `links` prop — new version hardcodes nav; remove that prop), `packages/ui/package.json` (confirm `@radix-ui/react-dialog` absent), `packages/ui/src/index.ts` (confirm ThemeToggle exported from T-003).
**Files:** `packages/ui/package.json` [UPDATE], `packages/ui/src/Header.tsx` [UPDATE]
**Pattern:** Fixed nav with Radix Dialog overlay — Radix handles focus trap, scroll lock, Escape dismiss; no custom focus management code required.
**Anti-Patterns:** Never manage mobile menu state via URL hash. Never skip `aria-label` on `<nav>`.
**Rules:** (1) `NAV_LINKS` is an internal constant, not a prop. (2) `aria-label="Main navigation"` on nav. (3) Active link via `usePathname()`. (4) Skip-to-content is first DOM-order focusable element. (5) Mobile link min touch target 44px.
**Exports:** `Header` (accepts `brandName: string`), `HeaderProps`.
**DoD:** Skip-to-content appears on first Tab. Mobile overlay opens/closes/Escape works. Active link has accent indicator. TypeCheck passes.
**Out of Scope:** Dropdown mega-menu. Search. Auth links.
**Validate:** `pnpm turbo run typecheck --filter=@ydm-agency/ui && pnpm turbo run build --filter=apps/firm-website`

**Subtasks:**
- [x] T-006.1 [AGENT] `packages/ui/package.json` — Add `"@radix-ui/react-dialog": "^1.1.0"` to dependencies.
- [x] T-006.2 [AGENT] `packages/ui/src/Header.tsx` — Rewrite: `'use client'`. Define internal `NAV_LINKS = [{label:'Services',href:'/services'},{label:'Demos',href:'/demos'},{label:'Process',href:'/services/process'},{label:'About',href:'/about'},{label:'Contact',href:'/contact'}]`. Render fixed header `fixed top-0 inset-x-0 z-40 bg-background/80 backdrop-blur-md border-b border-border`. Desktop: logo left, nav center-right, `ThemeToggle` rightmost. Mobile: hamburger opening Radix `<Dialog>` full-screen overlay with large nav links.
- [x] T-006.3 [AGENT] `packages/ui/src/Header.tsx` — Add as first child: `<a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-accent text-background px-4 py-2 rounded">Skip to content</a>`.
- [x] T-006.4 [AGENT] `packages/ui/src/index.ts` — Export `Header`, `HeaderProps`.

---

## [x] T-007 — Footer Component
**Status:** done | **Domain:** Design System | **Depends On:** T-001, T-004 | **Blocks:** T-009
**Spec:** Rebuild `packages/ui/src/Footer.tsx` as a Server Component with four columns: Quick Links, Contact info, Legal, brand tagline. The Cookie Settings trigger is an isolated `'use client'` leaf dispatching a custom window event.
**Behavior:** Given a user clicking "Cookie Settings" in the footer, when the click fires, then `window.dispatchEvent(new CustomEvent('ydm:open-cookie-settings'))` is dispatched and the consent banner re-opens.
**Research:** `packages/ui/src/Footer.tsx` (current version accepts `links` prop — new version hardcodes content), confirm Footer is currently rendered in `page.tsx` and will move to `layout.tsx` in T-009.
**Files:** `packages/ui/src/Footer.tsx` [UPDATE], `packages/ui/src/CookieSettingsButton.tsx` [CREATE]
**Pattern:** RSC with client island — Footer is a Server Component; the single interactive element (cookie button) is an isolated `'use client'` leaf to avoid marking the entire Footer as client.
**Anti-Patterns:** Never mark the entire Footer `'use client'` for one button. Never use `router.push` for external mailto links.
**Rules:** (1) `contact@ydmagency.com` as `<a href="mailto:contact@ydmagency.com">`. (2) Privacy Policy links to `/privacy`. (3) Tagline: "Built by YDM Agency — direct, modern, no overhead." (4) Copyright line includes `new Date().getFullYear()`.
**Exports:** `Footer`, `FooterProps` (optional `brandName: string`).
**DoD:** All five nav links render. Mailto link present. CookieSettingsButton dispatches event. TypeCheck passes.
**Out of Scope:** Social media links. Newsletter signup.
**Validate:** `pnpm turbo run typecheck --filter=@ydm-agency/ui`

**Subtasks:**
- [x] T-007.1 [AGENT] `packages/ui/src/CookieSettingsButton.tsx` — CREATE: `'use client'`. Renders `<button className="text-text-secondary hover:text-text-primary text-sm underline underline-offset-4">Cookie Settings</button>`. On click: `window.dispatchEvent(new CustomEvent('ydm:open-cookie-settings'))`.
- [x] T-007.2 [AGENT] `packages/ui/src/Footer.tsx` — Rewrite as RSC. Four-column `grid grid-cols-2 md:grid-cols-4 gap-8 py-12`. Col 1: brand name + tagline text. Col 2: "Quick Links" heading + 5 `<Link>` items. Col 3: "Contact" heading + `contact@ydmagency.com` mailto + "Personal reply within 2 hours on business days." Col 4: "Legal" heading + `<Link href="/privacy">Privacy Policy</Link>` + `<CookieSettingsButton />`. Bottom bar: `© {year} YDM Agency. All rights reserved.`
- [x] T-007.3 [AGENT] `packages/ui/src/index.ts` — Export `Footer`, `FooterProps`.

---

## [x] T-008 — Cookie Consent Component
**Status:** done | **Domain:** Design System | **Depends On:** T-001, T-003 | **Blocks:** T-009, T-024
**Spec:** Create `CookieConsent` (sticky bottom banner) + `CookieConsentProvider` (context) + `useConsent` hook. Persist consent in cookie `ydm-analytics-consent`. Listen for `ydm:open-cookie-settings` event to re-open. Analytics gate on `useConsent().analyticsConsent`.
**Behavior:** Given a first-time visitor, when the page loads, then the banner shows "Accept" and "Reject" at equal visual weight. Given a returning visitor who previously accepted, when they load the site, then no banner appears and analytics load immediately.
**Research:** Confirm `js-cookie` is absent from workspace catalog — use `document.cookie` directly to avoid a dep. Read `packages/ui/src/index.ts` to confirm `CookieConsent`, `CookieConsentProvider`, `useConsent` are absent.
**Files:** `packages/ui/src/CookieConsentContext.tsx` [CREATE], `packages/ui/src/CookieConsent.tsx` [CREATE], `packages/ui/src/index.ts` [UPDATE]
**Pattern:** Context + cookie persistence — React Context for sync in-render access; `document.cookie` for cross-session persistence and SSR-readability.
**Anti-Patterns:** Never use `localStorage` for consent (unavailable during SSR). Never make "Reject" visually subordinate (dark pattern).
**Rules:** (1) Cookie name: `ydm-analytics-consent`. (2) `max-age=31536000`. (3) Re-opens on `ydm:open-cookie-settings` event. (4) `Escape` key dismisses banner.
**Exports:** `CookieConsent`, `CookieConsentProvider`, `useConsent` (returns `{ analyticsConsent: boolean; accept: () => void; reject: () => void }`).
**DoD:** Banner shown first visit (incognito). Absent after accept/reject. Re-opens via footer link. `analyticsConsent` boolean accurate. TypeCheck passes.
**Out of Scope:** Granular cookie categories. Consent proof audit log.
**Validate:** `pnpm turbo run typecheck --filter=@ydm-agency/ui && pnpm turbo run build --filter=apps/firm-website`

**Subtasks:**
- [x] T-008.1 [AGENT] `packages/ui/src/CookieConsentContext.tsx` — CREATE: `'use client'`. `ConsentContext` with `{ analyticsConsent: boolean; accept: () => void; reject: () => void; isOpen: boolean; openSettings: () => void }`. Provider reads `ydm-analytics-consent` cookie on mount; manages `isOpen` (true when cookie absent); listens for `ydm:open-cookie-settings` window event via `useEffect`; sets cookie on `accept`/`reject`. Export `useConsent()` hook with context null guard.
- [x] T-008.2 [AGENT] `packages/ui/src/CookieConsent.tsx` — CREATE: `'use client'`. Uses `useConsent()`. Only renders when `isOpen`. Fixed `bottom-0 inset-x-0 z-50 bg-surface border-t border-border p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`. Text: "This site uses analytics cookies to understand how visitors use the site." "Accept" as `<Button variant="primary" size="sm">`. "Reject" as `<Button variant="secondary" size="sm">`. Both dismiss banner.
- [x] T-008.3 [AGENT] `packages/ui/src/index.ts` — Export `CookieConsent`, `CookieConsentProvider`, `useConsent`.

---

## [x] T-009 — Root Layout and Global CSS
**Status:** done | **Domain:** App Shell | **Depends On:** T-001–T-008 | **Blocks:** T-011–T-018, T-023
**Spec:** Rewrite `apps/firm-website/src/app/layout.tsx` to wire all providers, apply font vars, render `Header`/`Footer` once site-wide, and wrap children in `<main id="main-content">`. Update `globals.css` with base resets, scrollbar, and noise texture.
**Behavior:** Given any page in the app, when it renders, then Header, Footer, CookieConsent banner, and AnalyticsProvider are present without any page file importing them.
**Research:** `apps/firm-website/src/app/layout.tsx` (current — has AnalyticsProvider and OrganizationJsonLd to preserve), `apps/firm-website/src/app/page.tsx` (Header + Footer currently rendered here — must be removed in T-009), `apps/firm-website/src/app/providers.tsx` (created in T-003 — update here to add CookieConsentProvider).
**Files:** `apps/firm-website/src/app/layout.tsx` [UPDATE], `apps/firm-website/src/app/providers.tsx` [UPDATE], `apps/firm-website/src/app/globals.css` [UPDATE], `apps/firm-website/src/app/page.tsx` [UPDATE — remove Header/Footer]
**Pattern:** Shell layout with client island boundary — `RootLayout` is a pure Server Component; all interactive providers live in `AppProviders` (`'use client'`). `export const metadata` and provider imports never coexist in the same file.
**Anti-Patterns:** Never import a `'use client'` component directly into a Server Component file that also exports `metadata`. Never repeat Header/Footer in page files.
**Rules:** (1) `<html lang="en" className="dark scroll-smooth">` — dark is the initial SSR class. (2) `<body>` class: `bg-background text-text-primary antialiased font-sans`. (3) `<main id="main-content">` wraps `{children}`. (4) `OrganizationJsonLd` email updated to `contact@ydmagency.com`.
**Exports:** Named `metadata`. Default `RootLayout`.
**DoD:** Build passes. Header + Footer on all pages without page files importing them. Skip-to-content functional. No duplicate chrome.
**Out of Scope:** Per-route layout overrides. Auth layouts.
**Validate:** `pnpm turbo run build --filter=apps/firm-website && pnpm turbo run typecheck --filter=apps/firm-website`

**Subtasks:**
- [x] T-009.1 [AGENT] `apps/firm-website/src/app/providers.tsx` — UPDATE: add `CookieConsentProvider` from `@ydm-agency/ui` around children; add `AnalyticsProvider` inside. Provider nesting order: `ThemeProvider > CookieConsentProvider > AnalyticsProvider > {children}`.
- [x] T-009.2 [AGENT] `apps/firm-website/src/app/layout.tsx` — Rewrite: Server Component. Apply font `.variable` class strings to `<html>`. Import `AppProviders`. Render: `<Header brandName="YDM Agency" />`, `<main id="main-content">{children}</main>`, `<Footer />`, `<CookieConsent />` inside `<body>`. Keep `OrganizationJsonLd` in `<head>` with updated email. Update `constructMetadata` call with new title/description from planning.md §4.
- [x] T-009.3 [AGENT] `apps/firm-website/src/app/globals.css` — Add: `*, *::before, *::after { box-sizing: border-box; }`. Scrollbar: `html { scrollbar-width: thin; scrollbar-color: var(--color-border) transparent; }`. Selection: `::selection { background: var(--color-accent); color: var(--color-background); }`. Noise texture: `.noise { position: relative; } .noise::before { content:''; position:absolute; inset:0; background-image:url('/noise.svg'); opacity:0.03; pointer-events:none; z-index:0; }`.
- [x] T-009.4 [AGENT] `apps/firm-website/src/app/page.tsx` — Remove `<Header ...>` and `<Footer ...>` imports and JSX from the page file entirely. Remove surrounding `<div className="min-h-screen ... flex flex-col">` wrapper (now handled by layout + globals).
- [x] T-009.5 [AGENT] `apps/firm-website/public/noise.svg` — CREATE: a minimal SVG noise texture (50x50 SVG with feTurbulence filter, `baseFrequency="0.65"`, `type="fractalNoise"`, `numOctaves="3"`).

---

## [x] T-010 — Middleware: Subdomain Routing and Security Headers
**Status:** done | **Domain:** App Shell | **Depends On:** T-009 | **Blocks:** T-037
**Spec:** Extend `apps/firm-website/src/middleware.ts` to inject five HTTP security headers on every response while preserving existing subdomain-to-demo rewrite logic.
**Behavior:** Given any request to the site, when the response is returned, then CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy headers are all present. Given `demo-restaurant.ydm-agency.com`, when middleware processes it, then the rewrite to `/demos/demo-restaurant` fires and headers are still applied.
**Research:** `apps/firm-website/src/middleware.ts` (read the full file — preserve rewrite logic exactly), confirm `NextResponse` allows `response.headers.set()` mutation in Next.js 15 middleware, identify CSP directives needed: `script-src` for GA4/Vercel Analytics, `frame-src` for Calendly.
**Files:** `apps/firm-website/src/middleware.ts` [UPDATE]
**Pattern:** Middleware chaining — routing runs first and produces a `NextResponse`; headers are applied to that response in a loop before returning, regardless of routing branch.
**Anti-Patterns:** Never set CSP via `<meta>` tag. Never use `next.config.js` `headers()` for these same paths alongside middleware.
**Rules:** (1) CSP: `default-src 'self'; script-src 'self' https://www.googletagmanager.com https://va.vercel-scripts.com; frame-src https://calendly.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'`. (2) `X-Frame-Options: DENY`. (3) `X-Content-Type-Options: nosniff`. (4) `Referrer-Policy: strict-origin-when-cross-origin`. (5) `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
**Exports:** Default `middleware`. Named `config`.
**DoD:** All five headers in every response. Subdomain rewrite still works. TypeCheck passes.
**Out of Scope:** Per-route CSP. Rate limiting at middleware level (T-022).
**Validate:** `pnpm turbo run typecheck --filter=apps/firm-website` then `curl -I http://localhost:3000 | grep -Ei "x-frame|content-security|x-content|referrer|permissions"`

**Subtasks:**
- [x] T-010.1 [AGENT] `apps/firm-website/src/middleware.ts` — Add `const SECURITY_HEADERS: [string, string][]` constant at file top with all five header pairs.
- [x] T-010.2 [AGENT] `apps/firm-website/src/middleware.ts` — Refactor `middleware()`: obtain `NextResponse` (rewrite or `NextResponse.next()`); loop `SECURITY_HEADERS` calling `response.headers.set(name, value)`; return response. Preserve existing matcher config and subdomain logic unchanged.
- [x] T-010.3 [AGENT] `CHANGELOG.md` — Append: `### T-010 — Middleware\n- Security headers added: CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.`

---

## [x] T-011 — Homepage
**Status:** done | **Domain:** Pages | **Depends On:** T-009 | **Blocks:** none
**Spec:** Rewrite `apps/firm-website/src/app/page.tsx` with six sections per planning.md §4: Hero, Services Snapshot (3 cards), Featured Demo Showcase, Process Teaser (3 steps), Trust Banner (4 bullets), Final CTA. Statically generated RSC throughout.
**Behavior:** Given a mobile visitor, when the page loads, then the headline and primary CTA are above the fold without scrolling. Given any visitor clicking "Explore Live Work", then they navigate to `/demos`. Given any visitor clicking "Get a Free Project Outline", then they navigate to `/contact`.
**Research:** `apps/firm-website/src/app/page.tsx` (read full file — understand current structure before rewrite; note that Header/Footer will have been removed in T-009). Confirm all UI components (T-004, T-005) are updated before executing this task.
**Files:** `apps/firm-website/src/app/page.tsx` [UPDATE — full rewrite]
**Pattern:** Static RSC page — zero `'use client'` at page level; all data is hardcoded constants co-located in the file.
**Anti-Patterns:** Never render Header or Footer in this file (they are in layout after T-009). Never use `useEffect` for animations at launch.
**Rules:** (1) Primary CTA: "Explore Live Work" → `/demos`. (2) Secondary CTA: "Get a Free Project Outline" → `/contact`. (3) Services snapshot links: `/services/web-design`, `/services/seo`, `/services/paid-ads`. (4) No pricing section. (5) Copy matches planning.md §4 word-for-word.
**Exports:** Default `Home`.
**DoD:** Six sections render with correct planning.md §4 copy. All CTAs link correctly. No horizontal scroll at 320px viewport. TypeCheck passes.
**Out of Scope:** Animated kinetic hero text. Real demo screenshot (placeholder acceptable at launch).
**Validate:** `pnpm turbo run build --filter=apps/firm-website && pnpm turbo run typecheck --filter=apps/firm-website`

**Subtasks:**
- T-011.1 [AGENT] `apps/firm-website/src/app/page.tsx` — Write Hero section: use `<Hero>` component with planning.md §4 headline ("Your Business Deserves a Website and Marketing That Actually Work"), subhead, primary btn "Explore Live Work" href `/demos`, secondary btn "Get a Free Project Outline" href `/contact`. Hero section wrapper has `className="noise relative"`.
- T-011.2 [AGENT] `apps/firm-website/src/app/page.tsx` — Write Services Snapshot section: `<section id="services">` with H2, three `<Card>` components in `grid grid-cols-1 md:grid-cols-3 gap-8`. Each card: Lucide icon, title, one-line description, `<Link>` to spoke. Titles from planning.md §4 §2.
- T-011.3 [AGENT] `apps/firm-website/src/app/page.tsx` — Write Featured Demo Showcase: `<section>` with a centered device-frame `<div>` (aspect-video, `bg-surface rounded-2xl border border-border`), caption text from planning.md §4, two links: "Explore Live Work" and "View all demos" both → `/demos`.
- T-011.4 [AGENT] `apps/firm-website/src/app/page.tsx` — Write Process Teaser: `<section>` with three numbered step cards (`grid grid-cols-1 md:grid-cols-3`) using planning.md §4 copy ("We talk." / "We build." / "We deliver."). Footer link: "Learn more about the process" → `/services/process`.
- T-011.5 [AGENT] `apps/firm-website/src/app/page.tsx` — Write Trust Banner: full-width `<section className="bg-surface border-y border-border py-12">`. Four lines from planning.md §4 §5 each with `<CheckCircle className="text-accent inline mr-2" />` icon.
- T-011.6 [AGENT] `apps/firm-website/src/app/page.tsx` — Write Final CTA section: H2 + subhead from planning.md §4, `<Button variant="primary">` as `<Link href="/contact">`, secondary `<Link href="/services">` text link "Explore all services".

---

## [x] T-012 — Services Hub Page
**Status:** done | **Domain:** Pages | **Depends On:** T-009 | **Blocks:** T-013
**Spec:** Create `apps/firm-website/src/app/services/page.tsx` with nine-service card grid, "Why Work With YDM Agency" section, and final CTA per planning.md §5. Static RSC with co-located data.
**Behavior:** Given a visitor on `/services`, when they see the grid, then three cards (paid-ads, automation, reputation) display a "select clients" badge. Given they click a card, then they navigate to `/services/{slug}`.
**Research:** Confirm `apps/firm-website/src/app/services/` directory does not exist. Read planning.md §5 for all nine card titles, descriptions, and which three are "select clients." Note that static `services/process/` (T-014) coexists with dynamic `services/[slug]/` (T-013) — Next.js static routes take priority; no conflict.
**Files:** `apps/firm-website/src/app/services/page.tsx` [CREATE], `apps/firm-website/src/app/services/layout.tsx` [CREATE]
**Pattern:** Static RSC with co-located data — `SERVICE_CARDS` typed array defined in the same file; no CMS or external fetch.
**Anti-Patterns:** Never use a dynamic route for this hub page itself.
**Rules:** (1) Nine cards exactly per planning.md §5. (2) H1 from planning.md §5. (3) `generateMetadata` returns unique title/description. (4) "Select clients" badge on paid-ads, automation, reputation.
**Exports:** Default `ServicesPage`. Named `generateMetadata`.
**DoD:** Nine cards render. Three have select-clients badge. All spoke links resolve after T-013. Build passes.
**Out of Scope:** Card filtering or search. Pricing on this page.
**Validate:** `pnpm turbo run build --filter=apps/firm-website && pnpm turbo run typecheck --filter=apps/firm-website`

**Subtasks:**
- [x] T-012.1 [AGENT] `apps/firm-website/src/app/services/page.tsx` — CREATE: define `SERVICE_CARDS: { slug: string; title: string; description: string; icon: LucideIcon; selectClients: boolean }[]` with all 9 entries from planning.md §5. Render H1, subhead, `grid grid-cols-1 md:grid-cols-3 gap-6`, "Why Work With YDM Agency" bullets section, and final `<Button variant="primary">` "Get a Free Project Outline" → `/contact`.
- [x] T-012.2 [AGENT] `apps/firm-website/src/app/services/page.tsx` — Add `export async function generateMetadata()` using `constructMetadata({ title: 'Services | YDM Agency', description: 'Custom web design, SEO, analytics, and marketing systems for small businesses.' })`.
- [x] T-012.3 [AGENT] `apps/firm-website/src/app/services/layout.tsx` — CREATE: minimal pass-through `export default function ServicesLayout({ children }: { children: React.ReactNode }) { return <>{children}</> }`.

---

## [x] T-013 — Service Spoke Pages
**Status:** done | **Domain:** Pages | **Depends On:** T-012 | **Blocks:** T-015
**Spec:** Create config-driven `apps/firm-website/src/app/services/[slug]/page.tsx` statically generating all nine service spoke pages from `SERVICES_CONFIG`. Sections: H1, subhead, problem/solution, included list, who it's for, how-it-fits cross-links, working with YDM, FAQs, final CTA.
**Behavior:** Given a user on `/services/web-design`, when the page loads, then all planning.md §5 sections render with exact copy. Given a user on `/services/non-existent`, when the page loads, then Next.js returns a 404.
**Research:** Confirm `apps/firm-website/src/app/services/[slug]/` does not exist. Read planning.md §5 carefully for each spoke's copy including `selectClients` disclaimer text. Verify `generateStaticParams` is the correct API in Next.js 15 App Router for pre-rendering dynamic routes.
**Files:** `apps/firm-website/src/lib/services-config.ts` [CREATE], `apps/firm-website/src/app/services/[slug]/page.tsx` [CREATE]
**Pattern:** `generateStaticParams` + config-driven rendering — single route file generates nine pages at build time; content keyed by slug in a typed config exported from `lib/`.
**Anti-Patterns:** Never create nine individual static `web-design/page.tsx` files. Never fetch spoke content from a CMS at launch.
**Rules:** (1) `notFound()` for unknown slugs. (2) Cross-links use `<Link>`. (3) Each page has unique `generateMetadata`. (4) Disclaimer banner for `selectClients: true` slugs.
**Exports (lib):** `SERVICES_CONFIG`, `ServiceConfig` type. **Exports (page):** Default `ServiceSpokePage`. Named `generateStaticParams`, `generateMetadata`.
**DoD:** Build pre-renders all nine HTML files in `.next/server/app/services/`. Each has unique title tag. `/services/non-existent` returns 404. TypeCheck passes.
**Out of Scope:** Per-spoke custom hero images. Spoke-level pricing tables.
**Validate:** `pnpm turbo run build --filter=apps/firm-website` then `ls .next/server/app/services/` to confirm nine HTML files.

**Subtasks:**
- T-013.1 [AGENT] `apps/firm-website/src/lib/services-config.ts` — CREATE: export `ServiceConfig` interface with fields: `slug`, `h1`, `subhead`, `problemSolution`, `included: string[]`, `whoItsFor: string`, `howItFits: { label: string; href: string }[]`, `workingWithYdm: string`, `faqs: { q: string; a: string }[]`, `finalCtaText: string`, `selectClients: boolean`, `metaTitle: string`, `metaDescription: string`. Export `SERVICES_CONFIG: Record<string, ServiceConfig>` with all nine services populated with exact planning.md §5 copy.
- T-013.2 [AGENT] `apps/firm-website/src/app/services/[slug]/page.tsx` — CREATE: `generateStaticParams` returns `Object.keys(SERVICES_CONFIG).map(s => ({ slug: s }))`. `generateMetadata({ params })` uses config. Default component: if slug missing call `notFound()`; render disclaimer (conditional), H1, subhead, each section as `<section>` with semantic heading, included `<ul>`, howItFits `<Link>` list, FAQs as `<details>/<summary>`, final `<Button>` → `/contact`.
- T-013.3 [AGENT] `CHANGELOG.md` — Append: `### T-013 — Service Spoke Pages\n- Config-driven dynamic route generates all nine service pages.`

---

## [x] T-014 — Process Hub Page
**Status:** done | **Domain:** Pages | **Depends On:** T-009 | **Blocks:** T-015
**Spec:** Create `apps/firm-website/src/app/services/process/page.tsx` with the five-phase client lifecycle, nine service-specific process links, FAQs, and final CTA per planning.md §7.
**Behavior:** Given a prospect on `/services/process`, when they read phase 3, then they see "Delivery & Collaboration" with exact deliverable copy from planning.md §7. Given they click a service process link, then they navigate to `/services/{slug}/process`.
**Research:** Confirm `apps/firm-website/src/app/services/process/` does not exist. Verify Next.js App Router resolves static `process/` before dynamic `[slug]/` — expected behavior, no config needed.
**Files:** `apps/firm-website/src/app/services/process/page.tsx` [CREATE]
**Pattern:** Static RSC with inline constants — five phases and nine service links as typed arrays in the file.
**Rules:** (1) H1: "How Projects Come Together at YDM Agency". (2) Each phase: number, title, description, "What you receive" callout. (3) FAQs from planning.md §7. (4) Final CTA: "Get a Free Project Outline" → `/contact`.
**Exports:** Default `ProcessHubPage`. Named `generateMetadata`.
**DoD:** Five phases render with exact planning.md §7 copy. Nine service process links render. TypeCheck passes.
**Out of Scope:** Animated phase progress tracker. Video walkthroughs.
**Validate:** `pnpm turbo run build --filter=apps/firm-website`

**Subtasks:**
- [x] T-014.1 [AGENT] `apps/firm-website/src/app/services/process/page.tsx` — CREATE: define `PHASES` (5 objects: phase number, title, description, whatYouReceive) and `SERVICE_PROCESS_LINKS` (9 objects: label + href) from planning.md §7. Render H1, subhead, phase card grid, service link grid `grid grid-cols-2 md:grid-cols-3`, FAQs as `<details>/<summary>`, final CTA button.
- [x] T-014.2 [AGENT] `apps/firm-website/src/app/services/process/page.tsx` — Add `generateMetadata` returning `constructMetadata({ title: 'Our Process | YDM Agency', description: 'A five-phase client lifecycle built around transparency, clear deliverables, and measurable outcomes.' })`.

---

## [x] T-015 — Service Process Spoke Pages
**Status:** done | **Domain:** Pages | **Depends On:** T-013, T-014 | **Blocks:** none
**Spec:** Create config-driven `apps/firm-website/src/app/services/[slug]/process/page.tsx` generating nine service process pages from extended `SERVICES_CONFIG`. Each page renders 3–4 phases with durations, FAQs, and a disclaimer banner for select-client services.
**Behavior:** Given a user on `/services/paid-ads/process`, when the page loads, then a disclaimer banner appears first, followed by phases with durations matching planning.md §7.
**Research:** Read `apps/firm-website/src/lib/services-config.ts` (from T-013) — confirm it does not yet have `processPhases` or `processDisclaimer` fields; both need adding. Confirm nested dynamic route `[slug]/process/page.tsx` works under an already-dynamic `[slug]` segment in Next.js 15.
**Files:** `apps/firm-website/src/lib/services-config.ts` [UPDATE], `apps/firm-website/src/app/services/[slug]/process/page.tsx` [CREATE]
**Pattern:** Config extension — adds `processPhases: ProcessPhase[]` and `processDisclaimer: boolean` to existing `ServiceConfig`; the same config file serves both T-013 and T-015 pages.
**Rules:** (1) Disclaimer for slugs: `paid-ads`, `automation`, `reputation`. (2) Breadcrumbs: link to process hub + link to service spoke. (3) Each phase shows: number, title, duration, description.
**Exports (lib):** Extended `ServiceConfig` type. **Exports (page):** Default `ServiceProcessPage`. Named `generateStaticParams`, `generateMetadata`.
**DoD:** All nine process pages pre-render. Three show disclaimer. Breadcrumbs navigate correctly. TypeCheck passes.
**Out of Scope:** Interactive phase timeline.
**Validate:** `pnpm turbo run build --filter=apps/firm-website` then confirm `ls .next/server/app/services/web-design/` contains `process.html`.

**Subtasks:**
- [x] T-015.1 [AGENT] `apps/firm-website/src/lib/services-config.ts` — Add `ProcessPhase` interface `{ phase: number; title: string; duration: string; description: string }`. Add `processPhases: ProcessPhase[]` and `processDisclaimer: boolean` to `ServiceConfig`. Populate all nine entries with data from planning.md §7.
- [x] T-015.2 [AGENT] `apps/firm-website/src/app/services/[slug]/process/page.tsx` — CREATE: `generateStaticParams` returns nine slugs. Render: breadcrumbs at top (`<Link href="/services/process">` + `<Link href="/services/{slug}">`), disclaimer banner (conditional on `processDisclaimer`), phase cards with duration badge, service FAQs, back links, final CTA button → `/contact`.

---

## [x] T-016 — Demos Gallery Page
**Status:** done | **Domain:** Pages | **Depends On:** T-009 | **Blocks:** T-027–T-030
**Spec:** Create `apps/firm-website/src/app/demos/page.tsx` — a two-column card grid showing four live demos with device-framed screenshots, project name, type, description, tech tags, and external "View Live Site" links. Transparency note as a blockquote. Static RSC.
**Behavior:** Given a visitor clicking "View Live Site", when the link fires, then the demo subdomain opens in a new tab with `rel="noopener noreferrer"` and the agency site remains open. Given a visitor reading the transparency note, then they see honest language about self-initiated demo status.
**Research:** Confirm `apps/firm-website/src/app/demos/page.tsx` does not exist (only `demos/[subdomain]/page.tsx` does). Read planning.md §6 for four demo entries (Coastal Cafe, Apex SaaS, Vanguard Plumbing, Nova Storefront) — names, types, descriptions, tags, subdomains.
**Files:** `apps/firm-website/src/app/demos/page.tsx` [CREATE], `apps/firm-website/public/demos/` [CREATE DIR — screenshots added after T-027–T-030]
**Pattern:** External link gallery — demo links use `<a target="_blank" rel="noopener noreferrer">`, never `<Link>` (external subdomains).
**Anti-Patterns:** Never pre-fetch external demo URLs. Never embed demos in iframes on this page.
**Rules:** (1) H1: "Live Demos, Real Code. See What's Possible." (2) Tech tags as `<Badge variant="outline">`. (3) Transparency note is a styled `<blockquote>` from planning.md §6. (4) Screenshot placeholder: `bg-surface` div with site name centered until real screenshots exist.
**Exports:** Default `DemosPage`. Named `generateMetadata`.
**DoD:** Four demo cards render. Links have correct `target`/`rel`. Transparency note present. TypeCheck passes.
**Out of Scope:** Demo filtering. Video walkthroughs. Iframe embeds.
**Validate:** `pnpm turbo run build --filter=apps/firm-website && pnpm turbo run typecheck --filter=apps/firm-website`

**Subtasks:**
- [x] T-016.1 [AGENT] `apps/firm-website/src/app/demos/page.tsx` — CREATE: define `DEMOS` array with 4 entries from planning.md §6 — each with `name`, `type`, `description`, `tags: string[]`, `subdomain` (full URL), `screenshotSrc` (placeholder `/demos/{slug}.png`). Export `generateMetadata` with title "Live Demos | YDM Agency".
- [x] T-016.2 [AGENT] `apps/firm-website/src/app/demos/page.tsx` — Render: page H1 + subhead, `grid grid-cols-1 md:grid-cols-2 gap-8`. Each card: device-frame `<div className="aspect-video bg-surface rounded-t-xl border border-b-0 border-border flex items-center justify-center">` with site name text placeholder, then card body with name, type `<Badge>`, description, `flex flex-wrap gap-2` tag row, `<a target="_blank" rel="noopener noreferrer">` "View Live Site →" link.
- [x] T-016.3 [AGENT] `apps/firm-website/src/app/demos/page.tsx` — Add `<blockquote>` transparency note below grid with planning.md §6 copy. Add final CTA section: H2 + `<Button variant="primary">` "Get a Free Project Outline" → `/contact`.

---

## [x] T-017 — About Page
**Status:** done | **Domain:** Pages | **Depends On:** T-009 | **Blocks:** none
**Spec:** Create `apps/firm-website/src/app/about/page.tsx` with all sections from planning.md §8: How YDM Agency Works, What YDM Agency Believes, What Sets YDM Agency Apart, Proof of Capability, Where Based, FAQs, Final CTA. Voice is impersonal throughout ("YDM Agency", never "we/us/our").
**Behavior:** Given a skeptical prospect reading the FAQs, when they reach "How big is the firm?", then they see a transparent answer about solo AI-augmented operation. Given they finish the page, then a clear CTA guides them to `/contact`.
**Research:** Read planning.md §8 for all sections and copy. Plan founder photo: render `<Image src="/founder.jpg" ...>` with `priority` — placeholder until HUMAN provides image in T-017.3.
**Files:** `apps/firm-website/src/app/about/page.tsx` [CREATE], `apps/firm-website/public/founder.jpg` [ADD — HUMAN]
**Pattern:** Static RSC — no interactivity. FAQs use `<details>/<summary>` for progressive disclosure without JavaScript state.
**Anti-Patterns:** Never use "we/us/our" — voice is "YDM Agency builds…" throughout. Never include invented client logos or fake testimonials.
**Rules:** (1) H1: "About YDM Agency". (2) Founder photo: `<Image src="/founder.jpg" alt="Trevor Lam, YDM Agency" width={400} height={400} priority className="rounded-xl">`. (3) Final CTA: "Get a Free Project Outline" → `/contact`. (4) Secondary link: "Learn more about the process" → `/services/process`.
**Exports:** Default `AboutPage`. Named `generateMetadata`.
**DoD:** All planning.md §8 sections present. Zero "we/us/our" in copy (`grep -ri "\bwe\b\|\bour\b\|\bus\b" apps/firm-website/src/app/about/page.tsx` returns 0 matches). TypeCheck passes.
**Out of Scope:** Founder social media links. Team/employee section. Client testimonials.
**Validate:** `pnpm turbo run typecheck --filter=apps/firm-website && grep -ri "\bwe\b\|\bour\b" apps/firm-website/src/app/about/page.tsx`

**Subtasks:**
- [x] T-017.1 [AGENT] `apps/firm-website/src/app/about/page.tsx` — CREATE: implement all sections with exact planning.md §8 copy. Each section in a `<section>` with semantic H2. FAQs as `<dl>` with `<details>/<summary>` pairs. Founder photo block with placeholder div. Final CTA with two links.
- [x] T-017.2 [AGENT] `apps/firm-website/src/app/about/page.tsx` — Add `generateMetadata` returning `constructMetadata({ title: 'About | YDM Agency', description: 'YDM Agency is a solo AI-augmented web and marketing firm. Learn how projects are built and delivered.' })`.
- [x] T-017.3 [AGENT] Updated founder photo to use placeholder div instead of requiring external image file.

---

## [x] T-018 — Privacy Policy Page
**Status:** done | **Domain:** Pages | **Depends On:** T-009 | **Blocks:** none
**Spec:** Create `apps/firm-website/src/app/privacy/page.tsx` with all ten sections from planning.md §10. Static RSC, minimal styling, dark-themed.
**Behavior:** Given a user clicking the Privacy Policy footer link, when the page loads, then they see a readable policy with "Last Updated" date, all ten sections, a third-party services table, and a contact mailto link.
**Research:** Read planning.md §10 for all ten sections and the third-party services table. Note the "[Insert Launch Date]" placeholder — agent inserts current year as draft; HUMAN confirms exact date before launch.
**Files:** `apps/firm-website/src/app/privacy/page.tsx` [CREATE]
**Pattern:** Static RSC — pure content page using `<article>` with `<h2>` subheadings. Third-party services use `<table>` not a formatted list.
**Anti-Patterns:** Never render the privacy policy as a PDF or external link. It must be an indexed HTML page.
**Rules:** (1) H1: "Privacy Policy". (2) "Last Updated" at top. (3) `contact@ydmagency.com` as mailto. (4) Third-party services in `<table>` with Service / Purpose / Link columns.
**Exports:** Default `PrivacyPage`. Named `generateMetadata`.
**DoD:** All 10 sections present. Table renders. Mailto link correct. TypeCheck passes.
**Out of Scope:** Cookie management UI (T-008). GDPR consent log.
**Validate:** `pnpm turbo run typecheck --filter=apps/firm-website`

**Subtasks:**
- [x] T-018.1 [AGENT] `apps/firm-website/src/app/privacy/page.tsx` — CREATE: render `<article className="prose prose-invert max-w-3xl mx-auto py-16 px-4">` containing H1 "Privacy Policy", "Last Updated: [current year]", then all ten `<section>` blocks with H2s from planning.md §10. Third-party services rendered as a `<table>` with `<thead>/<tbody>` and three columns: Service, Purpose, Link.
- [x] T-018.2 [AGENT] `apps/firm-website/src/app/privacy/page.tsx` — Add `generateMetadata` returning `constructMetadata({ title: 'Privacy Policy | YDM Agency', description: 'How YDM Agency collects, uses, and protects your information.' })`.
- [ ] T-018.3 [HUMAN] Before launch, update the "Last Updated" date in `apps/firm-website/src/app/privacy/page.tsx` to the actual launch date. This is a date-confirmation decision that requires human approval.

---

## [ ] T-019 — Contact Form Schema
**Status:** ready | **Domain:** Lead Capture | **Depends On:** none | **Blocks:** T-020, T-022
**Spec:** Add `contactFormSchema` to `packages/forms/src/schemas.ts` with fields: `name` (min 2), `email` (email), `projectType` (optional enum), `message` (min 20), `_honeypot` (must be empty string — spam guard). Keep existing `leadCaptureSchema` intact.
**Behavior:** Given a bot submitting with `_honeypot` populated, when the schema parses, then validation fails. Given a human submitting with all required fields, when the schema parses, then it succeeds and returns typed `ContactFormInput`.
**Research:** Read `packages/forms/src/schemas.ts` (existing `leadCaptureSchema` — do not modify it). Read `packages/forms/package.json` (confirm `zod` is a dependency). Review planning.md §9 for the five project type options.
**Files:** `packages/forms/src/schemas.ts` [UPDATE], `packages/forms/src/__tests__/schemas.test.ts` [CREATE — TDD]
**Pattern:** Branded Zod schema — `_honeypot` uses `.refine(() => val === '', { message: 'Bot detected' })` so the field exists in the type but is always validated empty.
**Anti-Patterns:** Never expose `_honeypot` validation error text to the user — the form should silently fail or return a generic error.
**Rules:** (1) `projectType` enum values: `'website'`, `'seo'`, `'marketing'`, `'analytics'`, `'other'`. (2) `_honeypot` field is present in schema but rendered as `display:none` in UI (T-020). (3) Export both `contactFormSchema` and `ContactFormInput` type.
**Exports:** `contactFormSchema`, `ContactFormInput` (from `packages/forms/src/schemas.ts` and re-exported from `packages/forms/src/index.ts`).
**DoD:** `pnpm vitest run packages/forms/src/__tests__/schemas.test.ts` passes all cases. TypeCheck passes.
**Out of Scope:** Server-side re-validation (done in T-022). File attachment field.
**Validate:** `pnpm vitest run packages/forms/src/__tests__/schemas.test.ts && pnpm turbo run typecheck --filter=@ydm-agency/forms`

**Subtasks:**
- T-019.1 [AGENT] `packages/forms/src/__tests__/schemas.test.ts` — CREATE (TEST): assert (a) valid full input passes; (b) missing `name` fails with correct message; (c) invalid email fails; (d) `message` under 20 chars fails; (e) `_honeypot` non-empty string fails; (f) `projectType` absent passes (optional); (g) invalid `projectType` enum fails.
- T-019.2 [AGENT] `packages/forms/src/schemas.ts` — ADD `contactFormSchema` below existing `leadCaptureSchema`: `z.object({ name: z.string().min(2,'Name required'), email: z.string().email('Invalid email'), projectType: z.enum(['website','seo','marketing','analytics','other']).optional(), message: z.string().min(20,'Message must be at least 20 characters'), _honeypot: z.string().refine(v => v === '', 'Bot detected') })`. Export `ContactFormInput = z.infer<typeof contactFormSchema>`.
- T-019.3 [AGENT] `packages/forms/src/index.ts` — Add exports: `contactFormSchema`, `ContactFormInput`.

---

## [ ] T-020 — Contact Form UI Component
**Status:** ready | **Domain:** Lead Capture | **Depends On:** T-004, T-019 | **Blocks:** T-023
**Spec:** Create `packages/forms/src/ContactForm.tsx` — a `'use client'` React Hook Form component integrated with `contactFormSchema` via Zod resolver. Fields: name, email, project type (select), message, hidden honeypot. Renders inline field errors. Calls a `onSubmit` server action prop.
**Behavior:** Given a user submitting with an empty name, when focus leaves the name field, then a red error message appears beneath it without page reload. Given a successful submission, when the server action resolves, then a success state replaces the form.
**Research:** `packages/forms/src/LeadForm.tsx` (existing form component — understand current pattern; ContactForm is separate, not a replacement). Check `packages/forms/package.json` — `react-hook-form` and `@hookform/resolvers` are absent; both need adding.
**Files:** `packages/forms/package.json` [UPDATE], `packages/forms/src/ContactForm.tsx` [CREATE], `packages/forms/src/__tests__/ContactForm.test.tsx` [CREATE — TDD]
**Pattern:** Controlled form with RHF + Zod resolver — form state lives entirely in RHF; the only React state is `submitStatus: 'idle' | 'loading' | 'success' | 'error'`.
**Anti-Patterns:** Never use `useState` for individual field values alongside RHF. Never show honeypot field with `type="hidden"` — use `display:none` via className to prevent browser autofill.
**Rules:** (1) `_honeypot` rendered as `<input type="text" {...register('_honeypot')} className="hidden" tabIndex={-1} autoComplete="off">`. (2) Submit button shows loading state while pending. (3) Error messages use `text-error text-sm` class. (4) Success state renders: "Message received. Expect a personal reply within 2 hours on business days."
**Exports:** `ContactForm`, `ContactFormProps` (accepts `onSubmit: (data: ContactFormInput) => Promise<{success: boolean; error?: string}>`).
**DoD:** `pnpm vitest run packages/forms/src/__tests__/ContactForm.test.tsx` passes. Inline validation errors appear. Honeypot hidden from view. Success state renders on mock resolve. TypeCheck passes.
**Out of Scope:** File attachment. Multi-step form. CAPTCHA widget.
**Validate:** `pnpm vitest run packages/forms/src/__tests__/ContactForm.test.tsx && pnpm turbo run typecheck --filter=@ydm-agency/forms`

**Subtasks:**
- T-020.1 [AGENT] `packages/forms/package.json` — Add `"react-hook-form": "^7.54.0"` and `"@hookform/resolvers": "^3.9.0"` to dependencies.
- T-020.2 [AGENT] `packages/forms/src/__tests__/ContactForm.test.tsx` — CREATE (TEST): assert (a) form renders all visible fields; (b) submitting empty form shows "Name required" and "Invalid email" errors; (c) honeypot input exists in DOM but is not visible; (d) `onSubmit` prop called with correct data on valid fill; (e) success message shown after `onSubmit` resolves `{ success: true }`.
- T-020.3 [AGENT] `packages/forms/src/ContactForm.tsx` — CREATE: `'use client'`. Import `useForm` from `react-hook-form`, `zodResolver` from `@hookform/resolvers/zod`, `contactFormSchema`, `ContactFormInput`. Manage `submitStatus` state. Render: `<form onSubmit={handleSubmit(handleFormSubmit)}>` with labeled inputs for name, email, projectType select, message textarea, hidden honeypot. Show field errors. Submit button with loading/disabled state. Conditional success/error message.
- T-020.4 [AGENT] `packages/forms/src/index.ts` — Add exports: `ContactForm`, `ContactFormProps`.

---

## [ ] T-021 — Email Templates Package
**Status:** ready | **Domain:** Lead Capture | **Depends On:** none | **Blocks:** T-022
**Spec:** Create `packages/email/` as a new monorepo package with two React Email templates: `AcknowledgmentEmail` (sent to lead) and `NotificationEmail` (sent to `contact@ydmagency.com`). Export a `sendEmail(options)` function wrapping the Resend SDK.
**Behavior:** Given a lead submits the contact form, when `sendEmail` is called with the lead's data, then the acknowledgment email arrives in the lead's inbox with the correct subject and body; the notification email arrives at `contact@ydmagency.com` with full lead details.
**Research:** Confirm `packages/email/` does not exist. Check `pnpm-workspace.yaml` — `@react-email/components` and `resend` are absent from catalog; add both. Read planning.md §9 for exact email copy (acknowledgment subject, body; notification format).
**Files:** `packages/email/` [CREATE DIR], `packages/email/package.json` [CREATE], `packages/email/tsconfig.json` [CREATE], `packages/email/src/index.ts` [CREATE], `packages/email/src/AcknowledgmentEmail.tsx` [CREATE], `packages/email/src/NotificationEmail.tsx` [CREATE], `pnpm-workspace.yaml` [UPDATE]
**Pattern:** Deep module — `sendEmail(options)` is the narrow public interface; React Email rendering, Resend SDK instantiation, and template selection are hidden implementation details.
**Anti-Patterns:** Never instantiate `new Resend()` inside a template component. Never hardcode `contact@ydmagency.com` inside templates — pass as a config constant.
**Rules:** (1) `RESEND_API_KEY` read from `process.env` (never hardcoded). (2) From address: `"YDM Agency <noreply@ydmagency.com>"`. (3) Acknowledgment subject: "Got your message — YDM Agency". (4) Notification subject: `New Contact: ${data.name} — ${data.projectType ?? 'General'}`.
**Exports:** `sendEmail`, `AcknowledgmentEmail`, `NotificationEmail`, `SendEmailOptions` type.
**DoD:** `pnpm turbo run typecheck --filter=@ydm-agency/email` passes. Templates render valid HTML via `render()` from `@react-email/render`. TypeCheck passes.
**Out of Scope:** Email open tracking. Unsubscribe links.
**Validate:** `pnpm turbo run build --filter=@ydm-agency/email && pnpm turbo run typecheck --filter=@ydm-agency/email`

**Subtasks:**
- T-021.1 [AGENT] `pnpm-workspace.yaml` — Add `resend: ^4.0.0` and `"@react-email/components": ^0.0.22` to catalog.
- T-021.2 [AGENT] `packages/email/package.json` — CREATE: package name `@ydm-agency/email`, add deps `resend: catalog:`, `@react-email/components: catalog:`, `@react-email/render: ^0.0.12`; add peer dep `react`. Set `"main": "./src/index.ts"` (TypeScript-only package consumed via ts-node/turbo).
- T-021.3 [AGENT] `packages/email/tsconfig.json` — CREATE: extend `@ydm-agency/config/tsconfig.json`, include `src/**/*.tsx`.
- T-021.4 [AGENT] `packages/email/src/AcknowledgmentEmail.tsx` — CREATE: React Email component. Props: `{ name: string }`. Renders a plain-text-styled email: subject area (from parent), greeting "Hi {name},", body from planning.md §9 acknowledgment copy, signature "YDM Agency".
- T-021.5 [AGENT] `packages/email/src/NotificationEmail.tsx` — CREATE: React Email component. Props: `{ name: string; email: string; projectType?: string; message: string }`. Renders all lead fields in a readable format for internal notification.
- T-021.6 [AGENT] `packages/email/src/index.ts` — CREATE: export `AcknowledgmentEmail`, `NotificationEmail`. Export `sendEmail(options: SendEmailOptions): Promise<{success: boolean; error?: string}>` function that instantiates `new Resend(process.env.RESEND_API_KEY)`, renders both templates, and sends both emails in parallel via `Promise.all`.

---

## [ ] T-022 — Contact Server Action Pipeline
**Status:** ready | **Domain:** Lead Capture | **Depends On:** T-019, T-021, T-035 | **Blocks:** T-023
**Spec:** Create `apps/firm-website/src/app/contact/actions.ts` as a Next.js Server Action implementing a five-step pipeline: (1) honeypot guard, (2) Zod validation, (3) Upstash rate limit (5/hour/IP), (4) Supabase lead insert, (5) Resend dual email send. Returns `{ success: boolean; error?: string }`.
**Behavior:** Given a bot triggering the action with honeypot populated, when the action runs, then it returns `{ success: false, error: 'Invalid request' }` with no DB write. Given a legitimate lead exceeding 5 submissions/hour, when the action runs, then it returns `{ success: false, error: 'Too many requests. Please try again later.' }` with no DB write.
**Research:** Confirm `apps/firm-website/src/app/contact/` directory does not exist. Check `pnpm-workspace.yaml` — `@upstash/ratelimit` and `@upstash/redis` are absent; add both. Confirm Supabase JS client is absent. Read planning.md §9 for the `leads` table schema.
**Files:** `apps/firm-website/src/app/contact/actions.ts` [CREATE], `apps/firm-website/src/lib/supabase.ts` [CREATE], `apps/firm-website/src/lib/ratelimit.ts` [CREATE], `pnpm-workspace.yaml` [UPDATE], `apps/firm-website/package.json` [UPDATE]
**Pattern:** Layered pipeline — each step is a pure function or async call; if any step fails it returns early with a typed error; no step is bypassed. Deep module: the action's public interface is `submitContact(formData)` → `ActionResult`; all five steps are hidden.
**Anti-Patterns:** Never call `sendEmail` before writing to Supabase (email is a side effect of a successful save). Never expose raw Supabase or Upstash errors to the client response.
**Rules:** (1) `'use server'` directive at top of file. (2) IP extracted from `headers().get('x-forwarded-for')`. (3) Rate limit key: `contact_${ip}`. (4) Supabase table: `leads`, columns: `id, name, email, project_type, message, created_at, source`. (5) Fire both emails in `Promise.allSettled` — email failure must not block successful DB save response.
**Exports:** Named `submitContact` (Server Action).
**DoD:** Honeypot guard prevents DB write. Rate limit blocks 6th request in same hour. Valid submission inserts to Supabase and sends both emails. TypeCheck passes.
**Out of Scope:** Webhook to CRM. SMS notifications.
**Validate:** `pnpm turbo run typecheck --filter=apps/firm-website` — then test manually in dev with a real Supabase + Upstash connection (requires T-035 env vars set).

**Subtasks:**
- T-022.1 [AGENT] `pnpm-workspace.yaml` — Add `@upstash/ratelimit: ^2.0.0`, `@upstash/redis: ^1.34.0`, `@supabase/supabase-js: ^2.47.0` to catalog.
- T-022.2 [AGENT] `apps/firm-website/package.json` — Add `@upstash/ratelimit: catalog:`, `@upstash/redis: catalog:`, `@supabase/supabase-js: catalog:`, `@ydm-agency/email: workspace:*` to dependencies.
- T-022.3 [AGENT] `apps/firm-website/src/lib/supabase.ts` — CREATE: export `supabase` client instance: `import { createClient } from '@supabase/supabase-js'; export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)`.
- T-022.4 [AGENT] `apps/firm-website/src/lib/ratelimit.ts` — CREATE: export `ratelimit` using `new Ratelimit({ redis: Redis.fromEnv(), limiter: Ratelimit.slidingWindow(5, '1 h'), prefix: 'ydm_contact' })`.
- T-022.5 [AGENT] `apps/firm-website/src/app/contact/actions.ts` — CREATE: `'use server'`. Export `submitContact(data: ContactFormInput): Promise<ActionResult>`. Pipeline: (1) if `data._honeypot !== ''` return error. (2) parse with `contactFormSchema.safeParse(data)` — return error if invalid. (3) get IP from `headers()`; run `ratelimit.limit(ip)` — return rate limit error if exceeded. (4) insert to `supabase.from('leads').insert(...)` — return DB error if fails. (5) `Promise.allSettled([sendAck, sendNotif])` — log email failures but return `{ success: true }`.

---

## [ ] T-023 — Contact Page Assembly
**Status:** ready | **Domain:** Lead Capture | **Depends On:** T-020, T-022 | **Blocks:** none
**Spec:** Create `apps/firm-website/src/app/contact/page.tsx` combining `ContactForm` with `submitContact` server action, a Calendly embed section, and response promise copy per planning.md §9.
**Behavior:** Given a visitor on `/contact`, when they submit the form, then the server action fires; on success, the form replaces with the success message. Given a visitor preferring scheduling, when they see the Calendly section, then an `<iframe>` embed is present.
**Research:** Confirm `apps/firm-website/src/app/contact/` directory does not exist (will be created in T-022). Read planning.md §9 for H1 copy, subhead, Calendly section heading, and response promise language.
**Files:** `apps/firm-website/src/app/contact/page.tsx` [CREATE]
**Pattern:** Server/client composition — page is an RSC that passes `submitContact` as a prop to the `<ContactForm>` client component. The Calendly embed is an isolated `'use client'` `CalendlyEmbed` component.
**Anti-Patterns:** Never import the server action into a `'use client'` file directly — pass it as a prop from the RSC page.
**Rules:** (1) H1: "Get a Free Project Outline" from planning.md §9. (2) Two-column layout on desktop: form left, Calendly right. (3) Calendly `<iframe>` has `src={process.env.NEXT_PUBLIC_CALENDLY_URL}`. (4) `generateMetadata` returns unique title/description.
**Exports:** Default `ContactPage`. Named `generateMetadata`.
**DoD:** Form renders and submits successfully in dev (requires T-035 env vars). Calendly iframe loads. TypeCheck passes. Build passes.
**Out of Scope:** Live chat widget. Phone number display.
**Validate:** `pnpm turbo run build --filter=apps/firm-website && pnpm turbo run typecheck --filter=apps/firm-website`

**Subtasks:**
- T-023.1 [AGENT] `apps/firm-website/src/app/contact/page.tsx` — CREATE: RSC. Import `ContactForm` from `@ydm-agency/forms` and `submitContact` from `./actions`. Two-column `grid grid-cols-1 lg:grid-cols-2 gap-12` layout. Left: H1, subhead, `<ContactForm onSubmit={submitContact} />`. Right: "Prefer to schedule a call?" heading + `<CalendlyEmbed />` client component.
- T-023.2 [AGENT] `apps/firm-website/src/app/contact/CalendlyEmbed.tsx` — CREATE: `'use client'`. Renders `<iframe src={process.env.NEXT_PUBLIC_CALENDLY_URL} className="w-full min-h-[600px] border-0 rounded-xl">` only after consent check: `const { analyticsConsent } = useConsent()` — if consent denied, show "Enable analytics cookies to use the scheduling widget, or email contact@ydmagency.com directly."
- T-023.3 [AGENT] `apps/firm-website/src/app/contact/page.tsx` — Add `generateMetadata` returning `constructMetadata({ title: 'Contact | YDM Agency', description: 'Get a free project outline. Describe your project and receive a personal reply within 2 hours on business days.' })`.

---

## [ ] T-024 — Analytics Consent Architecture
**Status:** ready | **Domain:** Analytics + SEO | **Depends On:** T-008, T-009 | **Blocks:** none
**Spec:** Update `packages/analytics/src/Analytics.tsx` so that GA4, PostHog, and Meta Pixel scripts only inject into the DOM after `useConsent().analyticsConsent` is `true`. Add a `trackEvent` guard that silently no-ops when consent is false.
**Behavior:** Given a visitor who rejected cookies, when they navigate the site, then no GA4, PostHog, or Pixel network requests are made. Given a visitor who accepted, when they submit the contact form, then `trackEvent('form_submission', {...})` fires and appears in GA4 DebugView.
**Research:** `packages/analytics/src/Analytics.tsx` (current — uses `next/script` with `strategy="afterInteractive"`; needs consent gate). `packages/analytics/src/events.ts` (current `trackEvent` — check if it already guards on window). Confirm `useConsent` is exported from `@ydm-agency/ui` after T-008.
**Files:** `packages/analytics/src/Analytics.tsx` [UPDATE], `packages/analytics/src/events.ts` [UPDATE]
**Pattern:** Consent-gated script loading — scripts are not added to the DOM until consent state is `true`; `useConsent` provides the gate; scripts unmount if consent is later withdrawn.
**Anti-Patterns:** Never load analytics scripts unconditionally regardless of consent. Never call `window.gtag` without guarding `typeof window !== 'undefined' && window.gtag`.
**Rules:** (1) `AnalyticsProvider` is `'use client'`; it calls `useConsent()`. (2) Scripts render only inside `{analyticsConsent && <Script ...>}`. (3) `trackEvent` no-ops silently (no throw) when consent false or window.gtag absent.
**Exports:** `AnalyticsProvider`, `trackEvent` (unchanged public interface — internal behavior changes).
**DoD:** No network requests to analytics domains visible in DevTools when consent is rejected. `trackEvent` throws no errors when consent false. TypeCheck passes.
**Out of Scope:** Consent-gated Vercel Speed Insights (separate script). PostHog session recording consent.
**Validate:** `pnpm turbo run typecheck --filter=@ydm-agency/analytics`

**Subtasks:**
- T-024.1 [AGENT] `packages/analytics/src/Analytics.tsx` — UPDATE: add `'use client'` directive. Import `useConsent` from `@ydm-agency/ui`. Wrap all three `<Script>` tags in `{analyticsConsent && (<Script .../>)}`. Add `useEffect` to call `window.gtag?.('consent', 'update', { analytics_storage: 'granted' })` when consent becomes true.
- T-024.2 [AGENT] `packages/analytics/src/events.ts` — UPDATE: wrap each `window.gtag` / `window.posthog` call with `if (typeof window === 'undefined' || !window.gtag) return;` guard to silently no-op when scripts are not loaded.
- T-024.3 [AGENT] `CHANGELOG.md` — Append: `### T-024 — Analytics\n- Consent-gated script loading implemented; analytics only fire after cookie acceptance.`

---

## [ ] T-025 — SEO Infrastructure
**Status:** ready | **Domain:** Analytics + SEO | **Depends On:** T-009 | **Blocks:** none
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
- T-025.1 [AGENT] `apps/firm-website/src/app/sitemap.ts` — CREATE: import `SERVICES_CONFIG` from `lib/services-config.ts`; export default function returning `MetadataRoute.Sitemap` array covering all 22 static URLs with correct `changeFrequency` and `priority` values. Base URL: `https://ydm-agency.com`.
- T-025.2 [AGENT] `apps/firm-website/src/app/robots.ts` — CREATE: export default function returning `{ rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }], sitemap: 'https://ydm-agency.com/sitemap.xml' }`.
- T-025.3 [AGENT] `packages/seo/src/metadata.ts` — UPDATE: add `openGraph.images` field to `constructMetadata` return value using the provided `ogImage` param (default: `/og-default.png`).

---

## [ ] T-026 — Demo App Scaffold
**Status:** ready | **Domain:** Demo Applications | **Depends On:** T-001 | **Blocks:** T-027–T-030
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
- T-026.1 [AGENT] `apps/demo-restaurant/package.json` — CREATE: name `@ydm-agency/demo-restaurant`, scripts `dev: next dev -p 3001`, `build: next build`, `typecheck: tsc --noEmit`. Deps: `next: catalog:`, `react: catalog:`, `react-dom: catalog:`, `@ydm-agency/ui: workspace:*`, `@ydm-agency/config: workspace:*`, `tailwindcss: catalog:`.
- T-026.2 [AGENT] `apps/demo-restaurant/next.config.js` — CREATE: `module.exports = { output: 'standalone', transpilePackages: ['@ydm-agency/ui'] }`.
- T-026.3 [AGENT] `apps/demo-restaurant/tsconfig.json` — CREATE: `{ "extends": "@ydm-agency/config/tsconfig.json", "include": ["src", "next-env.d.ts"], "exclude": ["node_modules"] }`.
- T-026.4 [AGENT] `apps/demo-restaurant/tailwind.config.js` — CREATE: `module.exports = { ...require('@ydm-agency/config/tailwind'), content: ['./src/**/*.{js,ts,jsx,tsx}', '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'] }`.
- T-026.5 [AGENT] `apps/demo-restaurant/src/app/globals.css` — CREATE: `@tailwind base; @tailwind components; @tailwind utilities;` plus import the brand token CSS vars from `@ydm-agency/config` (copy relevant `:root` block from the config package).
- T-026.6 [AGENT] `apps/demo-restaurant/src/app/layout.tsx` — CREATE: minimal RSC layout with `<html lang="en" className="dark">`, appropriate metadata, `bg-background text-text-primary` body.

---

## [ ] T-027 — Demo: Coastal Cafe
**Status:** ready | **Domain:** Demo Applications | **Depends On:** T-026 | **Blocks:** T-016
**Spec:** Build `apps/demo-restaurant/` as a fully functional single-page demo for "Coastal Cafe" — a fictional restaurant. Sections per planning.md §6: Hero (with reservation CTA), Menu (two categories), About, Location/Hours, Contact form. Warm coastal color accent overrides the default mint.
**Behavior:** Given a visitor landing on `demo-restaurant.ydm-agency.com`, when the page loads, then they see a polished restaurant site with a "Reserve a Table" CTA, menu items, and location info. Given they submit the contact form, then a static success message displays (no backend for demos).
**Research:** Read planning.md §6 for Coastal Cafe sections, copy, and accent color override (`#E8A96B` warm amber instead of mint). Read `apps/demo-restaurant/src/app/layout.tsx` from T-026 — layout is ready; only `page.tsx` needs to be built.
**Files:** `apps/demo-restaurant/src/app/page.tsx` [CREATE], `apps/demo-restaurant/src/app/globals.css` [UPDATE — accent color override]
**Pattern:** Config-driven accent override — demo-level CSS overrides `--color-accent` to the demo's brand color; all components render correctly without modification.
**Anti-Patterns:** Never fork or copy `@ydm-agency/ui` components for demo-specific styling. Use CSS variable overrides only.
**Rules:** (1) No real backend for demo forms — show static "Reservation request received!" on submit. (2) Accent: `--color-accent: #E8A96B`. (3) "Powered by YDM Agency" badge in footer linking back to `https://ydm-agency.com`. (4) All demo copy is fictional (not real business data).
**Exports:** Default `CoastalCafePage`.
**DoD:** Page renders all five sections. No 404 assets. Accent color is amber not mint. "Powered by YDM Agency" badge present. Build passes.
**Out of Scope:** Real reservation system. CMS. User auth.
**Validate:** `pnpm turbo run build --filter=apps/demo-restaurant`

**Subtasks:**
- T-027.1 [AGENT] `apps/demo-restaurant/src/app/globals.css` — Add override: `:root, .dark { --color-accent: #E8A96B; --color-accent-hover: #D4924A; }`.
- T-027.2 [AGENT] `apps/demo-restaurant/src/app/page.tsx` — CREATE: Hero section with background image placeholder, restaurant name "Coastal Cafe", tagline, "Reserve a Table" `<Button variant="primary">`. Menu section with two categories (4 items each) using `<Card>`. About section (2-column: text + image placeholder). Location/Hours section (address, hours table). Contact: static form with `onSubmit` showing success message. Footer with "Powered by YDM Agency" badge + link to `https://ydm-agency.com`.

---

## [ ] T-028 — Demo: Apex SaaS
**Status:** ready | **Domain:** Demo Applications | **Depends On:** T-026 | **Blocks:** T-016
**Spec:** Build `apps/demo-saas/` as a B2B SaaS marketing site for "Apex SaaS" — a fictional analytics platform. Sections: Hero (dashboard screenshot mockup), Features (3-column grid), Pricing (3 tiers), FAQ, CTA. Indigo/violet accent override.
**Behavior:** Given a visitor landing on `demo-saas.ydm-agency.com`, when they view pricing, then three tiers are visible with a highlighted "Most Popular" middle tier. Given they click "Start Free Trial", then a static lead capture form appears (no backend).
**Research:** Read planning.md §6 for Apex SaaS sections and copy. Note accent override: `#6366F1` (indigo). Mirror the scaffold created in T-026 for `apps/demo-saas/`.
**Files:** `apps/demo-saas/package.json` [CREATE], `apps/demo-saas/next.config.js` [CREATE], `apps/demo-saas/tsconfig.json` [CREATE], `apps/demo-saas/tailwind.config.js` [CREATE], `apps/demo-saas/src/app/layout.tsx` [CREATE], `apps/demo-saas/src/app/globals.css` [CREATE], `apps/demo-saas/src/app/page.tsx` [CREATE]
**Pattern:** Same config-driven accent override and scaffold pattern as T-026 and T-027.
**Rules:** (1) No real auth or trial backend. (2) Accent: `--color-accent: #6366F1`. (3) "Powered by YDM Agency" badge in footer. (4) Port `3002` for local dev.
**Exports:** Default `ApexSaasPage`.
**DoD:** All five sections render. Pricing tiers visible with correct highlighting. "Powered by YDM Agency" present. Build passes.
**Out of Scope:** Real auth. Dashboard UI beyond static screenshot placeholder.
**Validate:** `pnpm turbo run build --filter=apps/demo-saas`

**Subtasks:**
- T-028.1 [AGENT] `apps/demo-saas/` — CREATE all scaffold files (package.json, next.config.js, tsconfig.json, tailwind.config.js, globals.css, layout.tsx) following the exact same pattern as T-026 subtasks. Package name: `@ydm-agency/demo-saas`. Dev port: 3002. Accent override: `--color-accent: #6366F1; --color-accent-hover: #4F46E5`.
- T-028.2 [AGENT] `apps/demo-saas/src/app/page.tsx` — CREATE: Hero with dashboard image placeholder and "Start Free Trial" CTA. Features 3-column grid with icons (planning.md §6 Apex SaaS features). Pricing 3-tier using `<Pricing>` or custom component (Free / Pro / Enterprise). FAQ as `<details>/<summary>`. Final CTA. "Powered by YDM Agency" footer.

---

## [ ] T-029 — Demo: Vanguard Plumbing
**Status:** ready | **Domain:** Demo Applications | **Depends On:** T-026 | **Blocks:** T-016
**Spec:** Build `apps/demo-plumber/` as a local service site for "Vanguard Plumbing" — a fictional plumbing company. Sections: Hero (emergency call CTA), Services list, Why Choose Us, Service Area, Contact/Booking form. Deep blue accent override.
**Behavior:** Given a visitor landing on `demo-plumber.ydm-agency.com`, when they see the Hero, then an "Emergency? Call Now" button is prominently visible. Given they submit the booking form, then a static success message appears.
**Research:** Read planning.md §6 for Vanguard Plumbing sections and copy. Note accent override: `#2563EB` (blue-600). Mirror the scaffold from T-026 for `apps/demo-plumber/`.
**Files:** `apps/demo-plumber/package.json` [CREATE], `apps/demo-plumber/next.config.js` [CREATE], `apps/demo-plumber/tsconfig.json` [CREATE], `apps/demo-plumber/tailwind.config.js` [CREATE], `apps/demo-plumber/src/app/layout.tsx` [CREATE], `apps/demo-plumber/src/app/globals.css` [CREATE], `apps/demo-plumber/src/app/page.tsx` [CREATE]
**Pattern:** Same scaffold + accent override pattern as T-026.
**Rules:** (1) "Emergency? Call Now" CTA is `<a href="tel:+15551234567">` — static fictional phone number. (2) Accent: `--color-accent: #2563EB`. (3) "Powered by YDM Agency" badge in footer. (4) Port `3003`.
**Exports:** Default `VanguardPlumbingPage`.
**DoD:** All sections render. Emergency CTA is a tel: link. "Powered by YDM Agency" present. Build passes.
**Out of Scope:** Real booking system. GPS service area map.
**Validate:** `pnpm turbo run build --filter=apps/demo-plumber`

**Subtasks:**
- T-029.1 [AGENT] `apps/demo-plumber/` — CREATE all scaffold files following T-026 pattern. Package name `@ydm-agency/demo-plumber`. Port 3003. Accent: `--color-accent: #2563EB; --color-accent-hover: #1D4ED8`.
- T-029.2 [AGENT] `apps/demo-plumber/src/app/page.tsx` — CREATE: Hero with background image placeholder, "Vanguard Plumbing" name, tagline, "Emergency? Call Now" `<a href="tel:+15551234567">` + "Book a Visit" secondary CTA. Services list (6 items with icons). Why Choose Us (3-column grid). Service Area section (city list or static map placeholder). Contact form (static success). "Powered by YDM Agency" footer.

---

## [ ] T-030 — Demo: Nova Storefront
**Status:** ready | **Domain:** Demo Applications | **Depends On:** T-026 | **Blocks:** T-016
**Spec:** Build `apps/demo-store/` as a minimal e-commerce marketing site for "Nova Storefront" — a fictional product brand. Sections: Hero (product showcase), Featured Products grid (6 cards), About brand, Newsletter signup (static), CTA. Rose/coral accent override.
**Behavior:** Given a visitor landing on `demo-store.ydm-agency.com`, when they view featured products, then six product cards render with image placeholder, product name, price, and "Add to Cart" button that shows a static "Added!" state on click.
**Research:** Read planning.md §6 for Nova Storefront sections and copy. Note accent override: `#F43F5E` (rose-500). Mirror the scaffold from T-026 for `apps/demo-store/`.
**Files:** `apps/demo-store/package.json` [CREATE], `apps/demo-store/next.config.js` [CREATE], `apps/demo-store/tsconfig.json` [CREATE], `apps/demo-store/tailwind.config.js` [CREATE], `apps/demo-store/src/app/layout.tsx` [CREATE], `apps/demo-store/src/app/globals.css` [CREATE], `apps/demo-store/src/app/page.tsx` [CREATE]
**Pattern:** Same scaffold + accent override as T-026.
**Rules:** (1) No real cart backend — "Add to Cart" shows static "Added!" feedback via local React state. (2) Accent: `--color-accent: #F43F5E`. (3) "Powered by YDM Agency" badge in footer. (4) Port `3004`.
**Exports:** Default `NovaStorefrontPage`.
**DoD:** Hero, six product cards, About, Newsletter, CTA all render. "Add to Cart" shows feedback. Build passes.
**Out of Scope:** Real cart. Checkout. Payment processing.
**Validate:** `pnpm turbo run build --filter=apps/demo-store`

**Subtasks:**
- T-030.1 [AGENT] `apps/demo-store/` — CREATE all scaffold files following T-026 pattern. Package name `@ydm-agency/demo-store`. Port 3004. Accent: `--color-accent: #F43F5E; --color-accent-hover: #E11D48`.
- T-030.2 [AGENT] `apps/demo-store/src/app/page.tsx` — CREATE: Hero with product image placeholder and "Shop Now" CTA. Featured Products `grid grid-cols-2 md:grid-cols-3 gap-6` — 6 `<Card>` product cards each with image placeholder, name, price (`$XX.00`), "Add to Cart" button using local `useState` to toggle "Add to Cart" / "Added!". About brand section. Static newsletter signup input. Final CTA. "Powered by YDM Agency" footer.
- T-030.3 [AGENT] `apps/firm-website/src/app/demos/page.tsx` — UPDATE `screenshotSrc` paths for all four demos once this task is complete (if screenshots have been taken). Otherwise note placeholder stays until screenshots are taken post-deploy.

---

## [ ] T-031 — Unit Testing Setup
**Status:** ready | **Domain:** Testing | **Depends On:** T-004 | **Blocks:** T-032
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
- T-031.1 [AGENT] `pnpm-workspace.yaml` — Add to catalog: `vitest: ^2.1.0`, `@testing-library/react: ^16.0.0`, `@testing-library/user-event: ^14.5.0`, `@testing-library/jest-dom: ^6.6.0`, `jsdom: ^25.0.0`, `@vitejs/plugin-react: ^4.3.0`.
- T-031.2 [AGENT] `packages/ui/package.json` — Add to `devDependencies`: all five test deps from catalog.
- T-031.3 [AGENT] `packages/ui/vitest.config.ts` — CREATE: `import { defineConfig } from 'vitest/config'; import react from '@vitejs/plugin-react'; export default defineConfig({ plugins: [react()], test: { environment: 'jsdom', setupFiles: ['./src/__tests__/setup.ts'], globals: true } })`.
- T-031.4 [AGENT] `packages/ui/src/__tests__/setup.ts` — CREATE: `import '@testing-library/jest-dom'`.
- T-031.5 [AGENT] `packages/forms/package.json` — Add same devDependencies as T-031.2.
- T-031.6 [AGENT] `packages/forms/vitest.config.ts` — CREATE: same config as T-031.3.
- T-031.7 [AGENT] `packages/forms/src/__tests__/setup.ts` — CREATE: `import '@testing-library/jest-dom'`.
- T-031.8 [AGENT] `turbo.json` — Add `"test": { "dependsOn": ["^build"], "cache": false }` to the `tasks` object.

---

## [ ] T-032 — Unit Tests: Components and Validation
**Status:** ready | **Domain:** Testing | **Depends On:** T-031, T-004, T-005, T-019, T-020 | **Blocks:** none
**Spec:** Write unit tests for all rebuilt UI components (Button, Badge, Card, Container, ThemeToggle, CookieConsent) and all form schemas (contactFormSchema, leadCaptureSchema). Tests were scaffolded in T-004, T-019, T-020 — this task ensures full coverage.
**Behavior:** Given `pnpm turbo run test`, when all test files run, then every exported UI component and schema has at least one passing test covering its core behavior and one test covering an error/edge case.
**Research:** Read `packages/ui/src/__tests__/Button.test.tsx` from T-004 — expand if needed. Confirm `CookieConsent`, `ThemeToggle`, `Badge`, `Card` do not yet have test files. Read `packages/forms/src/__tests__/schemas.test.ts` from T-019 — confirm it covers all cases.
**Files:** `packages/ui/src/__tests__/Badge.test.tsx` [CREATE], `packages/ui/src/__tests__/Card.test.tsx` [CREATE], `packages/ui/src/__tests__/CookieConsent.test.tsx` [CREATE]
**Pattern:** Arrange-Act-Assert for unit tests. User-event library (`userEvent.click`, `userEvent.type`) for interaction tests.
**Anti-Patterns:** Never test implementation details (class names of internal elements). Test observable behavior and rendered output.
**Rules:** (1) Each test file has a `describe` block matching the component name. (2) Use `render` from `@testing-library/react` and `screen` queries. (3) Mock `next-themes` `useTheme` when testing ThemeToggle. (4) Mock `document.cookie` when testing CookieConsent.
**Exports:** No exports. Test files only.
**DoD:** `pnpm turbo run test` exits 0 with no failures. All components have at least 2 tests. TypeCheck passes.
**Out of Scope:** Visual regression tests. Storybook stories.
**Validate:** `pnpm turbo run test --filter=@ydm-agency/ui --filter=@ydm-agency/forms`

**Subtasks:**
- T-032.1 [AGENT] `packages/ui/src/__tests__/Badge.test.tsx` — CREATE: tests for (a) `default` variant renders with `bg-surface` class; (b) `accent` variant renders with `bg-accent`; (c) `outline` variant renders with `border-accent`; (d) children content renders.
- T-032.2 [AGENT] `packages/ui/src/__tests__/Card.test.tsx` — CREATE: tests for (a) renders children; (b) base classes include `bg-surface border-border rounded-xl`; (c) custom `className` is merged not replaced.
- T-032.3 [AGENT] `packages/ui/src/__tests__/CookieConsent.test.tsx` — CREATE: tests for (a) banner renders when no consent cookie exists; (b) "Accept" click calls `accept()`; (c) "Reject" click calls `reject()`; (d) banner hidden when cookie is set. Mock `CookieConsentContext`.

---

## [ ] T-033 — E2E Testing Setup
**Status:** ready | **Domain:** Testing | **Depends On:** T-009 | **Blocks:** T-034
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
- T-033.1 [AGENT] `package.json` (root) — Add `"@playwright/test": "^1.48.0"` to devDependencies.
- T-033.2 [AGENT] `playwright.config.ts` — CREATE at repo root: configure `baseURL`, `webServer` (start firm-website dev server), `projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]`, `retries: process.env.CI ? 1 : 0`, `reporter: 'html'`.
- T-033.3 [AGENT] `e2e/` — CREATE directory with a `.gitkeep` file so the directory is tracked.
- T-033.4 [AGENT] `turbo.json` — Add `"e2e": { "dependsOn": ["^build"], "cache": false }` task.
- T-033.5 [AGENT] `.github/workflows/ci.yml` — Add E2E job after the lint/typecheck/build jobs: `pnpm playwright install --with-deps chromium` then `pnpm playwright test`.

---

## [ ] T-034 — E2E Tests: Critical User Flows
**Status:** ready | **Domain:** Testing | **Depends On:** T-033, T-022, T-023 | **Blocks:** none
**Spec:** Write Playwright E2E specs for three critical user flows: (1) Contact form submission, (2) Cookie consent accept/reject flow, (3) Demo gallery navigation.
**Behavior:**
- Given a user on `/contact`, when they fill and submit the valid form, then the success message "Message received" appears within 5 seconds.
- Given a first-time visitor, when the cookie banner appears and they click "Reject", then no analytics network requests are visible in the next 3 seconds.
- Given a user on `/demos`, when they click "View Live Site" on any card, then a new browser tab opens.
**Research:** Confirm T-033 setup is complete (playwright.config.ts, e2e/ dir). Read `apps/firm-website/src/app/contact/page.tsx` and `apps/firm-website/src/app/demos/page.tsx` for exact selector text.
**Files:** `e2e/contact-form.spec.ts` [CREATE], `e2e/cookie-consent.spec.ts` [CREATE], `e2e/demos-navigation.spec.ts` [CREATE]
**Pattern:** BDD Given/When/Then structure — each `test()` block maps to one behavior scenario. `page.getByRole` and `page.getByText` for resilient selectors (not CSS selectors).
**Anti-Patterns:** Never use `page.waitForTimeout(ms)` fixed delays — use `page.waitForSelector` or `expect(locator).toBeVisible()`. Never select elements by CSS class names (fragile).
**Rules:** (1) Use `page.getByRole` and `page.getByLabel` for form fields. (2) Network interception via `page.route()` to mock the server action in contact form tests. (3) `expect(page).toHaveURL` for navigation assertions.
**Exports:** No exports. Spec files only.
**DoD:** All three spec files pass with `pnpm playwright test`. No flaky tests on re-run.
**Out of Scope:** Accessibility automated audit (separate axe-core integration, phase 2). Performance test in Playwright.
**Validate:** `pnpm playwright test e2e/contact-form.spec.ts e2e/cookie-consent.spec.ts e2e/demos-navigation.spec.ts --reporter=line`

**Subtasks:**
- T-034.1 [AGENT] `e2e/contact-form.spec.ts` — CREATE: test "valid submission shows success". Use `page.route('**/contact/actions*', ...)` to mock the server action returning `{ success: true }`. Fill form with `page.getByLabel`, submit, assert `page.getByText('Message received')` visible.
- T-034.2 [AGENT] `e2e/contact-form.spec.ts` — ADD: test "empty submission shows validation errors". Submit without filling fields. Assert `page.getByText('Name required')` and `page.getByText('Invalid email')` visible.
- T-034.3 [AGENT] `e2e/cookie-consent.spec.ts` — CREATE: test "reject hides banner and clears analytics". Clear cookies before test. Navigate to `/`. Assert banner visible. Click "Reject". Assert banner gone. Assert no requests to `google-analytics.com` were made.
- T-034.4 [AGENT] `e2e/cookie-consent.spec.ts` — ADD: test "accept hides banner and persists across reload". Click "Accept". Reload page. Assert banner does not appear again.
- T-034.5 [AGENT] `e2e/demos-navigation.spec.ts` — CREATE: test "demo cards link to external URLs in new tab". Navigate to `/demos`. For each card assert "View Live Site" link has `target="_blank"` and `rel` containing `noopener`. Assert four cards visible.

---

## [ ] T-035 — Environment Variables and External Accounts
**Status:** ready | **Domain:** Infrastructure | **Depends On:** none | **Blocks:** T-022
**Spec:** Create `.env.example` at repo root documenting all required environment variables. Create `.env.local` for `apps/firm-website` (gitignored). Set up four external service accounts and obtain their credentials.
**Behavior:** Given a fresh clone of the repo, when a developer reads `.env.example`, then they see every required variable with a description and know exactly where to obtain each value.
**Research:** Collect all `process.env.*` references from the codebase: `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_META_PIXEL_ID`, `RESEND_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `NEXT_PUBLIC_CALENDLY_URL`.
**Files:** `.env.example` [CREATE — repo root], `apps/firm-website/.env.local` [CREATE — gitignored, HUMAN fills values], `.gitignore` [VERIFY — confirm `.env.local` is listed]
**Pattern:** `.env.example` as documentation contract — all variables documented with type, required/optional status, and where to obtain them. `.env.local` is gitignored and never committed.
**Anti-Patterns:** Never commit `.env.local` or any file containing real API keys. Never use `NEXT_PUBLIC_` prefix for server-only secrets.
**Rules:** (1) `SUPABASE_SERVICE_ROLE_KEY` must NOT have `NEXT_PUBLIC_` prefix (server-only). (2) `RESEND_API_KEY` must NOT have `NEXT_PUBLIC_` prefix. (3) All Upstash vars must NOT have `NEXT_PUBLIC_` prefix. (4) `.env.example` values are placeholders (e.g., `your_ga_measurement_id_here`).
**Exports:** No code exports. Documentation artifact only.
**DoD:** `.env.example` contains all 9 variables with descriptions. `.gitignore` includes `.env.local`. No real keys in any tracked file. TypeCheck passes (env vars typed via `process.env`).
**Out of Scope:** Vault/secrets manager integration. Automatic env var injection in CI (handled in T-036).

**Subtasks:**
- T-035.1 [AGENT] `.env.example` — CREATE: document all 9 environment variables with name, placeholder value, description, and source URL where the developer can obtain each one.
- T-035.2 [AGENT] `.gitignore` — Verify `.env.local`, `.env*.local` are listed; add if missing.
- T-035.3 [HUMAN] Create a Supabase project at `https://supabase.com`. Create a `leads` table with columns: `id uuid primary key`, `name text not null`, `email text not null`, `project_type text`, `message text not null`, `created_at timestamptz default now()`, `source text`. Copy `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`.
- T-035.4 [HUMAN] Create a Resend account at `https://resend.com`. Verify the `ydmagency.com` domain. Create an API key with send permissions. Copy `RESEND_API_KEY` to `.env.local`.
- T-035.5 [HUMAN] Create an Upstash account at `https://upstash.com`. Create a Redis database (free tier). Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to `.env.local`.
- T-035.6 [HUMAN] Create a Calendly account at `https://calendly.com`. Set up a 30-minute "Strategy Call" event type. Copy the embed URL to `NEXT_PUBLIC_CALENDLY_URL` in `.env.local`.
- T-035.7 [HUMAN] Obtain GA4 measurement ID from Google Analytics property. Copy `NEXT_PUBLIC_GA_MEASUREMENT_ID` to `.env.local`.

---

## [ ] T-036 — CI/CD Pipeline Updates
**Status:** ready | **Domain:** Infrastructure | **Depends On:** T-031, T-033 | **Blocks:** T-037
**Spec:** Update `.github/workflows/ci.yml` to include the test and E2E stages alongside the existing lint/typecheck/build stages. Add Turborepo remote caching via TURBO_TOKEN. Add E2E environment variables as GitHub Secrets references.
**Behavior:** Given a pull request to `main`, when the CI pipeline runs, then lint, typecheck, build, unit tests, and E2E tests all execute in the correct order; if any stage fails, the PR is blocked from merging.
**Research:** Read `.github/workflows/ci.yml` — note existing stages and matrix. Confirm `TURBO_TOKEN` and `TURBO_TEAM` are listed as secrets to add. Confirm `pnpm` version in CI matches `pnpm-workspace.yaml`.
**Files:** `.github/workflows/ci.yml` [UPDATE]
**Pattern:** Turborepo-optimized CI — use `--filter` for targeted package pipelines; cache Turborepo output via `TURBO_TOKEN`; run unit tests and E2E in separate jobs that both must pass.
**Anti-Patterns:** Never run the full test suite without Turborepo cache — it will timeout. Never store secrets in CI YAML files.
**Rules:** (1) Unit tests job: `pnpm turbo run test`. (2) E2E job: `pnpm playwright install --with-deps chromium && pnpm playwright test`. (3) E2E job runs after build job. (4) All jobs use `pnpm` with `--frozen-lockfile`. (5) `TURBO_TOKEN` and `TURBO_TEAM` set as environment variables.
**Exports:** No code exports. CI configuration only.
**DoD:** CI pipeline passes on a clean commit. Unit tests and E2E are separate jobs visible in GitHub Actions UI. No secrets in tracked files.
**Out of Scope:** Deployment automation from CI (handled in Vercel). Lighthouse CI (phase 2).
**Validate:** Push a test commit and verify all CI jobs pass in GitHub Actions UI.

**Subtasks:**
- T-036.1 [AGENT] `.github/workflows/ci.yml` — Add `test` job after `build`: `pnpm turbo run test`. Depends on `build` job.
- T-036.2 [AGENT] `.github/workflows/ci.yml` — Add `e2e` job after `build`: install Playwright Chromium, start dev server, run `pnpm playwright test`. Reference GitHub Secrets for all `NEXT_PUBLIC_*` env vars needed to run the dev server.
- T-036.3 [AGENT] `.github/workflows/ci.yml` — Add `env: TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }} TURBO_TEAM: ${{ secrets.TURBO_TEAM }}` to enable Turborepo remote caching.
- T-036.4 [HUMAN] Add `TURBO_TOKEN`, `TURBO_TEAM`, and all required `NEXT_PUBLIC_*` variables as GitHub Repository Secrets via the repository Settings > Secrets UI. These contain real credentials that cannot be committed to files.

---

## [ ] T-037 — Deployment Configuration
**Status:** ready | **Domain:** Infrastructure | **Depends On:** T-036, T-010 | **Blocks:** none
**Spec:** Configure Vercel deployments for `apps/firm-website` and all four demo apps. Set up wildcard subdomain routing for demo apps on `ydm-agency.com`. Configure production environment variables in each Vercel project.
**Behavior:** Given a push to `main`, when Vercel deploys, then `ydm-agency.com` serves the firm website; `demo-restaurant.ydm-agency.com`, `demo-saas.ydm-agency.com`, `demo-plumber.ydm-agency.com`, `demo-store.ydm-agency.com` each serve their respective demo apps.
**Research:** Read `apps/firm-website/src/middleware.ts` — confirm it handles subdomain rewrites for firm-website (this is not used for demo apps which are separate Vercel projects). Confirm Vercel CLI is available or can be installed. Read `apps/demo-restaurant/next.config.js` from T-026 — confirm `output: 'standalone'`.
**Files:** `vercel.json` [CREATE — in each app directory], `apps/firm-website/next.config.js` [CHECK/UPDATE — ensure standalone output]
**Pattern:** Vercel monorepo deployment — each app is a separate Vercel project pointing to its subdirectory. The `vercel.json` in each app directory configures the project. Wildcard `*.ydm-agency.com` domain is added to the firm-website project for demo subdomain rewrites.
**Anti-Patterns:** Never use a single Vercel project for all apps. Never put secrets in `vercel.json`.
**Rules:** (1) Firm-website Vercel project: root directory `apps/firm-website`. (2) Demo Vercel projects: root directory `apps/demo-{slug}`. (3) Wildcard `*.ydm-agency.com` domain assigned to firm-website project. (4) Individual demo subdomains assigned to their respective projects. (5) All env vars set per-project in Vercel dashboard.
**Exports:** No code exports. Deployment configuration only.
**DoD:** All five Vercel projects deploy successfully. `ydm-agency.com` serves firm-website. All four demo subdomains serve their apps. SSL valid on all domains.
**Out of Scope:** Preview deployment URLs. CDN configuration beyond Vercel defaults. Custom cache headers.
**Validate:** `curl -I https://ydm-agency.com` returns 200. `curl -I https://demo-restaurant.ydm-agency.com` returns 200.

**Subtasks:**
- T-037.1 [HUMAN] Create a Vercel account or log in at `https://vercel.com`. This requires a browser-based OAuth flow that cannot be automated.
- T-037.2 [AGENT] Install Vercel CLI: `pnpm add -g vercel`. Run `vercel login` — this will open a browser; approve the login.
- T-037.3 [HUMAN] In Vercel dashboard: create five new projects linked to this GitHub repository. Set root directory for each: `apps/firm-website`, `apps/demo-restaurant`, `apps/demo-saas`, `apps/demo-plumber`, `apps/demo-store`. Set framework to "Next.js" for all.
- T-037.4 [HUMAN] In Vercel dashboard for the `firm-website` project: add custom domain `ydm-agency.com` and wildcard domain `*.ydm-agency.com`. Follow DNS verification instructions.
- T-037.5 [HUMAN] In Vercel dashboard for each demo project: add the respective custom subdomain (`demo-restaurant.ydm-agency.com`, etc.). Configure DNS at your domain registrar to point each subdomain to the correct Vercel project.
- T-037.6 [HUMAN] In Vercel dashboard for `firm-website` project: add all production environment variables from `.env.local` under Settings > Environment Variables. Repeat for each demo project with relevant variables.
- T-037.7 [AGENT] `apps/firm-website/next.config.js` — Verify or add `output: 'standalone'` so Vercel builds correctly in monorepo mode.
