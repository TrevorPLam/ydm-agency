export function buildFilter(filters: FilterConfig): string {
  const parts: string[] = []

  if (filters.category) {
    parts.push(`category:${filters.category}`)
  }

  if (filters.tags && filters.tags.length > 0) {
    parts.push(`tags:${filters.tags.join(' OR ')}`)
  }

  if (filters.dateRange) {
    parts.push(`publishedAt:${filters.dateRange}`)
  }

  return parts.join(' AND ')
}

export interface FilterConfig {
  category?: string
  tags?: string[]
  dateRange?: string
}
