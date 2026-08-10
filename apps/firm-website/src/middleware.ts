/**
 * FILE: middleware.ts
 * PURPOSE: Next.js middleware that applies security headers to all HTTP responses for XSS protection, clickjacking prevention, and content security.
 * ARCHITECTURE: Middleware function that runs before route handlers, applying a comprehensive set of security headers to all responses except static assets.
 * KEY RULES: CSP must allow analytics providers when consent is granted; frame-src must allow Calendly; permissions policy must block sensitive device access; headers must not break legitimate functionality.
 * DEPENDS ON: next/server (NextResponse, NextRequest).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// WHY: Comprehensive CSP to allow analytics providers (GA4, PostHog, Meta Pixel) and Calendly while maintaining security
const SECURITY_HEADERS: [string, string][] = [
  [
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://connect.facebook.net https://*.posthog.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://www.google.com https://*.google.com https://www.facebook.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.g.doubleclick.net https://www.google.com https://*.google.com https://*.posthog.com https://www.facebook.com https://graph.facebook.com; frame-src 'self' https://calendly.com; font-src 'self' https://fonts.gstatic.com data:; worker-src 'self' blob: data:",
  ],
  // WHY: Prevent clickjacking attacks by denying iframe embedding
  ['X-Frame-Options', 'DENY'],
  // WHY: Prevent MIME type sniffing to avoid XSS attacks
  ['X-Content-Type-Options', 'nosniff'],
  // WHY: Control referrer information for privacy and security
  ['Referrer-Policy', 'strict-origin-when-cross-origin'],
  // WHY: Block access to sensitive device features (camera, microphone, geolocation)
  ['Permissions-Policy', 'camera=(), microphone=(), geolocation=()'],
];

/**
 * WHAT IT DOES: Applies security headers to all HTTP responses for comprehensive protection against web vulnerabilities.
 * @param {NextRequest} _req - Incoming request (unused but required by middleware signature)
 * @return {NextResponse} - Response with security headers applied
 * SIDE EFFECTS: Sets security headers on the response object.
 * ASSUMES: Runs in Next.js middleware context; CSP directives are compatible with application's third-party integrations.
 */
export function middleware(_req: NextRequest) {
  const response = NextResponse.next();

  SECURITY_HEADERS.forEach(([name, value]) => {
    response.headers.set(name, value);
  });

  return response;
}

// WHY: Matcher excludes API routes, static files, images, favicon, and OG image from middleware processing
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|og-image.png).*)'],
};
