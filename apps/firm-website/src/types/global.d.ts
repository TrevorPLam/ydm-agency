/**
 * FILE: global.d.ts
 * PURPOSE: Ambient type declarations for non-TypeScript assets imported by the firm-website app.
 * ARCHITECTURE: Global .d.ts file recognized by the app tsconfig; declares side-effect style imports for global CSS files.
 * KEY RULES: Keep declarations aligned with Next.js bundler support; do not export runtime values.
 * DEPENDS ON: TypeScript module declaration semantics.
 * LAST UPDATED: 2026-08-09 Add CSS side-effect import declaration
 */

declare module '*.css' {
  const content: string;
  export default content;
}
