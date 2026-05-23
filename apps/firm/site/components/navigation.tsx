'use client'

import { Menu, X, Zap } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null)
  const lastMenuItemRef = useRef<HTMLAnchorElement>(null)

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Focus management
  useEffect(() => {
    if (isMobileMenuOpen) {
      firstMenuItemRef.current?.focus()
    } else {
      menuButtonRef.current?.focus()
    }
  }, [isMobileMenuOpen])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsMobileMenuOpen(false)
    }
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstMenuItemRef.current) {
        e.preventDefault()
        lastMenuItemRef.current?.focus()
      } else if (!e.shiftKey && document.activeElement === lastMenuItemRef.current) {
        e.preventDefault()
        firstMenuItemRef.current?.focus()
      }
    }
  }

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
          <button
            ref={menuButtonRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-[#B0B0B0] hover:text-white hover:bg-white/10 transition-colors"
            aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center px-4 py-2 bg-[#0080FF] hover:bg-[#0080FF]/90 text-white text-sm font-medium rounded-lg transition-all hover:shadow-[0_0_20px_rgba(0,128,255,0.35)]"
          >
            Book Consultation
          </Link>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile Menu */}
          <div
            id="mobile-menu"
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-[rgba(13,13,13,0.95)] backdrop-blur-xl border-l border-white/10 z-50 md:hidden transform transition-transform duration-300 ease-in-out"
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 id="mobile-menu-title" className="text-xl font-bold font-rajdhani text-white">
                  Menu
                </h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center p-2 rounded-lg text-[#B0B0B0] hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex-1 space-y-2">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'Services', href: '/services' },
                  { label: 'Portfolio', href: '/work' },
                  { label: 'About', href: '/about' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'Contact', href: '/contact' }
                ].map((item, index) => {
                  const isActive = pathname === item.href
                  const isFirst = index === 0
                  const isLast = index === 5
                  return (
                    <Link
                      key={item.href}
                      ref={isFirst ? firstMenuItemRef : isLast ? lastMenuItemRef : undefined}
                      href={item.href}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-[#0080FF]/20 text-[#0080FF]'
                          : 'text-[#B0B0B0] hover:bg-white/5 hover:text-white'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 bg-[#0080FF] hover:bg-[#0080FF]/90 text-white text-sm font-medium rounded-lg transition-all hover:shadow-[0_0_20px_rgba(0,128,255,0.35)]"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
