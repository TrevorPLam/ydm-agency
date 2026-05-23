import { Button } from "@agency/ui"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)]">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Want More Insights Like This?</h2>
        <p className="text-xl text-gray-400 mb-8 font-inter">
          Subscribe to get practical marketing tips delivered to your inbox. No spam, ever.
        </p>
        <Link href="/contact">
          <Button size="lg" className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-base px-8">
            Get in Touch
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
