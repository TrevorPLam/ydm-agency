import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Badge, Button } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';
import { EDUCATION_LESSONS, getTopicBySlug, type EducationLesson } from '@/lib/education-config';
import { ArrowLeft, GraduationCap } from 'lucide-react';

// JSON-LD structured data for Article schema
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

export async function generateStaticParams() {
  return EDUCATION_LESSONS.map((lesson) => ({
    topic: lesson.topic.toLowerCase(),
    slug: lesson.slug,
  }));
}

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

export default async function EducationLessonPage({ params }: { params: Promise<{ topic: string; slug: string }> }) {
  const { topic, slug } = await params;
  const lesson = EDUCATION_LESSONS.find((l) => l.slug === slug);
  const topicData = getTopicBySlug(topic);

  if (!lesson || !topicData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-text-primary">
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
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
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
                <div className="flex items-center gap-4 text-sm text-text-secondary">
                  <span>{lesson.readTime} read</span>
                  {lesson.lastUpdated && (
                    <>
                      <span>•</span>
                      <span>Updated {lesson.lastUpdated}</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-text-secondary mt-4 italic">
                  {lesson.attribution}
                </p>
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
                <Link href="/contact">
                  <Button variant="primary" size="lg">
                    Get a Free Project Outline
                  </Button>
                </Link>
              </div>
            </Container>
          </section>
        </div>

        {/* Right Sidebar - Table of Contents */}
        <aside className="hidden xl:block w-64 border-l border-border p-8 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              On this page
            </h3>
            <nav className="space-y-2">
              {lesson.sections.map((section, index) => (
                <a
                  key={index}
                  href={`#section-${index}`}
                  className="block py-2 px-3 rounded-md text-sm text-text-secondary hover:bg-surface hover:text-text-primary transition-colors"
                >
                  {section.heading}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </main>
  );
}