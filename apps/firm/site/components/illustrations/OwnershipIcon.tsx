export function OwnershipIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" />
      <path d="M12 22V12" />
      <path d="M12 12L3 7" />
      <path d="M12 12l9-5" />
      <path d="M12 2v10" />
    </svg>
  )
}
