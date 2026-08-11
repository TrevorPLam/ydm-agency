/**
 * FILE: opengraph-image.tsx
 * PURPOSE: Generates the root Open Graph image for the Next.js App Router.
 * ARCHITECTURE: ImageResponse route using next/og to render a 1200x630 PNG with the design-system color tokens.
 * KEY RULES: Keep the design minimal, match the dark brand background, and include the firm name and tagline.
 * DEPENDS ON: next/og (ImageResponse).
 * LAST UPDATED: 2026-08-10 T-074 add missing Next.js UI convention files
 */
import { ImageResponse } from 'next/og';

/**
 * WHY: 1200x630 is the recommended Open Graph image size.
 */
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export const alt = 'YDM Agency — Custom websites, marketing systems & business apps';

/**
 * WHAT IT DOES: Renders a generated PNG Open Graph image using the site design tokens.
 * @return {ImageResponse} - PNG image response
 * SIDE EFFECTS: None (pure rendering).
 * ASSUMES: next/og ImageResponse is available in the App Router.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0A0B',
          color: '#F5F5F6',
          padding: 64,
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            fontFamily: 'sans-serif',
            marginBottom: 24,
          }}
        >
          YDM Agency
        </div>
        <div
          style={{
            fontSize: 36,
            color: '#A1A1A9',
            fontFamily: 'sans-serif',
            textAlign: 'center',
            maxWidth: 900,
          }}
        >
          Custom websites, marketing systems & business apps
        </div>
        <div
          style={{
            width: 120,
            height: 6,
            backgroundColor: '#3B82F6',
            borderRadius: 3,
            marginTop: 48,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
