import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Your Dedicated Marketer",
  description: "Actionable insights and practical advice for growing your business without industry jargon.",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
