import Link from 'next/link';
import { Container, Card, Badge, Button } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';
import { Route } from 'lucide-react';
import { LEARNING_PATHS } from '@/lib/education/learning-paths';
import { getLessonBySlug } from '@/lib/education-config';

export const metadata = constructMetadata({
  title: 'Learning Paths | YDM Agency',
  description:
    'Curated, in-order lesson sequences ("mini-courses") that combine YDM Agency education lessons into a single learning path for a specific outcome.',
});

export default function LearningPathsPage() {
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
            <span className="text-text-primary">Learning Paths</span>
          </nav>
        </Container>
      </section>

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-border">
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Learning Paths
            </h1>
            <p className="text-xl text-text-secondary">
              Individual lessons are useful on their own, but some outcomes need more than one. These are curated,
              in-order sequences through the Education library — each one built around a single goal.
            </p>
          </div>
        </Container>
      </section>

      {/* Paths List */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-4xl space-y-6">
            {LEARNING_PATHS.map((path) => {
              const lessons = path.lessonSlugs
                .map((slug) => getLessonBySlug(slug))
                .filter((lesson): lesson is NonNullable<typeof lesson> => Boolean(lesson));

              return (
                <Link key={path.slug} href={`/education/paths/${path.slug}`} className="block group">
                  <Card className="p-6 transition-colors group-hover:border-accent">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline">{lessons.length} lessons</Badge>
                        </div>
                        <h2 className="text-xl font-display font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                          {path.title}
                        </h2>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {path.description}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-accent/10 flex-shrink-0">
                        <Route className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-surface border-t border-border">
        <Container className="text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-6">
            Need hands-on help applying any of this?
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
