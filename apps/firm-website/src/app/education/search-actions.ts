/**
 * FILE: search-actions.ts
 * PURPOSE: Provides the searchLessons Server Action that filters EDUCATION_LESSONS by a query string across title, summary, topic, and section content.
 * ARCHITECTURE: Next.js Server Action ('use server') that returns the full lesson list for empty queries, or a case-insensitive substring-filtered list across lesson fields and section content.
 * KEY RULES: Must return the full list for empty/whitespace queries; must perform case-insensitive substring matching; must search section headings and bodies.
 * DEPENDS ON: @/lib/education-config (EDUCATION_LESSONS, EducationLesson type).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
'use server';

import { EDUCATION_LESSONS, type EducationLesson } from '@/lib/education-config';

/**
 * WHAT IT DOES: Filters EDUCATION_LESSONS by a query string across title, summary, topic, and section heading/body content, returning the full list for empty queries.
 * @param {string} query - Search query string
 * @return {Promise<EducationLesson[]>} - Matching lessons, or all lessons for empty queries
 * SIDE EFFECTS: None (pure function over the in-memory lesson list).
 * ASSUMES: EDUCATION_LESSONS is loaded in memory at request time.
 */
export async function searchLessons(query: string): Promise<EducationLesson[]> {
  if (!query || query.trim().length === 0) {
    return EDUCATION_LESSONS;
  }

  const searchTerms = query.toLowerCase().trim();
  
  return EDUCATION_LESSONS.filter(lesson =>
    lesson.title.toLowerCase().includes(searchTerms) ||
    lesson.summary.toLowerCase().includes(searchTerms) ||
    lesson.topic.toLowerCase().includes(searchTerms) ||
    lesson.sections.some(section =>
      section.heading.toLowerCase().includes(searchTerms) ||
      section.body.toLowerCase().includes(searchTerms)
    )
  );
}
