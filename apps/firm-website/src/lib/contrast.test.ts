import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';

/**
 * WCAG 2.1 / 2.2 AA contrast thresholds.
 */
const AA_NORMAL_TEXT = 4.5;
const AA_LARGE_TEXT = 3;

function hexToRgb(hex: string): [number, number, number] {
  const value = parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255].map(
    (v) => v / 255
  ) as [number, number, number];
}

function luminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const l1 = luminance(hexToRgb(a));
  const l2 = luminance(hexToRgb(b));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function parseTheme(css: string, selector: string): Record<string, string> {
  const pattern = new RegExp(
    `${selector.replace('.', '\\.')}\\s*\\{([^}]*)\\}`,
    's'
  );
  const match = css.match(pattern);
  if (!match) {
    throw new Error(`Could not find ${selector} block in globals.css`);
  }

  const variables: Record<string, string> = {};
  const varPattern = /--color-([\w-]+):\s*(#[0-9A-Fa-f]{6})/g;
  let varMatch;
  while ((varMatch = varPattern.exec(match[1])) !== null) {
    variables[varMatch[1]] = varMatch[2].toUpperCase();
  }
  return variables;
}

const cssPath = path.resolve(__dirname, '../app/globals.css');
const css = readFileSync(cssPath, 'utf-8');

const darkTheme = parseTheme(css, ':root');
const lightTheme = parseTheme(css, '.light');

describe('Design token contrast', () => {
  const cases = [
    // Body text
    { theme: 'dark', tokens: darkTheme, foreground: 'text-primary', background: 'background' },
    { theme: 'dark', tokens: darkTheme, foreground: 'text-primary', background: 'surface' },
    { theme: 'dark', tokens: darkTheme, foreground: 'text-secondary', background: 'background' },
    { theme: 'dark', tokens: darkTheme, foreground: 'text-secondary', background: 'surface' },
    { theme: 'light', tokens: lightTheme, foreground: 'text-primary', background: 'background' },
    { theme: 'light', tokens: lightTheme, foreground: 'text-primary', background: 'surface' },
    { theme: 'light', tokens: lightTheme, foreground: 'text-secondary', background: 'background' },
    { theme: 'light', tokens: lightTheme, foreground: 'text-secondary', background: 'surface' },

    // Interactive links
    { theme: 'dark', tokens: darkTheme, foreground: 'accent', background: 'background' },
    { theme: 'dark', tokens: darkTheme, foreground: 'accent', background: 'surface' },
    { theme: 'dark', tokens: darkTheme, foreground: 'accent-hover', background: 'background' },
    { theme: 'dark', tokens: darkTheme, foreground: 'accent-hover', background: 'surface' },
    { theme: 'light', tokens: lightTheme, foreground: 'accent', background: 'background' },
    { theme: 'light', tokens: lightTheme, foreground: 'accent', background: 'surface' },
    { theme: 'light', tokens: lightTheme, foreground: 'accent-hover', background: 'background' },
    { theme: 'light', tokens: lightTheme, foreground: 'accent-hover', background: 'surface' },

    // Primary button text (uses `text-background`)
    { theme: 'dark', tokens: darkTheme, foreground: 'background', background: 'accent' },
    { theme: 'dark', tokens: darkTheme, foreground: 'background', background: 'accent-hover' },
    { theme: 'light', tokens: lightTheme, foreground: 'background', background: 'accent' },
    { theme: 'light', tokens: lightTheme, foreground: 'background', background: 'accent-hover' },

    // Status colors
    { theme: 'dark', tokens: darkTheme, foreground: 'error', background: 'background' },
    { theme: 'dark', tokens: darkTheme, foreground: 'error', background: 'surface' },
    { theme: 'dark', tokens: darkTheme, foreground: 'success', background: 'background' },
    { theme: 'dark', tokens: darkTheme, foreground: 'success', background: 'surface' },
    { theme: 'light', tokens: lightTheme, foreground: 'error', background: 'background' },
    { theme: 'light', tokens: lightTheme, foreground: 'error', background: 'surface' },
    { theme: 'light', tokens: lightTheme, foreground: 'success', background: 'background' },
    { theme: 'light', tokens: lightTheme, foreground: 'success', background: 'surface' },
  ];

  it.each(cases)(
    'meets WCAG AA for $foreground on $background in $theme theme',
    ({ tokens, foreground, background }) => {
      const fg = tokens[foreground];
      const bg = tokens[background];
      expect(fg).toBeDefined();
      expect(bg).toBeDefined();

      const ratio = contrast(fg, bg);
      expect(ratio).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
    }
  );

  // Icons in `bg-accent/10` wells are graphical objects (3:1 threshold).
  it('meets the 3:1 graphical-object threshold for accent icons on 10% accent wells', () => {
    const darkWell = blend(darkTheme.accent, darkTheme.surface, 0.1);
    const lightWell = blend(lightTheme.accent, lightTheme.surface, 0.1);

    expect(contrast(darkTheme.accent, darkWell)).toBeGreaterThanOrEqual(AA_LARGE_TEXT);
    expect(contrast(lightTheme.accent, lightWell)).toBeGreaterThanOrEqual(AA_LARGE_TEXT);
  });
});

/**
 * Blend a foreground color over a background color at the given opacity
 * using simple alpha compositing in sRGB.
 */
function blend(fg: string, bg: string, alpha: number): string {
  const [fr, fgGreen, fb] = hexToRgb(fg);
  const [br, bgGreen, bb] = hexToRgb(bg);
  const toChannel = (c: number) =>
    Math.round(c * 255)
      .toString(16)
      .padStart(2, '0');
  const r = toChannel(fr * alpha + br * (1 - alpha));
  const g = toChannel(fgGreen * alpha + bgGreen * (1 - alpha));
  const b = toChannel(fb * alpha + bb * (1 - alpha));
  return `#${r}${g}${b}`.toUpperCase();
}
