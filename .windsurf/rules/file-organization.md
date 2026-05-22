---
trigger: glob
globs: packages/*/src/**/*.ts, apps/**/src/**/*.ts
---

<file_organization>
- Organize by feature/domain, not by file type (avoid folders like components, utils, hooks)
- Keep related files close together (co-locate components, hooks, types)
- Use barrel files (index.ts) for clean public APIs
- Keep file paths shallow and avoid deep nesting
- Use descriptive file names that reflect purpose
- Group test files next to source files in __tests__ directory
- Separate domain layer from infrastructure layer
- Keep UI components in components directory with subdirectories by feature
- Use consistent folder structure across packages
- Avoid circular dependencies through proper organization
- Keep entry points at package root (src/index.ts)
- Use clear separation between public and private APIs
- Organize shared utilities in dedicated packages
- Keep configuration files at package root
</file_organization>
