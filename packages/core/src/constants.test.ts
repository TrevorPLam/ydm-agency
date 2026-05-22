import { describe, it, expect } from 'vitest';
import { APP_NAME, API_VERSION } from './constants';

describe('constants', () => {
  describe('APP_NAME', () => {
    it('should be defined', () => {
      expect(APP_NAME).toBeDefined();
    });

    it('should be a string', () => {
      expect(typeof APP_NAME).toBe('string');
    });

    it('should equal "Agency Platform"', () => {
      expect(APP_NAME).toBe('Agency Platform');
    });
  });

  describe('API_VERSION', () => {
    it('should be defined', () => {
      expect(API_VERSION).toBeDefined();
    });

    it('should be a string', () => {
      expect(typeof API_VERSION).toBe('string');
    });

    it('should equal "v1"', () => {
      expect(API_VERSION).toBe('v1');
    });
  });
});
