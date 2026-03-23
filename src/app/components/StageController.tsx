"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { useStageStore } from "../store/stageStore";

// Safely register GSAP plugins strictly on the client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function StageController() {
  const containerRef = useRef<HTMLDivElement>(null);
  const setCurrentStage = useStageStore((s) => s.setCurrentStage);
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch by blocking render execution until DOM is verified
  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 10);
    return () => {
      clearTimeout(t);
      // useGSAP's scoped context handles cleanup automatically.
    };
  }, []);

  useLenis((lenis) => {
    if (isMounted) {
      ScrollTrigger.update();
    }
  });

  useGSAP(() => {
    if (!isMounted || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const stages = [
      "arrival",
      "disruption",
      "revelation",
      "proof",
      "desire",
      "conversion",
      "ecosystem",
    ];

    stages.forEach((id, index) => {
      const section = document.getElementById(id);
      if (!section) return;

      const stageNum = index + 1;
      // Scoped rigid selector bound to the specific stage
      const content = section.querySelectorAll(".corridor, .corridor-wide");
      if (!content || content.length === 0) return;

      if (index === 0) {
        // ── STAGE 1 (Arrival) ──────────────────────────────────────────────
        // Always visible on load. Exit via the Arrival pin's own scrub range.
        gsap.set(content, { opacity: 1, y: 0, filter: "blur(0px)" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: true,
            scrub: 1,
            onEnter: () => setCurrentStage(stageNum),
            onEnterBack: () => setCurrentStage(stageNum),
          },
        });

        // Hold, then cinematic exit
        tl.to({}, { duration: 4 });
        tl.to(content, {
          opacity: 0,
          y: -150,
          filter: "blur(20px)",
          duration: 2,
          ease: "power2.in",
        });
      } else {
        // ── STAGES 2–7: Three-phase decoupled approach ─────────────────────
        //
        // ROOT CAUSE: The previous code used a single timeline spanning from
        // "top 85%" all the way to "bottom top+=100%". On short sections
        // (Conversion, Revelation), this compressed range caused the exit
        // tween (at 75% of the range) to fire before the pin even engaged,
        // permanently hiding text during the locked hold.
        //
        // FIX: Three strictly independent triggers with clean boundaries.
        // Phase A range is purely viewport-relative ("top 85%" → "top top"),
        // so it is immune to section height and always completes before pin.

        // ── Phase 0: Initialize invisible ──
        gsap.set(content, { opacity: 0, y: 100, filter: "blur(12px)" });

        // ── Phase A: Entrance scrub ─────────────────────────────────────
        // Range: "top 85%" → "top top" (viewport-relative, ~15% of vh).
        // Fully resolves the fade-in BEFORE the pin fires.
        // Section height is entirely irrelevant to this boundary.
        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top top",
            scrub: 1,
          },
        }).to(content, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "power3.out",
          duration: 1, // single tween fills 100% of the scrub range
        });

        // ── Phase B: Pin + Exit (combined) ─────────────────────────────
        // The pin ScrollTrigger owns both the hold state and the exit.
        //
        // CRITICAL: onEnter/onEnterBack hard-forces opacity:1/blur(0px).
        // This is the definitive safety net for fast-scroll scenarios where
        // Phase A's scrub may not have fully completed by "top top". It makes
        // Phase A a smooth visual enhancement rather than a hard dependency.
        //
        // Exit occupies the final 30% of the pin's scroll range (7 hold : 3 exit).
        // This guarantees text is locked fully visible for 70% of the pinned scroll.
        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: true,
            scrub: 1,
            onEnter: () => {
              // Force the fully visible state. Overrides any Phase A scrub residue.
              gsap.set(content, { opacity: 1, y: 0, filter: "blur(0px)" });
              setCurrentStage(stageNum);
            },
            onEnterBack: () => {
              gsap.set(content, { opacity: 1, y: 0, filter: "blur(0px)" });
              setCurrentStage(stageNum);
            },
          },
        })
          .to({}, { duration: 7 }) // hold at opacity: 1, blur: 0px
          .to(content, {
            opacity: 0,
            y: -150,
            filter: "blur(20px)",
            ease: "power2.in",
            duration: 3,
          });
      }
    });
  }, { scope: containerRef, dependencies: [isMounted] });

  if (!isMounted) return <div ref={containerRef} className="hidden" aria-hidden="true" />;

  return <div ref={containerRef} className="hidden stage-mounted-anchor" aria-hidden="true" />;
}
