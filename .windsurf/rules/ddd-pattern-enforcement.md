---
trigger: glob
globs: packages/*/src/domain/*.ts
---

<ddd_patterns>
- Use ubiquitous language for all domain concepts (align with business terminology)
- Domain entities must contain business logic (not anemic)
- Use value objects for concepts without identity (immutable, equality by value)
- Implement repository pattern for data access
- Use domain services for business logic not belonging to entities or value objects
- Emit domain events for state changes (immutable events for eventual consistency)
- Keep domain layer independent of infrastructure
- Use aggregates to group related entities with aggregate root enforcing invariants
- Use anti-corruption layers to protect domain from external model pollution
- Define bounded contexts with clear semantic boundaries
- Use context maps to document inter-context relationships
</ddd_patterns>
