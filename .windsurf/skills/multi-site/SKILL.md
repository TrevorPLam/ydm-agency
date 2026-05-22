---
name: multi-site
description: Guide multi-site routing with isolation and configuration
---

## Purpose
Guide multi-site implementation with routing patterns, site configuration, and isolation for marketing agency client sites.

## When to Invoke
- When implementing multi-site packages
- When setting up site routing
- When configuring site isolation

## Prerequisites
- Next.js configured
- Multi-tenant architecture configured

## Implementation Steps

### 1. Configure multi-site routing
Use the template in `templates/site-routing.ts`

### 2. Set up site configuration
Reference `templates/site-config.ts`

### 3. Implement isolation patterns
Use `templates/site-isolation.ts`

### 4. Add site-specific middleware
Use `templates/site-middleware.ts`

## Templates
- `templates/site-routing.ts` - Site routing
- `templates/site-config.ts` - Site configuration
- `templates/site-isolation.ts` - Site isolation
- `templates/site-middleware.ts` - Site middleware

## Patterns
- Use subdomain or path routing
- Implement site-specific configs
- Isolate site data

## Anti-Patterns
- Don't mix site contexts
- Don't ignore site isolation
- Don't hardcode site IDs

## Related Skills
- Multi-Tenant Architecture Skill
- White-Labeling Skill
