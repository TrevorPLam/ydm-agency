---
trigger: always_on
---

<nextjs_16_patterns>

- Read Next.js 16 docs before writing code
- Use App Router, not Pages Router
- Use Server Components by default
- Use Client Components only when needed
- Use new fetch API, not getServerSideProps
- Use new metadata API, not next/head
- Use new route handlers, not API routes
- Turbopack is now default for next dev and next build (no --turbopack flag needed)
- Use --webpack flag to opt out of Turbopack if needed
- All Request-time APIs (cookies, headers, draftMode, params, searchParams) are now async only - use await
- params in layout.js, page.js, route.js, default.js, opengraph-image, twitter-image, icon, and apple-icon are now async
- searchParams in page.js is now async
- Use cacheComponents: true in next.config.ts to enable Cache Components (replaces experimental.ppr flag)
- Use "use cache" directive for opt-in caching in pages, components, and functions
- Rename middleware.ts to proxy.ts for nodejs runtime proxy (middleware.ts deprecated but still available for edge runtime)
- Use proxy function name instead of middleware for proxy exports
- Update config flags: skipMiddlewareUrlNormalize → skipProxyUrlNormalize
- Note: PPR in Next.js 16 works differently than Next.js 15 canaries - see migration docs if upgrading from canary
- Removed features: useAmp, next lint command, devIndicators, serverRuntimeConfig, publicRuntimeConfig, experimental.turbopack, experimental.dynamicIO, experimental.ppr, unstable_rootParams
- Deprecated: next/legacy/image (use next/image), images.domains (use images.remotePatterns)
- next/image breaking changes: minimumCacheTTL, imageSizes, qualities defaults changed; dangerouslyAllowLocalIP defaults to false; maximumRedirects defaults to 0
</nextjs_16_patterns>
