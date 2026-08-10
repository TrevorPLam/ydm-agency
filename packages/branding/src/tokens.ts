/**
 * FILE: tokens.ts
 * PURPOSE: Define the canonical YDM Agency color, typography, and logo design tokens.
 * ARCHITECTURE: branding package, type-safe token object with const assertion and satisfies.
 * KEY RULES: Hex values must match the design system palette; success equals accent.
 * DEPENDS ON: None
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

export interface ColorToken {
  css: string;
  hex: string;
}

export interface Tokens {
  colors: {
    background: ColorToken;
    surface: ColorToken;
    textPrimary: ColorToken;
    textSecondary: ColorToken;
    accent: ColorToken;
    accentHover: ColorToken;
    border: ColorToken;
    error: ColorToken;
    success: ColorToken;
  };
  typography: {
    family: {
      heading: string;
      body: string;
    };
    scale: Record<string, string>;
    letterSpacing: {
      heading: string;
    };
    weight: {
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
  logos: {
    mark: string;
    wordmark: string;
    favicon: string;
  };
}

export const tokens = {
  colors: {
    background: { css: 'var(--color-background)', hex: '#0A0A0B' },
    surface: { css: 'var(--color-surface)', hex: '#161618' },
    textPrimary: { css: 'var(--color-text-primary)', hex: '#F5F5F6' },
    textSecondary: { css: 'var(--color-text-secondary)', hex: '#A1A1A9' },
    accent: { css: 'var(--color-accent)', hex: '#3B82F6' },
    accentHover: { css: 'var(--color-accent-hover)', hex: '#4B8AF2' },
    border: { css: 'var(--color-border)', hex: '#2A2A2E' },
    error: { css: 'var(--color-error)', hex: '#F87171' },
    success: { css: 'var(--color-success)', hex: '#3B82F6' },
  },
  typography: {
    family: {
      heading: 'var(--font-display)',
      body: 'var(--font-sans)',
    },
    scale: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      '4xl': '2.5rem',
    },
    letterSpacing: {
      heading: '-0.02em',
    },
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  logos: {
    mark: '/logo-mark.svg',
    wordmark: '/logo-wordmark.svg',
    favicon: '/favicon.svg',
  },
} as const satisfies Tokens;
