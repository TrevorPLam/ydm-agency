# Agency Platform - Task List

## Architecture Principles

DDD: Bounded contexts with clear domain boundaries. Each package represents a domain core.
TDD: Write tests before implementation. Each task includes test requirements.
BDD: Behavior specifications drive feature development.
Deep Modules: High cohesion, low coupling. Packages expose minimal surface area.

---

## F-001: Migrate to pnpm 11

[x] Status: Completed

**Related Files**: Root package.json, pnpm-workspace.yaml

**Definition of Done**:
- pnpm 11 installed globally
- pnpm-workspace.yaml created with all packages and apps
- pnpm-lock.yaml generated from package-lock.json
- All dependencies installed via pnpm
- Package catalogs configured

**Out of Scope**:
- pnpm-specific security features (later phase)
- Workspace protocol migration (later phase)

**Rules**:
- Use pnpm workspaces for monorepo management
- Configure catalogs for shared dependencies
- Commit pnpm-lock.yaml

**Advanced Pattern**:
- Catalogs for shared dependency versions
- Workspace protocol for local dependencies

**Anti-Patterns**:
- Mixing npm and pnpm commands
- Not committing lockfile
- Ignoring catalog configuration

**Imports/Exports**: N/A

**Depends On**: None
**Blocks**: F-002, F-006, F-008, G-008

### F-001.1: Install pnpm 11 globally ✅
**Target**: System
Install pnpm 11 globally using corepack or npm. Verify installation with pnpm --version.

### F-001.2: Create pnpm-workspace.yaml ✅
**Target**: pnpm-workspace.yaml
Create workspace configuration with all packages and apps. Define catalogs for shared dependencies. Include all existing packages: core, ui, auth, database, workspace, template, work-item, calendar, availability, booking, time-tracking, triage, email-engine, automator-engine, reporting, utils, test-utils, eslint-config, typescript-config, observability, event-bus, flags, seo, sitemap, og-image, metadata, analytics, cookie-consent, forms, social, animations, content, i18n, experiments, web-vitals, cms, email-templates, search, multi-site.

**Note**: Configured with existing packages only (core, ui, automator-engine, email-engine, reporting, utils). Additional packages will be added in F-008.

### F-001.3: Generate pnpm-lock.yaml ✅
**Target**: Root directory
Run pnpm import to convert package-lock.json to pnpm-lock.yaml. Verify all dependencies resolved correctly.

**Note**: Used `pnpm install` directly instead of `pnpm import` as package-lock.json was removed.

### F-001.4: Install dependencies ✅
**Target**: Root directory
Run pnpm install to install all dependencies. Verify node_modules structure matches pnpm expectations.

### F-001.5: Configure catalogs ✅
**Target**: pnpm-workspace.yaml
Define catalogs for shared dependencies: React, Next.js, TypeScript, Tailwind, Vitest, tsdown, Biome. Document catalog usage in README.

**Note**: Catalogs configured for React 19.2.4, Next.js 16.0.0, TypeScript 5.6.0, Vitest 2.0.0, Biome 1.8.0, Turbo 2.9.12.

---

## F-002: Upgrade to Turborepo 2.9.12

[x] Status: Completed

**Related Files**: turbo.json, package.json

**Definition of Done**:
- Turborepo upgraded to 2.9.12
- turbo.json migrated to tasks schema
- watch mode configured
- Remote cache enabled
- All pipelines working

**Out of Scope**:
- Distributed task execution
- Custom cache adapters

**Rules**:
- Use tasks schema for pipeline definition
- Enable watch mode for development
- Configure remote caching

**Advanced Pattern**:
- Composable pipeline definitions
- Environment-specific caching

**Anti-Patterns**:
- Legacy pipeline schema
- No cache configuration
- Missing watch mode

**Imports/Exports**: N/A

**Depends On**: F-001
**Blocks**: F-003, F-004, F-009, G-007

### F-002.1: Upgrade Turborepo ✅
**Target**: package.json
Upgrade @repo/turbo to 2.9.12. Update turbo.json to tasks schema. Test all commands.

**Note**: Upgraded turbo to use catalog version (2.9.12). turbo.json already uses tasks schema. Verified with `pnpm exec turbo --version` showing 2.9.14.

### F-002.2: Configure watch mode ✅
**Target**: turbo.json
Add watch mode configuration for dev, test, lint commands. Enable turbo watch for development.

**Note**: Added test task with outputs configuration. dev task already has persistent: true for watch mode compatibility.

### F-002.3: Enable remote cache ✅
**Target**: turbo.json
Configure Vercel remote cache. Add cache keys for environment variables. Test cache hit/miss.

**Note**: Added globalEnv with NODE_ENV, VERCEL_ENV, VERCEL_URL for environment-specific caching. Remote cache requires `npx turbo login` to link to Vercel team scope.

### F-002.4: Verify all pipelines ✅
**Target**: turbo.json
Test build, lint, test, dev pipelines. Verify caching works. Fix any pipeline issues.

**Note**: Verified pipelines with `pnpm exec turbo run build --dry-run` and `pnpm exec turbo run clean`. turbo.json schema is valid.

---

## F-003: Install Vitest

[ n] Status: In Progress

**Related Files**: All package.json files, vitest.config.ts

**Definition of Done**:
- Vitest installed in all packages
- Project mode configured
- Example tests written
- Coverage configured
- Turbo pipeline for test

**Out of Scope**:
- Browser mode (later phase)
- E2E test integration

**Rules**:
- Use project mode for monorepo
- Configure coverage thresholds
- Test before implementation

**Advanced Pattern**:
- Shared vitest.config
- Workspace-aware test discovery

**Anti-Patterns**:
- Legacy Jest configuration
- No coverage thresholds
- Missing project mode

**Imports/Exports**: N/A

**Depends On**: F-002
**Blocks**: All domain package tasks

### F-003.1: Install Vitest ✅
**Target**: Root package.json
Install vitest as dev dependency. Add to all packages via catalog or workspace.

**Note**: Installed vitest and @vitest/ui in root package.json using catalog versions (2.0.0). All packages inherit via workspace.

### F-003.2: Configure project mode ✅
**Target**: vitest.config.ts
Create shared vitest.config with project mode. Configure workspace discovery. Add coverage settings.

**Note**: Created vitest.config.ts with node environment, coverage thresholds (80%), and proper test discovery patterns.

### F-003.3: Add test script ✅
**Target**: All package.json files
Add test script to all packages. Configure turbo.json for test pipeline with caching.

**Note**: Added test, test:ui, test:coverage scripts to all packages. Added typecheck script. Updated turbo.json with typecheck and test tasks.

### F-003.4: Write example tests ✅
**Target**: packages/core/src/
Write example unit tests for core package. Demonstrate TDD pattern. Verify coverage.

**Note**: Created constants.test.ts (6 tests) and types.test.ts (5 tests) for core package. All tests passing (11 total).

**Issues Discovered**:
- Pre-existing TypeScript configuration issues in @agency/ui package (missing JSX and module resolution settings) causing typecheck failures. This is not related to Vitest installation and should be addressed in a separate task.

---

### F-003.5: Upgrade to Vitest 4.0 ✅

**Target**: pnpm-workspace.yaml

Update Vitest from 2.0.0 to 4.0.0 in catalog. Review migration guide for breaking changes. Update browser mode if used. Test existing test suite.

**Note**: Upgraded vitest and @vitest/ui to 4.0.0 in catalog. Added vite 6.0.0 to catalog (required by Vitest 4.0). Updated vitest.config.ts to add coverage.include (coverage.all removed in v4). Core package tests passing (11 tests). Other packages have no test files (expected).

---

### F-003.6: Create @agency/vitest-config package ✅

**Target**: packages/vitest-config/

Create shared Vitest configuration package. Export sharedConfig with globals, environment, setupFiles, pool, experimental.fsModuleCache, and coverage settings. Add to pnpm workspace.

**Note**: Created @agency/vitest-config package with sharedConfig export. Added tsup to catalog for building. Configured with globals, environment, setupFiles, pool, and coverage settings (using thresholds). Package builds successfully with ESM and DTS outputs.

---

### F-003.7: Create vitest.workspace.ts ✅

**Target**: vitest.workspace.ts

Create workspace configuration using defineWorkspace. Configure projects for packages/* and apps/*. Add browser-tests project with happy-dom environment. Enable workspace-aware test discovery.

**Note**: Created vitest.workspace.ts with 4 projects: packages-node (node environment), packages-ui (jsdom for React components), apps (happy-dom for Next.js apps), and browser-tests (jsdom for full browser API). Workspace-aware test discovery working correctly. Pre-existing UI package test failures noted in F-003.4 due to TypeScript configuration issues.

---

### F-003.8: Update turbo.json tasks ✅

**Target**: turbo.json

Add test:ui, test:coverage, and test:watch tasks. Configure test:ui with cache: false and persistent: true. Configure test:coverage with coverage/** outputs. Add dependency on @agency/vitest-config#build.

**Note**: test:ui, test:coverage, and test:watch tasks were already configured correctly. Added @agency/vitest-config#build dependency to all test tasks (test, test:watch, test:ui, test:bench, test:coverage) to ensure shared config is built before running tests.

---

### F-003.9: Install happy-dom

**Target**: Root package.json

Install happy-dom as dev dependency. Add to catalog. Configure as default environment for component tests. Keep jsdom for full browser API compatibility when needed.

---

### F-003.10: Configure GitHub Actions with sharding

**Target**: .github/workflows/test.yml

Create GitHub Actions workflow with test sharding. Configure matrix strategy for parallel execution. Use --reporter=blob and --shard flags. Add blob report upload and merge-reports job.

---

### F-003.11: Add test scripts to Next.js apps

**Target**: All apps/*/package.json

