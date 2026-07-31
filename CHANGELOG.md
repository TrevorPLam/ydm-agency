# Changelog

## [Unreleased]

### T-001 — Design Token Configuration
- Replaced placeholder slate/blue palette with YDM brand tokens.
- Updated Tailwind config to use CSS custom properties for 9 color tokens.
- Added content paths for analytics and seo packages.

### T-010 — Middleware: Subdomain Routing and Security Headers
- Added security headers: CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- Refactored middleware to apply headers to all responses while preserving subdomain rewrite logic.

### T-013 — Service Spoke Pages
- Created config-driven dynamic route generating all nine service pages.
- Added services-config.ts with ServiceConfig interface and full content for all services.
- Implemented generateStaticParams for static pre-rendering of all service spoke pages.

### T-015 — Service Process Spoke Pages
- Extended ServiceConfig with ProcessPhase interface, processPhases array, and processDisclaimer boolean.
- Added process phase data for all nine services from planning.md §7.
- Created nested dynamic route at /services/[slug]/process with breadcrumbs, disclaimer banner, phase cards, FAQs, and CTA.
- Implemented generateStaticParams for pre-rendering all nine process pages.
- Added @/* path alias to firm-website tsconfig.json.

### T-001 — Analytics
- Consent-gated script loading implemented; analytics only fire after cookie acceptance.

### T-003 — Demo App Scaffold
- Created apps/demo-restaurant/ as canonical template for all demo apps.
- Added package.json, next.config.js, tsconfig.json, tailwind.config.js following monorepo patterns.
- Implemented src/app/globals.css with design system CSS variables.
- Implemented src/app/layout.tsx with dark mode and metadata.
