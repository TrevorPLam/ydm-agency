import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['apps/**/*.{test,spec}.{ts,tsx}', 'packages/**/*.{test,spec}.{ts,tsx}'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/e2e/**',
      '**/playwright-report/**',
      'packages/design-system/**',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['apps/*/src/**/*.{ts,tsx}', 'packages/*/src/**/*.{ts,tsx}'],
      exclude: [
        '**/__tests__/**',
        '**/*.test.{ts,tsx}',
        '**/*.d.ts',
        '**/node_modules/**',
        '**/dist/**',
        'packages/design-system/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@ydm-agency/utils': path.resolve(__dirname, './packages/utils/src'),
      '@ydm-agency/ui': path.resolve(__dirname, './packages/ui/src'),
      '@ydm-agency/forms': path.resolve(__dirname, './packages/forms/src'),
      '@ydm-agency/analytics': path.resolve(__dirname, './packages/analytics/src'),
      '@ydm-agency/email': path.resolve(__dirname, './packages/email/src'),
      '@ydm-agency/seo': path.resolve(__dirname, './packages/seo/src'),
      '@ydm-agency/config': path.resolve(__dirname, './packages/config'),
      '@ydm-agency/branding': path.resolve(__dirname, './packages/branding/src'),
      '@ydm-agency/firm-website': path.resolve(__dirname, './apps/firm-website/src'),
      '@ydm-agency/test-utils': path.resolve(__dirname, './packages/test-utils/src'),
      '@': path.resolve(__dirname, './apps/firm-website/src'),
    },
  },
});
