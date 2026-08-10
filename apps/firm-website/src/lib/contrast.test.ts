/**
 * FILE: contrast.test.ts
 * PURPOSE: Verify design-token color contrast against WCAG AA thresholds.
 * ARCHITECTURE: Vitest suite; parses CSS custom properties from globals.css for dark and light themes and computes relative luminance.
 * KEY RULES: Normal text must meet 4.5:1; accent icons in 10% accent wells must meet the 3:1 graphical-object threshold.
 * DEPENDS ON: vitest, node:fs, node:path, ../app/globals.css
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const AA_NORMAL_TEXT = 4.5;
const AA_LARGE_TEXT = 3;

/**
 * WHAT IT DOES: Converts a 6-digit hex color string to normalized RGB components.
 * @param {string} hex – Color in the form #RRGGBB
 * @return {[number, number, number]} – RGB values scaled to [0, 1]
 * SIDE EFFECTS: None
 * ASSUMES: hex begins with '#' and has exactly six hex digits
 */
function hexToRgb(hex: string): [number, number, number] {
  const value = parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255].map(
    (v) => v / 255
  ) as [number, number, number];
}

/**
 * WHAT IT DOES: Computes the relative luminance of an sRGB color using WCAG coefficients.
 * @param {[number, number, number]} rgb – Normalized RGB triple
 * @return {number} – Relative luminance value
 * SIDE EFFECTS: None
 * ASSUMES: RGB channels are normalized to the [0, 1] range
 */
function luminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * WHAT IT DOES: Calculates the WCAG contrast ratio between two hex colors.
 * @param {string} a – First hex color
 * @param {string} b – Second hex color
 * @return {number} – Contrast ratio, typically from 1 to 21
 * SIDE EFFECTS: None
 * ASSUMES: Both arguments are valid 6-digit hex colors
 */
function contrast(a: string, b: string): number {
  const l1 = luminance(hexToRgb(a));
  const l2 = luminance(hexToRgb(b));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * WHAT IT DOES: Extracts CSS custom color variables from a theme block in globals.css.
 * @param {string} css – Full CSS source text
 * @param {string} selector – Theme selector to match, e.g. ':root' or '.light'
 * @return {Record<string, string>} – Map of color variable names (without --color- prefix) to hex values
 * SIDE EFFECTS: None
 * ASSUMES: The selector exists and variables follow the --color-<name>: #RRGGBB pattern
 */
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

    { theme: 'dark', tokens: darkTheme, foreground: 'text-primary', background: 'background' },
    { theme: 'dark', tokens: darkTheme, foreground: 'text-primary', background: 'surface' },
    { theme: 'dark', tokens: darkTheme, foreground: 'text-secondary', background: 'background' },
    { theme: 'dark', tokens: darkTheme, foreground: 'text-secondary', background: 'surface' },
    { theme: 'light', tokens: lightTheme, foreground: 'text-primary', background: 'background' },
    { theme: 'light', tokens: lightTheme, foreground: 'text-primary', background: 'surface' },
    { theme: 'light', tokens: lightTheme, foreground: 'text-secondary', background: 'background' },
    { theme: 'light', tokens: lightTheme, foreground: 'text-secondary', background: 'surface' },


    { theme: 'dark', tokens: darkTheme, foreground: 'accent', background: 'background' },
    { theme: 'dark', tokens: darkTheme, foreground: 'accent', background: 'surface' },
    { theme: 'dark', tokens: darkTheme, foreground: 'accent-hover', background: 'background' },
    { theme: 'dark', tokens: darkTheme, foreground: 'accent-hover', background: 'surface' },
    { theme: 'light', tokens: lightTheme, foreground: 'accent', background: 'background' },
    { theme: 'light', tokens: lightTheme, foreground: 'accent', background: 'surface' },
    { theme: 'light', tokens: lightTheme, foreground: 'accent-hover', background: 'background' },
    { theme: 'light', tokens: lightTheme, foreground: 'accent-hover', background: 'surface' },


    { theme: 'dark', tokens: darkTheme, foreground: 'background', background: 'accent' },
    { theme: 'dark', tokens: darkTheme, foreground: 'background', background: 'accent-hover' },
    { theme: 'light', tokens: lightTheme, foreground: 'background', background: 'accent' },
    { theme: 'light', tokens: lightTheme, foreground: 'background', background: 'accent-hover' },


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

  // WHY: Icons in 10% accent wells are graphical objects, so use the 3:1 large-text threshold.
  it('meets the 3:1 graphical-object threshold for accent icons on 10% accent wells', () => {
    const darkWell = blend(darkTheme.accent, darkTheme.surface, 0.1);
    const lightWell = blend(lightTheme.accent, lightTheme.surface, 0.1);

    expect(contrast(darkTheme.accent, darkWell)).toBeGreaterThanOrEqual(AA_LARGE_TEXT);
    expect(contrast(lightTheme.accent, lightWell)).toBeGreaterThanOrEqual(AA_LARGE_TEXT);
  });
});

/**
 * WHAT IT DOES: Alpha-composites a foreground color over a background color in sRGB.
 * @param {string} fg – Foreground hex color
 * @param {string} bg – Background hex color
 * @param {number} alpha – Opacity of the foreground, in [0, 1]
 * @return {string} – Resulting hex color after blending
 * SIDE EFFECTS: None
 * ASSUMES: Both colors are valid 6-digit hex and alpha is normalized
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
