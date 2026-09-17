/**
 * FILE: ThemeToggle.tsx
 * PURPOSE: Toggles the application theme between dark and light.
 * ARCHITECTURE: Client component using the useTheme hook from ./ThemeProvider and lucide-react icons.
 * KEY RULES: This package is an orphaned/broken fork of packages/ui and is excluded from the pnpm workspace; do not modify logic.
 * DEPENDS ON: React, lucide-react, ./ThemeProvider.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

'use client';

import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';

/**
 * WHAT IT DOES: Toggles the application theme between dark and light.
 * @param none – This component accepts no props.
 * @return {React.ReactElement} – A button with sun/moon icons.
 * SIDE EFFECTS: Calls setTheme from ./ThemeProvider on click.
 * ASSUMES: Rendered inside a ThemeProvider from ./ThemeProvider.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-2"
    >
      <Sun className="h-5 w-5 hidden dark:block" />
      <Moon className="h-5 w-5 block dark:hidden" />
    </button>
  );
}
