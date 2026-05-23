import { Button } from "@agency/ui"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-black to-[var(--accent)]/20">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Let's Leave the Agency Nonsense Behind.</h2>
        <p className="text-xl text-gray-400 mb-8 font-inter">
          If you're looking for a marketing partner who takes full accountability, tells you the truth, and obsesses over your growth—let's talk. Free 30-minute strategy call, no pressure, no pitch deck.
        </p>
        <Link href="/contact">
          <Button size="lg" className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-base px-8 mb-4">
            Book Your Free Strategy Call
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <p className="text-gray-400 text-sm font-inter">
          Prefer to write? Send me a message directly—I read every one.
        </p>
      </div>
    </section>
  )
}
