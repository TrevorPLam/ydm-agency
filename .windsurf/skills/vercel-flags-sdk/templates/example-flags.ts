import { Flag } from '@vercel/flags'

export const newFeature: Flag<boolean> = {
  key: 'newFeature',
  defaultValue: false,
  description: 'Enable new feature',
}
