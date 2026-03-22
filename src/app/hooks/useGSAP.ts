"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

/* Register ScrollTrigger once at module level */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * useGSAP — Core GSAP + ScrollTrigger + Lenis sync hook.
 *
 * What it does:
 * 1. Syncs Lenis virtual scroll position to ScrollTrigger on every frame
 * 2. Provides a scoped GSAP context for cleanup
 * 3. Returns refs for the GSAP context and a ready state
 *
 * Usage:
 *   const { contextRef, isReady } = useGSAP();
 *
 * All ScrollTrigger instances created inside components that call this hook
 * will automatically stay in sync with Lenis smooth scroll.
 */
export function useGSAP() {
  const contextRef = useRef<gsap.Context | null>(null);
  const isReady = useRef(false);

  /* ── Sync Lenis → ScrollTrigger ── */
  useLenis(() => {
    /* On every Lenis scroll event, tell ScrollTrigger to re-read
       the scroll position. This is the critical bridge between
       Lenis's virtual scroll and GSAP's trigger calculations. */
    ScrollTrigger.update();
  });

  useEffect(() => {
    /* Create a GSAP context for scoped cleanup.
       All GSAP animations & ScrollTriggers created within this context
       will be automatically killed on unmount. */
    contextRef.current = gsap.context(() => {});
    isReady.current = true;

    return () => {
      /* Clean up all GSAP animations and ScrollTriggers */
      contextRef.current?.revert();
      isReady.current = false;
    };
  }, []);

  return { contextRef, isReady };
}

export { gsap, ScrollTrigger };
