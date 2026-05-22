export function getSiteId(hostname: string): string {
  const siteMap: Record<string, string> = {
    'client1.agency.com': 'client-1',
    'client2.agency.com': 'client-2',
  }
  return siteMap[hostname] || 'default'
}

export function trackSiteEvent(event: string, properties: Record<string, any>): void {
  const siteId = getSiteId(window.location.hostname)
  window.analytics?.track(event, { ...properties, siteId })
}
