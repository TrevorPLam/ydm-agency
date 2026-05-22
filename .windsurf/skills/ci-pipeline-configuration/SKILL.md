---
name: ci-pipeline-configuration
description: Guide CI pipeline setup with affected-only builds
---

## Purpose
Set up GitHub Actions CI pipeline with affected-only builds, security checks, and performance checks.

## When to Invoke
- When setting up GitHub Actions CI
- When configuring affected-only builds
- When integrating security and performance checks

## Prerequisites
- GitHub repository
- Turborepo configured

## Implementation Steps

### 1. Create CI workflow
Use the template in `templates/ci-workflow.yml`

### 2. Configure affected-only builds
Use Turborepo's affected filter

### 3. Integrate security checks
Add CodeQL and dependency scanning

### 4. Add performance checks
Configure Lighthouse CI or similar

### 5. Test pipeline
Push to trigger CI

## Templates
- `templates/ci-workflow.yml` - CI workflow template
- `templates/security-checks.yml` - Security check integration
- `templates/performance-checks.yml` - Performance check integration

## Patterns
- Use affected-only builds for speed
- Run security checks on all changes
- Cache dependencies effectively

## Anti-Patterns
- Don't skip security checks
- Don't ignore CI failures
- Don't run unnecessary builds

## Related Skills
- G-006: CodeQL Security Skill
- F-002: Turborepo Upgrade Skill
