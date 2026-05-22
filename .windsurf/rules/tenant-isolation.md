---
trigger: glob
globs: packages/*/src/**/*.ts
---

<tenant_isolation>
- Always include tenant context in operations
- Use tenant-scoped JWT claims
- Use RLS for data isolation
- Never mix tenant data
- Use tenant-aware caching
- Log tenant context for debugging
- Test tenant isolation thoroughly
- Use Shared Database, Shared Schema approach by default (tenant_id column)
- Consider Database-per-Tenant only for strict regulatory compliance requirements
- Avoid Shared Database, Separate Schemas (complexity without sufficient isolation)
- Index tenant_id columns for performance
- Use RLS with session variables for database-enforced isolation
</tenant_isolation>
