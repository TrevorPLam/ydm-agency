---
trigger: model_decision
---

<caching_strategy>
- Cache expensive computations
- Use CDN for static assets
- Cache API responses when appropriate
- Use time-based invalidation with appropriate TTL per data type
- Use event-based invalidation on data changes (delete specific keys, publish events)
- Use stale-while-revalidate for background refresh (serve stale, update async)
- Don't cache sensitive data
- Use cache headers appropriately (Cache-Control, ETag)
- Monitor cache hit rates
- Use Redis pub/sub for distributed cache invalidation
- Cache frequently accessed data, rarely accessed data shouldn't be cached
- Profile before optimizing to identify actual bottlenecks
</caching_strategy>
