"use client";

import Image from "next/image";

export default function CinematicEnvironment() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-20 bg-black overflow-hidden">
      
      {/* 
        Fallback Cinematic Minimal Image
        This sits underneath the video in case the video hasn't loaded or isn't placed yet.
        It slowly scales and translates to provide motion.
      */}
      <div 
        className="absolute inset-[-10%] opacity-80 will-change-transform"
        style={{
          animation: "cinematic-pan 120s ease-in-out infinite alternate"
        }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes cinematic-pan {
            0% { transform: scale(1.0) translate(0%, 0%); }
            50% { transform: scale(1.1) translate(-2%, 1%); }
            100% { transform: scale(1.05) translate(1%, -1%); }
          }
        `}} />
        <Image 
          src="/videos/veo_fallback.png" 
          alt="Atmospheric Fallback Environment" 
          fill 
          className="object-cover" 
          quality={100} 
          unoptimized 
          priority 
        />
      </div>

      {/* 
        Primary Dedicated Video Background (Google Veo Loop)
        - scale-[1.15] forces a mechanical zoom to perfectly crop out the Veo watermark (bottom right).
        - blur-[6px] applies physical Depth-of-Field to the raw video, shifting all visual priority to the 3D Ninja.
      */}
      <div className="absolute inset-0 scale-[1.15] blur-[8px] transition-opacity duration-1000">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
        >
          <source src="/videos/bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Vertical Gradient to aggressively ensure text dominates over video */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />

      {/* Cinematic Vignette to merge harsh edges into the void and center focus */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)]" />

      {/* 
        High-Frequency SVG Noise Overlay 
        Critically important for video backgrounds: Mends heavy MP4 compression banding 
        and permanently unifies the environment texture.
      */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] mix-blend-screen pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <filter id="cinematic-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#cinematic-noise)"/>
      </svg>
    </div>
  );
}
