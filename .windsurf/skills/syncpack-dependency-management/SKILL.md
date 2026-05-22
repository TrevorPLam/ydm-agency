---
name: syncpack-dependency-management
description: Guide syncpack installation and version normalization
---

## Purpose
Set up syncpack to normalize dependency versions across the monorepo and ensure consistency in package.json files. Syncpack now has full support for pnpm catalogs and bun catalogs as first-class citizens.

## When to Invoke
- When setting up dependency version management
- When normalizing versions across workspaces
- When configuring catalog-aware version management
- When auto-migrating to pnpm catalogs

## Prerequisites
- pnpm workspace configured
- pnpm catalog configured

## Implementation Steps

### 1. Install syncpack
```bash
pnpm add -D syncpack -w
```

### 2. Create syncpack.config.js
Use the template in `templates/syncpack.config.js`

### 3. Configure version linting rules
Set up rules for version consistency
Reference `templates/version-rules.js`

### 4. Add scripts to package.json
```json
{
  "scripts": {
    "deps:lint": "syncpack lint",
    "deps:fix": "syncpack fix"
  }
}
```

### 5. Run initial check
```bash
pnpm deps:lint
pnpm deps:fix
```

### 6. Add to pre-commit hook
Add syncpack check to Lefthook pre-commit

### 7. Update CI/CD
Add syncpack check to CI workflow

## Templates
- `templates/syncpack.config.js` - Main syncpack configuration
- `templates/version-rules.js` - Version linting rules

## Patterns
- Use catalog for shared dependencies
- Use exact versions for production deps
- Use caret ranges for dev deps

## Anti-Patterns
- Don't ignore version mismatches
- Don't manually fix versions without syncpack
- Don't use wildcards in versions

## Related Skills
- F-001: pnpm Migration Skill
- F-005: Lefthook Git Hooks Skill
