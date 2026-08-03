import { describe, expect, it } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formats a Date instance with the default long form', () => {
    expect(formatDate(new Date(2024, 0, 15))).toBe('January 15, 2024');
  });

  it('formats an ISO date string with the default long form', () => {
    expect(formatDate('2024-01-15T12:00:00.000Z', { timeZone: 'UTC' })).toBe(
      'January 15, 2024',
    );
  });

  it('formats a date string without an explicit time zone', () => {
    expect(formatDate('2024-01-15T00:00:00', { timeZone: 'UTC' })).toBe(
      'January 15, 2024',
    );
  });

  it('returns "Invalid Date" for an unparseable string', () => {
    expect(formatDate('invalid')).toBe('Invalid Date');
  });

  it('returns "Invalid Date" for a Date instance that is invalid', () => {
    expect(formatDate(new Date('invalid'))).toBe('Invalid Date');
  });

  it('formats a leap year date correctly', () => {
    expect(formatDate(new Date(2020, 1, 29))).toBe('February 29, 2020');
  });

  describe('format options', () => {
    it('supports short month format', () => {
      expect(
        formatDate(new Date(2024, 0, 15), {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      ).toBe('Jan 15, 2024');
    });

    it('supports numeric month/day format', () => {
      expect(
        formatDate(new Date(2024, 0, 15), {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        }),
      ).toBe('01/15/2024');
    });

    it('supports two-digit year format', () => {
      expect(
        formatDate(new Date(2024, 0, 15), {
          month: 'short',
          day: 'numeric',
          year: '2-digit',
        }),
      ).toBe('Jan 15, 24');
    });
  });

  describe('time zones', () => {
    it('formats the same instant in UTC', () => {
      expect(formatDate('2024-01-15T00:00:00.000Z', { timeZone: 'UTC' })).toBe(
        'January 15, 2024',
      );
    });

    it('shifts the date for a negative-offset time zone', () => {
      expect(
        formatDate('2024-01-15T00:00:00.000Z', {
          timeZone: 'America/Los_Angeles',
        }),
      ).toBe('January 14, 2024');
    });

    it('keeps the same day when the instant is late enough for the time zone', () => {
      expect(
        formatDate('2024-01-15T10:00:00.000Z', {
          timeZone: 'America/Los_Angeles',
        }),
      ).toBe('January 15, 2024');
    });
  });
});
