/**
 * FILE: tailwind.js
 * PURPOSE: Provide the shared Tailwind CSS theme configuration for the monorepo.
 * ARCHITECTURE: packages/config shared Tailwind preset, maps design tokens to CSS variables and font families.
 * KEY RULES: Colors must reference CSS variables matching the branding tokens; content paths must include consuming packages.
 * DEPENDS ON: tailwindcss, @tailwindcss/typography
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/forms/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/analytics/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/seo/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        accent: 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        border: 'var(--color-border)',
        error: 'var(--color-error)',
        success: 'var(--color-success)',
      },
      fontFamily: {
        display: ['var(--font-display)', ...fontFamily.serif],
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      boxShadow: {
        glow: '0 0 20px color-mix(in srgb, var(--color-accent) 30%, transparent)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
