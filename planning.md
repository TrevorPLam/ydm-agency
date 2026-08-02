## 1. Overview & Principles

- **Website‑led, pillar‑equal.** Design/management is the entry point; all 8 services (SEO/AEO, analytics, paid ads, branding, content, automation, reputation) are first‑class capabilities. Every client engagement has access to the full stack, regardless of initial scope.
- **Monorepo, full‑stack truth.** All client deliverables, shared packages, backend services, infrastructure‑as‑code, configs, AI tools, and internal apps live in one repository. A single CI/CD pipeline tests and deploys everything.
- **AI‑accelerated, rule‑based.** Windsurf and Devin handle scaffolding, content generation, and audits. Repo conventions and prompts (`ai‑tools/`, `.windsurf/rules.md`, `.devin/config.yaml`) remove guesswork—AI output follows the same rules as developer code, delivered via PR.
- **Practical, composable.** Right tool per client (Next, Astro, etc.). Each client is a container of independently deployable sub‑projects (website, blog, landers, admin, client‑scoped packages). Share only genuine cross‑client code; zero over‑engineering, fast builds and deploys via Turborepo scoping.
- **Accessible & resilient by default.** Every client inherits WCAG 2.1 AA components, consent‑aware analytics, error boundaries, and a content security policy tuned to their chosen services. Form errors announce to screen readers, cookie consent is properly trapped, and navigation meets a11y standards from day one.

## 2. Repo at a Glance

/
├── .github/            # CI/CD, deploy, scheduled audits, issue templates
├── .vscode/            # Editor settings & recommended extensions
├── .windsurf/          # Windsurf AI rules & project context
├── .devin/             # Devin agent configuration
├── ai-tools/           # Shared AI prompts & task runner scripts
├── apps/               # Internal tools & prospect demos (dashboard, portal, ad-manager, demo-*)
├── archive/            # Terminated client containers (excluded from workspaces)
├── clients/            # Every client deliverable — each a container
│   └── _client-blueprint/   # Versioned starter template (website, blog, landers, admin, brand-assets, client-scoped packages)
├── config/             # Shared base configs (ESLint, TS, Tailwind, Jest, Browserslist)
├── e2e/                # Cross‑client Playwright smoke & visual tests
├── infrastructure/     # Terraform IaC (Vercel project, DNS, asset bucket modules + per‑client state)
├── packages/           # Shared libraries: web-core, branding, design-system, seo-aeo, analytics, paid-ads, content, automation, reputation; opt-in: i18n, compliance, observability, experimentation, ecommerce
├── scripts/            # Scaffold, deploy, SEO health‑check, env sync, changelog
├── services/           # Backend micro‑services (analytics collector, automation worker, reputation monitor, content API)
├── docs/               # Internal documentation & guides
├── .gitignore
├── .editorconfig
├── .nvmrc
├── package.json        # Root workspace scripts
├── pnpm-workspace.yaml
├── turbo.json          # Turborepo pipeline
└── README.md

/
├── .github/
│   └── workflows/       # ci.yml, deploy-client.yml, scheduled-seo-audit.yml, e2e-changed-clients.yml, release-packages.yml
├── .vscode/
│   ├── settings.json
│   └── extensions.json
├── .windsurf/
│   ├── configuration.json
│   └── rules.md
├── .devin/
│   └── config.yaml
├── ai-tools/
│   ├── prompts/         # client-site-scaffold.md, seo-content-brief.md, ad-copy-variations.md
│   └── scripts/         # run-devin-task.sh
├── apps/
│   ├── analytics-dashboard/
│   ├── client-portal/
│   ├── ad-manager/
│   └── demo-*/          # Prospect-facing demo apps (restaurant, SaaS, local service, ecommerce)
├── archive/             # Terminated client containers — not in workspaces, not built
├── clients/
│   ├── _client-blueprint/
│   │   ├── website/     # Main marketing site (Next/Astro) — includes src/page-templates/ for opt‑in pages
│   │   ├── blog/
│   │   ├── landers/
│   │   ├── admin/
│   │   ├── brand-assets/
│   │   └── packages/
│   ├── acme-corp/
│   ├── beachclub/
│   └── …
├── config/
│   ├── eslint.base.js
│   ├── prettier.base.json
│   ├── tsconfig.base.json
│   ├── jest.base.config.js
│   ├── tailwind.base.config.js
│   └── .browserslistrc
├── e2e/
│   ├── smoke/
│   └── utils/
├── infrastructure/
│   ├── modules/         # vercel-project, dns, assets-bucket
│   └── clients/         # per‑client .tf files
├── packages/
│   ├── web-core/        # Foundation: layouts, meta, error boundaries, CSP helper, SEO wrappers
│   ├── branding/        # Design tokens (CSS vars + static hex), typography, logos
│   ├── design-system/   # Core UI kit (Button, Card, Hero, Header, Footer, CookieConsent, etc.)
│   ├── seo-aeo/         # JSON‑LD, sitemaps, audit scripts
│   ├── analytics/       # Consent‑gated providers (GA4, PostHog, Meta), event tracking
│   ├── paid-ads/        # Pixels, UTM handling, conversion blocks
│   ├── content/         # CMS connectors, rich‑text renderer, ContentSafety & Attribution components
│   ├── automation/      # submitContactForm Server Action, webhook handlers, email templates
│   ├── reputation/      # Review widgets, aggregators, badge generator
│   ├── i18n/            # [opt] Locale routing, hreflang, language switcher
│   ├── compliance/      # [opt] Consent banner, conditional script loading
│   ├── observability/   # [opt] ErrorBoundary, Sentry/LogRocket init, performance budgets
│   ├── experimentation/ # [opt] Edge A/B splits, feature flags
│   └── ecommerce/       # [opt] ProductCard, AddToCart, Shopify/BigCommerce connectors
├── scripts/
│   ├── scaffold-client.sh
│   ├── deploy.sh
│   ├── seo-health-check.sh
│   └── …
├── services/
│   ├── analytics-collector/
│   ├── automation-worker/
│   ├── reputation-monitor/
│   └── content-api/
├── docs/
│   ├── monorepo-blueprint.md
│   ├── package-catalog.md
│   └── …
├── .gitignore
├── .editorconfig
├── .nvmrc
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md

