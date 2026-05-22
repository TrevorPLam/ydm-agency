export function hasConsent(): boolean {
  return localStorage.getItem('analytics-consent') === 'granted'
}

export function grantConsent(): void {
  localStorage.setItem('analytics-consent', 'granted')
}

export function revokeConsent(): void {
  localStorage.setItem('analytics-consent', 'denied')
}
