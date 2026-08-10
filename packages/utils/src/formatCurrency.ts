/**
 * FILE: formatCurrency.ts
 * PURPOSE: Provides the formatCurrency() utility for formatting numeric amounts as localized currency strings.
 * ARCHITECTURE: Pure helper wrapping the Intl.NumberFormat API with en-US locale defaults.
 * KEY RULES: Must remain a pure function with no side effects; must default to USD when no currency is supplied.
 * DEPENDS ON: None (uses built-in Intl API).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

/**
 * WHAT IT DOES: Formats a numeric amount as a currency string using the en-US locale and the specified ISO 4217 currency code.
 * @param {number} amount - Numeric amount to format
 * @param {string} currency - ISO 4217 currency code (defaults to 'USD')
 * @return {string} - Localized currency-formatted string
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: The runtime supports the requested currency code via Intl.NumberFormat.
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}
