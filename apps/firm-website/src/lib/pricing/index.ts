/**
 * FILE: index.ts
 * PURPOSE: Barrel export for pricing estimator
 */
export {
  BUSINESS_SIZE_OPTIONS,
  TIMELINE_OPTIONS,
  ESTIMATOR_SERVICES,
  ESTIMATOR_EXTRAS,
  type BusinessSize,
  type Timeline,
  type EstimatorService,
  type EstimatorExtra,
  type EstimatorInputs,
  type EstimateItem,
  type EstimateBucket,
  type EstimateResult,
  type BusinessSizeOption,
  type TimelineOption,
} from './constants';

export {
  getDefaultServicesForSituation,
  getPrimaryScenarioForService,
  getEstimateHref,
  getServiceBySlug,
  getExtraById,
  getRelevantExtras,
  getBusinessSizeMultiplier,
  getTimelineMultiplier,
  formatPriceRange,
  calculateEstimate,
  getProjectTypeForContact,
  buildContactMessage,
} from './calculations';
