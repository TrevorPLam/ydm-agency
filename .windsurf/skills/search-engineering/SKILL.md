---
name: search-engineering
description: Guide search integration with indexing and filtering
---

## Purpose
Guide search implementation with integration patterns, indexing, query patterns, and filtering.

## When to Invoke
- When implementing search packages
- When setting up search indexing
- When configuring search queries

## Prerequisites
- Search provider configured
- Database configured

## Implementation Steps

### 1. Set up search integration
Use the template in `templates/search-client.ts`

### 2. Implement indexing patterns
Reference `templates/indexing-strategy.ts`

### 3. Add query patterns
Use `templates/query-builder.ts`

### 4. Configure filtering
Use `templates/filtering.ts`

## Templates
- `templates/search-client.ts` - Search client
- `templates/indexing-strategy.ts` - Indexing strategy
- `templates/query-builder.ts` - Query builder
- `templates/filtering.ts` - Filtering

## Patterns
- Use Algolia or Meilisearch
- Implement real-time indexing
- Support faceted search

## Anti-Patterns
- Don't index without filtering
- Don't ignore search relevance
- Don't skip pagination

## Related Skills
- Content Fetching Skill
- Next.js Best Practices Skill
