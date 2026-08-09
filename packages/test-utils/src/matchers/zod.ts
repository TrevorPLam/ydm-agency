interface ZodIssueLike {
  path: (string | number)[];
  message: string;
}

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
