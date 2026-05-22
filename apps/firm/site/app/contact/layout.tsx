import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Your Dedicated Marketer",
  description: "Get in touch for a free consultation. You'll reach me directly—no forms that vanish into a ticket queue.",
  keywords: ["contact", "get in touch", "consultation", "dedicated marketer"],
  openGraph: {
    title: "Contact - Your Dedicated Marketer",
    description: "Get in touch for a free consultation. You'll reach me directly.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
