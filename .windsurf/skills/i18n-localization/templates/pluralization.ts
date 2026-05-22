export function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural
}

export function formatNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(value)
}

export function formatDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale).format(date)
}
