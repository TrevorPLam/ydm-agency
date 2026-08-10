/**
 * FILE: industries-config.test.ts
 * PURPOSE: Validate that industry recommended services reference real service slugs.
 * ARCHITECTURE: Vitest suite; cross-checks INDUSTRIES_CONFIG entries against SERVICE_LABELS keys.
 * KEY RULES: Every recommended service slug must exist in SERVICE_LABELS; test fails on stale or invalid slugs.
 * DEPENDS ON: ./industries-config, ./service-labels, vitest
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

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
