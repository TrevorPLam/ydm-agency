/**
 * FILE: calculations.ts
 * PURPOSE: Pricing estimator calculation functions
 */
import { COMPARISON_SCENARIOS } from '../service-comparison-config';
import {
  ESTIMATOR_SERVICES,
  ESTIMATOR_EXTRAS,
  BUSINESS_SIZE_OPTIONS,
  TIMELINE_OPTIONS,
  type EstimatorService,
  type EstimatorExtra,
  type BusinessSize,
  type Timeline,
  type EstimatorInputs,
  type EstimateResult,
} from './constants';

/**
 * WHAT IT DOES: Returns the default service slugs (primary plus also-consider) for a comparison scenario by its id.
 * @param {string} situationId - Comparison scenario id
 * @return {string[]} - Service slugs for the scenario, or an empty array if not found
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: situationId matches a COMPARISON_SCENARIOS entry id.
 */
export function getDefaultServicesForSituation(situationId: string): string[] {
  const scenario = COMPARISON_SCENARIOS.find((s) => s.id === situationId);
  if (!scenario) return [];
  return [scenario.primaryService, ...scenario.alsoConsider];
}

/**
 * WHAT IT DOES: Finds the id of the comparison scenario whose primary service matches the given slug.
 * @param {string} slug - Service slug
 * @return {string | undefined} - Scenario id, or undefined if no scenario has this slug as its primary service
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: None.
 */
export function getPrimaryScenarioForService(slug: string): string | undefined {
  return COMPARISON_SCENARIOS.find((s) => s.primaryService === slug)?.id;
}

/**
 * WHAT IT DOES: Builds a /services/pricing href prefilled with the scenario (if a primary scenario exists for the slug) or the service slug directly.
 * @param {string} slug - Service slug
 * @return {string} - Pricing page href with situation or services query parameter
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: None.
 */
export function getEstimateHref(slug: string): string {
  const scenarioId = getPrimaryScenarioForService(slug);
  if (scenarioId) return `/services/pricing?situation=${scenarioId}`;
  return `/services/pricing?services=${slug}`;
}

/**
 * WHAT IT DOES: Looks up an estimator service by its slug.
 * @param {string} slug - Service slug
 * @return {EstimatorService | undefined} - Matching service, or undefined if not found
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: None.
 */
export function getServiceBySlug(slug: string): EstimatorService | undefined {
  return ESTIMATOR_SERVICES.find((s) => s.slug === slug);
}

/**
 * WHAT IT DOES: Looks up an estimator extra by its id.
 * @param {string} id - Extra id
 * @return {EstimatorExtra | undefined} - Matching extra, or undefined if not found
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: None.
 */
export function getExtraById(id: string): EstimatorExtra | undefined {
  return ESTIMATOR_EXTRAS.find((e) => e.id === id);
}

/**
 * WHAT IT DOES: Returns the extras that apply to at least one of the selected services.
 * @param {string[]} services - Selected service slugs
 * @return {EstimatorExtra[]} - Extras whose appliesTo list intersects the selected services
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: None.
 */
export function getRelevantExtras(services: string[]): EstimatorExtra[] {
  return ESTIMATOR_EXTRAS.filter((extra) =>
    extra.appliesTo.some((slug) => services.includes(slug))
  );
}

/**
 * WHAT IT DOES: Returns the price multiplier for a business size, defaulting to 1.0 if the option is not found.
 * @param {BusinessSize} size - Business size value
 * @return {number} - Multiplier to apply to base price ranges
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: None.
 */
export function getBusinessSizeMultiplier(size: BusinessSize): number {
  return BUSINESS_SIZE_OPTIONS.find((o) => o.value === size)?.multiplier ?? 1.0;
}

/**
 * WHAT IT DOES: Returns the price multiplier for a timeline option, defaulting to 1.0 if the option is not found.
 * @param {Timeline} timeline - Timeline value
 * @return {number} - Multiplier to apply to base price ranges
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: None.
 */
export function getTimelineMultiplier(timeline: Timeline): number {
  return TIMELINE_OPTIONS.find((o) => o.value === timeline)?.multiplier ?? 1.0;
}

/**
 * WHAT IT DOES: Formats a low/high price pair as a USD currency range string with no fractional digits (e.g., "$5,000–$12,000").
 * @param {number} low - Lower bound of the range
 * @param {number} high - Upper bound of the range
 * @return {string} - Formatted currency range string
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: low <= high.
 */
export function formatPriceRange(low: number, high: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
  return `${formatter.format(low)}–${formatter.format(high)}`;
}

/**
 * WHAT IT DOES: Calculates a pricing estimate by applying business-size and timeline multipliers to selected services and adding applicable extras, splitting results into one-time and monthly buckets.
 * @param {EstimatorInputs} inputs - Selected situation, services, business size, timeline, and extras
 * @return {EstimateResult} - One-time and monthly estimate buckets with the applied multipliers
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: Extras are only included when an applicable service is selected; unknown slugs/ids are skipped.
 */
