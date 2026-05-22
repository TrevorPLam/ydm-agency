---
trigger: glob
globs: packages/database/src/**/*.ts, packages/*/src/migrations/**/*.ts
---

<migration_patterns>
- Use migration files for all schema changes (never manual SQL in production)
- Name migrations descriptively with timestamp prefix
- Write reversible migrations (up and down methods)
- Test migrations on staging before production
- Use transactions for multi-step migrations
- Break large migrations into smaller, incremental changes
- Create data migrations separately from schema migrations
- Back up database before running migrations
- Use migration locking to prevent concurrent execution
- Document breaking changes in migration descriptions
- Use expand-contract pattern for non-breaking schema changes
- Add new columns first (expand), migrate data, then remove old columns (contract)
- Never modify existing migration files after they've been applied
- Use shadow database for migration testing (Prisma, Drizzle)
- Consider zero-downtime migrations for production systems
- Rollback plan should be tested and documented
</migration_patterns>
