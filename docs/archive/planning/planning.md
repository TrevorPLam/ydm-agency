## 1. Overview & Principles

- **Website‑led, pillar‑equal.** Design/management is the entry point; all 8 services (SEO/AEO, analytics, paid ads, branding, content, automation, reputation) are first‑class capabilities. Every client can activate any pillar at any time without a rebuild or re‑platform — the monorepo makes upsell frictionless, not automatic.
- **Monorepo, full‑stack truth.** All client deliverables, shared packages, backend services, infrastructure‑as‑code, configs, AI tools, and internal apps live in one repository. A single CI/CD pipeline tests and deploys everything.
- **AI‑accelerated, rule‑based.** Windsurf and Devin handle scaffolding, content generation, and audits. Repo conventions and prompts (`ai‑tools/`, `.windsurf/rules/`, `.devin/`, `AGENTS.md`) remove guesswork—AI output follows the same rules as developer code, delivered via PR.
- **Practical, composable.** Right tool per client (Next, Astro, etc.). Each client is a container of independently deployable sub‑projects (website, blog, landers, admin, client‑scoped packages). Share only genuine cross‑client code; zero over‑engineering, fast builds and deploys via Turborepo scoping.
- **Shared behavior, unique appearance.** Only invisible, accessible functionality (headless components) is shared across clients. All visible design, layout, and styling is created uniquely per client using a rich set of design tokens and composition primitives. No two client sites should look like the same template. Uniqueness is the default; intentional reuse requires justification.
- **Accessible & resilient by default.** Every client inherits WCAG 2.2 AA components, consent‑aware analytics, error boundaries, and a content security policy tuned to their chosen services. Form errors announce to screen readers, cookie consent is properly trapped, and navigation meets a11y standards from day one. Shared primitives enforce accessibility at the behavior level (ARIA, keyboard, focus management); styling is the client's responsibility and must pass automated WCAG checks in CI.
- **Composable beyond UI.** The "shared behavior, unique composition" pattern extends to automation (step pipelines), content (structure + voice + topic), and analytics (benchmark projections). Shared packages own pure logic; client configuration owns all parameterization.
- **Tenant‑isolated, agency‑informed.** Client data remains strictly isolated at the tenant level. The agency derives anonymized, aggregate intelligence only through a defined privacy budget and k‑anonymity thresholds, governed by a contractual MSA clause and technical enforcement.

## 2. Repo at a Glance

/
├── .github/ # CI/CD, deploy, scheduled audits, issue templates
├── .vscode/ # Editor settings & recommended extensions
├── .windsurf/ # Windsurf AI rules & project context
├── .devin/ # Devin agent configuration
├── AGENTS.md # Cross-tool standard for foundational repo context
├── ai-tools/ # Shared AI prompts & task runner scripts
├── apps/ # Internal tools (dashboard, portal, ad-manager, content-review) and the firm website
├── archive/ # Terminated client containers (excluded from workspaces)
├── clients/ # Every client deliverable — each a container
│ └── _client-blueprint/ # Versioned starter template (website only: minimal blank canvas with Home, Privacy, style-guide page, error boundaries pre-wired; no pre-built page templates). Additional pages generated on-demand via layout recipes.
├── config/ # Shared base configs (ESLint, TS, Tailwind, Jest, Browserslist)
├── e2e/ # Cross‑client Playwright smoke & visual tests
├── infrastructure/ # Terraform IaC (Vercel project, DNS, asset bucket modules + per‑client state)
├── packages/ # Shared libraries: web-core, branding, headless-ui, tenant-config, seo-aeo, analytics, paid-ads, content, automation, reputation; opt-in: i18n, compliance, observability, experimentation, ecommerce
├── scripts/ # Scaffold, deploy, SEO health‑check, env sync, changelog
├── services/ # Backend micro‑services (analytics-collector with embedded anonymization, automation worker, reputation monitor, content API)
├── docs/ # Internal documentation & guides
│ ├── secrets-policy.md # Naming convention, scoping, and rotation cadence for secrets
│ ├── recipes/ # Copy-paste layout pattern examples (hero, services grid, pricing, etc.) built from headless primitives + tokens — never imported as components
├── .gitignore
├── .editorconfig
├── .nvmrc
├── package.json # Root workspace scripts
├── pnpm-workspace.yaml
├── turbo.json # Turborepo pipeline
└── README.md

/
├── .github/
│ └── workflows/ # ci.yml, deploy-client.yml, scheduled-seo-audit.yml, e2e-changed-clients.yml, release-packages.yml
├── .vscode/
│ ├── settings.json
│ └── extensions.json
├── .windsurf/
│ └── rules/
│ ├── clients.md # glob: clients/** — container conventions, voice rules, a11y
│ ├── packages.md # glob: packages/** — public API testing, no barrel exports
│ ├── headless-ui.md # glob: packages/headless-ui/** — primitives must never add visual styling; only accept className and tokens
│ ├── services.md # glob: services/** — multi-tenant isolation rules
│ └── ai-tools.md # always-on — repo-wide conventions (naming, imports, PR-only)
├── .devin/
│ ├── config.yaml # Custom tool definitions
│ ├── skills/ # SKILL.md per apps/, services/, and root — test commands, env setup
│ └── playbooks/ # Named, reusable task templates (scaffold-client, seo-audit, content-batch)
├── AGENTS.md # Cross-tool standard for foundational repo context
├── ai-tools/
│ ├── prompts/ # client-site-scaffold.md, seo-content-brief.md, ad-copy-variations.md
│ └── scripts/ # run-devin-task.sh
├── apps/
│ ├── analytics-dashboard/
│ ├── client-portal/
│ ├── ad-manager/
│ ├── content-review/ # [Phase 2] Lightweight internal web app for the structured diff review of AI-generated content, built from headless primitives. Dependent on content pipeline.
├── archive/ # Terminated client containers — not in workspaces, not built
├── clients/
│ ├── _client-blueprint/ # Versioned starter template (website only: minimal blank canvas with Home, Privacy, style-guide page, error boundaries pre-wired; no pre-built page templates). Additional pages generated on-demand via layout recipes.
│ │ └── website/ # Minimal blank canvas: Home, Privacy, style-guide page, error boundaries pre-wired; no pre-built page templates
│ ├── acme-corp/
│ ├── beachclub/
│ └── …
├── config/
│ ├── eslint.base.js
│ ├── prettier.base.json
│ ├── tsconfig.base.json
│ ├── jest.base.config.js
│ ├── tailwind.base.config.js
│ └── .browserslistrc
├── e2e/
│ ├── smoke/
│ └── utils/
├── infrastructure/
│ ├── modules/ # vercel-project, dns, assets-bucket
│ └── clients/ # per‑client .tf files
├── packages/
│ ├── web-core/ # Foundation: layouts, meta, error boundaries, CSP helper, SEO wrappers
│ ├── branding/ # Design tokens (CSS vars + static hex), typography, logos
│ ├── headless-ui/ # Unstyled, accessible primitives (ButtonBase, DialogBase, TabsBase, InputBase, etc.) with zero visual style. Interaction logic, ARIA, and keyboard handling built in.
│ ├── seo-aeo/ # JSON‑LD, sitemaps, audit scripts
│ ├── analytics/ # Consent‑gated providers (GA4, PostHog, Meta), event tracking
│ ├── paid-ads/ # Pixels, UTM handling, conversion blocks
│ ├── content/ # CMS connectors, rich‑text renderer, ContentSafety & Attribution components
│ ├── automation/ # submitContactForm Server Action, webhook handlers, email templates
│ ├── reputation/ # Review widgets, aggregators, badge generator
│ ├── tenant-config/ # Versioned Zod schema and TypeScript types for per-client configuration (tokens, feature flags, package enablement, deployment tier). Consumed by the runtime, CI/CD, and internal tools.
│ ├── i18n/ # [opt] Locale routing, hreflang, language switcher
│ ├── compliance/ # [opt] Consent banner, conditional script loading
│ ├── observability/ # [opt] ErrorBoundary, Sentry/LogRocket init, performance budgets
│ ├── experimentation/ # [opt] Edge A/B splits, feature flags
│ └── ecommerce/ # [opt] ProductCard, AddToCart, Shopify/BigCommerce connectors
├── scripts/
│ ├── scaffold-client.sh
│ ├── deploy.sh
│ ├── seo-health-check.sh
│ └── …
├── services/
│ ├── analytics-collector/ # Ingests per-client events; includes an anonymization sub-service enforcing k-anonymity, differential privacy, and budget tracking.
│ ├── automation-worker/
│ ├── reputation-monitor/
│ └── content-api/
├── docs/
│ ├── monorepo-blueprint.md
│ ├── package-catalog.md
│ ├── secrets-policy.md
│ ├── recipes/ # Copy-paste layout pattern examples (hero, services grid, pricing, etc.) built from headless primitives + tokens — never imported as components
│ └── …
├── .gitignore
├── .editorconfig
├── .nvmrc
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md

