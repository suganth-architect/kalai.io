"use client";

import React from "react";
import { PerformanceMonitor } from "@react-three/drei";
import { useStageStore } from "../store/stageStore";

export default function WebGLOptimizer({ children }: { children?: React.ReactNode }) {
  const setFpsTier = useStageStore((s) => s.setFpsTier);

  return (
    <PerformanceMonitor 
      onIncline={() => setFpsTier("high")}
      onDecline={() => setFpsTier("low")}
      bounds={() => [45, 60]} 
      // Declines unconditionally if parsing drops below 45fps on heavy fragments
      // Only inclines sequentially back if it hits perfectly smooth 60fps stable repeatedly
    >
      {children}
    </PerformanceMonitor>
  );
}
