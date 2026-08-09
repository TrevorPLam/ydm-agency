'use server';

import { EDUCATION_LESSONS, type EducationLesson } from '@/lib/education-config';

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
