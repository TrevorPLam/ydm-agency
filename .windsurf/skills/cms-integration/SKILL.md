---
name: cms-integration
description: Comprehensive headless CMS integration guide covering Contentful, Strapi, Sanity, Prismic, and Next.js patterns for marketing agencies and multi-site content management
---

## Purpose
Guide headless CMS integration with Contentful, Strapi, Sanity, Prismic, and Next.js patterns for marketing agency multi-site content management.

## When to Invoke
- When integrating headless CMS
- When setting up content management
- When implementing multi-site CMS

## Prerequisites
- Next.js configured
- CMS account configured

## Implementation Steps

### 1. Configure CMS connection
Use the template in `templates/cms-client.ts`

### 2. Set up content types
Reference `templates/content-types.ts`

### 3. Implement data fetching
Use `templates/content-fetching.tsx`

### 4. Add preview mode
Use `templates/preview-mode.ts`

### 5. Configure caching
Use `templates/cache-config.ts`

## Templates
- `templates/cms-client.ts` - CMS client configuration
- `templates/content-types.ts` - Content type definitions
- `templates/content-fetching.tsx` - Content fetching patterns
- `templates/preview-mode.ts` - Preview mode setup
- `templates/cache-config.ts` - Caching configuration

## Patterns
- Use TypeScript for content types
- Implement ISR for caching
- Use preview mode for editors

## Anti-Patterns
- Don't fetch all content at once
- Don't ignore cache invalidation
- Don't hardcode content IDs

## Related Skills
- Next.js Best Practices Skill
- Multi-Tenant Architecture Skill
