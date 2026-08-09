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

// Helper function to get lessons by topic
export function getLessonsByTopic(topicSlug: string): EducationLesson[] {
  return EDUCATION_LESSONS.filter((lesson) => lesson.topic.toLowerCase() === topicSlug.toLowerCase());
}

// Helper function to look up a single lesson by its slug
export function getLessonBySlug(slug: string): EducationLesson | undefined {
  return EDUCATION_LESSONS.find((lesson) => lesson.slug === slug);
}

// Helper function to get all unique topics from lessons
export function getTopicsFromLessons(): string[] {
  const topics = new Set(EDUCATION_LESSONS.map((lesson) => lesson.topic));
  return Array.from(topics).sort();
}

// Helper function to get topic metadata
export function getTopicBySlug(slug: string): EducationTopic | undefined {
  return EDUCATION_TOPICS.find((topic) => topic.slug === slug);
}

// Helper function to get related lessons (same topic, different lesson)
export function getRelatedLessons(currentLesson: EducationLesson, limit: number = 3): EducationLesson[] {
  const sameTopicLessons = EDUCATION_LESSONS.filter(
    (lesson) => lesson.topic === currentLesson.topic && lesson.slug !== currentLesson.slug
  );
  return sameTopicLessons.slice(0, limit);
}

// Helper function to get next and previous lessons in the same topic
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
