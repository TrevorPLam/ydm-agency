import { Card } from "@agency/ui"

export function TestimonialSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)]">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-black border-l-4 border-l-[var(--accent)] border-y border-r border-white/10 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 font-orbitron">Building Our Success Stories</h2>
          <p className="text-gray-300 font-inter leading-relaxed">
            We're building our library of client success stories right now. In the meantime, the demos above represent the same strategic rigor and design quality you'll receive. Want to be our first case study? Let's make it a good one.
          </p>
        </Card>
      </div>
    </section>
  )
}
