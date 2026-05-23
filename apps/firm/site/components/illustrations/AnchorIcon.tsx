export function AnchorIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v10" />
      <path d="M8 12c0 3 2 5 4 5s4-2 4-5" />
      <path d="M8 12l-2 2" />
      <path d="M16 12l2 2" />
    </svg>
  )
}
