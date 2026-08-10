/**
 * FILE: jest-axe.d.ts
 * PURPOSE: Declare the minimal jest-axe module types used by the test suite.
 * ARCHITECTURE: test-utils type declarations, augments the jest-axe package for Vitest usage.
 * KEY RULES: Types must match the runtime API exposed by jest-axe.
 * DEPENDS ON: jest-axe, vitest (Assertion extension)
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

declare module 'jest-axe' {
  export interface AxeResults {
    violations: unknown[];
    incomplete: unknown[];
    passes: unknown[];
    inapplicable: unknown[];
  }

  /**
   * WHAT IT DOES: Runs axe-core accessibility checks on the provided element and returns the results.
   * @param {Element} element – the DOM element to audit
   * @param {Record<string, unknown>} [options] – optional axe configuration
   * @return {Promise<AxeResults>} – the audit results
   * SIDE EFFECTS: None
   * ASSUMES: The element is attached to a document when needed.
   */
  export function axe(
    element: Element,
    options?: Record<string, unknown>,
  ): Promise<AxeResults>;

  export const toHaveNoViolations: {
    /**
     * WHAT IT DOES: Determines whether an axe run produced zero accessibility violations.
     * @param {AxeResults} received – the axe results to evaluate
     * @return {{ pass: boolean; message: () => string }} – matcher result for Vitest
     * SIDE EFFECTS: None
     * ASSUMES: received contains a valid violations array.
     */
    toHaveNoViolations(
      this: unknown,
      received: AxeResults,
    ): { pass: boolean; message: () => string };
  };
}
