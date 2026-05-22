# Agency Platform

A monorepo containing business applications, demo applications, and shared packages.

## Monorepo Structure

This repository uses **Turborepo** to manage multiple applications and shared packages:

### Applications

**Business Applications**
- **apps/firm/site** - Firm website (Next.js)
- **apps/firm/client-portal** - Firm client portal (Next.js)
- **apps/business-applications/project-management** - Project management system (Next.js)
- **apps/business-applications/booking** - Scheduling platform (Calendly substitution, Next.js)

**Client Applications**
- **apps/clients/marketing-sites/fake-client-1** - Marketing site for Fake Client 1 (Next.js)
- **apps/clients/landing-pages/fake-client-1** - Landing page for Fake Client 1 (Next.js)

**Demo Applications**
- **apps/demo/day-care** - Day care management demo (Next.js)
- **apps/demo/hair-salor** - Hair salon management demo (Next.js)
- **apps/demo/tax-firm** - Tax firm management demo (Next.js)

### Shared Packages

- **packages/core** - Domain models and TypeScript interfaces
- **packages/ui** - Design system and UI components
- **packages/email-engine** - Email synchronisation logic
- **packages/automator-engine** - Workflow automation rule engine
- **packages/reporting** - Query builders and aggregation logic
- **packages/utils** - Common utility functions
- **packages/calendar** - Calendar domain (time ranges, events, recurrence)
- **packages/availability** - Availability scheduling (slots, rules)
- **packages/booking** - Booking domain (bookings, status machine)
- **packages/auth** - Authentication (JWT, sessions, RBAC)

See [MONOREPO.md](./MONOREPO.md) for detailed documentation.

## Getting Started

Install dependencies:

```bash
npm install
```

Run all applications:

```bash
npm run dev
```

Run specific application:

```bash
cd apps/firm/site
npm run dev
```

Build all:

```bash
npm run build
```

## Applications

### Firm Site
Located in `apps/firm/site` - Public-facing website for the agency.

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

### Demo Applications
Located in `apps/demo/` - Demo applications showcasing platform capabilities:
- **day-care** - Day care management demo
- **hair-salor** - Hair salon management demo
- **tax-firm** - Tax firm management demo

## Technology Stack

- **Frontend**: React 19, Next.js 16, TypeScript, Tailwind CSS
- **Build**: Turborepo, pnpm workspaces
- **UI**: shadcn/ui components
- **Testing**: Vitest 4.0 with v8 coverage provider

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
```

### Test Configuration

- **Pool**: threads (for better performance)
- **Coverage Provider**: v8
- **Coverage Thresholds**: 90% (lines, branches, functions, statements)
- **Per-file Thresholds**: Enabled
- **Reporters**: verbose, json, junit

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

## Documentation

- [MONOREPO.md](./MONOREPO.md) - Monorepo architecture and structure
- [AGENTS.md](./AGENTS.md) - Next.js agent rules
