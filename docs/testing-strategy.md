# Testing Strategy

## Overview

This document defines the testing strategy for the Agency Platform monorepo, based on 2026 best practices emphasizing risk-based testing, behavior validation, and the modern testing pyramid.

## Core Principles

### 1. Quality is a System Property
Testing alone cannot create quality. Quality emerges from:
- Modular architecture with clear boundaries
- Observability and logging
- Testable design patterns
- Operational practices

### 2. Risk Defines What Must Be Tested
Testing effort is proportional to business and operational risk:
- **Critical paths**: Authentication, payments, data persistence (E2E + integration)
- **Business logic**: Domain rules, validation (unit + integration)
- **UI components**: User interactions, accessibility (component tests)
- **Utilities**: Pure functions, helpers (unit tests with edge cases)

### 3. Feedback Speed Matters
Fast feedback loops enable rapid iteration:
- Unit tests: < 100ms per test
- Integration tests: < 1s per test
- E2E tests: < 10s per critical flow
- CI pipeline: < 5 minutes total

### 4. Test Behavior, Not Implementation
- Test user-observable outcomes
- Avoid testing internal structure (class names, private methods)
- Use black-box testing approach
- Tests should survive refactoring

### 5. Production is the Final Validator
- Monitor production telemetry
- Track defect escape rates
- Use canary deployments for high-risk changes
- Feed production insights back into test strategy

## Testing Pyramid (2026 Edition)

Based on current best practices, we target:
- **70% Unit Tests**: Fast, isolated logic validation
- **20% Integration Tests**: Component boundary verification
- **10% E2E Tests**: Critical user journey validation

### Unit Tests
**Purpose**: Validate isolated logic and business rules

**When to Write**:
- Pure functions and utilities
- Business logic with clear inputs/outputs
- Validation and transformation functions
- Algorithms and calculations

**Tools**: Vitest

**Examples**:
- Date formatting utilities
- Query builder logic
- Validation functions
- Data transformers

### Integration Tests
**Purpose**: Verify component contracts and boundaries

**When to Write**:
- Service-to-service communication
- Database operations
- API contracts
- External service integrations

**Tools**: Vitest with testcontainers or in-memory alternatives

**Examples**:
- Database repository operations
- API endpoint contracts
- Message queue integration
- Cache layer behavior

### E2E Tests
**Purpose**: Verify critical user journeys work end-to-end

**When to Write**:
- Authentication flows
- Payment processing
- Core business workflows
- Critical data operations

**Tools**: Playwright

**Examples**:
- User login/logout flow
- Booking creation and payment
- Project management workflow
- Client portal access

## Risk-Based Test Selection

### Critical Risk (E2E + Integration + Unit)
- Authentication and authorization
- Payment processing
- Data persistence and integrity
- Security-sensitive operations

### High Risk (Integration + Unit)
- Business rule validation
- API contracts
- Database operations
- External service integration

### Medium Risk (Unit + Component Tests)
- UI components
- User interactions
- Form validation
- Data transformation

### Low Risk (Unit Tests Only)
- Utility functions
- Helper methods
- Pure functions
- Type definitions

## Test Organization

### Tag-Based Execution
Tests are tagged for selective execution:

```typescript
describe('feature', { tags: ['unit', 'critical'] }, () => {
  // Critical business logic
});

describe('feature', { tags: ['integration', 'db'] }, () => {
  // Database integration tests
});

describe('feature', { tags: ['e2e', 'slow'] }, () => {
  // End-to-end user flows
});
```

### Running Tests by Tag
```bash
# Unit tests only
pnpm test --tag=unit

# Integration tests
pnpm test --tag=integration

# Critical path tests (run on every PR)
pnpm test --tag=critical

# Slow tests (run on merge to main)
pnpm test --tag=slow
```

## Coverage Targets

Coverage is a floor, not a ceiling. Focus on meaningful coverage of critical paths:

| Package | Lines | Functions | Branches | Statements |
|---------|-------|-----------|----------|------------|
| core | 90% | 90% | 85% | 90% |
| automator-engine | 80% | 80% | 75% | 80% |
| email-engine | 80% | 80% | 75% | 80% |
| reporting | 80% | 80% | 75% | 80% |
| ui | 75% | 75% | 70% | 75% |
| utils | 85% | 85% | 80% | 85% |

**Note**: Index files, type definitions, and configuration files are excluded from coverage requirements.

## Test Quality Standards

### Do's
- Test behavior and user-observable outcomes
- Use descriptive test names that explain what is being tested
- Test edge cases and boundary conditions
- Keep tests independent and isolated
- Use test data factories for reusable test data
- Mock only what's necessary for isolation
- Test error handling and failure scenarios

### Don'ts
- Don't test implementation details (class names, internal structure)
- Don't test that things "should be defined" or "should be a string"
- Don't rely on execution order between tests
- Don't use global state in tests
- Don't mock everything - use real integrations where appropriate
- Don't write tests that pass even when implementation is broken
- Don't skip edge cases and boundary conditions

## Anti-Patterns to Avoid

### Unit Test Anti-Patterns
1. **Testing implementation details**: Verifying private methods or internal structure
2. **Mocking everything**: Avoiding real integrations leads to false confidence
3. **Low-value assertions**: Tests for "should be defined" or type checks

### Integration Test Anti-Patterns
1. **Slow database state management**: Use transactional rollback instead of full schema resets
2. **Testing at wrong layer**: Don't test UI rendering in integration tests
3. **Flaky external dependencies**: Use test doubles for unreliable external services

### E2E Test Anti-Patterns
1. **Testing too many scenarios**: Reserve E2E for critical paths only
2. **Fragile data dependencies**: Set up exact state before each test
3. **Ignoring flakiness**: Fix flaky tests immediately or remove them

## CI/CD Integration

### Test Execution Strategy
- **On every PR**: Unit tests + critical integration tests
- **On merge to main**: Full test suite including E2E
- **Nightly**: Full test suite with mutation testing
- **On release**: Full regression suite + performance tests

### Pipeline Performance Targets
- Unit test suite: < 30 seconds
- Integration test suite: < 2 minutes
- E2E test suite: < 5 minutes
- Total pipeline: < 10 minutes

### Sharding Strategy
Use test sharding for parallel execution:
```bash
# Shard 1 of 4
pnpm test --shard=1/4

# Combine with tags
pnpm test --shard=1/4 --tag=integration
```

## Test Data Management

### Test Factories
Use factory functions for reusable test data:
```typescript
// packages/core/src/test-factories/user-factory.ts
export const buildUser = (overrides: Partial<User> = {}): User => ({
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'member',
  ...overrides,
});
```

### Database State
- Use transactional rollback for isolation
- Seed only necessary data per test
- Clean up after each test suite
- Use deterministic data for reproducibility

## Metrics and Monitoring

### Key Metrics
- Test execution time trends
- Flaky test rate (target: < 1%)
- Defect escape rate by test layer
- Test coverage trends
- Test maintenance effort

### Production Signals
- Monitor error rates in production
- Track which tests would have caught production bugs
- Use feature flags for canary testing
- Feed production incidents back into test strategy

## Continuous Improvement

### Regular Reviews
- Quarterly test strategy review
- Monthly flaky test cleanup
- Weekly test execution time monitoring
- Ongoing test quality assessment

### Evolution
As the codebase evolves:
- Add tests for new critical paths
- Remove tests for deprecated features
- Adjust coverage targets based on risk
- Update test strategy documentation

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Guidelines](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Testing Pyramid 2026](https://getautonoma.com/blog/unit-vs-integration-vs-e2e-testing)
