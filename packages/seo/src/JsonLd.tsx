import React from 'react';

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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
