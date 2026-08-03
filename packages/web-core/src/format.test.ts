import { describe, it, expect } from 'vitest';
import { formatDate, formatCurrency } from './format';

describe('formatDate', () => {
  it('formats a date string in en-US long form', () => {
    expect(formatDate('2024-01-15T12:00:00')).toBe('January 15, 2024');
  });

  it('formats a Date instance in en-US long form', () => {
    expect(formatDate(new Date(2024, 0, 15, 12, 0, 0))).toBe('January 15, 2024');
  });
});

describe('formatCurrency', () => {
  it('formats USD by default', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('formats a custom currency', () => {
    expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56');
  });
});
