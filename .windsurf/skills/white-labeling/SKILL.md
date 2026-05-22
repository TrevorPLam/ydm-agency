---
name: white-labeling
description: Comprehensive white-labeling guide covering brand customization, theme management, logo configuration, and multi-brand deployment for marketing agency client sites
---

## Purpose
Guide white-labeling implementation with brand customization, theme management, logo configuration, and multi-brand deployment for marketing agency client sites.

## When to Invoke
- When implementing white-labeling
- When setting up brand customization
- When configuring multi-brand deployment

## Prerequisites
- Next.js configured
- Multi-tenant architecture configured

## Implementation Steps

### 1. Design brand configuration schema
Use the template in `templates/brand-config.ts`

### 2. Implement theme system
Reference `templates/theme-provider.tsx`

### 3. Add logo configuration
Use `templates/logo-config.tsx`

### 4. Configure brand routing
Use `templates/brand-routing.ts`

### 5. Set up brand-specific assets
Use `templates/asset-management.ts`

## Templates
- `templates/brand-config.ts` - Brand configuration schema
- `templates/theme-provider.tsx` - Theme provider
- `templates/logo-config.tsx` - Logo configuration
- `templates/brand-routing.ts` - Brand routing
- `templates/asset-management.ts` - Asset management

## Patterns
- Use CSS variables for theming
- Implement brand-specific routing
- Store brand config in database

## Anti-Patterns
- Don't hardcode brand values
- Don't mix brand contexts
- Don't ignore brand isolation

## Related Skills
- Multi-Tenant Architecture Skill
- Next.js Best Practices Skill
