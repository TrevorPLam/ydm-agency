---
name: remote-caching-setup
description: Guide Turborepo remote cache configuration with Vercel
---

## Purpose
Set up Turborepo remote caching with Vercel to share build artifacts across the team and speed up CI/CD.

## When to Invoke
- When setting up remote caching for team collaboration
- When configuring Vercel remote cache
- When setting up cache monitoring

## Prerequisites
- Turborepo 2.9.14+ installed
- Vercel account
- Vercel CLI installed

## Implementation Steps

### 1. Install Vercel CLI
```bash
pnpm add -D vercel -w
```

### 2. Login to Vercel
```bash
npx vercel login
```

### 3. Link project
```bash
npx vercel link
```

### 4. Configure remote cache
Use the template in `templates/turbo-remote.json`

### 5. Set up team scope
Configure team scope for shared cache
Reference `templates/team-config.json`

### 6. Test remote cache
```bash
turbo run build --remote
```

### 7. Monitor cache
Use Vercel dashboard to monitor cache hits/misses

## Templates
- `templates/turbo-remote.json` - Remote cache configuration
- `templates/team-config.json` - Team scope setup guide

## Checklists
- `checklists/cache-checklist.md` - Cache monitoring checklist

## Patterns
- Use remote cache for CI/CD
- Use local cache for development
- Monitor cache hit rates

## Anti-Patterns
- Don't ignore cache misses
- Don't cache sensitive data
- Don't disable cache without reason

## Related Skills
- F-002: Turborepo Upgrade Skill
