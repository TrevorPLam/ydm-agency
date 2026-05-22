# Secret Scoping Patterns

## Environment Scoping
- dev: Development environment secrets
- staging: Staging environment secrets
- production: Production environment secrets

## Workspace Scoping
- Scope secrets by workspace/package
- Use prefixes: `<workspace>_<secret_name>`
- Example: `database_url`, `auth_secret`

## Best Practices
- Use descriptive secret names
- Group related secrets
- Rotate secrets regularly
