import { Button } from "@agency/ui"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-black to-[var(--accent)]/20">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Ready to Grow Your Business?</h2>
        <p className="text-xl text-gray-400 mb-8 font-inter">
          Let's talk about how we can help you build a marketing engine that actually works.
        </p>
        <Link href="/contact">
          <Button size="lg" className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-base px-8">
            Book Your Free Strategy Call
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
