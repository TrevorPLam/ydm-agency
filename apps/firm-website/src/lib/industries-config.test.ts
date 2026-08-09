import { describe, it, expect } from 'vitest';
import { INDUSTRIES_CONFIG } from './industries-config';
import { SERVICE_LABELS } from './service-labels';

describe('industries-config', () => {
  it('uses valid service slugs for all recommended services', () => {
    const validSlugs = new Set(Object.keys(SERVICE_LABELS));

    Object.values(INDUSTRIES_CONFIG).forEach((industry) => {
      industry.recommendedServices.forEach((rec) => {
        expect(validSlugs.has(rec.service)).toBe(true);
      });
    });
  });
});
