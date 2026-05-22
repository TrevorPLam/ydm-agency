---
trigger: glob
globs: packages/*/src/**/*.ts
---

<import_organization>
- Group imports: external, internal, types
- Separate groups with blank lines
- Sort imports alphabetically within groups
- Use type imports for types: `import type { X }`
- Don't use default exports
- Use named exports for public APIs
- Avoid deep import paths
- Enable organizeImports in biome.json for automatic import organization
</import_organization>
