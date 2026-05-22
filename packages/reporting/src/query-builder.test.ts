import { describe, it, expect, beforeEach } from 'vitest';
import { QueryBuilder } from './query-builder';

describe('QueryBuilder', { tags: ['unit'] }, () => {
	let builder: QueryBuilder;

	beforeEach(() => {
		builder = new QueryBuilder();
	});

	describe('constructor', () => {
		it('should create an instance', () => {
			expect(builder).toBeInstanceOf(QueryBuilder);
		});

		it('should initialize with empty filters', () => {
			const result = builder.build();
			expect(result.filters).toEqual([]);
		});
	});

	describe('addFilter', () => {
		it('should add a filter', () => {
			builder.addFilter('status', 'equals', 'active');
			const result = builder.build();
			expect(result.filters).toHaveLength(1);
			expect(result.filters[0]).toEqual({
				field: 'status',
				operator: 'equals',
				value: 'active',
			});
		});

		it('should chain multiple filters', () => {
			builder
				.addFilter('status', 'equals', 'active')
				.addFilter('priority', 'greater-than', 5)
				.addFilter('created', 'less-than', '2024-01-01');
			const result = builder.build();
			expect(result.filters).toHaveLength(3);
		});

		it('should return this for chaining', () => {
			const result = builder.addFilter('test', 'equals', 'value');
			expect(result).toBe(builder);
		});

		it('should handle numeric values', () => {
			builder.addFilter('count', 'greater-than', 10);
			const result = builder.build();
			expect(result.filters[0].value).toBe(10);
		});

		it('should handle boolean values', () => {
			builder.addFilter('isActive', 'equals', true);
			const result = builder.build();
			expect(result.filters[0].value).toBe(true);
		});

		it('should handle null values', () => {
			builder.addFilter('deletedAt', 'equals', null);
			const result = builder.build();
			expect(result.filters[0].value).toBe(null);
		});
	});

	describe('build', () => {
		it('should return object with filters array', () => {
			builder.addFilter('status', 'equals', 'active');
			const result = builder.build();
			expect(result).toHaveProperty('filters');
			expect(Array.isArray(result.filters)).toBe(true);
		});

		it('should include all added filters', () => {
			builder
				.addFilter('status', 'equals', 'active')
				.addFilter('priority', 'greater-than', 5);
			const result = builder.build();
			expect(result.filters).toHaveLength(2);
		});

		it('should return empty filters when none added', () => {
			const result = builder.build();
			expect(result.filters).toEqual([]);
		});

		it('should return updated filters after adding more', () => {
			builder.addFilter('status', 'equals', 'active');
			const result1 = builder.build();
			builder.addFilter('priority', 'greater-than', 5);
			const result2 = builder.build();
			expect(result1.filters).toHaveLength(2);
			expect(result2.filters).toHaveLength(2);
		});
	});
});
