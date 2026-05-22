---
trigger: glob
globs: apps/**/src/**/*.tsx, packages/*/src/**/*.ts
---

<performance_patterns>
- Eliminate waterfalls by using Promise.all() for independent operations
- Defer await until data is actually needed to prevent sequential loading
- Use Server Components by default to reduce client JavaScript
- Use dynamic imports for code splitting and lazy loading
- Optimize images with next/image (proper sizing, formats, lazy loading)
- Use React Cache for deduping fetch calls in Server Components
- Implement proper caching strategies (CDN, Redis, stale-while-revalidate)
- Use cross-request LRU caching for expensive computations
- Minimize serialization at RSC boundaries
- Use CSS content-visibility for off-screen content
- Implement virtual scrolling for long lists
- Use index maps for repeated lookups instead of array searches
- Lazy initialize state in useState to avoid expensive initial computations
- Use functional setState updates to avoid stale closures
- Defer non-critical third-party library loading
- Monitor Core Web Vitals (LCP, FID, CLS) in production
- Use React Compiler auto-memoization where beneficial (Next.js 15+)
- Profile before optimizing to identify actual bottlenecks
- Keep initial bundle under 200KB for fast parse time on mobile
</performance_patterns>
