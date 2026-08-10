/**
 * FILE: page.tsx
 * PURPOSE: Renders the /education/[topic]/[slug] individual lesson page with three-column layout (topic nav, main content, table of contents), Article JSON-LD, related lessons, prev/next navigation, and a CTA.
 * ARCHITECTURE: Server component with generateStaticParams and generateMetadata; reads EDUCATION_LESSONS by slug, emits ArticleJsonLd and EducationAnalytics lesson_view events, and renders sections with TableOfContents, SocialShare, and PrintButton.
 * KEY RULES: Must 404 for unknown lessons or topics; must emit Article JSON-LD for rich results; must use the firm-level impersonal voice; final CTA must point to /contact.
 * DEPENDS ON: next/link, next/navigation, @ydm-agency/ui (Container, Badge, Button), @ydm-agency/seo (constructMetadata), @/lib/education-config, lucide-react, ../../TableOfContents, ../../EducationAnalytics, ../../SocialShare, ../../PrintButton, ../../print.css.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Badge, Button } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';
import { EDUCATION_LESSONS, getTopicBySlug, getRelatedLessons, getAdjacentLessons, type EducationLesson } from '@/lib/education-config';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import TableOfContents from '../../TableOfContents';
import EducationAnalytics from '../../EducationAnalytics';
import SocialShare from '../../SocialShare';
import PrintButton from '../../PrintButton';
import { getSafetyBadgeVariant, getSafetyLabel } from '@/lib/education/safety-helpers';
import '../../print.css';

/**
 * WHAT IT DOES: Renders Article JSON-LD structured data for a lesson, including headline, author/publisher (YDM Agency), dates, keywords, and educational metadata.
 * @param {{ lesson: EducationLesson; topic: string }} props - Lesson data and topic slug
 * @return {JSX.Element} - <script type="application/ld+json"> element with the Article schema
 * SIDE EFFECTS: None (pure rendering component).
 * ASSUMES: lesson has title, metaDescription, lastUpdated, topic, level, and sections fields.
 */
