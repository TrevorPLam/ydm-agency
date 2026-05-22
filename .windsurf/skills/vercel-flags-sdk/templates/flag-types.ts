import { Flags } from '@vercel/flags/react'

export type FeatureFlags = {
  newFeature: boolean
  betaFeature: boolean
  experimentalFeature: boolean
}
