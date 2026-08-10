/**
 * FILE: types.ts
 * PURPOSE: Provides the shared EducationLesson and EducationLessonSection interfaces used by all education content modules and the education-config aggregate.
 * ARCHITECTURE: Type-only module defining the shape of a lesson (slug, title, topic, level, attribution, safety, learningOutcome, sections, meta) and its body sections.
 * KEY RULES: level must be one of Beginner/Intermediate/Advanced; safety must be one of public-domain/cite-creator/extra-care; learningOutcome must complete the "After this lesson, you'll be able to..." sentence.
 * DEPENDS ON: None (type-only module).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
export interface EducationLessonSection {
  heading: string;
  body: string;
}

export interface EducationLesson {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  attribution: string;
  safety: 'public-domain' | 'cite-creator' | 'extra-care';
  /** One sentence completing "After this lesson, you'll be able to..." */
  learningOutcome: string;
  metaTitle: string;
  metaDescription: string;
  sections: EducationLessonSection[];
  lastUpdated?: string;
}
