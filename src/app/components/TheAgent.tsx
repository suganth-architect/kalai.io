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
  const { currentStage, isTransitioning, isManualOverride, fpsTier } = useStageStore();

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
    
    // OVERRIDE MODE: Immediate state hijack, detaching from linear timeline interpolation
    if (isManualOverride) {
      targetProps.current = {
        x: 0, y: 0, z: -2,
        scale: isMobile ? 1.5 : 2.5,
        distort: 1.5, speed: 5.0, // Max disruption and churn
        emissive: new THREE.Color("#ff2a00"), // Glitch red
        color: new THREE.Color("#ffffff"),
        intensity: 2.5
      };
      return; // Skip stage mapping
    }

    // STANDARD CHOREOGRAPHY 
    switch (currentStage) {
      case 1:
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
        targetProps.current = {
          x: 0, y: 0, z: -2,
          scale: isMobile ? 0.9 : 1.4, // Drastically reduced the blob width
          distort: 0.0, speed: 0.2,
          emissive: new THREE.Color("#051024"), // Deep dark cinematic blue
          color: new THREE.Color("#051024"), // Deep dark cinematic blue
          intensity: 0.8 // Lowered heavily so it acts as a very subtle dark glow protecting white text
        };
        break;
      case 4:
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
      default:
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
  }, [currentStage, isManualOverride]);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;
    
    const tg = targetProps.current;
    
    // Position Damping & Calculations
    if (isManualOverride) {
      // 100% Sandbox tracking to cursor bounds mapped to viewport sizes
      const pointerX = state.pointer.x * 5.0;
      const pointerY = state.pointer.y * 5.0;
      meshRef.current.position.x = THREE.MathUtils.damp(meshRef.current.position.x, pointerX, 4, delta);
      meshRef.current.position.y = THREE.MathUtils.damp(meshRef.current.position.y, pointerY, 4, delta);
      meshRef.current.position.z = THREE.MathUtils.damp(meshRef.current.position.z, tg.z, 2.5, delta);
    } else {
      // Standard interpolation
      meshRef.current.position.x = THREE.MathUtils.damp(meshRef.current.position.x, tg.x, 2.5, delta);
      meshRef.current.position.y = THREE.MathUtils.damp(meshRef.current.position.y, tg.y, 2.5, delta);
      meshRef.current.position.z = THREE.MathUtils.damp(meshRef.current.position.z, tg.z, 2.5, delta);
    }

    // Scale calculation (Transition envelope override > Stage 6 pulse > Default)
    let targetScale = tg.scale;
    if (isTransitioning) {
      targetScale = 50.0; // Envelopes the camera entirely cutting off navigation seamlessly
    } else if (!isManualOverride && currentStage === 6) {
      const dist = Math.sqrt(state.pointer.x ** 2 + state.pointer.y ** 2);
      const pulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
      targetScale += pulse + (Math.max(0, 1.5 - dist) * 0.4); 
    }
    
    // Scale snap speed changes dramatically if acting as a routing transition
    const scaleDampSpeed = isTransitioning ? 5.0 : 3.0;
    meshRef.current.scale.setScalar(THREE.MathUtils.damp(meshRef.current.scale.x, targetScale, scaleDampSpeed, delta));

    // Dynamic Morphing & Rotation (add chaotic scroll shear if NOT manual override)
    const targetVelocity = Math.abs(scrollData.current.velocity);
    const velMap = isManualOverride ? 0 : Math.min(targetVelocity * 0.05, 1.2);

    materialRef.current.distort = THREE.MathUtils.damp(materialRef.current.distort, tg.distort + velMap, 3, delta);
    materialRef.current.speed = THREE.MathUtils.damp(materialRef.current.speed, tg.speed + velMap * 1.5, 3, delta);

    // Color Lerping seamlessly globally
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
            {/* Dynamically slice segment count if parsing drops, ensuring 60fps locking on potato devices */}
            {fpsTier === "high" ? (
              <icosahedronGeometry args={[1, 128]} />
            ) : (
               <icosahedronGeometry args={[1, 64]} />
            )}
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
