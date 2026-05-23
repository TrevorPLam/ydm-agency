import Link from 'next/link'

export function HeroText() {
  return (
    <div className="relative z-10 flex flex-col items-center text-center px-4 pt-32 pb-20">
      <div className="max-w-3xl space-y-6 p-8 md:p-12 rounded-2xl
        bg-[var(--surface-2)] 
        backdrop-blur-[18px] backdrop-saturate-180
        border border-[var(--border-subtle)]
        shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
        
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight animate-text-reveal">
          Web Design That Builds Your Business
          <br />
          <span className="text-[var(--accent)]">—Without the Agency Nonsense.</span>
        </h1>
        <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto">
          Custom websites, transparent SEO, and analytics tied to your revenue.
          No generic AI fluff, no vanity metrics, no creepy tracking.
          Just a dedicated marketer in your corner.
        </p>
        <div className="flex gap-4 justify-center pt-4 flex-wrap">
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white rounded-lg font-medium transition-all hover:shadow-[0_0_28px_rgba(0,128,255,0.45)] active:scale-[0.97]">
            Start With a Free Consultation
          </Link>
          <Link href="#work" className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-subtle)] hover:border-[var(--accent)] text-white rounded-lg font-medium transition-all">
            See Real Work, Real Results
          </Link>
        </div>
      </div>
    </div>
  )
}
