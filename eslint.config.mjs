import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  // Global ignores
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "node_modules/**",
    "coverage/**",
    ".vitest-results/**",
    "*.min.js",
    "*.min.css",
    "pnpm-lock.yaml",
    "turbo.json",
    ".turbo/**",
  ]),

  // Next.js base configuration
  ...nextVitals,
  ...nextTs,

  // TypeScript ESLint configuration for stricter type checking
  ...tseslint.configs.recommended,

  // Custom rules
  {
    rules: {
      // TypeScript-specific rules that Biome doesn't cover
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-misused-promises": "warn",
      "@typescript-eslint/await-thenable": "warn",
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "warn",
      "@typescript-eslint/prefer-optional-chain": "warn",
      "@typescript-eslint/strict-boolean-expressions": "off",
      // Allow any in test files
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]);

export default eslintConfig;
