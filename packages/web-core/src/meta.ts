/**
 * FILE: meta.ts
 * PURPOSE: Build Next.js Metadata objects with title, Open Graph, Twitter, icons, canonical, and noIndex support.
 * ARCHITECTURE: web-core SEO helper, assembles a Metadata object from a single config.
 * KEY RULES: noIndex disables robots; canonicalUrl drives metadataBase and alternates; image/icons use sensible defaults.
 * DEPENDS ON: next (Metadata type only)
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import type { Metadata } from 'next';

export interface MetadataConfig {
  title: string;
  description?: string;
  siteName?: string;
  image?: string;
  icons?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

/**
 * WHAT IT DOES: Creates a Next.js Metadata object from a high-level configuration.
 * @param {MetadataConfig} config – page metadata configuration including title, description, and optional fields
 * @return {Metadata} – a fully populated Next.js Metadata object
 * SIDE EFFECTS: None
 * ASSUMES: canonicalUrl, when provided, is a valid absolute URL.
 */
export function createRootMetadata({
  title,
  description = '',
  siteName = title,
  image = '/og-image.png',
  icons = '/favicon.ico',
  canonicalUrl,
  noIndex = false,
}: MetadataConfig): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    icons,
    metadataBase: canonicalUrl ? new URL(canonicalUrl) : undefined,
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
