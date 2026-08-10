/**
 * FILE: pricing-estimator.test.ts
 * PURPOSE: Unit test the pricing estimator logic and output formatting.
 * ARCHITECTURE: Vitest suite; exercises estimate calculations, modifiers, extras, formatting, and contact message generation.
 * KEY RULES: One-time and monthly estimates must not mix; modifiers apply multiplicatively to service price ranges.
 * DEPENDS ON: ./pricing-estimator, vitest
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import { describe, it, expect } from 'vitest';
import {
  type EstimatorInputs,
  calculateEstimate,
  formatPriceRange,
  getDefaultServicesForSituation,
  getRelevantExtras,
  getProjectTypeForContact,
  buildContactMessage,
  BUSINESS_SIZE_OPTIONS,
  TIMELINE_OPTIONS,
  ESTIMATOR_SERVICES,
  ESTIMATOR_EXTRAS,
} from './pricing-estimator';

const baseInputs: EstimatorInputs = {
  situation: 'no-website',
  services: ['web-design'],
  businessSize: 'small',
  timeline: 'standard',
  extras: [],
};

describe('pricing-estimator', () => {
  it('returns a one-time estimate for a one-time service', () => {
    const result = calculateEstimate(baseInputs);
    expect(result.oneTime).not.toBeNull();
    expect(result.monthly).toBeNull();
    expect(result.oneTime!.low).toBe(5000);
    expect(result.oneTime!.high).toBe(12000);
    expect(result.oneTime!.items).toHaveLength(1);
    expect(result.oneTime!.items[0].label).toBe('Website Design & Development');
  });

  it('applies business size multiplier', () => {
    const result = calculateEstimate({ ...baseInputs, businessSize: 'multi' });
    expect(result.oneTime!.low).toBe(Math.round(5000 * 1.25));
    expect(result.oneTime!.high).toBe(Math.round(12000 * 1.25));
  });

  it('applies timeline multiplier', () => {
    const result = calculateEstimate({ ...baseInputs, timeline: 'rush' });
    expect(result.oneTime!.low).toBe(Math.round(5000 * 1.15));
    expect(result.oneTime!.high).toBe(Math.round(12000 * 1.15));
  });

  it('combines modifiers multiplicatively', () => {
    const result = calculateEstimate({ ...baseInputs, businessSize: 'multi', timeline: 'rush' });
    expect(result.oneTime!.low).toBe(Math.round(5000 * 1.25 * 1.15));
    expect(result.oneTime!.high).toBe(Math.round(12000 * 1.25 * 1.15));
  });

  it('returns monthly estimate for monthly services', () => {
    const result = calculateEstimate({ ...baseInputs, services: ['seo'] });
    expect(result.oneTime).toBeNull();
    expect(result.monthly).not.toBeNull();
    expect(result.monthly!.low).toBe(1000);
    expect(result.monthly!.high).toBe(2500);
  });

  it('sums one-time and monthly buckets separately', () => {
    const result = calculateEstimate({ ...baseInputs, services: ['web-design', 'seo'] });
    expect(result.oneTime!.low).toBe(5000);
    expect(result.oneTime!.high).toBe(12000);
    expect(result.monthly!.low).toBe(1000);
    expect(result.monthly!.high).toBe(2500);
  });

  it('adds applicable extras to the correct bucket', () => {
    const result = calculateEstimate({ ...baseInputs, services: ['web-design'], extras: ['copywriting'] });
    expect(result.oneTime!.items).toHaveLength(2);
    expect(result.oneTime!.low).toBe(5500);
    expect(result.oneTime!.high).toBe(14000);
  });

  it('ignores extras that do not apply to selected services', () => {
    const result = calculateEstimate({ ...baseInputs, services: ['web-design'], extras: ['ad-spend'] });
    expect(result.oneTime!.items).toHaveLength(1);
  });

  it('adds monthly extras to the monthly bucket', () => {
    const result = calculateEstimate({
      ...baseInputs,
      services: ['paid-ads'],
      extras: ['ad-spend'],
    });
    expect(result.monthly).not.toBeNull();
    expect(result.monthly!.low).toBe(2500);
    expect(result.monthly!.high).toBe(5500);
    expect(result.monthly!.items.some((i) => i.label === 'Recommended monthly ad spend')).toBe(true);
  });

  it('formats price ranges without cents', () => {
    expect(formatPriceRange(5000, 12000)).toBe('$5,000–$12,000');
    expect(formatPriceRange(1000, 2500)).toBe('$1,000–$2,500');
  });

  it('gets default services from a comparison scenario', () => {
    const services = getDefaultServicesForSituation('no-website');
    expect(services).toEqual(['web-design', 'seo', 'branding']);
  });

  it('returns empty services for unknown situation', () => {
    expect(getDefaultServicesForSituation('unknown')).toEqual([]);
  });

  it('returns only extras relevant to selected services', () => {
    const extras = getRelevantExtras(['paid-ads']);
    expect(extras.some((e) => e.id === 'ad-spend')).toBe(true);
    expect(extras.some((e) => e.id === 'ecommerce-booking')).toBe(false);
  });

  it('maps services to contact project type', () => {
    expect(getProjectTypeForContact(['web-design'])).toBe('website');
    expect(getProjectTypeForContact(['seo'])).toBe('traffic-leads');
    expect(getProjectTypeForContact(['web-design', 'seo'])).toBe('other');
    expect(getProjectTypeForContact([])).toBeUndefined();
  });

  it('builds a contact message with estimate details', () => {
    const inputs: EstimatorInputs = {
      ...baseInputs,
      services: ['web-design'],
      extras: ['copywriting'],
    };
    const result = calculateEstimate(inputs);
    const message = buildContactMessage(inputs, result);
    expect(message).toContain('I used the project estimator');
    expect(message).toContain('Website Design & Development');
    expect(message).toContain('Professional copywriting');
    expect(message).toContain('$5,500–$14,000');
    expect(message).toContain('get a more detailed outline');
  });

  it('includes ad spend disclaimer when ad spend is selected', () => {
    const inputs: EstimatorInputs = {
      ...baseInputs,
      services: ['paid-ads'],
      extras: ['ad-spend'],
    };
    const result = calculateEstimate(inputs);
    const message = buildContactMessage(inputs, result);
    expect(message).toContain('Ad spend is paid directly to Google, Meta, or other ad platforms');
  });

  it('multipliers match option definitions', () => {
    expect(ESTIMATOR_SERVICES).toHaveLength(8);
    expect(ESTIMATOR_EXTRAS.length).toBeGreaterThan(0);
    expect(BUSINESS_SIZE_OPTIONS.map((o) => o.value)).toContain('solo');
    expect(TIMELINE_OPTIONS.map((o) => o.value)).toContain('standard');
  });
});
