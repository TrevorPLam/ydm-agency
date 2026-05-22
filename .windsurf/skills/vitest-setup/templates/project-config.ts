import { defineProject } from 'vitest/config'

export default defineProject({
  test: {
    include: ['**/*.test.ts', '**/*.test.tsx'],
    exclude: ['node_modules', 'dist', '.next'],
  },
})
