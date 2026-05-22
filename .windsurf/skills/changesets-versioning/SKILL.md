---
name: changesets-versioning
description: Guide Changesets installation and versioning workflow
---

## Purpose
Set up Changesets for automated versioning and changelog generation across the monorepo. Changesets is purpose-built for monorepos, enabling coordinated versioning across multiple packages and automatically updating inter-package dependencies.

## When to Invoke
- When setting up automated versioning
- When configuring changelog generation
- When setting up version bump patterns
- When implementing semantic versioning via explicit changeset declarations

## Prerequisites
- pnpm workspace configured
- Git repository initialized

## Implementation Steps

### 1. Install Changesets
```bash
pnpm add -D @changesets/cli -w
```

### 2. Initialize Changesets
```bash
npx changeset init
```

### 3. Configure .changeset/config.json
Use the template in `templates/config.json`

### 4. Set up versioning workflow
Reference `templates/workflow-guide.md`

### 5. Add version scripts to package.json
```json
{
  "scripts": {
    "changeset": "changeset",
    "version-packages": "changeset version",
    "release": "turbo run build && changeset publish"
  }
}
```

### 6. Configure CI/CD for releases
Add release workflow to GitHub Actions

## Templates
- `templates/config.json` - Changeset configuration
- `templates/workflow-guide.md` - Versioning workflow guide

## Patterns
- Use changeset for each PR
- Use semantic versioning
- Generate changelogs automatically

## Anti-Patterns
- Don't version without changeset
- Don't skip changelog generation
- Don't break semantic versioning

## Related Skills
- G-008: Release Pipeline Configuration Skill
