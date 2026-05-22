import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
	// Packages - Node environment for backend/domain logic
	{
		test: {
			name: 'packages-node',
			include: ['packages/core/**/*.test.ts', 'packages/automator-engine/**/*.test.ts', 'packages/email-engine/**/*.test.ts', 'packages/reporting/**/*.test.ts', 'packages/utils/**/*.test.ts'],
			exclude: ['**/node_modules/**', '**/dist/**', '**/.next/**'],
			environment: 'node',
			globals: true,
			pool: 'threads',
		},
	},
	// UI package - happy-dom environment for React component testing (default for component tests)
	{
		test: {
			name: 'packages-ui',
			include: ['packages/ui/**/*.test.ts', 'packages/ui/**/*.test.tsx'],
			exclude: ['**/node_modules/**', '**/dist/**', '**/.next/**'],
			environment: 'happy-dom',
			globals: true,
			pool: 'vmThreads',
			setupFiles: ['./packages/ui/src/test/setup.ts'],
			css: false,
		},
	},
	// Apps - Next.js apps with happy-dom for component testing
	{
		test: {
			name: 'apps',
			include: ['apps/**/*.test.ts', 'apps/**/*.test.tsx'],
			exclude: ['**/node_modules/**', '**/dist/**', '**/.next/**'],
			environment: 'happy-dom',
			globals: true,
			pool: 'vmThreads',
		},
	},
	// Browser tests - Full browser API compatibility with jsdom (when needed)
	{
		test: {
			name: 'browser-tests',
			include: ['**/*.browser.test.ts', '**/*.browser.test.tsx'],
			exclude: ['**/node_modules/**', '**/dist/**', '**/.next/**'],
			environment: 'jsdom',
			globals: true,
			pool: 'vmThreads',
		},
	},
]);
