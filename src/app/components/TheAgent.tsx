"use client";

import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { useLenis } from "lenis/react";
import * as THREE from "three";
import { useStageStore } from "../store/stageStore";

export default function TheAgent() {
  const meshRef = useRef<THREE.Mesh>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null);
  const scrollData = useRef({ progress: 0, velocity: 0 });
  const { currentStage } = useStageStore();

  useLenis((lenis) => {
    if (lenis) {
      scrollData.current.progress = lenis.progress ?? 0;
      scrollData.current.velocity = lenis.velocity ?? 0;
    }
  });

  // Choreography Targets
  const targetProps = useRef({
    x: 0, y: 0, z: -5,
    scale: 2.0,
    distort: 0.2, speed: 1.0,
    emissive: new THREE.Color("#0a1a3a"),
    color: new THREE.Color("#ffffff"),
    intensity: 0.5
  });

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    switch (currentStage) {
      case 1:
        // Stage 1 (Arrival): Massive, perfectly centered, pulsing slowly. Low distortion.
        targetProps.current = {
          x: 0, y: 0, z: -3,
          scale: isMobile ? 1.5 : 2.5,
          distort: 0.1, speed: 1.0,
          emissive: new THREE.Color("#0a1a3a"),
          color: new THREE.Color("#ffffff"),
          intensity: 0.8
        };
        break;
      case 2:
        // Stage 2 (Disruption): Moves to the top-right corner. Chaotic spikes. Darker, aggressive tone.
        targetProps.current = {
          x: isMobile ? 1.0 : 3.0, y: isMobile ? 1.5 : 2.0, z: -4,
          scale: isMobile ? 1.0 : 1.4,
          distort: 0.85, speed: 4.5,
          emissive: new THREE.Color("#3a0a0a"), 
          color: new THREE.Color("#888888"),
          intensity: 1.5
        };
        break;
      case 3:
        // Stage 3 (Revelation): Snaps back to center. Highly emissive, glass-like perfect sphere.
        targetProps.current = {
          x: 0, y: 0, z: -2,
          scale: isMobile ? 1.4 : 2.2,
          distort: 0.0, speed: 0.2,
          emissive: new THREE.Color("#3b82f6"),
          color: new THREE.Color("#ffffff"),
          intensity: 3.5
        };
        break;
      case 4:
        // Stage 4 (Proof): Scales down and drops to bottom, dynamic light source.
        targetProps.current = {
          x: 0, y: -2.0, z: -2,
          scale: isMobile ? 0.8 : 1.2,
          distort: 0.2, speed: 1.5,
          emissive: new THREE.Color("#f97316"),
          color: new THREE.Color("#ffffff"),
          intensity: 2.5
        };
        break;
      case 5:
        // Stage 5 (Desire): Soft peripheral drift.
        targetProps.current = {
          x: isMobile ? -1.0 : -2.5, y: 0, z: -4,
          scale: 1.6,
          distort: 0.3, speed: 1.0,
          emissive: new THREE.Color("#0a1a3a"),
          color: new THREE.Color("#ffffff"),
          intensity: 1.0
        };
        break;
      case 6:
        // Stage 6 (Conversion): Expands massively to engulf the background behind the input field.
        targetProps.current = {
          x: 0, y: 0, z: -1,
          scale: isMobile ? 3.5 : 5.5,
          distort: 0.15, speed: 0.8,
          emissive: new THREE.Color("#050a14"), 
          color: new THREE.Color("#222222"),
          intensity: 0.4
        };
        break;
      case 7:
        // Ecosystem baseline
        targetProps.current = {
          x: 0, y: 0, z: -5,
          scale: 2.0,
          distort: 0.2, speed: 1.0,
          emissive: new THREE.Color("#0a1a3a"),
          color: new THREE.Color("#ffffff"),
          intensity: 0.6
        };
        break;
    }
  }, [currentStage]);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;
    
    const tg = targetProps.current;
    
    // Velocity tracking for additional chaotic shear during fast scrolling
    const targetVelocity = Math.abs(scrollData.current.velocity);
    const velMap = Math.min(targetVelocity * 0.05, 1.2);

    // Position Damping
    meshRef.current.position.x = THREE.MathUtils.damp(meshRef.current.position.x, tg.x, 2.5, delta);
    meshRef.current.position.y = THREE.MathUtils.damp(meshRef.current.position.y, tg.y, 2.5, delta);
    meshRef.current.position.z = THREE.MathUtils.damp(meshRef.current.position.z, tg.z, 2.5, delta);

    // Scale calculation (includes mouse proximity pulsing in stage 6)
    let finalScale = tg.scale;
    if (currentStage === 6) {
      // Calculate cursor distance from center
      const dist = Math.sqrt(state.pointer.x ** 2 + state.pointer.y ** 2);
      const pulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
      finalScale += pulse + (Math.max(0, 1.5 - dist) * 0.4); // Inflates as mouse nears center
    }
    meshRef.current.scale.setScalar(THREE.MathUtils.damp(meshRef.current.scale.x, finalScale, 3, delta));

    // Dynamic Morphing & Rotation
    materialRef.current.distort = THREE.MathUtils.damp(materialRef.current.distort, tg.distort + velMap, 3, delta);
    materialRef.current.speed = THREE.MathUtils.damp(materialRef.current.speed, tg.speed + velMap * 1.5, 3, delta);

    // Color Lerping
    materialRef.current.emissive.lerp(tg.emissive, 0.05);
    materialRef.current.color.lerp(tg.color, 0.05);
    materialRef.current.emissiveIntensity = THREE.MathUtils.damp(materialRef.current.emissiveIntensity, tg.intensity, 2, delta);

    // Mouse interactive rotation
    const mouseX = state.pointer.x * 0.8;
    const mouseY = state.pointer.y * 0.8;
    meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, mouseY, 3, delta);
    meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, mouseX + state.clock.elapsedTime * 0.2, 3, delta);
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
        
        {/* Dynamic Inner Glow passing through post-processing Bloom */}
        <pointLight position={[0, 0, 0]} intensity={2.0} distance={10} color="#ffffff" />
    </group>
  );
}
