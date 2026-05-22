---
trigger: glob
globs: packages/*/src/**/*.ts
---

<tdd_approach>
- Write tests before implementation (Red-Green-Refactor cycle)
- Write failing test first (Red)
- Make test pass with minimal implementation (Green)
- Refactor after test passes (Refactor)
- Test behavior, not implementation
- Use descriptive test names
- Keep tests independent and isolated
- Use Vitest watch mode for instant feedback during TDD
- Use vi.fn(), vi.mock(), and vi.spyOn() for mocking in Vitest
- Configure coverage with v8 provider (default, recommended, faster with Istanbul-level accuracy since v3.2.0)
- Use istanbul provider only for non-V8 environments (Bun, Cloudflare Workers)
- Set coverage thresholds in Vitest configuration
- Integrate coverage checks in CI/CD pipeline
</tdd_approach>
