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

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Allowed root domains
  const rootDomains = ['ydm-agency.com', 'localhost:3000', '127.0.0.1:3000'];

  // Extract subdomain if present
  let currentHost = hostname;
  if (process.env.NODE_ENV === 'production') {
    currentHost = hostname.replace(`.ydm-agency.com`, '');
  } else {
    currentHost = hostname.replace(`.localhost:3000`, '');
  }

  const isSubdomain =
    !rootDomains.includes(hostname) &&
    currentHost !== hostname &&
    currentHost !== 'www';

  let response: NextResponse;

  if (isSubdomain) {
    // Rewrite request to dynamic demo page route /demos/[subdomain]
    response = NextResponse.rewrite(new URL(`/demos/${currentHost}${url.pathname}`, req.url));
  } else {
    response = NextResponse.next();
  }

  // Apply security headers
  SECURITY_HEADERS.forEach(([name, value]) => {
    response.headers.set(name, value);
  });

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|og-image.png).*)'],
};
