import type { MetadataRoute } from 'next';
import { EDUCATION_LESSONS, EDUCATION_TOPICS } from '@/lib/education-config';
import { BLOG_POSTS } from '@/lib/blog-config';

const baseUrl = 'https://ydm-agency.com';

const serviceSlugs = [
  'web-design',
  'seo',
  'maintenance',
  'analytics',
  'paid-ads',
  'branding',
  'content',
  'automation',
  'reputation',
];

// Helper function to normalize topic names for URL matching
function normalizeTopicName(topicName: string): string {
  return topicName.toLowerCase().replace(/\s+/g, '-');
}

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

  // Service spoke pages
  const serviceUrls: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Process spoke pages
  const processUrls: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}/process`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Blog post pages
  const blogUrls: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // Education topic pages
  const educationTopicUrls: MetadataRoute.Sitemap = EDUCATION_TOPICS.map((topic) => ({
    url: `${baseUrl}/education/${topic.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Education lesson pages (with new topic-based URL structure)
  const educationLessonUrls: MetadataRoute.Sitemap = EDUCATION_LESSONS.map((lesson) => ({
    url: `${baseUrl}/education/${normalizeTopicName(lesson.topic)}/${lesson.slug}`,
    lastModified: lesson.lastUpdated ? new Date(lesson.lastUpdated) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticUrls, ...serviceUrls, ...processUrls, ...blogUrls, ...educationTopicUrls, ...educationLessonUrls];
}
