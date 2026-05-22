import { baseConfig } from './base';

export const packageConfig = {
	...baseConfig,
	compilerOptions: {
		...baseConfig.compilerOptions,
		composite: true,
		outDir: './dist',
		rootDir: './src',
	},
	include: ['src/**/*'],
	exclude: ['node_modules', 'dist'],
};
