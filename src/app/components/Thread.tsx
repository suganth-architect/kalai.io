"use client";

import { useEffect, useRef, useCallback } from "react";
import { useLenis } from "lenis/react";

/* ════════════════════════════════════════════════════════════════
   THE THREAD — Signature Visual Element
   
   A single luminescent filament that traverses the entire scroll.
   Represents Kalai's intelligence — not literally, perceptually.
   
   Implementation: SVG <path> driven by scroll position.
   No canvas. No WebGL. Pure SVG + rAF.
   
   Stage behavior:
     ARRIVAL    → DORMANT   (horizontal hairline, breathing)
     DISRUPTION → FRACTURED (segments drift, jitter, async pulse)
     REVELATION → COHERENT  (vertical line, stable glow, drawing)
     PROOF      → CONNECTED (vertical + horizontal branches)
     DESIRE     → FLOWING   (sinusoidal wave, autonomous)
     CONVERSION → RESOLVED  (straightens, converges to CTA)
   ════════════════════════════════════════════════════════════════ */

/** Stage boundaries as scroll progress (0–1) */
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
  /** Optional glow path (only REVELATION uses this) */
  glow?: { d: string; opacity: number; strokeWidth: number };
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

function wobble(t: number, freq: number, amp: number): number {
  return Math.sin(t * freq) * amp + Math.sin(t * freq * 1.7 + 0.5) * amp * 0.4;
}

