import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SECURITY_HEADERS: [string, string][] = [
  [
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://connect.facebook.net https://*.posthog.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://www.google.com https://*.google.com https://www.facebook.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.g.doubleclick.net https://www.google.com https://*.google.com https://*.posthog.com https://www.facebook.com https://graph.facebook.com; frame-src 'self' https://calendly.com; font-src 'self' https://fonts.gstatic.com data:; worker-src 'self' blob: data:",
  ],
  ['X-Frame-Options', 'DENY'],
  ['X-Content-Type-Options', 'nosniff'],
  ['Referrer-Policy', 'strict-origin-when-cross-origin'],
  ['Permissions-Policy', 'camera=(), microphone=(), geolocation=()'],
];

export function middleware(_req: NextRequest) {
  const response = NextResponse.next();

  SECURITY_HEADERS.forEach(([name, value]) => {
    response.headers.set(name, value);
  });

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|og-image.png).*)'],
};
