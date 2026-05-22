---
trigger: glob
globs: packages/*/src/repository/*.ts
---

<repository_pattern>
- Repository interfaces must be in domain layer
- Repository implementations must be in infrastructure layer
- Use repository for all data access, never direct database calls
- Repositories must return domain entities, not data models
- Use repository for aggregate persistence
- Implement tenant isolation in repositories
- Never expose query builders from repositories
</repository_pattern>
