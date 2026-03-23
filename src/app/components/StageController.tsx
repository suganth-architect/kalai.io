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

      // Set initial isolated GSAP matrix avoiding flash of unstyled content
      gsap.set(content, { opacity: 0, y: 100, filter: "blur(12px)" });

      // Create a master timeline explicitly terminating tied scroll triggers safely
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%", // Halved from 150% forcing much tighter staging and immediate phase handoffs
          pin: true,
          pinSpacing: true,
          scrub: 1, // Inertial fluid scrubbing
          onEnter: () => setCurrentStage(stageNum),
          onEnterBack: () => setCurrentStage(stageNum),
        }
      });

      // 1. Enter: Unblur, fade in, translate upward via dampening
      tl.to(content, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 2,
        ease: "power3.out",
      });

      // 2. Hold: Keep it perfectly still and readable for a deterministic length
      tl.to({}, { duration: 4 });

      // 3. Exit: Violently overtake - push up, fade out, blur heavily
      tl.to(content, {
        opacity: 0,
        y: -150,
        filter: "blur(20px)",
        duration: 2,
        ease: "power2.in",
      });
    });

  }, { scope: containerRef, dependencies: [isMounted] }); // Execute safely only post-DOM hydration

  if (!isMounted) return <div ref={containerRef} className="hidden" aria-hidden="true" />;

  return <div ref={containerRef} className="hidden stage-mounted-anchor" aria-hidden="true" />;
}
