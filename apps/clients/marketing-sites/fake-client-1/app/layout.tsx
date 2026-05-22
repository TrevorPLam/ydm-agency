import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fake Client 1 Marketing Site",
  description: "Marketing site for Fake Client 1",
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
