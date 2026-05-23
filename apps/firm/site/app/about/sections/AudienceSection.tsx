import { Card } from "@agency/ui"
import { HandDrawnCheck } from "@/components/illustrations"
import { audienceItems } from "../data/audienceItems"

export function AudienceSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">We Work Best With Businesses That...</h2>
        
        <Card className="bg-[var(--surface-2)] border border-white/10 p-8 md:p-12 hover:border-[var(--accent)]/50 transition-colors">
          <ul className="space-y-4">
            {audienceItems.map((item, index) => (
              <li key={index} className="flex items-start space-x-3">
                <HandDrawnCheck className="h-5 w-5 text-[var(--accent)] shrink-0 mt-0.5" />
                <span className="text-gray-300 font-inter">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  )
}
