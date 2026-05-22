---
trigger: glob
globs: apps/**/src/**/*.ts, packages/*/src/**/*.ts
---

<security_patterns>
- Validate all input on the server side, never trust client-side validation
- Use parameterized queries or ORM to prevent SQL injection
- Encode all output contextually to prevent XSS attacks
- Use Content Security Policy (CSP) headers to restrict resource loading
- Implement proper authentication (JWT, OAuth 2.0, passkeys)
- Use secure, httpOnly, sameSite cookies for session management
- Implement rate limiting to prevent brute force and DDoS attacks
- Use HTTPS/TLS for all communications in production
- Never expose sensitive data in logs, error messages, or API responses
- Implement proper authorization checks at every layer (not just UI)
- Use helmet or similar middleware for security headers
- Sanitize file uploads and validate file types
- Use environment variables for secrets, never hardcode credentials
- Implement CORS policies appropriately for cross-origin requests
- Regularly update dependencies to patch security vulnerabilities
- Use security linters (npm audit, Snyk, Dependabot) in CI
- Implement proper password hashing (bcrypt, argon2) for user authentication
- Use secure random number generation for tokens and session IDs
- Implement proper session management with expiration and revocation
- Log security events (login attempts, access violations) for monitoring
</security_patterns>
