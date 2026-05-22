import { framerMotion } from 'framer-motion'

export const motionConfig = {
  transition: { duration: 0.3 },
  variants: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
}
