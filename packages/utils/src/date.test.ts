import { describe, it, expect } from 'vitest';
import { formatDate, addDays, isSameDay } from './date';

describe('date utilities', { tags: ['unit'] }, () => {
	describe('formatDate', () => {
		it('should format a date to ISO string (YYYY-MM-DD)', () => {
			const date = new Date('2024-05-22T10:30:00.000Z');
			expect(formatDate(date)).toBe('2024-05-22');
		});

		it('should handle dates at midnight', () => {
			const date = new Date('2024-01-01T00:00:00.000Z');
			expect(formatDate(date)).toBe('2024-01-01');
		});

		it('should handle dates at end of day', () => {
			const date = new Date('2024-12-31T23:59:59.999Z');
			expect(formatDate(date)).toBe('2024-12-31');
		});

		// Boundary value analysis - edge cases
		it('should handle epoch date (1970-01-01)', () => {
			const date = new Date(0);
			expect(formatDate(date)).toBe('1970-01-01');
		});

		it('should handle minimum representable date', () => {
			const date = new Date('1000-01-01');
			expect(formatDate(date)).toBe('1000-01-01');
		});

		it('should handle maximum reasonable date', () => {
			const date = new Date('9999-12-31');
			expect(formatDate(date)).toBe('9999-12-31');
		});

		it('should handle leap year date (February 29)', () => {
			const date = new Date('2024-02-29');
			expect(formatDate(date)).toBe('2024-02-29');
		});

		it('should handle non-leap year February 28', () => {
			const date = new Date('2023-02-28');
			expect(formatDate(date)).toBe('2023-02-28');
		});
	});

	describe('addDays', () => {
		it('should add positive days to a date', () => {
			const date = new Date('2024-05-22');
			const result = addDays(date, 5);
			expect(result.toISOString().split('T')[0]).toBe('2024-05-27');
		});

		it('should add negative days to a date', () => {
			const date = new Date('2024-05-22');
			const result = addDays(date, -3);
			expect(result.toISOString().split('T')[0]).toBe('2024-05-19');
		});

		it('should not mutate the original date', () => {
			const date = new Date('2024-05-22');
			const originalDate = date.toISOString();
			addDays(date, 5);
			expect(date.toISOString()).toBe(originalDate);
		});

		it('should handle adding zero days', () => {
			const date = new Date('2024-05-22');
			const result = addDays(date, 0);
			expect(result.toISOString().split('T')[0]).toBe('2024-05-22');
		});

		it('should handle month boundaries', () => {
			const date = new Date('2024-01-31');
			const result = addDays(date, 1);
			expect(result.toISOString().split('T')[0]).toBe('2024-02-01');
		});

		it('should handle year boundaries', () => {
			const date = new Date('2024-12-31');
			const result = addDays(date, 1);
			expect(result.toISOString().split('T')[0]).toBe('2025-01-01');
		});

		// Boundary value analysis - edge cases
		it('should handle adding very large number of days', () => {
			const date = new Date('2024-01-01');
			const result = addDays(date, 365);
			expect(result.toISOString().split('T')[0]).toBe('2024-12-31');
		});

		it('should handle subtracting very large number of days', () => {
			const date = new Date('2024-12-31');
			const result = addDays(date, -366); // 366 days for leap year
			expect(result.toISOString().split('T')[0]).toBe('2023-12-31');
		});

		it('should handle leap year February 28 to 29', () => {
			const date = new Date('2024-02-28');
			const result = addDays(date, 1);
			expect(result.toISOString().split('T')[0]).toBe('2024-02-29');
		});

		it('should handle non-leap year February 28 to March 1', () => {
			const date = new Date('2023-02-28');
			const result = addDays(date, 1);
			expect(result.toISOString().split('T')[0]).toBe('2023-03-01');
		});

		it('should handle epoch date boundary', () => {
			const date = new Date(0);
			const result = addDays(date, 1);
			expect(result.getTime()).toBe(86400000);
		});
	});

	describe('isSameDay', () => {
		it('should return true for same day', () => {
			const date1 = new Date('2024-05-22T10:00:00.000Z');
			const date2 = new Date('2024-05-22T18:30:00.000Z');
			expect(isSameDay(date1, date2)).toBe(true);
		});

		it('should return false for different days', () => {
			const date1 = new Date('2024-05-22T10:00:00.000Z');
			const date2 = new Date('2024-05-23T10:00:00.000Z');
			expect(isSameDay(date1, date2)).toBe(false);
		});

		it('should return false for different months', () => {
			const date1 = new Date('2024-05-22T10:00:00.000Z');
			const date2 = new Date('2024-06-22T10:00:00.000Z');
			expect(isSameDay(date1, date2)).toBe(false);
		});

		it('should return false for different years', () => {
			const date1 = new Date('2024-05-22T10:00:00.000Z');
			const date2 = new Date('2025-05-22T10:00:00.000Z');
			expect(isSameDay(date1, date2)).toBe(false);
		});

		it('should handle different times on same day', () => {
			const date1 = new Date('2024-05-22T10:00:00.000Z');
			const date2 = new Date('2024-05-22T18:30:00.000Z');
			expect(isSameDay(date1, date2)).toBe(true);
		});

		// Boundary value analysis - edge cases
		it('should handle epoch date comparison', () => {
			const date1 = new Date(0);
			const date2 = new Date(0);
			expect(isSameDay(date1, date2)).toBe(true);
		});

		it('should handle leap year February 29 comparison', () => {
			const date1 = new Date('2024-02-29');
			const date2 = new Date('2024-02-29');
			expect(isSameDay(date1, date2)).toBe(true);
		});
	});
});