## 3. Service ↔ Package Matrix

| Service Pillar            | Primary Package(s)                    | What it delivers                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Website Design & Mgmt** | `web-core`, `branding`, `headless-ui` | Layout shell (`SectionShell`, `PageShell` — unstyled structural wrappers), skip-to-content, CSP generator, error boundaries (`ErrorFallback`, `NotFound`, `Loading`). Design tokens as CSS variables and static hex map. Unstyled accessible primitives (`ButtonBase`, `DialogBase`, `TabsBase`, `InputBase`, `SelectBase`, `Popover`, `Disclosure`, `VisuallyHidden`). All visual styling applied per client.                                                                                           |
| **SEO / AEO**             | `seo-aeo`                             | JSON‑LD schemas (LocalBusiness, FAQ, Article, Product), dynamic sitemaps, canonical/hreflang helpers, AEO‑optimized markup, audit scripts. Includes robots.txt AI crawler allowance checks (OAI-SearchBot, PerplexityBot, Google-Extended, ClaudeBot), server-rendered content validation, and answer-block content structure patterns (40–60 word direct-answer blocks with FAQ/HowTo/Service schema). `llms.txt` available as opt-in add-on, not scaffold default.                                     |
| **Analytics**             | `analytics`                           | Consent‑gated GA4, PostHog, Meta Pixel per client. <br>**Add:** An `analytics-collector` backend service ingests per-client events (anonymized at ingest). A separate anonymization layer enforces k‑anonymity (k≥5) and differential privacy (ε budget) to produce cross‑portfolio benchmark views. A two‑tier metric system suppresses segments with insufficient client count.                                                                                                                        |
| **Paid Ads**              | `paid-ads`                            | Meta/Google/LinkedIn/TikTok pixels, landing‑page conversion blocks, UTM preservation/parsing.                                                                                                                                                                                                                                                                                                                                                                                                            |
| **Branding**              | `branding`                            | Design tokens (colors, type scale, spacing scale, radii, shadows, transitions) — single source of truth. Exports CSS variables for Tailwind and a static hex map for emails/canvas. Token presets available ("spacious and airy", "compact and dense", "soft and rounded", "brutalist") as starting points, fully overridable.                                                                                                                                                                           |
| **Content**               | `content`                             | Reusable content models (BlogPost, CaseStudy), CMS connectors, rich‑text renderers, `ContentSafety`/`Attribution`. <br>**Add:** Parametric voice system — 12‑parameter client voice profile (formality, lexicon, sentence length, storytelling mode, etc.) captured during onboarding and injected into AI prompts. The `content` package provides a `renderContent(structure, voice, topics)` pipeline; a structured diff review interface logs feedback per voice parameter for continuous refinement. |
| **Automation**            | `automation`                          | Composable step pipelines defined as JSON graphs. Shared step registry with typed schemas, native `branch` step, and guaranteed retry/compensation semantics. The `submitContactForm` Server Action remains the default simple pipeline; clients override steps or add branches to build multi‑step intake forms, quizzes, drip triggers, and CRM syncs — all without custom code.                                                                                                                       |
| **Reputation**            | `reputation`                          | Review widgets built from headless primitives; visual rendering client-owned. Aggregator connectors (GBP, Yelp, Trustpilot), trust badge generator.                                                                                                                                                                                                                                                                                                                                                      |
| _(enabler)_               | `i18n` [opt]                          | Locale detection, routing, translation key loading, hreflang generation (coordinated with `seo-aeo`), language switcher component.                                                                                                                                                                                                                                                                                                                                                                       |
| _(enabler)_               | `compliance` [opt]                    | Consent banner, consent provider context, conditional pixel/script loading, Google Consent Mode v2 helper (default‑denied initialization + update‑on‑consent for EEA/UK/Swiss traffic).                                                                                                                                                                                                                                                                                                                  |
| _(enabler)_               | `observability` [opt]                 | Error boundary, Sentry/LogRocket init, performance budget hooks, `_error.js` hooks.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| _(enabler)_               | `experimentation` [opt]               | Edge‑based A/B splits, feature flag hooks, unified tracking.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| _(enabler)_               | `ecommerce` [opt]                     | ProductCard, AddToCart, price components, Shopify Storefront/BigCommerce connectors.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| _(enabler)_               | `tenant-config`                       | Versioned Zod/TypeScript schema for per-client configuration: deployment tier, tokens, feature flags, package enablement, integration secrets (encrypted). Validates at runtime and in CI; ensures no drift between the runtime and the portal.                                                                                                                                                                                                                                                          |

**How they wire in:** Each client sub‑project’s `package.json` declares only the packages it needs. A simple landing page pulls `web-core`, `branding`, `headless-ui`, `seo-aeo`, and `analytics`. A full‑service client imports all eight pillars plus chosen enablers. Packages version together via the monorepo — zero drift. Every shared package is unit‑tested; public APIs are covered as a baseline requirement.

**Foundational dependency order:** `branding` (token schema) + `tenant-config` (per-client token values, feature flags, package enablement, deployment tier) → `web-core` (layouts, CSP) → `headless-ui` (primitives) → all other packages. All other packages can depend on `headless-ui` for interactive primitives. This prevents circular references and ensures tokens and tenant context are available everywhere, including non‑CSS environments.

**Runtime token contract:** `packages/headless-ui` components must read from CSS custom properties only (e.g., `var(--color-bg-primary)`, `var(--font-heading)`, `var(--space-4)`). The client app injects the concrete token values through a `ThemeProvider`, a root CSS file, or its Tailwind config extending `packages/branding`. No hard-coded hex, spacing, font, radius, or shadow values are permitted inside `packages/headless-ui`, `hooks`, or `data-access`.

Each sub‑project is a separate workspace. They share nothing except what’s declared in `packages/` (client‑scoped) or global `@packages/`.

### Page generation — opt‑in, not prescribed

The scaffold generates a minimal blank canvas: `Home`, `Privacy`, and a `style-guide` page showing token-driven primitives. No pre-built page templates exist. Additional pages are generated as unique layout specifications (JSON) that are then rendered using headless primitives and tokens. Layout recipes in `docs/recipes/` serve as starting points for composition, not as importable components. Every page inherits SEO metadata, JSON‑LD, and layout shell from `web-core`.

### Built‑in quality & standards (non‑negotiable)

