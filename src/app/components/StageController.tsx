"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { useStageStore } from "../store/stageStore";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function StageController() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCurrentStage, setScrollProgress } = useStageStore();

  useLenis((lenis) => {
    ScrollTrigger.update();
    setScrollProgress(lenis.progress);
  });

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const stages = [
      "#arrival",
      "#disruption",
      "#revelation",
      "#proof",
      "#desire",
      "#conversion",
      "#ecosystem"
    ];

    stages.forEach((selector, index) => {
      const section = document.querySelector(selector);
      if (!section) return;

      const stageNum = index + 1;
      const content = section.querySelectorAll(".corridor, .corridor-wide");

      // Set initial state
      gsap.set(content, { opacity: 0, y: 100, filter: "blur(12px)" });

      // Create a master timeline for this section's scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%", // Pins the section for 1.5x screen height
          pin: true,
          pinSpacing: true,
          scrub: 1, // Smooth scrubbing
          onEnter: () => setCurrentStage(stageNum),
          onEnterBack: () => setCurrentStage(stageNum),
        }
      });

      // 1. Enter: Unblur, fade in, translate up
      tl.to(content, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 2,
        ease: "power3.out",
      });

      // 2. Hold: Keep it perfectly still and readable for a long duration
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

  }, { scope: containerRef }); // GSAP cleanup automatically handled by useGSAP

  return <div ref={containerRef} className="hidden" aria-hidden="true" />;
}
