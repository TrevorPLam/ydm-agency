import { defineConfig } from 'vitest/config'

export interface VitestConfigOptions {
  globals?: boolean
  environment?: 'node' | 'jsdom' | 'happy-dom' | 'edge-runtime'
  setupFiles?: string[]
  pool?: 'threads' | 'forks' | 'vmThreads'
  coverageInclude?: string[]
  coverageExclude?: string[]
}

export function sharedConfig(options: VitestConfigOptions = {}) {
  const {
    globals = true,
    environment = 'node',
    setupFiles = [],
    pool = 'threads',
    coverageInclude = ['packages/**/src/**.{js,jsx,ts,tsx}'],
    coverageExclude = [
      'node_modules/',
      'dist/',
      '.next/',
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.config.ts',
      '**/types/',
    ],
  } = options

  return defineConfig({
    test: {
      globals,
      environment,
      include: ['**/*.test.ts', '**/*.test.tsx'],
      exclude: ['node_modules', 'dist', '.next'],
      setupFiles,
      pool,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html', 'lcov'],
        thresholds: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        },
        include: coverageInclude,
        exclude: coverageExclude,
      },
    },
  })
}

export default sharedConfig
