/**
 * FILE: constructMetadata.ts
 * PURPOSE: Utility function for constructing Next.js metadata objects with OpenGraph, Twitter cards, and SEO optimization.
 * ARCHITECTURE: Pure function that generates Metadata objects with consistent defaults, environment-aware URLs, and conditional canonical support.
 * KEY RULES: Must provide sensible defaults; must support environment variable configuration; must handle canonical URLs correctly; must emit alternates.canonical when a canonical URL is supplied.
 * DEPENDS ON: next (Metadata type).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import type { Metadata } from 'next';

export interface MetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  canonicalUrl?: string;
  siteName?: string;
}

// WHY: Environment-aware default site URL with fallback to production URL
const DEFAULT_SITE_URL =
  typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : 'https://ydm-agency.com';

/**
 * WHAT IT DOES: Constructs a Next.js Metadata object with OpenGraph, Twitter cards, and SEO settings.
 * @param {MetadataOptions} options - Optional metadata overrides
 * @return {Metadata} - Complete Next.js metadata object
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: Environment variables are set for non-production environments; image paths are relative to public directory.
 */
export function constructMetadata({
  title = 'YDM Agency | Digital Growth & Native Web Applications',
  description = 'Data-driven marketing, ultra-fast web development, and client conversion systems for ambitious businesses.',
  image = '/og-image.svg',
  icons = '/favicon.svg',
  canonicalUrl,
  siteName = 'YDM Agency',
}: MetadataOptions = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@ydmagency',
    },
    icons,
    metadataBase: new URL(canonicalUrl ?? DEFAULT_SITE_URL),
    // WHY: Emit a canonical link only when an explicit canonical URL is supplied
    ...(canonicalUrl && {
      alternates: {
        canonical: canonicalUrl,
      },
    }),
  };
}
