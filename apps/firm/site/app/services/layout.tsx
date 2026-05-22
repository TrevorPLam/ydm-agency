import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services - Your Dedicated Marketer",
  description: "Complete marketing operating system built around your website. Custom web design, SEO, content, social media, email, and analytics—all transparent, no lock-in.",
  keywords: ["web design services", "SEO services", "digital marketing", "content marketing", "brand identity", "CRM management"],
  openGraph: {
    title: "Services - Your Dedicated Marketer",
    description: "Complete marketing operating system built around your website. Custom web design, SEO, content, social media, email, and analytics.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