| Standard              | Implementation                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Accessibility**     | `web-core` provides `error.tsx`, `not-found.tsx`, `loading.tsx` styled with design tokens. `CookieConsent` uses `role="dialog"`, focus trap, neutral Escape dismiss. All form errors carry `role="alert"`. Skip‑to‑content link included.                                                                                                                                                                                                                     |
| **Resilience**        | Error boundaries catch runtime failures. CSP generated by `web-core` helper, merging base policy with domains required by selected services.                                                                                                                                                                                                                                                                                                                  |
| **Form handling**     | `automation` exports a standard Server Action: `submitContactForm`. Flow: Zod validation → Upstash rate‑limit (opt‑in) → Supabase `leads` insert (one shared Supabase project with `client_id` column and Row-Level Security) → Resend acknowledgment + notification → `analytics.trackEvent`. The visual form is client-owned and built with `InputBase`, `ButtonBase`, and other `headless-ui` primitives; no shared `ContactForm` visual component exists. |
| **Content voice**     | All scaffolded copy and AI‑generated content follow the impersonal, firm‑level voice: no `we`/`us`/`our`. AI prompts enforce this; a CI lint (future) catches violations in static config files.                                                                                                                                                                                                                                                              |
| **AEO & AI crawlers** | `seo-aeo` validates robots.txt explicitly allows AI crawlers (OAI-SearchBot, PerplexityBot, Google-Extended, ClaudeBot). Content must be server-rendered, not interaction-gated (tabs, accordions, sliders that reveal content on click are invisible to AI crawlers). Answer-block content structure (40–60 word direct-answer blocks with FAQ/HowTo/Service schema) enforced via AI prompts.                                                                |
| **Design tokens**     | Every component uses `branding` tokens exclusively. `headless-ui` references CSS custom properties only; no hard‑coded colors, spacing, fonts, radii, or shadows. Email templates consume static hex tokens from `branding`. CI script flags raw color values and any literal style value in shared packages.                                                                                                                                                 |
| **Visual uniqueness** | Design review checklist includes: does this layout resemble the firm's site or any recent client? Structural duplication across clients is flagged. AI layout specs are randomized to avoid repetition.                                                                                                                                                                                                                                                       |
| **Testing baseline**  | Shared packages (`headless-ui`, `automation`, `analytics`, etc.) are covered by unit/logic tests. Client apps are covered by visual regression on key pages (homepage, contact, pricing). Playwright specs guard the contact flow and cookie consent.                                                                                                                                                                                               |

### Customizable layers (per sub‑project, override‑safe)

| Layer           | File/Dir                                     | Notes                                                                                                                                                                          |
| --------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Pages & routing | `src/pages/` (Next) or `src/routes/` (Astro) | Homepage always exists; additional pages selected at scaffold.                                                                                                                 |
| Components      | `src/components/`                            | Build pages with `@packages/headless-ui` primitives and `@packages/branding` tokens; no high-level visual components (Hero, Features, etc.) are imported from shared packages. |
| Brand tokens    | `tailwind.config.js`                         | Extends `config/tailwind.base.js`; injects colours, fonts, breakpoints from `@packages/branding`.                                                                              |
| SEO/AEO         | uses `@packages/seo-aeo`                     | Structured data, sitemaps, meta injected via `web-core` layout shell.                                                                                                          |
| Analytics & Ads | conditionally loaded                         | Provider/pixel components imported only if selected at scaffold; consent‑gated.                                                                                                |
| Content         | `src/data/` or CMS                           | Static files for small sites; `@packages/content` connector for dynamic CMS.                                                                                                   |
| Client logic    | `src/lib/`                                   | Custom fetchers, booking, lead scoring, flags — anything unique.                                                                                                               |
| Environment     | `.env.example`                               | Only keys for selected services appear; `sync-env-files.sh` keeps in sync.                                                                                                     |
| Testing         | `src/__tests__/` & `e2e/`                    | Homepage render test + optional Playwright specs.                                                                                                                              |

### Scaling patterns (choose one per client; no repo restructure needed)

| Pattern                              | Setup                                                                                 | Notes                                                                                                                                                         |
| ------------------------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Single marketing site                | `website/` only                                                                       | Next.js or Astro; all pages inside `src/pages/`.                                                                                                              |
| 200+ location pages (single domain)  | `website/` with Astro `[location].astro` + `getStaticPaths` pulling from CMS          | Generated pages not committed; ISR/on‑demand builders avoid build timeouts.                                                                                   |
| Multi‑domain franchise (50+ domains) | `website/` single Next/Astro app, host‑based routing via proxy.ts                     | CMS maps domain → location; Terraform loops over location map for DNS & domain aliases. `seo-aeo` injects per‑domain canonical and self‑referencing hreflang. |
| Multi‑region                         | Duplicate client directories (`acme-us/`, `acme-uk/`) sharing `branding` tokens       | Independent deploys; each has its own locale, domain, environment.                                                                                            |
| Single‑domain multilingual           | `website/` + `@packages/i18n`                                                         | Locale routing, hreflang from `seo-aeo`, language switcher.                                                                                                   |
| Headless commerce                    | `website/` queries Shopify/BigCommerce via `src/lib/`; `@packages/ecommerce` optional | Product schemas from `seo-aeo`; SSR marketing, CSR cart.                                                                                                      |
| Client with separate portal/app      | Portal lives in `apps/<slug>-portal/`, client marketing in `clients/<slug>/`          | Different auth, domain, stack; both share `@packages/`.                                                                                                       |

All scaling patterns use headless primitives and client-specific tokens. Multi-tenant deployment (host-based routing) can be used for smaller clients to reduce hosting costs while keeping visual output unique via per-tenant token sets.

### Decision flow: inside client vs `apps/` vs `services/`

- Marketing site, blog, landers, lightweight sub‑apps (store locator, booking widget) → always inside `clients/<slug>/` as a sub‑project.
- Within the client sub-project, page composition uses headless primitives from `@packages/headless-ui` and design tokens from `@packages/branding`. No high‑level layout components (Hero, Features, etc.) are imported from shared packages.
- Client‑shared UI/logic (product card used across website & landers) → `clients/<slug>/packages/`.
- Separate application with different auth, domain, or tech stack → `apps/`.
- Persistent backend logic (event ingestion, queue worker, review scraper) → `services/`.

### Scaffold automation

`scripts/scaffold-client.sh` does the following:

1. Copies `_client-blueprint` container → `clients/<slug>/`.
2. Prompts for slug, brand name, domain, and scale type (single/multi-location/multi-domain/multi-region/headless/multilingual).
3. Asks which page types are needed (About, Services, Contact, etc.). For each, a unique layout specification is generated, not a pre‑built template.
4. Asks: “Include SEO? Analytics? Paid Ads? Content? Automation? Reputation? i18n? Compliance? Observability? Experimentation? Ecommerce?”
5. If Analytics or Paid Ads selected: "Does this client serve EU/UK/Swiss traffic?" — if yes, Google Consent Mode v2 wiring becomes non‑optional. If contact page selected, generates a layout spec that uses `automation`'s `submitContactForm` Server Action wired to a client‑owned form built with headless inputs and buttons.
6. Updates `package.json` with selected packages, injects Tailwind tokens from `branding`, writes `.env.example` (only selected services), generates Terraform stub.
7. Generates `Home`, `Privacy`, and a `style‑guide` page. For each selected page type, generates a unique layout specification (JSON), then renders it using headless primitives and client tokens. Sets up contact form wiring (behavior only) if contact selected.
8. Commits to branch `onboard/<slug>` and opens PR.

### Testing consistency

- **Unit/Integration:** Each sub‑project has `src/__tests__/` with a homepage render test at minimum. Shared packages test all public exports.
- **Client‑level e2e:** Optional `e2e/` directory per sub‑project; runs in CI when `e2e-changed-clients.yml` fires. Scaffold generates Playwright spec for contact form if chosen.
- **Cross‑client smoke:** Top‑level `e2e/` Playwright suite tests all live sitemaps after shared package changes; catches regressions globally.
- **Visual regression:** Visual regression tests are scoped to key pages per client (homepage, contact, pricing) and run when shared `headless-ui` changes. Tests use AI-assisted diff tools to ignore content changes and flag only layout/behavior regressions.

## 4. Integrations Map

