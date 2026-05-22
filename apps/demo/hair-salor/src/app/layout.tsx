import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hair Salon Demo",
  description: "Demo application for hair salon management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
