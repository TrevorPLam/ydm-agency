/**
 * FILE: layout.tsx
 * PURPOSE: Provides the layout wrapper for the /services route group, passing children through unchanged.
 * ARCHITECTURE: Next.js layout server component that renders children directly within a fragment.
 * KEY RULES: Must render children without additional wrapping that would break the service pages' own layout structure.
 * DEPENDS ON: react.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

/**
 * WHAT IT DOES: Renders the services route group layout, passing children through unchanged.
 * @param {{ children: React.ReactNode }} props - Service route page content
 * @return {JSX.Element} - Fragment containing children
 * SIDE EFFECTS: None (server-side rendering).
 * ASSUMES: None.
 */
export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
