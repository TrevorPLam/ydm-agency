'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    window.analytics?.track('Web Vitals', {
      name: metric.name,
      value: metric.value,
      id: metric.id,
    })
  })

  return null
}
