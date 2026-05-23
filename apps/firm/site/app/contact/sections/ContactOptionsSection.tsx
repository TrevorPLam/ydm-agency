import { Card, Button } from "@agency/ui"
import { contactOptions } from "../data/contactOptions"
import Link from "next/link"

export function ContactOptionsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)]">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">Prefer Another Way? You've Got Options.</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {contactOptions.map((option, index) => (
            <Card key={index} className={`bg-${index === 0 ? '[var(--surface-3)]' : 'black'} border border-white/10 p-8 hover:border-[var(--accent)] transition-all hover:scale-105 ${option.span} rounded-2xl`}>
              <div className="flex items-start justify-between mb-6">
                <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                  <option.icon className="h-6 w-6 text-[var(--accent)]" />
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${option.available ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
                  <span className={`text-xs ${option.available ? 'text-green-500' : 'text-gray-500'} font-medium`}>{option.available ? 'Available' : 'Offline'}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 font-rajdhani">{option.title}</h3>
              <p className="text-gray-400 mb-6 font-inter">
                {option.description}
              </p>
              {option.buttonText && (
                <Link href="/contact">
                  <Button variant="outline" className="w-full border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white">
                    {option.buttonText}
                  </Button>
                </Link>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
