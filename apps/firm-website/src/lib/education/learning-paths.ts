/**
 * FILE: learning-paths.ts
 * PURPOSE: Provides the LEARNING_PATHS data and LearningPath interface for cross-cutting learning paths in the /education/paths routes.
 * ARCHITECTURE: Static typed data module exporting a LearningPath array; each path references an ordered list of EducationLesson slugs that span multiple topics.
 * KEY RULES: Path slugs must be unique; lessonSlugs must reference existing EducationLesson slugs; content must use the firm-level impersonal voice.
 * DEPENDS ON: None (pure data); lesson slugs resolved against EDUCATION_LESSONS at render time.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
export interface LearningPath {
  slug: string;
  title: string;
  description: string;
  /** Ordered list of EducationLesson slugs that make up this path. */
  lessonSlugs: string[];
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    slug: 'build-your-first-marketing-stack-in-a-weekend',
    title: 'Build Your First Marketing Stack in a Weekend',
    description:
      'A three-lesson path for a business with no marketing system in place yet. Set a revenue-connected goal, get clear on what the business actually is before choosing tactics, and put basic conversion tracking in place so every future decision has data behind it.',
    lessonSlugs: [
      'smart-marketing-goals-connected-to-revenue',
      'marketing-vs-sales-vs-brand',
      'ga4-find-your-biggest-conversion-leaks',
    ],
  },
  {
    slug: 'the-ethical-marketers-toolkit',
    title: "The Ethical Marketer's Toolkit",
    description:
      'Four lessons on staying honest and legally sound while still marketing persuasively: citing ideas correctly, respecting privacy law, meeting basic accessibility expectations, and applying influence principles without manipulation.',
    lessonSlugs: [
      'citing-frameworks-and-ideas-practical-guide',
      'gdpr-ccpa-privacy-regulations-non-lawyer',
      'accessibility-ada-websites-emails-pdfs',
      'psychology-of-trust-cialdini-influence',
    ],
  },
  {
    slug: 'from-zero-to-ranked-six-week-seo-plan',
    title: 'From Zero to Ranked: A 6-Week SEO Plan',
    description:
      'A curated, in-order path through the SEO beginner and intermediate lessons. Follow it roughly one lesson per week to go from not understanding search at all to running a repeatable audit and reading the results correctly.',
    lessonSlugs: [
      'how-search-engines-work-crawling-indexing-ranking',
      'keyword-research-without-paid-tools',
      'writing-titles-and-meta-descriptions-that-get-clicks',
      'on-page-seo-10-point-checklist',
      'google-search-console-performance-report',
      '30-minute-seo-audit-of-your-own-site',
    ],
  },
  {
    slug: 'launching-your-next-product-without-legal-nightmares',
    title: 'Launching Your Next Product Without Legal Nightmares',
    description:
      'A five-lesson path combining conversion and compliance: build a landing page and pricing structure that convert, then make sure the reviews, brand name, and industry claims around the launch stay on the right side of the law.',
    lessonSlugs: [
      'anatomy-of-a-high-converting-landing-page',
      'pricing-page-psychology-anchoring-decoys-transparency',
      'ftc-endorsement-testimonial-guidelines',
      'trademark-basics-protecting-and-respecting-brands',
      'marketing-compliance-regulated-industries',
    ],
  },
];

export function getLearningPathBySlug(slug: string): LearningPath | undefined {
  return LEARNING_PATHS.find((path) => path.slug === slug);
}
