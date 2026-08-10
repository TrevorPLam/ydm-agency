/**
 * FILE: schemas.test.ts
 * PURPOSE: Unit tests for the shared contact form Zod schema.
 * ARCHITECTURE: packages/forms / Zod validation suite covering valid, invalid, and edge inputs.
 * KEY RULES: Uses safeParse; asserts required, email, length, honeypot, and enum rules.
 * DEPENDS ON: vitest and the contactFormSchema exported from ../schemas.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import { describe, it, expect } from 'vitest';
import { contactFormSchema } from '../schemas';

describe('contactFormSchema', () => {
  it('should pass with valid full input', () => {
    const validInput = {
      name: 'John Doe',
      email: 'john@example.com',
      projectType: 'website' as const,
      message: 'I need a new website for my business with e-commerce functionality.',
      _honeypot: '',
    };
    const result = contactFormSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('should fail when name is missing', () => {
    const invalidInput = {
      email: 'john@example.com',
      message: 'I need a new website for my business.',
      _honeypot: '',
    };
    const result = contactFormSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Required');
    }
  });

  it('should fail with invalid email', () => {
    const invalidInput = {
      name: 'John Doe',
      email: 'not-an-email',
      message: 'I need a new website for my business.',
      _honeypot: '',
    };
    const result = contactFormSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Invalid email');
    }
  });

  it('should fail when message is under 20 characters', () => {
    const invalidInput = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Too short',
      _honeypot: '',
    };
    const result = contactFormSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Message must be at least 20 characters');
    }
  });

  it('should fail when _honeypot is non-empty string', () => {
    const invalidInput = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'I need a new website for my business with e-commerce functionality.',
      _honeypot: 'bot-detected',
    };
    const result = contactFormSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Bot detected');
    }
  });

  it('should pass when projectType is absent (optional)', () => {
    const validInput = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'I need a new website for my business with e-commerce functionality.',
      _honeypot: '',
    };
    const result = contactFormSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('should fail with invalid projectType enum', () => {
    const invalidInput = {
      name: 'John Doe',
      email: 'john@example.com',
      projectType: 'invalid-type',
      message: 'I need a new website for my business.',
      _honeypot: '',
    };
    const result = contactFormSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });
});
