---
name: pnpm-migration
description: Guide migration from npm to pnpm 11 with workspace configuration
---

## Purpose
Migrate the Agency Platform monorepo from npm to pnpm 11 to leverage faster installs, better disk space efficiency, workspace features, and enhanced security with minimum release age.

## When to Invoke
- When migrating package management from npm to pnpm
- When setting up pnpm workspace configuration
- When configuring pnpm catalog for dependency management
- When configuring security features (minimumReleaseAge, trustPolicy)

## Prerequisites
- Node.js 18+ installed
- Current monorepo using npm
- Backup of existing node_modules and package-lock.json files

## Implementation Steps

### 1. Install pnpm
```bash
npm install -g pnpm@11
```

### 2. Remove npm artifacts
```bash
# Remove all node_modules directories
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

# Remove all package-lock.json files
find . -name "package-lock.json" -delete
```

### 3. Create pnpm-workspace.yaml
Use the template in `templates/pnpm-workspace.yaml`

### 4. Configure catalog
Use the template in `templates/catalog-config.yaml`

### 5. Configure security features (pnpm 11)
Add security settings to pnpm-workspace.yaml:
- `minimumReleaseAge: 1440` - Delays installation of packages published less than 1 day ago (default in pnpm 11)
- `minimumReleaseAgeExclude` - Exclude specific packages from minimum release age
- `trustPolicy: no-downgrade` - Fail if package trust level has decreased
- `allowBuilds` - Replace deprecated onlyBuiltDependencies with allowBuilds map

Reference `templates/security-config.yaml` for examples

### 6. Install dependencies
```bash
pnpm install
```

### 7. Verify installation
```bash
pnpm list --depth=0
pnpm why <package-name>
```

### 8. Update CI/CD scripts
Replace `npm install` with `pnpm install` in all CI workflows
Replace `npm run` with `pnpm` in all scripts

### 9. Update documentation
Update README.md with pnpm commands
Update onboarding documentation

## Templates
- `templates/pnpm-workspace.yaml` - Workspace configuration
- `templates/catalog-config.yaml` - Catalog configuration examples
- `templates/security-config.yaml` - Security features configuration (minimumReleaseAge, trustPolicy, allowBuilds)

## Checklists
- `checklists/migration-checklist.md` - Complete migration checklist

## Patterns
- Use `pnpm add -w` for workspace root dependencies
- Use `pnpm add -D` for dev dependencies
- Use `pnpm add <package> -F <workspace>` for specific workspace

## Anti-Patterns
- Don't mix npm and pnpm commands
- Don't manually edit pnpm-lock.yaml
- Don't use npm scripts after migration

## Related Skills
- F-006: syncpack Dependency Management Skill
- F-008: Package Scaffolding Skill
