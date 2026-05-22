---
trigger: glob
globs: apps/**/src/app/**/*.tsx
---

<app_router>
- Use app directory structure
- Use route groups for organization without affecting URL structure
- Use parallel routes for independent slot rendering
- Use intercepting routes for modals and overlays
- Use route segments for dynamic routes (params are async in Next.js 16)
- Use error.tsx for error boundaries
- Use loading.tsx for loading states
- Use default.js for parallel route fallbacks
- Use layout.tsx for shared UI across routes
- Use template.tsx for layouts that re-render on navigation
- Use not-found.tsx for 404 handling
</app_router>
