'use client'

import { useEffect } from 'react'

export function TrackExperiment({ experimentId, variant }: { experimentId: string; variant: string }) {
  useEffect(() => {
    window.analytics?.track('Experiment Viewed', { experimentId, variant })
  }, [experimentId, variant])

  return null
}
