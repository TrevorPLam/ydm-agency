/**
 * FILE: tokens.test.ts
 * PURPOSE: Verify design token color, typography, logo, and contrast invariants.
 * ARCHITECTURE: branding package unit tests using Vitest with local contrast helpers.
 * KEY RULES: Tokens must match the canonical YDM dark theme values and meet WCAG AA contrast.
 * DEPENDS ON: ../tokens
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import { describe, it, expect } from 'vitest';
import { tokens } from '../tokens';

describe('tokens', () => {
  it('exports all brand colors with CSS variable and hex values', () => {
    const { colors } = tokens;

    expect(colors.background).toEqual({
      css: 'var(--color-background)',
      hex: '#0A0A0B',
    });
    expect(colors.surface).toEqual({
      css: 'var(--color-surface)',
      hex: '#161618',
    });
    expect(colors.textPrimary).toEqual({
      css: 'var(--color-text-primary)',
      hex: '#F5F5F6',
    });
    expect(colors.textSecondary).toEqual({
      css: 'var(--color-text-secondary)',
      hex: '#A1A1A9',
    });
    expect(colors.accent).toEqual({
      css: 'var(--color-accent)',
      hex: '#3B82F6',
    });
    expect(colors.accentHover).toEqual({
      css: 'var(--color-accent-hover)',
      hex: '#4B8AF2',
    });
    expect(colors.border).toEqual({
      css: 'var(--color-border)',
      hex: '#2A2A2E',
    });
    expect(colors.error).toEqual({
      css: 'var(--color-error)',
      hex: '#F87171',
    });
    expect(colors.success).toEqual({
      css: 'var(--color-success)',
      hex: '#3B82F6',
    });
  });

  it('exports typography scale and font references', () => {
    expect(tokens.typography.family.heading).toBe('var(--font-display)');
    expect(tokens.typography.family.body).toBe('var(--font-sans)');
    expect(tokens.typography.letterSpacing.heading).toBe('-0.02em');
    expect(tokens.typography.scale.xs).toBe('0.75rem');
    expect(tokens.typography.scale['4xl']).toBe('2.5rem');
    expect(tokens.typography.weight.semibold).toBe(600);
  });

  it('exports logo asset references', () => {
    expect(tokens.logos.mark).toBe('/logo-mark.svg');
    expect(tokens.logos.wordmark).toBe('/logo-wordmark.svg');
    expect(tokens.logos.favicon).toBe('/favicon.svg');
  });

  it('maintains WCAG AA contrast for default (dark) theme text states', () => {
    const { colors } = tokens;

    /**
     * WHAT IT DOES: Parses a hex color string into normalized RGB components.
     * @param {string} hex – a hex color string such as '#0A0A0B'
     * @return {[number, number, number]} – the red, green, and blue components in the range [0, 1]
     * SIDE EFFECTS: None
     * ASSUMES: hex starts with '#' and is six characters long.
     */
    function hexToRgb(hex: string): [number, number, number] {
      const value = parseInt(hex.slice(1), 16);
      return [(value >> 16) & 255, (value >> 8) & 255, value & 255].map(
        (v) => v / 255
      ) as [number, number, number];
    }

    /**
     * WHAT IT DOES: Computes the relative luminance of an RGB color using the sRGB coefficients.
     * @param {[number, number, number]} rgb – normalized red, green, and blue components
     * @return {number} – the relative luminance value
     * SIDE EFFECTS: None
     * ASSUMES: Each channel is in the range [0, 1].
     */
    function luminance(rgb: [number, number, number]): number {
      const [r, g, b] = rgb.map((c) =>
        c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
      );
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    /**
     * WHAT IT DOES: Calculates the WCAG contrast ratio between two hex colors.
     * @param {string} fg – the foreground hex color
     * @param {string} bg – the background hex color
     * @return {number} – the contrast ratio
     * SIDE EFFECTS: None
     * ASSUMES: Both arguments are valid hex color strings.
     */
    function contrast(fg: string, bg: string): number {
      const l1 = luminance(hexToRgb(fg));
      const l2 = luminance(hexToRgb(bg));
      const lighter = Math.max(l1, l2);
      const darker = Math.min(l1, l2);
      return (lighter + 0.05) / (darker + 0.05);
    }

    const AA = 4.5;
    expect(contrast(colors.textPrimary.hex, colors.background.hex)).toBeGreaterThanOrEqual(AA);
    expect(contrast(colors.textPrimary.hex, colors.surface.hex)).toBeGreaterThanOrEqual(AA);
    expect(contrast(colors.textSecondary.hex, colors.background.hex)).toBeGreaterThanOrEqual(AA);
    expect(contrast(colors.textSecondary.hex, colors.surface.hex)).toBeGreaterThanOrEqual(AA);
    expect(contrast(colors.accent.hex, colors.background.hex)).toBeGreaterThanOrEqual(AA);
    expect(contrast(colors.accent.hex, colors.surface.hex)).toBeGreaterThanOrEqual(AA);
    expect(contrast(colors.accentHover.hex, colors.background.hex)).toBeGreaterThanOrEqual(AA);
    expect(contrast(colors.accentHover.hex, colors.surface.hex)).toBeGreaterThanOrEqual(AA);
    // WHY: Primary button text is rendered with the dark background color against an accent fill.
    expect(contrast(colors.background.hex, colors.accent.hex)).toBeGreaterThanOrEqual(AA);
    expect(contrast(colors.background.hex, colors.accentHover.hex)).toBeGreaterThanOrEqual(AA);
  });
});
