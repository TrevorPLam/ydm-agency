'use client'

import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect } from 'react'

export function ImageTrail({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 30 })
  const springY = useSpring(y, { stiffness: 300, damping: 30 })

  useEffect(() => {
    const handler = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [x, y])

  return (
    <motion.div
      style={{ translateX: springX, translateY: springY }}
      className="pointer-events-none fixed top-0 left-0 z-50 w-64 h-40 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      {children}
    </motion.div>
  )
}
