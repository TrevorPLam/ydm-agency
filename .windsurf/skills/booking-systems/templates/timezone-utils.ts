import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'

export function toLocalTime(utcDate: Date, timezone: string): Date {
  return utcToZonedTime(utcDate, timezone)
}

export function toUtcTime(localDate: Date, timezone: string): Date {
  return zonedTimeToUtc(localDate, timezone)
}
