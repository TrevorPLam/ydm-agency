import { Button } from "@agency/ui"
import { ArrowRight } from "lucide-react"
import { AnimateOnScroll } from "@agency/ui"

export function HeroSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[var(--surface-3)] to-black">
      <div className="container mx-auto max-w-4xl text-center">
        <AnimateOnScroll>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-orbitron leading-tight">
            A Complete Marketing Operating System,<br />
            <span className="text-[var(--accent)]">Built Around Your Website.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 font-inter max-w-3xl mx-auto">
            Your website is the hub. Everything else—SEO, content, social, email, ads, CRM—connects back to it. We build, launch, and orchestrate it all so you don't have to juggle five different vendors.
          </p>
          <Button size="lg" className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-base px-8">
            Book a Free Strategy Call
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
