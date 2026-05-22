---
name: email-templates
description: Guide email template rendering with variables and testing
---

## Purpose
Guide email template implementation with rendering patterns, variable substitution, and template testing.

## When to Invoke
- When implementing email template packages
- When setting up email rendering
- When testing email templates

## Prerequisites
- Email service configured
- Template engine installed

## Implementation Steps

### 1. Set up email templates
Use the template in `templates/email-template.ts`

### 2. Implement rendering patterns
Reference `templates/template-renderer.ts`

### 3. Add variable substitution
Use `templates/variable-substitution.ts`

### 4. Configure template testing
Use `templates/template-testing.ts`

## Templates
- `templates/email-template.ts` - Email template
- `templates/template-renderer.ts` - Template renderer
- `templates/variable-substitution.ts` - Variable substitution
- `templates/template-testing.ts` - Template testing

## Patterns
- Use Handlebars for templates
- Implement responsive design
- Test email clients

## Anti-Patterns
- Don't ignore email client quirks
- Don't skip preview testing
- Don't hardcode content

## Related Skills
- Email Engine Skill
