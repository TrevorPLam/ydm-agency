# Changelog

## [Unreleased]

### T-001 — Design Token Configuration
- Replaced placeholder slate/blue palette with YDM brand tokens.
- Updated Tailwind config to use CSS custom properties for 9 color tokens.
- Added content paths for analytics and seo packages.

### T-010 — Middleware: Subdomain Routing and Security Headers
- Added security headers: CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- Refactored middleware to apply headers to all responses while preserving subdomain rewrite logic.
