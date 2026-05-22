---
trigger: glob
globs: packages/*/src/**/*.ts, apps/**/src/**/*.ts
---

<error_handling>
- Create custom error classes extending Error for domain-specific errors
- Use consistent error properties: code, message, statusCode, context
- Implement centralized error handling middleware for Express/Next.js
- Use try-catch for synchronous operations, handle Promise rejections for async
- Never expose stack traces to clients in production
- Log errors with context (request ID, user ID, tenant ID)
- Use HTTP status codes appropriately (400 for client errors, 500 for server errors)
- Distinguish between expected failures (validation errors) and unexpected errors
- Use Result pattern for operations that can fail without exceptions
- Handle errors at appropriate boundaries (API layer, service layer)
- Don't swallow errors silently - always log or handle
- Use error boundaries in React for component-level error handling
- Implement graceful degradation for non-critical failures
- Use type guards to narrow error types in catch blocks
- Preserve original error when wrapping in custom errors
</error_handling>
