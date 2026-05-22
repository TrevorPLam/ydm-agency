---
trigger: glob
globs: packages/*/eslint.config.mjs
---

<eslint_config>
- Use ESLint only for rules Biome doesn't support
- Keep ESLint config minimal
- Use flat config format
- Import from @agency/eslint-config
- Don't duplicate Biome rules in ESLint
- Focus on framework-specific rules in ESLint
- Keep ESLint config versioned
</eslint_config>
