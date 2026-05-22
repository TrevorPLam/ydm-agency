---
name: value-objects-implementation
description: Guide implementation of value objects with equality and immutability
---

## Purpose
Implement @agency/value-objects with equality comparison, immutability, and validation patterns.

## When to Invoke
- When implementing @agency/value-objects
- When setting up domain value objects
- When implementing DDD patterns

## Prerequisites
- TypeScript configured
- Package scaffolding completed

## Implementation Steps

### 1. Create base value object class
Use the template in `templates/base-value-object.ts`

### 2. Implement equality comparison
Reference `templates/equality.ts`

### 3. Add immutability patterns
Use `templates/immutability.ts`

### 4. Add validation patterns
Use `templates/validation.ts`

### 5. Export from index.ts
Export all public APIs

## Templates
- `templates/base-value-object.ts` - Base value object template
- `templates/equality.ts` - Equality comparison template
- `templates/immutability.ts` - Immutability patterns
- `templates/validation.ts` - Validation patterns

## Patterns
- Use structural equality
- Ensure immutability
- Validate on construction

## Anti-Patterns
- Don't use reference equality
- Don't allow mutation
- Don't skip validation

## Related Skills
- D-004: DDD Domain Package Skill
