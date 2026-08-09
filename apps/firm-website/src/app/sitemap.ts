import type { MetadataRoute } from 'next';
import { SERVICES_CONFIG } from '@/lib/services-config';
import { INDUSTRIES_CONFIG } from '@/lib/industries-config';
import { EDUCATION_LESSONS, EDUCATION_TOPICS } from '@/lib/education-config';
import { LEARNING_PATHS } from '@/lib/education/learning-paths';
import { BLOG_POSTS } from '@/lib/blog-config';

const baseUrl = 'https://ydm-agency.com';

const serviceSlugs = Object.keys(SERVICES_CONFIG);

const industrySlugs = Object.keys(INDUSTRIES_CONFIG);

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

  // Deliverables spoke pages
  const deliverablesUrls: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}/deliverables`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // FAQ spoke pages
  const faqUrls: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}/faq`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Service comparison, pricing, and audit pages
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

  // Industry vertical pages
  const industryUrls: MetadataRoute.Sitemap = industrySlugs.map((slug) => ({
    url: `${baseUrl}/services/industries/${slug}`,
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

  // Learning path hub + detail pages
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
