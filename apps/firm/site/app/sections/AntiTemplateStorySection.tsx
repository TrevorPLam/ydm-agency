'use client'

import { useRef, useEffect, useState } from 'react'
import { ShieldIcon, CompassIcon, SparkIcon } from '@/components/illustrations'

export function AntiTemplateStorySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [clipProgress, setClipProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      // How far into the section (0-1)
      const progress = Math.min(1, Math.max(0, -rect.top / windowHeight))
      setClipProgress(progress)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // Initial call
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Dynamic clip-path: a diagonal tear that moves from left to right
  const tearX = clipProgress * 100

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-black">
      {/* Template facade (top layer, gets ripped away) */}
      <div 
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{
          clipPath: `polygon(${tearX}% 0, 100% 0, 100% 100%, ${Math.max(0, tearX - 20)}% 100%)`,
          transition: 'clip-path 0.1s ease-out'
        }}
      >
        <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center">
          <div className="text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-400 font-rajdhani">Generic Agency Template</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="h-8 w-8 bg-gray-700 rounded mb-4 mx-auto" />
                <div className="h-4 bg-gray-700 rounded mb-2" />
                <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto" />
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="h-8 w-8 bg-gray-700 rounded mb-4 mx-auto" />
                <div className="h-4 bg-gray-700 rounded mb-2" />
                <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto" />
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="h-8 w-8 bg-gray-700 rounded mb-4 mx-auto" />
                <div className="h-4 bg-gray-700 rounded mb-2" />
                <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto" />
              </div>
            </div>
            <p className="mt-8 text-gray-500 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>

      {/* Revealed human content (behind the tear, visible on the left side) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="max-w-4xl text-left px-8 w-full">
          <h2 className="text-5xl md:text-7xl font-handwritten text-[var(--accent)] mb-12 leading-tight">
            We're not an agency.
          </h2>
          <div className="flex flex-col gap-12">
            <div className="flex items-start gap-6">
              <ShieldIcon className="h-16 w-16 text-[var(--accent)] opacity-80 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold font-rajdhani mb-2">One person, full accountability.</h3>
                <p className="text-gray-400 font-inter">No junior account managers. No handoffs. Just me, directly involved in every decision.</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <CompassIcon className="h-16 w-16 text-[var(--accent)] opacity-80 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold font-rajdhani mb-2">Strategy over spreadsheets.</h3>
                <p className="text-gray-400 font-inter">Human intuition + AI speed, not robotic plans that miss the point.</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <SparkIcon className="h-16 w-16 text-[var(--accent)] opacity-80 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold font-rajdhani mb-2">You own everything.</h3>
                <p className="text-gray-400 font-inter">No lock-in, no black boxes, no proprietary platforms. Your code, your data, your business.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tear edge effect (a jagged SVG line) */}
      <div 
        className="absolute top-0 bottom-0 pointer-events-none z-20"
        style={{ left: `${tearX}%` }}
      >
        <svg width="20" height="100%" className="h-full" preserveAspectRatio="none">
          <path 
            d="M10 0 Q15 20 5 40 T10 80 T5 120 T10 160 T5 200 T10 240 T5 280 T10 320 T5 360 T10 400 T5 440 T10 480 T5 520 T10 560 T5 600 T10 640 T5 680 T10 720 T5 760 T10 800 T5 840 T10 880 T5 920 T10 960 T5 1000 T10 1040 T5 1080" 
            stroke="var(--accent)" 
            fill="none" 
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </section>
  )
}
