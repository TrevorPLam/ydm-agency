/**
 * FILE: env.test.ts
 * PURPOSE: Verify the getEnv utility handles set, missing, empty, and default environment variables.
 * ARCHITECTURE: web-core unit tests using Vitest environment stubbing.
 * KEY RULES: Each test must unstub envs in afterEach to avoid cross-test pollution.
 * DEPENDS ON: ./env
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { getEnv } from './env';

describe('getEnv', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('returns the environment variable when set', () => {
    vi.stubEnv('WEBCORE_TEST_VAR', 'test-value');
    expect(getEnv('WEBCORE_TEST_VAR')).toBe('test-value');
  });

  it('returns the default value when the variable is not set', () => {
    expect(getEnv('WEBCORE_MISSING_VAR', 'default')).toBe('default');
  });

  it('returns the default value when the variable is an empty string', () => {
    vi.stubEnv('WEBCORE_EMPTY_VAR', '');
    expect(getEnv('WEBCORE_EMPTY_VAR', 'fallback')).toBe('fallback');
  });

  it('returns undefined when the variable is not set and no default is provided', () => {
    expect(getEnv('WEBCORE_UNDEFINED_VAR')).toBeUndefined();
  });
});