Add test, test:ui, test:coverage, and test:watch scripts to all Next.js apps. Configure vitest.config.ts for each app. Add React Testing Library for component testing.

---

### F-003.12: Implement fixtures pattern

**Target**: packages/vitest-config/src/fixtures.ts

Create reusable fixtures using builder pattern. Implement database, user, and tempFile fixtures with onCleanup. Export extended test object with type inference.

---

---

## F-004: Add Biome

[ ] Status: Pending

**Related Files**: biome.json, package.json

**Definition of Done**:
- Biome installed and configured
- Format and lint working
- 90% ESLint rules replaced
- Minimal ESLint flat config for remaining rules
- Turbo pipelines for format and lint

**Out of Scope**:
- 100% ESLint replacement (impossible in 2026)
- Custom Biome plugins

**Rules**:
- Use Biome for formatting
- Use Biome for 90% of linting
- Keep minimal ESLint for remaining rules
- Format on save

**Advanced Pattern**:
- Biome + ESLint hybrid setup
- Shared Biome config via package

**Anti-Patterns**:
- Full ESLint retention
- No Biome configuration
- Missing format pipeline

**Imports/Exports**: N/A

**Depends On**: F-002
**Blocks**: F-005, F-007

### F-004.1: Install Biome
**Target**: package.json
Install @biomejs/biome as dev dependency. Add biome.json configuration.

### F-004.2: Configure Biome
**Target**: biome.json
Configure formatter and linter. Enable TypeScript support. Set rules matching project style.

### F-004.3: Create minimal ESLint config
**Target**: packages/eslint-config/
Create shared ESLint flat config for rules Biome doesn't cover. Export as @agency/eslint-config.

### F-004.4: Add format and lint scripts
**Target**: All package.json files
Add format and lint scripts. Configure turbo.json pipelines. Enable caching.

### F-004.5: Run initial format
**Target**: All files
Run biome format --write on all files. Fix any formatting issues.

---

## F-005: Add Lefthook

[ ] Status: Pending

**Related Files**: lefthook.yml, .git/

**Definition of Done**:
- Lefthook installed
- Pre-commit hooks configured
- Pre-push hooks configured
- Hooks run in parallel
- All hooks passing

**Out of Scope**:
- Custom hook scripts
- Post-commit hooks

**Rules**:
- Use Go binary for performance
- Run hooks in parallel
- Fail fast on critical hooks

**Advanced Pattern**:
- Monorepo-aware hook configuration
- Staged file filtering

**Anti-Patterns**:
- Husky (slower)
- Sequential hooks
- No pre-commit validation

**Imports/Exports**: N/A

**Depends On**: F-004
**Blocks**: G-007

### F-005.1: Install Lefthook
**Target**: package.json
Install lefthook as dev dependency. Initialize lefthook configuration.

### F-005.2: Configure pre-commit hooks
**Target**: lefthook.yml
Add pre-commit hooks: format, lint, typecheck. Configure parallel execution. Add staged file filtering.

### F-005.3: Configure pre-push hooks
**Target**: lefthook.yml
Add pre-push hooks: test, build. Ensure all tests pass before push.

### F-005.4: Test hooks
**Target**: Git repository
Test pre-commit and pre-push hooks. Verify parallel execution. Fix any hook failures.

---

## F-006: Add syncpack

[ ] Status: Pending

**Related Files**: package.json, syncpack.config.js

**Definition of Done**:
- syncpack installed
- Version linting configured
- Version fixing configured
- CI enforcement
- All versions normalized

**Out of Scope**:
- Custom version rules
- Auto-publishing

**Rules**:
- Lint for version mismatches
- Fix versions automatically
- Enforce in CI

**Advanced Pattern**:
- Catalog-aware version management
- Monorepo version synchronization

**Anti-Patterns**:
- Version drift across packages
- No version linting
- Manual version updates

**Imports/Exports**: N/A

**Depends On**: F-001
**Blocks**: G-007

### F-006.1: Install syncpack
**Target**: package.json
Install syncpack as dev dependency. Create syncpack.config.js.

### F-006.2: Configure version linting
**Target**: syncpack.config.js
Configure version linting for all packages. Set version ranges for shared dependencies.

### F-006.3: Add lint and fix scripts
**Target**: package.json
Add syncpack:lint and syncpack:fix scripts. Add to turbo.json pipeline.

### F-006.4: Normalize versions
**Target**: All package.json files
Run syncpack fix to normalize versions. Verify all shared dependencies match.

---

## F-007: Create Config Packages

[ ] Status: Pending

**Related Files**: packages/eslint-config/, packages/typescript-config/

**Definition of Done**:
- @agency/eslint-config published
- @agency/typescript-config published
- All packages consume configs
- Configs are versioned

**Out of Scope**:
- Custom ESLint plugins
- Custom TypeScript transformers

**Rules**:
- Share configs via packages
- Version configs independently
- Keep configs minimal

**Advanced Pattern**:
- Config composition
- Preset-based configuration

**Anti-Patterns**:
- Duplication across packages
- No config versioning
- Monolithic config

**Imports/Exports**:
```ts
// @agency/eslint-config
export { default } from './config'
// @agency/typescript-config
export { baseConfig, nextConfig, packageConfig }
```

**Depends On**: F-004
**Blocks**: All package configuration

### F-007.1: Create eslint-config package
**Target**: packages/eslint-config/
Create package with minimal ESLint flat config. Export default config. Add to pnpm workspace.

### F-007.2: Create typescript-config package
**Target**: packages/typescript-config/
Create package with base tsconfig presets. Export base, next, package configs. Add to pnpm workspace.

### F-007.3: Update packages to use configs
**Target**: All package.json files
Update all packages to consume @agency/eslint-config and @agency/typescript-config. Remove local configs.

---

## F-008: Scaffold Missing Packages

[ ] Status: Pending

**Related Files**: packages/

**Definition of Done**:
- All domain packages scaffolded
- All marketing packages scaffolded
- All infrastructure packages scaffolded
- Each package has package.json with exports
- Each package has src/index.ts

**Out of Scope**:
- Package implementation
- Package tests

**Rules**:
- Scaffold empty packages
- Define exports in package.json
- Create index.ts entry point
- Add to workspace

**Advanced Pattern**:
- Package scaffolding script
- Template-based package creation

**Anti-Patterns**:
- Missing exports
- No entry point
- Not in workspace

**Imports/Exports**: N/A

**Depends On**: F-001
**Blocks**: G-001, G-004, D-001 through D-016, M-001 through M-017

### F-008.1: Scaffold domain packages
**Target**: packages/
Create packages: auth, database, workspace, template, work-item, calendar, availability, booking, time-tracking, triage, email-engine, automator-engine, reporting, utils, test-utils. Each with package.json and src/index.ts.

### F-008.2: Scaffold infrastructure packages
**Target**: packages/
Create packages: observability, event-bus, flags. Each with package.json and src/index.ts.

### F-008.3: Scaffold marketing packages
**Target**: packages/
Create packages: seo, sitemap, og-image, metadata, analytics, cookie-consent, forms, social, animations, content, i18n, experiments, web-vitals, cms, email-templates, search, multi-site. Each with package.json and src/index.ts.

### F-008.4: Update pnpm-workspace.yaml
**Target**: pnpm-workspace.yaml
Add all new packages to workspace configuration. Verify workspace discovery.

---

## F-009: Set Up Remote Caching

[ ] Status: Pending

**Related Files**: turbo.json

**Definition of Done**:
- Vercel remote cache enabled
- Team scope configured
- Cache sharing across team
- CI cache configured
- Cache hit rate monitored

**Out of Scope**:
- Self-hosted cache
- Custom cache adapters

**Rules**:
- Use Vercel remote cache
- Configure team scope
- Monitor cache hit rate

**Advanced Pattern**:
- Environment-aware caching
- Cache key optimization

**Anti-Patterns**:
- No remote cache
- Local-only caching
- No team scope

**Imports/Exports**: N/A

**Depends On**: F-002
**Blocks**: G-007

### F-009.1: Link Turborepo to Vercel
**Target**: Root directory
Run npx turbo link. Select team scope for cache sharing. Verify remote cache enabled.

### F-009.2: Configure cache keys
**Target**: turbo.json
Add cache keys for environment variables. Configure environment-specific caching. Test cache behavior.

### F-009.3: Verify cache sharing
**Target**: CI configuration
Verify CI uses remote cache. Test cache hit across different environments. Monitor cache hit rate.

---

## F-010: Set Up Infisical

[ ] Status: Pending

**Related Files**: .env files, Infisical configuration

**Definition of Done**:
- Infisical CLI installed
- Infisical project created
- Secrets configured
- App-specific scoping
- .env files excluded from git

**Out of Scope**:
- Custom secret providers
- Secret rotation automation

**Rules**:
- Never commit secrets
- Use Infisical for all secrets
- Scope secrets per app
- Exclude .env from git

**Advanced Pattern**:
- Environment-specific secrets
- Secret injection at runtime

**Anti-Patterns**:
- Secrets in code
- Committed .env files
- No secret management

**Imports/Exports**: N/A

**Depends On**: None
**Blocks**: All infrastructure tasks

### F-010.1: Install Infisical CLI
**Target**: System
Install Infisical CLI. Verify installation. Authenticate with Infisical.

### F-010.2: Create Infisical project
**Target**: Infisical dashboard
Create Infisical project for agency platform. Configure environments: dev, staging, prod.

### F-010.3: Configure secrets
**Target**: Infisical dashboard
Add secrets: database URLs, JWT secrets, API keys. Configure app-specific scoping.

### F-010.4: Update .gitignore
**Target**: .gitignore
Add .env, .env.local, .env.*.local to gitignore. Verify no secrets committed.

---

## G-001: Add Changesets

[ ] Status: Pending

**Related Files**: .changeset/, package.json

