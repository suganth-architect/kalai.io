"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useLenis } from "lenis/react";
import { useTexture } from "@react-three/drei";

function DomToCanvasMesh({ domId, imageUrl }: { domId: string; imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size } = useThree();
  const texture = useTexture(imageUrl);
  const scrollData = useRef({ velocity: 0 });
  const pointerPos = useRef({ x: 0, y: 0 });

  // === PERF FIX: Cache DOM element ref + bounding rect ===
  // Eliminates 360 getElementById + getBoundingClientRect calls/sec
  const domElRef = useRef<HTMLElement | null>(null);
  const cachedRect = useRef({ left: 0, top: 0, width: 1, height: 1 });

  const syncRect = () => {
    if (domElRef.current) {
      const r = domElRef.current.getBoundingClientRect();
      cachedRect.current.left = r.left;
      cachedRect.current.top = r.top;
      cachedRect.current.width = r.width;
      cachedRect.current.height = r.height;
    }
  };

  // Sync rect position on every Lenis scroll callback (once per frame, only when scrolling)
  useLenis((lenis) => {
    if (lenis) {
      scrollData.current.velocity = lenis.velocity ?? 0;
      syncRect(); // top/left change on scroll
    }
  });

  useEffect(() => {
    // DOM query ONCE on mount — cached for entire component lifetime
    domElRef.current = document.getElementById(domId);
    syncRect();

    // ResizeObserver updates cached dimensions on layout changes
    let ro: ResizeObserver | null = null;
    if (domElRef.current) {
      ro = new ResizeObserver(syncRect);
      ro.observe(domElRef.current);
    }

    // Pointer tracking
    const handlePointer = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e && e.touches.length > 0) {
         clientX = e.touches[0].clientX;
         clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
         clientX = (e as MouseEvent).clientX;
         clientY = (e as MouseEvent).clientY;
      } else {
         return;
      }
      pointerPos.current.x = (clientX / window.innerWidth) * 2 - 1;
      pointerPos.current.y = -(clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handlePointer, { passive: true });
    window.addEventListener("touchmove", handlePointer, { passive: true });
    
    return () => {
       ro?.disconnect();
       window.removeEventListener("mousemove", handlePointer);
       window.removeEventListener("touchmove", handlePointer);
       // === GPU DISPOSAL: Prevent texture + material memory leaks ===
       texture.dispose();
       materialRef.current?.dispose();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domId]);

  useFrame((state, delta) => {
     // Read from cached refs — ZERO DOM queries or forced reflows per frame
     if (!domElRef.current || !meshRef.current || !materialRef.current) return;

     const rect = cachedRect.current;
     
     // 1. Calculate mathematically precise screen scale
     const w = (rect.width / size.width) * viewport.width;
     const h = (rect.height / size.height) * viewport.height;
     meshRef.current.scale.set(w, h, 1);

     // 2. Extrapolate position against standard origin bounds
     const x = (rect.left / size.width) * viewport.width - viewport.width / 2 + w / 2;
     const y = -(rect.top / size.height) * viewport.height + viewport.height / 2 - h / 2;
     meshRef.current.position.set(x, y, 0);

     // 3. Process smooth continuous inertial velocity into uniform
     materialRef.current.uniforms.uVelocity.value = THREE.MathUtils.damp(
       materialRef.current.uniforms.uVelocity.value,
       Math.max(-30, Math.min(30, scrollData.current.velocity)),
       4,
       delta
     );
     
     // Base time
     materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
     
     // MOUSE HOVER DISTANCE LOGIC FOR LIQUID ABERRATION
     const rectLeftCenter = rect.left + rect.width / 2;
     const rectTopCenter = rect.top + rect.height / 2;
     
     const mousePxX = (pointerPos.current.x + 1) / 2 * size.width;
     const mousePxY = (-pointerPos.current.y + 1) / 2 * size.height;
     
     const distX = (mousePxX - rectLeftCenter) / rect.width;
     const distY = (mousePxY - rectTopCenter) / rect.height;
     const distance = Math.sqrt(distX*distX + distY*distY);
     
     materialRef.current.uniforms.uMouseDistance.value = THREE.MathUtils.damp(
       materialRef.current.uniforms.uMouseDistance.value,
       distance,
       6,
       delta
     );
  });

  const shaderArgs = useMemo(() => ({
    uniforms: {
      tDiffuse: { value: texture },
      uVelocity: { value: 0 },
      uTime: { value: 0 },
      uMouseDistance: { value: 10.0 }
    },
    vertexShader: `
      uniform float uVelocity;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 pos = position;
        float curve = sin(uv.y * 3.14159) * uVelocity * 0.008; 
        pos.z += curve;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform float uTime;
      uniform float uMouseDistance;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        float intensity = max(0.0, 1.0 - uMouseDistance * 1.5); 
        float shift = sin(uTime * 4.0 + uv.y * 15.0) * 0.012 * intensity;
        float r = texture2D(tDiffuse, vec2(uv.x + shift, uv.y)).r;
        float g = texture2D(tDiffuse, uv).g;
        float b = texture2D(tDiffuse, vec2(uv.x - shift, uv.y)).b;
        float a = texture2D(tDiffuse, uv).a;
        gl_FragColor = vec4(r, g, b, a);
      }
    `
  }), [texture]);

  return (
    <mesh ref={meshRef}>
       <planeGeometry args={[1, 1, 32, 32]} />
       <shaderMaterial ref={materialRef} args={[shaderArgs]} transparent />
    </mesh>
  );
}

export default function WebGLGallery() {
  return (
    <group position={[0, 0, -0.5]}>
      <DomToCanvasMesh domId="gallery-poster-1" imageUrl="/images/posters/poster-1.png" />
      <DomToCanvasMesh domId="gallery-poster-2" imageUrl="/images/posters/poster-2.png" />
      <DomToCanvasMesh domId="gallery-poster-3" imageUrl="/images/posters/poster-3.png" />
      <DomToCanvasMesh domId="gallery-poster-4" imageUrl="/images/posters/poster-4.png" />
      <DomToCanvasMesh domId="gallery-poster-5" imageUrl="/images/posters/poster-5.png" />
      <DomToCanvasMesh domId="gallery-poster-6" imageUrl="/images/posters/poster-6.png" />
    </group>
  );
}
