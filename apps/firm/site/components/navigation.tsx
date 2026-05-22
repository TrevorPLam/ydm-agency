'use client'

import { Zap } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 h-16
      bg-[rgba(0,0,0,0.72)] 
      backdrop-blur-[20px] backdrop-saturate-200
      border-b border-[rgba(255,255,255,0.06)]
      transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex h-full items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-[#0080FF] flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold font-rajdhani">Your Dedicated Marketer</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: 'Portfolio', href: '/work' },
              { label: 'About', href: '/about' },
              { label: 'Blog', href: '/blog' },
              { label: 'Contact', href: '/contact' }
            ].map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? 'text-[#0080FF]' : 'text-[#B0B0B0] hover:text-[#0080FF]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center px-4 py-2 bg-[#0080FF] hover:bg-[#0080FF]/90 text-white text-sm font-medium rounded-lg transition-all hover:shadow-[0_0_20px_rgba(0,128,255,0.35)]"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </nav>
  )
}