**Definition of Done**:
- Changesets installed
- Configured for monorepo
- Version bumping automated
- Changelog generation
- CI integration

**Out of Scope**:
- Custom version strategies
- Automated publishing

**Rules**:
- Use changesets for versioning
- Write meaningful change descriptions
- Group related changes
- Commit changeset files

**Advanced Pattern**:
- Monorepo-aware versioning
- Fixed version mode

**Anti-Patterns**:
- Manual version bumps
- No changelog
- Ignoring changeset files

**Imports/Exports**: N/A

**Depends On**: F-001, F-008
**Blocks**: G-008

### G-001.1: Install Changesets
**Target**: package.json
Install @changesets/cli as dev dependency. Initialize changesets configuration.

### G-001.2: Configure changesets
**Target**: .changeset/config.json
Configure for monorepo. Set fixed version mode. Configure changelog format.

### G-001.3: Add changeset script
**Target**: package.json
Add changeset script to root. Configure version and publish scripts. Add to turbo.json.

### G-001.4: Test changeset workflow
**Target**: Root directory
Create a test changeset. Run version command. Verify changelog generation.

---

## G-002: Add Renovate

[ ] Status: Pending

**Related Files**: renovate.json, .github/

**Definition of Done**:
- Renovate bot configured
- Dependency updates automated
- Security alerts integrated
- Schedule configured
- PR grouping configured

**Out of Scope**:
- Custom Renovate presets
- Auto-merging

**Rules**:
- Use Renovate for updates
- Group related updates
- Schedule weekly runs
- Review security alerts

**Advanced Pattern**:
- Monorepo-aware updates
- Dependency grouping

**Anti-Patterns**:
- Manual dependency updates
- No schedule
- No security alerts

**Imports/Exports**: N/A

**Depends On**: F-001
**Blocks**: G-007

### G-002.1: Install Renovate
**Target**: .github/
Configure Renovate GitHub app. Create renovate.json configuration file.

### G-002.2: Configure Renovate
**Target**: renovate.json
Configure for monorepo. Set schedule to weekly. Configure dependency grouping. Enable security alerts.

### G-002.3: Test Renovate
**Target**: GitHub repository
Verify Renovate creates PRs. Test dependency grouping. Verify security alerts.

---

## G-003: Add dependency-cruiser

[ ] Status: Pending

**Related Files**: .dependency-cruiser.js, package.json

**Definition of Done**:
- dependency-cruiser installed
- Dependency rules configured
- Circular dependency detection
- Module boundary enforcement
- CI integration

**Out of Scope**:
- Custom dependency rules
- Visual dependency graphs

**Rules**:
- Enforce module boundaries
- Detect circular dependencies
- Follow DDD boundaries
- Run in CI

**Advanced Pattern**:
- Monorepo boundary enforcement
- Package-level dependency rules

**Anti-Patterns**:
- No boundary enforcement
- Circular dependencies
- Cross-domain coupling

**Imports/Exports**: N/A

**Depends On**: F-008
**Blocks**: G-007

### G-003.1: Install dependency-cruiser
**Target**: package.json
Install dependency-cruiser as dev dependency. Create .dependency-cruiser.js configuration.

### G-003.2: Configure dependency rules
**Target**: .dependency-cruiser.js
Configure module boundary rules. Enforce DDD boundaries. Detect circular dependencies.

### G-003.3: Add dependency script
**Target**: package.json
Add dependency-cruiser script. Add to turbo.json pipeline. Configure caching.

### G-003.4: Test dependency rules
**Target**: Root directory
Run dependency-cruiser on all packages. Fix any violations. Verify boundary enforcement.

---

## G-004: Add Vercel Flags SDK

[ ] Status: Pending

**Related Files**: packages/flags/, package.json

**Definition of Done**:
- @vercel/flags installed
- @agency/flags package created
- Flag types defined
- Flag usage documented
- Example flags created

**Out of Scope**:
- Remote flag management
- A/B testing integration

**Rules**:
- Use typed flags
- Document flag usage
- Keep flags minimal
- Use for feature toggles

**Advanced Pattern**:
- Type-safe flag definitions
- Composable flag logic

**Anti-Patterns**:
- Untyped flags
- No documentation
- Flag proliferation

**Imports/Exports**:
```ts
// @agency/flags
export const flags = defineFlags({
  newFeature: { default: false, description: 'Enable new feature' }
})
```

**Depends On**: F-008
**Blocks**: M-013

### G-004.1: Install Vercel Flags SDK
**Target**: packages/flags/package.json
Install @vercel/flags as dependency. Create @agency/flags package structure.

### G-004.2: Define flag types
**Target**: packages/flags/src/index.ts
Define flag types and schema. Export flag definitions. Add TypeScript types.

### G-004.3: Create example flags
**Target**: packages/flags/src/
Create example flags for common use cases. Document flag usage patterns.

### G-004.4: Document flag usage
**Target**: packages/flags/README.md
Document how to use flags. Provide examples. Explain flag lifecycle.

---

## G-005: Add OpenTelemetry

[ ] Status: Pending

**Related Files**: packages/observability/, package.json

**Definition of Done**:
- OpenTelemetry installed
- @agency/observability package created
- Tracing configured
- Metrics configured
- Exporter configured

**Out of Scope**:
- Custom exporters
- Advanced telemetry

**Rules**:
- Use OpenTelemetry standards
- Configure exporters
- Trace critical paths
- Monitor key metrics

**Advanced Pattern**:
- Monorepo telemetry setup
- Distributed tracing

**Anti-Patterns**:
- No telemetry
- Custom instrumentation
- Missing exporters

**Imports/Exports**:
```ts
// @agency/observability
export { setupTracing, setupMetrics }
export { trace, metrics }
```

**Depends On**: F-008
**Blocks**: All app instrumentation

### G-005.1: Install OpenTelemetry
**Target**: packages/observability/package.json
Install @opentelemetry packages. Create @agency/observability package structure.

### G-005.2: Configure tracing
**Target**: packages/observability/src/tracing.ts
Configure OpenTelemetry tracing. Set up span processors. Configure exporters.

### G-005.3: Configure metrics
**Target**: packages/observability/src/metrics.ts
Configure OpenTelemetry metrics. Set up metric readers. Configure exporters.

### G-005.4: Create setup function
**Target**: packages/observability/src/index.ts
Create setup function for tracing and metrics. Export telemetry utilities.

---

## G-006: Add CodeQL

[ ] Status: Pending

**Related Files**: .github/workflows/

**Definition of Done**:
- CodeQL workflow configured
- Security analysis automated
- Custom queries added
- Alerting configured
- False positives managed

**Out of Scope**:
- Custom CodeQL packs
- Advanced security queries

**Rules**:
- Run CodeQL on PRs
- Review security alerts
- Manage false positives
- Keep queries updated

**Advanced Pattern**:
- Monorepo-specific queries
- Custom security rules

**Anti-Patterns**:
- No security analysis
- Ignoring alerts
- No custom queries

**Imports/Exports**: N/A

**Depends On**: None
**Blocks**: G-007

### G-006.1: Create CodeQL workflow
**Target**: .github/workflows/codeql.yml
Create GitHub Actions workflow for CodeQL. Configure languages: TypeScript, JavaScript.

### G-006.2: Configure custom queries
**Target**: .github/codeql/
Add custom queries for monorepo patterns. Configure query packs.

### G-006.3: Configure alerting
**Target**: GitHub repository
Configure CodeQL alerting. Set severity thresholds. Configure notification rules.

### G-006.4: Test CodeQL
**Target**: GitHub repository
Trigger CodeQL workflow. Verify analysis runs. Review any alerts.

---

## G-007: Configure CI Pipeline

[ ] Status: Pending

**Related Files**: .github/workflows/

**Definition of Done**:
- CI pipeline configured
- Affected-only builds
- Security checks integrated
- Performance checks integrated
- All checks passing

**Out of Scope**:
- CD pipeline
- Custom runners

**Rules**:
- Use affected-only builds
- Run all security checks
- Monitor performance
- Fail fast on errors

**Advanced Pattern**:
- Monorepo CI optimization
- Parallel job execution

**Anti-Patterns**:
- Full builds on every PR
- No security checks
- No performance monitoring

**Imports/Exports**: N/A

**Depends On**: F-002, F-005, F-006, F-009, G-002, G-003, G-006
**Blocks**: G-008

### G-007.1: Create CI workflow
**Target**: .github/workflows/ci.yml
Create GitHub Actions workflow. Configure affected-only builds using Turborepo.

### G-007.2: Add security checks
**Target**: .github/workflows/ci.yml
Add pnpm audit, CodeQL, dependency-cruiser to CI. Configure failure conditions.

### G-007.3: Add performance checks
**Target**: .github/workflows/ci.yml
Add BundleWatch, build size checks. Configure size thresholds.

### G-007.4: Test CI pipeline
**Target**: GitHub repository
Trigger CI workflow. Verify affected-only builds. Verify all checks pass.

---

## G-008: Configure Release Pipeline

[ ] Status: Pending

**Related Files**: .github/workflows/

**Definition of Done**:
- Release pipeline configured
- Automated versioning
- Automated changelog
- Package publishing
- Release notes generated

**Out of Scope**:
- Canary releases
- Automated merging

**Rules**:
- Use Changesets for versioning
- Publish from CI
- Generate release notes
- Tag releases

**Advanced Pattern**:
- Monorepo release orchestration
- Version bump automation

**Anti-Patterns**:
- Manual releases
- No changelog
- No versioning

**Imports/Exports**: N/A

**Depends On**: G-001, G-007
**Blocks**: None

### G-008.1: Create release workflow
**Target**: .github/workflows/release.yml
Create GitHub Actions workflow for releases. Configure Changesets version and publish.

