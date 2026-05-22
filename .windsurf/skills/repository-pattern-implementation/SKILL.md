---
name: repository-pattern-implementation
description: Guide implementation of repository pattern with CRUD operations
---

## Purpose
Implement @agency/repository-pattern with CRUD operations, entity interfaces, and testing patterns.

## When to Invoke
- When implementing @agency/repository-pattern
- When setting up data access layer
- When implementing repository pattern

## Prerequisites
- TypeScript configured
- Package scaffolding completed

## Implementation Steps

### 1. Create entity interfaces
Use the template in `templates/entity-interface.ts`

### 2. Implement base repository
Use the template in `templates/base-repository.ts`

### 3. Implement CRUD operations
Reference `templates/crud-operations.ts`

### 4. Add testing patterns
Use `templates/testing-patterns.ts`

### 5. Export from index.ts
Export all public APIs

## Templates
- `templates/entity-interface.ts` - Entity interface template
- `templates/base-repository.ts` - Base repository template
- `templates/crud-operations.ts` - CRUD operations template
- `templates/testing-patterns.ts` - Testing patterns

## Patterns
- Use generic repository base
- Implement async CRUD operations
- Use entity interfaces for type safety

## Anti-Patterns
- Don't expose database details
- Don't use synchronous operations
- Don't ignore errors

## Related Skills
- D-004: DDD Domain Package Skill
