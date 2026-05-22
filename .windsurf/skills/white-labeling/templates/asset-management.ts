export function getBrandAsset(brandId: string, assetPath: string): string {
  return `/brands/${brandId}${assetPath}`
}

export function getBrandLogo(brandId: string): string {
  return getBrandAsset(brandId, '/logo.png')
}

export function getBrandFavicon(brandId: string): string {
  return getBrandAsset(brandId, '/favicon.ico')
}
