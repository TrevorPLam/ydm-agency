export interface Experiment {
  id: string
  name: string
  variants: string[]
  traffic: number
  targeting?: TargetingRule
}

export interface TargetingRule {
  locale?: string[]
  device?: string[]
  custom?: Record<string, any>
}

export const experiments: Experiment[] = [
  {
    id: 'new-hero',
    name: 'New Hero Section',
    variants: ['control', 'variant-a', 'variant-b'],
    traffic: 0.5,
  },
]
