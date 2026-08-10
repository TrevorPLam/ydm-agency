/**
 * FILE: format.ts
 * PURPOSE: Provide locale-aware date and currency formatting helpers for the monorepo.
 * ARCHITECTURE: web-core utility library, uses Intl.NumberFormat and Date.toLocaleDateString.
 * KEY RULES: Always format in en-US; currency defaults to USD.
 * DEPENDS ON: None
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

/**
 * WHAT IT DOES: Formats a date string or Date object into a long en-US date.
 * @param {Date | string} date – an ISO date string or Date instance
 * @return {string} – a human-readable date such as 'January 15, 2024'
 * SIDE EFFECTS: None
 * ASSUMES: date is a valid date string or Date.
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * WHAT IT DOES: Formats a number as a localized currency string.
 * @param {number} amount – the monetary value
 * @param {string} [currency] – ISO 4217 currency code, defaults to 'USD'
 * @return {string} – the formatted currency string
 * SIDE EFFECTS: None
 * ASSUMES: amount is a finite number; currency is a supported code.
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}
