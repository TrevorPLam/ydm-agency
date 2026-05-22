import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Your Dedicated Marketer",
  description: "Learn about Your Dedicated Marketer - our philosophy, commitments, and why we're different from traditional agencies.",
  keywords: ["about", "marketing philosophy", "dedicated marketer", "anti-agency"],
  openGraph: {
    title: "About - Your Dedicated Marketer",
    description: "Learn about our philosophy, commitments, and why we're different from traditional agencies.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
