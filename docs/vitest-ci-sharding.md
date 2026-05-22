# Vitest CI Sharding Configuration

This document explains how to configure Vitest test sharding for parallel CI execution.

## Overview

Sharding splits your test suite into multiple groups that can run in parallel across different CI workers, significantly reducing total CI execution time.

## Usage

### Basic Sharding

Run tests split across 4 shards:

```bash
# Shard 1 of 4
pnpm test:shard 1/4

# Shard 2 of 4
pnpm test:shard 2/4

# Shard 3 of 4
pnpm test:shard 3/4

# Shard 4 of 4
pnpm test:shard 4/4
```

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1, 2, 3, 4]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm test:shard ${{ matrix.shard }}/4
```

### GitLab CI Example

```yaml
test:
  parallel: 4
  script:
    - pnpm install
    - pnpm test:shard $CI_NODE_INDEX/$CI_NODE_TOTAL
```

## Merging Coverage Reports

When using sharding, coverage reports are generated per shard. To merge them:

```bash
# Install nyc for merging
pnpm add -D nyc

# Run all shards (each generates coverage)
pnpm test:shard 1/4
pnpm test:shard 2/4
pnpm test:shard 3/4
pnpm test:shard 4/4

# Merge coverage reports
npx nyc merge ./.vitest-results coverage/coverage-final.json

# Generate final report
npx nyc report --reporter=lcov --reporter=text
```

## Sharding with Tags

Combine sharding with tag-based test selection:

```bash
# Run only unit tests, sharded
pnpm test --shard 1/4 --tag=unit

# Run integration tests, sharded
pnpm test --shard 1/4 --tag=integration
```

## Performance Considerations

- **Optimal shard count**: Use 2-4 shards for most projects. More shards have diminishing returns due to overhead.
- **Test distribution**: Vitest uses a deterministic hash to distribute tests evenly across shards.
- **CI resources**: Ensure your CI runners have sufficient CPU/memory for parallel execution.
- **Cache invalidation**: Each shard will have its own cache in Turborepo.

## Troubleshooting

### Uneven Test Distribution

If tests are unevenly distributed across shards, consider:
- Grouping related tests in the same file
- Using `--shard` with different seed values
- Adjusting the number of shards

### Coverage Merging Issues

If coverage merging fails:
- Ensure all shards completed successfully
- Check that coverage directories exist before merging
- Use `--clean` flag to clear old coverage data

### Flaky Tests in Sharded Environment

Sharding can sometimes expose timing-related flakiness:
- Use the `@flaky` tag for known flaky tests
- Increase retry count in CI: `retry: 3`
- Consider disabling sharding for specific test suites
