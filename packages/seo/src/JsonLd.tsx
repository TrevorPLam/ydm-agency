/**
 * FILE: JsonLd.tsx
 * PURPOSE: React components for generating JSON-LD structured data for SEO (Organization and Service schemas).
 * ARCHITECTURE: React components that generate schema.org JSON-LD scripts for search engine optimization and rich snippets.
 * KEY RULES: Must generate valid schema.org JSON; must use dangerouslySetInnerHTML correctly; must provide sensible defaults; must handle optional fields.
 * DEPENDS ON: react.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import React from 'react';

// WHY: Escape '<' so the JSON-LD string cannot prematurely close the script tag (XSS / HTML parser safety)
function serializeJsonLd(value: object): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export interface OrganizationJsonLdProps {
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
  contactPoint?: {
    email: string;
    contactType: string;
  };
}

/**
 * WHAT IT DOES: Generates JSON-LD structured data for Organization schema to improve search engine understanding.
 * @param {OrganizationJsonLdProps} props - Organization details including name, URL, logo, social links, and contact info
 * @return {JSX.Element} - JSON-LD script tag
 * SIDE EFFECTS: None (pure rendering component).
 * ASSUMES: Props are validated by caller; schema.org format is stable.
 */
export function OrganizationJsonLd({
  name,
  url,
  logo,
  sameAs = [],
  contactPoint,
}: OrganizationJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    ...(logo && { logo }),
    ...(sameAs.length > 0 && { sameAs }),
    ...(contactPoint && {
      contactPoint: {
        '@type': 'ContactPoint',
        email: contactPoint.email,
        contactType: contactPoint.contactType,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
}

export interface ServiceJsonLdProps {
  name: string;
  description: string;
  url: string;
  provider?: {
    name: string;
    url: string;
  };
}

/**
 * WHAT IT DOES: Generates JSON-LD structured data for Service schema to improve search engine understanding of service offerings.
 * @param {ServiceJsonLdProps} props - Service details including name, description, URL, and provider information
 * @return {JSX.Element} - JSON-LD script tag
 * SIDE EFFECTS: None (pure rendering component).
 * ASSUMES: Props are validated by caller; defaults to YDM Agency as provider if not specified.
 */
export function ServiceJsonLd({
  name,
  description,
  url,
  provider = { name: 'YDM Agency', url: 'https://ydm-agency.com' },
}: ServiceJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: provider.name,
      url: provider.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
}
