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
