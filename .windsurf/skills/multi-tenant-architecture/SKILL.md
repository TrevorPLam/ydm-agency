---
name: multi-tenant-architecture
description: Comprehensive multi-tenant architecture guide covering Next.js patterns, Vercel platforms, database design, security isolation, and scaling strategies
---

## Purpose
Guide multi-tenant architecture implementation with Next.js patterns, Vercel platforms, database design, security isolation, and scaling strategies for marketing agency client sites.

## When to Invoke
- When designing multi-tenant systems
- When implementing client site architecture
- When setting up tenant isolation

## Prerequisites
- Next.js configured
- Database configured
- Vercel account

## Implementation Steps

### 1. Design tenant isolation strategy
Use the template in `templates/tenant-isolation.md`

### 2. Configure database multi-tenancy
Reference `templates/database-schema.sql`

### 3. Implement tenant middleware
Use `templates/tenant-middleware.ts`

### 4. Set up Vercel platform configuration
Use `templates/vercel-config.json`

### 5. Configure security boundaries
Use `templates/security-config.ts`

## Templates
- `templates/tenant-isolation.md` - Tenant isolation patterns
- `templates/database-schema.sql` - Database schema template
- `templates/tenant-middleware.ts` - Tenant middleware template
- `templates/vercel-config.json` - Vercel platform configuration
- `templates/security-config.ts` - Security configuration

## Patterns
- Use subdomain or path-based routing
- Implement row-level security
- Use tenant-scoped caching

## Anti-Patterns
- Don't leak tenant data
- Don't skip tenant validation
- Don't mix tenant contexts

## Related Skills
- Next.js Best Practices Skill
- DDD Domain Package Skill
