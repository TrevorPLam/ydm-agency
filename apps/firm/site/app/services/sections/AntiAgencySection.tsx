import { Card } from "@agency/ui"
import { antiAgencyPoints } from "../data/antiAgencyPoints"

export function AntiAgencySection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-[var(--surface-2)] border-l-4 border-l-[var(--accent)] border-y border-r border-white/10 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 font-orbitron">Why Work With Me — The Anti-Agency Difference</h2>
          <div className="space-y-6">
            {antiAgencyPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                  <point.icon className="h-6 w-6 text-[var(--accent)]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-rajdhani">{point.title}</h3>
                  <p className="text-gray-400 font-inter">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
