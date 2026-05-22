---
name: ddd-domain-package
description: Guide implementation of DDD domain package with aggregates and domain services
---

## Purpose
Implement @agency/domain with DDD patterns including aggregates, domain services, and domain events.

## When to Invoke
- When implementing @agency/domain
- When setting up DDD architecture
- When implementing domain layer

## Prerequisites
- TypeScript configured
- Value objects package completed
- Repository pattern package completed

## Implementation Steps

### 1. Create aggregate root interface
Use the template in `templates/aggregate-root.ts`

### 2. Implement domain service pattern
Reference `templates/domain-service.ts`

### 3. Add domain events
Use `templates/domain-events.ts`

### 4. Implement domain logic
Use `templates/domain-logic.ts`

### 5. Export from index.ts
Export all public APIs

## Templates
- `templates/aggregate-root.ts` - Aggregate root template
- `templates/domain-service.ts` - Domain service template
- `templates/domain-events.ts` - Domain events template
- `templates/domain-logic.ts` - Domain logic template

## Patterns
- Use aggregate roots for consistency
- Encapsulate business rules in domain
- Use domain events for side effects

## Anti-Patterns
- Don't expose internal state
- Don't put business logic in services
- Don't bypass domain invariants

## Related Skills
- D-003: Value Objects Implementation Skill
- D-002: Repository Pattern Implementation Skill
