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
- **Fonts**: Clash Display (headings) + Inter Variable (body) via next/font

## Project Structure
```
apps/
  firm-website/      # Main marketing site

packages/
  ui/                # shadcn/ui components (Button, Card, Header, Footer, CookieConsent, etc.)
  forms/             # ContactForm, LeadForm + Zod schemas
  analytics/         # AnalyticsProvider (GA4, PostHog, Meta Pixel), trackEvent
  seo/               # constructMetadata(), OrganizationJsonLd
  email/             # React Email templates, Resend sending
  utils/             # cn(), formatCurrency(), formatDate()
  config/            # Shared ESLint, TS, Tailwind, Prettier configs
```

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

### Typography
- **Headings**: Clash Display
- **Body**: Inter Variable
- Load via next/font/google

### Layout
- **Max Content Width**: max-w-6xl (1152px)
- Use Container component from @ydm-agency/ui

### Components
- Use shadcn/ui components as base
- Customize with design system colors
- Implement scroll reveals with Framer Motion
- CookieConsent banner for analytics gating

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
- `/services/process` - Process hub
- `/services/[slug]/process` - Process spoke pages
- `/about` - Founder story
- `/blog` - Opinion and news
- `/education` - Technical lesson hub
- `/education/[slug]` - Individual lesson pages
- `/privacy` - Privacy policy

**Not Yet Implemented**:
- `/contact` - Contact form (ContactForm exists in @ydm-agency/forms but no route)
- `/demos` - Referenced from /about but not implemented

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
- Upstash Redis rate limiting (5/hr per IP) - not yet implemented
- Server Actions for form submission - not yet implemented
- GA4 form_submission event tracking - not yet implemented

### Privacy
- Cookie consent banner (gating analytics)
- Privacy policy page at /privacy
- No data collection without consent

## Backend Integration

### Contact Form (Not Yet Implemented)
- Next.js Server Action
- Supabase `leads` table storage
- Resend transactional emails (auto-acknowledgment + internal notification)
- Zod validation via @ydm-agency/forms

**Current State**: ContactForm component exists in @ydm-agency/forms with honeypot and Zod validation, but no Server Action or backend wiring exists.

### Analytics
- GA4, PostHog, Meta Pixel via @ydm-agency/analytics
- trackEvent() function for custom events
- Cookie consent gating required

**Current State**: AnalyticsProvider exists but provider IDs are empty strings; CSP needs updates to allow inline/external scripts.

## Testing Requirements
- Unit tests for utility functions
- Integration tests for forms
- E2E tests for critical user flows (contact form)
- Use Playwright for E2E

**Current State**: Unit tests exist for @ydm-agency/ui and @ydm-agency/forms; E2E tests not yet implemented (e2e/ directory is empty).

## Git Workflow
- Feature branches from main
- Commit format: `T-XXX: [task title]` for TODO tasks
- Push to main after task completion
- No force pushing

## Performance
- Optimize images with Next.js Image component
- Use dynamic imports for heavy components
- Implement code splitting
- Lighthouse score targets: 90+ Performance, 95+ Accessibility

## Dependencies
- Use pnpm for package management
- Check for security vulnerabilities regularly
- Keep dependencies up to date
- Prefer peer dependencies where appropriate

## Deployment
- Deploy via Vercel (recommended for Next.js)
- Environment variables for secrets (Supabase, Resend, Upstash)
- Build with Turborepo
- Enable CI/CD via GitHub Actions
