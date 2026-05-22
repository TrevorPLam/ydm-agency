---
name: component-library
description: Complete guide to building and maintaining reusable component libraries with React, TypeScript, design tokens, documentation tooling, and package distribution workflows
---

## Purpose
Guide component library creation with React, TypeScript, design tokens, documentation tooling, and package distribution for 2026.

## When to Invoke
- When building component libraries
- When setting up design systems
- When implementing shared UI packages

## Prerequisites
- React configured
- TypeScript configured
- Package scaffolding completed

## Implementation Steps

### 1. Set up design tokens
Use the template in `templates/design-tokens.ts`

### 2. Create base components
Reference `templates/base-button.tsx`

### 3. Add documentation
Use `templates/storybook-config.ts`
Note: Use @storybook/nextjs-vite (Vite-based) for faster builds and modern tooling, recommended over @storybook/nextjs (Webpack-based)

### 4. Configure build
Use `templates/build-config.ts`

### 5. Set up distribution
Use `templates/package-publish.json`

## Templates
- `templates/design-tokens.ts` - Design tokens configuration
- `templates/base-button.tsx` - Base component example
- `templates/storybook-config.ts` - Storybook configuration
- `templates/build-config.ts` - Build configuration
- `templates/package-publish.json` - Package publishing

## Patterns
- Use compound components
- Implement polymorphic components
- Use design tokens for theming

## Anti-Patterns
- Don't couple to specific frameworks
- Don't ignore accessibility
- Don't skip documentation

## Related Skills
- F-008: Package Scaffolding Skill
- F-007: Config Package Creation Skill
