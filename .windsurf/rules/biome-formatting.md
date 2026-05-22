---
trigger: always_on
---

<biome_formatting>
- Always format code with Biome before committing
- Use Biome for all formatting, not Prettier (10-100x faster than ESLint + Prettier)
- Configure Biome in biome.json with schema reference
- Format on save in IDE
- Run `biome check --write` for combined lint + format, `biome format --write` for format only
- Run `biome lint` for linting only
- Enable organizeImports in biome.json for automatic import organization
- Don't ignore formatting issues
- Use Biome for 90% of linting (450+ rules covering ESLint, typescript-eslint)
- Use ESLint only for complex custom rules Biome doesn't support
- Biome supports JavaScript, TypeScript, JSX, JSON, CSS, and GraphQL
- Use flat config format for ESLint when hybrid setup is needed
- Configure Biome linter rules via rule groups (correctness, style, performance, security, etc.)
- Use Biome's safe fixes automatically, review unsafe fixes manually
</biome_formatting>
