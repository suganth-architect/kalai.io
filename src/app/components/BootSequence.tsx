"use client";

import React, { useEffect, useRef } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { useStageStore } from "../store/stageStore";

const BOOT_LOGS = [
  "INITIALIZING NEURAL MESH...",
  "ALLOCATING VRAM HEADERS...",
  "COMPILING SHADERS [GLSL_V3]...",
  "LINKING DOM/WEBGL CONTEXT...",
  "SYNCHRONIZING SCROLL TRIGGERS...",
  "INSTANTIATING THE AGENT...",
  "AWAITING DEPLOYMENT..."
];

export default function BootSequence() {
  const { progress } = useProgress();
  // Derived UI State (Directly calculated from WebGL progress hook without risking cascading re-renders)
  const actionRequired = progress >= 100;
  const logIndex = actionRequired 
    ? BOOT_LOGS.length - 1 
    : Math.min(Math.floor((progress / 100) * BOOT_LOGS.length), BOOT_LOGS.length - 1);
  
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);

  const { setIsBooted, triggerSFX } = useStageStore();

  useEffect(() => {
    // Lock scrolling explicitly during initialization
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleBoot = () => {
    if (!actionRequired) return;

    // Trigger explicit Audio Context initialization + initial SFX
    triggerSFX("boot");

    const tl = gsap.timeline({
      onComplete: () => {
        setIsBooted(true);
        // hide overlay entirely
        gsap.set(overlayRef.current, { display: "none" });
      }
    });

    // Terminal text violent exit
    tl.to(contentRef.current, {
      scale: 3,
      opacity: 0,
      filter: "blur(20px)",
      duration: 0.8,
      ease: "power3.in"
    });

    // Splitting door sequence
    tl.to(topPanelRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut"
    }, "-=0.2");
    
    tl.to(bottomPanelRef.current, {
      yPercent: 100,
      duration: 1.2,
      ease: "power4.inOut"
    }, "-=1.2");
  };

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer"
      onClick={handleBoot}
    >
      <div ref={topPanelRef} className="absolute top-0 left-0 w-full h-[50vh] bg-black" />
      <div ref={bottomPanelRef} className="absolute bottom-0 left-0 w-full h-[50vh] bg-black" />
      
      <div ref={contentRef} className="relative z-10 flex flex-col items-center">
        <div className="type-micro uppercase tracking-widest text-primary mb-2 opacity-80 animate-pulse">
          {BOOT_LOGS[logIndex]}
        </div>
        
        <div className="w-64 h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>

        <div className={`mt-8 type-body tracking-wider uppercase transition-opacity duration-1000 ${actionRequired ? 'opacity-100 text-accent glow-text pulse-slow' : 'opacity-0'}`}>
          Click to Initialize System
        </div>
      </div>
    </div>
  );
}
