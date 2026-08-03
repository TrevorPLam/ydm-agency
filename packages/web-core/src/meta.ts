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
