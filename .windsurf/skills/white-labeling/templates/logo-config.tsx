'use client'

import { useBrand } from './theme-provider'

export function BrandLogo() {
  const brand = useBrand()
  return <img src={brand?.logo} alt={brand?.name} className="h-8" />
}