export function calculateEstimate(inputs: EstimatorInputs): EstimateResult {
  const businessSizeMultiplier = getBusinessSizeMultiplier(inputs.businessSize);
  const timelineMultiplier = getTimelineMultiplier(inputs.timeline);

  const oneTimeItems: import('./constants').EstimateItem[] = [];
  const monthlyItems: import('./constants').EstimateItem[] = [];

  for (const slug of inputs.services) {
    const service = getServiceBySlug(slug);
    if (!service) continue;

    const low = Math.round(service.baseLow * businessSizeMultiplier * timelineMultiplier);
    const high = Math.round(service.baseHigh * businessSizeMultiplier * timelineMultiplier);

    const item: import('./constants').EstimateItem = {
      label: service.title,
      low,
      high,
      isMonthly: service.isMonthly,
      note: service.isMonthly ? 'Monthly management or retainer' : 'One-time project',
    };

    if (service.isMonthly) {
      monthlyItems.push(item);
    } else {
      oneTimeItems.push(item);
    }
  }

  for (const extraId of inputs.extras) {
    const extra = getExtraById(extraId);
    if (!extra) continue;

    const hasApplicableService = extra.appliesTo.some((slug) => inputs.services.includes(slug));
    if (!hasApplicableService) continue;

    const item: import('./constants').EstimateItem = {
      label: extra.label,
      low: extra.costLow,
      high: extra.costHigh,
      isMonthly: extra.isMonthly ?? false,
      note: extra.description,
    };

    if (item.isMonthly) {
      monthlyItems.push(item);
    } else {
      oneTimeItems.push(item);
    }
  }

  const oneTime = oneTimeItems.length
    ? {
        low: oneTimeItems.reduce((sum, item) => sum + item.low, 0),
        high: oneTimeItems.reduce((sum, item) => sum + item.high, 0),
        items: oneTimeItems,
      }
    : null;

  const monthly = monthlyItems.length
    ? {
        low: monthlyItems.reduce((sum, item) => sum + item.low, 0),
        high: monthlyItems.reduce((sum, item) => sum + item.high, 0),
        items: monthlyItems,
      }
    : null;

  return {
    oneTime,
    monthly,
    businessSizeMultiplier,
    timelineMultiplier,
  };
}

/**
 * WHAT IT DOES: Maps a set of selected service slugs to a contact-form project type ('website', 'traffic-leads', or 'other'), or undefined when no services are selected.
 * @param {string[]} services - Selected service slugs
 * @return {'website' | 'traffic-leads' | 'other' | undefined} - Project type for the contact form
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: Service slugs fall into website or traffic service groups; mixed selections map to 'other'.
 */
export function getProjectTypeForContact(services: string[]): 'website' | 'traffic-leads' | 'other' | undefined {
  if (services.length === 0) return undefined;

  const websiteServices = ['web-design', 'branding', 'content'];
  const trafficServices = ['seo', 'paid-ads', 'analytics', 'automation', 'reputation'];

  const hasWebsite = services.some((s) => websiteServices.includes(s));
  const hasTraffic = services.some((s) => trafficServices.includes(s));

  if (hasWebsite && !hasTraffic) return 'website';
  if (hasTraffic && !hasWebsite) return 'traffic-leads';
  return 'other';
}

/**
 * WHAT IT DOES: Serializes the estimator inputs and result into a human-readable contact-form message describing the situation, services, business size, timeline, extras, and estimated investment ranges.
 * @param {EstimatorInputs} inputs - Selected situation, services, business size, timeline, and extras
 * @param {EstimateResult} result - Calculated estimate buckets
 * @return {string} - Newline-joined contact message body
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: inputs and result are consistent (result derived from inputs via calculateEstimate).
 */
export function buildContactMessage(inputs: EstimatorInputs, result: EstimateResult): string {
  const scenario = COMPARISON_SCENARIOS.find((s) => s.id === inputs.situation);
  const sizeOption = BUSINESS_SIZE_OPTIONS.find((o) => o.value === inputs.businessSize);
  const timelineOption = TIMELINE_OPTIONS.find((o) => o.value === inputs.timeline);

  const serviceLabels = inputs.services
    .map((slug) => getServiceBySlug(slug)?.title ?? slug)
    .join(', ');

  const extraLabels = inputs.extras
    .map((id) => getExtraById(id)?.label ?? id)
    .join(', ') || 'None selected';

  const lines: string[] = [
    'I used the project estimator on the YDM Agency pricing page and got a ballpark range.',
    '',
    `Current situation: ${scenario?.title ?? inputs.situation}`,
    `Services I'm interested in: ${serviceLabels}`,
    `Business size: ${sizeOption?.label ?? inputs.businessSize}`,
    `Timeline: ${timelineOption?.label ?? inputs.timeline}`,
    `Extras: ${extraLabels}`,
  ];

  if (result.oneTime) {
    lines.push('', `Estimated one-time investment: ${formatPriceRange(result.oneTime.low, result.oneTime.high)}`);
  }

  if (result.monthly) {
    lines.push('', `Estimated monthly investment: ${formatPriceRange(result.monthly.low, result.monthly.high)}`);
    if (result.monthly.items.some((i) => i.label === 'Recommended monthly ad spend')) {
      lines.push('(Ad spend is paid directly to Google, Meta, or other ad platforms, not to YDM Agency.)');
    }
  }

  lines.push('', 'I’d like to discuss this project and get a more detailed outline.');
  return lines.join('\n');
}
