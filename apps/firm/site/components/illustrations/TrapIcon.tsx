export function TrapIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h18M3 17h18M7 3v18M17 3v18" />
      <circle cx="12" cy="12" r="3" strokeDasharray="2 2" />
    </svg>
  )
}
