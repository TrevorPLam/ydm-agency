import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fake Client 1 Landing Page",
  description: "Landing page for Fake Client 1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
