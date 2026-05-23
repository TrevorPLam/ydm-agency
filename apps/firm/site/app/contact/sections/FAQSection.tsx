import { Card } from "@agency/ui"
import { ChevronDown, ChevronUp } from "lucide-react"
import { faqs } from "../data/faqs"

interface FAQSectionProps {
  openFaq: number | null
  toggleFaq: (index: number) => void
}

export function FAQSection({ openFaq, toggleFaq }: FAQSectionProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)]">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">Common Questions</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index
            return (
              <Card key={index} className="bg-black border border-white/10">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <span className="font-semibold font-rajdhani">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-[var(--accent)]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-400 font-inter">{faq.answer}</p>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
