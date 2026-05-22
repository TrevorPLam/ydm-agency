'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const HeroScene = dynamic(() => import('./hero-scene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />,
})

export function HeroSceneWrapper() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
  }, [])

  if (prefersReducedMotion) {
    return <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a1a] to-black" aria-hidden="true" />
  }

  return <HeroScene />
}
