"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import Image from "next/image";

export default function CinematicEnvironment() {
  const bg1 = useRef<HTMLDivElement>(null);
  const bg2 = useRef<HTMLDivElement>(null);
  const bg3 = useRef<HTMLDivElement>(null);
  
  const scrollProgress = useRef<number>(0);
  const rafId = useRef<number>(0);

  useLenis((lenis) => {
    if (lenis) {
      scrollProgress.current = lenis.progress ?? 0;
    }
  });

  useEffect(() => {
    const tick = () => {
      const p = scrollProgress.current;
      
      // Update Opacities smoothly with requestAnimationFrame rather than react state
      if (bg1.current) {
        const op = Math.max(0, 1 - p * 3); // Fades out by 0.33
        bg1.current.style.opacity = op.toString();
        bg1.current.style.transform = `scale(${1 + p * 0.1})`; // slight zoom
      }
      
      if (bg2.current) {
        let op = 0;
        if (p >= 0.15 && p < 0.4) op = (p - 0.15) * 4; // fade in
        else if (p >= 0.4 && p < 0.7) op = 1; // hold
        else if (p >= 0.7) op = Math.max(0, 1 - (p - 0.7) * 4); // fade out
        bg2.current.style.opacity = op.toString();
        bg2.current.style.transform = `scale(${1 + Math.max(0, p - 0.15) * 0.1})`;
      }
      
      if (bg3.current) {
        let op = 0;
        if (p >= 0.6) op = Math.min(1, (p - 0.6) * 3); // fade in
        bg3.current.style.opacity = op.toString();
        bg3.current.style.transform = `scale(${1 + Math.max(0, p - 0.6) * 0.1})`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-20 bg-black overflow-hidden">
      <div ref={bg1} className="absolute inset-0 will-change-transform opacity-100">
        <Image src="/images/bg/environment_1_arrival_1774214165077.png" alt="Arrival Environment" fill className="object-cover opacity-80" quality={100} unoptimized priority />
      </div>
      <div ref={bg2} className="absolute inset-0 will-change-transform opacity-0">
        <Image src="/images/bg/environment_2_disruption_1774214181037.png" alt="Disruption Environment" fill className="object-cover opacity-80" quality={100} unoptimized />
      </div>
      <div ref={bg3} className="absolute inset-0 will-change-transform opacity-0">
        <Image src="/images/bg/environment_3_resolution_1774214197078.png" alt="Resolution Environment" fill className="object-cover opacity-80" quality={100} unoptimized />
      </div>
      {/* Cinematic Vignette to merge harsh edges into the void */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  );
}
