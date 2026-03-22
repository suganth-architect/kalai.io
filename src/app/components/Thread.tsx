"use client";

import { useEffect, useRef, useCallback } from "react";
import { useLenis } from "lenis/react";

/* ════════════════════════════════════════════════════════════════
   THE THREAD — Signature Visual Element
   ════════════════════════════════════════════════════════════════ */

const STAGES = {
  arrival:    { start: 0.00, end: 0.12 },
  disruption: { start: 0.12, end: 0.28 },
  revelation: { start: 0.28, end: 0.42 },
  proof:      { start: 0.42, end: 0.65 },
  desire:     { start: 0.65, end: 0.85 },
  conversion: { start: 0.85, end: 1.00 },
} as const;

interface ThreadFrame {
  paths: string[];
  opacities: number[];
  strokeWidths: number[];
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function stageProgress(scroll: number, stage: keyof typeof STAGES): number {
  const s = STAGES[stage];
  return clamp01((scroll - s.start) / (s.end - s.start));
}

export default function Thread() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<SVGPathElement[]>([]);
  const glowRefs = useRef<SVGPathElement[]>([]);
  const rafId = useRef<number>(0);
  
  const scrollProgress = useRef<number>(0);
  const velocity = useRef<number>(0);
  const smoothVelocity = useRef<number>(0);
  
  const time = useRef<number>(0);
  const prefersReducedMotion = useRef<boolean>(false);

  /* ── Sync scroll position from Lenis ── */
  useLenis((lenis) => {
    if (lenis) {
      scrollProgress.current = lenis.progress ?? 0;
      velocity.current = lenis.velocity ?? 0;
    }
  });

  const getStage = useCallback((scroll: number): keyof typeof STAGES => {
    if (scroll < STAGES.arrival.end) return "arrival";
    if (scroll < STAGES.disruption.end) return "disruption";
    if (scroll < STAGES.revelation.end) return "revelation";
    if (scroll < STAGES.proof.end) return "proof";
    if (scroll < STAGES.desire.end) return "desire";
    return "conversion";
  }, []);

  /* ── Build SVG paths for each stage ── */

  const buildArrival = useCallback(
    (t: number, vw: number, vh: number, vMag: number): ThreadFrame => {
      const y = vh * 0.85;
      const cx = vw / 2;
      const halfW = vw * 0.2;
      
      const breathe = Math.sin(t * 0.5) * 0.05; // Gentle breathing idle
      const opacity = clamp01(0.6 + breathe); 
      const sw = 1.0; 
      
      // Extremely subtle, controlled line
      const curve = Math.sin(t * 0.5) * (1 + vMag * 4); 
      const shadowOffset = Math.sin(t * 1.5) * 2; // Abstract ninja movement hint
      const path = `M${cx - halfW},${y} Q${cx + shadowOffset},${y + curve} ${cx + halfW},${y}`;
      return { paths: [path], opacities: [opacity], strokeWidths: [sw] };
    },
    []
  );

  const buildDisruption = useCallback(
    (t: number, progress: number, vw: number, vh: number, vMag: number): ThreadFrame => {
      const cx = vw / 2;
      const baseY = vh * 0.5;
      const halfW = vw * 0.15;
      const separation = progress * 15; // Smooth divergence, no aggressive jitter

      const paths: string[] = [];
      const opacities: number[] = [];
      const strokeWidths: number[] = [];

      for (let i = 0; i < 3; i++) {
        const yOffset = (i - 1) * separation;
        
        // High frequency unstable jitter, not loose organic
        const jitterX = Math.sin(t * (15 + i * 3)) * (1 + vMag * 10);
        
        const opacity = 0.7; 
        const sw = 1.0 + Math.random() * 0.5 * vMag;
        
        const x1 = cx - halfW + jitterX;
        const x2 = cx + halfW - jitterX;
        const y = baseY + yOffset;
        
        // Sharp broken angled lines instead of curves
        const midY = y + Math.sin(t * (20 + i)) * (3 + vMag * 15);
        paths.push(`M${x1},${y} L${cx + jitterX * 2},${midY} L${x2},${y}`);
        opacities.push(opacity);
        strokeWidths.push(sw);
      }

      return { paths, opacities, strokeWidths };
    },
    []
  );

