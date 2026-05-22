export function detectLocale(acceptLanguage: string, defaultLocale: string): string {
  const locales = ['en', 'es', 'fr', 'de']
  const acceptedLocales = acceptLanguage.split(',').map(l => l.split(';')[0].trim())

  for (const locale of acceptedLocales) {
    if (locales.includes(locale)) {
      return locale
    }
  }

  return defaultLocale
}
