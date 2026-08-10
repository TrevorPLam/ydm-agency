/**
 * FILE: pricing-estimator.ts
 * PURPOSE: Re-exports pricing estimator types, constants, and calculation functions from the pricing directory
 * ARCHITECTURE: Barrel export module that re-exports all pricing estimator functionality; consumed by PricingEstimator component and /services/pricing prefill.
 * KEY RULES: All functions must be pure; service slugs must match SERVICE_LABELS keys; extras only apply when an applicable service is selected; multipliers default to 1.0 when an option is not found.
 * DEPENDS ON: ./pricing/index (all exports); consumed by apps/firm-website/src/components/PricingEstimator.tsx, apps/firm-website/src/app/services/pricing/page.tsx.
 * LAST UPDATED: 2026-08-10 Split into constants and calculations with barrel export
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
} from './pricing';
