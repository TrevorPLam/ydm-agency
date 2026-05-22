import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio - Your Dedicated Marketer",
  description: "Real work, real results. Explore our portfolio of concept/demo projects showcasing web design, SEO, and full marketing systems across industries.",
  keywords: ["portfolio", "case studies", "web design projects", "demo sites", "marketing examples"],
  openGraph: {
    title: "Portfolio - Your Dedicated Marketer",
    description: "Real work, real results. Explore our portfolio of concept/demo projects.",
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
