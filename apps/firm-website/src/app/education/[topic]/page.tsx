import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Card, Badge, Button } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';
import { EDUCATION_TOPICS, EDUCATION_LESSONS, getTopicBySlug, getLessonsByTopic, type EducationLesson } from '@/lib/education-config';
import { ArrowLeft, GraduationCap } from 'lucide-react';

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

function getSafetyBadgeVariant(safety: EducationLesson['safety']): 'default' | 'accent' | 'outline' {
  switch (safety) {
    case 'public-domain':
      return 'accent';
    case 'cite-creator':
      return 'outline';
    case 'extra-care':
      return 'default';
    default:
      return 'default';
  }
}

function getSafetyLabel(safety: EducationLesson['safety']): string {
  switch (safety) {
    case 'public-domain':
      return 'Public Domain';
    case 'cite-creator':
      return 'Cite Creator';
    case 'extra-care':
      return 'Use Care';
    default:
      return 'Use Care';
  }
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

      {/* Lessons List */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-4xl">
            {lessons.length > 0 ? (
              <div className="space-y-6">
                {lessons.map((lesson) => (
                  <Link
                    key={lesson.slug}
                    href={`/education/${lesson.topic.toLowerCase()}/${lesson.slug}`}
                    className="block group"
                  >
                    <Card className="p-6 transition-colors group-hover:border-accent">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline">{lesson.topic}</Badge>
                            <Badge variant="default">{lesson.level}</Badge>
                            <Badge variant={getSafetyBadgeVariant(lesson.safety)}>
                              {getSafetyLabel(lesson.safety)}
                            </Badge>
                          </div>
                          <h2 className="text-xl font-display font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                            {lesson.title}
                          </h2>
                          <p className="text-text-secondary text-sm leading-relaxed mb-4">
                            {lesson.summary}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-text-secondary">
                            <span>{lesson.readTime} read</span>
                            <span>•</span>
                            <span className="italic">{lesson.attribution}</span>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-accent/10 flex-shrink-0">
                          <GraduationCap className="w-6 h-6 text-accent" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-text-secondary text-lg">
                  No lessons available in this topic yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>

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