  const buildRevelation = useCallback(
    (t: number, progress: number, vw: number, vh: number, vMag: number): ThreadFrame => {
      const isMobile = vw < 768;
      
      const drawT = clamp01((progress - 0.15) / 0.85); 
      const opacity = lerp(0.85, 1.0, progress); // High contrast flare
      const sw = 1.5;
      
      // Sharp light slash cutting diagonally
      const startX = isMobile ? vw * 0.9 : vw * 0.6;
      const startY = vh * 0.05;
      const targetX = isMobile ? vw * 0.1 : vw * 0.382;
      const targetY = vh * 0.95;
      
      const endX = lerp(startX, targetX, drawT);
      const endY = lerp(startY + 5, targetY, drawT);
      
      // Shadow crossing effect (Ninja presence)
      const shadowBlur = Math.sin(t * 8) > 0.9 ? 1 : 0;
      const finalOpacity = opacity * (1 - shadowBlur * 0.3);
      
      const path = `M${startX},${startY} L${endX},${endY}`;

      return {
        paths: [path],
        opacities: [finalOpacity],
        strokeWidths: [sw]
      };
    },
    []
  );

  const buildProof = useCallback(
    (t: number, progress: number, vw: number, vh: number, vMag: number): ThreadFrame => {
      const isMobile = vw < 768;
      const x = isMobile ? vw * 0.08 : vw * 0.382;
      const paths: string[] = [];
      const opacities: number[] = [];
      const strokeWidths: number[] = [];

      // Main line: guiding, straight, minimal
      const xOffset = Math.sin(t * 0.5) * (0.5 + vMag * 2);
      paths.push(`M${x + xOffset},${vh * 0.05} L${x - xOffset},${vh * 0.95}`);
      opacities.push(0.85); 
      strokeWidths.push(1.0); 

      // Structural branches pinning the cards visually
      const branchYPositions = [0.25, 0.50, 0.75];
      const branchLength = isMobile ? 25 : 45;

      branchYPositions.forEach((yRatio, i) => {
        const branchStart = i * 0.3;
        const branchProgress = clamp01((progress - branchStart) / 0.25);
        const branchEnd = clamp01((progress - branchStart - 0.25) / 0.2);

        if (branchProgress > 0) {
          const by = vh * yRatio;
          const bxEnd = x + branchLength * branchProgress;
          const bCtrlY = by + Math.sin(t * (1.0 + i * 0.4)) * (2 + vMag * 4);
          paths.push(`M${x},${by} Q${x + 10},${bCtrlY} ${bxEnd},${by}`);
          
          opacities.push(lerp(0, 0.85, branchProgress) * (1 - branchEnd * 0.6));
          strokeWidths.push(1.5);
        }
      });

      return { paths, opacities, strokeWidths };
    },
    []
  );

  const buildDesire = useCallback(
    (t: number, progress: number, vw: number, vh: number, vMag: number): ThreadFrame => {
      const isMobile = vw < 768;
      const x = isMobile ? vw * 0.08 : vw * 0.382;
      const waveFreq = (2 * Math.PI) / 200;
      
      const dampen = 1 - clamp01((progress - 0.8) / 0.2);
      
      // Transition = amplified movement. Idle = calm, completely serene.
      const amplitude = lerp(0.5, 3 + vMag * 10, clamp01(progress / 0.3));

      let path = "";
      const segments = 20;
      const segHeight = vh / segments;

      for (let i = 0; i <= segments; i++) {
        const y = i * segHeight;
        const wave = Math.sin(y * waveFreq + t * 0.5) * amplitude * dampen;
        const px = x + wave;
        path += i === 0 ? `M${px},${y}` : ` L${px},${y}`;
      }

      const opacity = 0.7;
      const sw = 1.0;
      return { paths: [path], opacities: [opacity], strokeWidths: [sw] };
    },
    []
  );

  const buildConversion = useCallback(
    (t: number, progress: number, vw: number, vh: number, vMag: number): ThreadFrame => {
      const x = vw < 768 ? vw * 0.08 : vw * 0.382;
      const straighten = clamp01(progress / 0.4);
      
      const ctaX = vw / 2; // Precise center of screen
      const ctaY = vh * 0.45;
      
      const topX = lerp(x, ctaX, straighten * 0.3);
      
      const termProgress = progress > 0.5 ? clamp01((progress - 0.5) / 0.3) : 0;
      
      const movingFactor = 1 - termProgress;
      const residual = (1 - straighten) * (1 + vMag * 3) * movingFactor;

      let path = "";
      const segments = 15;
      const segHeight = vh / segments;

      for (let i = 0; i <= segments; i++) {
        const ratio = i / segments;
        const y = i * segHeight;
        const px = lerp(topX, ctaX, ratio * straighten) + (Math.sin(y * 0.05 + t) * residual);
        path += i === 0 ? `M${px},${y}` : ` L${px},${y}`;
      }

      if (progress > 0.5) {
        const termY = lerp(vh * 0.9, ctaY, termProgress);
        path = path.replace(/L[^L]*$/, `L${ctaX},${termY}`);
      }

      // Subtle pulse to indicate system readiness
      const pulseTension = termProgress > 0.95 ? Math.sin(t * 1.5) * 0.05 : 0;
      const opacity = 0.9 + pulseTension;
      const sw = 1.5;
      
      return { paths: [path], opacities: [opacity], strokeWidths: [sw] };
    },
    []
  );

