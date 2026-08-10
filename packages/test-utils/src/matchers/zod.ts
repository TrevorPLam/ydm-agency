/**
 * FILE: zod.ts
 * PURPOSE: Provide a custom Vitest matcher for asserting the presence of Zod validation issues.
 * ARCHITECTURE: test-utils custom matcher, compares received issue paths and optional messages.
 * KEY RULES: Returns pass/message/actual/expected shape required by Vitest matchers; must also augment the vitest Assertion interface.
 * DEPENDS ON: vitest
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

interface ZodIssueLike {
  path: (string | number)[];
  message: string;
}

/**
 * WHAT IT DOES: Checks whether a Zod issue exists at the given path with the expected message.
 * @param {ZodIssueLike[] | { issues: ZodIssueLike[] }} received – array of issues or a ZodError-like object
 * @param {string | number} path – the first path segment to search for
 * @param {string} [expectedMessage] – optional exact message to match
 * @return {{ pass: boolean; message: () => string; actual: ZodIssueLike | undefined; expected: unknown }} – Vitest matcher result
 * SIDE EFFECTS: None
 * ASSUMES: received is an array or has an issues array; issues contain at least one path segment.
 */
export function toHaveZodIssue(
  received: ZodIssueLike[] | { issues: ZodIssueLike[] },
  path: string | number,
  expectedMessage?: string,
): { pass: boolean; message: () => string; actual: ZodIssueLike | undefined; expected: unknown } {
  const issues = Array.isArray(received) ? received : received.issues;
  const issue = issues.find((i) => i.path[0] === path);
  const hasIssue = issue !== undefined;
  const messageMatch =
    expectedMessage === undefined || (issue !== undefined && issue.message === expectedMessage);

  return {
    pass: hasIssue && messageMatch,
    message: () => {
      if (!hasIssue) {
        return `Expected to find Zod issue at path "${path}" but none was found. Issues: ${JSON.stringify(issues)}`;
      }
      if (!messageMatch) {
        return `Expected Zod issue at path "${path}" to have message "${expectedMessage}", but got "${issue.message}"`;
      }
      return `Expected not to find Zod issue at path "${path}" with message "${expectedMessage}"`;
    },
    actual: issue,
    expected: { path, expectedMessage },
  };
}

declare module 'vitest' {
  interface Assertion<T = any> {
    toHaveZodIssue(path: string | number, expectedMessage?: string): T;
  }
}
