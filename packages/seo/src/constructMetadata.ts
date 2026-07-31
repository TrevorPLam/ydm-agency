import type { Metadata } from 'next';

export interface MetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
  siteName?: string;
}

export function constructMetadata({
  title = 'YDM Agency | Digital Growth & Native Web Applications',
  description = 'Data-driven marketing, ultra-fast web development, and client conversion systems for ambitious businesses.',
  image = '/og-image.png',
  icons = '/favicon.ico',
  noIndex = false,
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
    metadataBase: canonicalUrl ? new URL(canonicalUrl) : undefined,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
