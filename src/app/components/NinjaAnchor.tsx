"use client";

import React, { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, Preload } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useLenis } from "lenis/react";
import * as THREE from "three";
import { Model as LightSaberModel } from "./LightSaber";

// The true GLTF Ninja/Lightsaber Model loaded dynamically
function NinjaModel({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const p = scrollProgress.current;
    
    // Cinematic 3D path down the screen
    const isMobile = window.innerWidth < 768;
    const startY = 3.5;
    const endY = -1.5;
    
    const startX = isMobile ? 1.5 : 2.5;
    const endX = 0;
    
    // Translation
    const currentY = startY + p * (endY - startY);
    // Smooth swooping curve for X
    const curveX = Math.sin(p * Math.PI) * 2;
    const currentX = startX - p * startX - curveX;
    
    // Z Depth
    const currentZ = -4 + p * 3;
    
    group.current.position.set(currentX, currentY, currentZ);
    
    // Complex continuous rotation
    const rY = Math.sin(p * Math.PI * 4) * 0.5 + state.clock.elapsedTime * 0.2;
    const rZ = Math.sin(p * Math.PI * 2) * 0.1;
    const rX = Math.cos(p * Math.PI * 2) * 0.15;
    
    group.current.rotation.set(rX, rY, rZ);

    // Scaling (Scaling factor often needs to be larger/smaller depending on GLB origin size — 
    // applying a larger dynamic scale since lightsabers often load small or very large,
    // this centers it within the view frustum gracefully)
    const scale = 2.0 + p * 1.5;
    group.current.scale.setScalar(scale);
  });

  return (
    <group ref={group} dispose={null}>
      {/* 
        The parsed version of the lightsaber with enhanced glowing materials.
      */}
      <LightSaberModel />
    </group>
  );
}

// Ultra-premium glowing lightsaber fallback
function GlowingLightsaber({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const bladeMaterial = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!group.current) return;
    const p = scrollProgress.current;
    
    const isMobile = window.innerWidth < 768;
    
    const startY = 3.5;
    const endY = -1.5;
    const currentY = startY + p * (endY - startY);
    
    const startX = isMobile ? 1.5 : 2.5;
    const curveX = Math.sin(p * Math.PI) * 2;
    const currentX = startX - p * startX - curveX;
    
    const currentZ = -4 + p * 3;
    
    group.current.position.set(currentX, currentY, currentZ);
    
    // Aggressive rotation for the saber fallback (deflecting/floating)
    const rY = p * Math.PI * 4 + state.clock.elapsedTime * 1.5;
    const rX = Math.cos(p * Math.PI * 2) * 2;
    const rZ = Math.sin(p * Math.PI * 2) * 0.5;
    
    group.current.rotation.set(rX, rY, rZ);

    // Pulse the plasma blade intensity
    if (bladeMaterial.current) {
      bladeMaterial.current.emissiveIntensity = 4 + Math.sin(state.clock.elapsedTime * 4) * 2;
    }
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 2.5, 32]} />
        <meshStandardMaterial 
          ref={bladeMaterial} 
          color="#ffffff" 
          emissive="#ffffff" 
          emissiveIntensity={4} 
          toneMapped={false} />
      </mesh>
      {/* Lightsaber Hilt */}
      <mesh position={[0, -1.35, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.4, 16]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

class ModelErrorBoundary extends React.Component<{ children: React.ReactNode, fallback: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <>{this.props.fallback}</>;
    }
    return <>{this.props.children}</>;
  }
}

export default function NinjaAnchor() {
  const scrollProgress = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useLenis((lenis) => {
    if (lenis) {
      scrollProgress.current = lenis.progress ?? 0;
    }
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 10 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance", toneMapping: THREE.NoToneMapping }}
        dpr={typeof window !== 'undefined' ? window.devicePixelRatio : 1}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={2.5} castShadow />
        
        {/* Cinematic Rim Lighting (Deep Blue + Orange) */}
        <spotLight position={[-8, 5, -5]} angle={0.4} penumbra={1} intensity={5} color="#3b82f6" />
        <spotLight position={[8, -5, 5]} angle={0.4} penumbra={1} intensity={3} color="#f97316" />

        <ModelErrorBoundary fallback={<GlowingLightsaber scrollProgress={scrollProgress} />}>
          <Suspense fallback={<GlowingLightsaber scrollProgress={scrollProgress} />}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
              <NinjaModel scrollProgress={scrollProgress} />
            </Float>
            <Preload all />
          </Suspense>
        </ModelErrorBoundary>

        {/* Post-processing Bloom for true glow effects on the saber */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} mipmapBlur intensity={2.0} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/light_saber.glb");
