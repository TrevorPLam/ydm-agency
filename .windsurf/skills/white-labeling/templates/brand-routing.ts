export function getBrandFromHostname(hostname: string): string {
  const brandMap: Record<string, string> = {
    'client1.com': 'brand-1',
    'client2.com': 'brand-2',
  }
  return brandMap[hostname] || 'default'
}

export function getBrandFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/brand\/([^/]+)/)
  return match ? match[1] : null
}
