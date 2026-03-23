"use client";

import { useEffect, useRef } from "react";
import { useStageStore } from "../store/stageStore";

export default function KalaiObserver() {
  const { currentStage, isManualOverride } = useStageStore();
  
  const metrics = useRef({
    maxScrollDepth: 0,
    timeInStages: {} as Record<number, number>,
    sandboxTriggered: false,
    _lastStageEntryTime: 0,
  });

  useEffect(() => {
    // Initializes on actual client hydration exclusively enforcing React render purity
    if (metrics.current._lastStageEntryTime === 0) {
      metrics.current._lastStageEntryTime = Date.now();
    }
  }, []);

  // Track max scroll depth via standard passive listener completely decoupled from the R3F loop to prevent frame dropping
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const pct = Math.floor((scrollY / totalHeight) * 100);
        if (pct > metrics.current.maxScrollDepth) {
            metrics.current.maxScrollDepth = pct;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track exact time mapped per stage
  useEffect(() => {
    const now = Date.now();
    const timeSpent = now - metrics.current._lastStageEntryTime;
    
    // Log previous stage elapsed tracking
    if (metrics.current.timeInStages[currentStage] === undefined) {
        metrics.current.timeInStages[currentStage] = 0;
    }
    metrics.current.timeInStages[currentStage] += timeSpent;
    metrics.current._lastStageEntryTime = now;
  }, [currentStage]);

  // Track sandbox konami override activation
  useEffect(() => {
    if (isManualOverride) metrics.current.sandboxTriggered = true;
  }, [isManualOverride]);

  // Stealth Telemetry Beaconing bypassing thread-blocking
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Beacon API is perfect for tracking abandonment metrics securely without blocking user unloads
        // Intentionally fire and forget
        navigator.sendBeacon("/api/telemetry", JSON.stringify(metrics.current));
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Component strictly maps lifecycle logic hooks globally; yields absolutely no rendering mutations
  return null;
}
