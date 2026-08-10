/**
 * FILE: PrintButton.tsx
 * PURPOSE: Provides a client-side button that triggers the browser's print dialog for the current lesson page.
 * ARCHITECTURE: Client component calling window.print() on click; styled with the no-print class so it is hidden in the printed output.
 * KEY RULES: Must be hidden in print output (no-print class); must provide an aria-label for accessibility.
 * DEPENDS ON: react, lucide-react (Printer).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
'use client';

import { Printer } from 'lucide-react';

/**
 * WHAT IT DOES: Renders a button that triggers window.print() to print the current lesson page.
 * @return {JSX.Element} - Rendered print button (hidden in print output)
 * SIDE EFFECTS: Calls window.print() on click.
 * ASSUMES: The print.css stylesheet hides non-essential elements when printing.
 */
export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 text-accent hover:text-accent-hover transition-colors no-print"
      aria-label="Print this lesson"
    >
      <Printer className="w-4 h-4" />
      Print
    </button>
  );
}
