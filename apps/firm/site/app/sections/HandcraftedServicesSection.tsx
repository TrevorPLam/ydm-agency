'use client'

import { useScroll, useTransform, motion } from 'motion/react'
import { useRef } from 'react'
import { ShieldIcon, GrowthIcon, SparkIcon, CompassIcon, ConnectionIcon, AnchorIcon } from '@/components/illustrations'

const services = [
  {
    icon: ShieldIcon,
    title: 'Custom Web Design',
    description: 'Not a template. Built from your brand, your audience, and your revenue goals.',
    rotation: -1,
    width: 'max-w-4xl',
    bgColor: 'bg-[#0a0a0a]',
    offset: 0
  },
  {
    icon: GrowthIcon,
    title: 'SEO & AIEO',
    description: 'Rank on Google and in AI. Ethical, content-led strategies that last.',
    rotation: 2,
    width: 'max-w-3xl',
    bgColor: 'bg-[#111]',
    offset: 40,
    marginLeft: 'ml-8'
  },
  {
    icon: SparkIcon,
    title: 'Analytics That Matter',
    description: 'Revenue-focused, not vanity metrics. Data you can actually use.',
    rotation: -2,
    width: 'max-w-2xl',
    bgColor: 'bg-[#1a1a1a]',
    offset: 70,
    marginRight: 'mr-8'
  },
  {
    icon: CompassIcon,
    title: 'Brand Identity',
    description: 'Cohesive visual systems that tell your story consistently.',
    rotation: 1,
    width: 'max-w-3xl',
    bgColor: 'bg-[#0a0a0a]',
    offset: 100,
    marginLeft: 'ml-12'
  },
  {
    icon: ConnectionIcon,
    title: 'Content Marketing',
    description: 'Content that builds authority and drives conversions, not filler.',
    rotation: -1.5,
    width: 'max-w-2xl',
    bgColor: 'bg-[#111]',
    offset: 130,
    marginRight: 'mr-12'
  },
  {
    icon: AnchorIcon,
    title: 'Email & CRM',
    description: 'Automated systems that nurture leads without feeling robotic.',
    rotation: 0.5,
    width: 'max-w-4xl',
    bgColor: 'bg-[#1a1a1a]',
    offset: 160
  }
]

export function HandcraftedServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ['start end', 'end start'] 
  })
  
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-35%'])
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '-55%'])
  const y4 = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])
  const y5 = useTransform(scrollYProgress, [0, 1], ['0%', '-45%'])
  const y6 = useTransform(scrollYProgress, [0, 1], ['0%', '-65%'])

  const transforms = [y1, y2, y3, y4, y5, y6]

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-[var(--surface-2)]">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-7xl font-handwritten text-center mb-24 text-[var(--accent)] leading-tight">
          What we actually do
        </h2>
        
        <div className="relative h-[250vh]">
          {services.map((service, index) => {
            const Icon = service.icon
            const y = transforms[index]
            
            return (
              <motion.div
                key={index}
                style={{ 
                  y,
                  top: `${service.offset}%`
                }}
                className="absolute left-0 right-0"
              >
                <div className={`${service.width} mx-auto ${service.marginLeft || ''} ${service.marginRight || ''}`}>
                  <div className={`${service.bgColor} border border-white/10 p-8 md:p-12 rounded-3xl transform shadow-2xl hover:border-[var(--accent)]/30 transition-colors`}
                    style={{ transform: `rotate(${service.rotation}deg)` }}
                  >
                    <div className="flex items-start gap-6">
                      <div className="h-16 w-16 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                        <Icon className="h-8 w-8 text-[var(--accent)]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold font-rajdhani mb-3">{service.title}</h3>
                        <p className="text-gray-400 font-inter text-lg">{service.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
