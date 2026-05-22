---
name: event-bus-implementation
description: Guide implementation of in-process event bus with type-safe events
---

## Purpose
Implement @agency/event-bus with type-safe events, EventBus class, event handler patterns, and testing patterns.

## When to Invoke
- When implementing @agency/event-bus
- When setting up event-driven architecture
- When implementing domain events

## Prerequisites
- TypeScript configured
- Package scaffolding completed

## Implementation Steps

### 1. Create event type definitions
Use the template in `templates/event-types.ts`

### 2. Implement EventBus class
Use the template in `templates/event-bus.ts`

### 3. Implement event handler patterns
Reference `templates/handler-patterns.ts`

### 4. Add testing patterns
Use `templates/testing-patterns.ts`

### 5. Export from index.ts
Export all public APIs

## Templates
- `templates/event-types.ts` - Event type definitions
- `templates/event-bus.ts` - EventBus class template
- `templates/handler-patterns.ts` - Event handler patterns
- `templates/testing-patterns.ts` - Testing patterns

## Patterns
- Use type-safe event definitions
- Implement async event handling
- Use dependency injection for handlers

## Anti-Patterns
- Don't use synchronous event handling
- Don't ignore event errors
- Don't create circular event dependencies

## Related Skills
- D-004: DDD Domain Package Skill
