'use client'

import { useEffect } from 'react'

export function TrackFormInteraction({ formName, action }: { formName: string; action: string }) {
  useEffect(() => {
    window.analytics?.track('Form Interaction', { formName, action })
  }, [formName, action])

  return null
}
