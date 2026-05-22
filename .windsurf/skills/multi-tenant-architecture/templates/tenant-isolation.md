# Tenant Isolation Patterns

## Subdomain Routing
- `client1.agency.com`
- `client2.agency.com`

## Path-Based Routing
- `agency.com/client1`
- `agency.com/client2`

## Database Isolation
- Shared database with tenant_id
- Separate database per tenant
