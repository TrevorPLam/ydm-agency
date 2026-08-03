import { describe, it, expect } from 'vitest';
import { leadCaptureSchema } from './lead-schema';

const validInput = {
  fullName: 'John Doe',
  email: 'john@example.com',
  companyName: 'Acme Inc.',
  budget: '$5,000 - $10,000',
  message: 'I need more leads for my B2B SaaS company and want a complete audit of my current funnel.',
};

const getIssueForPath = (issues: { path: (string | number)[]; message: string }[], path: string) =>
  issues.find((issue) => issue.path[0] === path);

describe('leadCaptureSchema', () => {
  it('passes with a valid, complete input', () => {
    const result = leadCaptureSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('passes when companyName is omitted', () => {
    const { companyName: _, ...inputWithoutCompany } = validInput;
    const result = leadCaptureSchema.safeParse(inputWithoutCompany);
    expect(result.success).toBe(true);
  });

  it('passes when budget is omitted', () => {
    const { budget: _, ...inputWithoutBudget } = validInput;
    const result = leadCaptureSchema.safeParse(inputWithoutBudget);
    expect(result.success).toBe(true);
  });

  it('passes when companyName and budget are omitted', () => {
    const result = leadCaptureSchema.safeParse({
      fullName: validInput.fullName,
      email: validInput.email,
      message: validInput.message,
    });
    expect(result.success).toBe(true);
  });

  it.each(['Under $5,000', '$5,000 - $10,000', '$10,000 - $25,000', '$25,000+', ''])(
    'passes with any string budget value, including "%s"',
    (budget) => {
      const result = leadCaptureSchema.safeParse({ ...validInput, budget });
      expect(result.success).toBe(true);
    }
  );

  it('passes when companyName is an empty string', () => {
    const result = leadCaptureSchema.safeParse({
      ...validInput,
      companyName: '',
    });
    expect(result.success).toBe(true);
  });

  it('fails when fullName is missing', () => {
    const { fullName: _, ...inputWithoutFullName } = validInput;
    const result = leadCaptureSchema.safeParse(inputWithoutFullName);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'fullName');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Required');
    }
  });

  it('fails when fullName is an empty string', () => {
    const result = leadCaptureSchema.safeParse({
      ...validInput,
      fullName: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'fullName');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Name is required');
    }
  });

  it('fails when fullName has fewer than 2 characters', () => {
    const result = leadCaptureSchema.safeParse({
      ...validInput,
      fullName: 'J',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'fullName');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Name is required');
    }
  });

  it('passes when fullName has exactly 2 characters', () => {
    const result = leadCaptureSchema.safeParse({
      ...validInput,
      fullName: 'Jo',
    });
    expect(result.success).toBe(true);
  });

  it('fails when email is missing', () => {
    const { email: _, ...inputWithoutEmail } = validInput;
    const result = leadCaptureSchema.safeParse(inputWithoutEmail);
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
      const result = leadCaptureSchema.safeParse({
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

  it('fails when message is missing', () => {
    const { message: _, ...inputWithoutMessage } = validInput;
    const result = leadCaptureSchema.safeParse(inputWithoutMessage);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'message');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Required');
    }
  });

  it('fails when message is an empty string', () => {
    const result = leadCaptureSchema.safeParse({
      ...validInput,
      message: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'message');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Message must be at least 10 characters');
    }
  });

  it('fails when message has fewer than 10 characters', () => {
    const result = leadCaptureSchema.safeParse({
      ...validInput,
      message: 'Too short',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = getIssueForPath(result.error.issues, 'message');
      expect(issue).toBeDefined();
      expect(issue?.message).toBe('Message must be at least 10 characters');
    }
  });

  it('passes when message has exactly 10 characters', () => {
    const result = leadCaptureSchema.safeParse({
      ...validInput,
      message: '1234567890',
    });
    expect(result.success).toBe(true);
  });

  it('returns the parsed data with optional fields as provided', () => {
    const result = leadCaptureSchema.safeParse(validInput);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.fullName).toBe(validInput.fullName);
      expect(result.data.email).toBe(validInput.email);
      expect(result.data.companyName).toBe(validInput.companyName);
      expect(result.data.budget).toBe(validInput.budget);
      expect(result.data.message).toBe(validInput.message);
    }
  });

  it('returns all expected error issues for a fully invalid object', () => {
    const result = leadCaptureSchema.safeParse({
      fullName: '',
      email: 'invalid',
      message: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path[0]);
      expect(paths).toEqual(expect.arrayContaining(['fullName', 'email', 'message']));
      expect(result.error.issues.length).toBeGreaterThanOrEqual(3);
    }
  });
});
