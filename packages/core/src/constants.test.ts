import { describe, it, expect } from 'vitest';
import { APP_NAME, API_VERSION } from './constants';

describe('constants', { tags: ['unit'] }, () => {
  it('should provide non-empty app name for display', () => {
    expect(APP_NAME).toBeTruthy();
    expect(APP_NAME.length).toBeGreaterThan(0);
  });

  it('should provide API version in semver format', () => {
    expect(API_VERSION).toMatch(/^v\d+/);
  });
});
