/**
 * FILE: cn.ts
 * PURPOSE: Provides the cn() utility for merging Tailwind CSS classes with conflict resolution.
 * ARCHITECTURE: Pure helper combining clsx (conditional class composition) with tailwind-merge (deduplication of conflicting Tailwind utilities).
 * KEY RULES: Must remain a pure function with no side effects; must accept any number of ClassValue arguments.
 * DEPENDS ON: clsx, tailwind-merge.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * WHAT IT DOES: Merges conditional class values and resolves conflicting Tailwind CSS classes, keeping the last applicable utility.
 * @param {ClassValue[]} inputs - Variable list of class values (strings, arrays, or conditional objects) supported by clsx
 * @return {string} - Deduplicated, conflict-resolved class string
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: Inputs are valid ClassValue types; tailwind-merge understands the project's Tailwind configuration.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
