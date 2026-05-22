---
name: package-scaffolding
description: Guide scaffolding of missing domain, infrastructure, and marketing packages
---

## Purpose
Scaffold new packages in the monorepo with proper structure, package.json configuration, and TypeScript setup.

## When to Invoke
- When creating new packages in the monorepo
- When scaffolding domain packages
- When scaffolding infrastructure packages
- When scaffolding marketing packages

## Prerequisites
- pnpm workspace configured
- TypeScript configured
- Shared config packages created

## Implementation Steps

### 1. Create package directory
```bash
mkdir -p packages/<package-name>/src
```

### 2. Create package.json
Use the template in `templates/package.json`

### 3. Create tsconfig.json
Use the template in `templates/tsconfig.json`

### 4. Create src/index.ts
Use the template in `templates/index.ts`

### 5. Add to pnpm workspace
Ensure package is in pnpm-workspace.yaml

### 6. Install dependencies
```bash
pnpm install
```

### 7. Add to turbo.json
Configure build and test tasks

## Templates
- `templates/package.json` - Package structure with exports
- `templates/tsconfig.json` - TypeScript configuration
- `templates/index.ts` - Entry point template

## Patterns
- Use @agency scope for all packages
- Configure proper exports for consumption
- Use shared config packages

## Anti-Patterns
- Don't skip package.json exports
- Don't ignore TypeScript configuration
- Don't create circular dependencies

## Related Skills
- F-007: Config Package Creation Skill
- F-001: pnpm Migration Skill
