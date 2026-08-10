/**
 * FILE: page.tsx
 * PURPOSE: Renders the /education/[topic] topic listing page with breadcrumb, header, search, lesson list (with filter via TopicContent), and a CTA.
 * ARCHITECTURE: Server component with generateStaticParams and generateMetadata; resolves the topic via getTopicBySlug, filters EDUCATION_LESSONS by normalized topic name, and emits an EducationAnalytics topic_view event.
 * KEY RULES: Must 404 for unknown topics; must use the firm-level impersonal voice; final CTA must point to /contact.
 * DEPENDS ON: next/link, next/navigation, @ydm-agency/ui (Container, Card, Badge, Button), @ydm-agency/seo (constructMetadata), @/lib/education-config, lucide-react, ./TopicContent, ../EducationAnalytics, ../EducationSearch.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Card, Badge, Button } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';
import { EDUCATION_TOPICS, EDUCATION_LESSONS, getTopicBySlug, getLessonsByTopic, type EducationLesson } from '@/lib/education-config';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import TopicContent from './TopicContent';
import EducationAnalytics from '../EducationAnalytics';
import EducationSearch from '../EducationSearch';

/**
 * WHAT IT DOES: Pre-generates static params for each education topic slug at build time.
 * @return {Promise<{ topic: string }[]>} - Array of topic params for static generation
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: EDUCATION_TOPICS entries have unique slugs.
 */
export async function generateStaticParams() {
  return EDUCATION_TOPICS.map((topic) => ({ topic: topic.slug }));
}

/**
 * WHAT IT DOES: Generates the SEO metadata for a topic listing page from the topic's name and description.
 * @param {{ params: Promise<{ topic: string }> }} args - Route params containing the topic slug
 * @return {Promise<Metadata>} - Next.js metadata object, or empty object for unknown topics
 * SIDE EFFECTS: None (pure async function).
 * ASSUMES: params.topic is a potential slug in EDUCATION_TOPICS.
 */
export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const topicData = getTopicBySlug(topic);
  
  if (!topicData) {
    return {};
  }

  return constructMetadata({
    title: `${topicData.name} Education | YDM Agency`,
    description: topicData.description,
  });
}

/**
 * WHAT IT DOES: Normalizes an education topic name (e.g., "SEO") into a URL-safe slug (e.g., "seo") by lowercasing and replacing whitespace with hyphens.
 * @param {string} topicName - Display topic name to normalize
 * @return {string} - URL-safe topic slug
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: topic names map deterministically to slugs via lowercasing and hyphenation.
 */
function normalizeTopicName(topicName: string): string {
  return topicName.toLowerCase().replace(/\s+/g, '-');
}

/**
 * WHAT IT DOES: Renders the topic listing page for a given topic slug, including breadcrumb, header, search, lesson list (via TopicContent), and a CTA.
 * @param {{ params: Promise<{ topic: string }> }} args - Route params containing the topic slug
 * @return {Promise<JSX.Element>} - Rendered topic listing page
 * SIDE EFFECTS: Calls notFound() for unknown topics; emits an EducationAnalytics topic_view event.
 * ASSUMES: params.topic is a potential slug in EDUCATION_TOPICS; lessons are matched by normalized topic name.
 */
export default async function EducationTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const topicData = getTopicBySlug(topic);
  
  const lessons = topicData 
    ? EDUCATION_LESSONS.filter((lesson) => 
        normalizeTopicName(lesson.topic) === topic
      )
    : [];

  if (!topicData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-text-primary">
      <EducationAnalytics eventType="topic_view" topic={topicData.name} />
      
      {/* Breadcrumb */}
      <section className="py-8 border-b border-border">
        <Container>
          <nav className="flex items-center gap-2 text-sm text-text-secondary">
            <Link href="/education" className="hover:text-accent transition-colors">
              Education
            </Link>
            <span>/</span>
            <span className="text-text-primary">{topicData.name}</span>
          </nav>
        </Container>
      </section>

      {/* Header */}
      <section className="py-16 md:py-24 border-b border-border">
        <Container>
          <Link 
            href="/education" 
            className="inline-flex items-center gap-2 text-accent hover:text-accent-hover mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Education
          </Link>
          
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4">
              {topicData.name}
            </h1>
            <p className="text-xl text-text-secondary">
              {topicData.description}
            </p>
            <div className="mt-4">
              <Badge variant="outline">{lessons.length} lessons</Badge>
            </div>
          </div>
        </Container>
      </section>

      {/* Search */}
      <section className="py-8 border-b border-border">
        <Container>
          <EducationSearch showResults={false} compact={true} />
        </Container>
      </section>

      {/* Lessons List with Filter */}
      <TopicContent lessons={lessons} />

      {/* CTA */}
      <section className="py-16 md:py-24 bg-surface border-t border-border">
        <Container className="text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-6">
            Need hands-on help with {topicData.name.toLowerCase()}?
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            Get a free project outline and see how the technical work fits into a larger plan.
          </p>
          <Button asChild variant="primary" size="lg">
            <Link href="/contact">Get a Free Project Outline</Link>
          </Button>
        </Container>
      </section>
    </main>
  );
}