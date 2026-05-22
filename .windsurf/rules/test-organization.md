---
trigger: glob
globs: packages/*/src/__tests__/**/*.ts
---

<test_organization>
- Place tests in __tests__ directory next to source
- Use describe/it blocks for test structure
- Group related tests in describe blocks
- Use test helpers from @agency/test-utils
- Mock external dependencies
- Clean up after tests
- Use factory pattern for test data
</test_organization>
