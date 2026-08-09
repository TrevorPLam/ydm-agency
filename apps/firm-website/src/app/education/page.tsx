import { Container, Card, Badge, Button } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';
import { Search, BookOpen, Target, Lightbulb, Shield, Route, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { EDUCATION_TOPICS, EDUCATION_LESSONS, type EducationTopic } from '@/lib/education-config';
import { LEARNING_PATHS } from '@/lib/education/learning-paths';
import EducationSearch from './EducationSearch';

export const metadata = constructMetadata({
  title: 'Education | YDM Agency',
  description: 'Technical guides and practical lessons from YDM Agency on SEO, analytics, conversion, marketing frameworks, and attribution practices.',
});

const iconMap = {
  Search,
  BookOpen,
  Target,
  Lightbulb,
  Shield,
};

function getTopicIcon(iconName: string) {
  const IconComponent = iconMap[iconName as keyof typeof iconMap] || BookOpen;
  return IconComponent;
}

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-background text-text-primary">
      {/* Breadcrumb */}
      <section className="py-8 border-b border-border">
        <Container>
          <nav className="flex items-center gap-2 text-sm text-text-secondary">
            <span className="text-text-primary">Education</span>
          </nav>
        </Container>
      </section>

      {/* Hero with Search */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Education
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary mb-12">
              Technical guides and practical lessons for the specific mechanics of marketing: SEO, analytics, conversion, and frameworks.
            </p>
            
            {/* Search Bar */}
            <EducationSearch />
          </div>
        </Container>
      </section>



      {/* Topics Grid */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-2">
              Browse by Topic
            </h2>
            <p className="text-text-secondary">
              Explore lessons organized by marketing discipline
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EDUCATION_TOPICS.map((topic) => {
              const IconComponent = getTopicIcon(topic.icon);
              const topicLessons = EDUCATION_LESSONS.filter(l => l.topic === topic.name);
              return (
                <Link
                  key={topic.slug}
                  href={`/education/${topic.slug}`}
                  className="block group"
                >
                  <Card className="p-6 h-full transition-colors group-hover:border-accent">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-accent/10">
                        <IconComponent className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-display font-semibold text-text-primary mb-1">
                          {topic.name}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {topicLessons.length} lessons
                        </Badge>
                      </div>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {topic.description}
                    </p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Learning Paths */}
      <section className="pb-24 md:pb-32">
        <Container>
          <Card className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Route className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-display font-bold text-text-primary mb-2">
                    Prefer a guided sequence?
                  </h2>
                  <p className="text-text-secondary max-w-xl">
                    Learning Paths string multiple lessons together into a curated, in-order mini-course built
                    around a single outcome — like a 6-week SEO plan or an ethical marketing toolkit.
                  </p>
                </div>
              </div>
              <Link
                href="/education/paths"
                className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-semibold whitespace-nowrap"
              >
                View {LEARNING_PATHS.length} Learning Paths
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Card>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-surface border-t border-border">
        <Container className="text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-6">
            Need hands-on help with the details?
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