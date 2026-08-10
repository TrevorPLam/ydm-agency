/**
 * FILE: conversion-lessons.ts
 * PURPOSE: Provides the original CONVERSION_LESSONS array of EducationLesson objects for the Conversion topic in the /education section.
 * ARCHITECTURE: Static typed data module exporting an EducationLesson array; aggregated into EDUCATION_LESSONS by education-config.
 * KEY RULES: Each lesson must conform to the EducationLesson interface; slugs must be unique; topic must be 'Conversion'; attribution and safety fields must be set per the content sourcing policy.
 * DEPENDS ON: ./types (EducationLesson).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import type { EducationLesson } from './types';

export const CONVERSION_LESSONS: EducationLesson[] = [
  {
    slug: 'conversion-rate-optimization-guide',
    title: "A Beginner's Guide to Conversion Rate Optimization",
    summary:
      'Traffic without conversions is expensive noise. This lesson covers the fundamentals of conversion rate optimization: measurement, landing-page structure, friction reduction, and testing discipline for small business sites.',
    topic: 'Conversion',
    level: 'Beginner',
    readTime: '10 min',
    attribution: 'Established industry practices',
    safety: 'public-domain',
    learningOutcome:
      'calculate a baseline conversion rate, diagnose the biggest sources of friction on a page, and run a disciplined test to improve it.',
    metaTitle: "A Beginner's Guide to Conversion Rate Optimization | YDM Agency",
    metaDescription:
      'Learn the fundamentals of conversion rate optimization: measurement, landing page structure, friction reduction, and testing discipline for small businesses.',
    lastUpdated: '2024-01-20',
    sections: [
      {
        heading: 'What CRO Is and Why It Matters',
        body: `Conversion rate optimization is the practice of increasing the percentage of visitors who take a desired action. That action might be a purchase, a form submission, a phone call, a newsletter sign-up, or any other business goal.

A site that attracts 1,000 visitors and converts 1% earns 10 conversions. A site that converts 3% earns 30 conversions from the same traffic. CRO makes existing traffic more valuable, which is usually cheaper than buying more traffic.`,
      },
      {
        heading: 'Measurement: Establish the Baseline',
        body: `Before changing anything, define the conversion rate. Choose one primary conversion per page or campaign. Then calculate:

Conversion rate = conversions / visitors

Track this over a meaningful window. A few days of data is not enough. Use at least a few weeks, or until the sample size is statistically useful.

Also track the conversion value. Not every conversion is equal. A lead form may be worth more than an email sign-up. Weight the numbers by business value when deciding where to focus.`,
      },
      {
        heading: 'Landing Page Structure',
        body: `A strong landing page has a clear promise, a single primary action, and enough proof to support the promise.

The headline should match the source that brought the visitor. If an ad promises a free project outline, the landing page headline should say the same. Mismatches kill conversion.

The primary call to action should be above the fold and repeated throughout the page for long-form content. Buttons should be specific: "Get a Free Project Outline" converts better than "Submit."

Proof can include client results, process clarity, guarantees, or social proof. YDM Agency does not use testimonials at launch, so process transparency and clear outcomes become the trust signals.`,
      },
      {
        heading: 'Friction Reduction',
        body: `Friction is anything that makes the next step harder. Common sources include long forms, unnecessary fields, slow load times, unclear next steps, and distracting navigation.

Audit each form. Remove fields that are not required. Use progress indicators for multi-step forms. Pre-fill information when possible.

Check mobile experience. Most small business traffic is mobile. Buttons should be easy to tap, text should be readable without zooming, and forms should not require excessive scrolling.

Reduce cognitive load. Too many choices, too much text, or too many competing actions dilute attention. Each page should guide the visitor toward one clear decision.`,
      },
      {
        heading: 'Testing Discipline',
        body: `CRO without testing is guesswork. The two most common approaches are A/B testing and before-and-after analysis.

A/B testing shows two versions of a page to different visitor segments and measures which converts better. It requires enough traffic to reach significance. Small sites may not have the volume for reliable A/B tests.

Before-and-after analysis compares conversion rate before and after a change. Control for external factors like seasonality, ad spend, and traffic source mix. A single change at a time makes the result easier to interpret.

Document every test, hypothesis, result, and decision. Over time this becomes a conversion playbook for the business.`,
      },
      {
        heading: 'Quick Wins for Small Business Sites',
        body: `Start with the highest-traffic pages. Improving a page that receives 50% of traffic has more impact than improving a page that receives 1%.

Fix the biggest leaks first. A broken form, a missing call to action, or a slow mobile page can destroy conversion with a single fix.

Match messaging to intent. Use the words visitors used to find the page. Search Console and ad keywords are good sources for this language.

Test one change at a time and measure for at least two weeks. Patience and discipline convert more visitors than random redesigns.`,
      },
    ],
  },
];
