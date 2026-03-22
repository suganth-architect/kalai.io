"use client";

import React, { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { useStageStore } from "../store/stageStore";

interface MagneticProps {
  children: ReactNode;
  className?: string;
}

export default function MagneticButton({ children, className = "" }: MagneticProps) {
  const magneticRef = useRef<HTMLDivElement>(null);

  const { triggerSFX } = useStageStore();

  useEffect(() => {
    if (!magneticRef.current) return;
    
    // Create highly optimized quicksetters for high performance physics
    const xTo = gsap.quickTo(magneticRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(magneticRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) {
        triggerSFX("hover");
        isHovering = true;
      }
      const { clientX, clientY } = e;
      const { height, width, left, top } = magneticRef.current!.getBoundingClientRect();
      
      // Distance from center of element
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Pull magnitude based on distance (cap at 15px shift)
      const maxPull = 15;
      const pullX = (x / width) * maxPull * 2;
      const pullY = (y / height) * maxPull * 2;
      
      xTo(Math.max(-maxPull, Math.min(maxPull, pullX)));
      yTo(Math.max(-maxPull, Math.min(maxPull, pullY)));
    };

    const handleMouseLeave = () => {
      isHovering = false;
      // Elastic spring back to center
      xTo(0);
      yTo(0);
    };

    if (magneticRef.current) {
        magneticRef.current.addEventListener("mousemove", handleMouseMove);
        magneticRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (magneticRef.current) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          magneticRef.current.removeEventListener("mousemove", handleMouseMove);
          magneticRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [triggerSFX]);

  return (
    <div ref={magneticRef} className={`inline-block w-full ${className}`}>
      {children}
    </div>
  );
}
