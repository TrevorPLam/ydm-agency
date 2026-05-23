export function StrategyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v9l6 3" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <path d="M12 6l3 3" />
      <path d="M12 18l-3-3" />
    </svg>
  )
}
