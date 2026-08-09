import type { EducationLesson } from './types';

export const FOUNDATIONS_LESSONS: EducationLesson[] = [
  {
    slug: 'public-domain-marketing-ux-principles',
    title: 'Public Domain Marketing & UX Principles',
    summary:
      "A guide to foundational principles that can be taught freely: Hick's Law, Fitts's Law, Gestalt principles, the inverted pyramid, F-pattern and Z-pattern reading, the 5-second test, FAB, the SUCCESs model, and Lauterborn's 4Cs.",
    topic: 'Foundations',
    level: 'Beginner',
    readTime: '10 min',
    attribution: 'Public domain concepts — originators noted for credibility',
    safety: 'public-domain',
    learningOutcome:
      'name and correctly attribute the most useful public-domain UX and copywriting principles, and apply at least one to a real design or copy decision.',
    metaTitle: 'Public Domain Marketing & UX Principles | YDM Agency',
    metaDescription:
      'A guide to public-domain marketing and UX principles that can be taught freely, with origins and practical application notes.',
    lastUpdated: '2024-01-22',
    sections: [
      {
        heading: 'What Public Domain Means for Marketers',
        body: `Public-domain concepts are ideas that no single person or company owns. They come from academic research, journalism, sales training, or common observation. Marketers can explain and apply them freely without asking permission or paying licensing fees.

That freedom comes with a responsibility: be accurate, name the originator when known, and add original value. Passing off a century-old principle as a proprietary invention damages credibility. Treating a public-domain idea as a generic platitude wastes the reader's time.

This lesson covers the most useful public-domain principles for web design, copywriting, and marketing strategy.`,
      },
      {
        heading: 'The Public Domain Frameworks',
        body: `Hick's Law
Named after psychologist William Edmund Hick, this principle says that decision time grows as the number of choices grows. Use it to simplify navigation, pricing tiers, and form fields.

Fitts's Law
Named after psychologist Paul Fitts, this principle describes how the time to reach a target depends on its size and distance. Larger, closer buttons and links convert better.

Gestalt Principles
Originating in early 20th-century psychology through the work of Max Wertheimer, Kurt Koffka, and Wolfgang Köhler, these principles explain how people perceive groups and patterns. Proximity, similarity, and continuity shape how users scan a page.

Inverted Pyramid
This journalistic convention places the most important information first and adds detail below. It works for web copy because readers often scan and leave quickly.

F-Pattern and Z-Pattern
These patterns come from published eye-tracking studies, especially from the Nielsen Norman Group. The F-pattern shows how readers scan text-heavy pages; the Z-pattern describes how eyes move across simpler, visually driven layouts.

Cialdini's 7 Principles
Robert Cialdini's academic and popular work covers reciprocity, commitment, social proof, authority, liking, scarcity, and unity. Cialdini teaches these openly. Name him and avoid claiming the model as your own.

The 5-Second Test / Clarity Principle
This generic UX method tests whether a page communicates its purpose within five seconds. It is a quick way to find clarity problems.

FAB (Features, Advantages, Benefits)
This classic sales-training concept turns product details into customer outcomes. It is so widely taught that the original source is untraceable.

SUCCESs Model
From Chip and Dan Heath's book Made to Stick, this model describes ideas that are Simple, Unexpected, Concrete, Credible, Emotional, and Stories. Cite the book when using it.

Lauterborn's 4Cs
Robert Lauterborn published the 4Cs (Consumer, Cost, Convenience, Communication) in 1990 as a customer-centered alternative to the 4Ps. Citing the original article or author is good practice.`,
      },
      {
        heading: 'How to Apply These Principles',
        body: `Use these principles to explain design and copy decisions, not to decorate slides. A marketer should be able to connect a choice to a problem the principle solves.

For example, when reducing a form from ten fields to four, cite Hick's Law. When moving a call-to-action button closer to the preceding paragraph, cite Fitts's Law. When rewriting a headline to lead with the customer benefit, mention the inverted pyramid.

Always add a specific example. Generic definitions can be found anywhere. The value is in showing how the principle applies to a real business or page.`,
      },
      {
        heading: 'Attribution Best Practices',
        body: `Name the originator when one is known. "Hick's Law, named after psychologist William Edmund Hick" is enough to show awareness.

Link to a primary source when possible. For Cialdini, that might be his book or academic profile. For the SUCCESs Model, link to the book or the authors' site.

Add your own commentary. Summarize the principle, then explain when to use it, when to ignore it, and how it interacts with other principles. Original analysis turns a definition into a useful resource.

Do not invent sources. If the origin is unclear, say so. Do not claim public-domain principles as proprietary methods.`,
      },
      {
        heading: 'What to Avoid',
        body: `Avoid copying descriptions word for word from another site, even for public-domain ideas. Paraphrase and add value.

Avoid presenting a well-known principle as a secret framework. Audiences recognize generic advice dressed up as proprietary IP.

Avoid over-relying on jargon. The goal is to make the concept useful, not to impress the reader with terminology.

Avoid mixing principles carelessly. Hick's Law and Fitts's Law are related but not interchangeable. Use each principle for the problem it actually solves.`,
      },
    ],
  },
];
