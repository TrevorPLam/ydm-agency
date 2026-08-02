# YDM Agency - Agent Guidelines

## Project Overview
Monorepo for YDM Agency marketing firm website. Solo developer (Trevor Lam) using AI-augmented development.

## Tech Stack & Versions
- **Package Manager**: pnpm 9.15.0
- **Monorepo**: Turborepo 2.10.7
- **Framework**: Next.js 15.5.22
- **UI**: React 19.2.8
- **Language**: TypeScript 5.9.3 (strict mode enabled)
- **Styling**: Tailwind CSS 3.4.19
- **Components**: shadcn/ui (Radix primitives)
- **Theming**: next-themes (default dark mode)
- **Fonts**: Clash Display Variable via next/font/local (headings), Inter Variable via next/font/google (body)

## Project Structure
```
apps/
  firm-website/      # Main marketing site

packages/
  ui/                # shadcn/ui components (Button, Card, Header, Footer, CookieConsent, etc.)
  forms/             # ContactForm, LeadForm + Zod schemas
  analytics/         # AnalyticsProvider (GA4, PostHog, Meta Pixel), trackEvent
  seo/               # constructMetadata(), OrganizationJsonLd, FaqPageJsonLd
  email/             # React Email templates, Resend sending
  utils/             # cn(), formatCurrency(), formatDate()
  config/            # Shared ESLint, TS, Tailwind, Prettier configs
```

App-specific shared components (e.g., `ServiceSubnav`, `AuditForm`) live in `apps/firm-website/src/components/`. App-specific configuration helpers (e.g., `faq-utils.ts`, `service-labels.ts`, `service-comparison-config.ts`, `pricing-config.ts`, `audit-schema.ts`) live in `apps/firm-website/src/lib/`.

## Design System

### Color Palette
- **Background**: #0A0A0B
- **Surface**: #161618
- **Accent**: #3B82F6
- **Accent Hover**: #2563EB
- **Border**: #2A2A2E
- **Text Primary**: #F5F5F6
- **Text Secondary**: #A1A1A9
- **Error**: #F87171
- **Success**: #3B82F6 (aliased to accent)

### Typography
- **Headings**: Clash Display
- **Body**: Inter Variable
- Load via `next/font` (Inter from Google, Clash Display as local font)

### Layout
- **Max Content Width**: max-w-6xl (1152px)
- Use Container component from @ydm-agency/ui

### Components
- Use shadcn/ui components as base
- Customize with design system colors
- CookieConsent banner for analytics gating
- Scroll reveal and heavy animations are currently not implemented (`framer-motion` is not a dependency)

## Code Conventions

### TypeScript
- Strict mode enabled
- Use explicit return types for public functions
- Prefer interfaces over types for object shapes
- Use `const assertions` for literal types

### React
- Use functional components with hooks
- Server Components by default in Next.js 15
- Client Components only when needed (useState, useEffect, etc.)
- Use "use client" directive at top of file when needed

### Styling
- Use Tailwind utility classes
- Use cn() utility from @ydm-agency/utils for conditional classes
- Avoid inline styles
- Follow mobile-first responsive design

### File Naming
- Components: PascalCase (e.g., HeroSection.tsx)
- Utilities: camelCase (e.g., formatDate.ts)
- Pages: kebab-case (e.g., services/[slug]/page.tsx)

## Routing Structure (firm-website)
- `/` - Homepage
- `/services` - Services hub (9-card grid)
- `/services/[slug]` - Individual service pages (9 spokes)
- `/services/[slug]/deliverables` - Detailed deliverables / "What You Get" spoke pages
- `/services/[slug]/faq` - FAQ spoke pages with FAQPage JSON-LD
- `/services/process` - Process hub
- `/services/[slug]/process` - Process spoke pages
- `/services/compare` - Service comparison / "Which service is right?"
- `/services/pricing` - Service pricing and investment factors
- `/audit` - Free marketing audit request
- `/about` - Founder story
- `/blog` - Opinion and news
- `/blog/[slug]` - Individual blog posts
- `/education` - Technical lesson hub
- `/education/[topic]` - Topic-specific lesson listing
- `/education/[topic]/[slug]` - Individual lesson pages
- `/privacy` - Privacy policy

