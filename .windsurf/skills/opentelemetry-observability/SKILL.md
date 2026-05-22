---
name: opentelemetry-observability
description: Guide OpenTelemetry installation and telemetry configuration
---

## Purpose
Set up OpenTelemetry for observability with tracing, metrics, and exporter configuration. OpenTelemetry JavaScript SDK 2.0 is now available with package versions >=2.0.0 for stable packages and >=0.200.0 for unstable packages.

## When to Invoke
- When setting up observability infrastructure
- When configuring OpenTelemetry
- When implementing telemetry
- When migrating to OpenTelemetry JS SDK 2.x

## Prerequisites
- TypeScript configured
- OpenTelemetry account or self-hosted backend

## Implementation Steps

### 1. Install OpenTelemetry packages
```bash
pnpm add @opentelemetry/api @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node -F <workspace>
```

### 2. Create tracing configuration
Use the template in `templates/tracing-config.ts`

### 3. Create metrics configuration
Use the template in `templates/metrics-config.ts`

### 4. Configure exporter
Use `templates/exporter-setup.ts`

### 5. Initialize OpenTelemetry
Add initialization to application entry point

## Templates
- `templates/tracing-config.ts` - Tracing configuration
- `templates/metrics-config.ts` - Metrics configuration
- `templates/exporter-setup.ts` - Exporter setup guide

## Patterns
- Use semantic conventions
- Export to multiple backends
- Sample traces appropriately

## Anti-Patterns
- Don't export sensitive data
- Don't ignore telemetry errors
- Don't over-sample traces

## Related Skills
- G-005: OpenTelemetry Observability Skill
