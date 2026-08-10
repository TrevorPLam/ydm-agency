/**
 * FILE: cn.ts
 * PURPOSE: Merges Tailwind classes with class-level deduplication.
 * ARCHITECTURE: Utility composing clsx conditional class strings and tailwind-merge.
 * KEY RULES: This package is an orphaned/broken fork of packages/ui and is excluded from the pnpm workspace; do not modify logic.
 * DEPENDS ON: clsx, tailwind-merge.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * WHAT IT DOES: Merges class names and resolves Tailwind class conflicts.
 * @param {ClassValue[]} inputs – Any number of class values, strings, arrays, or objects.
 * @return {string} – A single, merged class string.
 * SIDE EFFECTS: None.
 * ASSUMES: Tailwind CSS classes follow the project's tailwind.config.js theme.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
