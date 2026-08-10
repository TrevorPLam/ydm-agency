/**
 * FILE: compliance-lessons.ts
 * PURPOSE: Provides the original COMPLIANCE_LESSONS array of EducationLesson objects for the Compliance topic in the /education section.
 * ARCHITECTURE: Static typed data module exporting an EducationLesson array; aggregated into EDUCATION_LESSONS by education-config.
 * KEY RULES: Each lesson must conform to the EducationLesson interface; slugs must be unique; topic must be 'Compliance'; attribution and safety fields must be set per the content sourcing policy.
 * DEPENDS ON: ./types (EducationLesson).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import type { EducationLesson } from './types';

export const COMPLIANCE_LESSONS: EducationLesson[] = [
  {
    slug: 'proprietary-frameworks-safe-sharing',
    title: 'Proprietary Frameworks: How to Share Safely',
    summary:
      "A guide to handling frameworks that are core IP for training companies: SOSTAC®, Widerfunnel's LIFT Model, MECLABS conversion heuristic, and DigitalMarketer's Customer Value Journey. Includes trademark symbols, source links, and fair-use boundaries.",
    topic: 'Compliance',
    level: 'Advanced',
    readTime: '10 min',
    attribution: 'Trademark and copyright awareness required',
    safety: 'extra-care',
    learningOutcome:
      'discuss proprietary marketing frameworks in educational content while staying inside fair-use and trademark boundaries.',
    metaTitle: 'Proprietary Frameworks: How to Share Safely | YDM Agency',
    metaDescription:
      'A guide to safely sharing proprietary marketing frameworks, including trademark notices, source links, and fair-use boundaries.',
    lastUpdated: '2024-01-28',
    sections: [
      {
        heading: 'What Makes a Framework Proprietary',
        body: `Proprietary frameworks are core intellectual property for consulting or training companies. They may be trademarked, copyrighted, or closely tied to paid courses, certifications, and licensing. Sharing them without care can lead to takedown requests, legal issues, or reputational damage.

That does not mean they cannot be discussed. Educational commentary, teaching, and critique are generally protected under fair-use principles in the United States and fair-dealing principles in other jurisdictions. The key is to avoid implying endorsement, reselling materials, or copying proprietary training assets.

This lesson covers four common proprietary frameworks and how to discuss them safely.`,
      },
      {
        heading: 'The Proprietary Frameworks',
        body: `SOSTAC®
SOSTAC® is a registered trademark of PR Smith. The name stands for Situation, Objectives, Strategy, Tactics, Action, and Control. Use the ® symbol on first mention and include a notice such as "SOSTAC® is a registered trademark of PR Smith." Smith provides free planning templates on his site and often allows educational use with proper attribution, but check the official guidelines before publishing.

LIFT Model
Owned by Widerfunnel, a conversion optimization agency. The model identifies six factors that affect conversion: Value Proposition, Clarity, Relevance, Distraction, Urgency, and Anxiety. Widerfunnel has published extensively about it. Present it as "Widerfunnel's LIFT Model" and do not claim to offer LIFT certification.

MECLABS Conversion Heuristic
Created by the MECLABS Institute, parent of MarketingExperiments. The formula (C = 4m + 3v + 2(i-f) - a) is part of their published research and courses. Clearly credit MECLABS and link to meclabs.com. Do not present the formula as a proprietary method of the publisher.

Customer Value Journey
Associated with DigitalMarketer. The eight-stage journey is a central part of DigitalMarketer's paid training. High-level overviews have been published, but detailed diagrams and certification materials are protected. Stick to high-level explanation and cite DigitalMarketer. Avoid selling it as a Customer Value Journey masterclass.`,
      },
      {
        heading: 'Trademark Symbols and Legal Notices',
        body: `For registered trademarks, use the ® symbol on first use in the article. After the first mention, the regular name is usually sufficient.

For unregistered but proprietary names, a courtesy notice helps. "LIFT Model is a proprietary framework of Widerfunnel" is a safe opening line.

Do not alter the spelling or add generic markers that could confuse ownership. SOSTAC® should not become "SOSTAC method" without the mark unless the source does so.

Place the legal notice near the first mention, not hidden in a footer. Visible attribution reduces risk and shows respect for the creator's IP.`,
      },
      {
        heading: 'Fair Use Boundaries',
        body: `Fair use protects commentary, criticism, teaching, scholarship, and research. For a marketing article, this means explaining the framework, adding original analysis, and using the framework as a reference point.

What crosses the line:

Reproducing a proprietary diagram, workbook, or slide deck in full.
Selling a course or template that copies the framework's structure.
Implying the publisher is certified, endorsed, or affiliated with the framework owner.
Using the framework name in ads in a way that suggests official approval.

What stays safe:

A high-level summary in your own words.
A link to the framework owner's official site.
Original examples or critiques.
A clear statement that the framework belongs to the owner.`,
      },
      {
        heading: 'When to Ask Permission',
        body: `If the planned use goes beyond a short educational explanation, permission is the safest path. This includes creating videos, downloadable templates, or paid training based on the framework.

Smaller framework owners are often responsive to a short, polite email. PR Smith, for example, has been described as approachable for courtesy requests. A brief note explaining the planned article and how attribution will be handled can turn a gray area into a clear green light.

Keep records of any permissions. A saved email or written agreement is valuable if a dispute ever arises.`,
      },
      {
        heading: 'Safe Sharing Checklist',
        body: `Before publishing a page about a proprietary framework, run through this list:

Name the owner in the first mention.
Use trademark symbols where required.
Link to the primary source.
Explain the framework in your own words.
Add original commentary, examples, or comparisons.
Do not reproduce protected diagrams or training materials.
Do not claim certification or endorsement.
Do not resell the framework as a course or template.
When in doubt, ask for permission.

Following these rules keeps educational content on the right side of trademark and copyright law while still providing value to readers.`,
      },
    ],
  },
];
