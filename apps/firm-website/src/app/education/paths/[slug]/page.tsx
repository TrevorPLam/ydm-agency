/**
 * FILE: page.tsx
 * PURPOSE: Renders the /education/paths/[slug] learning path detail page with breadcrumb, header, ordered lesson list, and a CTA.
 * ARCHITECTURE: Server component with generateStaticParams and generateMetadata; resolves the path via getLearningPathBySlug and renders its lessons in order, filtering out any missing lessons.
 * KEY RULES: Must 404 for unknown paths; must use the firm-level impersonal voice; lesson links must point to /education/[topic]/[slug]; final CTA must point to /contact.
 * DEPENDS ON: next/link, next/navigation, @ydm-agency/ui (Container, Card, Badge, Button), @ydm-agency/seo (constructMetadata), lucide-react, @/lib/education/learning-paths, @/lib/education-config.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Card, Badge, Button } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { LEARNING_PATHS, getLearningPathBySlug } from '@/lib/education/learning-paths';
import { getLessonBySlug, type EducationLesson } from '@/lib/education-config';

/**
 * WHAT IT DOES: Pre-generates static params for each learning path slug at build time.
 * @return {Promise<{ slug: string }[]>} - Array of slug params for static generation
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: LEARNING_PATHS entries have unique slugs.
 */
export async function generateStaticParams() {
  return LEARNING_PATHS.map((path) => ({ slug: path.slug }));
}

/**
 * WHAT IT DOES: Generates the SEO metadata for a learning path detail page from the path's title and description.
 * @param {{ params: Promise<{ slug: string }> }} args - Route params containing the path slug
 * @return {Promise<Metadata>} - Next.js metadata object, or empty object for unknown paths
 * SIDE EFFECTS: None (pure async function).
 * ASSUMES: params.slug is a potential slug in LEARNING_PATHS.
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const path = getLearningPathBySlug(slug);

  if (!path) {
    return {};
  }

  return constructMetadata({
    title: `${path.title} | Learning Path | YDM Agency`,
    description: path.description,
  });
}

/**
 * WHAT IT DOES: Renders a learning path detail page with breadcrumb, header, ordered lesson list (numbered), and a CTA.
 * @param {{ params: Promise<{ slug: string }> }} args - Route params containing the path slug
 * @return {Promise<JSX.Element>} - Rendered learning path detail page
 * SIDE EFFECTS: Calls notFound() for unknown paths.
 * ASSUMES: params.slug is a potential slug in LEARNING_PATHS; lessonSlugs resolve to existing lessons via getLessonBySlug.
 */
export default async function LearningPathPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const path = getLearningPathBySlug(slug);

  if (!path) {
    notFound();
  }

  const lessons = path.lessonSlugs
    .map((lessonSlug) => getLessonBySlug(lessonSlug))
    .filter((lesson): lesson is EducationLesson => Boolean(lesson));

  return (
    <main className="min-h-screen bg-background text-text-primary">
      {/* Breadcrumb */}
      <section className="py-8 border-b border-border">
        <Container>
          <nav className="flex items-center gap-2 text-sm text-text-secondary">
            <Link href="/education" className="hover:text-accent transition-colors">
              Education
            </Link>
            <span>/</span>
            <Link href="/education/paths" className="hover:text-accent transition-colors">
              Learning Paths
            </Link>
            <span>/</span>
            <span className="text-text-primary">{path.title}</span>
          </nav>
        </Container>
      </section>

      {/* Header */}
      <section className="py-16 md:py-24 border-b border-border">
        <Container>
          <Link
            href="/education/paths"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-hover mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Learning Paths
          </Link>

          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4">
              {path.title}
            </h1>
            <p className="text-xl text-text-secondary">{path.description}</p>
            <div className="mt-4">
              <Badge variant="outline">{lessons.length} lessons</Badge>
            </div>
          </div>
        </Container>
      </section>

      {/* Ordered Lesson List */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-4xl space-y-6">
            {lessons.map((lesson, index) => (
              <Link
                key={lesson.slug}
                href={`/education/${lesson.topic.toLowerCase()}/${lesson.slug}`}
                className="block group"
              >
                <Card className="p-6 transition-colors group-hover:border-accent">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent font-display font-bold shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline">{lesson.topic}</Badge>
                        <Badge variant="default">{lesson.level}</Badge>
                        <Badge variant="outline">{lesson.readTime} read</Badge>
                      </div>
                      <h2 className="text-xl font-display font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                        {lesson.title}
                      </h2>
                      <p className="text-text-secondary text-sm leading-relaxed">{lesson.summary}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-surface flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-text-secondary" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-surface border-t border-border">
        <Container className="text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-6">
            Need hands-on help applying this path?
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
