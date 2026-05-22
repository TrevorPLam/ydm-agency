---
trigger: glob
globs: packages/*/src/**/*.ts, apps/**/src/**/*.ts
---

<async_patterns>
- Use async/await for readable asynchronous code
- Use try-catch for error handling in async functions
- Use Promise.all() for independent concurrent operations
- Use Promise.allSettled() when you need all results regardless of failures
- Use Promise.race() for timeout handling
- Defer await until data is actually needed to prevent waterfalls
- Use for await...of for async iteration over streams
- Use AbortController for canceling async operations
- Don't mix callbacks with promises - use one pattern consistently
- Avoid creating promises from callbacks when possible
- Use async functions in array methods (map, filter, reduce) carefully
- Handle Promise rejections in async functions
- Use proper error boundaries for async operations in React
- Consider structured concurrency patterns for complex async flows
- Don't fire-and-forget async calls - handle errors or await them
</async_patterns>
