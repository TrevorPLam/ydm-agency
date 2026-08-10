/**
 * FILE: formatCurrency.test.ts
 * PURPOSE: Unit tests for the formatCurrency utility.
 * ARCHITECTURE: packages/utils / Intl.NumberFormat assertions for USD and additional currency codes.
 * KEY RULES: Defaults to USD; rounds to two decimal places; JPY formatting has no fractional digits.
 * DEPENDS ON: vitest and the formatCurrency utility exported from ./formatCurrency.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import { describe, expect, it } from 'vitest';
import { formatCurrency } from './formatCurrency';

describe('formatCurrency', () => {
  it('formats USD by default', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('formats a positive whole amount', () => {
    expect(formatCurrency(100)).toBe('$100.00');
  });

  it('formats zero values', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('formats negative values', () => {
    expect(formatCurrency(-50)).toBe('-$50.00');
  });

  it('formats large numbers', () => {
    expect(formatCurrency(1234567.89)).toBe('$1,234,567.89');
  });

  it('rounds to two decimal places', () => {
    expect(formatCurrency(0.1 + 0.2)).toBe('$0.30');
  });

  it('formats an explicit USD currency', () => {
    expect(formatCurrency(99.99, 'USD')).toBe('$99.99');
  });

  it.each([
    { amount: 1000.5, currency: 'EUR', expected: '€1,000.50' },
    { amount: 99.99, currency: 'GBP', expected: '£99.99' },
    { amount: 1234, currency: 'JPY', expected: '¥1,234' },
  ])('formats $amount in $currency as $expected', ({ amount, currency, expected }) => {
    expect(formatCurrency(amount, currency)).toBe(expected);
  });
});