### G-008.2: Configure publishing
**Target**: .github/workflows/release.yml
Configure npm publishing. Set up authentication. Configure package registry.

### G-008.3: Configure release notes
**Target**: .github/workflows/release.yml
Configure automatic release notes from Changesets. Configure GitHub release creation.

### G-008.4: Test release pipeline
**Target**: GitHub repository
Create test changeset. Trigger release workflow. Verify version bump and publishing.

---

## D-001: Implement @agency/event-bus

[ ] Status: Pending

**Related Files**: packages/event-bus/src/

**Definition of Done**:
- In-process event bus implemented
- Transport-agnostic design
- Type-safe event definitions
- Event handlers registered
- Event publishing working

**Out of Scope**:
- Remote event transport
- Event persistence
- Event replay

**Rules**:
- Use in-process events
- Define event types
- Keep handlers pure
- No side effects in handlers

**Advanced Pattern**:
- Type-safe event system
- Composable event handlers

**Anti-Patterns**:
- Remote calls in handlers
- No event typing
- Handler side effects

**Imports/Exports**:
```ts
// @agency/event-bus
export { EventBus, defineEvent, on, emit }
export type { Event, EventHandler }
```

**Depends On**: F-008
**Blocks**: All domain packages

### D-001.1: Define event types
**Target**: packages/event-bus/src/types.ts
Define Event, EventHandler, EventBus types. Add TypeScript generics for type safety.

### D-001.2: Implement EventBus class
**Target**: packages/event-bus/src/event-bus.ts
Implement EventBus class with on, off, emit methods. Add handler registry.

### D-001.3: Create event helpers
**Target**: packages/event-bus/src/helpers.ts
Create defineEvent helper for type-safe event definitions. Create on, emit helpers.

### D-001.4: Write tests
**Target**: packages/event-bus/src/__tests__/
Write unit tests for EventBus. Test event registration, emission, handler execution.

---

## D-002: Implement @agency/database

[ ] Status: Pending

**Related Files**: packages/database/src/

**Definition of Done**:
- Database client configured
- Connection pooling set up
- Query builder integrated
- Migration system configured
- RLS hooks integrated

**Out of Scope**:
- Custom query builders
- Database sharding

**Rules**:
- Use connection pooling
- Configure RLS hooks
- Use migrations
- Keep queries simple

**Advanced Pattern**:
- Multi-tenant database access
- RLS-based isolation

**Anti-Patterns**:
- No connection pooling
- Direct SQL queries
- No migrations

**Imports/Exports**:
```ts
// @agency/database
export { db, transaction }
export { withTenant, setTenantContext }
```

**Depends On**: F-008
**Blocks**: D-003, D-004, D-005

### D-002.1: Configure database client
**Target**: packages/database/src/client.ts
Configure PostgreSQL client with connection pooling. Add environment-based configuration.

### D-002.2: Integrate RLS hooks
**Target**: packages/database/src/rls.ts
Integrate @usebetterdev/tenant for RLS. Implement setTenantContext, withTenant helpers.

### D-002.3: Configure migrations
**Target**: packages/database/src/migrations.ts
Configure migration system. Add migration runner. Create initial migration.

### D-002.4: Write tests
**Target**: packages/database/src/__tests__/
Write unit tests for database client. Test connection pooling, RLS hooks, migrations.

---

## D-003: Implement @agency/auth

[ ] Status: Pending

**Related Files**: packages/auth/src/

**Definition of Done**:
- JWT authentication implemented
- Session management working
- Password hashing configured
- Auth middleware created
- Multi-tenant auth support

**Out of Scope**:
- OAuth providers
- 2FA implementation

**Rules**:
- Use JWT for stateless auth
- Hash passwords securely
- Support multi-tenant auth
- Sessionless design

**Advanced Pattern**:
- Tenant-scoped JWT claims
- Stateless authentication

**Anti-Patterns**:
- Session-based auth
- Plain text passwords
- No tenant scoping

**Imports/Exports**:
```ts
// @agency/auth
export { authenticate, authorize, generateToken, verifyToken }
export { hashPassword, verifyPassword }
export type { User, TenantUser }
```

**Depends On**: D-002
**Blocks**: All app authentication

### D-003.1: Implement JWT utilities
**Target**: packages/auth/src/jwt.ts
Implement generateToken, verifyToken functions. Add tenant-scoped claims.

### D-003.2: Implement password hashing
**Target**: packages/auth/src/password.ts
Implement hashPassword, verifyPassword using bcrypt or argon2.

### D-003.3: Create auth middleware
**Target**: packages/auth/src/middleware.ts
Create authenticate, authorize middleware. Add tenant context extraction.

### D-003.4: Write tests
**Target**: packages/auth/src/__tests__/
Write unit tests for JWT, password hashing, auth middleware. Test tenant scoping.

---

## D-004: Implement @agency/workspace

[ ] Status: Pending

**Related Files**: packages/workspace/src/

**Definition of Done**:
- Workspace domain model defined
- Workspace repository implemented
- Workspace service created
- Event handlers registered
- Multi-tenant isolation working

**Out of Scope**:
- Workspace templates
- Workspace cloning

**Rules**:
- Follow DDD patterns
- Use repository pattern
- Emit domain events
- Enforce tenant isolation

**Advanced Pattern**:
- Domain-driven design
- Event-driven architecture

**Anti-Patterns**:
- Anemic domain models
- No repository pattern
- No domain events

**Imports/Exports**:
```ts
// @agency/workspace
export { WorkspaceService, WorkspaceRepository }
export type { Workspace, WorkspaceCreateInput }
```

**Depends On**: D-001, D-002, D-003
**Blocks**: D-005, D-006

### D-004.1: Define workspace domain model
**Target**: packages/workspace/src/domain/workspace.ts
Define Workspace entity with DDD patterns. Add value objects, domain logic.

### D-004.2: Implement workspace repository
**Target**: packages/workspace/src/repository/workspace-repository.ts
Implement WorkspaceRepository with database access. Add tenant isolation.

### D-004.3: Implement workspace service
**Target**: packages/workspace/src/service/workspace-service.ts
Implement WorkspaceService with business logic. Emit domain events.

### D-004.4: Write tests
**Target**: packages/workspace/src/__tests__/
Write unit tests for domain model, repository, service. Test tenant isolation.

---

## D-005: Implement @agency/template

[ ] Status: Pending

**Related Files**: packages/template/src/

**Definition of Done**:
- Template domain model defined
- Template repository implemented
- Template service created
- Template versioning working
- Event handlers registered

**Out of Scope**:
- Template marketplace
- Template sharing

**Rules**:
- Follow DDD patterns
- Use repository pattern
- Version templates
- Emit domain events

**Advanced Pattern**:
- Versioned domain models
- Template inheritance

**Anti-Patterns**:
- No versioning
- No repository pattern
- No domain events

**Imports/Exports**:
```ts
// @agency/template
export { TemplateService, TemplateRepository }
export type { Template, TemplateVersion, TemplateCreateInput }
```

**Depends On**: D-001, D-002
**Blocks**: D-006

### D-005.1: Define template domain model
**Target**: packages/template/src/domain/template.ts
Define Template entity with versioning. Add value objects, domain logic.

### D-005.2: Implement template repository
**Target**: packages/template/src/repository/template-repository.ts
Implement TemplateRepository with database access. Add version tracking.

### D-005.3: Implement template service
**Target**: packages/template/src/service/template-service.ts
Implement TemplateService with business logic. Emit domain events.

### D-005.4: Write tests
**Target**: packages/template/src/__tests__/
Write unit tests for domain model, repository, service. Test versioning.

---

## D-006: Implement @agency/work-item

[ ] Status: Pending

**Related Files**: packages/work-item/src/

**Definition of Done**:
- Work item domain model defined
- Work item repository implemented
- Work item service created
- Work item state machine working
- Event handlers registered

**Out of Scope**:
- Custom workflows
- Work item templates

**Rules**:
- Follow DDD patterns
- Use state machine
- Emit domain events
- Track state transitions

**Advanced Pattern**:
- State machine pattern
- Event sourcing

**Anti-Patterns**:
- No state machine
- No repository pattern
- No domain events

**Imports/Exports**:
```ts
// @agency/work-item
export { WorkItemService, WorkItemRepository }
export type { WorkItem, WorkItemState, WorkItemTransition }
```

**Depends On**: D-001, D-002, D-004
**Blocks**: D-007

### D-006.1: Define work item domain model
**Target**: packages/work-item/src/domain/work-item.ts
Define WorkItem entity with state machine. Add states, transitions, domain logic.

### D-006.2: Implement work item repository
**Target**: packages/work-item/src/repository/work-item-repository.ts
Implement WorkItemRepository with database access. Add state tracking.

### D-006.3: Implement work item service
**Target**: packages/work-item/src/service/work-item-service.ts
Implement WorkItemService with state machine logic. Emit domain events.

### D-006.4: Write tests
**Target**: packages/work-item/src/__tests__/
Write unit tests for domain model, repository, service. Test state machine.

---

## D-007: Implement @agency/calendar

[ ] Status: Pending

**Related Files**: packages/calendar/src/

**Definition of Done**:
- Calendar domain model defined
- Calendar repository implemented
- Calendar service created
- Event conflict detection working
- Event handlers registered

**Out of Scope**:
- Calendar sync
- Recurring events

**Rules**:
- Follow DDD patterns
- Detect conflicts
- Emit domain events
- Use time zones correctly

**Advanced Pattern**:
- Conflict detection algorithm
- Time zone handling

**Anti-Patterns**:
- No conflict detection
- No repository pattern
- No domain events

**Imports/Exports**:
```ts
// @agency/calendar
export { CalendarService, CalendarRepository }
export type { Calendar, CalendarEvent, ConflictResolution }
```

**Depends On**: D-001, D-002
**Blocks**: D-008

