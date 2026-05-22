'use client'

import { useScroll, useTransform, motion } from 'motion/react'
import { useRef } from 'react'
import { Palette, FileText, Mail, Share2, Users, CreditCard, Search, TrendingUp, Shield } from 'lucide-react'
import { AnimateOnScroll } from '@agency/ui'

export function MarketingPartnerStrip() {
  const parallaxRef = useRef<HTMLDivElement>(null!)
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['3%', '-3%'])

  return (
    <section ref={parallaxRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121212] overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">Beyond the Build: A Complete Marketing Partner.</h2>
        </AnimateOnScroll>
        
        <motion.div style={{ x }} className="flex gap-8 justify-center flex-wrap mt-12">
          <div className="flex flex-col items-center text-center">
            <Palette className="h-8 w-8 text-[#0080FF] mb-2" />
            <span className="text-xs font-medium">Brand Identity</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <FileText className="h-8 w-8 text-[#0080FF] mb-2" />
            <span className="text-xs font-medium">Blog & Resources</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Mail className="h-8 w-8 text-[#0080FF] mb-2" />
            <span className="text-xs font-medium">Email Marketing</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Share2 className="h-8 w-8 text-[#0080FF] mb-2" />
            <span className="text-xs font-medium">Social Media</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Users className="h-8 w-8 text-[#0080FF] mb-2" />
            <span className="text-xs font-medium">CRM Management</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <CreditCard className="h-8 w-8 text-[#0080FF] mb-2" />
            <span className="text-xs font-medium">PPC & Paid Media</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Search className="h-8 w-8 text-[#0080FF] mb-2" />
            <span className="text-xs font-medium">SEO & AIEO</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <TrendingUp className="h-8 w-8 text-[#0080FF] mb-2" />
            <span className="text-xs font-medium">Analytics & CRO</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Shield className="h-8 w-8 text-[#0080FF] mb-2" />
            <span className="text-xs font-medium">Reputation</span>
          </div>
        </motion.div>

        <div className="text-center mt-8">
          <a href="/services" className="text-[#0080FF] hover:text-[#0080FF]/80 text-sm font-medium">
            Explore all services
          </a>
        </div>
      </div>
    </section>
  )
}
