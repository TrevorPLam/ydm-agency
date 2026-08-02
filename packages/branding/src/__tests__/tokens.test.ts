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
      hex: '#2563EB',
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
});
