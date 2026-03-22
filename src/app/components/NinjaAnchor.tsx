"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import Image from "next/image";

export default function NinjaAnchor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef<number>(0);
  const rafId = useRef<number>(0);

  useLenis((lenis) => {
    if (lenis) {
      scrollProgress.current = lenis.progress ?? 0;
    }
  });

  useEffect(() => {
    let lastTime = performance.now();
    const tick = (now: number) => {
      lastTime = now;
      const t = performance.now() * 0.001;
      
      const el = containerRef.current;
      if (el) {
        const p = scrollProgress.current; // 0 to 1
        
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        
        const isMobile = vw < 768;
        
        // Start high up and right
        const startY = -vh * 0.1;
        const startX = isMobile ? vw * 0.15 : vw * 0.25;
        
        // End low and center
        const endY = vh * 0.45;
        
        // Interpolate position
        const currentY = startY + p * (endY - startY);
        // Add a sweeping agile curve for X translation
        const curveX = Math.sin(p * Math.PI) * (vw * 0.25); 
        const currentX = startX - (p * startX) - curveX;
        
        // 3D Parallax Rotation
        const rY = Math.sin(p * Math.PI * 4) * 35 + Math.sin(t) * 12;
        const rZ = Math.sin(p * Math.PI * 2) * 5;
        const rX = Math.cos(p * Math.PI * 2) * 15;
        
        // Scale grows as we dive deeper into the experience
        const scale = 0.6 + p * 0.6 + Math.sin(t * 2) * 0.03;
        
        // Float effect (gravity defiance)
        const floatY = Math.sin(t * 2.5) * 15;

        // Apply 3D coordinate Matrix
        el.style.transform = `translate3d(${currentX}px, ${currentY + floatY}px, 0) scale(${scale}) rotateX(${rX}deg) rotateY(${rY}deg) rotateZ(${rZ}deg)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <div 
      className="fixed top-0 left-1/2 -z-10 pointer-events-none mix-blend-screen"
      style={{ 
        width: "600px", height: "800px",
        marginLeft: "-300px", 
        perspective: "1200px" 
      }}
    >
      <div ref={containerRef} className="relative w-full h-full will-change-transform" style={{ transformStyle: "preserve-3d" }}>
        <Image 
          src="/images/bg/ninja_model.png" 
          alt="3D Ninja Samurai Automation Agent"
          fill
          className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          quality={100}
          unoptimized
          priority
        />
      </div>
    </div>
  );
}
