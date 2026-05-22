---
name: codeql-security
description: Guide CodeQL workflow configuration for security analysis
---

## Purpose
Set up CodeQL for security analysis in CI with custom queries and alerting configuration. GitHub Actions workflow security analysis with CodeQL is now generally available, enabling security scanning of workflow files. CodeQL 2.25.4+ adds enhanced security analysis including Vercel server functions support.

## When to Invoke
- When setting up security scanning in CI
- When configuring CodeQL workflow
- When adding custom security queries
- When scanning GitHub Actions workflows for vulnerabilities

## Prerequisites
- GitHub repository
- GitHub Advanced Security enabled

## Implementation Steps

### 1. Create CodeQL workflow
Use the template in `templates/codeql-workflow.yml`

### 2. Add custom queries
Reference `templates/custom-queries.ql`

### 3. Configure alerting
Set up security alerting in GitHub

### 4. Test workflow
Push to trigger CodeQL scan

### 5. Review findings
Address security vulnerabilities

## Templates
- `templates/codeql-workflow.yml` - CodeQL workflow template
- `templates/custom-queries.ql` - Custom query examples

## Patterns
- Run CodeQL on every PR
- Use custom queries for domain-specific rules
- Configure severity levels

## Anti-Patterns
- Don't ignore security alerts
- Don't disable CodeQL without reason
- Don't skip security scans

## Related Skills
- G-007: CI Pipeline Configuration Skill
