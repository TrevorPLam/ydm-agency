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
