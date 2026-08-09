import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Card, Badge, Button } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';
import { EDUCATION_TOPICS, EDUCATION_LESSONS, getTopicBySlug, getLessonsByTopic, type EducationLesson } from '@/lib/education-config';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import TopicContent from './TopicContent';
import EducationAnalytics from '../EducationAnalytics';
import EducationSearch from '../EducationSearch';

export async function generateStaticParams() {
  return EDUCATION_TOPICS.map((topic) => ({ topic: topic.slug }));
}

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

// Helper function to normalize topic names for URL matching
function normalizeTopicName(topicName: string): string {
  return topicName.toLowerCase().replace(/\s+/g, '-');
}

export default async function EducationTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const topicData = getTopicBySlug(topic);
  
  // Get lessons by matching the topic name (case-insensitive)
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
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Get a Free Project Outline
            </Button>
          </Link>
        </Container>
      </section>
    </main>
  );
}