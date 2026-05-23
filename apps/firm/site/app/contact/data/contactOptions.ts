import { Calendar, Mail, MessageSquare } from "lucide-react"

export const contactOptions = [
  {
    icon: Calendar,
    title: "Book a Call Directly",
    description: "Skip the back-and-forth. Grab a time that works for you on my calendar. Free 30-minute strategy call, no pressure.",
    buttonText: "Book Your Free Call",
    available: true,
    span: "md:col-span-2"
  },
  {
    icon: Mail,
    title: "Write Me Directly",
    description: "If you prefer to email, reach me at hello@yourdedicatedmarketer.com. It comes straight to my inbox—not a shared team mailbox.",
    buttonText: null,
    available: true,
    span: ""
  },
  {
    icon: MessageSquare,
    title: "Real-Time Chat",
    description: "Look for the chat icon in the bottom corner. If I'm available, I'll answer live. If not, leave a message and I'll get back to you quickly.",
    buttonText: null,
    available: false,
    span: ""
  }
]