**Implemented in latest update**:
- `/services/[slug]/faq` - FAQ spoke pages for each service
- `/services/compare` - Service comparison and starting-point guide
- `/services/pricing` - Pricing and investment factors per service
- `/audit` - Free marketing audit request form and Server Action

**Not Yet Implemented**:
- `/contact` - Contact form (ContactForm exists in @ydm-agency/forms but no route or Server Action)
- `/demos` - Referenced from /about but not implemented
- Supabase `leads` table storage, Upstash Redis rate limiting, and GA4 `form_submission` tracking
- `next/image` optimization (no raster images currently in use), `next/dynamic` code splitting, and Lighthouse CI

## Content Guidelines

### Voice & Tone
- Impersonal firm-level voice ("YDM Agency builds...")
- Never use "we/us/our"
- Professional, direct, benefit-focused

### Business Details
- **Email**: contact@ydmagency.com
- **Response Promise**: Instant auto-ack + personal reply within 2 hours on business days
- **Primary CTA**: "Get a Free Project Outline" → /contact
- **Secondary CTA**: "Explore Services" → /services
- **No phone number at launch**
- **No testimonials/fake social proof** - process pages build trust

## Security & Compliance

### Required Headers
Implement security headers in middleware:
- Content-Security-Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

### Contact Form Security
- Honeypot field for bot detection (implemented in ContactForm)
- Zod validation via `@ydm-agency/forms`
- Upstash Redis rate limiting (5/hr per IP) - not yet implemented
- Server Actions for form submission - not yet implemented
- GA4 `form_submission` event tracking - not yet implemented

### Privacy
- Cookie consent banner (gating analytics)
- Privacy policy page at /privacy
- No data collection without consent
- Analytics scripts are blocked by the current CSP when consent is granted

## Backend Integration

### Contact Form (Not Yet Implemented)
- Next.js Server Action
- Supabase `leads` table storage
- Resend transactional emails (auto-acknowledgment + internal notification)
- Zod validation via @ydm-agency/forms

**Current State**: ContactForm component exists in `@ydm-agency/forms` with honeypot and Zod validation. `sendEmail` exists in `@ydm-agency/email` but no `/contact` route exists. The `/audit` page does have a Server Action that validates and calls `sendEmail`, which can serve as a reference for the future `/contact` implementation.

### Analytics
- GA4, PostHog, Meta Pixel via @ydm-agency/analytics
- trackEvent() function for custom events
- Cookie consent gating required

**Current State**: AnalyticsProvider exists and is consent-gated, but provider IDs are empty strings in `apps/firm-website/src/app/providers.tsx`. The current CSP does not allow the inline `dangerouslySetInnerHTML` scripts or PostHog/Meta Pixel hosts, so scripts will be blocked even after IDs are configured.

## Testing Requirements
- Unit tests for utility functions (`@ydm-agency/ui` and `@ydm-agency/forms` have tests; `@ydm-agency/utils` is untested)
- Integration tests for forms
- E2E tests for critical user flows (contact form)
- Use Playwright for E2E

**Current State**: Unit tests exist for `@ydm-agency/ui` and `@ydm-agency/forms`. `@ydm-agency/utils`, `@ydm-agency/analytics`, `@ydm-agency/email`, and `@ydm-agency/seo` are untested. E2E tests not yet implemented (`e2e/` directory is empty).

## Git Workflow
- Feature branches from main
- Commit format: `T-XXX: [task title]` for TODO tasks
- Push to main after task completion
- No force pushing

## Performance
- Optimize images with Next.js Image component (currently no `next/image` or `<img>` usage in `apps/firm-website`)
- Use dynamic imports for heavy components (currently no `next/dynamic` usage)
- Implement code splitting
- Lighthouse score targets: 90+ Performance, 95+ Accessibility (no Lighthouse CI step configured)

## Dependencies
- Use pnpm for package management
- Workspace catalog centralizes shared versions in `pnpm-workspace.yaml`
- Check for security vulnerabilities regularly
- Keep dependencies up to date
- Prefer peer dependencies where appropriate

## Deployment
- Deploy via Vercel (recommended for Next.js)
- Environment variables for secrets (Supabase, Resend, Upstash)
- Build with Turborepo
- Enable CI/CD via GitHub Actions
