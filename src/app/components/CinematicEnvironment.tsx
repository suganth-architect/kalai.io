"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useStageStore } from "../store/stageStore";
import TheAgent from "./TheAgent";
import WebGLGallery from "./WebGLGallery";
import WebGLOptimizer from "./WebGLOptimizer";

export default function CinematicEnvironment() {
  const { fpsTier } = useStageStore();

  return (
    <div className="fixed inset-0 pointer-events-none -z-20 bg-black overflow-hidden">
      
      {/* Primary Video Background — kept subtle and blurred as the true environment base */}
      <div className="absolute inset-0 scale-[1.15] blur-[8px] transition-opacity duration-1000">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity"
        >
          <source src="/videos/bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)]" />

      {/* R3F Canvas inextricably linked to scroll via useLenis in TheAgent */}
      <Canvas
        className="absolute inset-0 z-10 w-full h-full"
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }} // Antialias false when using PostProcessing
        dpr={fpsTier === "high" ? [1, 2] : 1} // Downgrades DPR to strict 1.0 bound on thermal/fps throttle
      >
        <ambientLight intensity={0.2} />
        
        {/* Core Lighting Setup for the Fluid Mesh */}
        <spotLight position={[-8, 5, -5]} angle={0.5} penumbra={1} intensity={6} color="#3b82f6" />
        <spotLight position={[8, -5, 5]} angle={0.5} penumbra={1} intensity={4} color="#f97316" />
        <directionalLight position={[5, 10, 5]} intensity={2.0} color="#ffffff" />

        <Suspense fallback={null}>
          <WebGLOptimizer>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1.0}>
              <TheAgent />
            </Float>
            {/* Dynamic 3D mapping of the 2D Poster Gallery */}
            <WebGLGallery />
            
            <Environment preset="night" background={false} />
          </WebGLOptimizer>
        </Suspense>

        {/* eslint-disable @typescript-eslint/no-explicit-any */}
        <EffectComposer>
          {fpsTier === "high" && (<Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={3.5} mipmapBlur radius={0.4} />) as any}
          {(<Noise opacity={0.05} premultiply={true} blendFunction={BlendFunction.OVERLAY} />) as any}
          {(<Vignette eskil={false} offset={0.1} darkness={1.1} blendFunction={BlendFunction.NORMAL} />) as any}
        </EffectComposer>
      </Canvas>

    </div>
  );
}