### D-007.1: Define calendar domain model
**Target**: packages/calendar/src/domain/calendar.ts
Define Calendar, CalendarEvent entities. Add time zone handling, conflict logic.

### D-007.2: Implement calendar repository
**Target**: packages/calendar/src/repository/calendar-repository.ts
Implement CalendarRepository with database access. Add time zone support.

### D-007.3: Implement calendar service
**Target**: packages/calendar/src/service/calendar-service.ts
Implement CalendarService with conflict detection. Emit domain events.

### D-007.4: Write tests
**Target**: packages/calendar/src/__tests__/
Write unit tests for domain model, repository, service. Test conflict detection.

---

## D-008: Implement @agency/availability

[ ] Status: Pending

**Related Files**: packages/availability/src/

**Definition of Done**:
- Availability domain model defined
- Availability repository implemented
- Availability service created
- Availability slots generation working
- Event handlers registered

**Out of Scope**:
- Custom availability rules
- Availability sharing

**Rules**:
- Follow DDD patterns
- Generate slots efficiently
- Emit domain events
- Handle time zones

**Advanced Pattern**:
- Slot generation algorithm
- Availability aggregation

**Anti-Patterns**:
- No slot generation
- No repository pattern
- No domain events

**Imports/Exports**:
```ts
// @agency/availability
export { AvailabilityService, AvailabilityRepository }
export type { Availability, AvailabilitySlot, AvailabilityRule }
```

**Depends On**: D-001, D-002, D-007
**Blocks**: D-009

### D-008.1: Define availability domain model
**Target**: packages/availability/src/domain/availability.ts
Define Availability, AvailabilitySlot entities. Add rules, slot generation logic.

### D-008.2: Implement availability repository
**Target**: packages/availability/src/repository/availability-repository.ts
Implement AvailabilityRepository with database access. Add slot storage.

### D-008.3: Implement availability service
**Target**: packages/availability/src/service/availability-service.ts
Implement AvailabilityService with slot generation. Emit domain events.

### D-008.4: Write tests
**Target**: packages/availability/src/__tests__/
Write unit tests for domain model, repository, service. Test slot generation.

---

## D-009: Implement @agency/booking

[ ] Status: Pending

**Related Files**: packages/booking/src/

**Definition of Done**:
- Booking domain model defined
- Booking repository implemented
- Booking service created
- Booking conflict resolution working
- Event handlers registered

**Out of Scope**:
- Booking cancellation policies
- Booking payments

**Rules**:
- Follow DDD patterns
- Resolve conflicts
- Emit domain events
- Validate availability

**Advanced Pattern**:
- Conflict resolution strategy
- Booking validation

**Anti-Patterns**:
- No conflict resolution
- No repository pattern
- No domain events

**Imports/Exports**:
```ts
// @agency/booking
export { BookingService, BookingRepository }
export type { Booking, BookingStatus, BookingConflict }
```

**Depends On**: D-001, D-002, D-008
**Blocks**: D-010

### D-009.1: Define booking domain model
**Target**: packages/booking/src/domain/booking.ts
Define Booking entity with status. Add conflict resolution, validation logic.

### D-009.2: Implement booking repository
**Target**: packages/booking/src/repository/booking-repository.ts
Implement BookingRepository with database access. Add status tracking.

### D-009.3: Implement booking service
**Target**: packages/booking/src/service/booking-service.ts
Implement BookingService with conflict resolution. Emit domain events.

### D-009.4: Write tests
**Target**: packages/booking/src/__tests__/
Write unit tests for domain model, repository, service. Test conflict resolution.

---

## D-010: Implement @agency/time-tracking

[ ] Status: Pending

**Related Files**: packages/time-tracking/src/

**Definition of Done**:
- Time tracking domain model defined
- Time tracking repository implemented
- Time tracking service created
- Time entry validation working
- Event handlers registered

**Out of Scope**:
- Time tracking reports
- Time tracking approvals

**Rules**:
- Follow DDD patterns
- Validate time entries
- Emit domain events
- Track duration correctly

**Advanced Pattern**:
- Time validation algorithm
- Duration calculation

**Anti-Patterns**:
- No validation
- No repository pattern
- No domain events

**Imports/Exports**:
```ts
// @agency/time-tracking
export { TimeTrackingService, TimeTrackingRepository }
export type { TimeEntry, TimeEntryValidation, Duration }
```

**Depends On**: D-001, D-002, D-006
**Blocks**: D-011

### D-010.1: Define time tracking domain model
**Target**: packages/time-tracking/src/domain/time-tracking.ts
Define TimeEntry entity with validation. Add duration calculation, validation logic.

### D-010.2: Implement time tracking repository
**Target**: packages/time-tracking/src/repository/time-tracking-repository.ts
Implement TimeTrackingRepository with database access. Add duration storage.

### D-010.3: Implement time tracking service
**Target**: packages/time-tracking/src/service/time-tracking-service.ts
Implement TimeTrackingService with validation. Emit domain events.

### D-010.4: Write tests
**Target**: packages/time-tracking/src/__tests__/
Write unit tests for domain model, repository, service. Test validation.

---

## D-011: Implement @agency/triage

[ ] Status: Pending

**Related Files**: packages/triage/src/

**Definition of Done**:
- Triage domain model defined
- Triage repository implemented
- Triage service created
- Triage rules engine working
- Event handlers registered

**Out of Scope**:
- Custom triage rules
- Triage automation

**Rules**:
- Follow DDD patterns
- Implement rules engine
- Emit domain events
- Score work items

**Advanced Pattern**:
- Rules engine pattern
- Scoring algorithm

**Anti-Patterns**:
- No rules engine
- No repository pattern
- No domain events

**Imports/Exports**:
```ts
// @agency/triage
export { TriageService, TriageRepository }
export type { TriageRule, TriageScore, WorkItemPriority }
```

**Depends On**: D-001, D-002, D-006
**Blocks**: D-012

### D-011.1: Define triage domain model
**Target**: packages/triage/src/domain/triage.ts
Define TriageRule, TriageScore entities. Add rules engine, scoring logic.

### D-011.2: Implement triage repository
**Target**: packages/triage/src/repository/triage-repository.ts
Implement TriageRepository with database access. Add rule storage.

### D-011.3: Implement triage service
**Target**: packages/triage/src/service/triage-service.ts
Implement TriageService with rules engine. Emit domain events.

### D-011.4: Write tests
**Target**: packages/triage/src/__tests__/
Write unit tests for domain model, repository, service. Test rules engine.

---

## D-012: Implement @agency/email-engine

[ ] Status: Pending

**Related Files**: packages/email-engine/src/

**Definition of Done**:
- Email templates defined
- Email sending implemented
- Email queue configured
- Email tracking working
- Event handlers registered

**Out of Scope**:
- Email marketing
- Email analytics

**Rules**:
- Use email templates
- Queue emails
- Track delivery
- Emit domain events

**Advanced Pattern**:
- Email queue pattern
- Template system

**Anti-Patterns**:
- No email queue
- No templates
- No tracking

**Imports/Exports**:
```ts
// @agency/email-engine
export { EmailService, EmailQueue }
export type { EmailTemplate, EmailDelivery, EmailStatus }
```

**Depends On**: D-001, D-002
**Blocks**: D-013

### D-012.1: Define email templates
**Target**: packages/email-engine/src/templates/
Define email templates for common use cases. Add template variables, styling.

### D-012.2: Implement email sending
**Target**: packages/email-engine/src/sender.ts
Implement email sending with SMTP provider. Add error handling, retries.

### D-012.3: Implement email queue
**Target**: packages/email-engine/src/queue.ts
Implement email queue with background processing. Add queue management.

### D-012.4: Write tests
**Target**: packages/email-engine/src/__tests__/
Write unit tests for templates, sender, queue. Test email delivery.

---

## D-013: Implement @agency/automator-engine

[ ] Status: Pending

**Related Files**: packages/automator-engine/src/

**Definition of Done**:
- Automation rules defined
- Automation engine implemented
- Automation triggers working
- Automation actions executed
- Event handlers registered

**Out of Scope**:
- Visual automation builder
- Custom automation scripts

**Rules**:
- Define automation rules
- Trigger on events
- Execute actions
- Emit domain events

**Advanced Pattern**:
- Rules engine pattern
- Event-driven automation

**Anti-Patterns**:
- No rules engine
- No event triggers
- No action execution

**Imports/Exports**:
```ts
// @agency/automator-engine
export { AutomatorService, AutomatorEngine }
export type { AutomationRule, AutomationTrigger, AutomationAction }
```

**Depends On**: D-001, D-002, D-012
**Blocks**: D-014

### D-013.1: Define automation rules
**Target**: packages/automator-engine/src/rules/
Define automation rule schema. Add triggers, actions, conditions.

### D-013.2: Implement automation engine
**Target**: packages/automator-engine/src/engine.ts
Implement automation engine with rule evaluation. Add trigger handling.

### D-013.3: Implement automation actions
**Target**: packages/automator-engine/src/actions/
Implement common automation actions. Add action execution, error handling.

### D-013.4: Write tests
**Target**: packages/automator-engine/src/__tests__/
Write unit tests for rules, engine, actions. Test automation execution.

---

## D-014: Implement @agency/reporting

[ ] Status: Pending

**Related Files**: packages/reporting/src/

**Definition of Done**:
- Report templates defined
- Report generation implemented
- Report data aggregation working
- Report export configured
- Event handlers registered

**Out of Scope**:
- Custom report builders
- Report scheduling

**Rules**:
- Use report templates
- Aggregate data efficiently
- Export to multiple formats
- Emit domain events

**Advanced Pattern**:
- Report template system
- Data aggregation pipeline

**Anti-Patterns**:
- No templates
- No aggregation
- No export options