| Category        | Tool / Platform                                         | Handled by Package(s)                       | Notes                                                                                                                                                                                        |
| --------------- | ------------------------------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Analytics       | GA4, Plausible, Fathom, Mixpanel                        | `analytics`                                 | Provider wrappers, consent‑aware loading. <br>Agency-side analytics (aggregate benchmarks) use the internal anonymization service; no third-party tool required beyond the raw data stores.  |
| Ads             | Meta, Google, LinkedIn, TikTok Ads                      | `paid-ads`                                  | Pixel components, conversion tracking, UTM                                                                                                                                                   |
| SEO / AEO       | Google Search Console, Bing Webmaster                   | `seo-aeo` (sitemaps, verification)          | Verification files per client `public/`                                                                                                                                                      |
| Structured Data | Schema.org types (all)                                  | `seo-aeo` (schemas/)                        | JSON‑LD generators for all common types                                                                                                                                                      |
| Content (CMS)   | Sanity, Contentful, Strapi                              | `content` (connectors/)                     | Reusable wrappers; rich‑text rendering                                                                                                                                                       |
| E‑commerce      | Shopify Storefront, BigCommerce                         | `ecommerce` [opt], client `src/lib/`        | Product discovery, cart, product schemas via `seo-aeo`                                                                                                                                       |
| Reputation      | Google Business, Yelp, Trustpilot                       | `reputation` (aggregators/)                 | Review sync, widgets, trust badges                                                                                                                                                           |
| Automation      | n8n, Zapier, Make (optional external sync)              | `automation` (workflows/)                   | The automation pipeline DSL is not a third-party tool; the `automation-worker` hosts a step registry validated against JSON Schema. No external workflow engine required for standard flows. |
| Email           | Mailchimp, Klaviyo, SendGrid                            | `automation` (email‑templates/)             | MJML components, transactional triggers                                                                                                                                                      |
| CRM             | HubSpot, Salesforce, Zoho                               | `automation` (webhooks/), client `src/lib/` | Form capture, lead scoring per client                                                                                                                                                        |
| Form Backend    | Supabase                                                | `automation`                                | `leads` table; per‑client project; used by `submitContactForm` Server Action                                                                                                                 |
| Scheduling      | Calendly                                                | `automation`, client `src/lib/`             | Lazy‑loaded embed on contact page; integrated with form success state                                                                                                                        |
| Compliance      | OneTrust, Cookiebot, custom CMP, Google Consent Mode v2 | `compliance` [opt]                          | Consent banner, conditional script loading, Google Consent Mode v2 helper (default‑denied initialization + update‑on‑consent for EEA/UK/Swiss traffic)                                       |
| Observability   | Sentry, LogRocket, Datadog RUM                          | `observability` [opt]                       | Error boundary, init, error pages                                                                                                                                                            |
| Experimentation | LaunchDarkly, Flagsmith, edge splits                    | `experimentation` [opt]                     | A/B splits, feature flags, tracking                                                                                                                                                          |
| Search          | Algolia                                                 | client `src/lib/` or `apps/`                | API client, UI components                                                                                                                                                                    |
| Payments        | Stripe (donations, checkout)                            | client `src/lib/`                           | Lightweight; full commerce uses `ecommerce`                                                                                                                                                  |

**Standard contact flow:** The `automation` package provides a single `submitContactForm` Server Action that chains Zod validation → Upstash rate‑limit → Supabase insert → Resend ack + notify → `analytics.trackEvent`. Any client contact page reuses this action; only env vars differ.

**Principle:** No third‑party tool gets its own top‑level directory. Every integration has a clear home in a shared package (cross‑client logic) or inside the client’s `src/lib/` (one‑off customization). The matrix is referenced during onboarding to wire the right packages from day one.

## 5. CI/CD & Operational Setup

### Workflows (`.github/workflows/`)

