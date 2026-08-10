/**
 * FILE: robots.ts
 * PURPOSE: Provides the Next.js robots.txt route handler that defines crawler rules and the sitemap location.
 * ARCHITECTURE: Next.js MetadataRoute.Robots route exporting a default function returning the robots configuration.
 * KEY RULES: Must allow all user agents on '/' and disallow '/api/'; must point to the production sitemap URL.
 * DEPENDS ON: next (MetadataRoute type).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import type { MetadataRoute } from 'next';

/**
 * WHAT IT DOES: Returns the robots.txt configuration allowing all crawlers on '/' and disallowing '/api/', with a reference to the production sitemap.
 * @return {MetadataRoute.Robots} - Robots configuration object
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: The production domain is https://ydm-agency.com.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://ydm-agency.com/sitemap.xml',
  };
}
