---
trigger: glob
globs: packages/*/src/**/*.ts
---

<tenant_context>
- Extract tenant ID from JWT
- Set tenant context at request start
- Propagate tenant context through calls
- Use async local storage for context
- Never hardcode tenant IDs
- Validate tenant access
- Handle missing tenant context gracefully
</tenant_context>
