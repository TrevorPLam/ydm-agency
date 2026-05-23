import { ChevronDown } from "lucide-react"
import * as Accordion from "@radix-ui/react-accordion"
import { AnimateOnScroll } from "@agency/ui"
import { faqs } from "../data/faqs"

export function FAQSection() {
  return (
    <div className="mt-24">
      <AnimateOnScroll>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Frequently Asked Questions</h2>
        <p className="text-gray-400 mb-12 font-inter">Common questions about pricing and packages</p>
      </AnimateOnScroll>

      <Accordion.Root type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <Accordion.Item key={index} value={`item-${index}`} className="bg-black border border-white/10 rounded-lg">
            <Accordion.Trigger className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors focus:outline-none">
              <span className="font-semibold font-rajdhani">{faq.question}</span>
              <ChevronDown className="h-5 w-5 text-[var(--accent)] transition-transform duration-200 data-[state=open]:rotate-180" />
            </Accordion.Trigger>
            <Accordion.Content className="px-6 pb-6 pt-0">
              <p className="text-gray-400 font-inter">{faq.answer}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  )
}
