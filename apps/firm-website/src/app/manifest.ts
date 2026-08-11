/**
 * FILE: manifest.ts
 * PURPOSE: Generates the web app manifest for the Next.js App Router.
 * ARCHITECTURE: Metadata route that returns a Manifest object; uses the design-system color tokens.
 * KEY RULES: Provide a valid web manifest with name, short_name, start_url, display, and theme/background colors; reference the existing favicon.
 * DEPENDS ON: next (MetadataRoute).
 * LAST UPDATED: 2026-08-10 T-074 add missing Next.js UI convention files
 */
import type { MetadataRoute } from 'next';

/**
 * WHAT IT DOES: Returns the web app manifest for the site.
 * @return {MetadataRoute.Manifest} - Web manifest object
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: /favicon.svg exists in the public directory.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'YDM Agency',
    short_name: 'YDM Agency',
    description: 'Custom websites, search visibility, and marketing systems for ambitious businesses.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0B',
    theme_color: '#3B82F6',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
