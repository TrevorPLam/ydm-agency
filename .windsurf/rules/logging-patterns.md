---
trigger: glob
globs: packages/*/src/**/*.ts, apps/**/src/**/*.ts
---

<logging_patterns>
- Use structured logging (JSON format) for machine parsing
- Use Pino for high-performance logging in Node.js
- Use Winston for complex applications needing flexibility
- Use Morgan for HTTP request logging middleware
- Configure appropriate log levels (error, warn, info, debug)
- Log request metadata: method, endpoint, status, duration, IP address
- Log errors with stack traces, error messages, and context details
- Include request ID, user ID, tenant ID in all log entries
- Never log sensitive data (passwords, tokens, credit cards)
- Set up log rotation to manage file sizes
- Centralize logs using services like ELK stack for observability
- Log security events: login attempts, access violations, failed auth
- Log performance metrics: slow queries, delayed responses, cache misses
- Log system events: service startup, shutdown, memory warnings
- Log application events: user actions, business logic decisions
- Use async logging to avoid blocking application execution
</logging_patterns>