## 4. Service ↔ Package Matrix

| Service Pillar | Primary Package(s) | What it delivers |
|----------------|-------------------|------------------|
| **Website Design & Mgmt** | `web-core`, `branding`, `design-system` | Layout shell, meta/SEO wrappers, skip‑to‑content, CSP generator, error boundaries (`ErrorFallback`, `NotFound`, `Loading`). Design tokens as CSS variables **and** static hex objects (for emails, canvas). UI components (Button, Card, Hero, Header, Footer, CookieConsent, etc.) — all driven by tokens, zero hard‑coded colors. |
| **SEO / AEO** | `seo-aeo` | JSON‑LD schemas (LocalBusiness, FAQ, Article, Product), dynamic sitemaps, canonical/hreflang helpers, AEO‑optimized markup, audit scripts. |
| **Analytics** | `analytics` | Consent‑gated GA4, PostHog, Meta Pixel providers; standard `trackEvent`; dashboard connector API. Mandatory unit tests for all public exports. |
| **Paid Ads** | `paid-ads` | Meta/Google/LinkedIn/TikTok pixels, landing‑page conversion blocks, UTM preservation/parsing. |
| **Branding** | `branding` | Design tokens (JSON → Tailwind + CSS vars, static hex map for non‑CSS environments), typography scales, logo assets — symlinked per client. Single source of truth; all components reference these tokens. |
| **Content** | `content` | Reusable content models (BlogPost, CaseStudy), headless CMS connectors (Sanity, Contentful, Strapi), rich‑text renderers, `ContentSafety` type + `Attribution` component for safety‑flagged or AI‑generated content. |
| **Automation** | `automation` | Standard `submitContactForm` Server Action (validate → rate‑limit → Supabase → Resend → analytics event), webhook handlers, MJML email templates using branding tokens. |
| **Reputation** | `reputation` | Review carousel widgets, aggregator connectors (GBP, Yelp, Trustpilot), trust badge generator. |
| *(enabler)* | `i18n` [opt] | Locale detection, routing, translation key loading, hreflang generation (coordinated with `seo-aeo`), language switcher component. |
| *(enabler)* | `compliance` [opt] | Consent banner, consent provider context, conditional pixel/script loading. |
| *(enabler)* | `observability` [opt] | Error boundary, Sentry/LogRocket init, performance budget hooks, `_error.js` hooks. |
| *(enabler)* | `experimentation` [opt] | Edge‑based A/B splits, feature flag hooks, unified tracking. |
| *(enabler)* | `ecommerce` [opt] | ProductCard, AddToCart, price components, Shopify Storefront/BigCommerce connectors. |

**How they wire in:** Each client sub‑project’s `package.json` declares only the packages it needs. A simple landing page pulls `web-core`, `branding`, `design-system`, `seo-aeo`, and `analytics`. A full‑service client imports all eight pillars plus chosen enablers. Packages version together via the monorepo — zero drift. Every shared package is unit‑tested; public APIs are covered as a baseline requirement.

**Foundational dependency order:** `branding` (tokens) → `web-core` (layouts, CSP) → `design-system` (components) → all other packages. This prevents circular references and ensures tokens are available everywhere, including non‑CSS environments.


Each sub‑project is a separate workspace. They share nothing except what’s declared in `packages/` (client‑scoped) or global `@packages/`.

### Page generation — opt‑in, not prescribed

The scaffold generates only `Home` and `Privacy` pages by default. All other page types (About, Services, Blog, Contact, Education, etc.) are selected during scaffolding. Templates live in `website/src/page-templates/` and can be generated as App Router routes or static files. Every page inherits SEO metadata, JSON‑LD, and layout from `web-core`.

### Built‑in quality & standards (non‑negotiable)

| Standard | Implementation |
|----------|----------------|
| **Accessibility** | `web-core` provides `error.tsx`, `not-found.tsx`, `loading.tsx` styled with design tokens. `CookieConsent` uses `role="dialog"`, focus trap, neutral Escape dismiss. All form errors carry `role="alert"`. Skip‑to‑content link included. |
| **Resilience** | Error boundaries catch runtime failures. CSP generated by `web-core` helper, merging base policy with domains required by selected services. |
| **Form handling** | `automation` exports a standard Server Action: `submitContactForm`. Flow: Zod validation → Upstash rate‑limit (opt‑in) → Supabase `leads` insert → Resend acknowledgment + notification → `analytics.trackEvent`. Client `ContactForm` is a thin wrapper. |
| **Content voice** | All scaffolded copy and AI‑generated content follow the impersonal, firm‑level voice: no `we`/`us`/`our`. AI prompts enforce this; a CI lint (future) catches violations in static config files. |
| **Design tokens** | Every component uses `branding` tokens exclusively. No hard‑coded colors in shared or client code. Email templates consume static hex tokens from `branding`. CI script flags raw color values. |
| **Testing baseline** | Every shared package must unit‑test all public exports. Scaffold generates a `homepage.test.tsx` (smoke render) and, if Contact selected, a Playwright spec for the form flow. |

