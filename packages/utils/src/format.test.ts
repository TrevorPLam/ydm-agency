import { describe, it, expect } from 'vitest';
import { formatCurrency, formatNumber, truncate } from './format';

describe('format utilities', { tags: ['unit'] }, () => {
	describe('formatCurrency', () => {
		it('should format USD currency correctly', () => {
			expect(formatCurrency(1234.56)).toBe('$1,234.56');
		});

		it('should format zero correctly', () => {
			expect(formatCurrency(0)).toBe('$0.00');
		});

		it('should format negative numbers correctly', () => {
			expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
		});

		it('should handle large numbers', () => {
			expect(formatCurrency(1000000)).toBe('$1,000,000.00');
		});

		it('should format with custom currency', () => {
			expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56');
		});

		it('should format with GBP currency', () => {
			expect(formatCurrency(1234.56, 'GBP')).toBe('£1,234.56');
		});

		it('should handle decimal precision', () => {
			expect(formatCurrency(1234.56789)).toBe('$1,234.57');
		});
	});

	describe('formatNumber', () => {
		it('should format numbers with commas', () => {
			expect(formatNumber(1234567)).toBe('1,234,567');
		});

		it('should format zero correctly', () => {
			expect(formatNumber(0)).toBe('0');
		});

		it('should format negative numbers', () => {
			expect(formatNumber(-1234567)).toBe('-1,234,567');
		});

		it('should handle decimal numbers', () => {
			expect(formatNumber(1234.56)).toBe('1,234.56');
		});

		it('should format small numbers', () => {
			expect(formatNumber(123)).toBe('123');
		});

		it('should handle very large numbers', () => {
			expect(formatNumber(1234567890123)).toBe('1,234,567,890,123');
		});
	});

	describe('truncate', () => {
		it('should truncate string longer than length', () => {
			expect(truncate('Hello World', 5)).toBe('Hello...');
		});

		it('should not truncate string shorter than length', () => {
			expect(truncate('Hi', 5)).toBe('Hi');
		});

		it('should not truncate string equal to length', () => {
			expect(truncate('Hello', 5)).toBe('Hello');
		});

		it('should handle empty string', () => {
			expect(truncate('', 5)).toBe('');
		});

		it('should handle length of zero', () => {
			expect(truncate('Hello', 0)).toBe('...');
		});

		it('should handle unicode characters', () => {
			expect(truncate('Hello 🌍', 6)).toBe('Hello ...');
		});

		it('should preserve original string when not truncated', () => {
			const str = 'Test';
			const result = truncate(str, 10);
			expect(result).toBe(str);
		});
	});
});
