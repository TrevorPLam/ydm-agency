/**
 * FILE: FaqPageJsonLd.tsx
 * PURPOSE: React component for generating JSON-LD structured data for FAQPage schema to enable FAQ rich snippets in search results.
 * ARCHITECTURE: React component that maps FAQ items to schema.org FAQPage format and renders as JSON-LD script.
 * KEY RULES: Must generate valid schema.org FAQPage format; must handle question/answer pairs correctly; must use dangerouslySetInnerHTML correctly.
 * DEPENDS ON: react.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import React from 'react';

export interface FaqPageJsonLdItem {
  question: string;
  answer: string;
}

export interface FaqPageJsonLdProps {
  mainEntity: FaqPageJsonLdItem[];
}

/**
 * WHAT IT DOES: Generates JSON-LD structured data for FAQPage schema to enable FAQ rich snippets in search results.
 * @param {FaqPageJsonLdProps} props - Array of FAQ items with questions and answers
 * @return {JSX.Element} - JSON-LD script tag
 * SIDE EFFECTS: None (pure rendering component).
 * ASSUMES: FAQ items are validated by caller; schema.org FAQPage format is stable.
 */
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
