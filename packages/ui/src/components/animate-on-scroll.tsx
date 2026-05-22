'use client'

import { motion } from 'motion/react'
import { type ReactNode } from 'react'

interface Props {
  children: ReactNode
  direction?: 'up' | 'left' | 'right'
  delay?: number
  className?: string
  duration?: number
}

export function AnimateOnScroll({ 
  children, 
  direction = 'up', 
  delay = 0, 
  className = '',
  duration = 0.5 
}: Props) {
  const directionMap = {
    up: { y: 32 },
    left: { x: -40 },
    right: { x: 40 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directionMap[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ 
        duration, 
        delay: delay / 1000, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
