---
trigger: glob
globs: packages/*/package.json
---

<package_exports>
- Always define exports in package.json
- Use subpath exports for organized APIs
- Export from src/index.ts as the main entry point
- Never export implementation details, only public APIs
- Use TypeScript types in exports
- Keep exports minimal and focused
</package_exports>
