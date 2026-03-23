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
  const { setCurrentStage } = useStageStore();
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch by blocking render execution until DOM is verified
  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 10);
    return () => {
      clearTimeout(t);
      // Hard reset all triggers gracefully upon complex un-mounts to prevent detached targets
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  useLenis((lenis) => {
    if (isMounted) {
      ScrollTrigger.update();
      // Notice: CRITICALLY removing setScrollProgress from the R3F loop 
      // This immediately fixes the "Minified React Error #185" maximum depth crash on lower devices.
      // Transient read states are naturally consumed via raw useLenis tracking now natively instead of Redux/Zustand!
    }
  });

  useGSAP(() => {
    if (!isMounted || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Strict Target Initialization Array avoiding wild DOM queries
    const stages = [
      "arrival",
      "disruption",
      "revelation",
      "proof",
      "desire",
      "conversion",
      "ecosystem"
    ];

    stages.forEach((id, index) => {
      const section = document.getElementById(id);
      if (!section) return;

      const stageNum = index + 1;
      // Scoped rigid selector bound to the specific stage avoiding CSS overlap artifacting
      const content = section.querySelectorAll(".corridor, .corridor-wide");
      if (!content || content.length === 0) return;

      if (index === 0) {
        // STAGE 1 (Arrival): Must default structurally visible on load. No opacity locks.
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
          }
        });
        
        // 1. Hold instantly because the component is already visibly mounted natively at 0 scroll
        tl.to({}, { duration: 4 });
        
        // 2. Exit precisely native
        tl.to(content, { opacity: 0, y: -150, filter: "blur(20px)", duration: 2, ease: "power2.in" });
        
      } else {
        // STAGES 2-7: Re-mapped triggers eliminating dead scroll-gap zones!
        gsap.set(content, { opacity: 0, y: 150, filter: "blur(12px)" });

        // Phase A: The Animation interpolations tracking across both the entry boundary + pinned duration seamlessly
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 85%", // Ignites the opacity exactly as the user hits the bottom section tracking up
            end: "bottom top+=100%", // Covers exactly to the mathematical end of the PinSpacing threshold natively
            scrub: 1,
            onEnter: () => setCurrentStage(stageNum),
            onEnterBack: () => setCurrentStage(stageNum),
          }
        });

        // Track 1: Entering the viewport. Interpolates 0 opacity -> 1 exactly tracking the layout shift up to `y: 0` before the pin fires.
        tl.to(content, { opacity: 1, y: 0, filter: "blur(0px)", duration: 3, ease: "power3.out" });
        
        // Track 2: Sustaining lock exactly spanning the explicit pin
        tl.to({}, { duration: 6 });
        
        // Track 3: The standard GSAP overrun sequence
        tl.to(content, { opacity: 0, y: -150, filter: "blur(20px)", duration: 3, ease: "power2.in" });

        // Phase B: The literal DOM Physics Anchor isolating purely "top top" bindings mathematically
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: true,
        });
      }
    });

  }, { scope: containerRef, dependencies: [isMounted] }); // Execute safely only post-DOM hydration

  if (!isMounted) return <div ref={containerRef} className="hidden" aria-hidden="true" />;

  return <div ref={containerRef} className="hidden stage-mounted-anchor" aria-hidden="true" />;
}
