"use client";

import { useGSAP } from "../hooks/useGSAP";
import { useStageTriggers } from "../hooks/useScrollTrigger";

/**
 * StageObserver — Invisible client component that activates
 * ScrollTrigger monitoring for all 6 stages.
 *
 * Placed alongside the page content in page.tsx.
 * Renders nothing — it only initializes the GSAP + Lenis sync
 * and creates the stage triggers.
 *
 * Future animation layers will hook into the same triggers
 * via the `in-view` CSS class or by extending useStageTriggers.
 */
export default function StageObserver() {
  /* Initialize GSAP ↔ Lenis sync */
  useGSAP();

  /* Create ScrollTrigger instances for all 6 stages */
  useStageTriggers();

  /* This component renders nothing */
  return null;
}
