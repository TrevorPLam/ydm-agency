---
name: biome-integration
description: Guide Biome installation and ESLint hybrid setup
---

## Purpose
Set up Biome 2.3+ as the primary linter and formatter with hybrid ESLint configuration for rules not yet supported by Biome. Biome 2.3 features 423+ lint rules and type-aware linting.

## When to Invoke
- When setting up linting and formatting
- When migrating from ESLint to Biome
- When configuring hybrid ESLint setup
- When leveraging Biome's type-aware linting

## Prerequisites
- pnpm workspace configured
- TypeScript configured
- Existing ESLint configuration (if migrating)

## Implementation Steps

### 1. Install Biome
```bash
pnpm add -D biome -w
```

### 2. Create biome.json
Use the template in `templates/biome.json`

### 3. Configure ESLint flat config
Use the template in `templates/eslint.config.mjs` for hybrid setup

### 4. Add scripts to package.json
```json
{
  "scripts": {
    "lint": "biome check .",
    "lint:fix": "biome check --write .",
    "format": "biome format --write ."
  }
}
```

### 5. Configure ignore patterns
Update `.gitignore` with Biome cache directory

### 6. Run initial check
```bash
pnpm lint
pnpm lint:fix
```

### 7. Update CI/CD
Replace ESLint commands with Biome in CI workflows

## Templates
- `templates/biome.json` - Biome configuration
- `templates/eslint.config.mjs` - ESLint flat config for hybrid setup

## Checklists
- `checklists/migration-checklist.md` - Migration from ESLint

## Patterns
- Use Biome for formatting and basic linting
- Use ESLint for complex rules not in Biome
- Run Biome before ESLint in CI

## Anti-Patterns
- Don't disable Biome rules in favor of ESLint
- Don't use Prettier alongside Biome
- Don't ignore Biome errors

## Related Skills
- F-005: Lefthook Git Hooks Skill
