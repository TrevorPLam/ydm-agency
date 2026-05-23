export function GrowthIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20h16" />
      <path d="M4 16l4-8 4 6 4-10 4 8" />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      <circle cx="16" cy="6" r="1.5" fill="currentColor" />
    </svg>
  )
}
