"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useStageStore } from "../store/stageStore";

export default function AgentCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const { sfxTrigger, isBooted } = useStageStore();

  useEffect(() => {
    // Hide default cursor globally, overriding any lingering default OS hands
    document.body.style.cursor = "none";
    
    // Any hovered anchor tags should also not default to pointer since we replaced it
    const style = document.createElement("style");
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    const outerX = gsap.quickTo(outerRef.current, "x", { duration: 0.15, ease: "power2.out" });
    const outerY = gsap.quickTo(outerRef.current, "y", { duration: 0.15, ease: "power2.out" });
    
    // Core tracks instantly (zero latency)
    const coreX = gsap.quickTo(coreRef.current, "x", { duration: 0, ease: "none" });
    const coreY = gsap.quickTo(coreRef.current, "y", { duration: 0, ease: "none" });

    const handleMouseMove = (e: MouseEvent) => {
      outerX(e.clientX - 16); // 32px ring, center is 16
      outerY(e.clientY - 16);
      
      coreX(e.clientX - 3); // 6px core, center is 3
      coreY(e.clientY - 3);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", handleMouseMove);
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, []);

  // Reactive UI scaling based on global SFX hooks
  useEffect(() => {
    if (sfxTrigger === "hover") {
      // Inflates when interacting with magnetic buttons
      gsap.killTweensOf(outerRef.current);
      gsap.to(outerRef.current, { scale: 1.8, duration: 0.4, ease: "elastic.out(1, 0.3)" });
      gsap.to(outerRef.current, { scale: 1, duration: 0.4, delay: 0.4, ease: "power2.out" });
    } else if (sfxTrigger === "cipher") {
      // Rapid distortion pulse when intercepting encrypted typography
      gsap.killTweensOf(coreRef.current);
      gsap.to(coreRef.current, { scale: 3, duration: 0.2, ease: "power4.out" });
      gsap.to(coreRef.current, { scale: 1, duration: 0.6, delay: 0.2, ease: "elastic.out(1, 0.4)" });
      gsap.fromTo(outerRef.current, { rotation: 0 }, { rotation: 180, duration: 0.8, ease: "power2.out" });
    }
  }, [sfxTrigger]);

  if (!isBooted) return null;

  return (
    <>
      {/* Outer Ring — Hollow 1px bordered glass token */}
      <div 
        ref={outerRef} 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/60 pointer-events-none mix-blend-difference z-[99999] shadow-[0_0_10px_2px_rgba(255,255,255,0.1)]"
      />
      {/* Solid Core Dot — glowing core perfectly inverting stark white typography */}
      <div 
        ref={coreRef} 
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-white pointer-events-none mix-blend-difference z-[99999]"
        style={{ boxShadow: "0 0 12px 3px rgba(255,255,255,0.7)" }}
      />
    </>
  );
}
