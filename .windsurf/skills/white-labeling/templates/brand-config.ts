export interface BrandConfig {
  id: string
  name: string
  primaryColor: string
  secondaryColor: string
  logo: string
  favicon: string
  customDomain?: string
}

export async function getBrandConfig(brandId: string): Promise<BrandConfig> {
  return db.query('SELECT * FROM brands WHERE id = $1', [brandId])
}
