'use client'

import { useReducedMotion } from './performance-hooks'

export function AnimatedComponent({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <>{children}</>
  }

  return <motion.div variants={fadeIn}>{children}</motion.div>
}
