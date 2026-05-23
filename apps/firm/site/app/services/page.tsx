"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "./sections/HeroSection"
import { WebDesignSection } from "./sections/WebDesignSection"
import { PricingSection } from "./sections/PricingSection"
import { FAQSection } from "./sections/FAQSection"
import { AddOnsSection } from "./sections/AddOnsSection"
import { AntiAgencySection } from "./sections/AntiAgencySection"
import { CTASection } from "./sections/CTASection"
import { useState } from "react"

export default function ServicesPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [expandedFeatures, setExpandedFeatures] = useState<{ [key: string]: boolean }>({})
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const toggleFeatures = (tier: string) => {
    setExpandedFeatures(prev => ({ ...prev, [tier]: !prev[tier] }))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <HeroSection />
      <WebDesignSection />
      
      {/* Monthly/Annual Toggle */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-12 mb-12">
        <div className="flex items-center justify-center">
          <div className="bg-black border border-white/10 rounded-full p-1 flex items-center">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-500 ease-spring ${
                !isAnnual
                  ? 'bg-[var(--accent)] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-500 ease-spring ${
                isAnnual
                  ? 'bg-[var(--accent)] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Annual
              <span className="ml-1 text-xs opacity-75">(Save 20%)</span>
            </button>
          </div>
        </div>
      </div>

      <PricingSection 
        isAnnual={isAnnual} 
        expandedFeatures={expandedFeatures} 
        toggleFeatures={toggleFeatures} 
      />
      <FAQSection />
      <AddOnsSection 
        hoveredCard={hoveredCard} 
        setHoveredCard={setHoveredCard} 
      />
      <AntiAgencySection />
      <CTASection />
    </div>
  )
}
