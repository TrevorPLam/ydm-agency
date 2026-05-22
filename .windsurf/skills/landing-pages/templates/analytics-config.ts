export function trackPageView(page: string) {
  window.gtag?.('event', 'page_view', { page_path: page })
  window.analytics?.page(page)
}

export function trackCTAClick(cta: string) {
  window.gtag?.('event', 'cta_click', { cta })
  window.analytics?.track('CTA Clicked', { cta })
}
