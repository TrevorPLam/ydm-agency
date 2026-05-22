---
name: i18n-localization
description: Guide i18n integration with RTL support and pluralization
---

## Purpose
Guide internationalization implementation with translation loading, language detection, RTL support, and pluralization.

## When to Invoke
- When implementing i18n packages
- When adding multi-language support
- When configuring RTL layouts

## Prerequisites
- Next.js configured
- i18n library installed

## Implementation Steps

### 1. Configure i18n setup
Use the template in `templates/i18n-config.ts`

### 2. Implement language detection
Reference `templates/language-detection.ts`

### 3. Add RTL support
Use `templates/rtl-support.tsx`

### 4. Configure pluralization
Use `templates/pluralization.ts`

## Templates
- `templates/i18n-config.ts` - i18n configuration
- `templates/language-detection.ts` - Language detection
- `templates/rtl-support.tsx` - RTL support
- `templates/pluralization.ts` - Pluralization

## Patterns
- Use next-intl for Next.js
- Implement locale routing
- Support RTL layouts

## Anti-Patterns
- Don't hardcode translations
- Don't ignore RTL
- Don't skip pluralization

## Related Skills
- Next.js Best Practices Skill
