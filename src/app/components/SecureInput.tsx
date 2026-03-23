"use client";

import React, { useState, useEffect, useRef } from "react";
import { useStageStore } from "../store/stageStore";

export default function SecureInput() {
  const [realValue, setRealValue] = useState("");
  const [visualString, setVisualString] = useState("");
  const [isResolved, setIsResolved] = useState(false);
  const [sequenceCode, setSequenceCode] = useState("");
  
  const triggerAbsorption = useStageStore((s) => s.triggerAbsorption);
  const clearAbsorption = useStageStore((s) => s.clearAbsorption);
  const triggerSFX = useStageStore((s) => s.triggerSFX);
  const absorbTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  // Cleanup absorption timeout on unmount
  useEffect(() => {
    return () => clearTimeout(absorbTimeout.current);
  }, []);

  useEffect(() => {
    // Single robust timeout ensuring the matrix char resolves to the exact real string rapidly without ghosting
    let timeout: NodeJS.Timeout;
    if (visualString !== realValue && !isResolved) {
      timeout = setTimeout(() => {
         setVisualString(realValue);
      }, 50);
    }
    return () => clearTimeout(timeout);
  }, [realValue, visualString, isResolved]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isResolved) return;
    const val = e.target.value;
    setRealValue(val);
    
    if (val.length > realValue.length) {
       const matrix = ["¥", "§", "∆", "X", "0", "%", "&", "µ", "∑"];
       const randChar = matrix[Math.floor(Math.random() * matrix.length)];
       setVisualString(val.slice(0, -1) + randChar);
       // Lightweight keystroke synthetic trigger
       triggerSFX("keystroke");
    } else {
       setVisualString(val);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!realValue || isResolved) return;

    // Trigger absorption with local lifecycle management
    triggerAbsorption();
    triggerSFX("absorb");
    clearTimeout(absorbTimeout.current);
    absorbTimeout.current = setTimeout(() => clearAbsorption(), 400);
    
    // Generate isolated confirmation sequence
    const hex = Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, '0');
    setSequenceCode(hex);
    setIsResolved(true);
  };

  if (isResolved) {
    return (
      <div className="w-full flex items-center justify-center p-4 border border-white/10 bg-white/5 rounded-lg backdrop-blur-md">
        <p className="font-mono text-sm tracking-widest text-[#50a0ff] animate-pulse">
          UPLINK ESTABLISHED. SEQUENCE #{sequenceCode} CONFIRMED.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto z-50">
      {/* Accessible label — visually hidden, linked to input for screen readers */}
      <label htmlFor="kalai-uplink" className="sr-only">Enter email for secure uplink</label>
      <input
        id="kalai-uplink"
        type="email"
        value={realValue}
        onChange={handleChange}
        required
        placeholder="Enter your email"
        className="relative z-20 w-full bg-transparent border-b border-white/20 px-4 py-3 text-transparent caret-white focus:outline-none focus:border-white/60 transition-colors"
        spellCheck="false"
        autoComplete="off"
      />
      
      {/* Decorative rendering engine for Matrix injection */}
      <div className="absolute inset-x-0 top-0 bottom-0 px-4 py-3 pointer-events-none flex items-center justify-start z-10">
        {!visualString && (
          <span className="text-white/30 font-mono tracking-widest text-sm">Initiate Uplink_</span>
        )}
        <span className="text-white font-mono tracking-wider tabular-nums">
          {visualString}
        </span>
      </div>

      <button 
        type="submit" 
        aria-label="Transmit data sequence"
        className="absolute right-0 top-0 bottom-0 px-4 text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors z-30"
      >
        Transmit [↵]
      </button>
    </form>
  );
}
