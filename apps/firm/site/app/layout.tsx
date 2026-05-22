import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexus Agency - Digital Marketing Excellence",
  description: "Transform your brand with data-driven digital marketing strategies. We deliver measurable results through innovative SEO, content, and performance marketing solutions.",
  keywords: ["digital marketing", "SEO", "content marketing", "brand strategy", "performance marketing", "social media", "web design"],
  authors: [{ name: "Nexus Agency" }],
  openGraph: {
    title: "Nexus Agency - Digital Marketing Excellence",
    description: "Transform your brand with data-driven digital marketing strategies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Agency - Digital Marketing Excellence",
    description: "Transform your brand with data-driven digital marketing strategies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
