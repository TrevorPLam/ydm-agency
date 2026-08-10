/**
 * FILE: ThemeToggle.tsx
 * PURPOSE: Provides the ThemeToggle button component for switching between dark and light themes.
 * ARCHITECTURE: Client component using next-themes useTheme hook; renders a button that toggles the theme and swaps Sun/Moon icons based on the current theme.
 * KEY RULES: Must toggle between 'dark' and 'light' themes; must provide an accessible aria-label; must show the Sun icon in dark mode and Moon icon in light mode.
 * DEPENDS ON: next-themes, lucide-react.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

/**
 * WHAT IT DOES: Renders a button that toggles the color theme between dark and light, displaying the appropriate Sun or Moon icon.
 * @return {JSX.Element} - Theme toggle button
 * SIDE EFFECTS: Updates the global theme via next-themes setTheme on click.
 * ASSUMES: A next-themes ThemeProvider is present in an ancestor component.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-2"
    >
      <Sun className="h-5 w-5 hidden dark:block" />
      <Moon className="h-5 w-5 block dark:hidden" />
    </button>
  );
}
