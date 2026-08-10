/**
 * FILE: sitemap.ts
 * PURPOSE: Provides the Next.js sitemap route handler that aggregates all public URLs (static pages, service spokes, industries, blog, education topics/lessons, and learning paths) into a single sitemap.
 * ARCHITECTURE: Next.js MetadataRoute.Sitemap route exporting a default function that builds the URL list from config modules (services, industries, education, blog, learning paths) and merges static and dynamic URLs.
 * KEY RULES: Must include all indexable public routes; must use the production base URL; must set appropriate changeFrequency and priority per route type; must normalize education topic names to URL slugs.
 * DEPENDS ON: next (MetadataRoute), @/lib/services-config, @/lib/industries-config, @/lib/education-config, @/lib/education/learning-paths, @/lib/blog-config.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import type { MetadataRoute } from 'next';
import { SERVICES_CONFIG } from '@/lib/services-config';
import { INDUSTRIES_CONFIG } from '@/lib/industries-config';
import { EDUCATION_LESSONS, EDUCATION_TOPICS } from '@/lib/education-config';
import { LEARNING_PATHS } from '@/lib/education/learning-paths';
import { BLOG_POSTS } from '@/lib/blog-config';

const baseUrl = 'https://ydm-agency.com';

const serviceSlugs = Object.keys(SERVICES_CONFIG);

const industrySlugs = Object.keys(INDUSTRIES_CONFIG);

/**
 * WHAT IT DOES: Normalizes an education topic name (e.g., "SEO") into a URL-safe slug (e.g., "seo") by lowercasing and replacing whitespace with hyphens.
 * @param {string} topicName - Display topic name to normalize
 * @return {string} - URL-safe topic slug
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: topic names map deterministically to slugs via lowercasing and hyphenation.
 */
function normalizeTopicName(topicName: string): string {
  return topicName.toLowerCase().replace(/\s+/g, '-');
}

/**
 * WHAT IT DOES: Builds and returns the complete sitemap by merging static URLs with dynamically generated URLs for service spokes, process/deliverables/FAQ spokes, comparison/pricing/industries/audit pages, industry pages, blog posts, education topics and lessons, and learning paths.
 * @return {MetadataRoute.Sitemap} - Array of sitemap URL entries
 * SIDE EFFECTS: None (pure function; reads config modules at build/render time).
 * ASSUMES: All referenced config modules export the expected slug-keyed records or arrays.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/process`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/education`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const serviceUrls: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const processUrls: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}/process`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const deliverablesUrls: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}/deliverables`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const faqUrls: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}/faq`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const comparisonUrls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/services/compare`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/industries`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/audit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const industryUrls: MetadataRoute.Sitemap = industrySlugs.map((slug) => ({
    url: `${baseUrl}/services/industries/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const blogUrls: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const educationTopicUrls: MetadataRoute.Sitemap = EDUCATION_TOPICS.map((topic) => ({
    url: `${baseUrl}/education/${topic.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const educationLessonUrls: MetadataRoute.Sitemap = EDUCATION_LESSONS.map((lesson) => ({
    url: `${baseUrl}/education/${normalizeTopicName(lesson.topic)}/${lesson.slug}`,
    lastModified: lesson.lastUpdated ? new Date(lesson.lastUpdated) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const learningPathUrls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/education/paths`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    ...LEARNING_PATHS.map((path) => ({
      url: `${baseUrl}/education/paths/${path.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  return [
    ...staticUrls,
    ...serviceUrls,
    ...processUrls,
    ...deliverablesUrls,
    ...faqUrls,
    ...comparisonUrls,
    ...industryUrls,
    ...blogUrls,
    ...educationTopicUrls,
    ...educationLessonUrls,
    ...learningPathUrls,
  ];
}
