"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { useStageStore } from "../store/stageStore";

export default function AudioController() {
  const { isBooted, sfxTrigger } = useStageStore();
  
  // Audio node references mapped statically for performance
  const ambientAudio = useRef<HTMLAudioElement | null>(null);
  const hoverSfx = useRef<HTMLAudioElement | null>(null);
  const cipherSfx = useRef<HTMLAudioElement | null>(null);
  const bootSfx = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 1. Preload atmospheric drone track
    // Placeholder immersive generic rumble URL; should be swapped for actual production assets
    ambientAudio.current = new Audio("https://cdn.freesound.org/previews/235/235730_2385474-lq.mp3");
    ambientAudio.current.loop = true;
    ambientAudio.current.volume = 0; // Starts silent

    // SFX Banks
    hoverSfx.current = new Audio("https://cdn.freesound.org/previews/231/231147_4111306-lq.mp3"); // High frequency click/whoosh
    hoverSfx.current.volume = 0.15;
    
    cipherSfx.current = new Audio("https://cdn.freesound.org/previews/708/708027_10443152-lq.mp3"); // Digital tech scan
    cipherSfx.current.volume = 0.05;

    bootSfx.current = new Audio("https://cdn.freesound.org/previews/148/148858_2336336-lq.mp3"); // Heavy cinematic impact
    bootSfx.current.volume = 0.5;

    return () => {
      // Cleanup to prevent memory leaks when dismounting
      if(ambientAudio.current) ambientAudio.current.pause();
    };
  }, []);

  // 2. Playback state managed explicitly post-initialization bypass
  useEffect(() => {
    if (!ambientAudio.current) return;
    
    if (isBooted) {
      ambientAudio.current.play().catch(() => {
         console.warn("Autoplay blocked heavily by browser policy");
      });
      // Fade in the ambient cinematic layer
      const fadeInterval = setInterval(() => {
        if (ambientAudio.current && ambientAudio.current.volume < 0.4) {
          ambientAudio.current.volume = Math.min(ambientAudio.current.volume + 0.05, 0.4);
        } else {
          clearInterval(fadeInterval);
        }
      }, 200);
    }
  }, [isBooted]);

  // 3. SFX Re-triggering Hooks mapped from Global Zustand Store
  useEffect(() => {
    if (!sfxTrigger) return;
    
    try {
      if (sfxTrigger === "hover" && hoverSfx.current) {
        hoverSfx.current.currentTime = 0;
        hoverSfx.current.play().catch(()=>{});
      } else if (sfxTrigger === "cipher" && cipherSfx.current) {
        cipherSfx.current.currentTime = 0;
        cipherSfx.current.play().catch(()=>{});
      } else if (sfxTrigger === "boot" && bootSfx.current) {
        bootSfx.current.currentTime = 0;
        bootSfx.current.play().catch(()=>{});
      }
    } catch {
      // Catch interrupted play promises due to rapid scrolling re-triggers securely
    }
  }, [sfxTrigger]);

  // 4. Kinetic Audio Tracking (Pitch / Volume mapping against Lenis scroll velocity)
  useLenis((lenis) => {
    if (!ambientAudio.current || !lenis || !isBooted) return;
    
    const velocity = Math.abs(lenis.velocity);
    
    // Pitch up the drone linearly based on speed (up to 40% mapping effect)
    // HTML5 audio playbackRate alters pitch simultaneously natively
    const targetPitch = 0.8 + Math.min(velocity * 0.05, 0.5);
    ambientAudio.current.playbackRate = parseFloat(targetPitch.toFixed(2));
    
    // Increase volume to simulate physical resistance to scroll effort
    const targetVolume = 0.4 + Math.min(velocity * 0.02, 0.3);
    // Smooth volume jump to prevent pop clicking using pure JS
    ambientAudio.current.volume += (targetVolume - ambientAudio.current.volume) * 0.1;
  });

  return null; // Audio nodes operate purely behind the DOM veil
}
