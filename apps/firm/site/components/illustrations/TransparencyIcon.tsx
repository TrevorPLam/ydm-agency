export function TransparencyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
      <path d="M2 7l10 5 10-5" />
      <path d="M12 17V12" />
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  )
}
