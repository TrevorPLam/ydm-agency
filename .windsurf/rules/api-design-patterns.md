---
trigger: glob
globs: apps/**/src/app/api/**/*.ts, packages/*/src/api/**/*.ts
---

<api_design>
- Use nouns instead of verbs in resource URLs (e.g., /users, not /getUsers)
- Use HTTP methods correctly: GET for read, POST for create, PUT/PATCH for update, DELETE for delete
- Use plural nouns for resource collections (e.g., /users, not /user)
- Use kebab-case for URL paths (e.g., /user-profiles, not /userProfiles)
- Nest resources logically (e.g., /users/:id/posts for user's posts)
- Use query parameters for filtering, sorting, and pagination (e.g., ?page=2&limit=20&sort=name)
- Return appropriate HTTP status codes (200 for success, 201 for created, 400 for client errors, 500 for server errors)
- Use consistent response structure with success, data, and error fields
- Version APIs via URL path (e.g., /api/v1/users, /api/v2/users)
- Implement pagination for large datasets with metadata (page, limit, total)
- Use stateless communication - include all necessary data in each request
- Implement rate limiting to prevent abuse
- Use proper authentication (JWT, OAuth 2.0) and authorization checks
- Validate all input on the server side
- Return detailed error messages with error codes for client debugging
- Use CORS headers appropriately for cross-origin requests
- Implement HATEOAS for RESTful hypermedia links when applicable
- Use GraphQL for complex data requirements with nested queries
- Design GraphQL schemas with evolution in mind (deprecate fields, don't remove)
- Use GraphQL DataLoader to prevent N+1 query problems
</api_design>
