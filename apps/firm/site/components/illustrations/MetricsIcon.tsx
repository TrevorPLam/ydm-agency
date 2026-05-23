export function MetricsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20h18M5 16v-4M9 16v-8M13 16v-6M17 16v-10" />
      <circle cx="5" cy="12" r="1.5" fill="currentColor" />
      <circle cx="9" cy="8" r="1.5" fill="currentColor" />
      <circle cx="13" cy="10" r="1.5" fill="currentColor" />
      <circle cx="17" cy="6" r="1.5" fill="currentColor" />
    </svg>
  )
}
