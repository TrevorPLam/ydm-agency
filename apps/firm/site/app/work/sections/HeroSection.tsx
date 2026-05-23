import { AnimateOnScroll } from "@agency/ui"

export function HeroSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[var(--surface-3)] to-black">
      <div className="container mx-auto max-w-4xl text-center">
        <AnimateOnScroll>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-orbitron">
            Real Work, Real Results.
          </h1>
          <p className="text-xl text-gray-400 mb-6 font-inter max-w-3xl mx-auto">
            Every project below was built from a strategic brief, designed for conversion, and optimized for performance. Explore the case studies. Judge the work. Then let's talk about your business.
          </p>
          <p className="text-sm text-gray-500 font-inter">
            Projects labeled 'Concept/Demo' were self-initiated to demonstrate capability across industries. No client was involved. The strategy, design, and simulated results are all ours.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
