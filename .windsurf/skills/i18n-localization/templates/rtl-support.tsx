'use client'

import { useLocale } from 'next-intl'

const rtlLocales = ['ar', 'he', 'fa']

export function isRTL(locale: string): boolean {
  return rtlLocales.includes(locale)
}

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale()
  const dir = isRTL(locale) ? 'rtl' : 'ltr'

  return <div dir={dir}>{children}</div>
}
