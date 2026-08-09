# 11. Technical Architecture & Implementation Priorities

*Note: the source document contained this section twice (near‑duplicate) plus a stray leftover planning note between them. Both artifacts are removed here; this is the single consolidated version, using the more complete draft as the base.*

### 1. Technology Stack
| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Next.js 15 (App Router) | RSC, Server Actions, static/dynamic rendering |
| Language | TypeScript (strict) | End‑to‑end type safety |
| Monorepo | Turborepo 2.x + pnpm | Parallel builds, shared packages, remote caching |
| Styling | Tailwind CSS 3.4+ | Utility‑first, shared tokens in `@firm/config` |
| UI | shadcn/ui (Radix primitives) | Accessible, owned, customizable components |
| Animation | Framer Motion (lazy) | Scroll reveals, micro‑interactions, hover states |
| Icons | Lucide React | Tree‑shakeable SVG icons |
| Forms | React Hook Form + Zod | Type‑safe client/server validation |
| Email | Resend + React Email | Transactional emails |
| Database | Supabase (PostgreSQL) | Lead storage, audit log, future client/project data |
| Rate Limiting | Upstash Redis + `@upstash/ratelimit` | Server Action protection |
| Analytics | Vercel Analytics + GA4 events | Privacy‑conscious, consent‑gated, event‑based conversion tracking |
| Monitoring | UptimeRobot (free tier) | Uptime on main domain |
| Hosting | Vercel (multi‑project) | Independent deploys per app, auto SSL, edge caching |

### 2. Monorepo Structure
```
ydm-agency/
├── apps/
│   └── main-site/              # yourdomain.com
├── packages/
│   ├── ui/          (@firm/ui)        Shared shadcn components, layouts, CookieConsent
│   ├── config/      (@firm/config)    Tailwind preset, ESLint, TS, env validation
│   ├── forms/       (@firm/forms)     Shared Zod schemas
│   ├── email/       (@firm/email)     React Email templates, Resend utilities
│   ├── seo/         (@firm/seo)       OG image generation, JSON‑LD, metadata helpers
│   └── analytics/   (@firm/analytics) Attribution tracking, consent management
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```
Shared design tokens in `@firm/config/tailwind`, all apps extend from this preset. `@firm/ui` imported via `transpilePackages`. Turborepo generator (`pnpm generate-app`) scaffolds new client apps pre‑wired to shared packages.

### 3. Performance Budgets
Targets (mobile, 4G): LCP <2.5s · INP <200ms · CLS <0.1 · Lighthouse Performance ≥90 on all key pages, Accessibility =100, SEO=100.
Rules: `next/image` WebP/AVIF, explicit dims, lazy below fold, priority hero · fonts self‑hosted via `next/font`, Latin‑subset, `display:swap`, preloaded · all main pages statically generated · below‑fold components (mockups, Calendly, heavy animation) via `next/dynamic` · no third‑party scripts beyond Vercel Analytics (post‑consent) — no chat widgets/social embeds/pixels · Tailwind purged in prod, Lucide icons imported individually.

### 4. Animation & Motion Constraints
Only `transform`/`opacity` animated. Scroll reveals: fade‑up (`opacity 0→1, y 30→0`), ≤0.4s, stagger ≤0.1s — hero/portfolio cards/process teaser only, service pages static. Micro‑interactions: hover scale 1.02, card lift y:-4, button glow, gated behind `hover:focus-visible` for keyboard/touch parity. `useReducedMotion()` + CSS `prefers-reduced-motion` respected globally. Framer Motion lazy‑loaded via `LazyMotion`. Background: CSS‑only noise texture, no WebGL, no auto‑play video.

### 5. Accessibility Workflow
Standard: WCAG 2.2 AA. Semantic HTML (`main/nav/header/footer/section/article`) · one `<h1>`/page, no skipped heading levels · full keyboard operability, visible `focus-visible:ring-2 ring-accent` · ARIA labels on icon‑only buttons, descriptive link text · contrast ≥4.5:1 body / ≥3:1 large text · labeled form inputs, errors via `role="alert"` · dark/light toggle via `next-themes`, OS high‑contrast respected · glass surfaces replaced with solid `surface` under `prefers-reduced-transparency`.
Testing: axe‑core in dev, Lighthouse a11y audits (target 100), `@axe-core/playwright` in E2E · manual keyboard‑only pass on Home→Services→Contact, screen‑reader pass (VoiceOver/NVDA) on contact form pre‑launch.

### 6. Form Handling & Lead Pipeline
Client: React Hook Form + Zod resolver, real‑time validation; fields per Section 9; honeypot silently discards. Server: Server Action re‑validates via `@firm/forms` schema, Upstash rate limit (5/hr/IP), `isomorphic-dompurify` sanitization on message field, lead written to Supabase `leads`, two Resend emails sent (auto‑ack to lead + internal notification to `contact@ydmagency.com`). Tracking: GA4 `form_submission` on success message, marked key event, no thank‑you URL needed.

### 7. Analytics & Cookie Consent
Consent banner (`@firm/ui`): minimal dark sticky bottom banner, Accept/Reject equal weight, functional cookie stores preference (no analytics cookie until accepted), "Cookie Settings" footer link reopens, respects Do Not Track. Vercel Analytics loaded conditionally post‑consent via `next/dynamic`; GA4 via GTM or direct `gtag` with consent gate. Custom events: `form_submission`, `calendly_book`. UTM/referrer attribution stored in `sessionStorage` via `@firm/analytics`, appended to lead records.

### 8. Security
Headers (`middleware.ts`): `Content-Security-Policy` (strict, nonce‑based inline scripts) · `X-Frame-Options: DENY` · `X-Content-Type-Options: nosniff` · `Referrer-Policy: strict-origin-when-cross-origin` · `Permissions-Policy` (restrict camera/mic/geolocation). Plus: rate limiting on all public Server Actions · input sanitization (Zod + dompurify) · no secrets in client bundles · `pnpm audit` in CI, Dependabot enabled.

### 9. Deployment & DNS
Each `apps/` app = separate Vercel project on the same repo. Domains: `main-site`→`yourdomain.com`. Vercel auto‑SSL (Let's Encrypt), wildcard SSL requires Vercel nameservers. Preview deploys on all branches, production from `main`. UptimeRobot monitors main domain (HTTP + keyword checks).

### 10. Testing Strategy
| Type | Tool | Scope |
|------|------|-------|
| Unit | Vitest + RTL | Utilities, form validation, UI components |
| E2E | Playwright | Contact form, navigation, cookie consent, cross‑browser |
| Accessibility | axe‑core, Lighthouse, `@axe-core/playwright` | All pages, in CI |
| Performance | Lighthouse CI, Vercel Speed Insights | Budget enforcement + post‑launch field data |

### 11. Pre‑Launch Quality Gates
- [ ] Lighthouse: Performance ≥90, Accessibility=100, SEO=100 on all main pages
- [ ] Contact form: validation errors, success message, auto‑ack email, lead in Supabase
- [ ] Cookie consent: analytics blocked pre‑accept, preference persists, reject works
- [ ] Responsive at 320/768/1024/1440px, no horizontal scroll, ≥44px tap targets
- [ ] Cross‑browser: Chrome, Firefox, Safari
- [ ] Keyboard nav: logical tab order, visible focus, modal escape, hamburger operable
- [ ] Unique `<title>`/`<meta description>` per page, OG image renders
- [ ] `robots.txt` + `sitemap.xml` accessible
- [ ] Privacy Policy live, linked footer + contact form
- [ ] Security headers present, honeypot effective, rate limiting active
- [ ] Uptime monitoring active on main domain
