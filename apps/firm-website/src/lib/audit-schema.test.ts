/**
 * FILE: audit-schema.test.ts
 * PURPOSE: Unit test the audit form Zod schema validation rules.
 * ARCHITECTURE: Vitest suite for audit-schema.ts; exercises field presence, formats, marketingState enum, and honeypot behavior.
 * KEY RULES: Tests must match the schema's exact error messages; every required and optional field must be covered.
 * DEPENDS ON: ./audit-schema, vitest
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import { describe, it, expect } from 'vitest';
import { auditFormSchema } from './audit-schema';

const validInput = {
  name: 'John Doe',
  email: 'john@example.com',
  website: 'https://example.com',
  challenge: 'I need more qualified leads and a clearer conversion path on my current site.',
  marketingState: 'traffic-no-leads' as const,
  _honeypot: '',
};

/**
 * WHAT IT DOES: Finds the first Zod issue whose path starts with the given top-level field name.
 * @param {Array<{ path: (string | number)[]; message: string }>} issues – Zod validation issues
 * @param {string} path – Top-level field name to search for
 * @return {{ path: (string | number)[]; message: string } | undefined} – Matching issue, if any
 * SIDE EFFECTS: None
 * ASSUMES: Issues are flattened and `path[0]` identifies the field name.
 */
const getIssueForPath = (issues: { path: (string | number)[]; message: string }[], path: string) =>
  issues.find((issue) => issue.path[0] === path);