  /* ── Main animation loop ── */
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mql.matches;
    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mql.addEventListener("change", handleChange);

    let lastTime = performance.now();

    const updateFrame = (frame: ThreadFrame) => {
      const paths = pathRefs.current;
      const glowPs = glowRefs.current;

      frame.paths.forEach((d, i) => {
        if (paths[i] && glowPs[i]) {
          // Inner Core: Sharp, white blade
          paths[i].setAttribute("d", d);
          paths[i].style.opacity = String(Math.max(0.4, frame.opacities[i])); // Solid core
          paths[i].style.strokeWidth = String(frame.strokeWidths[i]);
          paths[i].style.stroke = "rgba(255, 255, 255, 0.95)";
          
          // Outer Glow: Controlled, NOT neon, NOT messy. Very tight blur.
          const glowOpacity = Math.max(0.08, frame.opacities[i] * 0.2);
          glowPs[i].setAttribute("d", d);
          glowPs[i].style.opacity = String(glowOpacity);
          glowPs[i].style.strokeWidth = "2.5";
          glowPs[i].style.stroke = "rgba(255, 255, 255, 0.6)";
          glowPs[i].style.filter = "blur(1px)";
        }
      });

      for (let i = frame.paths.length; i < paths.length; i++) {
        if (paths[i]) paths[i].style.opacity = "0";
        if (glowPs[i]) glowPs[i].style.opacity = "0";
      }
    };

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      time.current += dt;

      const svg = svgRef.current;
      if (!svg) {
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scroll = scrollProgress.current;
      const t = time.current;
      
      smoothVelocity.current = lerp(smoothVelocity.current, Math.abs(velocity.current), 0.1);
      const vMag = clamp01(smoothVelocity.current / 50);

      // Thread must NEVER become completely static. Small base multiplier enforces constant life.
      if (prefersReducedMotion.current) {
        const x = vw < 768 ? vw * 0.08 : vw * 0.382;
        updateFrame({
          paths: [`M${x},${vh * 0.1} L${x},${vh * 0.9}`],
          opacities: [0.85],
          strokeWidths: [1.5],
        });
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      const stage = getStage(scroll);
      let frame: ThreadFrame;

      switch (stage) {
        case "arrival":
          frame = buildArrival(t, vw, vh, vMag);
          break;
        case "disruption":
          frame = buildDisruption(t, Math.max(0.01, stageProgress(scroll, "disruption")), vw, vh, vMag);
          break;
        case "revelation":
          frame = buildRevelation(t, stageProgress(scroll, "revelation"), vw, vh, vMag);
          break;
        case "proof":
          frame = buildProof(t, stageProgress(scroll, "proof"), vw, vh, vMag);
          break;
        case "desire":
          frame = buildDesire(t, stageProgress(scroll, "desire"), vw, vh, vMag);
          break;
        case "conversion":
          frame = buildConversion(t, stageProgress(scroll, "conversion"), vw, vh, vMag);
          break;
      }

      updateFrame(frame);

      if (scroll > 0.97) {
        svg.style.opacity = String(Math.max(0.3, 1 - clamp01((scroll - 0.97) / 0.03)));
      } else {
        svg.style.opacity = "1";
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId.current);
      mql.removeEventListener("change", handleChange);
    };
  }, [
    getStage,
    buildArrival,
    buildDisruption,
    buildRevelation,
    buildProof,
    buildDesire,
    buildConversion,
  ]);

  const setPathRef = useCallback(
    (index: number) => (el: SVGPathElement | null) => {
      if (el) pathRefs.current[index] = el;
    },
    []
  );
  
  const setGlowRef = useCallback(
    (index: number) => (el: SVGPathElement | null) => {
      if (el) glowRefs.current[index] = el;
    },
    []
  );

  return (
    <svg
      ref={svgRef}
      className="thread-svg"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Glow Layer */}
      {Array.from({ length: 6 }).map((_, i) => (
        <path
          key={`glow-${i}`}
          ref={setGlowRef(i)}
          className="thread-glow"
          fill="none"
          stroke="var(--color-accent)"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: "blur(1.5px)" }}
        />
      ))}
      
      {/* Inner Core Layer */}
      {Array.from({ length: 6 }).map((_, i) => (
        <path
          key={`core-${i}`}
          ref={setPathRef(i)}
          className="thread-line mix-blend-screen"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
