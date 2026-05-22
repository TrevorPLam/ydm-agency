import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ - Your Dedicated Marketer",
  description: "Honest answers to your questions about web design, SEO, pricing, and working with a dedicated marketing partner. No spin, no jargon.",
}

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
