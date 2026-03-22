"use client";

import { ReactLenis } from "lenis/react";

/**
 * SmoothScroll — Global Lenis provider
 *
 * Wraps the page in Lenis smooth scroll with mobile-optimized settings.
 * Uses `root={true}` to scroll the entire page via the html element.
 *
 * Accessibility:
 * - Falls back to native scroll if JS fails (progressive enhancement)
 * - Respects `prefers-reduced-motion` via Lenis's built-in check
 * - Keyboard navigation works natively (Lenis does not intercept Tab/Space/Arrow)
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        /* Interpolation factor — lower = smoother, higher = snappier.
           0.1 is cinematic. 0.12 balances smoothness with responsiveness
           on mid-range Android (Adreno 619 tier). */
        lerp: 0.1,

        /* Duration is disabled when lerp is set — Lenis uses lerp-based
           interpolation rather than duration-based easing. */

        /* Wheel multiplier — controls scroll speed from mouse/trackpad.
           1 = native speed. Keeps it natural. */
        wheelMultiplier: 1,

        /* Touch multiplier — controls swipe scroll speed on mobile.
           1.2 gives slightly faster response to thumb swipes
           without feeling over-accelerated. */
        touchMultiplier: 1.2,

        /* Infinite scroll disabled — the page has a defined end
           (the CONVERSION CTA). */
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
