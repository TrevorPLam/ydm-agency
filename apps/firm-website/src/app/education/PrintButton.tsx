'use client';

import { Printer } from 'lucide-react';

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
