/**
 * FILE: page.tsx
 * PURPOSE: Renders the /blog/[slug] individual blog post page with editorial header, pull quote, content sections, author bio, and a related CTA.
 * ARCHITECTURE: Server component with generateStaticParams and generateMetadata; reads BLOG_POSTS by slug and renders the post with category-colored badges and sectioned content.
 * KEY RULES: Must 404 for unknown slugs; must use the firm-level impersonal voice; final CTA must point to /contact; category colors must fall back to the accent palette.
 * DEPENDS ON: next/link, next/navigation, @ydm-agency/ui (Container, Badge, Button), @ydm-agency/seo (constructMetadata), @/lib/blog-config, lucide-react.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Badge, Button } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';
import { BLOG_POSTS, type BlogPost } from '@/lib/blog-config';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';

/**
 * WHAT IT DOES: Pre-generates static params for each blog post slug in BLOG_POSTS at build time.
 * @return {Promise<{ slug: string }[]>} - Array of slug params for static generation
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: BLOG_POSTS entries have unique slugs.
 */
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

/**
 * WHAT IT DOES: Generates the SEO metadata for a blog post from the post's configured metaTitle and metaDescription.
 * @param {{ params: Promise<{ slug: string }> }} args - Route params containing the post slug
 * @return {Promise<Metadata>} - Next.js metadata object, or empty object for unknown slugs
 * SIDE EFFECTS: None (pure async function).
 * ASSUMES: params.slug is a potential slug in BLOG_POSTS.
 */
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

/**
 * WHAT IT DOES: Returns Tailwind classes for a category badge color, mapping known categories (Opinion, Analysis, News, Essay) to distinct palettes and falling back to the accent palette.
 * @param {string} category - Blog post category
 * @return {string} - Tailwind class string for the badge color
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: None.
 */
function getCategoryColor(category: string): string {
  switch (category) {
    case 'Opinion':
      return 'bg-accent/10 text-accent border-accent/20';
    case 'Analysis':
      return 'bg-error/10 text-error border-error/20';
    case 'News':
      return 'bg-success/10 text-success border-success/20';
    case 'Essay':
      return 'bg-text-secondary/10 text-text-secondary border-text-secondary/20';
    default:
      return 'bg-accent/10 text-accent border-accent/20';
  }
}

/**
 * WHAT IT DOES: Renders an individual blog post page with breadcrumb, editorial header, pull quote, content sections, author bio, share button, and a related CTA.
 * @param {{ params: Promise<{ slug: string }> }} args - Route params containing the post slug
 * @return {Promise<JSX.Element>} - Rendered blog post page
 * SIDE EFFECTS: Calls notFound() for unknown slugs (renders the 404 page).
 * ASSUMES: params.slug is a potential slug in BLOG_POSTS.
 */
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
              <blockquote className="border-l-4 border-accent pl-8 my-12 py-6 bg-accent/5">
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
            <Button asChild variant="primary" size="lg">
              <Link href="/contact">Get a Free Project Outline</Link>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}