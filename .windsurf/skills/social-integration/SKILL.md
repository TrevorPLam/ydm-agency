---
name: social-integration
description: Guide social sharing, login, and feed integration with OAuth patterns
---

## Purpose
Guide social integration with sharing, OAuth login, and feed integration patterns.

## When to Invoke
- When implementing social packages
- When setting up OAuth login
- When integrating social feeds

## Prerequisites
- Next.js configured
- OAuth providers configured

## Implementation Steps

### 1. Configure OAuth providers
Use the template in `templates/oauth-config.ts`

### 2. Implement social sharing
Reference `templates/social-share.tsx`

### 3. Add feed integration
Use `templates/feed-integration.ts`

### 4. Configure social analytics
Use `templates/social-analytics.ts`

## Templates
- `templates/oauth-config.ts` - OAuth configuration
- `templates/social-share.tsx` - Social sharing
- `templates/feed-integration.ts` - Feed integration
- `templates/social-analytics.ts` - Social analytics

## Patterns
- Use Auth.js v5 (formerly NextAuth) for OAuth
- Implement share buttons
- Cache social feeds

## Anti-Patterns
- Don't store OAuth tokens insecurely
- Don't ignore rate limits
- Don't skip error handling

## Related Skills
- Marketing Analytics Skill
- Component Library Skill
