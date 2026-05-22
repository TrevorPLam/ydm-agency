---
name: dependency-cruiser-architecture
description: Guide dependency-cruiser installation and module boundary enforcement
---

## Purpose
Set up dependency-cruiser for architecture validation with DDD boundary rules and circular dependency detection. dependency-cruiser provides forbidden, allowed, and required rule structures for comprehensive dependency validation.

## When to Invoke
- When setting up architecture validation
- When enforcing module boundaries
- When detecting circular dependencies
- When validating layer architecture

## Prerequisites
- TypeScript configured
- Monorepo structure defined

## Implementation Steps

### 1. Install dependency-cruiser
```bash
pnpm add -D dependency-cruiser -w
```

### 2. Create .dependency-cruiser.js
Use the template in `templates/dependency-cruiser.js`

### 3. Configure DDD boundary rules
Set up rules for domain boundaries
Reference `templates/ddd-rules.js`

### 4. Add circular dependency patterns
Configure circular dependency detection

### 5. Add script to package.json
```json
{
  "scripts": {
    "deps:check": "dependency-cruiser src"
  }
}
```

### 6. Add to CI/CD
Add dependency check to CI workflow

## Templates
- `templates/dependency-cruiser.js` - Main configuration
- `templates/ddd-rules.js` - DDD boundary rules

## Patterns
- Enforce domain boundaries
- Prevent circular dependencies
- Validate layer architecture

## Anti-Patterns
- Don't allow cross-boundary imports
- Don't ignore circular dependencies
- Don't bypass architecture rules

## Related Skills
- D-004: DDD Domain Package Skill