### Customizable layers (per sub‑project, override‑safe)

| Layer | File/Dir | Notes |
|-------|----------|-------|
| Pages & routing | `src/pages/` (Next) or `src/routes/` (Astro) | Homepage always exists; additional pages selected at scaffold. |
| Components | `src/components/` | Override any shared component by name; otherwise pull from `@packages/design-system`. |
| Brand tokens | `tailwind.config.js` | Extends `config/tailwind.base.js`; injects colours, fonts, breakpoints from `@packages/branding`. |
| SEO/AEO | uses `@packages/seo-aeo` | Structured data, sitemaps, meta injected via `web-core` layout shell. |
| Analytics & Ads | conditionally loaded | Provider/pixel components imported only if selected at scaffold; consent‑gated. |
| Content | `src/data/` or CMS | Static files for small sites; `@packages/content` connector for dynamic CMS. |
| Client logic | `src/lib/` | Custom fetchers, booking, lead scoring, flags — anything unique. |
| Environment | `.env.example` | Only keys for selected services appear; `sync-env-files.sh` keeps in sync. |
| Testing | `src/__tests__/` & `e2e/` | Homepage render test + optional Playwright specs. |

### Scaling patterns (choose one per client; no repo restructure needed)

| Pattern | Setup | Notes |
|---------|-------|-------|
| Single marketing site | `website/` only | Next.js or Astro; all pages inside `src/pages/`. |
| 200+ location pages (single domain) | `website/` with Astro `[location].astro` + `getStaticPaths` pulling from CMS | Generated pages not committed; ISR/on‑demand builders avoid build timeouts. |
| Multi‑domain franchise (50+ domains) | `website/` single Next/Astro app, host‑based routing via middleware | CMS maps domain → location; Terraform loops over location map for DNS & domain aliases. `seo-aeo` injects per‑domain canonical and self‑referencing hreflang. |
| Multi‑region | Duplicate client directories (`acme-us/`, `acme-uk/`) sharing `branding` tokens | Independent deploys; each has its own locale, domain, environment. |
| Single‑domain multilingual | `website/` + `@packages/i18n` | Locale routing, hreflang from `seo-aeo`, language switcher. |
| Headless commerce | `website/` queries Shopify/BigCommerce via `src/lib/`; `@packages/ecommerce` optional | Product schemas from `seo-aeo`; SSR marketing, CSR cart. |
| Client with separate portal/app | Portal lives in `apps/<slug>-portal/`, client marketing in `clients/<slug>/` | Different auth, domain, stack; both share `@packages/`. |

### Decision flow: inside client vs `apps/` vs `services/`

- Marketing site, blog, landers, lightweight sub‑apps (store locator, booking widget) → always inside `clients/<slug>/` as a sub‑project.
- Client‑shared UI/logic (product card used across website & landers) → `clients/<slug>/packages/`.
- Separate application with different auth, domain, or tech stack → `apps/`.
- Persistent backend logic (event ingestion, queue worker, review scraper) → `services/`.

### Scaffold automation

`scripts/scaffold-client.sh` does the following:

1. Copies `_client-blueprint` container → `clients/<slug>/`.
2. Prompts for slug, brand name, domain, and scale type (single/multi-location/multi-domain/multi-region/headless/multilingual).
3. Asks which sub‑projects and pages are needed; removes unused ones.
4. Asks: “Include SEO? Analytics? Paid Ads? Content? Automation? Reputation? i18n? Compliance? Observability? Experimentation? Ecommerce?”
5. Updates `package.json` with selected packages, injects Tailwind tokens from `branding`, writes `.env.example` (only selected services), generates Terraform stub.
6. Generates default `Home` and `Privacy` pages plus any opted‑in templates; sets up `ContactForm` wiring if contact selected.
7. Commits to branch `onboard/<slug>` and opens PR.

### Testing consistency

- **Unit/Integration:** Each sub‑project has `src/__tests__/` with a homepage render test at minimum. Shared packages test all public exports.
- **Client‑level e2e:** Optional `e2e/` directory per sub‑project; runs in CI when `e2e-changed-clients.yml` fires. Scaffold generates Playwright spec for contact form if chosen.
- **Cross‑client smoke:** Top‑level `e2e/` Playwright suite tests all live sitemaps after shared package changes; catches regressions globally.

## 6. Integrations Map

| Category | Tool / Platform | Handled by Package(s) | Notes |
|----------|-----------------|-----------------------|-------|
| Analytics | GA4, Plausible, Fathom, Mixpanel | `analytics` | Provider wrappers, consent‑aware loading |
| Ads | Meta, Google, LinkedIn, TikTok Ads | `paid-ads` | Pixel components, conversion tracking, UTM |
| SEO / AEO | Google Search Console, Bing Webmaster | `seo-aeo` (sitemaps, verification) | Verification files per client `public/` |
| Structured Data | Schema.org types (all) | `seo-aeo` (schemas/) | JSON‑LD generators for all common types |
| Content (CMS) | Sanity, Contentful, Strapi | `content` (connectors/) | Reusable wrappers; rich‑text rendering |
| E‑commerce | Shopify Storefront, BigCommerce | `ecommerce` [opt], client `src/lib/` | Product discovery, cart, product schemas via `seo-aeo` |
| Reputation | Google Business, Yelp, Trustpilot | `reputation` (aggregators/) | Review sync, widgets, trust badges |
| Automation | n8n, Zapier, Make | `automation` (workflows/) | Synced workflows; webhook handlers |
| Email | Mailchimp, Klaviyo, SendGrid | `automation` (email‑templates/) | MJML components, transactional triggers |
| CRM | HubSpot, Salesforce, Zoho | `automation` (webhooks/), client `src/lib/` | Form capture, lead scoring per client |
| Form Backend | Supabase | `automation` | `leads` table; per‑client project; used by `submitContactForm` Server Action |
| Scheduling | Calendly | `automation`, client `src/lib/` | Lazy‑loaded embed on contact page; integrated with form success state |
| Compliance | OneTrust, Cookiebot, custom CMP | `compliance` [opt] | Consent banner, conditional script loading |
| Observability | Sentry, LogRocket, Datadog RUM | `observability` [opt] | Error boundary, init, error pages |
| Experimentation | LaunchDarkly, Flagsmith, edge splits | `experimentation` [opt] | A/B splits, feature flags, tracking |
| Search | Algolia | client `src/lib/` or `apps/` | API client, UI components |
| Payments | Stripe (donations, checkout) | client `src/lib/` | Lightweight; full commerce uses `ecommerce` |

