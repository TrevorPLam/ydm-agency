---
name: turborepo-upgrade
description: Guide upgrade to Turborepo 2.9.14+ with tasks schema migration
---

## Purpose
Upgrade Turborepo to version 2.9.14+ and migrate from the legacy pipeline schema to the new tasks schema for better configuration and performance.

## When to Invoke
- When upgrading Turborepo from legacy versions to 2.9.14+
- When migrating from pipeline schema to tasks schema
- When configuring watch mode for development
- When setting up remote caching

## Prerequisites
- pnpm workspace configured
- Existing Turborepo setup (legacy version)
- Backup of current turbo.json

## Implementation Steps

### 1. Install Turborepo 2.9.14+
```bash
pnpm add -D turbo@latest -w
```

### 2. Backup current configuration
```bash
cp turbo.json turbo.json.backup
```

### 3. Migrate to tasks schema
Use the template in `templates/turbo.json` as reference
Convert pipeline entries to tasks entries

### 4. Configure watch mode
Add watch mode configuration for development tasks
Reference `templates/watch-config.json`

### 5. Test configuration
```bash
turbo run build --dry-run
turbo run test --dry-run
```

### 6. Update CI/CD
Update CI workflows to use new Turborepo CLI patterns
Ensure remote cache authentication is configured

### 7. Verify build
```bash
turbo run build
turbo run test
```

## Templates
- `templates/turbo.json` - Tasks schema configuration
- `templates/watch-config.json` - Watch mode examples

## Patterns
- Use `dependsOn` for task dependencies
- Use `outputs` for cache invalidation
- Use `inputs` for file-based cache keys

## Anti-Patterns
- Don't mix pipeline and tasks schemas
- Don't use legacy CLI flags
- Don't ignore cache invalidation rules

## Related Skills
- F-009: Remote Caching Setup Skill
- F-001: pnpm Migration Skill
