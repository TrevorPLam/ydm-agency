import tseslint from 'typescript-eslint';

export default [
	{
		ignores: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/coverage/**'],
	},
	...tseslint.configs.recommended,
	{
		rules: {
			// Rules that Biome doesn't cover or handles differently
			'@typescript-eslint/no-floating-promises': 'warn',
			'@typescript-eslint/no-misused-promises': 'warn',
			'@typescript-eslint/await-thenable': 'warn',
			'@typescript-eslint/no-unnecessary-type-assertion': 'warn',
			'@typescript-eslint/prefer-nullish-coalescing': 'warn',
			'@typescript-eslint/prefer-optional-chain': 'warn',
			'@typescript-eslint/strict-boolean-expressions': 'off',
		},
	},
];
