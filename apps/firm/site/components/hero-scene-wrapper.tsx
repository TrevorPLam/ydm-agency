'use client'

import dynamic from 'next/dynamic'
import React, { Suspense, useEffect, useState } from 'react'

const HeroScene = dynamic(() => import('./hero-scene'), {
  ssr: false,
})

function HeroSceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        <p className="text-sm text-gray-400">Loading 3D experience...</p>
      </div>
    </div>
  )
}

function HeroSceneError({ error }: { error: Error }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-black via-[#0a0a1a] to-black">
      <div className="text-center">
        <p className="text-sm text-gray-400">
          3D content unavailable. Please refresh or contact support.
        </p>
      </div>
    </div>
  )
}

class HeroSceneErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return <HeroSceneError error={this.state.error} />
    }
    return this.props.children
  }
}

export function HeroSceneWrapper() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  if (prefersReducedMotion) {
    return (
      <div
        className="absolute inset-0 bg-linear-to-br from-black via-[#0a0a1a] to-black"
        aria-label="Animated 3D particle field disabled for reduced motion preference"
      />
    )
  }

  return (
    <HeroSceneErrorBoundary>
      <Suspense fallback={<HeroSceneFallback />}>
        <HeroScene />
      </Suspense>
    </HeroSceneErrorBoundary>
  )
}
