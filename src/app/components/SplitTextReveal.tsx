"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useStageStore } from "../store/stageStore";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
}

export default function SplitTextReveal({ text, className = "" }: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const words = text.split(" ");
  const { triggerSFX } = useStageStore();
  
  useGSAP(() => {
    const chars = charsRef.current.filter((el): el is HTMLSpanElement => el !== null);
    if (!containerRef.current || chars.length === 0) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%", // Starts a bit before the viewer targets it
        toggleActions: "play none none reverse",
        onEnter: () => triggerSFX("cipher")
      }
    });

    const cipher = "X0-&%+*>#@";

    chars.forEach((charEl, idx) => {
      const targetChar = charEl.getAttribute("data-char") || "";
      
      // Decipher matrix effect + Translation
      // Start slightly translated down and invisible
      gsap.set(charEl, { y: 20, opacity: 0 });

      // Bring position up and opacity fast
      tl.to(charEl, { 
        y: 0, 
        opacity: 1, 
        duration: 0.4, 
        ease: "power2.out" 
      }, idx * 0.02); // staggered

      // Scramble effect
      const scrambleObj = { val: 0 };
      tl.to(scrambleObj, {
        val: 1,
        duration: 0.8,
        ease: "power1.inOut",
        onUpdate: () => {
          if (scrambleObj.val < 0.95) {
             // Flickering cipher text
             charEl.innerHTML = cipher[Math.floor(Math.random() * cipher.length)];
          } else {
             // Lock to final text character
             charEl.innerHTML = targetChar;
          }
        }
      }, idx * 0.02);
    });
  }, { scope: containerRef });

  // Helper calculation for global char index within mapped nested loops
  let globalCharIdx = 0;

  return (
    <div ref={containerRef} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-flex mr-[0.25em] whitespace-pre">
          {word.split("").map((char, cIdx) => {
            const currentIdx = globalCharIdx++;
            return (
              <span 
                 key={cIdx}
                 ref={(el) => {
                   charsRef.current[currentIdx] = el;
                 }}
                 className="matrix-char inline-block" 
                 data-char={char} // Store original character
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
}
