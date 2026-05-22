import { useFlags } from '@vercel/flags/react'

export function useFeatureFlags() {
  const flags = useFlags<FeatureFlags>()
  return flags
}
