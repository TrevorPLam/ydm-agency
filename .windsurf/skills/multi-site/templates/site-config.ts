export interface SiteConfig {
  id: string
  name: string
  domain: string
  theme: string
  features: string[]
}

export const siteConfigs: Record<string, SiteConfig> = {
  'site-1': {
    id: 'site-1',
    name: 'Client 1',
    domain: 'client1.example.com',
    theme: 'theme-1',
    features: ['blog', 'contact'],
  },
}

export function getSiteConfig(siteId: string): SiteConfig | null {
  return siteConfigs[siteId] || null
}
