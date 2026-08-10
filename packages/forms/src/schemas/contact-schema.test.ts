/**
 * FILE: contact-schema.test.ts
 * PURPOSE: Unit tests for the contact Zod schema exported by contact-schema.
 * ARCHITECTURE: packages/forms / schema-level validation covering fields, preprocessing, and error messages.
 * KEY RULES: Uses safeParse; asserts per-field and aggregate error paths through a test helper.
 * DEPENDS ON: vitest and the contactSchema exported from ./contact-schema.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import { describe, it, expect } from 'vitest';
import { contactSchema } from './contact-schema';

const validInput = {
  name: 'John Doe',
  email: 'john@example.com',
  projectType: 'website' as const,
  message: 'I need a new website for my business with e-commerce functionality.',
  _honeypot: '',
};

/**
 * WHAT IT DOES: Finds the first Zod validation issue matching a top-level field path.
 * @param {Array<{path: (string | number)[], message: string}>} issues – Zod validation issues to search.
 * @param {string} path – Top-level field name to match.
 * @return {{path: (string | number)[], message: string} | undefined} – The matched issue, if any.
 * SIDE EFFECTS: None
 * ASSUMES: Issues are flat and the first segment of path is the field key.
 */
const getIssueForPath = (issues: { path: (string | number)[]; message: string }[], path: string) =>
  issues.find((issue) => issue.path[0] === path);

describe('contactSchema', () => {
  it('passes with a valid, complete input', () => {
    const result = contactSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('passes when projectType is omitted', () => {
    const result = contactSchema.safeParse({
      ...validInput,
      projectType: undefined,
    });
    expect(result.success).toBe(true);
  });

  it('passes when projectType is an empty string (preprocessed to undefined)', () => {
    const result = contactSchema.safeParse({
      ...validInput,
      projectType: '',
    });
    expect(result.success).toBe(true);
  });

  it.each(['website', 'traffic-leads', 'other'] as const)(
    'passes with a valid projectType of %s',
    (projectType) => {
      const result = contactSchema.safeParse({ ...validInput, projectType });
      expect(result.success).toBe(true);
    }
  );

  it('fails with an invalid projectType enum value', () => {
    const result = contactSchema.safeParse({
      ...validInput,
      projectType: 'invalid-type',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'projectType');
      expect(issue).toBeDefined();
      expect(issue?.message).toMatch(/invalid enum value/i);
    }
  });

  it('fails when name is missing', () => {
    const { name: _, ...inputWithoutName } = validInput;
    const result = contactSchema.safeParse(inputWithoutName);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'name');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Required');
    }
  });

  it('fails when name is an empty string', () => {
    const result = contactSchema.safeParse({
      ...validInput,
      name: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'name');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Name required');
    }
  });

  it('fails when name has fewer than 2 characters', () => {
    const result = contactSchema.safeParse({
      ...validInput,
      name: 'J',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'name');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Name required');
    }
  });

  it('passes when name has exactly 2 characters', () => {
    const result = contactSchema.safeParse({
      ...validInput,
      name: 'Jo',
    });
    expect(result.success).toBe(true);
  });

  it('fails when email is missing', () => {
    const { email: _, ...inputWithoutEmail } = validInput;
    const result = contactSchema.safeParse(inputWithoutEmail);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'email');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Required');
    }
  });

  it.each(['', 'not-an-email', 'john@', '@example.com', 'john@example']) (
    'fails with an invalid email: %s',
    (email) => {
      const result = contactSchema.safeParse({
        ...validInput,
        email,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const issue = getIssueForPath(result.error.issues, 'email');
        expect(issue).toBeDefined();
        expect(issue?.message).toBe('Invalid email');
      }
    }
  );

  it('fails when message is missing', () => {
    const { message: _, ...inputWithoutMessage } = validInput;
    const result = contactSchema.safeParse(inputWithoutMessage);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'message');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Required');
    }
  });

  it('fails when message is an empty string', () => {
    const result = contactSchema.safeParse({
      ...validInput,
      message: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'message');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Message must be at least 20 characters');
    }
  });

  it('fails when message has fewer than 20 characters', () => {
    const result = contactSchema.safeParse({
      ...validInput,
      message: 'Too short',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'message');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Message must be at least 20 characters');
    }
  });

  it('passes when message has exactly 20 characters', () => {
    const result = contactSchema.safeParse({
      ...validInput,
      message: '12345678901234567890',
    });
    expect(result.success).toBe(true);
  });

  it('fails when _honeypot is filled', () => {
    const result = contactSchema.safeParse({
      ...validInput,
      _honeypot: 'bot-value',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, '_honeypot');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Bot detected');
    }
  });

  it('returns the parsed data with projectType as undefined when empty', () => {
    const result = contactSchema.safeParse({
      ...validInput,
      projectType: '',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.projectType).toBeUndefined();
    }
  });

  it('returns all expected error issues for a fully invalid object', () => {
    const result = contactSchema.safeParse({
      name: '',
      email: 'invalid',
      message: '',
      _honeypot: 'bot',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path[0]);
      expect(paths).toEqual(
        expect.arrayContaining(['name', 'email', 'message', '_honeypot'])
      );
      expect(result.error.issues.length).toBeGreaterThanOrEqual(4);
    }
  });
});
