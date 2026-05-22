---
trigger: glob
globs: packages/database/src/**/*.ts
---

<rls_usage>
- Always use RLS for multi-tenant data
- Set tenant context before queries using session variables (app.tenant_id)
- Create current_tenant_id() function to get tenant from session (returns NULL if not set)
- Create set_tenant() function to set tenant at connection start
- Enable RLS on all tenant-specific tables
- Create policies using current_tenant_id() for filtering
- Index tenant_id columns for RLS performance (essential for every table with RLS)
- Use composite indexes including tenant_id for better query performance
- Never bypass RLS for admin operations (use superuser bypass only when necessary)
- Test RLS policies thoroughly with different tenant contexts
- RLS doesn't apply to superusers by default
- Use tenant isolation in repositories
- Never rely on application-level filtering alone
- Consider partitioning by tenant for very large deployments (PARTITION BY HASH)
- Use EXPLAIN ANALYZE to verify indexes are being used with RLS
</rls_usage>
