import { describe, it, expect } from 'vitest';
import { sum, average, count } from './aggregators';

describe('aggregators', () => {
	describe('sum', () => {
		it('should sum positive numbers', () => {
			expect(sum([1, 2, 3, 4, 5])).toBe(15);
		});

		it('should sum negative numbers', () => {
			expect(sum([-1, -2, -3])).toBe(-6);
		});

		it('should sum mixed positive and negative numbers', () => {
			expect(sum([1, -2, 3, -4, 5])).toBe(3);
		});

		it('should return 0 for empty array', () => {
			expect(sum([])).toBe(0);
		});

		it('should handle single element', () => {
			expect(sum([42])).toBe(42);
		});

		it('should handle decimal numbers', () => {
			expect(sum([1.5, 2.5, 3.0])).toBe(7);
		});

		it('should handle zeros', () => {
			expect(sum([0, 0, 0])).toBe(0);
		});

		// Boundary value analysis - edge cases
		it('should handle very large numbers', () => {
			expect(sum([Number.MAX_SAFE_INTEGER, 1])).toBe(Number.MAX_SAFE_INTEGER + 1);
		});

		it('should handle very small negative numbers', () => {
			expect(sum([Number.MIN_SAFE_INTEGER, -1])).toBe(Number.MIN_SAFE_INTEGER - 1);
		});

		it('should handle numbers near zero boundary', () => {
			expect(sum([0.0001, -0.0001])).toBeCloseTo(0);
		});

		it('should handle Infinity', () => {
			expect(sum([1, Infinity])).toBe(Infinity);
		});

		it('should handle -Infinity', () => {
			expect(sum([1, -Infinity])).toBe(-Infinity);
		});

		it('should handle NaN (results in NaN)', () => {
			expect(sum([1, NaN])).toBeNaN();
		});
	});

	describe('average', () => {
		it('should calculate average of positive numbers', () => {
			expect(average([1, 2, 3, 4, 5])).toBe(3);
		});

		it('should calculate average of negative numbers', () => {
			expect(average([-1, -2, -3])).toBe(-2);
		});

		it('should calculate average of mixed numbers', () => {
			expect(average([1, -2, 3, -4, 5])).toBe(0.6);
		});

		it('should return 0 for empty array', () => {
			expect(average([])).toBe(0);
		});

		it('should handle single element', () => {
			expect(average([42])).toBe(42);
		});

		it('should handle decimal numbers', () => {
			expect(average([1.5, 2.5, 3.0])).toBe(2.3333333333333335);
		});

		it('should handle identical numbers', () => {
			expect(average([5, 5, 5, 5])).toBe(5);
		});

		// Boundary value analysis - edge cases
		it('should handle average of two elements at boundary', () => {
			expect(average([0, 1])).toBe(0.5);
		});

		it('should handle very large numbers', () => {
			expect(average([Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER])).toBe(Number.MAX_SAFE_INTEGER);
		});

		it('should handle numbers near zero', () => {
			expect(average([0.0001, -0.0001])).toBeCloseTo(0);
		});

		it('should handle Infinity', () => {
			expect(average([1, Infinity])).toBe(Infinity);
		});

		it('should handle -Infinity', () => {
			expect(average([1, -Infinity])).toBe(-Infinity);
		});

		it('should handle NaN (results in NaN)', () => {
			expect(average([1, NaN])).toBeNaN();
		});
	});

	describe('count', () => {
		it('should count array elements', () => {
			expect(count([1, 2, 3, 4, 5])).toBe(5);
		});

		it('should return 0 for empty array', () => {
			expect(count([])).toBe(0);
		});

		it('should count single element', () => {
			expect(count([1])).toBe(1);
		});

		it('should count string array', () => {
			expect(count(['a', 'b', 'c'])).toBe(3);
		});

		it('should count mixed array', () => {
			expect(count([1, 'a', true, null, undefined])).toBe(5);
		});

		it('should count object array', () => {
			expect(count([{ id: 1 }, { id: 2 }])).toBe(2);
		});

		// Boundary value analysis - edge cases
		it('should handle large arrays', () => {
			const largeArray = Array(10000).fill(1);
			expect(count(largeArray)).toBe(10000);
		});

		it('should handle nested arrays', () => {
			expect(count([[1, 2], [3, 4]])).toBe(2);
		});

		it('should handle sparse arrays', () => {
			const sparseArray: number[] = [];
			sparseArray[10] = 1;
			expect(count(sparseArray)).toBe(11);
		});
	});
});
