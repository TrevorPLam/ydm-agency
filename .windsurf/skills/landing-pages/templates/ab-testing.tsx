'use client'

import { useState } from 'react'

export function ABTest({ variants }: { variants: React.ReactNode[] }) {
  const [variant] = useState(() => Math.floor(Math.random() * variants.length))

  return <>{variants[variant]}</>
}
