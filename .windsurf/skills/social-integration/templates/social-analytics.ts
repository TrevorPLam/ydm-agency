export function trackSocialShare(platform: string, contentId: string) {
  window.analytics?.track('Social Share', { platform, contentId })
}

export function trackSocialLogin(platform: string) {
  window.analytics?.track('Social Login', { platform })
}
