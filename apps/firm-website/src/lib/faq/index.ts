/**
 * FILE: index.ts
 * PURPOSE: Barrel export for FAQ utilities
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
} from './data';

export {
  groupServiceFaqs,
  getContextualFaqs,
  getAllServiceFaqs,
  getAnswerEngineAnswers,
} from './helpers';
