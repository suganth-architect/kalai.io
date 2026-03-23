"use client";

import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useStageStore } from "../store/stageStore";

interface TransitionRouterProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function TransitionRouter({ href, children, className = "", onClick }: TransitionRouterProps) {
  const router = useRouter();
  const setIsTransitioning = useStageStore((s) => s.setIsTransitioning);

  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Stop standard direct navigation
    if (onClick) onClick();

    // 1. Trigger the fluid stage-envelope override exponentially inside TheAgent
    setIsTransitioning(true);

    // 2. Wait explicitly for the distortion fluid to consume the camera view
    setTimeout(() => {
      if (href.startsWith("http")) {
        window.location.assign(href);
      } else {
        router.push(href);
      }
      
      // 3. Immediately clear transitioning array once route engages rendering
      // The Next.js layout won't unmount the pure R3F Canvas across standard navigations 
      // if properly structured, allowing the scale to seamlessly reverse in the new DOM.
      setTimeout(() => {
         setIsTransitioning(false);
      }, 300); // 300ms cushion buffer for mounting calculations
    }, 800); // 0.8s matching exactly the GSAP envelope fluid transition timing mapping
  };

  return (
    <a href={href} onClick={handleTransition} className={`transition-router-link ${className}`}>
      {children}
    </a>
  );
}
