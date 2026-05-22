---
trigger: glob
globs: apps/**/src/**/*.ts
---

<bundle_optimization>
- Use dynamic imports for code splitting
- Lazy load routes in Next.js
- Use tree-shaking for unused code
- Avoid large dependencies
- Use @next/bundle-analyzer to analyze bundles
- Optimize images and assets
- Use Server Components by default to reduce client JavaScript
- Use Next.js automatic code splitting (route-based, component-based)
- Avoid importing entire libraries when only one function is needed
- Keep initial bundle under 200KB for fast parse time on mobile
- Use BundleWatch to monitor bundle size
- Opt out specific packages from bundling when needed
- Leverage Cache Components for selective caching in Next.js 16
</bundle_optimization>
