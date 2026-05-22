'use client'

import { createContext, useContext } from 'react'

const ThemeContext = createContext<BrandConfig | null>(null)

export function ThemeProvider({ brand, children }: { brand: BrandConfig; children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={brand}>
      <div style={{ '--primary': brand.primaryColor, '--secondary': brand.secondaryColor }}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useBrand() {
  return useContext(ThemeContext)
}
