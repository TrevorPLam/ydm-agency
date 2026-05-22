---
trigger: glob
globs: packages/database/src/**/*.ts, packages/*/src/repository/*.ts
---

<database_optimization>
- Always use connection pooling
- Index columns frequently used in WHERE, JOIN, ORDER BY clauses
- Avoid indexing every column (unnecessary indexes hurt write performance)
- Index foreign key columns to speed up joins
- Use composite indexes for multi-column queries (order by query patterns)
- Avoid indexing columns with low cardinality (boolean flags, few unique values)
- Don't index very wide/large columns (text, binary)
- Use indexes to support sorting (ORDER BY) and grouping (GROUP BY)
- Avoid N+1 queries
- Use select only needed columns
- Use pagination for large result sets
- Use transactions for multi-step operations
- Monitor query performance with EXPLAIN
- Regularly update table statistics for query planner
- Consider index rebuilds for fragmented indexes (only when necessary)
</database_optimization>
