export function matchesTargeting(user: User, rule: TargetingRule): boolean {
  if (rule.locale && !rule.locale.includes(user.locale)) {
    return false
  }

  if (rule.device && !rule.device.includes(user.device)) {
    return false
  }

  return true
}

interface User {
  locale: string
  device: string
  custom?: Record<string, any>
}
