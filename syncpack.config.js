/** @type {import('syncpack').SyncpackConfig} */
module.exports = {
	versionGroups: [
		{
			label: 'Core dependencies',
			dependencies: [
				'@types/node',
				'@types/react',
				'@types/react-dom',
			],
			dependencyTypes: ['devDependencies'],
		},
		{
			label: 'Testing',
			dependencies: [
				'@testing-library/react',
				'@testing-library/jest-dom',
				'@vitest/ui',
				'@vitest/coverage-v8',
				'vitest',
				'happy-dom',
			],
			dependencyTypes: ['devDependencies'],
		},
		{
			label: 'Linting & Formatting',
			dependencies: ['biome', 'lefthook', 'typescript-eslint'],
			dependencyTypes: ['devDependencies'],
		},
		{
			label: 'Build tools',
			dependencies: ['turbo', 'tsup'],
			dependencyTypes: ['devDependencies'],
		},
		{
			label: 'TypeScript',
			dependencies: ['typescript'],
			dependencyTypes: ['devDependencies'],
		},
		{
			label: 'Vite',
			dependencies: ['vite'],
			dependencyTypes: ['devDependencies'],
		},
		{
			label: 'React',
			dependencies: ['react', 'react-dom', 'next'],
			dependencyTypes: ['dependencies', 'devDependencies'],
		},
		{
			label: 'Dependency Management',
			dependencies: ['syncpack'],
			dependencyTypes: ['devDependencies'],
		},
	],
	// Additional 2026 best practices
	ignore: [
		// Ignore workspace protocol dependencies
		'workspace:*',
		'workspace:^',
		'workspace:~',
	],
	// Ensure semantic versioning consistency
	semverRange: '^',
};
