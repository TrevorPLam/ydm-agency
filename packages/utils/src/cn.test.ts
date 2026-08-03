import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('returns an empty string when called with no arguments', () => {
    expect(cn()).toBe('');
  });

  it('ignores all falsy values', () => {
    expect(cn(null, undefined, false, 0, '')).toBe('');
    expect(cn('base', false, null, undefined, 0, '', 'extra')).toBe('base extra');
  });

  it('returns a single class name unchanged', () => {
    expect(cn('text-red-500')).toBe('text-red-500');
  });

  it('concatenates multiple string class names', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
    expect(cn('foo', 'bar', 'baz')).toBe('foo bar baz');
  });

  it('handles conditional and boolean expressions', () => {
    const active = true;
    const disabled = false;

    expect(cn('base', active && 'active')).toBe('base active');
    expect(cn('base', disabled && 'hidden')).toBe('base');
    expect(cn('base', active ? 'on' : 'off')).toBe('base on');
    expect(cn('base', disabled ? 'on' : 'off')).toBe('base off');
  });

  it('handles array inputs', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz');
    expect(cn('foo', ['bar', 'baz'])).toBe('foo bar baz');
  });

  it('handles object inputs', () => {
    expect(cn({ 'text-red-500': true, hidden: false })).toBe('text-red-500');
    expect(cn('foo', { bar: true, baz: false, qux: true })).toBe('foo bar qux');
  });

  it('handles mixed clsx input types', () => {
    const result = cn(
      'base-class',
      undefined,
      { 'conditional-class': true, 'excluded-class': false },
      ['array-class'],
    );

    expect(result).toContain('base-class');
    expect(result).toContain('conditional-class');
    expect(result).toContain('array-class');
    expect(result).not.toContain('excluded-class');
  });

  it('resolves conflicting Tailwind classes (last wins)', () => {
    expect(cn('px-4', 'px-8')).toBe('px-8');
    expect(cn('p-4', 'p-2')).toBe('p-2');
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    expect(cn('m-2', 'm-4')).toBe('m-4');
    expect(cn('text-lg font-bold', 'text-sm', 'font-normal')).toBe(
      'text-sm font-normal',
    );
  });

  it('preserves non-conflicting Tailwind classes', () => {
    expect(cn('py-2', 'px-4')).toBe('py-2 px-4');
    expect(cn('p-4', 'px-2')).toBe('p-4 px-2');
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('deduplicates identical class names', () => {
    expect(cn('flex', 'flex')).toBe('flex');
    expect(cn('flex', 'flex', 'flex')).toBe('flex');
  });

  it('handles empty strings and collapses whitespace', () => {
    expect(cn('', 'base', '')).toBe('base');
    expect(cn('  ', 'base')).toBe('base');
  });

  it('handles arbitrary and custom class names', () => {
    expect(cn('text-[#abc]', 'text-blue-500')).toBe('text-blue-500');
    expect(cn('px-[10px]', 'px-4')).toBe('px-4');
    expect(cn('custom-class', 'another-class')).toBe('custom-class another-class');
  });

  describe('property-based: last-occurrence order for non-conflicting classes', () => {
    it.each([
      { input: ['flex', 'items-center', 'justify-between'] },
      { input: ['items-center', 'flex', 'justify-between'] },
      { input: ['justify-between', 'items-center', 'flex'] },
      { input: ['flex', 'justify-between', 'items-center'] },
      { input: ['items-center', 'justify-between', 'flex'] },
      { input: ['justify-between', 'flex', 'items-center'] },
    ])('keeps distinct non-conflicting classes ($#)', ({ input }) => {
      const expected = [...new Set(input)].join(' ');
      expect(cn(...input)).toBe(expected);
    });

    it('preserves the last occurrence when classes are repeated', () => {
      expect(cn('flex', 'items-center', 'flex')).toBe('items-center flex');
      expect(cn('px-2', 'py-1', 'px-2')).toBe('py-1 px-2');
    });
  });

  describe('property-based: conflict resolution invariants', () => {
    it.each([
      { input: ['px-2', 'px-4', 'py-1'] },
      { input: ['py-1', 'px-2', 'px-4'] },
      { input: ['px-4', 'py-1', 'px-2'] },
      { input: ['px-2', 'py-1', 'px-4'] },
      { input: ['px-4', 'px-2', 'py-1'] },
      { input: ['py-1', 'px-4', 'px-2'] },
    ])('resolves padding conflicts ($#)', ({ input }) => {
      const result = cn(...input);
      const lastPx = input.reduce<string | undefined>((acc, c) => {
        return c.startsWith('px-') ? c : acc;
      }, undefined);

      expect(result).toContain('py-1');
      if (lastPx) {
        expect(result).toContain(lastPx);
      }
    });

    it('never contains both conflicting margin classes', () => {
      const result = cn('m-2', 'm-4', 'm-6');
      expect(result).toBe('m-6');
    });
  });
});
