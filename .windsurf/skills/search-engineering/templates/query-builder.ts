export interface SearchQuery {
  query: string
  filters?: string
  facets?: string[]
  page?: number
  hitsPerPage?: number
}

export function buildSearchQuery(params: SearchParams): SearchQuery {
  const query: SearchQuery = {
    query: params.q,
    page: params.page || 0,
    hitsPerPage: params.hitsPerPage || 10,
  }

  if (params.category) {
    query.filters = `category:${params.category}`
  }

  if (params.tags) {
    query.facets = ['tags']
  }

  return query
}
