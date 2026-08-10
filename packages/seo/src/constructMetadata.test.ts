/**
 * FILE: constructMetadata.test.ts
 * PURPOSE: Unit tests for the constructMetadata helper.
 * ARCHITECTURE: packages/seo / Next.js Metadata construction.
 * KEY RULES: canonicalUrl drives both metadataBase and alternates.canonical; no canonicalUrl means no alternates.
 * DEPENDS ON: vitest and constructMetadata from ./constructMetadata.
 * LAST UPDATED: 2026-08-09
 */

import { describe, expect, it } from 'vitest';
import { constructMetadata } from './constructMetadata';

describe('constructMetadata', () => {
  it('returns the default site metadata when called with no options', () => {
    const meta = constructMetadata();

    expect(meta.title).toBe(
      'YDM Agency | Digital Growth & Native Web Applications',
    );
    expect(meta.description).toBe(
      'Data-driven marketing, ultra-fast web development, and client conversion systems for ambitious businesses.',
    );
    expect(meta.openGraph).toMatchObject({
      title: meta.title,
      description: meta.description,
      siteName: 'YDM Agency',
      images: [{ url: '/og-image.png' }],
    });
    expect(meta.twitter).toMatchObject({
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/og-image.png'],
      creator: '@ydmagency',
    });
    expect(meta.icons).toBe('/favicon.ico');
    expect(meta.metadataBase).toBeInstanceOf(URL);
    expect(meta.metadataBase?.protocol).toBe('https:');
    expect(meta.alternates).toBeUndefined();
    expect(meta.robots).toBeUndefined();
  });

  it('uses the provided canonical URL for metadataBase and alternates', () => {
    const canonical = 'https://ydm-agency.com/services/seo';
    const meta = constructMetadata({
      title: 'SEO Services | YDM Agency',
      canonicalUrl: canonical,
    });

    expect(meta.title).toBe('SEO Services | YDM Agency');
    expect(meta.metadataBase?.toString()).toBe(canonical);
    expect(meta.alternates).toEqual({ canonical });
  });

  it('does not emit alternates when canonicalUrl is omitted', () => {
    const meta = constructMetadata({
      title: 'Blog | YDM Agency',
    });

    expect(meta.alternates).toBeUndefined();
  });

  it('overrides image, icons, and siteName', () => {
    const meta = constructMetadata({
      title: 'Custom',
      image: '/custom-og.png',
      icons: '/custom-icon.ico',
      siteName: 'Custom Site',
    });

    expect(meta.openGraph?.images).toEqual([{ url: '/custom-og.png' }]);
    expect(meta.twitter?.images).toEqual(['/custom-og.png']);
    expect(meta.icons).toBe('/custom-icon.ico');
    expect(meta.openGraph?.siteName).toBe('Custom Site');
  });
});
