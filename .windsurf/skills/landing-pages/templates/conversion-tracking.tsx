'use client'

import { useEffect } from 'react'

export function TrackConversion({ event, value }: { event: string; value: number }) {
  useEffect(() => {
    window.gtag?.('event', event, { value })
    window.analytics?.track(event, { value })
  }, [event, value])

  return null
}
