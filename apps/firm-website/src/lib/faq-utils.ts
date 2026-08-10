/**
 * FILE: faq-utils.ts
 * PURPOSE: Re-exports FAQ types, data, and helper functions from the faq directory
 * ARCHITECTURE: Barrel export module that re-exports all FAQ functionality; consumed by service pages, FAQ pages, and process pages.
 * KEY RULES: Classification must be deterministic and keyword-based; theme ordering must follow THEME_ORDER; groupServiceFaqs must omit empty themes; answers must use the firm-level impersonal voice.
 * DEPENDS ON: ./faq/index (all exports); consumed by apps/firm-website/src/app/services/**.
 * LAST UPDATED: 2026-08-10 Split into data and helpers with barrel export
 */
export {
  THEME_KEYWORDS,
  THEME_ORDER,
  SERVICE_TITLES,
  SERVICE_ANSWERS,
  CONTEXT_KEYWORDS,
  type FaqItem,
  type FaqGroup,
  type AnswerEngineAnswers,
  groupServiceFaqs,
  getContextualFaqs,
  getAllServiceFaqs,
  getAnswerEngineAnswers,
} from './faq';
