/**
 * FILE: blog-config.ts
 * PURPOSE: Provides the BLOG_POSTS data and BlogPost/BlogAuthor/BlogPostSection types for the /blog hub and /blog/[slug] post pages.
 * ARCHITECTURE: Static typed data module exporting a BlogPost array with sections, authors, pull quotes, and SEO meta; consumed by blog pages and sitemap.
 * KEY RULES: Slugs must be unique; content must use the firm-level impersonal voice; metaTitle/metaDescription must be SEO-optimized; publishedAt must be ISO date strings.
 * DEPENDS ON: None (pure data); consumed by apps/firm-website/src/app/blog/** and sitemap.ts.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
export interface BlogPostSection {
  heading: string;
  body: string;
  type?: 'narrative' | 'analysis' | 'data' | 'quote';
}

export interface BlogAuthor {
  name: string;
  role: string;
  photo?: string;
  bio?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  category: 'Opinion' | 'Analysis' | 'News' | 'Essay';
  contentType: 'opinion' | 'analysis' | 'news' | 'essay';
  publishedAt: string;
  readTime: string;
  featured?: boolean;
  author?: BlogAuthor;
  pullQuote?: string;
  sections?: BlogPostSection[];
  metaTitle: string;
  metaDescription: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'why-most-small-business-websites-fail',
    title: 'Why Most Small Business Websites Fail Within Two Years',
    summary:
      'Most small business websites launch with momentum, then quietly drift out of date. The usual causes — neglected maintenance, slow hosting, stale messaging, and design debt — are all preventable with the right system.',
    category: 'Opinion',
    contentType: 'opinion',
    publishedAt: '2026-07-28',
    readTime: '5 min',
    featured: true,
    author: {
      name: 'Trevor Lam',
      role: 'Founder, YDM Agency',
      bio: 'Trevor Lam leads YDM Agency with a focus on sustainable web development and marketing systems that compound over time.',
    },
    pullQuote: 'A website is not a project you finish. It is a system you maintain.',
    metaTitle: 'Why Most Small Business Websites Fail Within Two Years | YDM Agency',
    metaDescription:
      'Most small business websites launch with momentum, then quietly drift out of date. The usual causes are preventable with the right system.',
    sections: [
      {
        heading: 'The Launch Momentum Problem',
        body: `Every small business website launches the same way: momentum, excitement, a sense that this digital presence will finally solve the marketing problem. Then reality sets in. The content grows stale. The design shows its age. The performance slows. The drift begins.

This is not a failure of the initial build. It is a failure of the system that follows.`,
        type: 'narrative',
      },
      {
        heading: 'The Four Silent Killers',
        body: `Neglected Maintenance
WordPress updates, plugin conflicts, broken links — these compound over time. A site that was fast at launch becomes slow through neglect.

Slow Hosting
Shared hosting that was adequate for launch becomes inadequate as traffic grows. Performance degrades, rankings drop, the spiral continues.

Stale Messaging
Business evolves, but the website stays frozen. The value proposition that made sense at launch no longer matches what the business actually does.

Design Debt
Trend-driven choices age poorly. What looked modern in year one looks dated in year two. The design debt compounds with every patch and quick fix.`,
        type: 'analysis',
      },
      {
        heading: 'The System Solution',
        body: `The solution is not a better launch. The solution is a better system.

A maintenance schedule. A performance monitoring routine. A messaging refresh cadence. A design system that ages gracefully.

Most small businesses treat their website as a project to finish. The businesses that succeed treat it as a system to maintain.`,
        type: 'narrative',
      },
    ],
  },
  {
    slug: 'third-party-cookies-local-advertising',
    title: 'The End of Third-Party Cookies Changes Everything for Local Advertisers',
    summary:
      'Privacy-focused browsers and platform policy shifts are making third-party data harder to use. Local advertisers that build first-party data and contextual targeting now will outperform competitors still dependent on old tracking models.',
    category: 'News',
    contentType: 'news',
    publishedAt: '2026-07-21',
    readTime: '4 min',
    author: {
      name: 'Trevor Lam',
      role: 'Founder, YDM Agency',
    },
    metaTitle:
      'The End of Third-Party Cookies Changes Everything for Local Advertisers | YDM Agency',
    metaDescription:
      'Privacy-focused browsers and platform policy shifts are making third-party data harder to use. Local advertisers need first-party data strategies.',
    sections: [
      {
        heading: 'The Privacy Shift',
        body: `Safari blocks third-party cookies by default. Firefox is following suit. Chrome is deprecating them entirely. The tracking model that powered digital advertising for a decade is ending.

For local advertisers, this is not a minor inconvenience. It is a fundamental change in how advertising works.`,
        type: 'narrative',
      },
      {
        heading: 'The First-Party Data Opportunity',
        body: `The businesses that will win are the ones building first-party data now. Email lists. Customer relationships. Owned audiences. These are the assets that survive the privacy shift.

Contextual targeting is the other winner. Targeting based on what people are reading, not who they are tracked as being.`,
        type: 'analysis',
      },
    ],
  },
  {
    slug: 'ai-search-what-it-means-for-business',
    title: 'AI Search Is Here: What Actually Works for Your Business',
    summary:
      "Google's own guide is clear: the businesses that win in AI search are the ones with original, non-commodity content — not the ones chasing special markup or 'answer-engine' formatting.",
    category: 'Analysis',
    contentType: 'analysis',
    publishedAt: '2026-07-14',
    readTime: '6 min',
    author: {
      name: 'Trevor Lam',
      role: 'Founder, YDM Agency',
    },
    pullQuote:
      'The businesses that win in the answer economy are the ones with something worth answering from.',
    metaTitle: 'AI Search Is Here: What Actually Works for Your Business | YDM Agency',
    metaDescription:
      "Google's latest generative AI search guidance emphasizes unique, non-commodity content and debunks AEO myths like special markup and content chunking.",
    sections: [
      {
        heading: 'Search Is Becoming a Conversation',
        body: `Google is now answering questions directly. AI Overviews, AI Mode, and similar features pull from the existing search index, then synthesize an answer with links to the sources underneath. For businesses, the goal is not just to rank — it is to be worth citing.

This raises the bar for content. Generic explainers of familiar topics are easy to skip, because an AI can summarize them from hundreds of other pages. First-hand insight, original data, and a clear point of view are much harder to replace. The businesses that become sources are the ones that publish something genuinely useful, not the ones that add the most markup.`,
        type: 'narrative',
      },
      {
        heading: 'What Google Actually Recommends',
        body: `In its "Optimizing your website for generative AI features on Google Search" guide, updated in July 2026, Google distills the work into a few durable principles:

Valuable, non-commodity content. Write about what the business actually knows, from direct experience. Rehashed explainers that already exist elsewhere do not add anything new to the index.

A unique point of view. A distinct angle, methodology, or set of observations makes a page worth surfacing in an AI-generated answer.

Helpful, reliable, people-first organization. Structure pages for human readers first: clear headings, scannable sections, and direct answers to real questions. Search systems can understand nuance and context; they do not need content broken into tiny "AI-ready" fragments.

High-quality images and video. Relevant visuals, original photography, and concise video extend the same first-hand principle into other formats.

A sound technical base. Meet Google's technical requirements, follow crawling and JavaScript best practices, reduce duplicate content, and provide a good page experience. Semantic HTML should be written for human readability, not as code for machines.

Focus on user intent. Avoid over-optimizing for AI systems at the expense of the reader. The same signals that help traditional search also help generative AI features.`,
        type: 'analysis',
      },
      {
        heading: 'What You Can Ignore',
        body: `The same guide includes a "Mythbusting" section that lists tactics businesses do not need to chase:

LLMS.txt files and other "special" markup. No new machine-readable files or AI-specific schema are required for Google Search.

"Chunking" content. There is no need to break pages into tiny, single-idea fragments. Google can understand the nuance of multiple topics on a single page.

Rewriting content for AI systems. AI can understand synonyms and general meaning. There is no special phrasing or keyword pattern to adopt.

Inauthentic mentions. Attempts to appear in more AI-generated answers through fabricated or paid mentions are not a viable strategy.

Overfocusing on structured data. Structured data is still useful for standard rich results — reviews, events, products, FAQs — but it is not a generative AI ranking lever. Google explicitly lists overfocusing on structured data as a myth.`,
        type: 'analysis',
      },
      {
        heading: 'What to Do Next',
        body: `Start with a content audit, not a markup audit. Look for pages that state the obvious, repeat what competitors have already said, or answer common questions with no original angle. Consolidate or improve them. Then build pages that reflect real experience: how the business solves a specific problem, what the data shows, what the process actually looks like.

Use structured data where it earns a real rich result, but treat it as a formatting layer, not an AI-search shortcut. The businesses that win in the answer economy are the ones with something worth answering from.`,
        type: 'narrative',
      },
    ],
  },
];
