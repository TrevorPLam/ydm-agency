coverage: {
  provider: 'v8',
  reporter: ['text', 'json', 'html', 'lcov'],
  statements: 80,
  branches: 80,
  functions: 80,
  lines: 80,
  exclude: [
    'node_modules/',
    'tests/',
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/*.config.ts',
  ],
}
