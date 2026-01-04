"use client";

/**
 * NavbarSpacer - A placeholder box with the exact same height as the navbar
 * - On large screens: positioned at the top (navbar is at top)
 * - On smaller screens: positioned at the bottom (navbar is at bottom)
 */
export default function NavbarSpacer() {
  return (
    <>
      {/* Desktop: Top spacer */}
      <div
        className="hidden md:block order-1"
        style={{ height: "calc(var(--header-height) + 1.5rem)" }}
        aria-hidden="true"
      />
      {/* Mobile: Bottom spacer */}
      <div
        className="block md:hidden order-last"
        style={{ height: "calc(var(--header-height) + 2rem)" }}
        aria-hidden="true"
      />
    </>
  );
}