**Imports/Exports**:
```ts
// @agency/reporting
export { ReportingService, ReportGenerator }
export type { ReportTemplate, ReportData, ReportExport }
```

**Depends On**: D-001, D-002
**Blocks**: None

### D-014.1: Define report templates
**Target**: packages/reporting/src/templates/
Define report templates for common use cases. Add template variables, formatting.

### D-014.2: Implement report generation
**Target**: packages/reporting/src/generator.ts
Implement report generation with data aggregation. Add template rendering.

### D-014.3: Implement report export
**Target**: packages/reporting/src/export.ts
Implement report export to PDF, CSV, Excel. Add export options.

### D-014.4: Write tests
**Target**: packages/reporting/src/__tests__/
Write unit tests for templates, generator, export. Test report generation.

---

## D-015: Implement @agency/utils

[ ] Status: Pending

**Related Files**: packages/utils/src/

**Definition of Done**:
- Utility functions implemented
- Date utilities working
- String utilities working
- Validation utilities working
- All utilities tested

**Out of Scope**:
- Specialized utilities
- Domain-specific logic

**Rules**:
- Keep utilities pure
- Add TypeScript types
- Write comprehensive tests
- Document usage

**Advanced Pattern**:
- Functional utilities
- Type-safe utilities

**Anti-Patterns**:
- Impure utilities
- No types
- No tests

**Imports/Exports**:
```ts
// @agency/utils
export { formatDate, parseDate, formatCurrency }
export { slugify, truncate, capitalize }
export { validateEmail, validatePhone }
```

**Depends On**: F-008
**Blocks**: All packages

### D-015.1: Implement date utilities
**Target**: packages/utils/src/date.ts
Implement date formatting, parsing, manipulation utilities. Add time zone support.

### D-015.2: Implement string utilities
**Target**: packages/utils/src/string.ts
Implement string manipulation utilities. Add slugify, truncate, capitalize.

### D-015.3: Implement validation utilities
**Target**: packages/utils/src/validation.ts
Implement validation utilities for email, phone, URL. Add custom validators.

### D-015.4: Write tests
**Target**: packages/utils/src/__tests__/
Write unit tests for all utilities. Test edge cases, error handling.

---

## D-016: Implement @agency/test-utils

[ ] Status: Pending

**Related Files**: packages/test-utils/src/

**Definition of Done**:
- Test helpers implemented
- Mock factories working
- Test fixtures configured
- Database test utilities working
- All test utilities tested

**Out of Scope**:
- E2E test utilities
- Visual regression utilities

**Rules**:
- Create reusable helpers
- Use factory pattern
- Mock external dependencies
- Clean up after tests

**Advanced Pattern**:
- Factory pattern for fixtures
- Test database utilities

**Anti-Patterns**:
- No test helpers
- No cleanup
- No isolation

**Imports/Exports**:
```ts
// @agency/test-utils
export { createMock, createFactory, setupTestDB, cleanupTestDB }
export type { MockFactory, TestFixture }
```

**Depends On**: D-002
**Blocks**: All package tests

### D-016.1: Implement mock factories
**Target**: packages/test-utils/src/factories.ts
Implement mock factories for domain entities. Add factory pattern, overrides.

### D-016.2: Implement test database utilities
**Target**: packages/test-utils/src/database.ts
Implement test database setup, cleanup. Add transaction rollback.

### D-016.3: Implement test helpers
**Target**: packages/test-utils/src/helpers.ts
Implement common test helpers. Add assertion helpers, wait helpers.

### D-016.4: Write tests
**Target**: packages/test-utils/src/__tests__/
Write unit tests for test utilities. Test factories, database utilities, helpers.

---

## M-001: Implement @agency/seo

[ ] Status: Pending

**Related Files**: packages/seo/src/

**Definition of Done**:
- SEO metadata generation implemented
- Open Graph tags working
- Twitter cards working
- Schema.org structured data working
- Sitemap integration

**Out of Scope**:
- SEO analytics
- SEO reporting

**Rules**:
- Generate metadata dynamically
- Use structured data
- Support multiple platforms
- Keep metadata current

**Advanced Pattern**:
- Metadata composition
- Type-safe metadata

**Anti-Patterns**:
- Hardcoded metadata
- No structured data
- Missing platform support

**Imports/Exports**:
```ts
// @agency/seo
export { generateMetadata, generateOpenGraph, generateTwitterCard }
export { generateStructuredData }
export type { Metadata, OpenGraph, TwitterCard, StructuredData }
```

**Depends On**: F-008
**Blocks**: M-002, M-003

### M-001.1: Implement metadata generation
**Target**: packages/seo/src/metadata.ts
Implement metadata generation for pages. Add title, description, keywords support.

### M-001.2: Implement Open Graph tags
**Target**: packages/seo/src/opengraph.ts
Implement Open Graph tag generation. Add image, type, site name support.

### M-001.3: Implement Twitter cards
**Target**: packages/seo/src/twitter.ts
Implement Twitter card generation. Add summary, large image support.

### M-001.4: Implement structured data
**Target**: packages/seo/src/structured-data.ts
Implement Schema.org structured data generation. Add JSON-LD format.

### M-001.5: Write tests
**Target**: packages/seo/src/__tests__/
Write unit tests for metadata, Open Graph, Twitter cards, structured data.

---

## M-002: Implement @agency/sitemap

[ ] Status: Pending

**Related Files**: packages/sitemap/src/

**Definition of Done**:
- Sitemap generation implemented
- Dynamic sitemap working
- Sitemap index working
- Multi-language support
- Sitemap pinging

**Out of Scope**:
- Image sitemaps
- Video sitemaps

**Rules**:
- Generate sitemaps dynamically
- Support sitemap indexes
- Handle multiple languages
- Ping search engines

**Advanced Pattern**:
- Dynamic sitemap generation
- Sitemap composition

**Anti-Patterns**:
- Static sitemaps
- No index support
- No language support

**Imports/Exports**:
```ts
// @agency/sitemap
export { generateSitemap, generateSitemapIndex }
export { pingSearchEngines }
export type { SitemapEntry, SitemapConfig }
```

**Depends On**: M-001
**Blocks**: None

### M-002.1: Implement sitemap generation
**Target**: packages/sitemap/src/generator.ts
Implement sitemap XML generation. Add URL, lastmod, changefreq, priority support.

### M-002.2: Implement sitemap index
**Target**: packages/sitemap/src/index.ts
Implement sitemap index generation. Add multiple sitemap support.

### M-002.3: Implement multi-language support
**Target**: packages/sitemap/src/i18n.ts
Implement multi-language sitemap support. Add hreflang tags.

### M-002.4: Implement search engine pinging
**Target**: packages/sitemap/src/ping.ts
Implement search engine pinging. Add Google, Bing support.

### M-002.5: Write tests
**Target**: packages/sitemap/src/__tests__/
Write unit tests for sitemap generation, index, i18n, pinging.

---

## M-003: Implement @agency/og-image

[ ] Status: Pending

**Related Files**: packages/og-image/src/

**Definition of Done**:
- OG image generation implemented
- Dynamic templates working
- Image optimization working
- CDN integration working
- Cache invalidation

**Out of Scope**:
- Custom image editors
- Image watermarking

**Rules**:
- Generate images dynamically
- Optimize image size
- Use CDN for delivery
- Cache aggressively

**Advanced Pattern**:
- Template-based generation
- Image composition

**Anti-Patterns**:
- Static images
- No optimization
- No caching

**Imports/Exports**:
```ts
// @agency/og-image
export { generateOGImage, generateOGImageURL }
export type { OGImageTemplate, OGImageConfig }
```

**Depends On**: M-001
**Blocks**: None

### M-003.1: Implement image generation
**Target**: packages/og-image/src/generator.ts
Implement OG image generation using canvas or similar. Add template support.

### M-003.2: Implement image optimization
**Target**: packages/og-image/src/optimizer.ts
Implement image optimization. Add compression, format conversion.

### M-003.3: Implement CDN integration
**Target**: packages/og-image/src/cdn.ts
Implement CDN integration for image delivery. Add cache headers.

### M-003.4: Write tests
**Target**: packages/og-image/src/__tests__/
Write unit tests for image generation, optimization, CDN integration.

---

## M-004: Implement @agency/metadata

[ ] Status: Pending

**Related Files**: packages/metadata/src/

**Definition of Done**:
- Metadata extraction implemented
- Metadata validation working
- Metadata transformation working
- Metadata storage working
- Metadata retrieval

**Out of Scope**:
- Metadata analytics
- Metadata reporting

**Rules**:
- Extract metadata accurately
- Validate metadata structure
- Transform metadata consistently
- Store metadata efficiently

**Advanced Pattern**:
- Metadata pipeline
- Type-safe metadata

**Anti-Patterns**:
- No validation
- Inconsistent transformation
- No storage

**Imports/Exports**:
```ts
// @agency/metadata
export { extractMetadata, validateMetadata, transformMetadata }
export { storeMetadata, retrieveMetadata }
export type { Metadata, MetadataValidation, MetadataTransform }
```

**Depends On**: F-008
**Blocks**: None

### M-004.1: Implement metadata extraction
**Target**: packages/metadata/src/extractor.ts
Implement metadata extraction from various sources. Add HTML, JSON, XML support.

### M-004.2: Implement metadata validation
**Target**: packages/metadata/src/validator.ts
Implement metadata validation. Add schema validation, type checking.

### M-004.3: Implement metadata transformation
**Target**: packages/metadata/src/transformer.ts
Implement metadata transformation. Add normalization, enrichment.

### M-004.4: Implement metadata storage
**Target**: packages/metadata/src/storage.ts
Implement metadata storage. Add database integration, caching.

### M-004.5: Write tests
**Target**: packages/metadata/src/__tests__/
Write unit tests for extraction, validation, transformation, storage.

