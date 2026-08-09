import type { EducationLesson } from './types';

export const SEO_LESSONS: EducationLesson[] = [
  {
    slug: 'google-search-console-performance-report',
    title: 'How to Read a Google Search Console Performance Report',
    summary:
      'Search Console is the most direct source of truth for how a site appears in Google. This guide explains the four core metrics — impressions, clicks, CTR, and average position — and how to turn them into action.',
    topic: 'SEO',
    level: 'Beginner',
    readTime: '8 min',
    attribution: 'Based on Google Search Console documentation',
    safety: 'public-domain',
    learningOutcome:
      "read a Search Console Performance report, spot the gap between visibility and clicks, and prioritize the pages worth fixing first.",
    metaTitle: 'How to Read a Google Search Console Performance Report | YDM Agency',
    metaDescription:
      'A beginner-friendly guide to Google Search Console metrics: impressions, clicks, CTR, and average position — and how to turn them into SEO action.',
    lastUpdated: '2024-01-15',
    sections: [
      {
        heading: 'What Search Console Measures',
        body: `Google Search Console is a free tool that shows how a site appears in Google Search. Unlike analytics platforms that track what happens after a visitor arrives, Search Console tracks what happens before the click: how often a page is shown, whether it is clicked, and where it ranks.

The Performance report is the most-used view. It answers the core question: is the site being seen, and is it being chosen?`,
      },
      {
        heading: 'The Four Core Metrics',
        body: `Impressions
An impression is counted whenever a page appears in a search result, even if the user does not scroll to it. High impressions mean the page is in Google's index and is being considered for relevant queries. Impressions alone do not measure traffic; they measure visibility.

Clicks
A click is counted when a user selects a search result and lands on the site. Clicks are the bridge between visibility and traffic. A page with high impressions but low clicks is being seen but not chosen.

CTR (Click-Through Rate)
CTR is the percentage of impressions that result in a click. It is calculated by dividing clicks by impressions. A high CTR usually means the title and description are relevant and compelling. A low CTR with high impressions often signals that the result does not match searcher intent or is being outranked by stronger results.

Average Position
This is the mean ranking position of the page across all queries. It is an average, so a single page can rank position 2 for one keyword and position 42 for another and show an average of 22. Use it as a directional signal, not an exact rank.`,
      },
      {
        heading: 'How to Filter and Compare',
        body: `The Performance report can be filtered by query, page, country, device, search appearance, and date. Each filter reveals a different story.

Start with queries. Look for terms with high impressions but low CTR. These are opportunities: the page is relevant, but the snippet is not winning the click. Rewriting the title tag or meta description can improve CTR without changing rankings.

Then look at pages. Sort by impressions to find the site's biggest visibility sources. Sort by clicks to find the biggest traffic sources. Pages with high impressions and low clicks are the fastest wins.

Use the compare mode to measure the impact of a change. Compare two date ranges before and after a content update or technical fix to see if clicks, impressions, or CTR moved.`,
      },
      {
        heading: 'Turning Data Into Action',
        body: `High impressions + low CTR = the page ranks but the snippet is weak. Improve the title and description.

Low impressions + high CTR = the snippet is effective but the page does not rank for many queries. Expand the content or build authority.

High impressions + high CTR = the page is working. Protect it and consider adjacent keywords.

Average position between 8 and 15 is a common opportunity zone. These pages are on the edge of page one. A content refresh, better internal linking, or stronger meta tags can push them into the top results and multiply traffic.

Set a regular rhythm: review the Performance report weekly, filter by page and query, and focus on the biggest gaps between visibility and clicks.`,
      },
      {
        heading: 'Common Mistakes to Avoid',
        body: `Do not treat average position as a single rank for a single keyword. It is an average.

Do not panic over short-term swings. Search Console data is delayed and can fluctuate day to day. Look at trends over weeks and months.

Do not ignore the query filter. The overall report blends every keyword. The real insight lives in the query and page combinations.

Do not confuse Search Console with Google Analytics. Search Console measures search appearance and clicks. Analytics measures on-site behavior. Both are needed for a complete picture.`,
      },
    ],
  },
  {
    slug: 'technical-seo-checklist-small-business',
    title: 'Technical SEO Checklist for Small Business Websites',
    summary:
      'Small sites often lose rankings to technical issues that are easy to fix. This checklist covers crawling, indexing, Core Web Vitals, structured data, and local SEO signals that matter most for smaller budgets.',
    topic: 'SEO',
    level: 'Intermediate',
    readTime: '12 min',
    attribution: 'Established SEO best practices',
    safety: 'public-domain',
    learningOutcome:
      'run a technical SEO pass on a small business site covering crawlability, Core Web Vitals, structured data, and local signals without hiring a developer.',
    metaTitle: 'Technical SEO Checklist for Small Business Websites | YDM Agency',
    metaDescription:
      'A practical technical SEO checklist for small business sites: crawling, indexing, Core Web Vitals, structured data, and local SEO signals.',
    lastUpdated: '2024-01-18',
    sections: [
      {
        heading: 'Crawling and Indexing',
        body: `Google must be able to crawl and index a page before it can rank. Start with the basics.

Check the robots.txt file. It should not block important pages or resources. It should block admin areas, staging environments, and low-value parameters.

Review the XML sitemap. It should list canonical, indexable pages and be submitted in Search Console. Remove redirects, 404s, and no-indexed pages.

Fix crawl errors. Use Search Console's Coverage report to find pages excluded from indexing. Common causes include noindex tags, canonical errors, 4xx/5xx status codes, and orphan pages.

Improve internal linking. Every important page should be reachable within a few clicks from the homepage. Use descriptive anchor text. Avoid navigation that depends on JavaScript without fallback links.`,
      },
      {
        heading: 'Core Web Vitals and Performance',
        body: `Core Web Vitals measure loading, interactivity, and visual stability. They affect user experience and rankings.

Largest Contentful Paint (LCP) should occur within 2.5 seconds of page load. Optimize images, use a fast host, and eliminate render-blocking resources.

First Input Delay (FID) measures interactivity. Reduce JavaScript execution time and break long tasks. In practice, this often means deferring non-critical scripts.

Cumulative Layout Shift (CLS) measures visual stability. Size images and embeds with explicit dimensions, and avoid injecting content above existing content as it loads.

Use PageSpeed Insights and Search Console's Core Web Vitals report to identify problem pages and measure improvements.`,
      },
      {
        heading: 'Structured Data',
        body: `Structured data helps search engines understand the content and can enable rich results. Small businesses should focus on the markup that directly applies.

LocalBusiness markup identifies the business name, address, phone, and service area. It supports local pack visibility and knowledge panels.

Organization markup is useful for brand searches and is often placed on the homepage.

BreadcrumbList markup improves breadcrumb display in search results.

FAQ and HowTo markup can expand search results, but use them only where the content genuinely qualifies. Misuse can lead to manual actions.

Validate all structured data with Google's Rich Results Test before publishing.`,
      },
      {
        heading: 'Local SEO Signals',
        body: `Small businesses with a physical location or service area must reinforce local signals.

Create or claim the Google Business Profile. Keep the name, address, phone, hours, and categories consistent with the website.

Use local schema markup with the same NAP (Name, Address, Phone) as the Google Business Profile.

Build location pages only when they make sense. A single page for every town without unique value can look thin. Better pages include specific service details, local context, and proof of work in that area.

Earn local citations and links from relevant directories, chambers of commerce, and community sites. Consistency across listings matters more than quantity.`,
      },
      {
        heading: 'On-Page Technical Basics',
        body: `Confirm every page has a unique, descriptive title tag and meta description. Duplicate or missing tags dilute relevance signals.

Use one H1 per page and a logical heading hierarchy below it. Headings should describe the content, not just look styled.

Add descriptive alt text to meaningful images. Decorative images can use empty alt attributes.

Set a canonical tag on every indexable page, even if it points to itself, to prevent duplicate-content confusion from URL parameters or tracking tags.

Confirm the site uses HTTPS sitewide and that HTTP requests redirect to HTTPS with a single 301, not a redirect chain.`,
      },
    ],
  },
];
