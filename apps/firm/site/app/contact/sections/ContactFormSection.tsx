import { Card, Button } from "@agency/ui"
import { ArrowRight, Mail, Phone, MessageSquare, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"

interface ContactFormSectionProps {
  formData: {
    name: string
    email: string
    company: string
    interest: string
    message: string
    preferredContact: string
  }
  touched: {
    name: boolean
    email: boolean
    message: boolean
  }
  isEmailValid: boolean
  isNameValid: boolean
  isMessageValid: boolean
  progress: number
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleBlur: (field: string) => void
  setFormData: (data: any) => void
}

export function ContactFormSection({ 
  formData, 
  touched, 
  isEmailValid, 
  isNameValid, 
  isMessageValid, 
  progress,
  handleInputChange,
  handleBlur,
  setFormData 
}: ContactFormSectionProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-2xl">
        <Card className="bg-[var(--surface-2)] border-l-4 border-l-[var(--accent)] border-y border-r border-white/10 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-8 font-orbitron">Send Me a Message</h2>
          
          <form className="space-y-6">
            {/* Progress Indicator */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400 font-inter">Form Completion</span>
                <span className="text-sm font-medium text-[var(--accent)] font-inter">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-black rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[var(--accent)] transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Preferred Contact Method */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">Preferred Contact Method</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, preferredContact: 'email' }))}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md border transition-all ${
                    formData.preferredContact === 'email'
                      ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                      : 'bg-black border-white/20 text-gray-400 hover:border-white/40'
                  }`}
                >
                  <Mail className="h-4 w-4" />
                  <span className="text-sm font-medium">Email</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, preferredContact: 'phone' }))}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md border transition-all ${
                    formData.preferredContact === 'phone'
                      ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                      : 'bg-black border-white/20 text-gray-400 hover:border-white/40'
                  }`}
                >
                  <Phone className="h-4 w-4" />
                  <span className="text-sm font-medium">Phone</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, preferredContact: 'chat' }))}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md border transition-all ${
                    formData.preferredContact === 'chat'
                      ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                      : 'bg-black border-white/20 text-gray-400 hover:border-white/40'
                  }`}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm font-medium">Chat</span>
                </button>
              </div>
            </div>

            {/* Name Input with Floating Label */}
            <div className={`relative ${touched.name && !isNameValid ? 'animate-shake' : ''}`}>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={() => handleBlur('name')}
                placeholder=" "
                className={`w-full px-4 py-3 bg-black border rounded-md text-white focus:outline-none focus:ring-1 transition-colors peer ${
                  touched.name && !isNameValid
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : touched.name && isNameValid
                    ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                    : 'border-white/20 focus:border-[var(--accent)] focus:ring-[var(--accent)]'
                }`}
                required
              />
              <label
                htmlFor="name"
                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-[var(--accent)] peer-focus:bg-black peer-focus:px-1 peer-[&:not(:placeholder-shown)]:top-[-10px] peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[var(--accent)] peer-[&:not(:placeholder-shown)]:bg-black peer-[&:not(:placeholder-shown)]:px-1"
              >
                Full Name
              </label>
              {touched.name && formData.name && (
                <div className="absolute right-3 top-3">
                  {isNameValid ? (
                    <CheckCircle2 className={`h-5 w-5 text-green-500 ${touched.name && isNameValid ? 'animate-ripple' : ''}`} />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
              {touched.name && !isNameValid && (
                <p className="text-red-500 text-xs mt-1">Please enter at least 2 characters</p>
              )}
            </div>

            {/* Email Input with Floating Label */}
            <div className={`relative ${touched.email && !isEmailValid ? 'animate-shake' : ''}`}>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={() => handleBlur('email')}
                placeholder=" "
                className={`w-full px-4 py-3 bg-black border rounded-md text-white focus:outline-none focus:ring-1 transition-colors peer ${
                  touched.email && !isEmailValid
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : touched.email && isEmailValid
                    ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                    : 'border-white/20 focus:border-[var(--accent)] focus:ring-[var(--accent)]'
                }`}
                required
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-[var(--accent)] peer-focus:bg-black peer-focus:px-1 peer-[&:not(:placeholder-shown)]:top-[-10px] peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[var(--accent)] peer-[&:not(:placeholder-shown)]:bg-black peer-[&:not(:placeholder-shown)]:px-1"
              >
                Work Email
              </label>
              {touched.email && formData.email && (
                <div className="absolute right-3 top-3">
                  {isEmailValid ? (
                    <CheckCircle2 className={`h-5 w-5 text-green-500 ${touched.email && isEmailValid ? 'animate-ripple' : ''}`} />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
              {touched.email && !isEmailValid && (
                <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>
              )}
            </div>

            {/* Company Input with Floating Label */}
            <div className="relative">
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleInputChange}
                placeholder=" "
                className="w-full px-4 py-3 bg-black border border-white/20 rounded-md text-white focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors peer"
              />
              <label
                htmlFor="company"
                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-[var(--accent)] peer-focus:bg-black peer-focus:px-1 peer-[&:not(:placeholder-shown)]:top-[-10px] peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[var(--accent)] peer-[&:not(:placeholder-shown)]:bg-black peer-[&:not(:placeholder-shown)]:px-1"
              >
                Company / Website <span className="text-gray-500 font-normal">(optional)</span>
              </label>
            </div>

            {/* Interest Select with Floating Label */}
            <div className="relative">
              <select
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black border border-white/20 rounded-md text-white focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
              >
                <option value="">Select a topic...</option>
                <option value="web-design">Web Design / Redesign</option>
                <option value="seo">SEO & AIEO</option>
                <option value="brand">Brand Identity & Kit</option>
                <option value="blog">Blog & Content Management</option>
                <option value="social">Social Media Management</option>
                <option value="email">Newsletter & Email Marketing</option>
                <option value="crm">CRM & Automation</option>
                <option value="ppc">Paid Media (PPC)</option>
                <option value="analytics">Analytics & CRO</option>
                <option value="reputation">Reputation Management</option>
                <option value="partnership">Full Partnership Package</option>
                <option value="other">Something Else / Not Sure Yet</option>
              </select>
              <label htmlFor="interest" className="text-sm font-medium text-gray-300 block mb-2">
                What Are You Interested In? <span className="text-gray-500">(optional)</span>
              </label>
            </div>

            {/* Message Input with Floating Label */}
            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                onBlur={() => handleBlur('message')}
                placeholder=" "
                rows={5}
                className={`w-full px-4 py-3 bg-black border rounded-md text-white focus:outline-none focus:ring-1 transition-colors resize-none peer ${
                  touched.message && !isMessageValid
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : touched.message && isMessageValid
                    ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                    : 'border-white/20 focus:border-[var(--accent)] focus:ring-[var(--accent)]'
                }`}
                required
              />
              <label
                htmlFor="message"
                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-[var(--accent)] peer-focus:bg-black peer-focus:px-1 peer-[&:not(:placeholder-shown)]:top-[-10px] peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[var(--accent)] peer-[&:not(:placeholder-shown)]:bg-black peer-[&:not(:placeholder-shown)]:px-1"
              >
                Tell Me About Your Project or Goals
              </label>
              {touched.message && formData.message && (
                <div className="absolute right-3 top-3">
                  {isMessageValid ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
              {touched.message && !isMessageValid && (
                <p className="text-red-500 text-xs mt-1">Please enter at least 10 characters</p>
              )}
            </div>

            {/* Personal Reassurance Near Submit */}
            <div className="flex items-center gap-2 text-sm text-gray-400 bg-black/50 px-4 py-3 rounded-md border border-white/10">
              <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" />
              <span className="font-inter">I read every message personally</span>
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-base"
              disabled={!isNameValid || !isEmailValid || !isMessageValid}
            >
              Send Message
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 space-y-3">
            <p className="text-sm text-gray-400 font-inter">
              I read every message personally. No auto-responders, no canned replies. You'll hear back from me, usually within 24 hours on business days.
            </p>
            <p className="text-xs text-gray-500 font-inter">
              Your information is never shared, sold, or used for spam. I hate that too. <Link href="/privacy" className="text-[var(--accent)] hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}
