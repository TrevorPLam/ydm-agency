/**
 * FILE: meta.test.ts
 * PURPOSE: Verify createRootMetadata builds correct title, description, Open Graph, Twitter, and robots fields.
 * ARCHITECTURE: web-core unit tests using Vitest.
 * KEY RULES: Title and description must propagate to Open Graph and Twitter; canonical and noIndex must affect metadataBase, alternates, and robots.
 * DEPENDS ON: ./meta
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import { describe, it, expect } from 'vitest';
import { createRootMetadata } from './meta';

describe('createRootMetadata', () => {
  it('returns a metadata object with the provided title and description', () => {
    const meta = createRootMetadata({
      title: 'Home',
      description: 'A test page',
    });

    expect(meta.title).toBe('Home');
    expect(meta.description).toBe('A test page');
    expect(meta.openGraph).toMatchObject({ title: 'Home', description: 'A test page' });
    expect(meta.twitter).toMatchObject({ card: 'summary_large_image', title: 'Home' });
  });

  it('uses a canonical URL and noIndex settings', () => {
    const meta = createRootMetadata({
      title: 'Private',
      canonicalUrl: 'https://example.com/private',
      noIndex: true,
    });

    expect(meta.metadataBase?.toString()).toBe('https://example.com/private');
    expect(meta.robots).toMatchObject({ index: false, follow: false });
  });
});
