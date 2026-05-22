import { defineConfig } from 'vitest/config'

export interface VitestConfigOptions {
	globals?: boolean
	environment?: 'node' | 'jsdom' | 'happy-dom' | 'edge-runtime'
	setupFiles?: string[]
	pool?: 'threads' | 'forks' | 'vmThreads'
	coverageInclude?: string[]
	coverageExclude?: string[]
	coverageThresholds?: {
		statements?: number
		branches?: number
		functions?: number
		lines?: number
	}
	experimentalViteModuleRunner?: boolean
	css?: boolean
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
		coverageThresholds = {
			statements: 90,
			branches: 90,
			functions: 90,
			lines: 90,
		},
		experimentalViteModuleRunner = false,
		css = undefined,
	} = options

	return defineConfig({
		test: {
			globals,
			environment,
			include: ['**/*.test.ts', '**/*.test.tsx'],
			exclude: ['node_modules', 'dist', '.next'],
			setupFiles,
			pool,
			css,
			coverage: {
				provider: 'v8',
				reporter: ['text', 'json', 'html', 'lcov'],
				thresholds: {
					statements: coverageThresholds.statements,
					branches: coverageThresholds.branches,
					functions: coverageThresholds.functions,
					lines: coverageThresholds.lines,
					perFile: true,
				},
				watermarks: {
					statements: [80, 95],
					functions: [80, 95],
					branches: [80, 95],
					lines: [80, 95],
				},
				include: coverageInclude,
				exclude: coverageExclude,
			},
			experimental: {
				viteModuleRunner: experimentalViteModuleRunner,
			},
		},
	})
}

export function nodePreset(options: VitestConfigOptions = {}) {
	return sharedConfig({
		environment: 'node',
		pool: 'threads',
		experimentalViteModuleRunner: true,
		...options,
	})
}

export function jsdomPreset(options: VitestConfigOptions = {}) {
	return sharedConfig({
		environment: 'jsdom',
		pool: 'vmThreads',
		css: false,
		experimentalViteModuleRunner: false,
		...options,
	})
}

export default sharedConfig