function ArticleJsonLd({ lesson, topic }: { lesson: EducationLesson; topic: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: lesson.title,
    description: lesson.metaDescription,
    author: {
      '@type': 'Organization',
      name: 'YDM Agency',
      url: 'https://ydm-agency.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'YDM Agency',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ydm-agency.com/logo.png',
      },
    },
    datePublished: lesson.lastUpdated || new Date().toISOString(),
    dateModified: lesson.lastUpdated || new Date().toISOString(),
    about: {
      '@type': 'Thing',
      name: lesson.topic,
    },
    keywords: [lesson.topic, lesson.level, lesson.title],
    articleSection: lesson.sections.map((section) => section.heading),
    learningResourceType: 'Lesson',
    educationalLevel: lesson.level,
    educationalUse: 'Learning',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * WHAT IT DOES: Pre-generates static params for each lesson's topic/slug pair at build time.
 * @return {Promise<{ topic: string; slug: string }[]>} - Array of topic/slug params for static generation
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: EDUCATION_LESSONS entries have unique slugs and topic names that lowercased match topic slugs.
 */
export async function generateStaticParams() {
  return EDUCATION_LESSONS.map((lesson) => ({
    topic: lesson.topic.toLowerCase(),
    slug: lesson.slug,
  }));
}

/**
 * WHAT IT DOES: Generates the SEO metadata for a lesson page from the lesson's configured metaTitle and metaDescription.
 * @param {{ params: Promise<{ topic: string; slug: string }> }} args - Route params containing the topic and lesson slugs
 * @return {Promise<Metadata>} - Next.js metadata object, or empty object for unknown lessons
 * SIDE EFFECTS: None (pure async function).
 * ASSUMES: params.slug is a potential slug in EDUCATION_LESSONS.
 */
export async function generateMetadata({ params }: { params: Promise<{ topic: string; slug: string }> }) {
  const { topic, slug } = await params;
  const lesson = EDUCATION_LESSONS.find((l) => l.slug === slug);
  
  if (!lesson) {
    return {};
  }

  return constructMetadata({
    title: lesson.metaTitle,
    description: lesson.metaDescription,
  });
}

/**
 * WHAT IT DOES: Renders an individual lesson page with three-column layout (topic nav, main content, table of contents), Article JSON-LD, related lessons, prev/next navigation, and a CTA.
 * @param {{ params: Promise<{ topic: string; slug: string }> }} args - Route params containing the topic and lesson slugs
 * @return {Promise<JSX.Element>} - Rendered lesson page
 * SIDE EFFECTS: Calls notFound() for unknown lessons or topics; emits an EducationAnalytics lesson_view event.
 * ASSUMES: params.slug is a potential slug in EDUCATION_LESSONS and params.topic is a potential slug in EDUCATION_TOPICS.
 */
export default async function EducationLessonPage({ params }: { params: Promise<{ topic: string; slug: string }> }) {
  const { topic, slug } = await params;
  const lesson = EDUCATION_LESSONS.find((l) => l.slug === slug);
  const topicData = getTopicBySlug(topic);

  if (!lesson || !topicData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-text-primary">
      <EducationAnalytics eventType="lesson_view" lesson={lesson} />
      <ArticleJsonLd lesson={lesson} topic={topic} />
      
      {/* Breadcrumb */}
      <section className="py-8 border-b border-border">
        <Container>
          <nav className="flex items-center gap-2 text-sm text-text-secondary">
            <Link href="/education" className="hover:text-accent transition-colors">
              Education
            </Link>
            <span>/</span>
            <Link href={`/education/${topic}`} className="hover:text-accent transition-colors">
              {topicData.name}
            </Link>
            <span>/</span>
            <span className="text-text-primary">{lesson.title}</span>
          </nav>
        </Container>
      </section>

      {/* Three-column layout */}
      <div className="flex">
        {/* Left Sidebar - Topic Navigation */}
        <aside className="hidden lg:block w-64 border-r border-border p-8 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Topics
            </h3>
            <nav className="space-y-2">
              <Link
                href="/education"
                className="block py-2 px-3 rounded-md text-sm text-text-secondary hover:bg-surface hover:text-text-primary transition-colors"
              >
                All Topics
              </Link>
              <Link
                href="/education/seo"
                className="block py-2 px-3 rounded-md text-sm text-text-secondary hover:bg-surface hover:text-text-primary transition-colors"
              >
                SEO
              </Link>
              <Link
                href="/education/conversion"
                className="block py-2 px-3 rounded-md text-sm text-text-secondary hover:bg-surface hover:text-text-primary transition-colors"
              >
                Conversion
              </Link>
              <Link
                href="/education/foundations"
                className="block py-2 px-3 rounded-md text-sm text-text-secondary hover:bg-surface hover:text-text-primary transition-colors"
              >
                Foundations
              </Link>
              <Link
                href="/education/strategy"
                className="block py-2 px-3 rounded-md text-sm text-text-secondary hover:bg-surface hover:text-text-primary transition-colors"
              >
                Strategy
              </Link>
              <Link
                href="/education/compliance"
                className="block py-2 px-3 rounded-md text-sm text-text-secondary hover:bg-surface hover:text-text-primary transition-colors"
              >
                Compliance
              </Link>
              <Link
                href="/education/paths"
                className="block py-2 px-3 rounded-md text-sm text-text-secondary hover:bg-surface hover:text-text-primary transition-colors"
              >
                Learning Paths
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <article className="flex-1 min-w-0">
          {/* Hero */}
          <section className="py-12 md:py-16">
            <Container>
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <Badge variant="outline">{lesson.topic}</Badge>
                  <Badge variant={getSafetyBadgeVariant(lesson.safety)}>
                    {getSafetyLabel(lesson.safety)}
                  </Badge>
                  <Badge variant="default">{lesson.level}</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary mb-6">
                  {lesson.title}
                </h1>
                <p className="text-lg text-text-secondary mb-4">
                  {lesson.summary}
                </p>
                <div className="flex items-start gap-3 p-4 mb-6 rounded-lg bg-surface border border-border">
                  <GraduationCap className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <p className="text-sm text-text-primary">
                    <span className="font-semibold">After this lesson, you&apos;ll be able to</span>{' '}
                    {lesson.learningOutcome}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-text-secondary">
                  <span>{lesson.readTime} read</span>
                  {lesson.lastUpdated && (
                    <>
                      <span>•</span>
                      <span>Updated {lesson.lastUpdated}</span>
                    </>
                  )}
                  <PrintButton />
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-text-secondary italic">
                    {lesson.attribution}
                  </p>
                  <div className="no-print">
                    <SocialShare 
                      title={lesson.title} 
                      url={`https://ydm-agency.com/education/${topic}/${slug}`} 
                    />
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Content */}
          <section className="pb-16 md:pb-24">
            <Container>
              <div className="max-w-3xl space-y-12">
                {lesson.sections.map((section, index) => (
                  <div key={index} id={`section-${index}`}>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-4">
                      {section.heading}
                    </h2>
                    <div className="text-text-secondary text-lg leading-relaxed whitespace-pre-line">
                      {section.body}
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </section>

          {/* Related Lessons */}
          {(() => {
            const relatedLessons = getRelatedLessons(lesson);
            if (relatedLessons.length === 0) return null;
            return (
              <section className="py-16 md:py-24 border-t border-border">
                <Container>
                  <div className="max-w-3xl">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-8">
                      Related Lessons
                    </h2>
                    <div className="space-y-4">
                      {relatedLessons.map((relatedLesson) => (
                        <Link
                          key={relatedLesson.slug}
                          href={`/education/${relatedLesson.topic.toLowerCase()}/${relatedLesson.slug}`}
                          className="block group"
                        >
                          <div className="p-6 border border-border rounded-lg hover:border-accent transition-colors">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="outline">{relatedLesson.topic}</Badge>
                              <Badge variant="default">{relatedLesson.level}</Badge>
                            </div>
                            <h3 className="text-lg font-display font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                              {relatedLesson.title}
                            </h3>
                            <p className="text-text-secondary text-sm leading-relaxed">
                              {relatedLesson.summary}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </Container>
              </section>
            );
          })()}

          {/* Next/Previous Navigation */}
          {(() => {
            const { previous, next } = getAdjacentLessons(lesson);
            if (!previous && !next) return null;
            return (
              <section className="py-16 md:py-24 border-t border-border">
                <Container>
                  <div className="max-w-3xl">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-8">
                      Continue Learning
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {previous && (
                        <Link
                          href={`/education/${previous.topic.toLowerCase()}/${previous.slug}`}
                          className="block group"
                        >
                          <div className="p-6 border border-border rounded-lg hover:border-accent transition-colors h-full">
                            <div className="text-sm text-text-secondary mb-2">Previous Lesson</div>
                            <h3 className="text-lg font-display font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                              {previous.title}
                            </h3>
                            <p className="text-text-secondary text-sm leading-relaxed">
                              {previous.summary}
                            </p>
                          </div>
                        </Link>
                      )}
                      {next && (
                        <Link
                          href={`/education/${next.topic.toLowerCase()}/${next.slug}`}
                          className="block group"
                        >
                          <div className="p-6 border border-border rounded-lg hover:border-accent transition-colors h-full">
                            <div className="text-sm text-text-secondary mb-2">Next Lesson</div>
                            <h3 className="text-lg font-display font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                              {next.title}
                            </h3>
                            <p className="text-text-secondary text-sm leading-relaxed">
                              {next.summary}
                            </p>
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                </Container>
              </section>
            );
          })()}

          {/* Back + CTA */}
          <section className="py-16 md:py-24 border-t border-border">
            <Container>
              <div className="max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <Link 
                  href={`/education/${topic}`} 
                  className="text-accent hover:text-accent-hover underline underline-offset-4"
                >
                  &larr; Back to {topicData.name}
                </Link>
                <Button asChild variant="primary" size="lg">
                  <Link href="/contact">Get a Free Project Outline</Link>
                </Button>
              </div>
            </Container>
          </section>
        </article>

        {/* Right Sidebar - Table of Contents */}
        <TableOfContents sections={lesson.sections} />
      </div>
    </main>
  );
}