import { create } from 'zustand';

interface StageState {
  currentStage: number;
  isBooted: boolean;
  sfxTrigger: string | null;
  isTransitioning: boolean;
  isManualOverride: boolean;
  fpsTier: 'high' | 'low';
  isAbsorbing: boolean;
  setCurrentStage: (stage: number) => void;
  setIsBooted: (val: boolean) => void;
  triggerSFX: (name: string) => void;
  clearSFX: () => void;
  triggerAbsorption: () => void;
  clearAbsorption: () => void;
  setIsTransitioning: (val: boolean) => void;
  setIsManualOverride: (val: boolean) => void;
  setFpsTier: (tier: 'high' | 'low') => void;
}

export const useStageStore = create<StageState>((set) => ({
  currentStage: 1,
  isBooted: false,
  sfxTrigger: null,
  isTransitioning: false,
  isManualOverride: false,
  fpsTier: 'high',
  isAbsorbing: false,
  setCurrentStage: (stage) => set({ currentStage: stage }),
  setIsBooted: (val) => set({ isBooted: val }),
  // Pure state setters — consumers handle their own timeout/revert lifecycle
  triggerSFX: (name) => set({ sfxTrigger: name }),
  clearSFX: () => set({ sfxTrigger: null }),
  triggerAbsorption: () => set({ isAbsorbing: true }),
  clearAbsorption: () => set({ isAbsorbing: false }),
  setIsTransitioning: (val) => set({ isTransitioning: val }),
  setIsManualOverride: (val) => set({ isManualOverride: val }),
  setFpsTier: (tier) => set({ fpsTier: tier }),
}));