**Standard contact flow:** The `automation` package provides a single `submitContactForm` Server Action that chains Zod validation → Upstash rate‑limit → Supabase insert → Resend ack + notify → `analytics.trackEvent`. Any client contact page reuses this action; only env vars differ.

**Principle:** No third‑party tool gets its own top‑level directory. Every integration has a clear home in a shared package (cross‑client logic) or inside the client’s `src/lib/` (one‑off customization). The matrix is referenced during onboarding to wire the right packages from day one.

## 7. CI/CD & Operational Setup

### Workflows (`.github/workflows/`)

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci.yml` | PR push to any branch | `turbo run lint typecheck build test --filter=[HEAD^1]` — builds, type‑checks, lints, and runs unit tests only for changed projects and their dependents. `test` job added and mandatory. |
| `deploy-client.yml` | Manual dispatch (client slug) | Deploys a single client’s sub‑projects via Vercel CLI/API. Optionally runs `terraform apply` for infra changes. Per‑client, never global. |
| `scheduled-seo-audit.yml` | Weekly cron | Calls `seo-aeo` audit scripts across all production URLs; generates report artifact. |
| `e2e-changed-clients.yml` [opt] | PRs touching shared packages | Runs top‑level `e2e/` Playwright smoke tests against affected clients’ preview deployments. |
| `release-packages.yml` | Manual or main push | Bumps versions, generates changelogs, publishes internal packages. |
| *(new)* `check-docs-drift.yml` | PRs touching `docs/` or `apps/` | Lint‑style job: extracts real Next.js/Astro routes and compares to documented sitemap; fails on mismatch. |
| *(new)* `check-package-promotion.yml` | Scheduled or on PR | Flags when ≥2 clients define a `packages/<same-name>` with similar exports — prompts promotion review. |

**`turbo.json` tasks** — `build`, `lint`, `typecheck`, `test`, `e2e`, `clean` — plus `format` (now defined) and `seo-audit`. `test` depends on `^build`; `e2e` depends on `^build` and is uncached. The root `package.json` includes corresponding scripts for all tasks; CI invokes `turbo run` for every job.

### Deployment Model

- **Default target:** Vercel, using Vercel CLI or API from `deploy-client.yml`. Each client sub‑project maps to its own Vercel project. No reliance on Git integration — deployments are explicit, auditable, and per‑client.
- **Netlify** supported via the same pattern; config file detected per sub‑project.
- **`apps/`** deployed independently as Vercel projects or Docker containers.
- **`services/`** deployed as Cloudflare Workers (`wrangler`), Docker images (GCR/ECS), or scheduled cron triggers.

### Infrastructure Provisioning

- `infrastructure/` contains reusable Terraform modules (`vercel-project`, `dns`, `assets-bucket`) and per‑client state files (`clients/<slug>.tf`).
- Scaffold generates a `.tf` stub; developers fill in domain, region, and location maps.
- Multi‑domain franchises: Terraform loops over location maps for domain aliases and DNS records.
- `deploy-client.yml` can include `terraform plan`/`apply` for PRs with infra changes — environments versioned with code.

### Environment Management

- Each sub‑project’s `.env.example` lists **only** the variables required by its selected services — no unused placeholders.
- `scripts/sync-env-files.sh` scans code and keeps examples aligned with actual usage.
- Secrets live in CI (GitHub Secrets, Vercel env); never committed.
- Shared packages read env via a unified config helper from `web-core`, with safe defaults.

### Backend Services Deployment

- `services/` are multi‑tenant; per‑client config comes from env vars or queue names — no per‑client service instances required.
- CI deploys services on directory changes via `turbo` filtering.

### CSP & Observability Wiring

- **CSP:** `web-core` exports a `generateCsp(services)` helper. During build, the selected services (analytics, ads, etc.) are passed; the generated policy is applied via middleware or headers config. This eliminates the drift between what’s declared and what’s actually needed.
- **Observability:** `observability` package (opt‑in) initializes Sentry/LogRocket, wraps pages with `ErrorBoundary`, and optionally enforces Lighthouse ≥ 90 and a11y budgets per sub‑project.

### Monorepo Health & Developer Tooling

- `scripts/package-consumers.sh` — lists all dependents of a package before breaking changes.
- `scripts/dev-tunnel.sh` — cloudflared tunnel for instant client previews.
- `scripts/seo-health-check.sh` — Lighthouse + SEO crawl on production URLs; triggerable manually or via cron.
- `turbo` remote caching (Vercel) reduces CI times.

### Performance Notes

- Only changed projects and their dependents are built; full rebuilds never required.
- Large static sites use ISR/on‑demand builders to avoid build timeouts.
- Client‑scoped packages and per‑client deployment keep blast radius minimal.
- No barrel exports in shared packages → tree‑shaking maximized.

## 8. AI-Assisted Workflows

AI accelerates; the repo is the source of truth. Every AI agent follows the same conventions as a human developer, and all output arrives via PR.

### Tool Configuration

| Tool | Config | Role |
|------|--------|------|
| Windsurf | `.windsurf/configuration.json`, `rules.md` | IDE agent: understands monorepo structure, coding standards, import aliases. |
| Devin | `.devin/config.yaml` | Autonomous agent: larger tasks (SEO audits, batch content, multi‑step scaffold). Triggered via `ai-tools/scripts/run-devin-task.sh`. |

Existing `.devin/workflows/` (audit, todo, official) provide pre‑built templates for common audit and task‑management runs.

### Shared Prompts (`ai-tools/prompts/`)

| Prompt | Use Case |
|--------|----------|
| `client-site-scaffold.md` | Generates a full client container from `_client-blueprint`. Creates only requested sub‑projects and pages, wires selected service packages, configures Tailwind tokens, writes `.env.example` with only needed keys, and optionally generates a Terraform stub. |
| `seo-content-brief.md` | Produces an AEO‑optimized content outline. Accepts keyword, brand voice, content type; outputs structured brief. Voice constraint: impersonal firm‑level, no `we`/`us`/`our`. |
| `ad-copy-variations.md` | Generates ad copy arrays for a product/service, platform, and character limits. |
| *(new)* `content-page.md` | Generates a complete page (e.g., blog, education lesson) using `web-core` layout, `seo-aeo` structured data, and `content` package’s `ContentSafety` + `Attribution` fields. Must tag safety level (`public-domain`/`cite-creator`/`extra-care`) and include attribution copy. |

### Common AI‑Driven Tasks

- **New client scaffold:** Windsurf/Devin reads `client-site-scaffold.md` and `rules.md`, copies the blueprint container, prompts for missing info, and opens a PR with the fully wired client directory.
- **Content generation:** AI writes pages using `web-core` layout and `seo-aeo` schemas. Voice is impersonal firm‑level. Education/tutorial content always populates `safety` and `attribution` fields per the `content` package.
- **SEO audit:** Devin runs `seo-aeo` audit scripts, parses results, and opens a PR with fixes (alt text, headings, schema, canonical/hreflang).
- **Ad copy creation:** Devin produces JSON arrays of ad variants, consumable by `ad-manager` or ad platforms.
- **Package addition:** Windsurf knows to add a dependency, import the component, and place it—all per `rules.md`.
- **Infrastructure generation:** For complex clients, Devin extends the Terraform stub with domain aliases, location loops, or asset buckets based on the selected scaling pattern.
- *(new)* **Contact form wiring:** When a client opts into contact, Devin scaffolds the route with `ContactForm` wired to the shared `submitContactForm` Server Action, Calendly lazy‑load, and analytics event tracking.

### Rules & Constraints (`rules.md`)

- No duplication: use shared packages; client‑specific logic lives in `src/lib/`.
- Naming: routes `kebab-case`, components `PascalCase`.
- Imports: `@packages/` alias from `config/tsconfig.base.json`.
- **Content voice:** all copy must use impersonal, firm‑level voice — no `we`/`us`/`our`. AI prompts enforce this; `LeadForm` and any first‑person copy are forbidden.
- **Accessibility:** all generated forms must use `role="alert"` on errors; cookie consent must have `role="dialog"`, focus trap, neutral Escape dismiss.
- Testing: at least one unit test per new component; mandatory for shared packages.
- AI output always via PR — never directly to main.

### Extending AI Capabilities

- Add prompt files to `ai-tools/prompts/`.
- Update `rules.md` when conventions change.
- For complex multi‑step tasks, create a new Devin workflow and reference it in `run-devin-task.sh`.

## 9. Onboarding a New Client

### Step 1: Run the scaffold script

```bash
./scripts/scaffold-client.sh
```

| Prompt | Example | Effect |
|--------|---------|--------|
| Client slug | `acme-corp` | Creates `clients/acme-corp/` from `_client-blueprint` |
| Brand name | Acme Corp | Populates `package.json` names, Tailwind config |
| Domain | acme.com | Sets config, Vercel project slug |
| Scale type | single / multi-location / multi-domain franchise / multi-region / headless / multilingual | Configures routing, Terraform stub complexity, and i18n setup if multilingual |
| Sub‑projects needed | y/n: website, blog, landers, admin, client packages | Removes unused sub‑directories |
| Pages needed (website) | y/n: About, Services, Blog, Contact, Education, etc. | Home & Privacy always generated; others copied from `page-templates/` |
| Services needed | y/n: SEO, analytics, ads, content, automation, reputation, i18n, compliance, observability, experimentation, ecommerce | Adds packages to each sub‑project’s `package.json`; wires providers/components; enables form handler if automation selected |
| Deploy target | vercel / netlify | Generates platform‑specific config per sub‑project |
| Generate infrastructure | y/n | Creates `infrastructure/clients/<slug>.tf` stub |

Script commits to `onboard/<slug>` and opens a PR. All generated files follow `rules.md` and pass CI. **Only the selected services appear in `.env.example`**; no unused placeholder keys. If `automation` is selected, the contact page is set up with `ContactForm` already wired to the shared `submitContactForm` Server Action.

### Step 2: Manual touches (post‑scaffold)

- Add brand tokens in `tailwind.config.js` (colors, fonts from guidelines) — extend, never override, the base `branding` tokens.
- Replace placeholder brand assets (`brand-assets/`).
- Configure content source: drop static data into `src/data/` or wire CMS via `@packages/content` connector.
- Set environment variables in Vercel/Netlify (API keys, analytics IDs, Supabase URL, Resend key, Upstash tokens) — exactly as listed in `.env.example`.
- Validate structured data locally (Google Rich Results Test) and test canonical/hreflang tags if applicable.
- Customize consent banner text if `compliance` package used; ensure `CookieConsent` behavior is tested (Escape dismiss, accept/reject flows).
- Add client’s production URL to `scheduled-seo-audit.yml`.
- If infrastructure generated: fill in actual domain, DNS zone ID, and run `terraform plan`.
- **Voice audit:** verify all scaffolded copy (home, about, services, contact) uses impersonal firm‑level voice — no `we`/`us`/`our`. Correct any deviations (e.g., homepage process headings).

### Step 3: Pre‑launch checklist

- [ ] Lighthouse ≥ 90 mobile performance; accessibility score ≥ 95
- [ ] All structured data validates; canonical/hreflang tags correct
- [ ] Sitemap accessible at `/sitemap.xml`; routes match actual implementation
- [ ] `robots.txt` not blocking critical paths
- [ ] CSP generated by `web-core` matches enabled services; no console CSP errors
- [ ] Analytics/pixels fire only after consent; consent banner accessible (`role="dialog"`, focus trap, neutral Escape)
- [ ] Contact form submits successfully (validation, rate‑limit, Supabase, email, analytics event)
- [ ] Calendly embed loads (lazy) if included
- [ ] All form errors announce via `role="alert"`
- [ ] `error.tsx`, `not-found.tsx`, `loading.tsx` render correctly when triggered
- [ ] 404 page renders without layout break
- [ ] Environment variables complete for preview + production (no missing keys)
- [ ] Client review link shared via `client-portal`
- [ ] DNS/domain verified and configured
- [ ] Infrastructure applied and project live
- [ ] Homepage unit test and contact Playwright spec pass

### Ongoing: scale‑triggered additions

- **Multi‑location:** Add `[location].astro` route; map CMS location fields; per‑location schema from `seo-aeo`.
- **Multi‑domain franchise:** Enable host‑based middleware; Terraform loop over location map; `seo-aeo` handles per‑domain canonical/hreflang.
- **Multi‑region:** Duplicate client container with adjusted locale/domain; share `@packages/branding` tokens.
- **Single‑domain multilingual:** Add `@packages/i18n` if not already selected; configure locale routes and hreflang.
- **Separate portal/app:** Create `apps/<slug>-portal`; import shared packages; add to `turbo.json` build list.
- **Client‑scoped library:** Add `packages/<lib>` inside client; already covered by workspace glob.

No step exceeds a few minutes; the monorepo automates the rest.

## 10. Scalability & Performance

### Monorepo mechanics (50+ clients, zero slowdown)

- Each client sub‑project (`website`, `blog`, `landers`, `admin`) is a separate workspace. `turbo run build --filter=@clients/acme-website` builds only that target.
- `turbo.json`: client `build` depends on `^build` (shared packages). Changing `seo-aeo` rebuilds only client sub‑projects that import it — unaffected ones skip.
- Client‑scoped packages (`clients/*/packages/*`) are also workspaces; they build only if a dependent sub‑project changed.
- Turborepo caching (local `.turbo`, optional Vercel remote cache) ensures CI never rebuilds unchanged code.
- Shared packages build once per commit; all consumers pick up the same artifact.

### Build & deployment speed

- Incremental builds: Next.js/Astro rebuild only changed pages or data.
- Large static sites: ISR or on‑demand builders (Vercel ISR, Netlify On‑Demand Builders) instead of full static generation — avoids timeouts.
- CI: `ci.yml` runs `turbo run build lint test --filter=[HEAD^1]` — only changed workspaces and their dependents.
- `deploy-client.yml` deploys a single client’s sub‑projects; no full‑repo deploy. `services/` deploy independently on changes to their directories.
- CSP is generated once at build time by `web-core` and embedded in headers; zero runtime overhead.

### Client isolation & payload

- Zero cross‑client imports; each client container is isolated.
- Shared packages are tree‑shaken: importing `@packages/analytics` bundles only the configured provider.
- Heavy deps (Algolia, Shopify, i18n locale files) live in the client’s `package.json`, never hoisted into shared packages. `i18n` loads translation files on demand per locale.
- The `_client-blueprint` starts minimal; only selected services add weight.

### Scaling patterns (quick reference)

| Pattern | Setup | Performance |
|---------|-------|-------------|
| Single site | `clients/<slug>/website/` | Lightweight, fast build |
| 200+ location pages (single domain) | Astro `[location].astro` + CMS, ISR fallback | No git bloat, no build timeout |
| Multi‑domain franchise (50+ domains) | Single Next/Astro app with host‑based routing middleware; Terraform loops over domains | One deploy, infinite domains; per‑domain data from CMS |
| Multi‑region | Separate client containers (`acme-us/`, `acme-uk/`) sharing `branding` tokens | Independent deploys, shared design |
| Single‑domain multilingual | `website/` + `@packages/i18n`; locale routes, on‑demand translation loading | Per‑locale bundles; hreflang via `seo-aeo` |
| Headless commerce | Client `website/` + optional `ecommerce` package; product pages rendered via `src/lib/shopify` | SSR marketing, CSR cart; product schemas from `seo-aeo` |
| Separate apps (portals) | `apps/<name>` | Own deploy, still shares `@packages/` |

### Monitoring & guardrails

- `observability` package (opt‑in) enables RUM, error tracking, and **automated performance budgets**: Lighthouse ≥ 90 and a11y score enforcement per sub‑project in CI, configurable per client.
- Weekly Lighthouse + SEO crawl on all production URLs via `scheduled-seo-audit.yml`.
- `e2e-changed-clients.yml` smoke tests guard against global regressions after shared package changes.

### Proven practices

- No barrel exports in shared packages → maximizes tree‑shaking.
- `next/dynamic`, React `lazy` for below‑the‑fold components (Calendly, chat widgets, heavy embeds).
- Optimized images: `next/image`, Astro’s Image component, CDN‑cached.
- Full audits on schedule, not every commit.
- For extreme growth (100+ clients), consider extracting shared packages to an internal registry — unnecessary at 50.
- Client‑scoped packages keep cross‑client sharing tight without polluting global `packages/`.

## 11. Maintenance & Evolution

### Adding a new shared package
1. Create `packages/<name>/` with `package.json`, `tsconfig.json` (extends `config/tsconfig.base`).
2. Register in `turbo.json` pipeline if needed (build, lint, test). Ensure `test` script exists and covers public API.
3. Update `docs/package-catalog.md` and `docs/service-pillars.md`.
4. Clients opt‑in by adding the dependency to their sub‑project `package.json`.

### Adding a new backend service
1. Create `services/<name>/` with its own deploy config (wrangler, Dockerfile, etc.).
2. Ensure multi‑tenant isolation (per‑client env vars, queue names, or domain routing).
3. Add to `turbo.json` if it should be built/linted in CI; deploy independently via CI or manual trigger.
4. Document in `docs/integrations-map.md` and `docs/service-pillars.md`.

### Adding a new infrastructure module
1. Create `infrastructure/modules/<name>/` with Terraform resources.
2. Update scaffold script to generate a stub referencing the module for new clients.
3. Existing clients adopt it by adding a module block to their `.tf` file — no repo restructure.

### Upgrading dependencies
- **Root dev tools** (pnpm, Turbo, configs): update root `package.json`, run `pnpm install`, test in CI.
- **Shared packages**: bump version, regenerate lockfile; Turborepo rebuilds only affected consumers.
- **Client‑specific deps**: each sub‑project manages its own; zero global impact.
- **Infrastructure providers**: bump in `infrastructure/` modules, run `terraform plan` against all client states.
- Use `pnpm up -r <pkg>` for mass upgrades; CI catches cross‑client breakage.

### Deprecating or removing a package/service
1. Mark deprecated in docs; log migration path.
2. Remove all client imports (use `scripts/package-consumers.sh <pkg>` to find them).
3. Delete directory; remove from `turbo.json` pipeline if needed.
4. For services: tear down the deployment and remove its infra module if no longer used.
5. Merge; any remaining consumers will fail CI and must be updated.

### Breaking changes in a shared package
- You control all consumers. Make the change, fix affected clients in the same PR. CI validates all builds.
- If a temporary break is unacceptable, export old and new APIs behind a compat flag; remove old later.
- Changelogs generated by `scripts/generate-changelogs.sh`.

### Adding a new service pillar (firm strategy)
- New service → new package under `packages/` (and possibly a new service under `services/`).
- Update `docs/service-pillars.md`, integrate into scaffold script prompts.
- Existing clients unaffected until they opt‑in.

### Client removal (contract end)
1. Archive: move `clients/<slug>/` to `archive/<slug>/`; remove from `pnpm-workspace.yaml` globs. The `archive/` directory is excluded from all build and lint operations.
2. Run `terraform destroy` against the client’s infrastructure state; delete Vercel/Netlify projects.
3. Remove client URL from `scheduled-seo-audit.yml` URL list and any CI sitemap checks.
4. Remove any client‑specific configuration from shared services (queues, API keys).
5. Merge removal; zero impact on other clients.

### Client‑scoped packages maintenance
- Treat like any other package, but owned within the client container.
- When a client ends, their scoped package is removed with the container.
- If a scoped package becomes genuinely cross‑client, promote it to `packages/` after review. The CI `check-package-promotion.yml` workflow flags candidates.

### Versioning strategy
- Internal only; manual version bumps on shared packages suffice.
- `changesets` can be adopted later for automated changelogs if complexity grows.

### Firm website as a client
- The agency’s own marketing site lives in `clients/ydm/`, built and maintained identically to any client container. It uses the same packages, same scaffolding, same CI. This ensures the firm’s site never drifts from the patterns delivered to clients.

### Regular health checks
- **Dependency visibility:** Run `scripts/package-consumers.sh <pkg>` before breaking changes.
- **Infrastructure drift:** `terraform plan` all client states monthly to catch manual console changes.
- **SEO/performance:** `scripts/seo-health-check.sh` monthly across all live production URLs.
- **Documentation route drift:** Run `check-docs-drift.yml` workflow (or manually) to ensure sitemap docs match actual routes in all client containers and the firm site.
- **Unused packages:** `pnpm list --recursive` to identify orphaned packages; remove or archive.
- **Integration map audit:** Review `docs/integrations-map.md` quarterly — ensure no tool is duplicated or orphaned.
- **Content safety audit:** Periodically verify that education/tutorial content in all active client containers has valid `safety` flags and current attributions, especially for AI‑generated pages.
- **Design token lint (future):** When the hard‑coded color rule is added to CI, include it in the regular lint suite to catch token drift in shared packages and client code.

**New Section 12: Prospect-Facing Demo Applications**

## 12. Prospect-Facing Demo Applications

Demo apps are full, deployable websites built from the same packages and patterns as client containers. They prove the firm’s capabilities across common verticals and live at dedicated subdomains — not as static screenshots or design files. A `/demos` page on the agency site links to them.

### Location & structure

apps/
├── demo-restaurant/     # Coastal Café — hospitality, menu, booking
├── demo-saas/           # Apex SaaS — product landing, signup flow
├── demo-local/          # Vanguard Plumbing — local service, GBP integration
├── demo-ecommerce/      # Nova Storefront — headless commerce, product discovery
└── …

Each `demo-*` app is a separate workspace with its own `package.json`, deploy config, and domain. They follow the same `_client-blueprint` conventions — token‑driven design, accessibility standards, consent‑gated analytics, and SEO‑complete markup. The difference: they are maintained as sales assets, not client deliverables.

### Lifecycle

- **Build:** Scaffolded like a client but optimized for demonstration — sample content, fake data, visible CTAs that capture lead interest rather than serve a business.
- **Deploy:** Each demo deploys independently via `deploy-client.yml` (or a similar workflow) to a subdomain (e.g., `restaurant.demo.ydmagency.com`). They run the same CI checks as client projects.
- **Maintain:** Demos stay aligned with package updates; CI rebuilds them on shared package changes. They are the first to reflect design system evolutions.
- **Retire:** When a demo no longer represents current capabilities, it’s moved to `archive/demos/<name>/` (or removed entirely) and the demos page is updated. Infrastructure is torn down.

### Relationship to the firm site

The agency website’s `/demos` route links to live demo subdomains with descriptive vertical labels. The demos page content is maintained in the firm’s `clients/ydm/website/src/data/` alongside other marketing copy. No demo code lives inside the firm site; they are separate apps referenced by URL.

### Guardrails

- Demos must never accept real user data; forms can simulate success but store nothing.
- All demo content is clearly labeled as sample/demonstration.
- Performance and accessibility budgets apply identically (Lighthouse ≥ 90, a11y ≥ 95).
- Demos are not counted as active client containers for billing or infrastructure scaling purposes.

## Appendix A: Migration from Existing Firm Repository

The current repository (`ydm-agency`) is a functional monorepo with the agency website and seven `@ydm-agency/*` packages. It must be realigned to the target blueprint before onboarding the first external client. This appendix is the ordered migration plan.

### A.1 Package Reorganization

| Current Package | Target Location | Notes |
|-----------------|-----------------|-------|
| `@ydm-agency/ui` | `packages/design-system` | Core components; rename, remove stale teal shadow from Button, make `Features`/`Pricing` token‑driven. |
| `@ydm-agency/forms` | `packages/automation` (Server Action) + `packages/design-system` (ContactForm/LeadForm components) | Extract `submitContactForm` as the shared action; rewrite `LeadForm` to impersonal voice and design tokens. |
| `@ydm-agency/analytics` | `packages/analytics` | Keep; wire env vars, update CSP. |
| `@ydm-agency/seo` | `packages/seo-aeo` | Rename; add canonical/hreflang helpers. |
| `@ydm-agency/email` | `packages/automation` (templates + sendEmail) | Refresh tokens to blue accent via `branding` static hex. |
| `@ydm-agency/utils` | `packages/web-core` (formatDate, formatCurrency) + `packages/design-system` (cn) | Keep `cn` as shared utility; move formatting helpers to `web-core`. |
| `@ydm-agency/config` | `config/` (stays) | Align `tailwind.js` content globs for new packages; add `i18n` to transpile if needed. |

### A.2 Directory Restructure

1. **Create `clients/ydm/`** — move the current `apps/firm-website/` content here as `clients/ydm/website/`. Update all import paths from `@ydm-agency/*` to `@packages/*`.
2. **Scaffold `_client-blueprint`** — using the migrated patterns as the base, create a generic starter. Remove firm‑specific copy; keep structural defaults (Home, Privacy, error boundaries, form wiring).
3. **Create `apps/demo-*`** — scaffold the four vertical demos (restaurant, saas, local, ecommerce) from `_client-blueprint` with realistic sample content.
4. **Add missing directories** — `archive/` (empty), `e2e/` Playwright specs, `infrastructure/` Terraform stubs for the firm site and demos.
5. **Retire old paths** — once migration is verified, remove the old `apps/firm-website` and `packages/@ydm-agency/*` directories.

### A.3 Backend & Feature Completion

- Implement `submitContactForm` Server Action in `packages/automation`: Zod validation → Upstash rate‑limit (env‑gated) → Supabase `leads` insert → Resend ack + notify → `analytics.trackEvent`.
- Add `error.tsx`, `not-found.tsx`, `loading.tsx` to `packages/web-core` and wire into `clients/ydm/website`.
- Add `role="alert"` to `ContactForm` errors; add `role="dialog"` + focus trap to `CookieConsent`.
- Wire analytics IDs from `NEXT_PUBLIC_*` env vars in the firm site’s `providers.tsx`.
- Generate CSP via `web-core` helper using the firm’s selected services.
- Fix voice violations: homepage process headings, `LeadForm` copy; enforce via CI lint.
- Enable missing `turbo.json` tasks (`format`, `test`, `e2e`) and add corresponding root scripts.
- Add Playwright specs for contact flow and cookie consent.

### A.4 Verification

- Run full CI pipeline (`lint`, `typecheck`, `build`, `test`, `e2e`).
- Lighthouse ≥ 90, a11y ≥ 95 on firm site.
- All structured data validates; sitemap matches actual routes (pass `check-docs-drift`).
- Contact form submits end‑to‑end with rate‑limit, Supabase, and email delivery.
- Demo apps deploy and render correctly on subdomains.

### A.5 Post‑Migration Cleanup

- Update `README.md` and `AGENTS.md` to reflect new paths, package names, and route documentation.
- Add the firm’s production URL to `scheduled-seo-audit.yml`.
- Remove all `@ydm-agency` references from the codebase.
- Archive the old repository snapshot via git tag `pre-migration` for history.