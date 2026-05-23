export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-linear-to-br from-black via-[var(--surface-3)] to-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,128,255,0.15),transparent_50%)]" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-5xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight font-orbitron leading-tight mb-8 overflow-hidden">
            <div className="animate-text-reveal">
              Marketing Shouldn't Be This Hard.
            </div>
            <div className="animate-text-reveal-delay-1 mt-4">
              <span className="text-[var(--accent)]">We're Here to Change That.</span>
            </div>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl font-inter leading-relaxed animate-text-reveal-delay-2">
            The industry is full of agencies that overpromise, underdeliver, and hide behind vanity metrics. Your Dedicated Marketer was built to be the opposite: transparent, human-led, and relentlessly focused on what actually grows your business.
          </p>
        </div>
      </div>
    </section>
  )
}
