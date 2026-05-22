---
trigger: glob
globs: apps/**/src/**/*.tsx
---

<component_patterns>
- Use Server Components by default
- Use Client Components only for interactivity (forms, animations, event handlers)
- Mark Client Components with 'use client' at top of file
- Keep Client Components small and focused at leaf level
- Push 'use client' directive to leaf-level interactive components only
- Pass data from Server to Client Components as props
- Don't use browser APIs in Server Components
- Use Server Actions for mutations
- Avoid unnecessary client boundaries to reduce JavaScript bundle
</component_patterns>
