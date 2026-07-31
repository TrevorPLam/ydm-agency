import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SECURITY_HEADERS: [string, string][] = [
  [
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' https://www.googletagmanager.com https://va.vercel-scripts.com; frame-src https://calendly.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'",
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
