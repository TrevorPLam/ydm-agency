/**
 * FILE: helpers.ts
 * PURPOSE: FAQ utility functions
 */
import { SERVICES_CONFIG } from '../services-config';
import {
  THEME_KEYWORDS,
  THEME_ORDER,
  CONTEXT_KEYWORDS,
  SERVICE_ANSWERS,
  type FaqItem,
  type FaqGroup,
  type AnswerEngineAnswers,
} from './data';

/**
 * WHAT IT DOES: Classifies a single FAQ into a theme by matching its question against keyword lists, defaulting to 'General' when no keyword matches.
 * @param {FaqItem} faq - FAQ item with a question and answer
 * @return {string} - Matching theme name, or 'General' if no keywords match
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: THEME_KEYWORDS maps theme names to lowercase keyword arrays.
 */
function classifyFaq(faq: FaqItem): string {
  const q = faq.q.toLowerCase();
  for (const [theme, keywords] of Object.entries(THEME_KEYWORDS)) {
    if (keywords.some((kw) => q.includes(kw))) {
      return theme;
    }
  }
  return 'General';
}

/**
 * WHAT IT DOES: Groups an array of FAQ items into themed FaqGroup objects, ordered by THEME_ORDER and omitting empty themes.
 * @param {FaqItem[]} faqs - Flat list of FAQ items to group
 * @return {FaqGroup[]} - Ordered list of non-empty themed FAQ groups
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: classifyFaq returns a theme present in THEME_ORDER or 'General'.
 */
export function groupServiceFaqs(faqs: FaqItem[]): FaqGroup[] {
  const map = new Map<string, FaqItem[]>();
  for (const faq of faqs) {
    const theme = classifyFaq(faq);
    const items = map.get(theme) ?? [];
    items.push(faq);
    map.set(theme, items);
  }

  return THEME_ORDER.filter((theme) => map.has(theme)).map((theme) => ({
    theme,
    items: map.get(theme)!,
  }));
}

/**
 * WHAT IT DOES: Escapes regular expression metacharacters in a string so it can be safely embedded in a RegExp pattern.
 * @param {string} value - Raw string to escape
 * @return {string} - Escaped string safe for RegExp embedding
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: None.
 */
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * WHAT IT DOES: Tests whether a keyword phrase appears as a whole-word (whitespace/punctuation-bounded) match in a question, case-insensitively and unicode-aware.
 * @param {string} q - Question text to search
 * @param {string} keyword - Keyword phrase to match (spaces treated as flexible whitespace)
 * @return {boolean} - True if the keyword matches as a bounded phrase
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: q is lowercase; keyword is a literal phrase (metacharacters handled by escapeRegExp).
 */
function keywordMatchesQuestion(q: string, keyword: string): boolean {
  const phrase = escapeRegExp(keyword).replace(/\\ /g, '\\s+');
  const pattern = new RegExp(`(?:^|[\\s\\p{P}])${phrase}(?:[\\s\\p{P}]|$)`, 'iu');
  return pattern.test(q);
}

/**
 * WHAT IT DOES: Scores a FAQ item's relevance to a given context (overview or process) by summing weighted keyword matches and adding a small bonus for questions ending with '?'.
 * @param {FaqItem} faq - FAQ item to score
 * @param {'overview' | 'process'} context - Contextual bucket to score against
 * @return {number} - Relevance score (higher is more relevant)
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: CONTEXT_KEYWORDS contains weighted keyword groups for the given context.
 */
function scoreFaqForContext(faq: FaqItem, context: 'overview' | 'process'): number {
  let score = 0;
  for (const { keywords, weight } of CONTEXT_KEYWORDS[context]) {
    if (keywords.some((kw) => keywordMatchesQuestion(faq.q, kw))) {
      score += weight;
    }
  }
  // WHY: Prefer real questions (ending with '?') over headings or fragments when scoring FAQ relevance.
  if (faq.q.trim().endsWith('?')) {
    score += 0.5;
  }
  return score;
}

/**
 * WHAT IT DOES: Returns the top-N most contextually relevant FAQs for a service, scored by keyword relevance and reordered to preserve their original document order.
 * @param {string} slug - Service slug
 * @param {'overview' | 'process'} context - Contextual bucket to select for
 * @param {number} limit - Maximum number of FAQs to return (defaults to 2)
 * @return {FaqItem[]} - Contextually relevant FAQs in original document order
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: SERVICES_CONFIG may not contain the slug; returns an empty array in that case.
 */
export function getContextualFaqs(
  slug: string,
  context: 'overview' | 'process',
  limit = 2
): FaqItem[] {
  const config = SERVICES_CONFIG[slug];
  if (!config) return [];

  const scored = config.faqs.map((faq, index) => ({
    faq,
    index,
    score: scoreFaqForContext(faq, context),
  }));

  scored.sort((a, b) => b.score - a.score || a.index - b.index);

  return scored
    .slice(0, limit)
    .sort((a, b) => a.index - b.index)
    .map((item) => item.faq);
}

/**
 * WHAT IT DOES: Returns all grouped FAQs for a given service slug, or an empty array if the service is not found.
 * @param {string} slug - Service slug
 * @return {FaqGroup[]} - Grouped FAQs for the service
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: SERVICES_CONFIG may not contain the slug; returns an empty array in that case.
 */
export function getAllServiceFaqs(slug: string): FaqGroup[] {
  const faqs = SERVICES_CONFIG[slug]?.faqs ?? [];
  return groupServiceFaqs(faqs);
}

/**
 * WHAT IT DOES: Returns the answer-engine answers for a given service slug and answer key, or undefined if not found.
 * @param {string} slug - Service slug
 * @param {keyof AnswerEngineAnswers} key - Answer key (cost, timeline, scope, prerequisites, comparison)
 * @return {string | undefined} - Answer text, or undefined if not found
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: SERVICE_ANSWERS contains the slug and key; returns undefined if not found.
 */
export function getAnswerEngineAnswers(
  slug: string,
  key: keyof AnswerEngineAnswers
): string | undefined {
  return SERVICE_ANSWERS[slug]?.[key];
}
