---
name: content-fetching
description: Guide content fetching, caching, and transformation with validation schemas
---

## Purpose
Guide content package implementation with fetching, caching, transformation, and validation.

## When to Invoke
- When implementing content packages
- When setting up content caching
- When transforming content data

## Prerequisites
- Next.js configured
- Validation library installed

## Implementation Steps

### 1. Set up content fetching
Use the template in `templates/content-fetcher.ts`

### 2. Implement caching strategies
Reference `templates/cache-strategy.ts`

### 3. Add transformation logic
Use `templates/content-transformer.ts`

### 4. Configure validation schemas
Use `templates/validation-schemas.ts`

## Templates
- `templates/content-fetcher.ts` - Content fetching
- `templates/cache-strategy.ts` - Caching strategies
- `templates/content-transformer.ts` - Content transformation
- `templates/validation-schemas.ts` - Validation schemas

## Patterns
- Use ISR for caching
- Implement content normalization
- Validate content types

## Anti-Patterns
- Don't fetch without caching
- Don't ignore validation
- Don't hardcode content sources

## Related Skills
- CMS Integration Skill
- Next.js Best Practices Skill
