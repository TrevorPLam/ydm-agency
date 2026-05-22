export const cacheConfig = {
  default: 3600, // 1 hour
  short: 300, // 5 minutes
  long: 86400, // 1 day
}

export function getCacheKey(key: string, params?: Record<string, any>): string {
  const paramString = params ? JSON.stringify(params) : ''
  return `${key}:${paramString}`
}
