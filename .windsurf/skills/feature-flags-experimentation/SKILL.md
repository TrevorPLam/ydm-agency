---
name: feature-flags-experimentation
description: Guide experiment framework with assignment and tracking
---

## Purpose
Guide feature flags and experimentation implementation with assignment algorithms, tracking patterns, and targeting.

## When to Invoke
- When implementing experiment packages
- When setting up A/B testing
- When configuring feature flags

## Prerequisites
- Next.js configured
- Experiment provider configured

## Implementation Steps

### 1. Configure experiment framework
Use the template in `templates/experiment-config.ts`

### 2. Implement assignment algorithms
Reference `templates/assignment-algorithm.ts`

### 3. Add tracking patterns
Use `templates/experiment-tracking.tsx`

### 4. Configure targeting
Use `templates/targeting-rules.ts`

## Templates
- `templates/experiment-config.ts` - Experiment configuration
- `templates/assignment-algorithm.ts` - Assignment algorithms
- `templates/experiment-tracking.tsx` - Experiment tracking
- `templates/targeting-rules.ts` - Targeting rules

## Patterns
- Use consistent assignment
- Track experiment exposure
- Implement rollout controls

## Anti-Patterns
- Don't change assignment mid-experiment
- Don't skip exposure tracking
- Don't ignore targeting rules

## Related Skills
- Marketing Analytics Skill
- Landing Pages Skill
