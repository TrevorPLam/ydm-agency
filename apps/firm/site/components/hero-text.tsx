import Link from 'next/link'

export function HeroText() {
  return (
    <div className="relative z-10 flex flex-col items-center text-center px-4 pt-32 pb-20 w-full">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight animate-text-reveal">
          <div className="overflow-hidden">
            <span className="block">Web Design That Builds Your Business</span>
          </div>
          <div className="overflow-hidden">
            <span className="block text-2xl md:text-3xl lg:text-4xl text-[var(--accent)]">—Without the Agency Nonsense.</span>
          </div>
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
          <Link href="#work" className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-subtle)] hover:border-[var(--accent)] text-white rounded-lg font-medium transition-all opacity-80 hover:opacity-100">
            See Real Work, Real Results
          </Link>
        </div>
      </div>
    </div>
  )
}
