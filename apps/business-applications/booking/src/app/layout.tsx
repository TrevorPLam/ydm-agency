import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking - Scheduling Platform",
  description: "Native Calendly substitution for appointment scheduling",
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
