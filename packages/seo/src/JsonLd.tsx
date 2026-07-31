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
