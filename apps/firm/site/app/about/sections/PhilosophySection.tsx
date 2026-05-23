import { Card } from "@agency/ui"
import { HandDrawnCheck } from "@/components/illustrations"
import { philosophyAIItems } from "../data/philosophyAIItems"
import { philosophyHumanItems } from "../data/philosophyHumanItems"

export function PhilosophySection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)]">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">Technology Is a Tool. Humans Are the Strategy.</h2>
        
        <div className="text-center mb-12">
          <p className="text-xl text-gray-300 max-w-4xl mx-auto font-inter">
            We believe the best marketing comes from a tight collaboration between human creativity, empathy, and strategic judgment—and the speed and analytical power of AI. We use AI as an accelerator, never as a replacement for the thinking, feeling, and nuanced decision-making that only a human can provide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-black border border-white/10 p-8 hover:border-[var(--accent)]/50 transition-colors">
            <h3 className="text-xl font-bold mb-6 font-rajdhani text-[var(--accent)]">What AI Does Here</h3>
            <ul className="space-y-3">
              {philosophyAIItems.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <HandDrawnCheck className="h-5 w-5 text-[var(--accent)] shrink-0 mt-0.5" />
                  <span className="text-gray-300 font-inter">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="bg-black border border-white/10 p-8 hover:border-[var(--accent)]/50 transition-colors">
            <h3 className="text-xl font-bold mb-6 font-rajdhani text-[var(--accent)]">What Humans Do Here</h3>
            <ul className="space-y-3">
              {philosophyHumanItems.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <HandDrawnCheck className="h-5 w-5 text-[var(--accent)] shrink-0 mt-0.5" />
                  <span className="text-gray-300 font-inter">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}
