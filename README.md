# Agency Platform

A modern monorepo containing business applications, client sites, demo applications, and shared packages. Built with Next.js 16, React 19, TypeScript, and Turborepo.

## Monorepo Structure

This repository uses **Turborepo** to manage multiple applications and shared packages with **pnpm workspaces** for efficient dependency management.

### Applications

#### Firm Applications

- **apps/firm/site** - Public-facing firm website with 3D animations (Next.js 16, React Three Fiber)
- **apps/firm/client-portal** - Client portal for firm services (Next.js 16)

#### Business Applications

- **apps/business-applications/project-management** - Industry-agnostic project management system inspired by Karbon (Next.js 16)
- **apps/business-applications/booking** - Native Calendly substitution for appointment scheduling (Next.js 16, date-fns)

#### Client Applications

- **apps/clients/marketing-sites/fake-client-1** - Marketing site for client projects (Next.js 16)
- **apps/clients/landing-pages/fake-client-1** - Landing page for client projects (Next.js 16)

#### Demo Applications

- **apps/demo/day-care** - Day care management demo (Next.js 16)
- **apps/demo/hair-salor** - Hair salon management demo (Next.js 16)
- **apps/demo/tax-firm** - Tax firm management demo (Next.js 16)

### Shared Packages

#### Domain & Core

- **packages/core** - Domain models and TypeScript interfaces
- **packages/utils** - Common utility functions
- **packages/reporting** - Query builders and aggregation logic

#### Engines

- **packages/automator-engine** - Workflow automation rule engine (json-rules-engine)
- **packages/email-engine** - Email synchronization logic (nodemailer)

#### UI & Design

- **packages/ui** - Design system and UI components (CVA, clsx, tailwind-merge, lucide-react, motion)

#### Tooling & Configuration

- **packages/eslint-config** - Shared ESLint configuration (ESLint 9, typescript-eslint)
- **packages/typescript-config** - Shared TypeScript configuration
- **packages/vitest-config** - Shared Vitest configuration (buildable package)

## Getting Started

### Prerequisites

- **Node.js**: >=18.0.0
- **pnpm**: >=11.0.0
- **Package Manager**: pnpm (required, do not use npm)

### Installation

Install dependencies:

```bash
pnpm install
```

### Development

Run all applications:

```bash
pnpm dev
```

Run specific application:

```bash
turbo run dev --filter=@agency/firm-site
```

Build all applications:

```bash
pnpm build
```

Build specific application:

```bash
turbo run build --filter=@agency/firm-site
```

### Code Quality

Format code with Biome:

```bash
pnpm format
```

Lint code with Biome:

```bash
pnpm lint
```

Run combined lint and format:

```bash
pnpm check
```

Auto-fix issues:

```bash
pnpm check:fix
```

Type checking:

```bash
pnpm typecheck
```

Check dependency version consistency:

```bash
pnpm syncpack:lint
```

Fix dependency version mismatches:

```bash
pnpm syncpack:fix
```

## Application Details

### Firm Site

Located in `apps/firm/site` - Public-facing website for the agency with 3D animations using React Three Fiber and Three.js.

### Project Management

Located in `apps/business-applications/project-management` - Industry-agnostic project management system inspired by Karbon, featuring:

- Dashboard with metrics and quick links
- Kanban board and list view for work items
- Unified triage inbox for email
- Template-based workflows with automations
- Personal planning (My Week, Calendar)
- Time tracking and budgets
- Client portal (optional)

### Booking Platform

Located in `apps/business-applications/booking` - Native Calendly substitution for appointment scheduling, featuring:

- Calendar-based availability management
- Time slot generation and booking
- Recurring event support
- Conflict detection
- Embeddable booking widget
- Confirmation and cancellation workflows

### Demo Apps

Located in `apps/demo/` - Demo applications showcasing platform capabilities:

- **day-care** - Day care management demo
- **hair-salor** - Hair salon management demo
- **tax-firm** - Tax firm management demo

## Technology Stack

### Core Technologies

- **Frontend Framework**: React 19.2.4, Next.js 16.2.6
- **Language**: TypeScript 5.7.0
- **Styling**: Tailwind CSS 4.0
- **Package Manager**: pnpm 11.0.0
- **Build System**: Turborepo 2.4.0
- **Monorepo**: pnpm workspaces with catalog protocol

### UI & Design Stack

- **Component Library**: Custom design system (CVA, clsx, tailwind-merge)
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **3D Graphics**: React Three Fiber, Three.js (firm site)

### Testing Stack

- **Test Runner**: Vitest 2.1.0
- **Coverage Provider**: v8
- **Test Environment**: happy-dom, jsdom
- **Testing Library**: @testing-library/react, @testing-library/jest-dom

### Code Quality Tools

- **Linter**: Biome 0.3.3 (primary), ESLint 9 (hybrid setup)
- **Formatter**: Biome (tab indentation, 100 char line width)
- **Git Hooks**: Lefthook 1.9.0
- **Commit Linting**: Commitlint with conventional commits
- **Dependency Management**: Syncpack 13.0.0

