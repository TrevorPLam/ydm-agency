import React from 'react';

export interface FaqPageJsonLdItem {
  question: string;
  answer: string;
}

export interface FaqPageJsonLdProps {
  mainEntity: FaqPageJsonLdItem[];
}

export function FaqPageJsonLd({ mainEntity }: FaqPageJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: mainEntity.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
