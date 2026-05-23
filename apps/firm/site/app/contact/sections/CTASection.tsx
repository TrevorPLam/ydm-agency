import { Button } from "@agency/ui"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-black to-[var(--accent)]/20">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Need Something Urgent? Use the Chat.</h2>
        <p className="text-xl text-gray-400 mb-8 font-inter">
          If you're up against a deadline or have a quick question, the live chat is your fastest path. I'll answer if I'm at my desk.
        </p>
        <Button size="lg" className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-base px-8">
          Start Chat
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}
