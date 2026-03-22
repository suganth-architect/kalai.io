"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { useLenis } from "lenis/react";
import * as THREE from "three";

export default function TheAgent() {
  const meshRef = useRef<THREE.Mesh>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null);
  const scrollData = useRef({ progress: 0, velocity: 0 });

  useLenis((lenis) => {
    if (lenis) {
      scrollData.current.progress = lenis.progress ?? 0;
      scrollData.current.velocity = lenis.velocity ?? 0;
    }
  });

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;
    
    // 1. DYNAMIC MORPHING BASED ON SCROLL VELOCITY
    // When scrolling fast, the surface churns violently. When still, it breathes calmly.
    const targetVelocity = Math.abs(scrollData.current.velocity);
    materialRef.current.distort = THREE.MathUtils.damp(
      materialRef.current.distort, 
      0.2 + Math.min(targetVelocity * 0.05, 1.2), // Base distortion + velocity factor
      4, 
      delta
    );
    materialRef.current.speed = THREE.MathUtils.damp(
        materialRef.current.speed,
        1.5 + targetVelocity * 0.1, // Base speed + velocity factor
        4,
        delta
    );

    // 2. TIMELINE POSITIONING (Cinematic scrolling movement)
    const isMobile = window.innerWidth < 768;
    const p = scrollData.current.progress;
    
    // Enter from top right, move towards center bottom
    const startY = 3.5;
    const endY = -1.5;
    const currentY = startY + p * (endY - startY);
    
    const startX = isMobile ? 1.0 : 2.5;
    const curveX = Math.sin(p * Math.PI) * 1.5;
    const currentX = startX - p * startX * 1.5 - curveX;

    // Depth (Z axis)
    const zBase = -5;
    const zPush = p > 0.4 ? (p - 0.4) * 5 : 0; // Moves forward heavily during 'Revelation' phase
    const currentZ = zBase + zPush;

    meshRef.current.position.set(currentX, currentY, currentZ);

    // 3. MOUSE/TOUCH INTERACTION
    // The entity constantly pseudo-tracks the user's cursor
    const mouseX = state.pointer.x * 0.8;
    const mouseY = state.pointer.y * 0.8;
    
    const targetRotX = mouseY + p * Math.PI;
    const targetRotY = mouseX + p * Math.PI * 2;
    
    meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, targetRotX, 3, delta);
    meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, targetRotY, 3, delta);

    // 4. SCALE MAP
    // Scaled down slightly on mobile to preserve viewport space
    const baseScale = isMobile ? 1.2 : 1.6;
    const dynamicScale = baseScale + p * 0.8;
    meshRef.current.scale.setScalar(dynamicScale);
  });

  return (
    <group>
        {/* Core Fluid Entity */}
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[1, 128]} />
            <MeshDistortMaterial
                ref={materialRef}
                color="#ffffff"
                emissive="#0a1a3a"
                emissiveIntensity={0.6}
                metalness={1.0}
                roughness={0.15}
                clearcoat={1}
                clearcoatRoughness={0.1}
                envMapIntensity={2.5}
            />
        </mesh>

        {/* Inner Core Light acting as local illumination */}
        <pointLight position={[0, 0, 0]} intensity={2.0} distance={10} color="#ffffff" />
    </group>
  );
}
