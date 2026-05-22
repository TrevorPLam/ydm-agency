---
name: animations
description: Guide animation library integration with performance optimization and accessibility
---

## Purpose
Guide animation implementation with performance optimization and accessibility patterns.

## When to Invoke
- When implementing animation packages
- When adding motion design
- When optimizing animations

## Prerequisites
- React configured
- Motion (formerly Framer Motion) installed via `motion/react`

## Implementation Steps

### 1. Set up animation library
Use the template in `templates/animation-config.ts`

### 2. Create animation presets
Reference `templates/animation-presets.ts`

### 3. Add performance hooks
Use `templates/performance-hooks.ts`

### 4. Implement accessibility
Use `templates/accessibility.tsx`

## Templates
- `templates/animation-config.ts` - Animation configuration
- `templates/animation-presets.ts` - Animation presets
- `templates/performance-hooks.ts` - Performance hooks
- `templates/accessibility.tsx` - Accessibility patterns

## Patterns
- Use Motion (motion/react) for React animations
- Use prefers-reduced-motion
- Implement GPU acceleration

## Anti-Patterns
- Don't animate without purpose
- Don't ignore performance
- Don't skip accessibility

## Related Skills
- Component Library Skill
