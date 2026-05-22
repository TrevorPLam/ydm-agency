---
name: config-package-creation
description: Guide creation of shared ESLint and TypeScript config packages
---

## Purpose
Create shared configuration packages (@agency/eslint-config and @agency/typescript-config) to ensure consistency across the monorepo.

## When to Invoke
- When creating @agency/eslint-config
- When creating @agency/typescript-config
- When setting up shared config packages

## Prerequisites
- pnpm workspace configured
- Biome and ESLint installed
- TypeScript configured

## Implementation Steps

### 1. Create package directory
```bash
mkdir -p packages/eslint-config
mkdir -p packages/typescript-config
```

### 2. Initialize package.json
Use the template in `templates/package.json`

### 3. Create ESLint config
Use the template in `templates/eslint-config.js`

### 4. Create TypeScript config
Use the template in `templates/tsconfig.json`

### 5. Add exports to package.json
Configure proper exports for consumption

### 6. Install in workspaces
```bash
pnpm add -D @agency/eslint-config @agency/typescript-config -F <workspace>
```

### 7. Update workspace configs
Update eslint.config.mjs and tsconfig.json in workspaces

## Templates
- `templates/package.json` - Package structure template
- `templates/eslint-config.js` - ESLint config export
- `templates/tsconfig.json` - TypeScript config export

## Patterns
- Use extends for base configs
- Use presets for different environments
- Document configuration options

## Anti-Patterns
- Don't hardcode paths
- Don't ignore workspace-specific needs
- Don't create overly complex configs

## Related Skills
- F-004: Biome Integration Skill
- F-008: Package Scaffolding Skill