### Specialized Libraries

- **Automation**: json-rules-engine 4.0.0
- **Email**: nodemailer 6.9.0
- **Date Utilities**: date-fns 3.6.0
- **Build Tools**: tsup 8.3.0

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage

# Run fast tests (if available)
pnpm test:fast

# Run benchmark tests
pnpm test:bench

# Run tests with sharding for CI
pnpm test:shard 1/4

# Merge coverage reports from shards
pnpm test:merge
```

### Test Configuration

- **Pool**: threads (for better performance)
- **Coverage Provider**: v8
- **Coverage Thresholds**: 80% global (lines, branches, functions, statements)
- **Core Package Thresholds**: 90% (lines, functions, statements), 85% (branches)
- **Per-file Thresholds**: Disabled (global only)
- **Reporters**: default, html (local), default + github-actions (CI)
- **Test Tags**: unit, integration, e2e, slow, db, flaky
- **Timeout**: 10s for tests, hooks, and teardown
- **Isolation**: Enabled (isolate mode)

### CI Sharding

For large test suites, use Vitest sharding to parallelize test execution across multiple CI machines:

```yaml
# Example GitHub Actions configuration
strategy:
  matrix:
    shardIndex: [1, 2, 3, 4]
    shardTotal: [4]

steps:
  - name: Run tests
    run: pnpm test --reporter=blob --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}

  - name: Upload blob report
    uses: actions/upload-artifact@v4
    with:
      name: blob-report-${{ matrix.shardIndex }}
      path: .vitest-reports/*

# Merge reports from all shards
- name: Merge reports
  run: npx vitest --merge-reports
```

See [docs/testing-strategy.md](./docs/testing-strategy.md) and [docs/vitest-ci-sharding.md](./docs/vitest-ci-sharding.md) for detailed testing documentation.

## Git Hooks

This repository uses **Lefthook** for fast Git hooks (Go-based, parallel execution):

### Pre-commit Hooks

- **Biome format**: Auto-format staged files (JS, JSX, TS, TSX, JSON, CSS, MD)
- **Biome lint**: Auto-fix linting issues
- **Biome check**: Combined lint and format check

### Commit-msg Hooks

- **Commitlint**: Enforce conventional commit format (feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert)

### Pre-push Hooks

- **Type check**: Run TypeScript type checking across all packages

## Development Workflow

### Commit Convention

Follow conventional commits:

```bash
feat: add new feature
fix: fix bug
docs: update documentation
style: formatting changes
refactor: code refactoring
perf: performance improvements
test: add or update tests
build: build system changes
ci: CI/CD changes
chore: maintenance tasks
revert: revert previous commit
```

### Code Quality Standards

- **Formatting**: Use Biome (tab indentation, 100 char line width)
- **Linting**: Biome for 90% of linting, ESLint for complex custom rules
- **Type Safety**: Strict TypeScript mode enabled
- **Testing**: Aim for 80% coverage, 90% for core packages
- **Dependencies**: Use catalog protocol for shared versions

### Package Management

This monorepo uses **pnpm workspaces** with **catalog protocol** for dependency management:

- Use `catalog:` for shared dependency versions
- Use `workspace:*` for local package dependencies
- Run `pnpm syncpack:lint` to check version consistency
- Run `pnpm syncpack:fix` to fix version mismatches
- Catalog mode is set to `strict` to prevent version drift

## Turborepo Configuration

Turborepo is configured with task dependencies and caching:

- **build**: Depends on `^build` (upstream packages)
- **test**: Depends on `^build` and `@agency/vitest-config#build`
- **dev**: No caching, persistent (long-running)
- **lint/format**: No outputs, fast checks
- **typecheck**: Outputs `*.tsbuildinfo` for incremental builds

See [turbo.json](./turbo.json) for full task configuration.

## Next.js 16 Notes

This monorepo uses Next.js 16 with breaking changes from previous versions:

- **App Router**: Used by default (not Pages Router)
- **Server Components**: Default, use Client Components only when needed
- **Turbopack**: Default for `next dev` and `next build` (no flag needed)
- **Async APIs**: All request-time APIs (cookies, headers, params, searchParams) are now async
- **Cache Components**: Use `cacheComponents: true` in next.config.ts
- **Proxy**: Use `proxy.ts` instead of `middleware.ts` for Node.js runtime

See [AGENTS.md](./AGENTS.md) for detailed Next.js 16 agent rules.

## Documentation

- [MONOREPO.md](./MONOREPO.md) - Monorepo architecture and structure
- [AGENTS.md](./AGENTS.md) - Next.js 16 agent rules and breaking changes
- [docs/testing-strategy.md](./docs/testing-strategy.md) - Comprehensive testing strategy
- [docs/vitest-ci-sharding.md](./docs/vitest-ci-sharding.md) - CI sharding configuration
- [TODO.md](./TODO.md) - Development roadmap and tasks

## License

Private - All rights reserved
