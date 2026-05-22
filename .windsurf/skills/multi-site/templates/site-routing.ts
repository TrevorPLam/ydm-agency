export function getSiteFromHostname(hostname: string): string {
  const siteMap: Record<string, string> = {
    'client1.example.com': 'site-1',
    'client2.example.com': 'site-2',
  }
  return siteMap[hostname] || 'default'
}

export function getSiteFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/sites\/([^/]+)/)
  return match ? match[1] : null
}
