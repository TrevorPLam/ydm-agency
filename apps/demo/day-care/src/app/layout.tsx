import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Day Care Demo",
  description: "Demo application for day care management",
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
