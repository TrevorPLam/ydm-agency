'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, type ContactFormData } from './validation-schema'

export function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = (data: ContactFormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Name" />
      {errors.name && <span>{errors.name.message}</span>}
      <input {...register('email')} type="email" placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}
      <textarea {...register('message')} placeholder="Message" />
      {errors.message && <span>{errors.message.message}</span>}
      <button type="submit">Submit</button>
    </form>
  )
}