export default function Thread() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<SVGPathElement[]>([]);
  const glowRef = useRef<SVGPathElement>(null);
  const rafId = useRef<number>(0);
  const scrollProgress = useRef<number>(0);
  const time = useRef<number>(0);
  const prefersReducedMotion = useRef<boolean>(false);

  /* ── Sync scroll position from Lenis ── */
  useLenis((lenis) => {
    if (lenis) {
      scrollProgress.current = lenis.progress ?? 0;
    }
  });

  /* ── Resolve current stage from scroll ── */
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
    (t: number, vw: number, vh: number): ThreadFrame => {
      const y = vh * 0.85;
      const cx = vw / 2;
      const halfW = vw * 0.2;
      const breathe = Math.sin(t * 0.785) * 0.03;
      const opacity = 0.15 + breathe;
      const sw = 1.2 + Math.sin(t * 0.8) * 0.6; // increased thickness variation
      const curve = Math.sin(t * 0.5) * 15; // slight organic bend
      const path = `M${cx - halfW},${y} Q${cx},${y + curve} ${cx + halfW},${y}`;
      return { paths: [path], opacities: [opacity], strokeWidths: [sw] };
    },
    []
  );

  const buildDisruption = useCallback(
    (t: number, progress: number, vw: number, vh: number): ThreadFrame => {
      const cx = vw / 2;
      const baseY = vh * 0.5;
      const halfW = vw * 0.15;
      const separation = progress * 8;

      const paths: string[] = [];
      const opacities: number[] = [];
      const strokeWidths: number[] = [];

      for (let i = 0; i < 3; i++) {
        const yOffset = (i - 1) * separation * (2 + Math.sin(t * (1.2 + i * 0.3)) * 0.8);
        const jitterX = wobble(t + i * 2.1, 4.5 + i * 0.7, 3.0); // intensified drift
        const flicker = Math.sin(t * (4.8 + i * 1.9) + i * 1.3); // faster flicker
        const sharpFlicker = flicker > 0.8 ? 0.9 : (0.05 + 0.1 * flicker); // harsh bursts
        const opacity = sharpFlicker;
        const sw = 1.0 + Math.sin(t * (2.6 + i * 0.2)) * 1.2; // more thickness shifts
        const x1 = cx - halfW + jitterX;
        const x2 = cx + halfW + jitterX * 0.7;
        const y = baseY + yOffset;
        const curveY = y + Math.sin(t * (1.1 + i)) * 10; // slight bow
        paths.push(`M${x1},${y} Q${(x1+x2)/2},${curveY} ${x2},${y}`);
        opacities.push(opacity);
        strokeWidths.push(sw);
      }

      return { paths, opacities, strokeWidths };
    },
    []
  );

  const buildRevelation = useCallback(
    (t: number, progress: number, vw: number, vh: number): ThreadFrame => {
      const isMobile = vw < 768;
      const x = isMobile ? vw * 0.08 : vw * 0.382;
      const coalesceT = clamp01(progress / 0.15);
      const drawT = clamp01((progress - 0.15) / 0.85);
      const opacity = lerp(0.20, 0.55, coalesceT);
      const glowOpacity = lerp(0, 0.25, drawT);
      const startY = vh * 0.15;
      const endY = lerp(startY + 10, vh * 0.90, drawT);
      const microWave = Math.sin(t * 0.3) * 0.5;
      const sw = lerp(1.5, 3.5, drawT) + Math.sin(t * 0.9) * 0.8; // THICKER burst
      const endX = x - microWave * 0.5;
      const curveX = x + Math.sin(t * 0.6) * 20; // gentle curve
      const path = `M${x + microWave},${startY} C${curveX},${startY + 50} ${x - Math.sin(t * 0.4) * 15},${endY - 50} ${endX},${endY}`;

      return {
        paths: [path],
        opacities: [opacity],
        strokeWidths: [sw],
        glow: { d: path, opacity: glowOpacity, strokeWidth: sw + 3 },
      };
    },
    []
  );

  const buildProof = useCallback(
    (t: number, progress: number, vw: number, vh: number): ThreadFrame => {
      const isMobile = vw < 768;
      const x = isMobile ? vw * 0.08 : vw * 0.382;
      const paths: string[] = [];
      const opacities: number[] = [];
      const strokeWidths: number[] = [];

      // Main vertical line (slight S-curve)
      const ctrlX1 = x + Math.sin(t * 0.5) * 18;
      const ctrlX2 = x - Math.sin(t * 0.7) * 18;
      paths.push(`M${x},${vh * 0.05} C${ctrlX1},${vh * 0.3} ${ctrlX2},${vh * 0.7} ${x},${vh * 0.95}`);
      opacities.push(0.45);
      strokeWidths.push(2.0 + Math.sin(t * 0.8) * 0.6); // more noticeable breathing

      // Branches (max 3)
      const branchYPositions = [0.25, 0.50, 0.75];
      const branchLength = isMobile ? 25 : 35;

      branchYPositions.forEach((yRatio, i) => {
        const branchStart = i * 0.3;
        const branchProgress = clamp01((progress - branchStart) / 0.25);
        const branchEnd = clamp01((progress - branchStart - 0.25) / 0.2);

        if (branchProgress > 0) {
          const by = vh * yRatio;
          const bxEnd = x + branchLength * branchProgress;
          const bWobble = Math.sin(t * (0.8 + i * 0.3)) * 1.5;
          paths.push(`M${x},${by} L${bxEnd},${by + bWobble}`);
          opacities.push(lerp(0, 0.35, branchProgress) * (1 - branchEnd * 0.6));
          strokeWidths.push(1.0 + Math.sin(t * (0.5 + i * 0.2)) * 0.15);
        }
      });

      return { paths, opacities, strokeWidths };
    },
    []
  );

  const buildDesire = useCallback(
    (t: number, progress: number, vw: number, vh: number): ThreadFrame => {
      const isMobile = vw < 768;
      const x = isMobile ? vw * 0.08 : vw * 0.382;
      const waveFreq = (2 * Math.PI) / 200;
      const amplitude = lerp(0, 10, clamp01(progress / 0.3));
      const dampen = 1 - clamp01((progress - 0.8) / 0.2);

      let path = "";
      const segments = 40;
      const segHeight = vh / segments;

      for (let i = 0; i <= segments; i++) {
        const y = i * segHeight;
        const wave = Math.sin(y * waveFreq + t * 1.047) * amplitude * dampen;
        const micro = Math.sin(y * 0.05 + t * 0.7) * 0.8;
        const px = x + wave + micro;
        path += i === 0 ? `M${px},${y}` : ` L${px},${y}`;
      }

      const opacity = 0.40 + Math.sin(t * 0.5) * 0.05;
      const sw = 1.4 + Math.sin(t * 0.3) * 0.15;
      return { paths: [path], opacities: [opacity], strokeWidths: [sw] };
    },
    []
  );

  const buildConversion = useCallback(
    (t: number, progress: number, vw: number, vh: number): ThreadFrame => {
      const isMobile = vw < 768;
      const x = isMobile ? vw * 0.08 : vw * 0.382;
      const straighten = clamp01(progress / 0.4);
      const ctaX = vw / 2; // Resolve perfectly into the exact center of CTA
      const ctaY = vh * 0.45;
      const topX = lerp(x, ctaX, straighten * 0.3);
      const pulse = Math.sin(t * 1.571) * 0.05;
      const opacity = 0.45 + pulse;
      const residual = (1 - straighten) * 3;

      let path = "";
      const segments = 30;
      const segHeight = vh / segments;

      for (let i = 0; i <= segments; i++) {
        const ratio = i / segments;
        const y = i * segHeight;
        const wave = Math.sin(y * 0.03 + t * 0.8) * residual;
        const px = lerp(topX + wave, ctaX, ratio * straighten);
        path += i === 0 ? `M${px},${y}` : ` L${px},${y}`;
      }

      if (progress > 0.5) {
        const termProgress = clamp01((progress - 0.5) / 0.3);
        const termY = lerp(vh * 0.9, ctaY, termProgress);
        path = path.replace(/L[^L]*$/, `L${ctaX},${termY}`);
      }

      const sw = 1.3 + Math.sin(t * 0.4) * 0.1;
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
      const glowPath = glowRef.current;

      // Update data paths
      frame.paths.forEach((d, i) => {
        if (paths[i]) {
          paths[i].setAttribute("d", d);
          paths[i].style.opacity = String(frame.opacities[i]);
          paths[i].style.strokeWidth = String(frame.strokeWidths[i]);
        }
      });

      // Hide unused paths
      for (let i = frame.paths.length; i < paths.length; i++) {
        if (paths[i]) paths[i].style.opacity = "0";
      }

      // Glow path (only REVELATION provides this)
      if (glowPath) {
        if (frame.glow) {
          glowPath.setAttribute("d", frame.glow.d);
          glowPath.style.opacity = String(frame.glow.opacity);
          glowPath.style.strokeWidth = String(frame.glow.strokeWidth);
        } else {
          glowPath.style.opacity = "0";
        }
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

      // Reduced motion: static vertical line
      if (prefersReducedMotion.current) {
        const x = vw < 768 ? vw * 0.08 : vw * 0.382;
        updateFrame({
          paths: [`M${x},${vh * 0.1} L${x},${vh * 0.9}`],
          opacities: [0.25],
          strokeWidths: [1.2],
        });
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      const stage = getStage(scroll);
      let frame: ThreadFrame;

      switch (stage) {
        case "arrival":
          frame = buildArrival(t, vw, vh);
          break;
        case "disruption":
          frame = buildDisruption(t, stageProgress(scroll, "disruption"), vw, vh);
          break;
        case "revelation":
          frame = buildRevelation(t, stageProgress(scroll, "revelation"), vw, vh);
          break;
        case "proof":
          frame = buildProof(t, stageProgress(scroll, "proof"), vw, vh);
          break;
        case "desire":
          frame = buildDesire(t, stageProgress(scroll, "desire"), vw, vh);
          break;
        case "conversion":
          frame = buildConversion(t, stageProgress(scroll, "conversion"), vw, vh);
          break;
      }

      updateFrame(frame);

      // Footer fade: last 3% of scroll
      if (scroll > 0.97) {
        svg.style.opacity = String(1 - clamp01((scroll - 0.97) / 0.03));
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

  /* ── Set path refs ── */
  const setPathRef = useCallback(
    (index: number) => (el: SVGPathElement | null) => {
      if (el) pathRefs.current[index] = el;
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
      {/* Glow layer (blur filter, only visible during REVELATION) */}
      <path
        ref={glowRef}
        className="thread-glow"
        fill="none"
        stroke="var(--color-accent)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Primary thread paths — up to 6 for disruption segments + proof branches */}
      {Array.from({ length: 6 }).map((_, i) => (
        <path
          key={i}
          ref={setPathRef(i)}
          className="thread-line"
          fill="none"
          stroke="var(--color-accent)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
