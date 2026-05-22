---
name: marketing-analytics
description: Comprehensive marketing analytics integration guide covering Google Analytics 4, Segment, Mixpanel, privacy compliance, and attribution modeling for marketing agency campaigns
---

## Purpose
Guide marketing analytics integration with Google Analytics 4, Segment, Mixpanel, privacy compliance, and attribution modeling for marketing agency campaigns and multi-site tracking.

## When to Invoke
- When setting up marketing analytics
- When integrating tracking tools
- When implementing attribution modeling

## Prerequisites
- Next.js configured
- Analytics accounts configured

## Implementation Steps

### 1. Configure analytics client
Use the template in `templates/analytics-client.ts`

### 2. Set up event tracking
Reference `templates/event-tracking.tsx`

### 3. Implement privacy compliance
Use `templates/privacy-config.ts`

### 4. Add attribution modeling
Use `templates/attribution-model.ts`

### 5. Configure multi-site tracking
Use `templates/multi-site-config.ts`

## Templates
- `templates/analytics-client.ts` - Analytics client configuration
- `templates/event-tracking.tsx` - Event tracking patterns
- `templates/privacy-config.ts` - Privacy compliance
- `templates/attribution-model.ts` - Attribution modeling
- `templates/multi-site-config.ts` - Multi-site tracking

## Patterns
- Use server-side tracking when possible
- Implement consent management
- Track meaningful events

## Anti-Patterns
- Don't track PII without consent
- Don't ignore privacy regulations
- Don't track everything

## Related Skills
- Multi-Tenant Architecture Skill
- CMS Integration Skill