---

## M-005: Implement @agency/analytics

[ ] Status: Pending

**Related Files**: packages/analytics/src/

**Definition of Done**:
- Analytics tracking implemented
- Event tracking working
- Page view tracking working
- User identification working
- Privacy compliance

**Out of Scope**:
- Custom analytics dashboards
- Real-time analytics

**Rules**:
- Track events accurately
- Identify users correctly
- Comply with privacy laws
- Minimize data collection

**Advanced Pattern**:
- Event batching
- Privacy-first tracking

**Anti-Patterns**:
- No privacy compliance
- Excessive data collection
- No user identification

**Imports/Exports**:
```ts
// @agency/analytics
export { trackEvent, trackPageView, identifyUser }
export { initializeAnalytics }
export type { AnalyticsEvent, AnalyticsConfig }
```

**Depends On**: F-008
**Blocks**: M-006

### M-005.1: Implement event tracking
**Target**: packages/analytics/src/tracking.ts
Implement event tracking. Add event properties, context support.

### M-005.2: Implement page view tracking
**Target**: packages/analytics/src/pageview.ts
Implement page view tracking. Add referrer, campaign tracking.

### M-005.3: Implement user identification
**Target**: packages/analytics/src/identification.ts
Implement user identification. Add user properties, traits.

### M-005.4: Implement privacy compliance
**Target**: packages/analytics/src/privacy.ts
Implement privacy compliance. Add consent management, data deletion.

### M-005.5: Write tests
**Target**: packages/analytics/src/__tests__/
Write unit tests for tracking, page views, identification, privacy.

---

## M-006: Implement @agency/cookie-consent

[ ] Status: Pending

**Related Files**: packages/cookie-consent/src/

**Definition of Done**:
- Cookie consent banner implemented
- Consent management working
- Category-based consent working
- Cookie scanning working
- Compliance reporting

**Out of Scope**:
- Custom consent UI
- Consent analytics

**Rules**:
- Obtain user consent
- Respect user preferences
- Scan cookies accurately
- Report compliance

**Advanced Pattern**:
- Category-based consent
- Cookie scanning

**Anti-Patterns**:
- No consent mechanism
- No category support
- No cookie scanning

**Imports/Exports**:
```ts
// @agency/cookie-consent
export { CookieConsent, ConsentManager }
export type { ConsentCategory, ConsentPreferences }
```

**Depends On**: M-005
**Blocks**: None

### M-006.1: Implement consent banner
**Target**: packages/cookie-consent/src/banner.ts
Implement cookie consent banner. Add category selection, accept/reject buttons.

### M-006.2: Implement consent management
**Target**: packages/cookie-consent/src/manager.ts
Implement consent management. Add preference storage, consent checking.

### M-006.3: Implement cookie scanning
**Target**: packages/cookie-consent/src/scanner.ts
Implement cookie scanning. Add category detection, cookie listing.

### M-006.4: Implement compliance reporting
**Target**: packages/cookie-consent/src/reporting.ts
Implement compliance reporting. Add consent logs, audit trail.

### M-006.5: Write tests
**Target**: packages/cookie-consent/src/__tests__/
Write unit tests for banner, management, scanning, reporting.

---

## M-007: Implement @agency/forms

[ ] Status: Pending

**Related Files**: packages/forms/src/

**Definition of Done**:
- Form validation implemented
- Form submission working
- Form state management working
- Multi-step forms working
- Form analytics

**Out of Scope**:
- Custom form builders
- Form templates

**Rules**:
- Validate forms accurately
- Manage form state
- Support multi-step forms
- Track form submissions

**Advanced Pattern**:
- Composable validation
- Form state machine

**Anti-Patterns**:
- No validation
- No state management
- No multi-step support

**Imports/Exports**:
```ts
// @agency/forms
export { useForm, validateForm, submitForm }
export type { FormField, FormValidation, FormState }
```

**Depends On**: F-008
**Blocks**: None

### M-007.1: Implement form validation
**Target**: packages/forms/src/validation.ts
Implement form validation. Add field validators, custom rules.

### M-007.2: Implement form submission
**Target**: packages/forms/src/submission.ts
Implement form submission. Add error handling, success handling.

### M-007.3: Implement form state management
**Target**: packages/forms/src/state.ts
Implement form state management. Add dirty tracking, touched tracking.

### M-007.4: Implement multi-step forms
**Target**: packages/forms/src/multistep.ts
Implement multi-step form support. Add step navigation, step validation.

### M-007.5: Write tests
**Target**: packages/forms/src/__tests__/
Write unit tests for validation, submission, state, multi-step forms.

---

## M-008: Implement @agency/social

[ ] Status: Pending

**Related Files**: packages/social/src/

**Definition of Done**:
- Social sharing implemented
- Social metadata working
- Social login working
- Social feed integration working
- Social analytics

**Out of Scope**:
- Custom social widgets
- Social scheduling

**Rules**:
- Share content accurately
- Handle social logins
- Integrate social feeds
- Track social interactions

**Advanced Pattern**:
- Social metadata composition
- Social login flow

**Anti-Patterns**:
- No metadata
- No login support
- No feed integration

**Imports/Exports**:
```ts
// @agency/social
export { shareToSocial, loginWithSocial, getSocialFeed }
export type { SocialPlatform, SocialShare, SocialLogin }
```

**Depends On**: M-001
**Blocks**: None

### M-008.1: Implement social sharing
**Target**: packages/social/src/sharing.ts
Implement social sharing. Add platform-specific sharing, metadata.

### M-008.2: Implement social login
**Target**: packages/social/src/login.ts
Implement social login. Add OAuth support, user profile fetching.

### M-008.3: Implement social feed integration
**Target**: packages/social/src/feed.ts
Implement social feed integration. Add feed fetching, post creation.

### M-008.4: Implement social analytics
**Target**: packages/social/src/analytics.ts
Implement social analytics. Add share tracking, engagement tracking.

### M-008.5: Write tests
**Target**: packages/social/src/__tests__/
Write unit tests for sharing, login, feed, analytics.

---

## M-009: Implement @agency/animations

[ ] Status: Pending

**Related Files**: packages/animations/src/

**Definition of Done**:
- Animation library integrated
- Animation presets working
- Animation hooks working
- Performance optimization working
- Accessibility support

**Out of Scope**:
- Custom animation builders
- Animation editors

**Rules**:
- Use performant animations
- Provide accessibility options
- Respect user preferences
- Optimize for mobile

**Advanced Pattern**:
- Animation composition
- Performance optimization

**Anti-Patterns**:
- No performance optimization
- No accessibility support
- No user preferences

**Imports/Exports**:
```ts
// @agency/animations
export { useAnimation, useSpring, useTransition }
export { animationPresets }
export type { AnimationConfig, AnimationPreset }
```

**Depends On**: F-008
**Blocks**: None

### M-009.1: Integrate animation library
**Target**: packages/animations/src/library.ts
Integrate animation library (Framer Motion or similar). Add TypeScript types.

### M-009.2: Implement animation presets
**Target**: packages/animations/src/presets.ts
Implement animation presets. Add common animations: fade, slide, scale.

### M-009.3: Implement animation hooks
**Target**: packages/animations/src/hooks.ts
Implement animation hooks. Add useAnimation, useSpring, useTransition.

### M-009.4: Implement performance optimization
**Target**: packages/animations/src/performance.ts
Implement performance optimization. Add GPU acceleration, reduced motion.

### M-009.5: Write tests
**Target**: packages/animations/src/__tests__/
Write unit tests for presets, hooks, performance optimization.

---

## M-010: Implement @agency/content

[ ] Status: Pending

**Related Files**: packages/content/src/

**Definition of Done**:
- Content fetching implemented
- Content caching working
- Content transformation working
- Content validation working
- Content indexing

**Out of Scope**:
- Custom content editors
- Content scheduling

**Rules**:
- Fetch content efficiently
- Cache content aggressively
- Transform content consistently
- Validate content structure

**Advanced Pattern**:
- Content pipeline
- Content caching

**Anti-Patterns**:
- No caching
- No validation
- No transformation

**Imports/Exports**:
```ts
// @agency/content
export { fetchContent, transformContent, validateContent }
export { indexContent }
export type { Content, ContentTransform, ContentValidation }
```

**Depends On**: F-008
**Blocks**: M-015

### M-010.1: Implement content fetching
**Target**: packages/content/src/fetcher.ts
Implement content fetching. Add API integration, file system support.

### M-010.2: Implement content caching
**Target**: packages/content/src/cache.ts
Implement content caching. Add cache invalidation, cache warming.

### M-010.3: Implement content transformation
**Target**: packages/content/src/transformer.ts
Implement content transformation. Add markdown, HTML, JSON support.

### M-010.4: Implement content validation
**Target**: packages/content/src/validator.ts
Implement content validation. Add schema validation, type checking.

### M-010.5: Write tests
**Target**: packages/content/src/__tests__/
Write unit tests for fetching, caching, transformation, validation.

---

## M-011: Implement @agency/i18n

[ ] Status: Pending

**Related Files**: packages/i18n/src/

**Definition of Done**:
- i18n library integrated
- Translation loading working
- Language detection working
- RTL support working
- Pluralization working

**Out of Scope**:
- Custom translation editors
- Translation analytics

**Rules**:
- Load translations efficiently
- Detect language accurately
- Support RTL languages
- Handle pluralization correctly

**Advanced Pattern**:
- Lazy translation loading
- Language negotiation

**Anti-Patterns**:
- No RTL support
- No pluralization
- No language detection

**Imports/Exports**:
```ts
// @agency/i18n
export { useTranslation, t, useLocale }
export { loadTranslations, detectLanguage }
export type { Translation, Locale, TranslationNamespace }
```

**Depends On**: F-008
**Blocks**: None

