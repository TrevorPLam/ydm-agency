import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Badge, Button } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';
import { BLOG_POSTS, type BlogPost } from '@/lib/blog-config';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  
  if (!post) {
    return {};
  }

  return constructMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
  });
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'Opinion':
      return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    case 'Analysis':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    case 'News':
      return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'Essay':
      return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
    default:
      return 'bg-accent/10 text-accent border-accent/20';
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-text-primary">
      {/* Breadcrumb */}
      <section className="py-8 border-b border-border">
        <Container>
          <nav className="flex items-center gap-2 text-sm text-text-secondary">
            <Link href="/blog" className="hover:text-accent transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-text-primary">{post.title}</span>
          </nav>
        </Container>
      </section>

      {/* Article Header - Editorial Style */}
      <article className="py-16 md:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Category */}
            <div className="mb-6">
              <Badge 
                variant="outline" 
                className={`text-sm px-4 py-1.5 ${getCategoryColor(post.category)}`}
              >
                {post.category}
              </Badge>
            </div>

            {/* Title - Editorial Typography */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-8 leading-tight tracking-tight">
              {post.title}
            </h1>

            {/* Author & Metadata */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-border">
              <div className="flex items-center gap-4">
                {post.author && (
                  <>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center text-text-primary font-semibold text-lg">
                      {post.author.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-base font-medium text-text-primary">{post.author.name}</p>
                      <p className="text-sm text-text-secondary">{post.author.role}</p>
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center gap-6 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time>{post.publishedAt}</time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            {/* Pull Quote if exists */}
            {post.pullQuote && (
              <blockquote className="border-l-4 border-amber-500 pl-8 my-12 py-6 bg-amber-500/5">
                <p className="text-2xl md:text-3xl font-display font-medium text-text-primary italic leading-relaxed">
                  {post.pullQuote}
                </p>
              </blockquote>
            )}

            {/* Content Sections */}
            {post.sections && post.sections.length > 0 ? (
              <div className="prose prose-lg prose-invert max-w-none">
                {post.sections.map((section, index) => (
                  <div key={index} className="mb-12">
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-6 leading-tight">
                      {section.heading}
                    </h2>
                    <div className="text-text-secondary text-lg leading-relaxed whitespace-pre-line">
                      {section.body}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-text-secondary text-lg leading-relaxed">
                {post.summary}
              </div>
            )}

            {/* Article Footer */}
            <div className="mt-16 pt-8 border-t border-border">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <Link 
                  href="/blog"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Blog</span>
                </Link>
                
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Author Bio */}
              {post.author && post.author.bio && (
                <div className="mt-12 p-6 bg-surface rounded-lg border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center text-text-primary font-semibold text-lg flex-shrink-0">
                      {post.author.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-text-primary mb-2">
                        {post.author.name}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {post.author.bio}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </article>

      {/* Related CTA */}
      <section className="py-16 md:py-24 bg-surface border-t border-border">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Want marketing guidance applied directly to your business?
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Describe what is not working — a clear path forward will be provided, free of charge.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Get a Free Project Outline
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}