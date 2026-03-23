"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStageStore } from "../store/stageStore";

// Custom sequence detector parsing keystrokes into a buffer string
function useSecretCode(secretSequence: string[]) {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let sequenceIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape explicitly annihilates the manual override via system reboot
      if (e.key === "Escape" && success) {
         window.location.reload(); // Hard restore autonomy by purging the state completely
         return;
      }

      if (e.key.toLowerCase() === secretSequence[sequenceIndex].toLowerCase()) {
        sequenceIndex++;
        if (sequenceIndex === secretSequence.length) {
          setSuccess(true);
          sequenceIndex = 0; // reset
        }
      } else {
        sequenceIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [secretSequence, success]);

  return { success };
}

export default function KonamiKalai() {
  const { success } = useSecretCode(["k", "a", "l", "a", "i"]);
  const setIsManualOverride = useStageStore((s) => s.setIsManualOverride);
  const triggerSFX = useStageStore((s) => s.triggerSFX);

  useEffect(() => {
    if (success) {
      setIsManualOverride(true);
      
      // Fire massive distorted sub-bass SFX mapped globally
      triggerSFX("override");
      
      // Execute destructive behavior: Kill all scroll synchronization violently
      ScrollTrigger.getAll().forEach(t => t.kill());

      // Blur out the DOM immediately so it becomes a pure WebGL Sandbox
      gsap.to("main section", { 
        opacity: 0.1, 
        filter: "blur(20px)", 
        duration: 2.5, 
        ease: "power2.out" 
      });
      // Lock scroll interaction permanently on the DOM side
      document.body.style.overflow = "hidden";
    }
  }, [success, setIsManualOverride, triggerSFX]);

  if (!success) return null;

  return (
    <div className="fixed bottom-6 left-0 w-full z-[10000] pointer-events-none flex justify-center">
      <div 
        className="type-micro uppercase tracking-widest text-[#ff2a00] bg-black/60 px-6 py-3 rounded border border-[#ff2a00]/30 animate-pulse mix-blend-difference"
        style={{ textShadow: "0 0 15px rgba(255,42,0,0.9)", letterSpacing: "0.2em" }}
      >
        MANUAL OVERRIDE ENGAGED. PRESS <span className="text-white font-bold ml-2">ESC</span> TO RESTORE AUTONOMY.
      </div>
    </div>
  );
}
