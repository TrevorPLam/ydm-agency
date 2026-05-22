---
name: lefthook-git-hooks
description: Guide Lefthook installation and hook configuration
---

## Purpose
Set up Lefthook as the Git hooks manager for quality gates including linting, formatting, and testing before commits and pushes. Lefthook is a Go binary with no runtime dependency, enabling parallel execution by default for faster hook runs.

## When to Invoke
- When setting up Git hooks for quality gates
- When configuring pre-commit and pre-push hooks
- When setting up parallel hook execution
- When replacing Husky + lint-staged with a faster alternative

## Prerequisites
- Git repository initialized
- pnpm workspace configured
- Biome and Vitest installed

## Implementation Steps

### 1. Install Lefthook
```bash
pnpm add -D lefthook -w
```

### 2. Initialize Lefthook
```bash
npx lefthook install
```

### 3. Create lefthook.yml
Use the template in `templates/lefthook.yml`

### 4. Configure hooks
Set up pre-commit, pre-push, and commit-msg hooks
Reference `templates/hook-examples.yml`

### 5. Configure parallel execution
Use parallel execution for faster hook runs

### 6. Test hooks
```bash
git commit -m "test"
```

### 7. Add to team onboarding
Document hook requirements in onboarding guide

## Templates
- `templates/lefthook.yml` - Main Lefthook configuration
- `templates/hook-examples.yml` - Hook configuration examples

## Patterns
- Run fast checks in pre-commit (lint, format)
- Run slow checks in pre-push (test, build)
- Use parallel execution for independent checks

## Anti-Patterns
- Don't block commits with slow tests
- Don't skip hooks without reason
- Don't ignore hook failures

## Related Skills
- F-004: Biome Integration Skill
- F-003: Vitest Setup Skill
