import { Card } from "@agency/ui"
import { AnimateOnScroll } from "@agency/ui"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { portfolioItems } from "../data/portfolioItems"

export function PortfolioSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)]">
      <div className="container mx-auto max-w-6xl">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Recent Work</h2>
          <p className="text-gray-400 mb-12 font-inter max-w-3xl">
            Real results for real businesses. Every project is custom-built from strategy, not templates.
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <AnimateOnScroll key={index} delay={index * 100}>
              <Card className="bg-black border border-white/10 p-6 hover:border-[var(--accent)] transition-colors rounded-2xl">
                <div className="text-sm text-[var(--accent)] font-medium mb-2">{item.industry}</div>
                <h3 className="text-xl font-bold mb-2 font-rajdhani">{item.name}</h3>
                <div className="text-2xl font-bold text-[var(--accent)] mb-3 font-rajdhani">{item.result}</div>
                <p className="text-gray-400 text-sm mb-4 font-inter">{item.description}</p>
                <Link href="/work" className="text-[var(--accent)] hover:text-[var(--accent)]/80 text-sm font-medium inline-flex items-center">
                  View Case Study <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
