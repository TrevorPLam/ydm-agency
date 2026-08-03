import type { ReactNode } from 'react';

export interface RootLayoutProps {
  children: ReactNode;
  lang?: string;
  htmlClassName?: string;
  bodyClassName?: string;
  skipLinkClassName?: string;
}

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
