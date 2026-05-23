import type { Metadata } from "next";
import { Rajdhani, Orbitron, Inter, Caveat } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Your Dedicated Marketer - Web Design That Builds Your Business",
  description: "Custom websites, transparent SEO, and analytics tied to your revenue. No generic AI fluff, no vanity metrics, no creepy tracking. Just a dedicated marketer in your corner.",
  keywords: ["web design", "SEO", "analytics", "digital marketing", "revenue-focused marketing", "small business marketing"],
  authors: [{ name: "Your Dedicated Marketer" }],
  openGraph: {
    title: "Your Dedicated Marketer - Web Design That Builds Your Business",
    description: "Custom websites, transparent SEO, and analytics tied to your revenue. No generic AI fluff, no vanity metrics, no creepy tracking.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Dedicated Marketer - Web Design That Builds Your Business",
    description: "Custom websites, transparent SEO, and analytics tied to your revenue. No generic AI fluff, no vanity metrics, no creepy tracking.",
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
      className={`${rajdhani.variable} ${orbitron.variable} ${inter.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
