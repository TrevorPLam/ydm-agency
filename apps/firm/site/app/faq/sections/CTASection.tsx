import { Card, Button } from "@agency/ui"
import { MessageSquare, Calendar } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)]">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-black border-2 border-[var(--accent)] p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-orbitron">Still have a question? Let's talk.</h2>
          <p className="text-gray-400 mb-8 font-inter max-w-2xl mx-auto">
            If something wasn't covered here, I'm happy to answer directly. Use the chat, send an email, or book a free 15-minute Q&A call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-base px-8">
              Start Chat
              <MessageSquare className="ml-2 h-4 w-4" />
            </Button>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white text-base px-8">
                Book a Quick Call
                <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </section>
  )
}
