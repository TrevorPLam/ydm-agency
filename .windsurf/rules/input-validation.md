---
trigger: glob
globs: apps/**/src/**/*.ts, packages/*/src/**/*.ts
---

<input_validation>
- Validate all user inputs
- Use schema validation (Zod or similar)
- Sanitize data before storage
- Validate on the server side
- Never trust client-side validation
- Use TypeScript types for validation schemas
- Return clear validation errors
</input_validation>