describe('auditFormSchema', () => {
  it('passes with a valid, complete input', () => {
    const result = auditFormSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('returns the parsed data for a valid input', () => {
    const result = auditFormSchema.safeParse(validInput);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe(validInput.name);
      expect(result.data.email).toBe(validInput.email);
      expect(result.data.website).toBe(validInput.website);
      expect(result.data.challenge).toBe(validInput.challenge);
      expect(result.data.marketingState).toBe(validInput.marketingState);
      expect(result.data._honeypot).toBe('');
    }
  });

  it('passes when website is a plain domain without protocol', () => {
    const result = auditFormSchema.safeParse({
      ...validInput,
      website: 'example.com',
    });
    expect(result.success).toBe(true);
  });

  it('passes when website includes a subdomain', () => {
    const result = auditFormSchema.safeParse({
      ...validInput,
      website: 'www.example.com',
    });
    expect(result.success).toBe(true);
  });

  it('passes when website includes a path', () => {
    const result = auditFormSchema.safeParse({
      ...validInput,
      website: 'https://example.com/about',
    });
    expect(result.success).toBe(true);
  });

  it('passes when website uses http without the s protocol', () => {
    const result = auditFormSchema.safeParse({
      ...validInput,
      website: 'http://example.com',
    });
    expect(result.success).toBe(true);
  });

  it('fails when name is missing', () => {
    const { name: _, ...inputWithoutName } = validInput;
    const result = auditFormSchema.safeParse(inputWithoutName);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'name');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Required');
    }
  });

  it('fails when name is an empty string', () => {
    const result = auditFormSchema.safeParse({
      ...validInput,
      name: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'name');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Name is required');
    }
  });

  it('fails when name has fewer than 2 characters', () => {
    const result = auditFormSchema.safeParse({
      ...validInput,
      name: 'J',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'name');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Name is required');
    }
  });

  it('passes when name has exactly 2 characters', () => {
    const result = auditFormSchema.safeParse({
      ...validInput,
      name: 'Jo',
    });
    expect(result.success).toBe(true);
  });

  it('fails when email is missing', () => {
    const { email: _, ...inputWithoutEmail } = validInput;
    const result = auditFormSchema.safeParse(inputWithoutEmail);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'email');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Required');
    }
  });

  it.each(['', 'not-an-email', 'john@', '@example.com', 'john@example'])(
    'fails with an invalid email: %s',
    (email) => {
      const result = auditFormSchema.safeParse({
        ...validInput,
        email,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const issue = getIssueForPath(result.error.issues, 'email');
        expect(issue).toBeDefined();
        expect(issue?.message).toBe('Invalid email address');
      }
    }
  );

  it('fails when website is missing', () => {
    const { website: _, ...inputWithoutWebsite } = validInput;
    const result = auditFormSchema.safeParse(inputWithoutWebsite);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'website');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Required');
    }
  });

  it('fails when website is an empty string', () => {
    const result = auditFormSchema.safeParse({
      ...validInput,
      website: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'website');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Website is required');
    }
  });

  it('fails when website has fewer than 3 characters', () => {
    const result = auditFormSchema.safeParse({
      ...validInput,
      website: 'a.',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'website');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Website is required');
    }
  });

  it.each([
    'example',
    'http://',
    'https://',
    'example .com',
    ' example.com',
  ])('fails with an invalid website: %s', (website) => {
    const result = auditFormSchema.safeParse({
      ...validInput,
      website,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'website');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe(
        'Enter a valid website URL such as example.com or https://example.com'
      );
    }
  });

  it('passes when website has exactly 3 characters and a valid format', () => {
    const result = auditFormSchema.safeParse({
      ...validInput,
      website: 'a.b',
    });
    expect(result.success).toBe(true);
  });

  it('fails when challenge is missing', () => {
    const { challenge: _, ...inputWithoutChallenge } = validInput;
    const result = auditFormSchema.safeParse(inputWithoutChallenge);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'challenge');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Required');
    }
  });

  it('fails when challenge is an empty string', () => {
    const result = auditFormSchema.safeParse({
      ...validInput,
      challenge: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'challenge');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Describe your biggest challenge');
    }
  });

  it('fails when challenge has fewer than 10 characters', () => {
    const result = auditFormSchema.safeParse({
      ...validInput,
      challenge: 'Too short',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'challenge');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Describe your biggest challenge');
    }
  });

  it('passes when challenge has exactly 10 characters', () => {
    const result = auditFormSchema.safeParse({
      ...validInput,
      challenge: '1234567890',
    });
    expect(result.success).toBe(true);
  });

  it('fails when marketingState is missing', () => {
    const { marketingState: _, ...inputWithoutMarketingState } = validInput;
    const result = auditFormSchema.safeParse(inputWithoutMarketingState);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'marketingState');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Required');
    }
  });

  it.each([
    'no-website',
    'website-no-traffic',
    'traffic-no-leads',
    'leads-now',
    'automation-mess',
    'unsure',
  ] as const)('passes with a valid marketingState of %s', (marketingState) => {
    const result = auditFormSchema.safeParse({
      ...validInput,
      marketingState,
    });
    expect(result.success).toBe(true);
  });

  it('fails with an invalid marketingState enum value', () => {
    const result = auditFormSchema.safeParse({
      ...validInput,
      marketingState: 'unknown-state',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'marketingState');
      expect(issue).toBeDefined();
      expect(issue?.message).toMatch(/invalid enum value/i);
    }
  });

  it('fails when _honeypot is filled', () => {
    const result = auditFormSchema.safeParse({
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

  it('fails when _honeypot is missing', () => {
    const { _honeypot: _, ...inputWithoutHoneypot } = validInput;
    const result = auditFormSchema.safeParse(inputWithoutHoneypot);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, '_honeypot');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Required');
    }
  });

  it('returns all expected error issues for a fully invalid object', () => {
    const result = auditFormSchema.safeParse({
      name: '',
      email: 'invalid',
      website: '',
      challenge: '',
      marketingState: 'invalid',
      _honeypot: 'bot',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path[0]);
      expect(paths).toEqual(
        expect.arrayContaining([
          'name',
          'email',
          'website',
          'challenge',
          'marketingState',
          '_honeypot',
        ])
      );
      expect(result.error.issues.length).toBeGreaterThanOrEqual(6);
    }
  });
});
