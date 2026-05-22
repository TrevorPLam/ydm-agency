---
name: infisical-secret-management
description: Guide Infisical CLI installation and secret configuration
---

## Purpose
Set up Infisical for secure secret management across environments with proper scoping, .gitignore configuration, and CLI-based secret injection for local development and CI/CD.

## When to Invoke
- When setting up secret management
- When configuring Infisical CLI
- When setting up secret scoping
- When injecting secrets into application processes

## Prerequisites
- Infisical account
- Infisical CLI installed

## Implementation Steps

### 1. Install Infisical CLI
```bash
pnpm add -D @infisical/infisical -w
```

### 2. Login to Infisical
```bash
npx infisical login
```

### 3. Configure .gitignore
Use the template in `templates/gitignore.txt`

### 4. Set up secret scoping
Configure environment-specific secrets
Reference `templates/secret-scoping.md`

### 5. Inject secrets in CI/CD
Add Infisical injection to CI workflows

### 6. Test secret access
```bash
npx infisical env --env=dev
```

## Templates
- `templates/gitignore.txt` - .gitignore configuration
- `templates/secret-scoping.md` - Secret scoping patterns

## Checklists
- `checklists/setup-checklist.md` - Infisical setup checklist

## Patterns
- Use environment-specific secrets
- Never commit secrets to git
- Use Infisical for all sensitive data

## Anti-Patterns
- Don't hardcode secrets
- Don't commit .env files
- Don't share Infisical tokens

## Related Skills
- F-010: Infisical Secret Management Skill
