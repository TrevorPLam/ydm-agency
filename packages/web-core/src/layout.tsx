/**
 * FILE: layout.tsx
 * PURPOSE: Provide a reusable, accessible root layout shell for Next.js pages.
 * ARCHITECTURE: web-core React component, server-safe static html/body with a skip-to-content link.
 * KEY RULES: Defaults to lang='en'; className and skip link styles are optional and overridable.
 * DEPENDS ON: react
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import type { ReactNode } from 'react';

export interface RootLayoutProps {
  children: ReactNode;
  lang?: string;
  htmlClassName?: string;
  bodyClassName?: string;
  skipLinkClassName?: string;
}

/**
 * WHAT IT DOES: Renders the top-level html/body structure with a skip-to-content link.
 * @param {RootLayoutProps} props – children, language, and optional class names
 * @return {JSX.Element} – the rendered html/body shell
 * SIDE EFFECTS: None
 * ASSUMES: Rendered as the root layout of a Next.js page route.
 */
export function RootLayout({
  children,
  lang = 'en',
  htmlClassName,
  bodyClassName,
  skipLinkClassName,
}: RootLayoutProps) {
  return (
    <html lang={lang} className={htmlClassName}>
      <body className={bodyClassName}>
        <a
          href="#main-content"
          className={
            skipLinkClassName ??
            'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-surface focus:p-2 focus:text-text-primary focus:ring-2 focus:ring-accent focus:outline-none'
          }
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
