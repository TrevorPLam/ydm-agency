import { Card, Button } from "@agency/ui"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { processSteps } from "../data/processSteps"

export function ProcessSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">From Demo to Your Business: The Same Rigor, Applied to You.</h2>
        <p className="text-gray-400 mb-12 font-inter max-w-3xl">
          The same strategic process that built these demos will build your website.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {processSteps.map((step, index) => (
            <Card key={index} className="bg-[var(--surface-2)] border border-white/10 p-6">
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <step.icon className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-rajdhani">{step.title}</h3>
              <p className="text-gray-400 font-inter">{step.description}</p>
            </Card>
          ))}
        </div>

        <Link href="/contact">
          <Button size="lg" className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-base px-8">
            Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
