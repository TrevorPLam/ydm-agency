---
name: vitest-setup
description: Guide Vitest installation and configuration for monorepo testing
---

## Purpose
Set up Vitest as the testing framework for the Agency Platform monorepo with projects configuration (replaces deprecated workspaces) and coverage thresholds.

## When to Invoke
- When setting up testing infrastructure
- When configuring Vitest for monorepo
- When setting up coverage thresholds
- When configuring test environment
- When migrating from Vitest workspaces to projects

## Prerequisites
- pnpm workspace configured
- TypeScript configured
- No existing test framework (Jest, etc.)

## Implementation Steps

### 1. Install Vitest
```bash
pnpm add -D vitest @vitest/ui -w
```

### 2. Create vitest.config.ts
Use the template in `templates/vitest.config.ts`

### 3. Configure projects (replaces deprecated workspaces)
Set up projects configuration for monorepo testing
Reference `templates/projects-config.ts`
Note: Vitest workspaces are deprecated since v3.2, use projects instead

### 4. Add test scripts to package.json
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### 5. Configure coverage thresholds
Use `templates/coverage-config.ts`

### 6. Create test setup file
`tests/setup.ts` for global test configuration

### 7. Verify setup
```bash
pnpm test
pnpm test:coverage
```

## Templates
- `templates/vitest.config.ts` - Main Vitest configuration
- `templates/projects-config.ts` - Projects configuration (replaces workspaces)
- `templates/coverage-config.ts` - Coverage thresholds

## Patterns
- Use `describe`/`it` for test organization
- Use `vi.mock` for mocking
- Use `beforeEach`/`afterEach` for setup/teardown

## Anti-Patterns
- Don't use Jest-specific APIs
- Don't ignore coverage thresholds
- Don't skip tests without reason

## Related Skills
- F-004: Biome Integration Skill
- D-016: Test Utils Package Implementation Skill
