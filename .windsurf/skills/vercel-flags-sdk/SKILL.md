---
name: vercel-flags-sdk
description: Guide Vercel Flags SDK integration for feature flagging
---

## Purpose
Set up Vercel Flags SDK for feature flagging with type definitions, usage patterns, and provider-agnostic support. The SDK is framework-native for Next.js and SvelteKit, type-safe with full TypeScript support, and optimized for performance with precompute patterns.

## When to Invoke
- When setting up feature flag infrastructure
- When configuring Vercel Flags SDK
- When implementing feature flags
- When using provider-agnostic flag management

## Prerequisites
- Vercel project configured
- TypeScript configured

## Implementation Steps

### 1. Install Vercel Flags SDK
```bash
pnpm add @vercel/flags -F <workspace>
```

### 2. Create flag type definitions
Use the template in `templates/flag-types.ts`

### 3. Configure flag usage patterns
Reference `templates/flag-usage.ts`

### 4. Implement example flags
Use `templates/example-flags.ts`

### 5. Add to environment
Configure flags in Vercel dashboard

## Templates
- `templates/flag-types.ts` - Flag type definitions
- `templates/flag-usage.ts` - Flag usage patterns
- `templates/example-flags.ts` - Example flag implementations

## Patterns
- Use type-safe flag definitions
- Implement fallback values
- Test flag variations

## Anti-Patterns
- Don't hardcode flag values
- Don't ignore flag errors
- Don't use flags for configuration

## Related Skills
- G-004: Vercel Flags SDK Skill
