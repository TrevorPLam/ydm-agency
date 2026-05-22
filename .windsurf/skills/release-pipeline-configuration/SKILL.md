---
name: release-pipeline-configuration
description: Guide release pipeline setup with automated versioning
---

## Purpose
Set up release pipeline with automated versioning, publishing configuration, and release notes generation.

## When to Invoke
- When setting up automated releases
- When configuring release pipeline
- When setting up publishing

## Prerequisites
- Changesets configured
- npm registry configured

## Implementation Steps

### 1. Create release workflow
Use the template in `templates/release-workflow.yml`

### 2. Configure publishing
Set up npm authentication
Reference `templates/publishing-config.yml`

### 3. Configure release notes
Use `templates/release-notes.yml`

### 4. Test release
Create a test release

## Templates
- `templates/release-workflow.yml` - Release workflow template
- `templates/publishing-config.yml` - Publishing configuration
- `templates/release-notes.yml` - Release notes generation

## Patterns
- Use semantic versioning
- Generate release notes automatically
- Publish to npm on release

## Anti-Patterns
- Don't release without tests
- Don't skip changelog generation
- Don't publish to wrong registry

## Related Skills
- G-001: Changesets Versioning Skill
