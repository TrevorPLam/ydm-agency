import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Firm Client Portal",
  description: "Client portal for the firm",
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
