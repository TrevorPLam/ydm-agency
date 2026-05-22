---
name: nextjs-best-practices
description: Comprehensive Next.js best practices guide covering App Router patterns, Server Components, and performance optimization
---

## Purpose
Guide Next.js 16 development with App Router patterns, Server Components, async Request APIs, and performance optimization for 2026.

## When to Invoke
- When building Next.js applications
- When implementing App Router patterns
- When optimizing Next.js performance
- When migrating to Next.js 16 breaking changes

## Prerequisites
- Next.js 16 installed
- TypeScript configured
- Node.js 18+

## Implementation Steps

### 1. Configure App Router structure
Use the template in `templates/app-structure.md`

### 2. Implement Server Components
Reference `templates/server-component.tsx`

### 3. Set up data fetching patterns
Use `templates/data-fetching.tsx`

### 4. Migrate to async Request APIs (Next.js 16 breaking change)
Next.js 16 fully removes synchronous access to Request APIs. These must be accessed asynchronously:
- `params` in layout.js, page.js, route.js, default.js, opengraph-image, twitter-image, icon, apple-icon
- `searchParams` in page.js
- `cookies()`, `headers()`, `draftMode()`

Use the Next.js codemod to migrate: `npx @next/codemod@latest async-request-apis`

Reference `templates/async-params.tsx` for migration patterns

### 5. Configure performance optimization
Use `templates/performance-config.ts`

### 6. Add routing patterns
Use `templates/routing-patterns.tsx`

## Templates
- `templates/app-structure.md` - App Router structure guide
- `templates/server-component.tsx` - Server Component template
- `templates/data-fetching.tsx` - Data fetching patterns
- `templates/async-params.tsx` - Async Request APIs migration patterns
- `templates/performance-config.ts` - Performance configuration
- `templates/routing-patterns.tsx` - Routing patterns

## Patterns
- Use Server Components by default
- Implement streaming for data fetching
- Use dynamic imports for code splitting
- Await params and searchParams in Next.js 16 (async Request APIs)

## Anti-Patterns
- Don't use Client Components unnecessarily
- Don't fetch data in Client Components
- Don't ignore Core Web Vitals
- Don't access params/searchParams synchronously in Next.js 16

## Related Skills
- F-002: Turborepo Upgrade Skill