| Workflow                              | Trigger                                                                | Purpose                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ci.yml`                              | PR push to any branch                                                  | `turbo run lint typecheck build test --filter=[HEAD^1]`. Uses `TURBO_SCM_BASE` conditionally set to handle both pull‑request and push events correctly. Optionally skips install entirely via `turbo query affected` pre‑flight check.                                                                                                                                      |
| `deploy-client.yml`                   | Manual dispatch (client slug)                                          | Deploys a single client’s sub‑projects. For `deploymentTier: standard`, writes updated tenant config to Vercel Edge Config (no build). For `deploymentTier: dedicated`, triggers `vercel deploy --prod` against the client’s own project ID. Both paths use the same workflow file, branching on tier. Optionally runs `terraform plan`/`apply` for infrastructure changes. |
| `scheduled-seo-audit.yml`             | Weekly cron                                                            | Calls `seo-aeo` audit scripts across all production URLs; generates report artifact.                                                                                                                                                                                                                                                                                        |
| `e2e-changed-clients.yml` [opt]       | PRs touching shared packages                                           | Runs top‑level `e2e/` Playwright smoke tests against affected clients’ preview deployments.                                                                                                                                                                                                                                                                                 |
| _(new)_ `visual-regression.yml`       | PRs touching `headless-ui`, `branding`, or client token/style packages | Runs visual snapshots for affected client key pages, comparing against baselines; flags structural changes and token regressions.                                                                                                                                                                                                                                           |
| `release-packages.yml`                | Manual or main push                                                    | Bumps versions, generates changelogs, publishes internal packages.                                                                                                                                                                                                                                                                                                          |
| _(new)_ `check-docs-drift.yml`        | PRs touching `docs/` or `apps/`                                        | Lint‑style job: extracts real Next.js/Astro routes and compares to documented sitemap; fails on mismatch.                                                                                                                                                                                                                                                                   |
| _(new)_ `check-package-promotion.yml` | Scheduled or on PR                                                     | Flags when ≥2 clients define a `packages/<same-name>` with similar exports — prompts promotion review.                                                                                                                                                                                                                                                                      |

**`turbo.json` tasks** — `build`, `lint`, `typecheck`, `test`, `e2e`, `clean` — plus `format` (now defined) and `seo-audit`. `test` depends on `^build`; `e2e` depends on `^build` and is uncached. The root `package.json` includes corresponding scripts for all tasks; CI invokes `turbo run` for every job.

### Deployment Model

- **Default target:** Vercel. Standard-tier clients are served from a single, host-based multi-tenant project. A shared `web-core` runtime reads the hostname, resolves the tenant ID, fetches that tenant’s config from Vercel Edge Config (~1-5ms), and injects tokens, feature flags, and CSP. Graduated clients (noisy-neighbor, compliance, or custom domain requirements) move to dedicated Vercel projects. The graduation trigger is documented in the tenant config schema. All deployments are explicit, auditable, and per-client; no Git integration is used for deploys.
- **Enterprise-tier planning:** Budget the Vercel Enterprise-tier conversation proactively, not as a surprise at client #12. Industry guidance suggests agencies running 10+ simultaneous active client projects are already in Enterprise-tier territory for support, spend controls, and SLA reasons.
- **Hosting line item:** Price hosting as a visible line item to clients, not absorbed into margin. At 50 clients, per-project add-on creep (Speed Insights, Advanced Deployment Protection, bandwidth overages) is real money.
- **Netlify** supported via the same pattern; config file detected per sub‑project.
- **`apps/`** deployed independently as Vercel projects or Docker containers.
- **`services/`** deployed as Cloudflare Workers (`wrangler`), Docker images (GCR/ECS), or scheduled cron triggers.

### Infrastructure Provisioning

- `infrastructure/` contains reusable Terraform modules (`vercel-project`, `dns`, `assets-bucket`) and per‑client state files (`clients/<slug>.tf`).
- Scaffold generates a `.tf` stub; developers fill in domain, region, and location maps.
- Multi‑domain franchises: Terraform loops over location maps for domain aliases and DNS records.
- `deploy-client.yml` can include `terraform plan`/`apply` for PRs with infra changes — environments versioned with code.
- **Brand assets policy:** Raster brand assets (PNG/JPG logos, photography) live in the `assets-bucket` provisioned by Terraform, not committed to git. Only vector source files (SVG logo) belong in `clients/<slug>/brand-assets/`. This prevents repo bloat at 50-client scale.

### Environment Management

- Each sub‑project’s `.env.example` lists **only** the variables required by its selected services — no unused placeholders.
- `scripts/sync-env-files.sh` scans code and keeps examples aligned with actual usage.
- Secrets live in CI (GitHub Secrets, Vercel env); never committed.
- Shared packages read env via a unified config helper from `web-core`, with safe defaults.
- **Secrets governance:** Follow `docs/secrets-policy.md` for naming convention (`<CLIENT_SLUG>_<SERVICE>_KEY`), scoping (Vercel env vars per-project, not pooled at GitHub-org level), and rotation cadence. At 50 clients × ~6 services each, this represents 250–300+ discrete secrets that must be managed systematically.

### Backend Services Deployment

- `services/` are multi‑tenant; per‑client config comes from env vars or queue names — no per‑client service instances required.
- CI deploys services on directory changes via `turbo` filtering.
- The `anonymization-service` (part of `analytics-collector`) is deployed independently. It exposes a query API consumed by internal dashboards; it enforces k-anonymity thresholds and differential privacy budget before returning results.

### Smoke Test Tenant Isolation

A reserved tenant slug `_smoketest` is excluded from all billing, dashboards, and aggregate analytics queries. Every smoke test run creates data under this slug; a cleanup step truncates it post-run. This guarantees zero pollution of client data.

### CSP & Observability Wiring

- **CSP:** `web-core` exports a `generateCsp(services)` helper. During build, the selected services (analytics, ads, etc.) are passed; the generated policy is applied via proxy.ts or headers config. If the helper reads request context (e.g., from `headers()`), it must use `await` as these are async in Next.js 16+. This eliminates the drift between what's declared and what's actually needed.
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

### Affected build & deployment rules

Turborepo’s affected graph is the source of truth for what CI builds and deploys.

- `packages/headless-ui` change → rebuild and redeploy **all** client apps; run unit tests for `headless-ui` and visual regression for all key pages.
- `packages/branding` base token schema change → rebuild all consumers; run full visual regression because every client’s token layer may be affected.
- Client-specific token/style package change (e.g., `clients/<slug>/packages/*` or `clients/<slug>/website/src/styles/`) → rebuild **only** that client’s app; run visual regression scoped to that client’s homepage, contact, and pricing pages.
- Shared package with no dependent clients (e.g., an internal script) → build and test the package only; no client redeploys.
- `ci.yml` runs `turbo run lint typecheck build test --filter=[HEAD^1]`. It uses `TURBO_SCM_BASE` conditionally set to the PR base SHA or previous commit SHA, and a pre-flight `turbo query affected` step can skip the rest of the job (including install) if no relevant packages changed. Developers should only force a full build when `turbo` cannot determine the affected graph.

## 6. AI-Assisted Workflows

AI accelerates; the repo is the source of truth. Every AI agent follows the same conventions as a human developer, and all output arrives via PR.

**Note:** Cognition (the company behind Devin) acquired Windsurf in mid-2025. By early 2026, Devin is embedded directly inside the Windsurf IDE with a proprietary fast model (SWE-1.5). Windsurf and Devin are now one company's product suite, increasingly one continuous surface (interactive IDE sessions that can hand off to long-running autonomous Devin sessions without leaving the editor).

### Tool Configuration

| Tool     | Config                                                                   | Role                                                                                                                                                                           |
| -------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Windsurf | `.windsurf/rules/` directory with scoped Markdown files                  | IDE agent: understands monorepo structure, coding standards, import aliases. Rules are scoped by glob pattern (clients/**, packages/**, services/**) for targeted application. |
| Devin    | `.devin/config.yaml`, `.devin/skills/`, `.devin/playbooks/`, `AGENTS.md` | Autonomous agent: larger tasks (SEO audits, batch content, multi‑step scaffold). Triggered via `ai-tools/scripts/run-devin-task.sh`.                                           |

**Devin Configuration Mechanisms:**

| Mechanism                | What it's for                                                                                          | Fits this repo as…                                                                                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Knowledge Base**       | Long-term memory: triggers + facts ("we use Conventional Commits," "test command is `pnpm test:ci`")   | The stuff currently jammed into rules that's really "always-true facts," not task instructions                                                                                            |
| **Playbooks**            | Named, reusable, invoked-by-name task templates with steps and success criteria, stored in Devin Cloud | Client scaffold, SEO audit, batch content, ad-copy generation — replace the vague `.devin/workflows/` folder with actual named Playbooks: `scaffold-client`, `seo-audit`, `content-batch` |
| **Skills (`SKILL.md`)**  | "Exactly how this specific repo/app runs" — test commands, env setup, seed order                       | One `SKILL.md` per `apps/`, `services/`, and the root — this is the same convention Claude Code uses, so your own internal docs and your AI-tooling docs can share a format               |
| **`.devin/config.yaml`** | Custom tool definitions                                                                                | Keep as-is for this narrow purpose                                                                                                                                                        |

**Cost Governance:** Devin bills per-task compute and supports hard spend caps per session. Set a default ceiling per task type (scaffold: low; SEO audit: medium; open-ended refactor: requires explicit approval) so a Playbook doesn't run away on a bad prompt.

### Shared Prompts (`ai-tools/prompts/`)

| Prompt                                | Use Case                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `client-site-scaffold.md`             | Generates a full client container from `_client-blueprint`. Creates only requested sub‑projects and pages, wires selected service packages, configures Tailwind tokens, writes `.env.example` with only needed keys, and optionally generates a Terraform stub.                                                                                                                          |
| `seo-content-brief.md`                | Produces an AEO‑optimized content outline. Accepts keyword, brand voice, content type; outputs structured brief. Voice constraint: impersonal firm‑level, no `we`/`us`/`our`. Must include 40–60 word direct-answer block structure with FAQ/HowTo/Service schema layered underneath.                                                                                                    |
| `ad-copy-variations.md`               | Generates ad copy arrays for a product/service, platform, and character limits.                                                                                                                                                                                                                                                                                                          |
| _(new)_ `layout-spec.md`              | Generates a unique page layout specification (JSON) referencing only allowed headless components and design tokens. Accepts page type, brand personality, industry, and layout density preferences. Constraint: never repeat the same structural pattern for two consecutive clients.                                                                                                    |
| _(new)_ `page-recipe.md`              | Renders a complete page from a layout spec using headless primitives and client tokens. Outputs copy-paste code that goes into the client workspace.                                                                                                                                                                                                                                     |
| _(new)_ `content-page.md`             | Generates a complete page (e.g., blog, education lesson) using `web-core` layout, `seo-aeo` structured data, and `content` package’s `ContentSafety` + `Attribution` fields. Must tag safety level (`public-domain`/`cite-creator`/`extra-care`), include attribution copy, and lead key sections with 40–60 word direct-answer blocks with FAQ/HowTo/Service schema layered underneath. |
| _(new)_ `voice-extraction.md`         | Analyzes 2–3 client writing samples + structured interview answers to produce the 12‑parameter voice config JSON.                                                                                                                                                                                                                                                                        |
| _(new)_ `content-review-checklist.md` | Generates an inline review checklist from the client’s prohibited phrases, tone targets, and structural rules for the content review interface.                                                                                                                                                                                                                                          |

### Common AI‑Driven Tasks

- **New client scaffold:** Windsurf/Devin reads `client-site-scaffold.md` and `rules.md`, prompts for missing info, generates layout specs for requested pages, renders them using headless primitives, and opens a PR with the fully wired client directory — all visually unique.
- **Content generation:** AI writes pages using `web-core` layout and `seo-aeo` schemas. Voice is impersonal firm‑level. Generated pages are composed from headless primitives; no shared visual components are used. Education/tutorial content always populates `safety` and `attribution` fields per the `content` package.
- **SEO audit:** Devin runs `seo-aeo` audit scripts, parses results, and opens a PR with fixes (alt text, headings, schema, canonical/hreflang).
- **Ad copy creation:** Devin produces JSON arrays of ad variants, consumable by `ad-manager` or ad platforms.
- **Layout variation:** Devin adjusts an existing layout spec for a new client, ensuring structural uniqueness while preserving token constraints.
- **Package addition:** Windsurf knows to add a dependency, import the component, and place it—all per `rules.md`.
- **Infrastructure generation:** For complex clients, Devin extends the Terraform stub with domain aliases, location loops, or asset buckets based on the selected scaling pattern.
- _(new)_ **Contact form wiring:** When a client opts into contact, Devin scaffolds the route with client-owned form components wired to the shared `submitContactForm` Server Action, Calendly lazy‑load, and analytics event tracking.
- _(new)_ **Content voice onboarding:** Devin runs `voice-extraction.md` on provided samples, outputs the voice parameter object, and commits it to the client’s config.
- _(new)_ **Review feedback loop:** The content review interface logs review decisions tagged by voice parameter; Devin periodically analyzes these tags and proposes parameter adjustments to tighten the voice profile.

### Rules & Constraints

**Windsurf Rules (`.windsurf/rules/`):**

- `clients.md` (glob: clients/**): container conventions, voice rules, a11y standards
- `packages.md` (glob: packages/**): public API testing, no barrel exports, stricter standards
- `headless-ui.md` (glob: packages/headless-ui/**): primitives must never add visual styling; only accept className and tokens
- `services.md` (glob: services/**): multi-tenant isolation rules, backend patterns
- `ai-tools.md` (always-on): repo-wide conventions (naming, imports, PR-only)

**Shared Constraints (in `AGENTS.md` and `ai-tools.md`):**

- No duplication: use shared packages; client‑specific logic lives in `src/lib/`.
- Naming: routes `kebab-case`, components `PascalCase`.
- Imports: `@packages/` alias from `config/tsconfig.base.json`.
- **Content voice:** all copy must use impersonal, firm‑level voice — no `we`/`us`/`our`. AI prompts enforce this; any first‑person copy is forbidden.
- **Accessibility:** all generated forms must use `role="alert"` on errors; cookie consent must have `role="dialog"`, focus trap, neutral Escape dismiss.
- **Visual composition:** all AI-generated UI must use only `headless-ui` primitives and `branding` tokens. Raw CSS values or hard‑coded colors are forbidden. Visual layout specs must be structurally distinct from the last three clients delivered.
- Testing: at least one unit test per new component; mandatory for shared packages.
- AI output always via PR — never directly to main.
- **Automation pipelines:** Automation pipelines generated by AI must use only declared steps from the registry and conform to the JSON graph schema; no custom code branches.

### Extending AI Capabilities

- Add prompt files to `ai-tools/prompts/`.
- Update relevant `.windsurf/rules/*.md` files when conventions change.
- For complex multi‑step tasks, create a new Devin Playbook (stored in Devin Cloud) and reference it in `run-devin-task.sh`.
- Add `SKILL.md` files to new `apps/` or `services/` directories to capture test commands, env setup, and seed order.

## 7. Onboarding a New Client

### Step 1: Run the scaffold script

```bash
./scripts/scaffold-client.sh
```

| Prompt                  | Example                                                                                                                | Effect                                                                                                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Client slug             | `acme-corp`                                                                                                            | Creates `clients/acme-corp/` from `_client-blueprint`                                                                                                                   |
| Brand name              | Acme Corp                                                                                                              | Populates `package.json` names, Tailwind config                                                                                                                         |
| Domain                  | acme.com                                                                                                               | Sets config, Vercel project slug                                                                                                                                        |
| Scale type              | single / multi-location / multi-domain franchise / multi-region / headless / multilingual                              | Configures routing, Terraform stub complexity, and i18n setup if multilingual                                                                                           |
| Sub‑projects needed     | y/n: website, blog, landers, admin, client packages                                                                    | Removes unused sub‑directories                                                                                                                                          |
| Page types needed       | About, Services, Blog, Contact, Education, etc.                                                                        | Home, Privacy, and style-guide always generated; for each selected type, a unique layout spec is generated (layout density, structural style, section order randomized) |
| Services needed         | y/n: SEO, analytics, ads, content, automation, reputation, i18n, compliance, observability, experimentation, ecommerce | Adds packages to each sub‑project’s `package.json`; wires providers/components; enables form handler if automation selected                                             |
| Content voice interview | y/n, then 2–3 writing samples + structured questions                                                                   | If yes, triggers the voice‑extraction AI pass and generates the 12‑parameter voice config JSON in the client’s container.                                               |
| Deploy target           | vercel / netlify                                                                                                       | Generates platform‑specific config per sub‑project                                                                                                                      |
| Generate infrastructure | y/n                                                                                                                    | Creates `infrastructure/clients/<slug>.tf` stub                                                                                                                         |

Script commits to `onboard/<slug>` and opens a PR. All generated files follow `rules.md` and pass CI. **Only the selected services appear in `.env.example`**; no unused placeholder keys. If `automation` is selected, the contact page is set up with client-owned form components wired to the shared `submitContactForm` Server Action (behavior only).

### Step 2: Manual touches (post‑scaffold)

- Add brand tokens in `tailwind.config.js` (colors, fonts from guidelines) — extend, never override, the base `branding` tokens.
- Replace placeholder brand assets (`brand-assets/`).
- Configure content source: drop static data into `src/data/` or wire CMS via `@packages/content` connector.
- Set environment variables in Vercel/Netlify (API keys, analytics IDs, Supabase URL, Resend key, Upstash tokens) — exactly as listed in `.env.example`.
- Validate structured data locally (Google Rich Results Test) and test canonical/hreflang tags if applicable.
- Customize consent banner text if `compliance` package used; ensure `CookieConsent` behavior is tested (Escape dismiss, accept/reject flows).
- Add client’s production URL to `scheduled-seo-audit.yml`.
- If infrastructure generated: fill in actual domain, DNS zone ID, and run `terraform plan`.
- **Layout spec review:** review generated layout specs for uniqueness and brand fit. Adjust the layout spec JSON directly to change structure; the renderer will rebuild the page. Do not edit generated code manually unless necessary.
- **Token audit:** verify that no raw colors, fonts, or spacing values appear in the client code — all must come from `@packages/branding` tokens.
- **Voice audit:** verify all scaffolded copy (home, about, services, contact) uses impersonal firm‑level voice — no `we`/`us`/`our`. Correct any deviations (e.g., homepage process headings).
- Validate the generated voice config by generating 2–3 sample pieces and running them through the review checklist; adjust parameters if needed.
- Verify the client’s `tenant-config` includes correct `deploymentTier` and that the `deploy-client.yml` will target the right project.

### Step 3: Pre‑launch checklist

- [ ] Confirm Next.js major version and `proxy.ts`/`middleware.ts` naming match current framework version before scaffold generation
- [ ] Lighthouse ≥ 90 mobile performance; accessibility score ≥ 95
- [ ] All structured data validates; canonical/hreflang tags correct
- [ ] Sitemap accessible at `/sitemap.xml`; routes match actual implementation
- [ ] `robots.txt` not blocking critical paths and explicitly allows AI crawlers (OAI-SearchBot, PerplexityBot, Google-Extended, ClaudeBot)
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
- [ ] Visual uniqueness check: compare homepage and key landing page structures against a library of previously delivered client pages. Flag if any structural duplication is too close
- [ ] Visual regression snapshots taken for homepage, contact, and other key pages
- [ ] Token usage audit passes (no hard‑coded colors)
- [ ] Smoke tests pass using reserved `_smoketest` tenant; no test data leaks into production analytics
- [ ] Content voice config produces output that passes automated review checks for at least 3 test prompts
- [ ] Tenant config validates against `@packages/tenant-config` schema in CI

### Ongoing: scale‑triggered additions

- **Multi‑location:** Add `[location].astro` route; map CMS location fields; per‑location schema from `seo-aeo`.
- **Multi‑domain franchise:** Enable host‑based proxy.ts; Terraform loop over location map; `seo-aeo` handles per‑domain canonical/hreflang.
- **Multi‑region:** Duplicate client container with adjusted locale/domain; share `@packages/branding` tokens.
- **Single‑domain multilingual:** Add `@packages/i18n` if not already selected; configure locale routes and hreflang.
- **Separate portal/app:** Create `apps/<slug>-portal`; import shared packages; add to `turbo.json` build list.
- **Client‑scoped library:** Add `packages/<lib>` inside client; already covered by workspace glob.

No step exceeds a few minutes; the monorepo automates the rest.

## 8. Scalability & Performance

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
- Headless primitives are tree‑shaken; each client bundles only the behaviors used. Visual customization lives entirely in client workspace, not shared packages.

### Client isolation & payload

- Zero cross‑client imports; each client container is isolated.
- Shared packages are tree‑shaken: importing `@packages/analytics` bundles only the configured provider.
- Heavy deps (Algolia, Shopify, i18n locale files) live in the client’s `package.json`, never hoisted into shared packages. `i18n` loads translation files on demand per locale.
- The `_client-blueprint` starts minimal; only selected services add weight.

### Scaling patterns (quick reference)

| Pattern                                     | Setup                                                                                          | Performance                                                                                |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Single site                                 | `clients/<slug>/website/`                                                                      | Lightweight, fast build                                                                    |
| 200+ location pages (single domain)         | Astro `[location].astro` + CMS, ISR fallback                                                   | No git bloat, no build timeout                                                             |
| Multi‑domain franchise (50+ domains)        | Single Next/Astro app with host‑based routing via proxy.ts; Terraform loops over domains       | One deploy, infinite domains; per‑domain data from CMS                                     |
| Multi‑region                                | Separate client containers (`acme-us/`, `acme-uk/`) sharing `branding` tokens                  | Independent deploys, shared design                                                         |
| Single‑domain multilingual                  | `website/` + `@packages/i18n`; locale routes, on‑demand translation loading                    | Per‑locale bundles; hreflang via `seo-aeo`                                                 |
| Headless commerce                           | Client `website/` + optional `ecommerce` package; product pages rendered via `src/lib/shopify` | SSR marketing, CSR cart; product schemas from `seo-aeo`                                    |
| Separate apps (portals)                     | `apps/<name>`                                                                                  | Own deploy, still shares `@packages/`                                                      |
| Multi‑tenant shared hosting (small clients) | Host‑based routing in a single Vercel project; per‑client config in Edge Config                | Near‑zero marginal cost; sub‑5ms config reads; graduation to dedicated project when needed |

### Monitoring & guardrails

- `observability` package (opt‑in) enables RUM, error tracking, and **automated performance budgets**: Lighthouse ≥ 90 and a11y score enforcement per sub‑project in CI, configurable per client.
- Weekly Lighthouse + SEO crawl on all production URLs via `scheduled-seo-audit.yml`.
- `e2e-changed-clients.yml` smoke tests guard against global regressions after shared package changes.
- Visual regression suite scoped per client; only key pages tested to keep CI fast. AI-assisted diffing filters content noise from structural regressions.
- Differential privacy budget monitoring: track cumulative ε spend per dataset; alert when budget approaches limit.
- K‑anonymity suppression monitoring: report number of suppressed segments due to insufficient client count; triggers a growth‑target review.
- Automated re‑identification tests run monthly against public datasets; results logged and signed.

### Proven practices

- No barrel exports in shared packages → maximizes tree‑shaking.
- `next/dynamic`, React `lazy` for below‑the‑fold components (Calendly, chat widgets, heavy embeds).
- Optimized images: `next/image`, Astro’s Image component, CDN‑cached.
- Full audits on schedule, not every commit.
- For extreme growth (100+ clients), consider extracting shared packages to an internal registry — unnecessary at 50.
- Client‑scoped packages keep cross‑client sharing tight without polluting global `packages/`.

## 9. Maintenance & Evolution

### Adding a new shared package

1. Create `packages/<name>/` with `package.json`, `tsconfig.json` (extends `config/tsconfig.base`).
2. Register in `turbo.json` pipeline if needed (build, lint, test). Ensure `test` script exists and covers public API.
3. Update `docs/package-catalog.md` and `docs/service-pillars.md`.
4. Clients opt‑in by adding the dependency to their sub‑project `package.json`.
5. If the package includes UI components, they must be headless (accept `className`, impose no visual style). High‑level layout components (Hero, Pricing, etc.) are never added to shared packages.

**`tenant-config` specifically:**

1. Create `packages/tenant-config/` with Zod schema, TypeScript types, and a build step that publishes the schema for CI consumption.
2. All consumers (runtime, CI, portal) import from this package. Breaking schema changes require a migration guide and coordinated bump across all consumers.

### Adding a new backend service

1. Create `services/<name>/` with its own deploy config (wrangler, Dockerfile, etc.).
2. Ensure multi‑tenant isolation (per‑client env vars, queue names, or domain routing).
3. Add to `turbo.json` if it should be built/linted in CI; deploy independently via CI or manual trigger.
4. Document in `docs/integrations-map.md` and `docs/service-pillars.md`.

**`anonymization-service` guidance:** The anonymization service is a thin layer in front of the raw analytics store. When adding it, define the query API, privacy budget ledger, and k‑anonymity enforcement logic as a standalone module with its own test suite.

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
- When `headless-ui` changes its API, all recipes in `docs/recipes/` must be updated and tested. A migration guide is provided for client projects that used previous API versions.
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
5. Delete or anonymize the client's data in shared multi-tenant stores (leads table, analytics properties) per data-retention policy. This is required for GDPR "right to erasure" for EU-based clients and good practice regardless.
6. Merge removal; zero impact on other clients.

### Client‑scoped packages maintenance

- Treat like any other package, but owned within the client container.
- When a client ends, their scoped package is removed with the container.
- If a scoped package becomes genuinely cross‑client, promote it to `packages/` after review. The CI `check-package-promotion.yml` workflow flags candidates.

### Versioning strategy

- Adopt `changesets` with **independent versioning** once the monorepo has more than one client in production. Shared packages (e.g., `packages/headless-ui`) and client apps must be able to release on different cadences.
- `packages/headless-ui` can ship `v2.1.0` while a client app remains on `v1.5.3`; consumer upgrades are driven by automated bump PRs, not forced lock-step releases.
- Manual version bumps are acceptable only during the initial migration and the first few clients. Switch to `changesets` before client count reaches ten.
- Breaking `packages/headless-ui` releases require a migration guide in `docs/recipes/migrations/` and an automated PR that bumps all affected `clients/*` consumers.

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
- **Visual similarity scan:** quarterly, compare key page structures across active clients to detect accidental duplication. Flag any that exceed a similarity threshold for review.
- **Privacy budget audit:** Monthly check that ε spend is within planned limits and re-identification tests pass.
- **Content voice drift:** Quarterly, re-run the voice extraction on recent client writing samples and compare against the stored profile; flag significant divergence for review.

## 10. Operational Guardrails & Developer Workflows

This section closes the gap between architecture and daily execution: how tokens reach components, how CI decides what to build, how tests prove correctness, how versions stay independent, and how developers choose where a change belongs.

### 10.1 Runtime Theming & Token Injection

- `packages/headless-ui` components must reference **CSS custom properties only** (e.g., `var(--color-bg-primary)`, `var(--font-heading)`, `var(--space-4)`, `var(--radius-md)`). No hard-coded hex codes, pixel values, or visual assumptions are allowed inside headless primitives.
- Each client app injects its token values through a runtime token layer: a `ThemeProvider` component, a root CSS file, or the client’s Tailwind config extending `packages/branding`. `packages/branding` owns the token schema and default CSS variables; client overrides live in `clients/<slug>/website/src/styles/` or a client-scoped `clients/<slug>/packages/*` package.
- **Rule:** A PR that modifies `packages/headless-ui`, shared hooks, or data-access packages must not contain literal color, spacing, font, radius, or shadow values. Styling values are strictly the domain of the consuming app’s token layer.
- **Multi‑tenant theming:** In a multi-tenant deployment, the `ThemeProvider` receives its token values from the tenant config fetched via Edge Config at request time. The `tenant-config` schema ensures the shape matches `packages/branding` expectations.

### 10.2 Affected Build & Deployment Pipeline

Turborepo’s affected/filter commands are the deployment gate.

- If `packages/headless-ui` changes, CI rebuilds and redeploys **all** client apps (behavior change is global).
- If a client-specific token or style package changes (e.g., `clients/<slug>/packages/*` or `clients/<slug>/website/src/styles/`), CI rebuilds **only** that client’s app and any shared package that imports it.
- If `packages/branding` base token schema changes, CI rebuilds all consumers but may skip clients whose token layer has pinned to an older compatible version.
- `turbo run build --filter=[HEAD^1]` uses `TURBO_SCM_BASE` conditionally set: on pull requests, it’s the PR base SHA; on pushes, the previous commit SHA. A pre‑flight `turbo query affected` step can skip the entire job (including install) if no relevant packages changed.
- **Tenant-config validation:** A change to `packages/tenant-config` schema triggers a validation check against all existing client configs in Edge Config/CI to prevent broken deploys.

### 10.3 Dual-Layer Testing Strategy

| Package Type                                           | Testing Strategy                                                                                                                   | Tooling                               |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `packages/headless-ui`, shared hooks, shared logic     | **Unit and logic tests.** Test keyboard navigation, state changes, ARIA contracts, and data mocks. No DOM visuals required.        | Vitest / Jest + React Testing Library |
| Client apps (`clients/<slug>/website/`) | **Visual regression tests.** Render key pages and compare against baseline screenshots to catch token, layout, or CSS regressions. | Playwright / Chromatic / Percy        |
| `packages/branding` token values                       | **Token contrast and visual regression checks.** Ensure token combinations still pass WCAG contrast and match brand baselines.     | Playwright + APCA/contrast lint       |
| `automation` steps                                     | Unit tests for each step’s logic; integration tests for the pipeline executor with a real DB fixture                               | Vitest + test DB                      |
| `seo-aeo`                                              | Snapshot tests for JSON‑LD output; integration tests for sitemap generation                                                        | Vitest                                |
| `analytics-collector` / anonymization                  | Unit tests for k‑anonymity suppression logic; property‑based tests for DP noise injection (ε budget accounting)                    | Vitest + fast‑check                   |
| `content`                                              | Unit tests for voice parameter injection into prompt templates; integration tests for the render pipeline                          | Vitest                                |

**Rules:**

- A PR touching `packages/headless-ui` must pass **unit tests** before merge.
- A PR touching client tokens or client-specific layout code must pass **visual regression** on that client’s key pages before deployment.
- Visual regression baselines are stored per client and only updated intentionally, never by content-only changes.

#### Smoke Test Isolation Rule

All smoke tests target the reserved `_smoketest` tenant. A global `isSmokeTestTenant()` helper gates exclusion from billing, dashboards, and aggregate analytics. Each CI run truncates the `_smoketest` data at the end, even on failure.

### 10.4 Independent Versioning & Release Strategy (Changesets)

Adopt `changesets` for independent versioning of shared and client-scoped packages.

- `packages/headless-ui` can release `v2.1.0` while a client app remains on `v1.5.3`.
- A breaking release of `packages/headless-ui` triggers an automated PR that bumps the dependency for all `clients/*` consumers. Consumers upgrade on their own schedule, guided by a migration doc in `docs/recipes/migrations/`.
- Client-scoped packages and firm apps version independently from shared packages.
- Manual version bumps are allowed only while the monorepo has fewer than ten shared packages; switch to `changesets` before client count reaches ten.

### 10.5 Developer Decision Matrix

| Question                                                           | Answer               | Action                                                                                                                                                        |
| ------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Does this UI element have complex keyboard / a11y logic or state?  | Yes                  | **Create in `packages/headless-ui`.** Export logic and hooks only; no visual style.                                                                           |
|                                                                    | No                   | **Skip `packages/headless-ui`.** Build directly in the client app or a client-scoped style package.                                                           |
| Will more than one client need this specific visual look?          | Yes                  | **Create a client-scoped shared style package** under `clients/<slug>/packages/`. Promote to `packages/` only if it is genuinely cross-client and headless.   |
|                                                                    | No (client-specific) | **Create directly inside that client’s app** (`clients/<slug>/website/src/components/`).                                                                      |
| Are we changing only colors / spacing of an existing component?    | —                    | **Edit the client’s token layer** or `packages/branding` token override. Do **not** touch the component code.                                                 |
| Does this client need a workflow beyond the standard contact form? | Yes                  | **Compose a new pipeline in the client’s config** using existing steps. Write a custom step only if the needed logic genuinely doesn’t exist in the registry. |
|                                                                    | No                   | **Use the default `submitContactForm` pipeline** — no config changes needed.                                                                                  |

**Operational principle:** Behavior is shared; visuals are client-owned. When in doubt, keep the change in the client container.


## Appendix A: Migration from Existing Firm Repository

The current repository (`ydm-agency`) is a functional monorepo with the agency website and seven `@ydm-agency/*` packages. It must be realigned to the target blueprint before onboarding the first external client. This appendix is the ordered migration plan.

### A.1 Package Reorganization

| Current Package         | Target Location                                                                | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@ydm-agency/ui`        | `packages/headless-ui` + `clients/ydm/website/src/styles/`                     | Extract only behavior and accessibility logic into headless primitives (`ButtonBase`, `DialogBase`, etc.). Remove all visual styling from shared package. Move styling to client-owned code. Delete `Hero`, `Features`, `Pricing`, `Card`, `Container`, and any purely visual layout components. Keep `CookieConsent` as headless base, styling moved to client. `Header`/`Footer` become client-owned, optionally using headless navigation primitives. |
| `@ydm-agency/forms`     | `packages/automation` (Server Action) + client-owned form components           | Extract `submitContactForm` Server Action into `automation`. Delete `LeadForm` entirely (off-voice, off-token). `ContactForm` visual component removed from shared packages; clients build their own forms using `headless-ui` inputs and buttons, wired to the shared Server Action.                                                                                                                                                                    |
| `@ydm-agency/analytics` | `packages/analytics`                                                           | Keep; wire env vars, update CSP.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `@ydm-agency/seo`       | `packages/seo-aeo`                                                             | Rename; add canonical/hreflang helpers.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `@ydm-agency/email`     | `packages/automation` (templates + sendEmail)                                  | Refresh tokens to blue accent via `branding` static hex.                                                                                                                                                                                                                                                                                                                                                                                                 |
| `@ydm-agency/utils`     | `packages/web-core` (formatDate, formatCurrency) + `packages/headless-ui` (cn) | Keep `cn` as shared utility; move formatting helpers to `web-core`.                                                                                                                                                                                                                                                                                                                                                                                      |
| `@ydm-agency/config`    | `config/` (stays)                                                              | Align `tailwind.js` content globs for new packages; add `i18n` to transpile if needed.                                                                                                                                                                                                                                                                                                                                                                   |

### A.2 Directory Restructure

1. **Create `clients/ydm/`** — move the current `apps/firm-website/` content here as `clients/ydm/website/`. Update all import paths from `@ydm-agency/*` to `@packages/*`.
2. **Scaffold `_client-blueprint`** — create a minimal blank canvas: `Home`, `Privacy`, `style-guide` page, error boundaries, token injection, consent banner. No pre‑built page templates. Include `docs/recipes/` with a few example patterns (hero, services grid, pricing) built from headless primitives for reference.
3. **Create `docs/recipes/`** directory and populate with the firm's current marketing patterns (hero, services grid, etc.) re‑implemented using headless primitives and tokens. These serve as copy‑paste examples, not importable components.
4. **Add missing directories** — `archive/` (empty), `e2e/` Playwright specs, `infrastructure/` Terraform stubs for the firm site.
5. **Retire old paths** — once migration is verified, remove the old `apps/firm-website` and `packages/@ydm-agency/*` directories.
6. **Create `packages/tenant-config/`** with the initial Zod schema and TypeScript types. Populate a config for the firm site (`clients/ydm/`) as the first tenant.

### A.3 Backend & Feature Completion

- Implement `submitContactForm` Server Action in `packages/automation`: Zod validation → Upstash rate‑limit (env‑gated) → Supabase `leads` insert → Resend ack + notify → `analytics.trackEvent`.
- Build the `automation-worker` step registry and implement the standard `submitContactForm` pipeline as the first pipeline definition.
- Add `error.tsx`, `not-found.tsx`, `loading.tsx` to `packages/web-core` and wire into `clients/ydm/website`.
- Add `role="alert"` to form errors; add `role="dialog"` + focus trap to `CookieConsent`.
- Wire analytics IDs from `NEXT_PUBLIC_*` env vars in the firm site’s `providers.tsx`.
- Generate CSP via `web-core` helper using the firm’s selected services.
- Fix voice violations: homepage process headings; enforce via CI lint.
- Enable missing `turbo.json` tasks (`format`, `test`, `e2e`) and add corresponding root scripts. Add `format` task to `turbo.json`; add `e2e` script to root `package.json`; add CI job for `test`; add visual regression workflow.
- Add Playwright specs for contact flow and cookie consent.

### A.4 Verification

- Run full CI pipeline (`lint`, `typecheck`, `build`, `test`, `e2e`).
- Lighthouse ≥ 90, a11y ≥ 95 on firm site.
- All structured data validates; sitemap matches actual routes (pass `check-docs-drift`).
- Contact form submits end‑to‑end with rate‑limit, Supabase, and email delivery.
- All existing firm‑site pages rebuilt using headless primitives and client tokens; visual output identical to pre‑migration. No high‑level visual components remain in shared packages.

### A.5 Post‑Migration Cleanup

- Update `README.md` and `AGENTS.md` to reflect new paths, package names, and route documentation.
- Add the firm’s production URL to `scheduled-seo-audit.yml`.
- Remove all `@ydm-agency` references from the codebase.
- Archive the old repository snapshot via git tag `pre-migration` for history.
