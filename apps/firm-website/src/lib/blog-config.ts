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
    metaDescription: 'Most small business websites launch with momentum, then quietly drift out of date. The usual causes are preventable with the right system.',
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
    metaTitle: 'The End of Third-Party Cookies Changes Everything for Local Advertisers | YDM Agency',
    metaDescription: 'Privacy-focused browsers and platform policy shifts are making third-party data harder to use. Local advertisers need first-party data strategies.',
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
    title: 'AI Search Is Here: What It Means for Your Business',
    summary:
      'Generative search answers are rewriting how customers find products and services. Businesses that structure content for direct answers, entity clarity, and structured data will hold the advantage as search behavior shifts.',
    category: 'News',
    contentType: 'analysis',
    publishedAt: '2026-07-14',
    readTime: '6 min',
    author: {
      name: 'Trevor Lam',
      role: 'Founder, YDM Agency',
    },
    metaTitle: 'AI Search Is Here: What It Means for Your Business | YDM Agency',
    metaDescription: 'Generative search answers are rewriting how customers find products and services. Structure content for direct answers and entity clarity.',
    sections: [
      {
        heading: 'The Answer Economy',
        body: `Google is now answering questions directly. The ten blue links are becoming optional. For businesses, this means the goal is not just to rank — it is to be the source of the answer.

This changes everything about content strategy.`,
        type: 'narrative',
      },
      {
        heading: 'The Structured Data Imperative',
        body: `Businesses that structure their content with schema markup, clear entity relationships, and answer-focused formatting will be the ones AI search pulls from.

The businesses that continue publishing generic blog posts without structure will find themselves invisible in the answer economy.`,
        type: 'analysis',
      },
    ],
  },
];
