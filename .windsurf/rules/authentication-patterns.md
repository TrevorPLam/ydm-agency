---
trigger: glob
globs: packages/auth/src/**/*.ts, apps/**/src/**/*.ts
---

<authentication_patterns>
- Use JWT for stateless authentication (15min access token, 7-day refresh token)
- Include tenant ID in JWT claims
- Verify JWT on every protected request
- Use RS256 algorithm for JWT signing (public/private key pairs)
- Hash passwords with bcrypt or argon2 (argon2id preferred for new implementations)
- Never store plain text passwords
- Implement token revocation with blocklist if needed
- Use passkeys/WebAuthn for passwordless authentication where supported
- Use OAuth 2.0 / OpenID Connect for third-party auth (OAuth 2.1 is still draft)
- Use secure, httpOnly, sameSite cookies for session-based auth
- Never implement OAuth2 yourself - use established libraries (Auth.js, Clerk, NextAuth)
</authentication_patterns>
