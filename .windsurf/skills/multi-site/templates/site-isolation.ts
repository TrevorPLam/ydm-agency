export function isolateSiteData<T>(siteId: string, data: T): T {
  return {
    ...data,
    _siteId: siteId,
  }
}

export function filterSiteData<T extends { _siteId?: string }>(siteId: string, data: T[]): T[] {
  return data.filter((item) => !item._siteId || item._siteId === siteId)
}
