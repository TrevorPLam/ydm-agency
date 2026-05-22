'use client'

import { useEffect } from 'react'

export function TrackEvent({ event, properties }: { event: string; properties: Record<string, any> }) {
  useEffect(() => {
    window.analytics?.track(event, properties)
  }, [event, properties])

  return null
}
