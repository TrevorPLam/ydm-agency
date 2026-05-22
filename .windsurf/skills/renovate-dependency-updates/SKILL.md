---
name: renovate-dependency-updates
description: Guide Renovate bot configuration for automated dependency updates
---

## Purpose
Set up Renovate bot for automated dependency updates with dependency grouping, schedule configuration, and extensive preset support for monorepos and framework-specific groupings.

## When to Invoke
- When setting up automated dependency management
- When configuring Renovate bot
- When setting up dependency grouping
- When leveraging Renovate's extensive group presets for monorepos

## Prerequisites
- GitHub repository
- Renovate app installed on GitHub

## Implementation Steps

### 1. Create renovate.json
Use the template in `templates/renovate.json`

### 2. Configure dependency grouping
Group related dependencies together
Reference `templates/grouping-patterns.json`

### 3. Set up schedule
Configure update schedule (daily, weekly, monthly)

### 4. Configure automerge
Set up automerge for patch updates

### 5. Test configuration
Run Renovate bot in dry-run mode

## Templates
- `templates/renovate.json` - Renovate configuration
- `templates/grouping-patterns.json` - Dependency grouping patterns

## Patterns
- Group major updates separately
- Automerge patch and minor updates
- Require approval for major updates

## Anti-Patterns
- Don't automerge major updates
- Don't ignore security updates
- Don't disable Renovate without reason

## Related Skills
- F-006: syncpack Dependency Management Skill
