import { Card } from "@agency/ui"
import { Shield, CheckCircle2, FileCheck, Search, User, Award } from "lucide-react"

export function TrustStatementSection() {
  const trustPoints = [
    {
      icon: Shield,
      title: "Radical Transparency",
      description: "You'll always know what we're doing, why we're doing it, and what it costs."
    },
    {
      icon: FileCheck,
      title: "You Own Everything",
      description: "Your website, your data, your brand assets—they belong to you, period."
    },
    {
      icon: Search,
      title: "Metrics That Matter",
      description: "We report on leads, sales, and customer value—not vanity metrics."
    },
    {
      icon: User,
      title: "One Person, Full Accountability",
      description: "You work directly with me—the founder and strategist."
    }
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)]">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">Why Work With Us</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {trustPoints.map((point, index) => (
            <Card key={index} className="bg-black border border-white/10 p-6 hover:border-[var(--accent)] transition-colors rounded-2xl">
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <point.icon className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-rajdhani">{point.title}</h3>
              <p className="text-gray-400 text-sm font-inter">{point.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
