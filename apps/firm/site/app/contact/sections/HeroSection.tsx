import { MessageSquare } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-black via-[var(--surface-3)] to-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,128,255,0.1),transparent_50%)]" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 py-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-orbitron leading-tight">
          Let's Talk About Your Business.
        </h1>
        <p className="text-xl text-gray-400 max-w-4xl mx-auto font-inter">
          You'll reach me directly—no forms that vanish into a ticket queue, no "somebody will get back to you." Just a real conversation about how we can grow your business.
        </p>
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center animate-pulse">
            <MessageSquare className="h-6 w-6 text-[var(--accent)]" />
          </div>
        </div>
      </div>
    </section>
  )
}
