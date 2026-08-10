/**
 * FILE: safety-helpers.ts
 * PURPOSE: Provides shared safety badge/label helpers for education lesson cards and lesson pages.
 * ARCHITECTURE: Pure helper module that maps an EducationLesson safety value to a Badge variant and a human-readable label.
 * KEY RULES: No side effects; explicit return types; must match the safety values defined on EducationLesson.
 * DEPENDS ON: ./types (EducationLesson).
 * LAST UPDATED: 2026-08-09 Extracted from TopicContent.tsx and page.tsx
 */
import type { EducationLesson } from './types';

/**
 * WHAT IT DOES: Maps a lesson safety classification to a Badge variant for display.
 * @param {EducationLesson['safety']} safety - Lesson safety classification
 * @return {'default' | 'accent' | 'outline'} - Badge variant
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: safety is one of the configured safety values.
 */
export function getSafetyBadgeVariant(safety: EducationLesson['safety']): 'default' | 'accent' | 'outline' {
  switch (safety) {
    case 'public-domain':
      return 'accent';
    case 'cite-creator':
      return 'outline';
    case 'extra-care':
      return 'default';
    default:
      return 'default';
  }
}

/**
 * WHAT IT DOES: Maps a lesson safety classification to a human-readable label for display.
 * @param {EducationLesson['safety']} safety - Lesson safety classification
 * @return {string} - Display label
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: safety is one of the configured safety values.
 */
export function getSafetyLabel(safety: EducationLesson['safety']): string {
  switch (safety) {
    case 'public-domain':
      return 'Public Domain';
    case 'cite-creator':
      return 'Cite Creator';
    case 'extra-care':
      return 'Use Care';
    default:
      return 'Use Care';
  }
}
