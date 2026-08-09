declare module 'jest-axe' {
  export interface AxeResults {
    violations: unknown[];
    incomplete: unknown[];
    passes: unknown[];
    inapplicable: unknown[];
  }

  export function axe(
    element: Element,
    options?: Record<string, unknown>,
  ): Promise<AxeResults>;

  export const toHaveNoViolations: {
    toHaveNoViolations(
      this: unknown,
      received: AxeResults,
    ): { pass: boolean; message: () => string };
  };
}
