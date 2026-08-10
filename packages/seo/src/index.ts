/**
 * FILE: index.ts
 * PURPOSE: Public API exports for the SEO package, including metadata construction and JSON-LD structured data components.
 * ARCHITECTURE: Barrel file that re-exports metadata utilities and JSON-LD components for search engine optimization.
 * KEY RULES: Maintain backward compatibility; export all public types and components; ensure consistent API surface.
 * DEPENDS ON: ./constructMetadata, ./JsonLd, ./FaqPageJsonLd.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
export { constructMetadata, type MetadataOptions } from './constructMetadata';
export {
  OrganizationJsonLd,
  type OrganizationJsonLdProps,
  ServiceJsonLd,
  type ServiceJsonLdProps,
} from './JsonLd';
export { FaqPageJsonLd, type FaqPageJsonLdProps, type FaqPageJsonLdItem } from './FaqPageJsonLd';
