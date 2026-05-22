---
trigger: glob
globs: packages/*/src/**/*.ts
---

<event_driven>
- Use event bus for cross-domain communication
- Define event types with TypeScript
- Event handlers must be pure functions
- Never make remote calls in event handlers
- Emit domain events from aggregates after state changes
- Use transactional outbox pattern for reliable event publishing
- Keep event handlers idempotent for at-least-once delivery
- Use domain events for business events (not technical events)
- Consider event sourcing for audit trails and replay capability
</event_driven>
