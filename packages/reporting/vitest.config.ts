import { defineConfig } from 'vitest/config';

export default defineConfig({
																test: {
																																globals: true,
																																environment: 'node',
																																pool: 'threads',
																																include: ['**/*.test.ts', '**/*.test.tsx'],
																																exclude: ['node_modules', 'dist'],
																																tags: [
																																																{ name: 'unit', description: 'Unit tests' },
																																																{ name: 'integration', description: 'Integration tests' },
																																																{ name: 'e2e', description: 'End-to-end tests' },
																																																{ name: 'slow', description: 'Slow tests (>5s)', timeout: 30_000 },
																																																{ name: 'db', description: 'Database tests', timeout: 60_000 },
																																																{
																																																																name: 'flaky',
																																																																description: 'Flaky CI tests',
																																																																retry: process.env.CI ? 3 : 0,
																																																																priority: 1,
																																																},
																																],
																																coverage: {
																																																provider: 'v8',
																																																reporter: ['text', 'json', 'html', 'lcov'],
																																																statements: 80,
																																																branches: 80,
																																																functions: 80,
																																																lines: 80,
																																																perFile: false,
																																																include: ['src/**/*.{ts,tsx}'],
																																																exclude: [
																																																																'node_modules/',
																																																																'dist/',
																																																																'**/*.test.ts',
																																																																'**/*.test.tsx',
																																																																'**/*.config.ts',
																																																																'**/types/',
																																																																'**/index.ts',
																																																																'**/*.d.ts',
																																																],
																																																thresholds: {
																																																																lines: 100,
																																																																functions: 100,
																																																																branches: 100,
																																																																statements: 100,
																																																																perFile: false,
																																																																autoUpdate: true,
																																																},
																																																watermarks: {
																																																																statements: [70, 90],
																																																																functions: [70, 90],
																																																																branches: [70, 90],
																																																																lines: [70, 90],
																																																},
																																																processingConcurrency: Math.min(20, require('os').availableParallelism?.() ?? 4),
																																},
																																experimental: {
																																																rustCore: true,
																																																fsModuleCache: true,
																																},
																},
});
