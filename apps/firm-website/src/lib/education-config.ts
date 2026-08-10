/**
 * FILE: education-config.ts
 * PURPOSE: Provides the EDUCATION_TOPICS and EDUCATION_LESSONS aggregates plus helper functions for topic/lesson lookups used across the /education routes.
 * ARCHITECTURE: Aggregates lesson arrays from per-topic content modules into a single EDUCATION_LESSONS array and exposes pure lookup helpers (by topic, by slug, related, adjacent); re-exports shared education types.
 * KEY RULES: Topic slugs must match lesson.topic values; EDUCATION_LESSONS must include all per-topic lessons (original + new); helpers must be pure and case-insensitive where noted.
 * DEPENDS ON: ./education/types, ./education/*-lessons and ./education/*-lessons-new modules.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import type { EducationLessonSection, EducationLesson } from './education/types';
import { SEO_LESSONS } from './education/seo-lessons';
import { NEW_SEO_LESSONS } from './education/seo-lessons-new';
import { CONVERSION_LESSONS } from './education/conversion-lessons';
import { NEW_CONVERSION_LESSONS } from './education/conversion-lessons-new';
import { FOUNDATIONS_LESSONS } from './education/foundations-lessons';
import { NEW_FOUNDATIONS_LESSONS } from './education/foundations-lessons-new';
import { STRATEGY_LESSONS } from './education/strategy-lessons';
import { NEW_STRATEGY_LESSONS } from './education/strategy-lessons-new';
import { COMPLIANCE_LESSONS } from './education/compliance-lessons';
import { NEW_COMPLIANCE_LESSONS } from './education/compliance-lessons-new';

export type { EducationLessonSection, EducationLesson };

export interface EducationTopic {
  slug: string;
  name: string;
  description: string;
  icon: string;
  order: number;
}

export const EDUCATION_TOPICS: EducationTopic[] = [
  {
    slug: 'seo',
    name: 'SEO',
    description: 'Search engine optimization fundamentals and technical implementation',
    icon: 'Search',
    order: 1,
  },
  {
    slug: 'conversion',
    name: 'Conversion',
    description: 'Conversion rate optimization and landing page best practices',
    icon: 'Target',
    order: 2,
  },
  {
    slug: 'foundations',
    name: 'Foundations',
    description: 'Core marketing principles and frameworks that form the foundation of effective strategy',
    icon: 'BookOpen',
    order: 3,
  },
  {
    slug: 'strategy',
    name: 'Strategy',
    description: 'Strategic frameworks and models for marketing planning and execution',
    icon: 'Lightbulb',
    order: 4,
  },
  {
    slug: 'compliance',
    name: 'Compliance',
    description: 'Legal and ethical considerations in marketing, including attribution and intellectual property',
    icon: 'Shield',
    order: 5,
  },
];

export const EDUCATION_LESSONS: EducationLesson[] = [
  ...SEO_LESSONS,
  ...NEW_SEO_LESSONS,
  ...CONVERSION_LESSONS,
  ...NEW_CONVERSION_LESSONS,
  ...FOUNDATIONS_LESSONS,
  ...NEW_FOUNDATIONS_LESSONS,
  ...STRATEGY_LESSONS,
  ...NEW_STRATEGY_LESSONS,
  ...COMPLIANCE_LESSONS,
  ...NEW_COMPLIANCE_LESSONS,
];

/**
 * WHAT IT DOES: Returns all lessons belonging to a topic, matched case-insensitively by topic slug.
 * @param {string} topicSlug - Topic slug to filter by
 * @return {EducationLesson[]} - Lessons whose topic matches the slug
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: lesson.topic values correspond to known topic slugs.
 */
export function getLessonsByTopic(topicSlug: string): EducationLesson[] {
  return EDUCATION_LESSONS.filter((lesson) => lesson.topic.toLowerCase() === topicSlug.toLowerCase());
}

/**
 * WHAT IT DOES: Looks up a single lesson by its slug.
 * @param {string} slug - Lesson slug to find
 * @return {EducationLesson | undefined} - Matching lesson, or undefined if not found
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: Lesson slugs are unique across all topics.
 */
export function getLessonBySlug(slug: string): EducationLesson | undefined {
  return EDUCATION_LESSONS.find((lesson) => lesson.slug === slug);
}

/**
 * WHAT IT DOES: Returns the sorted set of unique topic names derived from all lessons.
 * @return {string[]} - Sorted unique topic names
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: None.
 */
export function getTopicsFromLessons(): string[] {
  const topics = new Set(EDUCATION_LESSONS.map((lesson) => lesson.topic));
  return Array.from(topics).sort();
}

/**
 * WHAT IT DOES: Looks up topic metadata by its slug.
 * @param {string} slug - Topic slug to find
 * @return {EducationTopic | undefined} - Matching topic metadata, or undefined if not found
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: Topic slugs are unique in EDUCATION_TOPICS.
 */
export function getTopicBySlug(slug: string): EducationTopic | undefined {
  return EDUCATION_TOPICS.find((topic) => topic.slug === slug);
}

/**
 * WHAT IT DOES: Returns up to `limit` related lessons from the same topic, excluding the current lesson.
 * @param {EducationLesson} currentLesson - Lesson to find related lessons for
 * @param {number} limit - Maximum number of related lessons to return (defaults to 3)
 * @return {EducationLesson[]} - Related lessons from the same topic
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: currentLesson.topic matches the topic field of other lessons.
 */
export function getRelatedLessons(currentLesson: EducationLesson, limit: number = 3): EducationLesson[] {
  const sameTopicLessons = EDUCATION_LESSONS.filter(
    (lesson) => lesson.topic === currentLesson.topic && lesson.slug !== currentLesson.slug
  );
  return sameTopicLessons.slice(0, limit);
}

/**
 * WHAT IT DOES: Returns the previous and next lessons adjacent to the current lesson within the same topic, based on document order in EDUCATION_LESSONS.
 * @param {EducationLesson} currentLesson - Lesson to find neighbors for
 * @return {{ previous: EducationLesson | null; next: EducationLesson | null }} - Adjacent lessons, or null at the boundaries
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: currentLesson exists within EDUCATION_LESSONS for its topic.
 */
export function getAdjacentLessons(currentLesson: EducationLesson): {
  previous: EducationLesson | null;
  next: EducationLesson | null;
} {
  const sameTopicLessons = EDUCATION_LESSONS.filter(
    (lesson) => lesson.topic === currentLesson.topic
  );
  const currentIndex = sameTopicLessons.findIndex(
    (lesson) => lesson.slug === currentLesson.slug
  );

  return {
    previous: currentIndex > 0 ? sameTopicLessons[currentIndex - 1] : null,
    next: currentIndex < sameTopicLessons.length - 1 ? sameTopicLessons[currentIndex + 1] : null,
  };
}