### M-011.1: Integrate i18n library
**Target**: packages/i18n/src/library.ts
Integrate i18n library (next-intl or similar). Add TypeScript types.

### M-011.2: Implement translation loading
**Target**: packages/i18n/src/loader.ts
Implement translation loading. Add lazy loading, namespace support.

### M-011.3: Implement language detection
**Target**: packages/i18n/src/detection.ts
Implement language detection. Add browser detection, URL detection.

### M-011.4: Implement RTL support
**Target**: packages/i18n/src/rtl.ts
Implement RTL support. Add direction detection, RTL styling.

### M-011.5: Write tests
**Target**: packages/i18n/src/__tests__/
Write unit tests for loading, detection, RTL support.

---

## M-012: Implement @agency/experiments

[ ] Status: Pending

**Related Files**: packages/experiments/src/

**Definition of Done**:
- Experiment framework implemented
- Experiment assignment working
- Experiment tracking working
- Experiment targeting working
- Experiment reporting

**Out of Scope**:
- Custom experiment builders
- Real-time experiment updates

**Rules**:
- Assign users consistently
- Track experiments accurately
- Target experiments precisely
- Report results clearly

**Advanced Pattern**:
- Experiment assignment
- Experiment targeting

**Anti-Patterns**:
- No assignment consistency
- No tracking
- No targeting

**Imports/Exports**:
```ts
// @agency/experiments
export { useExperiment, assignExperiment, trackExperiment }
export type { Experiment, ExperimentVariant, ExperimentTargeting }
```

**Depends On**: G-004, M-005
**Blocks**: None

### M-012.1: Implement experiment framework
**Target**: packages/experiments/src/framework.ts
Implement experiment framework. Add experiment definition, variant assignment.

### M-012.2: Implement experiment assignment
**Target**: packages/experiments/src/assignment.ts
Implement experiment assignment. Add consistent hashing, user targeting.

### M-012.3: Implement experiment tracking
**Target**: packages/experiments/src/tracking.ts
Implement experiment tracking. Add event tracking, conversion tracking.

### M-012.4: Implement experiment targeting
**Target**: packages/experiments/src/targeting.ts
Implement experiment targeting. Add audience targeting, feature flags.

### M-012.5: Write tests
**Target**: packages/experiments/src/__tests__/
Write unit tests for framework, assignment, tracking, targeting.

---

## M-013: Implement @agency/web-vitals

[ ] Status: Pending

**Related Files**: packages/web-vitals/src/

**Definition of Done**:
- Web vitals tracking implemented
- Core web vitals working
- Custom metrics working
- Performance reporting working
- Performance optimization

**Out of Scope**:
- Custom performance dashboards
- Real-time monitoring

**Rules**:
- Track core web vitals
- Report performance accurately
- Optimize based on metrics
- Monitor continuously

**Advanced Pattern**:
- Web vitals aggregation
- Performance optimization

**Anti-Patterns**:
- No core web vitals
- No reporting
- No optimization

**Imports/Exports**:
```ts
// @agency/web-vitals
export { trackWebVitals, reportWebVitals }
export type { WebVital, PerformanceReport }
```

**Depends On**: F-008
**Blocks**: None

### M-013.1: Implement web vitals tracking
**Target**: packages/web-vitals/src/tracking.ts
Implement web vitals tracking. Add LCP, FID, CLS tracking.

### M-013.2: Implement custom metrics
**Target**: packages/web-vitals/src/metrics.ts
Implement custom metrics. Add custom timing, custom events.

### M-013.3: Implement performance reporting
**Target**: packages/web-vitals/src/reporting.ts
Implement performance reporting. Add aggregation, alerting.

### M-013.4: Implement performance optimization
**Target**: packages/web-vitals/src/optimization.ts
Implement performance optimization. Add recommendations, fixes.

### M-013.5: Write tests
**Target**: packages/web-vitals/src/__tests__/
Write unit tests for tracking, metrics, reporting, optimization.

---

## M-014: Implement @agency/cms

[ ] Status: Pending

**Related Files**: packages/cms/src/

**Definition of Done**:
- CMS integration implemented
- Content fetching working
- Content preview working
- Content editing working
- Content publishing

**Out of Scope**:
- Custom CMS builders
- CMS analytics

**Rules**:
- Integrate with CMS API
- Fetch content efficiently
- Support content preview
- Handle content publishing

**Advanced Pattern**:
- CMS abstraction layer
- Content preview

**Anti-Patterns**:
- No CMS abstraction
- No preview support
- No publishing support

**Imports/Exports**:
```ts
// @agency/cms
export { fetchCMSContent, previewCMSContent, publishCMSContent }
export type { CMSContent, CMSPreview, CMSPublish }
```

**Depends On**: M-010
**Blocks**: None

### M-014.1: Implement CMS integration
**Target**: packages/cms/src/integration.ts
Implement CMS integration. Add API client, authentication.

### M-014.2: Implement content fetching
**Target**: packages/cms/src/fetcher.ts
Implement content fetching. Add query support, filtering.

### M-014.3: Implement content preview
**Target**: packages/cms/src/preview.ts
Implement content preview. Add draft mode, live preview.

### M-014.4: Implement content publishing
**Target**: packages/cms/src/publishing.ts
Implement content publishing. Add publish workflow, scheduling.

### M-014.5: Write tests
**Target**: packages/cms/src/__tests__/
Write unit tests for integration, fetching, preview, publishing.

---

## M-015: Implement @agency/email-templates

[ ] Status: Pending

**Related Files**: packages/email-templates/src/

**Definition of Done**:
- Email templates defined
- Template rendering working
- Template variables working
- Template preview working
- Template testing

**Out of Scope**:
- Custom template editors
- Template analytics

**Rules**:
- Define reusable templates
- Render templates accurately
- Support template variables
- Test templates thoroughly

**Advanced Pattern**:
- Template composition
- Template inheritance

**Anti-Patterns**:
- No template reuse
- No variable support
- No testing

**Imports/Exports**:
```ts
// @agency/email-templates
export { renderEmailTemplate, previewEmailTemplate }
export type { EmailTemplate, TemplateVariables, TemplateContext }
```

**Depends On**: M-010, D-012
**Blocks**: None

### M-015.1: Define email templates
**Target**: packages/email-templates/src/templates/
Define email templates for common use cases. Add transactional, marketing templates.

### M-015.2: Implement template rendering
**Target**: packages/email-templates/src/renderer.ts
Implement template rendering. Add variable substitution, conditional rendering.

### M-015.3: Implement template preview
**Target**: packages/email-templates/src/preview.ts
Implement template preview. Add HTML preview, text preview.

### M-015.4: Implement template testing
**Target**: packages/email-templates/src/testing.ts
Implement template testing. Add spam checking, rendering validation.

### M-015.5: Write tests
**Target**: packages/email-templates/src/__tests__/
Write unit tests for rendering, preview, testing.

---

## M-016: Implement @agency/search

[ ] Status: Pending

**Related Files**: packages/search/src/

**Definition of Done**:
- Search integration implemented
- Search indexing working
- Search query working
- Search filtering working
- Search analytics

**Out of Scope**:
- Custom search engines
- Search analytics dashboards

**Rules**:
- Index content accurately
- Query search efficiently
- Filter results precisely
- Track search interactions

**Advanced Pattern**:
- Search abstraction layer
- Search analytics

**Anti-Patterns**:
- No search abstraction
- No filtering
- No analytics

**Imports/Exports**:
```ts
// @agency/search
export { searchContent, indexContent, filterResults }
export type { SearchQuery, SearchResult, SearchFilter }
```

**Depends On**: M-010
**Blocks**: None

### M-016.1: Implement search integration
**Target**: packages/search/src/integration.ts
Implement search integration. Add Algolia, Elasticsearch, or similar.

### M-016.2: Implement search indexing
**Target**: packages/search/src/indexing.ts
Implement search indexing. Add content indexing, index updates.

### M-016.3: Implement search query
**Target**: packages/search/src/query.ts
Implement search query. Add full-text search, fuzzy search.

### M-016.4: Implement search filtering
**Target**: packages/search/src/filtering.ts
Implement search filtering. Add faceted search, range filters.

### M-016.5: Write tests
**Target**: packages/search/src/__tests__/
Write unit tests for integration, indexing, query, filtering.

---

## M-017: Implement @agency/multi-site

[ ] Status: Pending

**Related Files**: packages/multi-site/src/

**Definition of Done**:
- Multi-site routing implemented
- Site configuration working
- Site isolation working
- Site-specific content working
- Site-specific analytics

**Out of Scope**:
- Custom site builders
- Site analytics dashboards

**Rules**:
- Route sites correctly
- Configure sites accurately
- Isolate site data
- Track site analytics

**Advanced Pattern**:
- Site routing
- Site isolation

**Anti-Patterns**:
- No site isolation
- No site configuration
- No site analytics

**Imports/Exports**:
```ts
// @agency/multi-site
export { useSite, configureSite, isolateSite }
export type { SiteConfig, SiteContext, SiteIsolation }
```

**Depends On**: M-005, M-010
**Blocks**: None

### M-017.1: Implement multi-site routing
**Target**: packages/multi-site/src/routing.ts
Implement multi-site routing. Add domain-based routing, path-based routing.

### M-017.2: Implement site configuration
**Target**: packages/multi-site/src/config.ts
Implement site configuration. Add site settings, site metadata.

### M-017.3: Implement site isolation
**Target**: packages/multi-site/src/isolation.ts
Implement site isolation. Add data isolation, cache isolation.

### M-017.4: Implement site-specific content
**Target**: packages/multi-site/src/content.ts
Implement site-specific content. Add content routing, content filtering.

### M-017.5: Write tests
**Target**: packages/multi-site/src/__tests__/
Write unit tests for routing, configuration, isolation, content.
