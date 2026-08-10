/**
 * FILE: page.tsx
 * PURPOSE: Renders the /blog hub page with an editorial header, a featured post, and a regular-posts grid using BLOG_POSTS.
 * ARCHITECTURE: Server component with a static metadata export via constructMetadata; selects the featured post (or first post) and renders the rest in an editorial grid with category-colored badges.
 * KEY RULES: Must use the firm-level impersonal voice; post cards must link to /blog/[slug]; category colors must fall back to the accent palette for unknown categories.
 * DEPENDS ON: next/link, @ydm-agency/ui (Container, Badge, Button), @ydm-agency/seo (constructMetadata), lucide-react, @/lib/blog-config.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import { Container, Badge, Button } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog-config';

export const metadata = constructMetadata({
  title: 'Blog | YDM Agency',
  description: 'Opinion, news, and market perspective from YDM Agency on web design, search, and marketing.',
});

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

/**
 * WHAT IT DOES: Renders the blog hub page with an editorial header, a featured post, and a regular-posts grid.
 * @return {JSX.Element} - Rendered blog hub page
 * SIDE EFFECTS: None (server-side rendering).
 * ASSUMES: BLOG_POSTS is non-empty; the featured post is the one flagged `featured` or the first post.
 */
export default function BlogPage() {
  const featuredPost = BLOG_POSTS.find(post => post.featured) || BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.filter(post => post.slug !== featuredPost.slug);

  return (
    <main className="min-h-screen bg-background text-text-primary">
      {/* Editorial Header */}
      <section className="py-16 md:py-24 border-b border-border">
        <Container>
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-border" />
              <span className="text-sm font-medium text-text-secondary uppercase tracking-widest">
                Perspective & Analysis
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
              Blog
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary max-w-2xl leading-relaxed">
              Opinion, news, and market perspective on what is changing in web design, search, and marketing.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Article - Editorial Layout */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Featured Article - Asymmetric Layout */}
            <div className="lg:col-span-8 lg:col-start-3">
              <Link 
                href={`/blog/${featuredPost.slug}`}
                className="group block"
              >
                <article className="relative">
                  {/* Category Badge */}
                  <div className="mb-6">
                    <Badge 
                      variant="outline" 
                      className={`text-sm px-4 py-1.5 ${getCategoryColor(featuredPost.category)}`}
                    >
                      {featuredPost.category}
                    </Badge>
                  </div>

                  {/* Title - Editorial Typography */}
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight group-hover:text-accent transition-colors">
                    {featuredPost.title}
                  </h2>

                  {/* Pull Quote if exists */}
                  {featuredPost.pullQuote && (
                    <blockquote className="border-l-4 border-amber-500 pl-6 my-8 py-4 bg-amber-500/5">
                      <p className="text-xl md:text-2xl font-display font-medium text-text-primary italic leading-relaxed">
                        {featuredPost.pullQuote}
                      </p>
                    </blockquote>
                  )}

                  {/* Summary */}
                  <p className="text-lg text-text-secondary leading-relaxed mb-8">
                    {featuredPost.summary}
                  </p>

                  {/* Author & Metadata */}
                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <div className="flex items-center gap-4">
                      {featuredPost.author && (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center text-text-primary font-semibold">
                            {featuredPost.author.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-text-primary">{featuredPost.author.name}</p>
                            <p className="text-xs text-text-secondary">{featuredPost.author.role}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-text-secondary">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <time>{featuredPost.publishedAt}</time>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Read More */}
                  <div className="mt-8 flex items-center gap-2 text-accent group-hover:gap-3 transition-all">
                    <span className="font-medium">Read full article</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </article>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Regular Posts - Editorial Grid */}
      <section className="py-16 md:py-24 border-t border-border">
        <Container>
          <div className="mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-2">
              Recent Articles
            </h2>
            <p className="text-text-secondary">
              More perspective on web design, search, and marketing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="h-full flex flex-col">
                  {/* Category */}
                  <div className="mb-4">
                    <Badge 
                      variant="outline" 
                      className={`text-xs px-3 py-1 ${getCategoryColor(post.category)}`}
                    >
                      {post.category}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-text-primary mb-3 leading-tight group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-6">
                    {post.summary}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center justify-between pt-4 border-t border-border text-xs text-text-secondary">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <time>{post.publishedAt}</time>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Author if exists */}
                  {post.author && (
                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center text-text-primary text-xs font-semibold">
                        {post.author.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs text-text-secondary">{post.author.name}</span>
                    </div>
                  )}
                </article>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Editorial CTA */}
      <section className="py-16 md:py-24 bg-surface border-t border-border">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px flex-1 bg-border max-w-32" />
              <span className="text-sm font-medium text-text-secondary uppercase tracking-widest">
                Work With YDM Agency
              </span>
              <div className="h-px flex-1 bg-border max-w-32" />
            </div>
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
