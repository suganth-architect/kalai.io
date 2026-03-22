"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap, ScrollTrigger } from "./useGSAP";

/**
 * Stage IDs — the 6-stage scroll narrative.
 * Used as ScrollTrigger trigger selectors.
 */
export const STAGE_IDS = [
  "arrival",
  "disruption",
  "revelation",
  "proof",
  "desire",
  "conversion",
] as const;

export type StageId = (typeof STAGE_IDS)[number];

/**
 * ScrollTrigger configuration for a single stage.
 * Describes WHEN a stage enters/exits the viewport
 * without defining WHAT animation plays.
 */
export interface StageTriggerConfig {
  id: StageId;
  /** ScrollTrigger "start" — default: "top 80%" (enters viewport) */
  start?: string;
  /** ScrollTrigger "end" — default: "bottom 20%" (leaves viewport) */
  end?: string;
}

/** Default trigger configs for all 6 stages */
const DEFAULT_STAGE_TRIGGERS: StageTriggerConfig[] = [
  { id: "arrival", start: "top top", end: "bottom 50%" },
  { id: "disruption", start: "top 80%", end: "bottom 20%" },
  { id: "revelation", start: "top 80%", end: "bottom 20%" },
  { id: "proof", start: "top 80%", end: "bottom 20%" },
  { id: "desire", start: "top 80%", end: "bottom 20%" },
  { id: "conversion", start: "top 80%", end: "bottom 20%" },
];

/**
 * useScrollTrigger — Creates a ScrollTrigger for a specific element.
 *
 * This is the low-level hook for creating individual triggers.
 * Returns the trigger instance for manual control if needed.
 *
 * @param ref - RefObject pointing to the trigger element
 * @param config - ScrollTrigger configuration
 * @param onEnter - Called when element enters viewport
 * @param onLeave - Called when element leaves viewport
 */
export function useScrollTrigger(
  ref: RefObject<HTMLElement | null>,
  config: {
    start?: string;
    end?: string;
    markers?: boolean;
    toggleClass?: string;
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    onLeaveBack?: () => void;
  } = {}
) {
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    triggerRef.current = ScrollTrigger.create({
      trigger: el,
      start: config.start ?? "top 80%",
      end: config.end ?? "bottom 20%",
      markers: config.markers ?? false,
      toggleClass: config.toggleClass,
      onEnter: config.onEnter,
      onLeave: config.onLeave,
      onEnterBack: config.onEnterBack,
      onLeaveBack: config.onLeaveBack,
    });

    return () => {
      triggerRef.current?.kill();
      triggerRef.current = null;
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [ref]);

  return triggerRef;
}

/**
 * useStageTriggers — Creates ScrollTrigger instances for all 6 stages.
 *
 * This is the high-level hook that sets up the entire stage system.
 * Adds/removes an `in-view` CSS class on each section when it
 * enters/exits the viewport.
 *
 * Future animation hooks will build on these triggers.
 *
 * @param configs - Optional override configs per stage
 */
export function useStageTriggers(
  configs: StageTriggerConfig[] = DEFAULT_STAGE_TRIGGERS
) {
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    configs.forEach(({ id, start, end }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: start ?? "top 80%",
        end: end ?? "bottom 20%",
        toggleClass: { targets: el, className: "in-view" },
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [configs]);
}

/**
 * useInViewFallback — IntersectionObserver fallback for environments
 * where GSAP/ScrollTrigger may not load (SSR, reduced-motion, JS disabled).
 *
 * Adds the `in-view` class when element enters viewport.
 * Uses the same class name as ScrollTrigger for seamless handoff.
 *
 * @param ref - RefObject pointing to the observed element
 * @param threshold - Intersection threshold (0-1), default 0.2
 * @param once - If true, unobserves after first intersection
 */
export function useInViewFallback(
  ref: RefObject<HTMLElement | null>,
  { threshold = 0.2, once = true } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Skip if ScrollTrigger is already managing this element */
    if (typeof ScrollTrigger !== "undefined" && ScrollTrigger.getAll().length > 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            if (once) observer.unobserve(entry.target);
          } else {
            if (!once) entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [ref, threshold, once]);
}

/* Re-export for convenience */
export { gsap, ScrollTrigger };
