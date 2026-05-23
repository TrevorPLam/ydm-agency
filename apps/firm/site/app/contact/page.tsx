"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "./sections/HeroSection"
import { ContactFormSection } from "./sections/ContactFormSection"
import { ContactOptionsSection } from "./sections/ContactOptionsSection"
import { TimelineSection } from "./sections/TimelineSection"
import { FAQSection } from "./sections/FAQSection"
import { CTASection } from "./sections/CTASection"
import { useState } from "react"

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: '',
    message: '',
    preferredContact: 'email'
  })
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  })

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validateName = (name: string) => {
    return name.trim().length >= 2
  }

  const validateMessage = (message: string) => {
    return message.trim().length >= 10
  }

  const isEmailValid = formData.email === '' || validateEmail(formData.email)
  const isNameValid = formData.name === '' || validateName(formData.name)
  const isMessageValid = formData.message === '' || validateMessage(formData.message)

  const requiredFields = ['name', 'email', 'message']
  const filledRequiredFields = requiredFields.filter(field => {
    if (field === 'name') return validateName(formData.name)
    if (field === 'email') return validateEmail(formData.email)
    if (field === 'message') return validateMessage(formData.message)
    return false
  }).length

  const progress = (filledRequiredFields / requiredFields.length) * 100

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <HeroSection />
      <ContactFormSection 
        formData={formData}
        touched={touched}
        isEmailValid={isEmailValid}
        isNameValid={isNameValid}
        isMessageValid={isMessageValid}
        progress={progress}
        handleInputChange={handleInputChange}
        handleBlur={handleBlur}
        setFormData={setFormData}
      />
      <ContactOptionsSection />
      <TimelineSection />
      <FAQSection 
        openFaq={openFaq}
        toggleFaq={toggleFaq}
      />
      <CTASection />
    </div>
  )
}
