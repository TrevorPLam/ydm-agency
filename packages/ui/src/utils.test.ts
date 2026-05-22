import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', { tags: ['unit'] }, () => {
	it('should merge class names', () => {
		expect(cn('foo', 'bar')).toBe('foo bar');
	});

	it('should handle conditional classes', () => {
		expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz');
	});

	it('should handle undefined and null', () => {
		expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
	});

	it('should handle empty strings', () => {
		expect(cn('foo', '', 'bar')).toBe('foo bar');
	});

	it('should handle arrays', () => {
		expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz');
	});

	it('should handle objects with boolean values', () => {
		expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
	});

	it('should handle Tailwind class conflicts', () => {
		expect(cn('px-2', 'px-4')).toBe('px-4');
	});

	it('should handle complex Tailwind conflicts', () => {
		expect(cn('p-4', 'p-2', 'px-4')).toBe('p-2 px-4');
	});

	it('should handle no arguments', () => {
		expect(cn()).toBe('');
	});

	it('should handle single class', () => {
		expect(cn('foo')).toBe('foo');
	});

	it('should handle duplicate classes', () => {
		expect(cn('foo', 'foo', 'bar')).toBe('foo foo bar');
	});
});
