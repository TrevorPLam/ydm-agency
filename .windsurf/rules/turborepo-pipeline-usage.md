---
trigger: always_on
---

<monorepo_commands>
- Always use turbo commands from root: `turbo run build`, `turbo run test`
- Never run commands directly in packages unless debugging
- Use `turbo run dev --filter=<package>` for single-package development
- Rely on turbo caching for performance
- Use affected-only builds in CI
- Configure tasks in turbo.json using tasks schema with $schema reference
- Use dependsOn with ^ syntax for dependency task ordering (e.g., "dependsOn": ["^build"])
- Use dependsOn without ^ for same-package task ordering (e.g., "dependsOn": ["build"])
- Specify outputs for caching (e.g., "outputs": [".next/**", "!.next/cache/**"])
- Use inputs to control cache invalidation
- Set cache: false for dev tasks that should not be cached
- Set persistent: true for long-running tasks like dev servers
</monorepo_commands>
