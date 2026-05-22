---
trigger: glob
globs: .env*, apps/**/.env*, packages/**/.env*
---

<environment_configuration>
- Use Infisical for all secrets management
- Never commit .env files to git
- Add .env, .env.local, .env.*.local to .gitignore
- Use environment-specific secrets (dev, staging, prod)
- Scope secrets per app for isolation
- Use environment variables for configuration, not hardcoded values
- Validate environment variables at application startup
- Use TypeScript types for environment variable schemas
- Provide default values for non-sensitive configuration
- Document required environment variables in README
- Use .env.example as template for required variables
- Rotate secrets regularly
- Don't use .env files in production - use secret management
- Keep secrets out of logs and error messages
- Use different database URLs per environment
- Use different API keys per environment
</environment_configuration>
