import { Button } from "@agency/ui"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-[var(--accent)]/20">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Your Website Should Be Your Best Salesperson. Let's Make It Happen.</h2>
        <p className="text-xl text-gray-400 mb-8 font-inter">
          No confusing packages, no hidden fees, no pressure. Just a transparent conversation about how we can grow your business together.
        </p>
        <Button size="lg" className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-base px-8 mb-4">
          Book Your Free Strategy Call
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <p className="text-gray-400 text-sm font-inter">
          Or send me a message directly — I'll reply personally.
        </p>
      </div>
    </section>
  )
}
