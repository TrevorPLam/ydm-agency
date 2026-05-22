import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
	test: {
		pool: 'threads',
		globals: true,
		include: ['**/*.test.ts', '**/*.test.tsx'],
		exclude: ['node_modules', 'dist', '.next'],
		reporters: process.env.GITHUB_ACTIONS === 'true'
			? ['default', 'github-actions']
			: ['default', 'html'],
		outputFile: {
			json: './.vitest-results/test-results.json',
			junit: './.vitest-results/junit.xml',
		},
		typecheck: {
			enabled: true,
			checker: 'tsc',
			allowJs: true,
		},
		logHeapUsage: true,
		detectAsyncLeaks: true,
		retry: process.env.CI ? 2 : 0,
		browser: {
			enabled: false,
			name: 'chromium',
			headless: true,
		},
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
			include: ['packages/**/src/**.{js,jsx,ts,tsx}'],
			exclude: [
				'node_modules/',
				'dist/',
				'.next/',
				'**/*.test.ts',
				'**/*.test.tsx',
				'**/*.config.ts',
				'**/types/',
				'**/index.ts',
				'**/*.d.ts',
			],
			thresholds: {
				lines: 80,
				functions: 80,
				branches: 80,
				statements: 80,
				perFile: false,
				autoUpdate: true,
				// Higher coverage for core package
				'packages/core/**': {
					lines: 90,
					functions: 90,
					branches: 85,
					statements: 90,
				},
				// Negative limits for critical paths (max uncovered items)
				'packages/**/index.ts': {
					lines: -5,
					functions: -2,
				},
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
			importDurations: {
				print: true,
				failOnDanger: true,
				limit: 100,
				thresholds: {
					warn: 50,
					danger: 100,
				},
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
