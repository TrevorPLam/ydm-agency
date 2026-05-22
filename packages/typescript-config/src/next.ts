import { baseConfig } from './base';

export const nextConfig = {
	...baseConfig,
	compilerOptions: {
		...baseConfig.compilerOptions,
		jsx: 'preserve',
		plugins: [
			{
				name: 'next',
			},
		],
		paths: {
			'@/*': ['./src/*'],
		},
	},
	include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
	exclude: ['node_modules'],
};
